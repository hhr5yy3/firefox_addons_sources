import {
  require_react
} from "./AMCWABVH.js";
import {
  getUseChatGPTAccessToken
} from "./QVVA4RGO.js";
import {
  APP_USE_CHAT_GPT_API_HOST,
  CHROME_EXTENSION_POST_MESSAGE_ID
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/background/utils/index.ts
var import_react = __toESM(require_react());
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var createBackgroundMessageListener = (listener) => {
  const currentListener = (message, sender) => {
    const {
      data: { _RUNTIME_, ...rest },
      event,
      id
    } = message;
    if (id !== CHROME_EXTENSION_POST_MESSAGE_ID) {
      return;
    }
    return new Promise((resolve) => {
      listener(_RUNTIME_, event, rest, sender).then((result) => {
        if (result && Object.prototype.hasOwnProperty.call(result, "success")) {
          resolve(result);
        }
      });
    });
  };
  import_webextension_polyfill.default.runtime.onMessage.addListener(currentListener);
  return () => {
    import_webextension_polyfill.default.runtime.onMessage.removeListener(currentListener);
  };
};
var createClientMessageListener = (listener) => {
  const modifyListener = (message, sender) => {
    const { data, event, id } = message;
    if (id !== CHROME_EXTENSION_POST_MESSAGE_ID) {
      return;
    }
    return new Promise((resolve) => {
      listener(event, data, sender).then((result) => {
        if (result && Object.prototype.hasOwnProperty.call(result, "success")) {
          resolve(result);
        }
      });
    });
  };
  import_webextension_polyfill.default.runtime.onMessage.addListener(modifyListener);
  return () => {
    import_webextension_polyfill.default.runtime.onMessage.removeListener(modifyListener);
  };
};
var backgroundRestartChromeExtension = async () => {
  try {
    const tabIds = await import_webextension_polyfill.default.tabs.query({
      active: true,
      currentWindow: true
    });
    await import_webextension_polyfill.default.runtime.reload();
    tabIds.forEach((tab) => {
      if (tab.id) {
        import_webextension_polyfill.default.tabs.reload(tab.id);
      }
    });
  } catch (e) {
  }
};
var createChromeExtensionOptionsPage = async (query = "", autoFocus = true) => {
  const chromeExtensionId = import_webextension_polyfill.default.runtime.id;
  const findOptionPages = await import_webextension_polyfill.default.tabs.query({
    url: `chrome-extension://${chromeExtensionId}/pages/options/options.html`
  });
  await Promise.all(
    findOptionPages.map(async (page) => {
      if (page.id) {
        await import_webextension_polyfill.default.tabs.remove(page.id);
      }
    })
  );
  await import_webextension_polyfill.default.tabs.create({
    url: `chrome-extension://${chromeExtensionId}/pages/options/options.html${query}`,
    active: autoFocus
  });
};
var fetchBackendApi = async (url, data) => {
  try {
    const accessToken = await getUseChatGPTAccessToken();
    if (!accessToken) {
      return new Error("No access token");
    }
    const response = await fetch(`${APP_USE_CHAT_GPT_API_HOST}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const json = await response.json();
    return json;
  } catch (e) {
  }
};
var safeGetBrowserTab = async (tabId) => {
  if (tabId) {
    try {
      return await import_webextension_polyfill.default.tabs.get(tabId);
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export {
  createBackgroundMessageListener,
  createClientMessageListener,
  backgroundRestartChromeExtension,
  createChromeExtensionOptionsPage,
  fetchBackendApi,
  safeGetBrowserTab
};
