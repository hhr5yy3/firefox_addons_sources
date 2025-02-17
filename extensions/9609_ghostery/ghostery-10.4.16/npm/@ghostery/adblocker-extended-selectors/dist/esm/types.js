globalThis.chrome = globalThis.browser;

/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
function isAtoms(tokens) {
    return tokens.every((token) => typeof token !== 'string');
}
function isAST(tokens) {
    return tokens.every((token) => token.type !== 'comma' && token.type !== 'combinator');
}

export { isAST, isAtoms };
