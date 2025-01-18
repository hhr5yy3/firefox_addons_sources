globalThis.chrome = globalThis.browser;

import Options from '../../../store/options.js';
import store from '../../../npm/hybrids/src/store.js';
import { html } from '../../../npm/hybrids/src/template/index.js';
import { dispatch } from '../../../npm/hybrids/src/utils.js';

const VERSION = chrome.runtime.getManifest().version;
async function asyncAction(event, promise) {
  const button = event.currentTarget;
  const el = button.children[0];
  const origText = el.textContent;
  button.disabled = true;
  el.textContent = "...";
  const response = await promise;
  if (response) {
    el.textContent = response;
    setTimeout(() => {
      button.disabled = false;
      el.textContent = origText;
    }, 2e3);
  } else {
    button.disabled = false;
    el.textContent = origText;
  }
}
function clearStorage(host, event) {
  asyncAction(event, chrome.runtime.sendMessage({ action: "clearStorage" }));
}
function updateFilters(host) {
  if (host.updatedAt) {
    store.set(host.options, { filtersUpdatedAt: 0 });
  }
}
function refresh(host) {
  host.counter += 1;
  if (host.counter > 5) {
    host.visible = true;
    dispatch(host, "shown");
  }
}
const __vite_glob_0_5 = {
  counter: 0,
  options: store(Options),
  updatedAt: ({ options }) => store.ready(options) && options.filtersUpdatedAt && new Date(options.filtersUpdatedAt).toLocaleDateString(
    chrome.i18n.getUILanguage(),
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  ),
  visible: false,
  render: ({ visible, counter, updatedAt }) => html`
    <template layout="column gap:3">
      ${(visible || counter > 5) && html`
          <section layout="column gap:3" translate="no">
            <ui-text type="headline-m">Developer tools</ui-text>
            <div layout="column gap">
              <ui-text type="headline-s">Storage actions</ui-text>
              <div layout="row gap items:start">
                <ui-button onclick="${clearStorage}" layout="shrink:0">
                  <button>Clear local storage</button>
                </ui-button>
              </div>
            </div>
            <ui-line></ui-line>
            ${false}
          </section>
        `}
      <div layout="column gap center">
        <div layout="row center gap:2">
          <ui-text
            type="label-s"
            color="gray-300"
            onclick="${refresh}"
            translate="no"
          >
            v${VERSION}
          </ui-text>
        </div>
        <ui-action>
          <ui-text type="label-xs" color="gray-300" onclick="${updateFilters}">
            Last update: ${updatedAt || html`updating...`}
          </ui-text>
        <ui-action>
      </div>
    </template>
  `
};

export { asyncAction, __vite_glob_0_5 as default };
