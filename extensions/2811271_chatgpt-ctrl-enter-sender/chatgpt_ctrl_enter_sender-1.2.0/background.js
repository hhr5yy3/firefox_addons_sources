chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = tab.url;
  chrome.storage.sync.get("isEnabled", (data) => {
    data = data ?? {};
    const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    if (url && (url.startsWith("https://chatgpt.com") ||
                url.startsWith("https://poe.com") ||
                url.startsWith("https://www.phind.com") ||
                url.startsWith("https://chat.mistral.ai") ||
                url.startsWith("https://www.chatpdf.com") ||
                url.startsWith("https://www.perplexity.ai") ||
                url.startsWith("https://claude.ai") ||
                url.startsWith("https://www.bing.com/chat") ||
                url.startsWith("https://you.com") ||
                url.startsWith("https://dashboard.cohere.com/playground/chat"))) {
        if (changeInfo.status === "complete") {
          chrome.browserAction.setIcon({ path: isEnabled ? "icon/enabled.png" : "icon/disabled.png" });
          chrome.browserAction.enable(tabId);
        }
    } else {
      chrome.action.disable(tabId);
    }
  });
});
