import { defineBooleanAttribute } from "../../util/dom.js";
export class XActivatableElement extends HTMLElement {
    attributeChangedCallback(name, _oldValue, _newValue) {
        if (name === 'active') {
            if (!this.active)
                return;
            for (const node of this.parentElement.children)
                if (node !== this && node.tagName === this.tagName)
                    // avoid writting a data property
                    node.removeAttribute('active');
            this.dispatchEvent(new CustomEvent('activate', {
                bubbles: true,
                detail: { index: [...this.parentNode.children].indexOf(this) }
            }));
        }
    }
}
XActivatableElement.observedAttributes = ['active'];
defineBooleanAttribute(XActivatableElement, 'active');
customElements.define('x-page', class extends XActivatableElement {
    constructor() {
        super(...arguments);
        // Bug 1546467 fixed in Firefox 68 (custom element prototype lost after GC)
        this.__workaround_bug_1546467 = this;
    }
});
customElements.define('x-tabs-nav', class extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('keydown', e => {
            let element = null;
            if (e.key === 'ArrowRight') {
                element = this.querySelector(':scope > x-tab[active] + x-tab');
            }
            else if (e.key === 'ArrowLeft') {
                const active = this.querySelector(':scope > x-tab[active]');
                if (active)
                    element = active.previousElementSibling;
            }
            else if (e.key === 'Home') {
                element = this.querySelector(':scope > x-tab:first-of-type');
            }
            else if (e.key === 'End') {
                element = this.querySelector(':scope > x-tab:last-of-type');
            }
            if (element)
                element.click();
        });
    }
});
customElements.define('x-tab', class extends XActivatableElement {
    constructor() {
        super();
        this.addEventListener('click', () => { this.active = true; });
    }
});
customElements.define('x-tabs', class extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('activate', event => {
            const target = event.target;
            if (!target.parentNode || target.parentNode.parentNode !== this)
                return;
            const index = event.detail.index;
            for (const section of this.children) {
                const element = section.children[index];
                if (element instanceof XActivatableElement && !element.active)
                    element.active = true;
            }
        });
    }
});
