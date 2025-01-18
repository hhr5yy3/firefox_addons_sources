(() => {
  // ../common/lib/consts.ts
  var NODE_ENV = "production";
  var API_URL = "https://api.webscanner.pro";
  var DISTRIBUTION = "sas";
  var VERSION = "1.9.0";
  var BROWSER = "firefox";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var TEST_GROUP_STORAGE_KEY = "config:test_group";
  var TRANSMIT_STATS_STORAGE_KEY = "settings:transmit-stats";
  var DSE_SEARCH_COUNT_STORAGE_KEY = "dse:search_count";

  // ../common/lib/util.ts
  async function getStoredData(key, storage = "local", defaultValue = null) {
    const store = storage === "sync" ? chrome.storage.sync : storage === "session" ? chrome.storage.session : chrome.storage.local;
    const data = await new Promise((res) => store.get(key, res));
    return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
  }
  async function log(...args) {
    NODE_ENV === "development" && console.debug("[WSP]", ...args);
  }

  // ../common/lib/abTesting.ts
  async function getTestGroup() {
    let testGroup = await getStoredData(TEST_GROUP_STORAGE_KEY, "sync");
    if (!testGroup) {
      testGroup = getRandomArbitrary(1, 12);
      const storage = chrome.storage.sync || chrome.storage.local;
      await storage.set({ [TEST_GROUP_STORAGE_KEY]: testGroup });
    }
    return testGroup;
  }
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // ../common/lib/api.ts
  var getUrl = (p) => new URL(`${API_URL}/v1/${p}`);
  async function postSearchCount(count) {
    post(getUrl("search-count"), { count });
  }
  async function post(url, body = {}) {
    const userConsentedToDataTransmission = await getStoredData(TRANSMIT_STATS_STORAGE_KEY);
    if (userConsentedToDataTransmission) {
      const grp = await getTestGroup();
      const wspHeader = [
        DISTRIBUTION,
        VERSION,
        BROWSER,
        grp.toString()
      ].join(" ");
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-WebScannerPro": wspHeader
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          console.error(response);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  // ../common/background/searchCounter.ts
  var SEARCH_URL_OMNIBOX = "https://www.startpage.com/do/search?segment=startpage.webscannerpro&source=sas&cat=web&wspob=1";
  chrome.webRequest.onCompleted.addListener(
    async () => {
      let count = await getStoredData(DSE_SEARCH_COUNT_STORAGE_KEY);
      count = (count || 0) + 1;
      chrome.storage.local.set({ [DSE_SEARCH_COUNT_STORAGE_KEY]: count });
      if ([1, 2, 5, 10, 25, 50].includes(count) || count % 100 === 0) {
        postSearchCount(count);
      }
      log("Search count", count);
    },
    {
      urls: [`${SEARCH_URL_OMNIBOX}*`]
      // Matches searches from omnibox only.
    }
  );
})();
