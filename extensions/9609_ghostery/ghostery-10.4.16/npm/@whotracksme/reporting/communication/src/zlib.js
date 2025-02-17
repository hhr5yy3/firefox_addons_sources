globalThis.chrome = globalThis.browser;

import pako from '../../../../pako/dist/pako.esm.js';

/**
 * WhoTracks.Me
 * https://whotracks.me/
 *
 * Copyright 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */


const inflate = pako.inflate.bind(pako);
const deflate = pako.deflate.bind(pako);

export { deflate, inflate };
