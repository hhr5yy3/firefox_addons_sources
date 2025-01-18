globalThis.chrome = globalThis.browser;

import { parse, walk } from './parse.js';
export { tokenize } from './parse.js';
import { EXTENDED_PSEUDO_CLASSES } from './extended.js';
export { PSEUDO_CLASSES, PSEUDO_ELEMENTS, SelectorType, classifySelector } from './extended.js';

/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// check if extended selector consists of :has extended pseudo-classes only
function isPureHasSelector(selector) {
    const ast = parse(selector);
    try {
        walk(ast, (node) => {
            if (node.type === 'pseudo-class' &&
                node.name !== undefined &&
                node.name !== 'has' &&
                EXTENDED_PSEUDO_CLASSES.has(node.name)) {
                throw new Error('not a :has');
            }
        });
    }
    catch (e) {
        // stop traversing the AST once an extended pseudo-class different from :has is detected
        return false;
    }
    return true;
}

export { EXTENDED_PSEUDO_CLASSES, isPureHasSelector, parse };
