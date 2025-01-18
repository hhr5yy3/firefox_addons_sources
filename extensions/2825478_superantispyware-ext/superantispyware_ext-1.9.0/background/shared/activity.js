(() => {
  // ../common/lib/consts.ts
  var API_URL = "https://api.webscanner.pro";
  var DISTRIBUTION = "sas";
  var VERSION = "1.9.0";
  var BROWSER = "firefox";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var LAST_ACTIVITY_STORAGE_KEY = "last_activity";
  var TEST_GROUP_STORAGE_KEY = "config:test_group";
  var TRANSMIT_STATS_STORAGE_KEY = "settings:transmit-stats";

  // ../common/lib/util.ts
  async function getStoredData(key, storage = "local", defaultValue = null) {
    const store = storage === "sync" ? chrome.storage.sync : storage === "session" ? chrome.storage.session : chrome.storage.local;
    const data = await new Promise((res) => store.get(key, res));
    return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
  }
  function isHttp(url) {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
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
  async function postActivity() {
    post(getUrl("activity"));
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

  // ../common/background/activity.ts
  var ignore = ({ url, frameId }) => frameId !== 0 || !isHttp(url);
  chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    if (ignore(details)) {
      return;
    }
    const today = getCurrentDateString();
    const lastActivity = await getStoredData(LAST_ACTIVITY_STORAGE_KEY);
    if (!lastActivity || lastActivity < today) {
      chrome.storage.local.set({ [LAST_ACTIVITY_STORAGE_KEY]: today });
      postActivity();
    }
  });
  function getCurrentDateString() {
    const date = /* @__PURE__ */ new Date();
    const y = date.getUTCFullYear();
    const m = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const d = ("0" + date.getUTCDate()).slice(-2);
    return `${y}${m}${d}`;
  }
})();
