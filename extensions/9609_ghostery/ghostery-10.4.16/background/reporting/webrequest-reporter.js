globalThis.chrome = globalThis.browser;

import '../../npm/@whotracksme/reporting/reporting/src/patterns.js';
import '../../npm/@whotracksme/reporting/reporting/src/logger.js';
import '../../npm/@whotracksme/reporting/reporting/src/pages.js';
import '../../npm/linkedom/esm/cached.js';
import RequestReporter from '../../npm/@whotracksme/reporting/reporting/src/request/index.js';
import cachedGetBrowserInfo from '../../utils/browser-info.js';
import { isPaused } from '../../store/options.js';
import ExtendedRequest from '../../utils/request.js';
import { addListener } from '../../utils/options-observer.js';
import { updateTabStats } from '../stats.js';
import config from './config.js';
import communication from './communication.js';
import urlReporter from './url-reporter.js';

let webRequestReporter = null;
{
  let options = {};
  addListener(function webRequestReporting(value) {
    options = value;
  });
  webRequestReporter = new RequestReporter(config.request, {
    communication,
    countryProvider: urlReporter.countryProvider,
    trustedClock: communication.trustedClock,
    getBrowserInfo: cachedGetBrowserInfo,
    isRequestAllowed: (state) => !options.blockTrackers || isPaused(options, state.tabUrlParts.hostname),
    onTrackerInteraction: (event, state) => {
      if (event === "observed") {
        return;
      }
      const request = ExtendedRequest.fromRequestDetails({
        url: state.url,
        originUrl: state.tabUrl
      });
      request.modified = true;
      updateTabStats(state.tabId, [request]);
    }
  });
  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.action === "mousedown") {
      webRequestReporter.recordClick(msg.event, msg.context, msg.href, sender);
    }
  });
}
const webRequestReporter$1 = webRequestReporter;

export { webRequestReporter$1 as default };
