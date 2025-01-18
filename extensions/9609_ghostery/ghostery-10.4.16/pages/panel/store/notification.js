globalThis.chrome = globalThis.browser;

import Options from '../../../store/options.js';
import Session from '../../../store/session.js';
import '../../../npm/jwt-decode/build/esm/index.js';
import '../../../utils/debug.js';
import '../../../utils/browser-info.js';
import { msg } from '../../../npm/hybrids/src/localize.js';
import store from '../../../npm/hybrids/src/store.js';

const NOTIFICATIONS = {
  terms: {
    icon: "triangle",
    type: "warning",
    text: msg`Due to browser restrictions and additional permissions missing, Ghostery is not able to protect you.`,
    url: "https://www.ghostery.com/support?utm_source=gbe",
    action: msg`Get help`
  },
  opera: {
    icon: "logo-opera",
    type: "warning",
    text: msg`Expand Ghostery ad blocking to search engines in a few easy steps.`,
    url: "https://www.ghostery.com/blog/block-search-engine-ads-on-opera-guide?utm_source=gbe&utm_campaign=opera_serp",
    action: msg`Enable Ad Blocking Now`
  },
  review: {
    icon: "call-for-review",
    type: "review",
    text: msg`We're so glad Ghostery has your heart! Help others find us too - it only takes a moment.`,
    url: (() => {
      {
        return "https://mygho.st/ReviewFirefoxPanel";
      }
    })(),
    action: msg`Leave a review today`
  }
};
const CONTRIBUTOR_NOTIFICATION = {
  icon: "heart",
  type: "",
  text: msg`Hey, do you enjoy Ghostery and want to support our work?`,
  url: "https://www.ghostery.com/become-a-contributor?utm_source=gbe",
  action: msg`Become a Contributor`
};
const Notification = {
  icon: "",
  type: "",
  text: "",
  url: "",
  action: "",
  [store.connect]: async () => {
    if (!(await store.resolve(Options)).terms) return NOTIFICATIONS.terms;
    if (Math.random() < 0.5) {
      return NOTIFICATIONS.review;
    }
    if (!(await store.resolve(Session)).contributor) {
      return CONTRIBUTOR_NOTIFICATION;
    }
    return NOTIFICATIONS.review;
  }
};

export { Notification as default };
