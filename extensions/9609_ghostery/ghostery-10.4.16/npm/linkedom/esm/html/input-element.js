globalThis.chrome = globalThis.browser;

import { registerHTMLClass } from '../shared/register-html-class.js';
import { booleanAttribute, stringAttribute } from '../shared/attributes.js';
import { HTMLElement } from './element.js';

const tagName = 'input';

/**
 * @implements globalThis.HTMLInputElement
 */
class HTMLInputElement extends HTMLElement {
  constructor(ownerDocument, localName = tagName) {
    super(ownerDocument, localName);
  }

  /* c8 ignore start */
  get autofocus() { return booleanAttribute.get(this, 'autofocus') || -1; }
  set autofocus(value) { booleanAttribute.set(this, 'autofocus', value); }

  get disabled() { return booleanAttribute.get(this, 'disabled'); }
  set disabled(value) { booleanAttribute.set(this, 'disabled', value); }

  get name() { return this.getAttribute('name'); }
  set name(value) { this.setAttribute('name', value); }

  get placeholder() { return this.getAttribute('placeholder'); }
  set placeholder(value) { this.setAttribute('placeholder', value); }

  get type() { return this.getAttribute('type'); }
  set type(value) { this.setAttribute('type', value); }

  get value() { return stringAttribute.get(this, 'value'); }
  set value(value) { stringAttribute.set(this, 'value', value); }
  /* c8 ignore stop */
}

registerHTMLClass(tagName, HTMLInputElement);

export { HTMLInputElement };
