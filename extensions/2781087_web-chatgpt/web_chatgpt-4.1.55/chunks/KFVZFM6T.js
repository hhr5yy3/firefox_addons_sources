import {
  CHATGPT_3_5_MODEL_NAME,
  CHROME_EXTENSION_POST_MESSAGE_ID
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __publicField,
  __toESM
} from "./ERZ5UWI7.js";

// src/features/chatgpt/utils/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var ContentScriptConnectionV2 = class {
  constructor(options = {}) {
    __publicField(this, "runtime");
    this.runtime = options.runtime || "client";
  }
  async postMessage(msg) {
    try {
      return await import_webextension_polyfill.default.runtime.sendMessage({
        id: CHROME_EXTENSION_POST_MESSAGE_ID,
        event: msg.event,
        data: {
          ...msg.data,
          _RUNTIME_: this.runtime
        }
      });
    } catch (e) {
      return {
        success: false,
        message: e.message,
        data: {}
      };
    }
  }
  destroy() {
  }
};
var getCurrentModelName = () => {
  var _a, _b, _c, _d, _e, _f, _g;
  const modelMap = {
    "gpt-4-code-interpreter": "gpt-4-code-interpreter",
    "gpt-4-plugins": "gpt-4-plugins",
    "gpt-4": "gpt-4",
    "text-davinci-002-render-sha": "text-davinci-002-render-sha"
  };
  try {
    const searchParams = new URLSearchParams(location.search);
    const model = searchParams.get("model");
    if (model && modelMap[model]) {
      return modelMap[model];
    }
    const headerEl = document.querySelector("header.sticky");
    const uploadFileButton = document.querySelector(
      'button[aria-label="Upload file"]'
    );
    if (uploadFileButton || ((_a = headerEl == null ? void 0 : headerEl.textContent) == null ? void 0 : _a.includes("Code Interpreter"))) {
      return "gpt-4-code-interpreter";
    }
    const pluginButton = document.querySelector(
      'button[id^="headlessui-listbox-button-"]'
    );
    if (pluginButton || ((_b = headerEl == null ? void 0 : headerEl.textContent) == null ? void 0 : _b.includes("Plugins"))) {
      return "gpt-4-plugins";
    }
    const isSelectGpt4 = (_c = document.querySelector("li[data-testid=gpt-4] > button > div")) == null ? void 0 : _c.classList.contains("dark:bg-gray-700");
    if (isSelectGpt4 || ((_d = headerEl == null ? void 0 : headerEl.textContent) == null ? void 0 : _d.includes("GPT-4"))) {
      return "gpt-4";
    }
    const isSelectGpt3_5 = (_e = document.querySelector(
      "li[data-testid=text-davinci-002-render-sha] > button > div"
    )) == null ? void 0 : _e.classList.contains("dark:bg-gray-700");
    if (isSelectGpt3_5 || ((_f = headerEl == null ? void 0 : headerEl.textContent) == null ? void 0 : _f.includes("GPT-3.5"))) {
      return CHATGPT_3_5_MODEL_NAME;
    }
    const keys = Object.keys(localStorage);
    const targetKey = keys.find((key) => key.includes("/lastModelUsed"));
    if (targetKey) {
      const value = JSON.parse((_g = localStorage.getItem(targetKey)) != null ? _g : "{}");
      return value.modelId || CHATGPT_3_5_MODEL_NAME;
    }
    return CHATGPT_3_5_MODEL_NAME;
  } catch (error) {
    return CHATGPT_3_5_MODEL_NAME;
  }
};

export {
  ContentScriptConnectionV2,
  getCurrentModelName
};
