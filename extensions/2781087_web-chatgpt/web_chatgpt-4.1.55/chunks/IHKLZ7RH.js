import {
  getChromeExtensionAssetsURL
} from "./PMGMIR4S.js";
import {
  fetchBackendApi
} from "./RBTIXGC2.js";
import {
  ContentScriptConnectionV2
} from "./KFVZFM6T.js";
import {
  require_dayjs_min
} from "./4NOIXOKC.js";
import {
  MAXAI_APP_LINK
} from "./XVTLOGGR.js";
import {
  debounce_default
} from "./TOGVC2JX.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/utils/promiseUtils.ts
var promiseTimeout = (promise, timeout, fallbackData) => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(fallbackData);
    }, timeout);
    promise.then((result) => {
      clearTimeout(timeoutId);
      resolve(result);
    }).catch((error) => {
      clearTimeout(timeoutId);
      resolve(fallbackData);
    });
  });
};

// src/features/auth/utils/log.ts
var authEmitPricingHooksLog = debounce_default(
  async (action, sceneType) => {
    try {
      const port = new ContentScriptConnectionV2();
      await port.postMessage({
        event: "Client_emitPricingHooks",
        data: {
          action,
          name: sceneType
        }
      });
    } catch (e) {
    }
  },
  1e3
);
var backendApiReportPricingHooks = async (logData) => {
  try {
    await fetchBackendApi("/user/cardlog", logData);
  } catch (e) {
  }
};

// src/features/auth/components/PermissionWrapper/types.ts
var import_dayjs = __toESM(require_dayjs_min());
var isPermissionCardSceneType = (sceneType) => {
  return Object.keys(PERMISSION_CARD_SETTINGS_TEMPLATE).includes(sceneType);
};
var getPermissionCardSettingsBySceneType = (sceneType) => {
  return {
    ctaButtonLink: `${MAXAI_APP_LINK}/pricing`,
    ...PERMISSION_CARD_SETTINGS_TEMPLATE[sceneType]
  };
};
var PERMISSION_CARD_SETTINGS_TEMPLATE = {
  // 20230927 更新 own prompt 不添加卡点
  // ONECLICKPROMPTS_ADD_OWN: {
  //   imageUrl: getChromeExtensionAssetsURL(
  //     '/images/upgrade/one-click-prompt-custom.png',
  //   ),
  //   title: 'Upgrade to add unlimited custom prompts',
  //   description:
  //     'Add your own prompts to speed up repetitive tasks as you work.',
  //   ctaButtonText: 'Upgrade to Pro',
  // },
  // ONECLICKPROMPTS_ADD_FAVORITES: {
  //   imageUrl: getChromeExtensionAssetsURL(
  //     '/images/upgrade/one-click-prompt-favorite.png',
  //   ),
  //   title: 'Upgrade to save unlimited favorite prompts',
  //   description:
  //     'Save frequently used and valuable prompts to Favorites to streamline your daily tasks.',
  //   ctaButtonText: 'Upgrade to Pro',
  // },
  WEBACCESS_COPILOT: {
    videoUrl: "https://www.youtube.com/embed/uDMJNf841dc?si=LRw9KpDc8S6kHwaq",
    imageUrl: getChromeExtensionAssetsURL(
      "/images/upgrade/web-access-full-insights.png"
    ),
    title: "Upgrade to get the best answers with Copilot",
    description: "Get answers to the hardest questions with comprehensive web insights.",
    ctaButtonText: "Upgrade to Pro"
  },
  WEBACCESS_SEARCH_ENGINE: {
    imageUrl: getChromeExtensionAssetsURL(
      "/images/upgrade/advanced-options.png"
    ),
    title: "Upgrade to access all advanced options",
    description: `Choose from the world's top search engines, get more search results, specify search time range and region, and select AI response language with Web Access.`,
    ctaButtonText: "Upgrade to Pro"
  },
  WEBACCESS_SEARCH_RESULTS: {
    imageUrl: getChromeExtensionAssetsURL(
      "/images/upgrade/advanced-options.png"
    ),
    title: "Upgrade to access all advanced options",
    description: `Choose from the world's top search engines, get more search results, specify search time range and region, and select AI response language with Web Access.`,
    ctaButtonText: "Upgrade to Pro"
  },
  WEBACCESS_TIME: {
    imageUrl: getChromeExtensionAssetsURL(
      "/images/upgrade/advanced-options.png"
    ),
    title: "Upgrade to access all advanced options",
    description: `Choose from the world's top search engines, get more search results, specify search time range and region, and select AI response language with Web Access.`,
    ctaButtonText: "Upgrade to Pro"
  },
  WEBACCESS_REGION: {
    imageUrl: getChromeExtensionAssetsURL(
      "/images/upgrade/advanced-options.png"
    ),
    title: "Upgrade to access all advanced options",
    description: `Choose from the world's top search engines, get more search results, specify search time range and region, and select AI response language with Web Access.`,
    ctaButtonText: "Upgrade to Pro"
  },
  WEBACCESS_LANGUAGE: {
    imageUrl: getChromeExtensionAssetsURL(
      "/images/upgrade/advanced-options.png"
    ),
    title: "Upgrade to access all advanced options",
    description: `Choose from the world's top search engines, get more search results, specify search time range and region, and select AI response language with Web Access.`,
    ctaButtonText: "Upgrade to Pro"
  }
};

export {
  promiseTimeout,
  authEmitPricingHooksLog,
  backendApiReportPricingHooks,
  isPermissionCardSceneType,
  getPermissionCardSettingsBySceneType
};
