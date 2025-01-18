import {
  createBackgroundMessageListener
} from "./RBTIXGC2.js";
import {
  ContentScriptConnectionV2
} from "./KFVZFM6T.js";
import {
  APP_IS_PROD
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __publicField,
  __toESM
} from "./ERZ5UWI7.js";

// src/features/remoteController/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());

// src/features/remoteController/constants/index.ts
var REMOTE_CONTROLLER_API_HOST = "https://www.phtracker.com";

// src/features/remoteController/config.ts
var REMOVE_CONTROLLER_ITEMS_CONFIG = {
  theCardAd: {
    key: `REMOVE_CONTROLLER_THE_CARD_AD`,
    period: 1e3 * 60 * 60 * 24,
    defaultData: {
      disableVersion: "0.0.0"
    },
    fetchFn: async () => {
      const result = await fetch(
        `${REMOTE_CONTROLLER_API_HOST}/crx/info/card/a`
      );
      if (result.status === 200) {
        const htmlBody = await result.text();
        const versionMatchResult = htmlBody.match(
          /<text id="dv">([\s\S]*?)<\/text>/
        );
        const disableVersion = versionMatchResult == null ? void 0 : versionMatchResult[1];
        return {
          disableVersion
        };
      }
      return {
        disableVersion: "0.0.0"
      };
    }
  }
};

// src/features/remoteController/index.ts
var RemoteController = class {
  constructor() {
    __publicField(this, "items");
    this.items = Object.keys(
      REMOVE_CONTROLLER_ITEMS_CONFIG
    );
    import_webextension_polyfill.default.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete" && tab.url && tab.url.includes("google")) {
        this.updateControllerData();
      }
    });
    APP_IS_PROD && this.updateControllerData();
    createBackgroundMessageListener(async (runtime, event, data, sender) => {
      if (runtime === "client") {
        switch (event) {
          case "RemoteController_getControllerData": {
            const resp = await this.getControllerData(data.key);
            return {
              success: true,
              message: "ok",
              data: resp
            };
            break;
          }
          default:
            break;
        }
      }
      return void 0;
    });
  }
  updateControllerData() {
    return Promise.all(
      this.items.map((key) => this.updateControllerDataByKey(key))
    );
  }
  async updateControllerDataByKey(key) {
    const config = REMOVE_CONTROLLER_ITEMS_CONFIG[key];
    const cacheData = await this.getControllerData(key);
    const currentTime = Date.now();
    if (currentTime - cacheData.cacheTime <= config.period) {
      return;
    }
    const data = await this.fetchControllerDataByKey(key);
    data.cacheTime = Date.now();
    await import_webextension_polyfill.default.storage.local.set({
      [config.key]: data
    });
    return data;
  }
  async fetchControllerDataByKey(key) {
    const config = REMOVE_CONTROLLER_ITEMS_CONFIG[key];
    try {
      return await config.fetchFn();
    } catch (error) {
      return config.defaultData;
    }
  }
  addControllerItem(key) {
    this.items.push(key);
  }
  async getControllerData(key) {
    var _a;
    const config = REMOVE_CONTROLLER_ITEMS_CONFIG[key];
    const caches = await import_webextension_polyfill.default.storage.local.get(config.key);
    return (_a = caches[config.key]) != null ? _a : config.defaultData;
  }
};
var remoteController_default = RemoteController;

// src/features/remoteController/utils/index.ts
var port = new ContentScriptConnectionV2({
  runtime: "client"
});
var getRemoteControllerData = async (key) => {
  const resp = await port.postMessage({
    event: "RemoteController_getControllerData",
    data: {
      key
    }
  });
  return resp.data;
};
var remoteControllerInit = () => {
  return new remoteController_default();
};

export {
  getRemoteControllerData,
  remoteControllerInit
};
