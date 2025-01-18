import {
  createBackgroundMessageListener
} from "./RBTIXGC2.js";
import {
  CHROME_EXTENSION_POST_MESSAGE_ID
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  v4_default
} from "./2RTBHBIC.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/requester/utils/setupProxyExecutor.ts
var import_webextension_polyfill2 = __toESM(require_browser_polyfill());

// src/features/requester/core/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var GlobalFetchRequester = class {
  async fetch(url, options, proxySettings) {
    var _a;
    try {
      const responseType = (proxySettings == null ? void 0 : proxySettings.responseType) || "text";
      const resp = await fetch(url, options);
      const result = await ((_a = resp[responseType]) == null ? void 0 : _a.call(resp));
      return {
        success: true,
        message: "",
        data: result,
        responseInfo: generateResponseInfo(resp)
      };
    } catch (error) {
      return {
        success: false,
        message: "",
        data: null
      };
    }
  }
};
var globalFetchRequester = new GlobalFetchRequester();
var ProxyFetchRequester = class {
  async findProxyTab(host) {
    var _a, _b;
    const tabs = await import_webextension_polyfill.default.tabs.query({ status: "complete" });
    const results = await Promise.all(
      tabs.map(async (tab) => {
        var _a2;
        if (tab.url && ((_a2 = tab.url) == null ? void 0 : _a2.includes(host))) {
          return import_webextension_polyfill.default.tabs.sendMessage(tab.id, {
            id: CHROME_EXTENSION_POST_MESSAGE_ID,
            event: "Requester_checkTabReady"
          }).catch(() => void 0);
        }
      })
    );
    for (let i = 0; i < results.length; i++) {
      if ((_b = (_a = results[i]) == null ? void 0 : _a.data) == null ? void 0 : _b.includes(host)) {
        return tabs[i];
      }
    }
  }
  waitForProxyTabReady(onReady) {
    const removeListener = createBackgroundMessageListener(
      async (runtime, event, data, sender) => {
        var _a;
        if (event === "Requester_proxyTabReady") {
          removeListener();
          onReady(sender.tab);
          return {
            success: true,
            data: (_a = sender.tab) == null ? void 0 : _a.url
          };
        }
      }
    );
  }
  async createProxyTab(url) {
    return new Promise((resolve) => {
      this.waitForProxyTabReady(resolve);
      import_webextension_polyfill.default.tabs.create({
        url: url.startsWith("http") ? url : `https://${url}`,
        pinned: true,
        active: false
      });
    });
  }
  async getProxyTab(host, autoCreateTab) {
    let tab = await this.findProxyTab(host);
    return tab;
  }
  async fetch(url, options, proxySettings) {
    const { proxyTargetHost } = proxySettings || {};
    let proxyHost = proxyTargetHost;
    if (!proxyHost) {
      const urlObj = new URL(url);
      proxyHost = urlObj.host;
    }
    const tab = await this.getProxyTab(proxyHost);
    if (tab && tab.id && tab.url) {
      const tabId = tab.id;
      return new Promise((resolve) => {
        var _a;
        const port = import_webextension_polyfill.default.tabs.connect(tabId, { name: v4_default() });
        port.onDisconnect.addListener(() => {
          throw new DOMException("proxy fetch aborted", "AbortError");
        });
        (_a = options == null ? void 0 : options.signal) == null ? void 0 : _a.addEventListener("abort", () => port.disconnect());
        port.onMessage.addListener(function onMessage(message) {
          if (message.event === "Requester_targetTabFetchResponse") {
            const {
              success,
              message: errorMessage,
              data,
              responseInfo
            } = message.data;
            port.onMessage.removeListener(onMessage);
            port.disconnect();
            resolve({
              success,
              message: errorMessage,
              data,
              responseInfo
            });
          }
        });
        let saveUrl = url;
        if (tab.url && !hostIsEqual(url, tab.url)) {
          try {
            const tabUrlObj = new URL(tab.url);
            saveUrl = changeUrlHost(url, tabUrlObj.host);
          } catch (error) {
          }
        }
        port.postMessage({
          event: "Requester_targetTabFetch",
          data: {
            url: saveUrl,
            options,
            proxySettings
          }
        });
      });
    } else {
      return globalFetchRequester.fetch(url, options, proxySettings);
    }
  }
};
var proxyFetchRequester = new ProxyFetchRequester();

// src/features/requester/utils/index.ts
function generateResponseInfo(resp) {
  return {
    ok: resp.ok,
    redirected: resp.redirected,
    status: resp.status,
    statusText: resp.statusText,
    type: resp.type,
    url: resp.url
  };
}
function proxyFetchInBgScript(url, options, proxySettings) {
  return proxyFetchRequester.fetch(url, options, proxySettings);
}
function hostIsEqual(url1, url2) {
  try {
    const urlObj1 = new URL(url1);
    const urlObj2 = new URL(url2);
    return urlObj1.host === urlObj2.host;
  } catch (error) {
    return false;
  }
}
function changeUrlHost(url, targetHost) {
  try {
    const urlObj = new URL(url);
    urlObj.host = targetHost;
    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

// src/features/requester/utils/setupProxyExecutor.ts
function setupProxyExecutor() {
  import_webextension_polyfill2.default.runtime.onConnect.addListener((port) => {
    const abortController = new AbortController();
    port.onDisconnect.addListener(() => {
      abortController.abort();
    });
    port.onMessage.addListener(async (message) => {
      var _a;
      try {
        const { event, data } = message;
        if (event === "Requester_targetTabFetch") {
          const { url, options, proxySettings } = data;
          const responseType = (proxySettings == null ? void 0 : proxySettings.responseType) || "text";
          const resp = await fetch(url, {
            ...options,
            signal: abortController.signal
          });
          const result = await ((_a = resp[responseType]) == null ? void 0 : _a.call(resp));
          port.postMessage({
            event: "Requester_targetTabFetchResponse",
            data: {
              success: true,
              message: "ok",
              data: result,
              responseInfo: generateResponseInfo(resp)
            }
          });
        }
      } catch (error) {
        port.postMessage({
          event: "Requester_targetTabFetchResponse",
          data: {
            success: false,
            message: error.message,
            data: null
          }
        });
      }
    });
  });
}

export {
  proxyFetchRequester,
  setupProxyExecutor,
  proxyFetchInBgScript
};
