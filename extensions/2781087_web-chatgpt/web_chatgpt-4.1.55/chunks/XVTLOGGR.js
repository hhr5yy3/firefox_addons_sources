import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/constants/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());

// src/constants/zIndex.ts
var Z_INDEX_BASE = 2147481e3;
var Z_INDEX = {
  // PROMPT_APP: Z_INDEX_BASE + 1,
  TOOLBAR: 1,
  RUNNING_CARD: 1 + 10,
  PROMPT_RUNNER: 2 + 10,
  MODAL: Z_INDEX_BASE + 100,
  MODAL_1: Z_INDEX_BASE + 900,
  MODAL_2: Z_INDEX_BASE + 800,
  PRO_TIP: Z_INDEX_BASE + 1e3,
  TOAST: Z_INDEX_BASE + 1e4
};

// src/constants/eventType.ts
var SYNC_USER_CONFIG_STORE_EVENT = "SYNC_USER_CONFIG_STORE_EVENT";

// src/constants/index.ts
var CHROME_EXTENSION_POST_MESSAGE_ID = `WEBCHATGPT_CHROME_EXTENSION_POST_MESSAGE_ID`;
var IS_FIREFOX = Boolean(true);
var WEBCHATGPT_VERSION = import_webextension_polyfill.default.runtime.getManifest().version;
var isProduction = String("production") === "production";
var APP_VERSION = String("4.1.55");
var APP_USE_CHAT_GPT_API_HOST = "https://api.maxai.me";
var APP_USE_CHAT_GPT_HOST = "https://app.maxai.me";
var APP_FREE_AI_HOST = "https://api.maxai.me";
var APP_NOTIFICATION_HOST = "https://api.extensions-hub.com";
var APP_IS_PROD = true;
var RUNNING_CARD_MESSAGE = "RUNNING_CARD_MESSAGE";
var ZMO_TOOLS_LINK = "https://tools.zmo.ai";
var MAXAI_APP_LINK = "https://app.maxai.me";
var MAXAI_INSTALL_LINK = "https://api.maxai.me/app/maxai-web?ref=webchatgpt";
var WEBCHATGPT_CHROME_STORE_LINK = "https://chrome.google.com/webstore/detail/webchatgpt-chatgpt-with-i/lpfemeioodjbpieminkklglpmhlngfcn";
var DISCORD_INVITE_LINK = "https://discord.gg/hjvAtVNtHa";
var CHAT_GPT_MESSAGES_RECOIL_KEY = "CHAT_GPT_MESSAGES_RECOIL_KEY";
var AI_PROVIDER_MAP = {
  OPENAI: "OPENAI",
  CLAUDE: "CLAUDE",
  BARD: "BARD",
  BING: "BING",
  USE_CHAT_GPT_PLUS: "USE_CHAT_GPT_PLUS",
  // OPENAI_API: 'OPENAI_API',
  // POE: 'POE',
  MAXAI_CLAUDE: "MAXAI_CLAUDE",
  FREE_AI: "FREE_AI",
  GEMINI: "GEMINI"
};
var AI_PROVIDER_NAME_MAP = {
  [AI_PROVIDER_MAP.OPENAI]: "ChatGPT",
  [AI_PROVIDER_MAP.CLAUDE]: "Claude",
  [AI_PROVIDER_MAP.BARD]: "Bard",
  [AI_PROVIDER_MAP.BING]: "Bing Chat",
  [AI_PROVIDER_MAP.USE_CHAT_GPT_PLUS]: "MaxAI ChatGPT",
  OPENAI_API: "OPENAI_API",
  // POE: 'POE',
  [AI_PROVIDER_MAP.MAXAI_CLAUDE]: "Claude",
  [AI_PROVIDER_MAP.FREE_AI]: "Free AI",
  [AI_PROVIDER_MAP.GEMINI]: "Gemini"
};
var BACKGROUND_SEND_TEXT_SPEED_SETTINGS = "BACKGROUND_SEND_TEXT_SPEED_SETTINGS";
var CHAT_HUB_LAYOUT_STORAGE_KEY = "CHAT_HUB_LAYOUT_STORAGE_KEY";
var CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY = "CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY";
var CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY = "CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY";

// src/features/chatgpt/constants/index.ts
var CHATGPT_3_5_MODEL_NAME = "text-davinci-002-render-sha";

export {
  Z_INDEX,
  SYNC_USER_CONFIG_STORE_EVENT,
  CHROME_EXTENSION_POST_MESSAGE_ID,
  IS_FIREFOX,
  WEBCHATGPT_VERSION,
  isProduction,
  APP_VERSION,
  APP_USE_CHAT_GPT_API_HOST,
  APP_USE_CHAT_GPT_HOST,
  APP_FREE_AI_HOST,
  APP_NOTIFICATION_HOST,
  APP_IS_PROD,
  RUNNING_CARD_MESSAGE,
  ZMO_TOOLS_LINK,
  MAXAI_APP_LINK,
  MAXAI_INSTALL_LINK,
  WEBCHATGPT_CHROME_STORE_LINK,
  DISCORD_INVITE_LINK,
  CHAT_GPT_MESSAGES_RECOIL_KEY,
  AI_PROVIDER_MAP,
  AI_PROVIDER_NAME_MAP,
  BACKGROUND_SEND_TEXT_SPEED_SETTINGS,
  CHAT_HUB_LAYOUT_STORAGE_KEY,
  CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY,
  CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY,
  CHATGPT_3_5_MODEL_NAME
};
