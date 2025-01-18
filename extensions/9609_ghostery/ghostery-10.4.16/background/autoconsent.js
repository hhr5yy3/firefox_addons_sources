globalThis.chrome = globalThis.browser;

import rules from '../npm/@duckduckgo/autoconsent/rules/rules.json.js';
import { snippets } from '../npm/@duckduckgo/autoconsent/lib/eval-snippets.js';
import { parse } from '../npm/tldts-experimental/dist/es6/index.js';
import Options, { isPaused } from '../store/options.js';
import store from '../npm/hybrids/src/store.js';

async function initialize(msg, tab, frameId) {
  const options = await store.resolve(Options);
  if (options.terms && options.blockAnnoyances && !isPaused(options, tab.url ? parse(tab.url).hostname : "")) {
    try {
      chrome.tabs.sendMessage(
        tab.id,
        {
          action: "autoconsent",
          type: "initResp",
          rules,
          config: {
            enableCosmeticRules: false
          }
        },
        {
          frameId
        }
      );
    } catch {
    }
  }
}
async function evalCode(snippetId, id, tabId, frameId) {
  const [result] = await chrome.scripting.executeScript({
    target: {
      tabId,
      frameIds: [frameId]
    },
    world: chrome.scripting.ExecutionWorld?.MAIN ?? (void 0 ),
    func: snippets[snippetId]
  });
  await chrome.tabs.sendMessage(
    tabId,
    {
      action: "autoconsent",
      id,
      type: "evalResp",
      result: result.result
    },
    {
      frameId
    }
  );
}
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action !== "autoconsent") return;
  if (!sender.tab) return;
  const frameId = sender.frameId;
  switch (msg.type) {
    case "init":
      return initialize(msg, sender.tab, frameId);
    case "eval":
      return evalCode(msg.snippetId, msg.id, sender.tab.id, frameId);
  }
});
