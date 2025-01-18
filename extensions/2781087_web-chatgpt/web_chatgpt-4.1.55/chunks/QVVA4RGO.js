import {
  ContentScriptConnectionV2
} from "./KFVZFM6T.js";
import {
  require_dayjs_min
} from "./4NOIXOKC.js";
import {
  APP_USE_CHAT_GPT_API_HOST
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/auth/utils/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());

// src/features/auth/constant/index.ts
var USECHATGPT_AUTH_INFO_STORAGE_KEY = "USECHATGPT_AUTH_INFO_STORAGE_KEY_20230829";
var USER_ROLE_PRIORITY = {
  new_user: 0,
  old_free_user: 0,
  pro_gift: 0,
  free: 0,
  pro: 1,
  elite: 2
};

// src/features/auth/utils/index.ts
var import_dayjs = __toESM(require_dayjs_min());

// src/utils/api.ts
var USER_API = {
  GET_USER_INFO: "/user/get_user_info",
  TWITTER_SHARE_COMPLETE: "/user/twitter_share_complete",
  TWITTER_FOLLOWING_COMPLETE: "/user/twitter_following_complete",
  GET_REFERRAL_DASHBOARD: "/user/get_referral_dashboard",
  SAVE_TWITTER_SCREEN_NAME: "/user/save_twitter_screen_name",
  GET_TWITTER_REFERRAL_TASKS_STATUS: "/user/get_twitter_referral_tasks_status",
  GET_USER_SUBSCRIPTION_INFO: "/user/get_user_subscription_info"
};
var PROMPT_API = {
  GET_FAVOURITE_PROMPTS: "/prompt/get_favourite_prompts",
  GET_OWN_PROMPTS: "/prompt/get_own_prompts",
  SEARCH_PROMPT: "/prompt/search_prompt",
  GET_PROMPT_DETAIL: "/prompt/get_prompt_detail",
  GET_PRIVATE_PROMPT_DETAIL: "/prompt/get_private_prompt_detail",
  PROMPT_CATEGORY: "/prompt/category",
  ADD_PROMPT: "/prompt/add_own_prompt",
  ADD_FAVOURITE_PROMPT: "/prompt/add_favourite_prompt",
  REMOVE_FAVOURITE_PROMPT: "/prompt/remove_favourite_prompt",
  DELETE_PROMPT: "/prompt/remove_own_prompt",
  EDIT_OWN_PROMPT: "/prompt/update_own_prompt"
};

// src/features/auth/utils/index.ts
var syncAuthClientLogin = () => {
  try {
    const loginEmail = window.localStorage.getItem(
      "UseChatGPTAuthServiceProvider.email"
    );
    const localStoreKeyPrefix = `UseChatGPTAuthServiceProvider.${loginEmail}`;
    const accessToken = window.localStorage.getItem(
      localStoreKeyPrefix + ".accessToken"
    );
    const refreshToken = window.localStorage.getItem(
      localStoreKeyPrefix + ".refreshToken"
    );
    if (refreshToken) {
      return {
        accessToken,
        refreshToken,
        email: loginEmail
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
var getUseChatGPTAccessToken = async () => {
  var _a;
  const cache = await import_webextension_polyfill.default.storage.local.get(
    USECHATGPT_AUTH_INFO_STORAGE_KEY
  );
  if (cache[USECHATGPT_AUTH_INFO_STORAGE_KEY]) {
    return (_a = cache[USECHATGPT_AUTH_INFO_STORAGE_KEY]) == null ? void 0 : _a.refreshToken;
  }
  return "";
};
var getUseChatGPTUserInfo = async () => {
  var _a;
  const cache = await import_webextension_polyfill.default.storage.local.get(
    USECHATGPT_AUTH_INFO_STORAGE_KEY
  );
  if (cache[USECHATGPT_AUTH_INFO_STORAGE_KEY]) {
    return (_a = cache[USECHATGPT_AUTH_INFO_STORAGE_KEY]) == null ? void 0 : _a.userInfo;
  }
  return null;
};
var logoutUseChatGPTAuth = async () => {
  const port = new ContentScriptConnectionV2({
    runtime: "client"
  });
  const result = await port.postMessage({
    event: "Client_logoutUseChatGPTAuth"
  });
  return result.success;
};
var fetchUserSubscriptionInfo = async () => {
  try {
    const token = await getUseChatGPTAccessToken();
    if (!token) {
      return void 0;
    }
    const response = await fetch(
      `${APP_USE_CHAT_GPT_API_HOST}${USER_API.GET_USER_SUBSCRIPTION_INFO}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.ok) {
      const result = await response.json();
      if (result.status === "OK" && result.data) {
        return result.data;
      }
    }
    return void 0;
  } catch (e) {
    return void 0;
  }
};
var parseUserPlan = (userInfo) => {
  var _a, _b;
  try {
    const roles = (_a = userInfo.roles) != null ? _a : [];
    const sortedRoles = [...roles].sort((a, b) => {
      return (USER_ROLE_PRIORITY[b.name] || 0) - (USER_ROLE_PRIORITY[a.name] || 0);
    });
    let name = ((_b = sortedRoles == null ? void 0 : sortedRoles[0]) == null ? void 0 : _b.name) || "free";
    let isNewUser = false;
    if (userInfo == null ? void 0 : userInfo.chatgpt_expires_at) {
      if (name === "free" && new Date(userInfo.chatgpt_expires_at).getTime() > new Date().getTime()) {
        name = "pro_gift";
      }
    }
    if (name === "free" && (userInfo == null ? void 0 : userInfo.created_at)) {
      const created_at = (0, import_dayjs.default)(userInfo == null ? void 0 : userInfo.created_at);
      const now = (0, import_dayjs.default)().utc();
      const diffDays = now.diff(created_at, "day");
      const NEW_USER_DAYS = -1e5;
      if (diffDays <= NEW_USER_DAYS) {
        name = "new_user";
        isNewUser = true;
      }
    }
    return name;
  } catch (e) {
    return "free";
  }
};

export {
  USECHATGPT_AUTH_INFO_STORAGE_KEY,
  PROMPT_API,
  syncAuthClientLogin,
  getUseChatGPTAccessToken,
  getUseChatGPTUserInfo,
  logoutUseChatGPTAuth,
  fetchUserSubscriptionInfo,
  parseUserPlan
};
