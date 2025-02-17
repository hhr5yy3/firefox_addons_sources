globalThis.chrome = globalThis.browser;

import { html } from '../../npm/hybrids/src/template/index.js';

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


const __vite_glob_0_2 = {
  render: () => html`
    <template layout="contents">
      <slot></slot>
    </template>
  `.css`
    ::slotted(*) {
      transition: opacity 0.2s, color 0.2s, background-color 0.2s, border-color 0.2s;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      text-decoration: none;
    }

    ::slotted(*:focus:not(:focus-visible)) {
      outline: none;
    }

    ::slotted(*:active) {
      opacity: 0.6;
    }

    ::slotted(button) {
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  `,
};

export { __vite_glob_0_2 as default };
