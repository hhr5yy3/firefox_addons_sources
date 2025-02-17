globalThis.chrome = globalThis.browser;

import { DOCUMENT_FRAGMENT_NODE } from '../shared/constants.js';
import { NonElementParentNode } from '../mixin/non-element-parent-node.js';

/**
 * @implements globalThis.DocumentFragment
 */
class DocumentFragment extends NonElementParentNode {
  constructor(ownerDocument) {
    super(ownerDocument, '#document-fragment', DOCUMENT_FRAGMENT_NODE);
  }
}

export { DocumentFragment };
