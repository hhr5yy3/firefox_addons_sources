globalThis.chrome = globalThis.browser;

import CustomFilters from '../../../store/custom-filters.js';
import store from '../../../npm/hybrids/src/store.js';
import { html } from '../../../npm/hybrids/src/template/index.js';

async function update(host, event) {
  const button = event.currentTarget;
  button.disabled = true;
  host.result = void 0;
  try {
    store.submit(host.input);
    host.result = await chrome.runtime.sendMessage({
      action: "customFilters:update",
      input: host.input.text
    });
  } finally {
    button.disabled = false;
  }
}
const __vite_glob_0_4 = {
  input: store(CustomFilters, { draft: true }),
  disabled: false,
  result: void 0,
  render: ({ input, result, disabled }) => html`
    <template layout="block">
      <div layout="column gap">
        <settings-input>
          <textarea
            rows="10"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            oninput="${html.set(input, "text")}"
            disabled="${!store.ready(input) || disabled}"
            defaultValue="${store.ready(input) ? input.text : ""}"
            data-qa="input:custom-filters"
          ></textarea>
        </settings-input>

        <ui-button
          layout="self:start"
          onclick="${update}"
          disabled="${disabled}"
          data-qa="button:custom-filters:save"
        >
          <button>Save</button>
        </ui-button>
        ${result && html`
          <div
            layout="column gap margin:top"
            data-qa="component:custom-filters:result"
          >
            <div layout="column gap:0.5">
              <ui-text type="label-s" color="gray-600">
                Custom filters has been updated
              </ui-text>
              <ui-text type="body-s" color="gray-600">
                ${html`Network filters: ${result.networkFilters || 0} ` }
              </ui-text>
              <ui-text type="body-s" color="gray-600">
                Cosmetic filters: ${result.cosmeticFilters || 0}
              </ui-text>
            </div>
          </div>
        `}
        ${!!result?.errors.length && html`
          <div layout="column gap:0.5">
            <ui-text type="label-s" color="gray-600">
              Errors (${result.errors.length})
            </ui-text>
            ${result?.errors.map(
    (error) => html`<ui-text type="body-s" color="danger-500">
                  ${error}
                </ui-text>`
  )}
          </div>
        `}
      </div>
    </template>
  `
};

export { __vite_glob_0_4 as default };
