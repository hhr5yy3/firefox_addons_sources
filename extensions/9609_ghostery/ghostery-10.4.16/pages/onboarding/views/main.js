globalThis.chrome = globalThis.browser;

import Options from '../../../store/options.js';
import { GHOSTERY_DOMAIN } from '../../../utils/urls.js';
import __vite_glob_0_5 from './addon-health.js';
import __vite_glob_0_11 from './web-trackers.js';
import __vite_glob_0_7 from './performance.js';
import __vite_glob_0_8 from './privacy.js';
import __vite_glob_0_9 from './skip.js';
import Success from './success.js';
import router from '../../../npm/hybrids/src/router.js';
import { html } from '../../../npm/hybrids/src/template/index.js';
import { msg } from '../../../npm/hybrids/src/localize.js';
import store from '../../../npm/hybrids/src/store.js';

const TERMS_AND_CONDITIONS_URL = `https://www.${GHOSTERY_DOMAIN}/privacy/ghostery-terms-and-conditions?utm_source=gbe&utm_campaign=onboarding`;
function acceptTerms(host, event) {
  router.resolve(event, store.set(Options, { terms: true }));
}
const Main = {
  [router.connect]: {
    stack: () => [__vite_glob_0_5, __vite_glob_0_11, __vite_glob_0_7, __vite_glob_0_8, __vite_glob_0_9]
  },
  render: () => html`
    <template layout="grow column gap">
      <ui-card layout="gap:2" layout@390px="gap:3">
        <section layout="block:center column gap" layout@390px="margin:2:0:1">
          <ui-text type="body-l">Welcome to Ghostery</ui-text>
          <ui-text type="display-m"> Enable Ghostery to get started </ui-text>
        </section>
        <div layout="column gap:2">
          <ui-text type="label-m" layout="block:center">
            Your Privacy Features:
          </ui-text>
          <div layout="grid:3 gap">
            <onboarding-feature icon="onboarding-adblocking">
              Ad-Blocking
            </onboarding-feature>
            <onboarding-feature icon="onboarding-anti-tracking">
              Anti-Tracking
            </onboarding-feature>
            <onboarding-feature icon="onboarding-never-consent">
              Never-Consent
            </onboarding-feature>
          </div>
        </div>
        <div layout="column gap:2">
          <ui-text
            type="body-s"
            underline
            layout="block:justify"
            data-qa="text:description"
          >
            ${msg.html`
              Information about <a href="${router.url(__vite_glob_0_11)}">web trackers</a>,
              <a href="${router.url(__vite_glob_0_5)}">add-on's health</a>, and
              <a href="${router.url(__vite_glob_0_7)}">performance telemetry</a>
              will be shared in accordance with our <a href="${"https://addons.mozilla.org/firefox/addon/ghostery/privacy/" }" target="_blank" rel="noreferrer">Privacy Policy</a>, advancing privacy protection for the Ghostery community. | 'add-on' means 'browser extension'
            `}
          </ui-text>
          <ui-text type="body-s" layout="block:justify">
            Ghostery never collects personal information like passwords,
            browsing history or the content of the pages you visit.
          </ui-text>
        </div>
        <div layout="column gap:2">
          <ui-button type="success" layout="height:5.5" data-qa="button:enable">
            <a href="${router.url(Success)}" onclick="${acceptTerms}">
              Enable Ghostery
            </a>
          </ui-button>
          <onboarding-error-card layout="margin:top">
            <ui-text type="label-s" color="danger-500" layout="block:center">
              With Ghostery disabled, only the basic functionality of naming
              trackers is available.
            </ui-text>
            <ui-button type="outline-danger" data-qa="button:skip">
              <a href="${router.url(__vite_glob_0_9)}">Keep Disabled</a>
            </ui-button>
          </onboarding-error-card>
        </div>
      </ui-card>
      <div layout="column center">
        <ui-button type="transparent">
          <a href="${TERMS_AND_CONDITIONS_URL}" target="_blank">
            Terms & Conditions
          </a>
        </ui-button>
      </div>
    </template>
  `
};

export { Main as default };
