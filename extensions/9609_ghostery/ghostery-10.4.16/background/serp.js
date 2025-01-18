globalThis.chrome = globalThis.browser;

import { parse } from '../npm/tldts-experimental/dist/es6/index.js';
import trackersPreviewCSS from '../content_scripts/trackers-preview.css.js';
import Options, { isPaused } from '../store/options.js';
import '../npm/jwt-decode/build/esm/index.js';
import '../utils/debug.js';
import { getWTMStats } from '../utils/wtm-stats.js';
import '../utils/browser-info.js';
import './notifications.js';
import store from '../npm/hybrids/src/store.js';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getWTMReport") {
    sendResponse({
      wtmStats: msg.links.map((url) => {
        const { domain } = parse(url);
        return {
          stats: getWTMStats(domain),
          domain
        };
      })
    });
  }
  if (msg.action === "disableWTMReport") {
    store.set(Options, { wtmSerpReport: false });
  }
  return false;
});
const SERP_URL_REGEXP = /^https:[/][/][^/]*[.]google[.][a-z]+([.][a-z]+)?[/]search/;
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.url.match(SERP_URL_REGEXP)) {
    store.resolve(Options).then((options) => {
      if (options.wtmSerpReport) {
        chrome.scripting.insertCSS({
          target: {
            tabId: details.tabId
          },
          css: trackersPreviewCSS
        });
      }
      if (options.wtmSerpReport || options.serpTrackingPrevention) {
        const files = [];
        if (options.wtmSerpReport)
          files.push("/content_scripts/trackers-preview.js");
        if (!isPaused(options) && options.serpTrackingPrevention)
          files.push("/content_scripts/prevent-serp-tracking.js");
        chrome.scripting.executeScript(
          {
            injectImmediately: true,
            world: chrome.scripting.ExecutionWorld?.ISOLATED ?? "ISOLATED",
            target: {
              tabId: details.tabId
            },
            files
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            }
          }
        );
      }
    });
  }
});
