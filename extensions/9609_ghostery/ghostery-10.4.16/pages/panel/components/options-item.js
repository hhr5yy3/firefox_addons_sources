globalThis.chrome = globalThis.browser;

import { html } from '../../../npm/hybrids/src/template/index.js';
import { msg } from '../../../npm/hybrids/src/localize.js';

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


const __vite_glob_0_10 = {
  icon: '',
  enabled: false,
  terms: false,
  render: ({ icon, enabled, terms }) => html`
    <template layout="row gap items:center padding:1:1.5">
      ${icon && html`<ui-icon name="${icon}" layout="margin:right"></ui-icon>`}
      <ui-text type="body-s" layout="grow">
        <slot></slot>
      </ui-text>
      <ui-text
        type="label-s"
        color="${terms && enabled ? '' : 'danger-500'}"
        ellipsis
        layout="shrink:0"
      >
        ${terms
          ? enabled
            ? msg`Enabled`
            : msg`Disabled`
          : msg`Permission required`}
      </ui-text>
    </template>
  `.css`
    :host {
      background: var(--ui-color-layout);
      border: 1px solid var(--ui-color-gray-200);
    }

    :host(:first-of-type) {
      border-radius: 8px 8px 0 0;
    }

    :host(:last-of-type) {
      border-radius: 0 0 8px 8px;
    }

    :host(:not(:last-of-type)) {
      border-bottom: none;
    }

    ui-icon {
      color: var(--ui-color-gray-600);
    }

    @media (hover: hover) {
      :host(:hover) {
        background: var(--ui-color-primary-100);
      }

      :host(:hover) ui-icon {
        color: var(--ui-color-primary-700);
      }

      :host(:hover) ui-text {
        color: var(--ui-color-primary-700);
      }
    }
  `,
};

export { __vite_glob_0_10 as default };
