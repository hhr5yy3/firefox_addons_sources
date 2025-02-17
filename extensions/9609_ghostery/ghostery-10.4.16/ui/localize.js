globalThis.chrome = globalThis.browser;

import { localize } from '../npm/hybrids/src/localize.js';

/**
 * Ghostery Browser Extension
 * https://www.ghostery.com/
 *
 * Copyright 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0
 */

// Localize wrapper for chrome.i18n
if (typeof chrome === 'object' && chrome.i18n) {
  localize(chrome.i18n.getMessage.bind(chrome.i18n), { format: 'chrome.i18n' });
}
