(() => {
  // src/lib/consts.ts
  var SEARCH_OMNIBOX_PARAM = "wspob";
  var SEARCH_OMNIBOX_VAL = "1";
  var SEARCH_URL_POST = "https://www.startpage.com/sp/search";

  // ../common/lib/consts.ts
  var NODE_ENV = "production";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;

  // ../common/lib/util.ts
  async function log(...args) {
    NODE_ENV === "development" && console.debug("[WSP]", ...args);
  }

  // src/background/startpageOmniboxCheck.ts
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (isRepostedSearchFromWspOmnibox(details)) {
        sendMessageWithRetry(
          details.tabId,
          { [SEARCH_OMNIBOX_PARAM]: SEARCH_OMNIBOX_VAL },
          60
        );
      }
    },
    {
      urls: [SEARCH_URL_POST],
      types: ["main_frame"]
    },
    ["requestBody"]
  );
  function isRepostedSearchFromWspOmnibox({ method, requestBody }) {
    if (method === "POST" && requestBody && requestBody.formData) {
      const omniboxParam = requestBody.formData[SEARCH_OMNIBOX_PARAM];
      return omniboxParam && omniboxParam.length === 1 && omniboxParam[0] === SEARCH_OMNIBOX_VAL;
    }
    return false;
  }
  function sendMessageWithRetry(tabId, message, retries = 5, interval = 1e3) {
    let currentRetry = 0;
    function send() {
      chrome.tabs.sendMessage(tabId, message, () => {
        if (chrome.runtime.lastError) {
          log("Message error", message, chrome.runtime.lastError);
          if (currentRetry < retries) {
            currentRetry++;
            setTimeout(send, interval);
          } else {
            log("Message failed after maximum retries.");
          }
        } else {
          log("Message sent and received", message);
        }
      });
    }
    send();
  }
})();
