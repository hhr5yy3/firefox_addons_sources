import { _ as __vite_glob_0_0, T as __vite_glob_0_1, U as __vite_glob_0_3, V as __vite_glob_0_5, W as __vite_glob_0_12, X as __vite_glob_0_13, Y as answerSimpleLogin, Q as Q_SIMPLE_LOGIN, L as LOGOUT, Z as RELOAD_EXTENSION, $ as CREATE_TAB, a0 as ExtensionScrappingWorkingMode, a1 as setIsShopMatch, a2 as startAppLoading, a3 as fetchProductStatsResult, a4 as releasedOffert, a5 as SCRAPPED_DATA, a6 as shouldLoadUI, a7 as scrapConfigMatch } from "./metricsAlerts.api-6ae7940f.js";
import { _ as __vite_glob_0_2 } from "./extension.api-b6898106.js";
import { _ as __vite_glob_0_4 } from "./metricsInstall.api-01d1c521.js";
import { _ as __vite_glob_0_6 } from "./metricsSerp.api-001fbd5b.js";
import { _ as __vite_glob_0_7 } from "./metricsSerpChollo.api-f5a4c373.js";
import { _ as __vite_glob_0_8 } from "./metricsviews.api-7ef95827.js";
import { _ as __vite_glob_0_9 } from "./offer.api-ccc5b063.js";
import { _ as __vite_glob_0_10 } from "./similar.api-b9696a8f.js";
import { _ as __vite_glob_0_11 } from "./voucher.api-2bbc894e.js";
import { m as makeRequest, b as browser, l as logger, O as ObservableAPIStore, h as checkAuthRequest, U as UserData, e as errorCapture, f as analytics, i as isAuthorizationExpired, j as isAuthorizationRefreshable, p as privatePolicyData, D as DataRepository, u as userIsLoggedIn, s as serpShopsData, g as getExtensionPage, k as schemaData } from "./urlAccess-93f11c64.js";
import { M as M_ANALYTICS } from "./analytics.saga-1b7095bf.js";
import { r as receiveMessage, a as receiveMessages, s as sendMessage } from "./messageEngine-ccf4a39f.js";
import "./index-3da6bb4f.js";
const backgroundFetcher = async (i, o, sender) => {
  const x = await makeRequest({
    endpoint: i.toString(),
    body: o?.body,
    method: o?.method || "GET",
    sender
  });
  return { json: () => Promise.resolve(x), ok: true };
};
const apiCache = {};
browser.runtime.onMessage.addListener(function(message, sender) {
  const apiMethod = apiCache[message.type];
  if (!apiMethod)
    return false;
  const context = {
    sender
  };
  message?.payload !== void 0 && logger.log("hola");
  return apiMethod.call(context, message.payload);
});
const processedAPIs = [];
function createAPIReceiver(api) {
  if (api.name in processedAPIs) {
    logger.warn("API: ", api.name, "registered twice");
    return;
  }
  processedAPIs[api.name] = api;
  api.init(backgroundFetcher);
  const obAPI = ObservableAPIStore.get(api, false);
  const cacheTimeDelta = 30 * 60 * 1e3;
  let lastReadTimeStamp = 0;
  for (const key in api.actions.q) {
    const questionType = api.actions.q[key];
    const answerType = api.actions.a[key];
    const [apiId, action] = questionType.split(".");
    const method = obAPI[action];
    if (action != "read") {
      if (method) {
        const apiMethod = createMethodHandler(method, answerType);
        apiCache[questionType] = async function(data) {
          logger.debug(`api.collect[${api.name}.${action}]: `, data);
          api.setContext((ctx) => this);
          lastReadTimeStamp = 0;
          return apiMethod(data);
        };
      } else {
        const errorMessage = `NO_API_${action.toUpperCase()}`;
        logger.error("api.collect", errorMessage);
        apiCache[questionType] = async function() {
          return Promise.resolve({
            type: answerType,
            error: new Error(errorMessage)
          });
        };
      }
    } else {
      const read = createMethodHandler(
        async () => {
          logger.debug(`api.collect[${api.name}.${action}]`);
          if (lastReadTimeStamp + cacheTimeDelta < Date.now()) {
            const data = await obAPI.readForce();
            logger.debug(`api.collect[${api.name}.${action}]: cache updated`, {
              data
            });
            logger.debug(`api.collect[${api.name}.${action}]: triggering sync`);
            syncHandler({
              type: api.actions.syncId,
              payload: data
            });
            return data;
          }
          return obAPI.read();
        },
        answerType
      );
      apiCache[questionType] = async function() {
        const result = await read();
        if (result.payload !== void 0) {
          lastReadTimeStamp = Date.now();
        }
        return result;
      };
    }
  }
}
function createMethodHandler(apiMethod, answerType, sender) {
  return async (data) => {
    try {
      try {
        const result = await apiMethod(data);
        return {
          type: answerType,
          payload: result
        };
      } catch (e) {
        return {
          type: answerType,
          error: e
        };
      }
    } catch (e) {
      return Promise.resolve({
        type: answerType,
        error: e
      });
    }
  };
}
const modules = /* @__PURE__ */ Object.assign({ "/src/ui/features/account/api/config/user-config.api.ts": __vite_glob_0_0, "/src/ui/features/account/api/settings/user-settings.api.ts": __vite_glob_0_1, "/src/ui/features/app/api/extension/extension.api.ts": __vite_glob_0_2, "/src/ui/features/app/api/metrics/metricsAlerts.api.ts": __vite_glob_0_3, "/src/ui/features/app/api/metrics/metricsInstall.api.ts": __vite_glob_0_4, "/src/ui/features/app/api/metrics/metricsPepper.api.ts": __vite_glob_0_5, "/src/ui/features/app/api/metrics/metricsSerp.api.ts": __vite_glob_0_6, "/src/ui/features/app/api/metrics/metricsSerpChollo.api.ts": __vite_glob_0_7, "/src/ui/features/app/api/metrics/metricsviews.api.ts": __vite_glob_0_8, "/src/ui/features/pepper-posts/api/offer.api.ts": __vite_glob_0_9, "/src/ui/features/pepper-posts/api/similar.api.ts": __vite_glob_0_10, "/src/ui/features/pepper-posts/api/voucher.api.ts": __vite_glob_0_11, "/src/ui/features/price-track/api/price-track-notifications/price-track-notifications.api.ts": __vite_glob_0_12, "/src/ui/features/price-track/api/price-track/price-track.api.ts": __vite_glob_0_13 });
const apiRegistrationErrors = [];
for (const filename of Object.keys(modules)) {
  logger.log(filename, "moduleFile");
  const apiHandler = modules[filename];
  const moduleKeys = Object.keys(apiHandler);
  logger.log("module result on collecting", apiHandler);
  if (moduleKeys.length === 1) {
    const moduleKey = moduleKeys[0];
    createAPIReceiver(apiHandler[moduleKey]);
  }
}
if (apiRegistrationErrors.length > 0) {
  throw new Error(
    `INVALID_API_HANDLERS: ${apiRegistrationErrors.reduce(
      (acc, curr) => `${acc}
${curr}`,
      ""
    )}`
  );
}
let syncHandler = () => {
};
function registerSyncHandler(handler) {
  syncHandler = typeof handler === "function" ? handler : syncHandler;
}
function normalizeStr(str) {
  return str === null ? null : str.normalize("NFKC");
}
function normalizeProductInfo(sender, product) {
  product.id = product.id === null ? null : `${product.id}`;
  product.price = normalizeDecimals(product.price);
  product.shippingPrice = normalizeDecimals(product.shippingPrice);
  product.title = normalizeStr(product.title);
  product.imageUrl = product.imageUrl && normalizeUrl(sender, product.imageUrl);
  return product;
}
function normalizeDecimals(decimalPrice) {
  return decimalPrice === null ? null : parseFloat(parseFloat(`${decimalPrice}`).toFixed(2));
}
function normalizeUrl(sender, imageUrl) {
  if (!sender)
    return imageUrl;
  const shopUrl = new URL(imageUrl, sender.origin);
  return shopUrl.href;
}
receiveMessage(Q_SIMPLE_LOGIN, async (sender, loginData) => {
  if (!loginData) {
    return getAnswerSimpleLoginData();
  }
  try {
    const authUser = await checkAuthRequest("auth", loginData);
    await UserData.set({
      ...loginData,
      ...authUser
    });
    return answerSimpleLogin({
      loggedIn: true,
      username: authUser.username,
      email: authUser.email,
      avatarUrl: authUser.avatarUrl
    });
  } catch (e) {
    errorCapture(e);
    logger.error("Cannot log in", e);
    return answerSimpleLogin({
      loggedIn: false,
      username: "",
      email: "",
      avatarUrl: ""
    });
  }
});
receiveMessage(LOGOUT, async (sender) => {
  logger.log("bg user logout");
  UserData.clear();
});
receiveMessage(M_ANALYTICS, async (sender, event) => {
  switch (event.method) {
    case "screenView":
    case "pageView":
      event.data["tabId"] = sender.tab.id;
  }
  analytics[event.method](event.data);
});
receiveMessages(
  SCRAPPED_DATA,
  async function* (sender, {
    data: scrappedProduct,
    url,
    config
  }) {
    let product = scrappedProduct;
    logger.debug("Scrapped product:", product);
    if (config?.workingMode === ExtensionScrappingWorkingMode.onlyId && !product?.id) {
      yield setIsShopMatch(false);
      return;
    }
    yield setIsShopMatch(true);
    yield startAppLoading(true);
    try {
      product = normalizeProductInfo(sender, product);
      logger.debug("Normalized product:", product);
    } catch (error) {
      logger.error("Normalization error", { error });
    }
    logger.log("Analysis error short circuit -> Run App");
    try {
      if (!product?.url) {
        product.url = url;
      }
      const { data: statsData } = await makeRequest({
        endpoint: `product`,
        body: product,
        method: "POST",
        sender
      });
      const productStats = statsData?.stats;
      const payload = {
        shop: productStats?.shop || null,
        product: productStats && normalizeProductInfo(sender, productStats),
        priceHistory: statsData.priceHistory && statsData.priceHistory.map((elm) => {
          elm.price = normalizeDecimals(elm.price);
          return elm;
        }) || []
      };
      yield getAnswerSimpleLoginData();
      yield fetchProductStatsResult(payload);
      yield startAppLoading(false);
      const {
        data: { postedOffer }
      } = await makeRequest({
        endpoint: "pepper/posted-offer",
        body: product,
        method: "POST",
        sender
      });
      return releasedOffert(postedOffer);
    } catch (e) {
      logger.error(`${SCRAPPED_DATA} error`, e);
      errorCapture(e);
    }
  }
);
receiveMessage(RELOAD_EXTENSION, async (sender) => {
  logger.log("RELOADING EXTENSION");
  browser.runtime.reload?.();
});
async function getAnswerSimpleLoginData() {
  const userData = await UserData.get();
  if (!userData) {
    return answerSimpleLogin({
      loggedIn: false,
      username: "",
      email: "",
      avatarUrl: ""
    });
  }
  if (!await isAuthorizationExpired()) {
    return answerSimpleLogin({
      loggedIn: true,
      username: userData.username,
      email: userData.email,
      avatarUrl: userData.avatarUrl
    });
  }
  try {
    if (await isAuthorizationRefreshable()) {
      await checkAuthRequest("refresh", userData);
      return answerSimpleLogin({
        loggedIn: true,
        username: userData.username,
        email: userData.email,
        avatarUrl: userData.avatarUrl
      });
    }
    const auth = await checkAuthRequest("auth", userData);
    const newUserData = {
      ...userData,
      ...auth
    };
    UserData.set(newUserData);
    return answerSimpleLogin({
      loggedIn: true,
      username: newUserData.username,
      avatarUrl: newUserData.avatarUrl,
      email: newUserData.email
    });
  } catch (e) {
    errorCapture(e);
    return answerSimpleLogin({
      loggedIn: false,
      username: "",
      email: "",
      avatarUrl: ""
    });
  }
}
receiveMessage(CREATE_TAB, async (sender, tabName) => {
  logger.log("create tab");
  browser.tabs.create({ url: tabName }).then((tab) => {
    logger.log("pptab", { tab });
    privatePolicyData.set({ ppId: tab.id, isPolicyAuth: false });
  });
});
var ShopScrapperConf;
((ShopScrapperConf2) => {
  const scrpaConfStorage = new DataRepository("scrapConfigs");
  async function set(scrapConfigs) {
    await scrpaConfStorage.set({ scrapConfigs });
  }
  ShopScrapperConf2.set = set;
  async function get() {
    const { scrapConfigs } = await scrpaConfStorage.get();
    scList = (await discardDisabled([...scrapConfigs])).map((x) => ({
      ...x,
      matcher: new RegExp(x.urlMatch)
    }));
    return mergeConfigs(scList);
  }
  ShopScrapperConf2.get = get;
  let scList = [];
  async function discardDisabled(scrapConfigs) {
    {
      scrapConfigs = scrapConfigs.filter(
        (x) => x.workingMode !== ExtensionScrappingWorkingMode.disabled
      );
    }
    return scrapConfigs;
  }
  async function mergeConfigs(shopDetailMatchers) {
    return shopDetailMatchers;
  }
})(ShopScrapperConf || (ShopScrapperConf = {}));
class TabManager {
  constructor({
    getConfig,
    onTabMatched
  }) {
    this._tabs = {};
    this.getConfig = getConfig;
    this.onTabMatched = onTabMatched;
    this.onTabRemoved = this.onTabRemoved.bind(this);
    this.onTabUpdated = this.onTabUpdated.bind(this);
  }
  get tabs() {
    return this._tabs;
  }
  broadcast(message, predicate) {
    const targets = predicate ? Object.values(this._tabs).filter((tab) => predicate(tab)) : Object.values(this._tabs);
    logger.log(`broadcast to [${targets.map((x) => x.tabInfo.id)}]:`, message);
    return Promise.all(
      targets.map(
        (tab) => browser.tabs.sendMessage(tab.tabInfo.id, message).catch((e) => {
          logger.warn("broadcast error", e);
          throw e;
        })
      )
    );
  }
  start() {
    browser.tabs.onUpdated.addListener(this.onTabUpdated);
    browser.tabs.onRemoved.addListener(this.onTabRemoved);
  }
  stop() {
    browser.tabs.onUpdated.removeListener(this.onTabUpdated);
    browser.tabs.onRemoved.removeListener(this.onTabRemoved);
  }
  async onTabRemoved(tabId) {
    const tabData = this._tabs[tabId];
    if (tabData) {
      delete this._tabs[tabId];
      logger.debug("Current tabs:", this._tabs);
    }
  }
  async processTab(tabInfo) {
    logger.log("tab reloaded, looking for matchs");
    let configList = await this.getConfig();
    logger.debug("view configList", configList);
    new URL(tabInfo.url);
    const ProductDetailPageConf = configList.find((v) => v.matcher.exec(tabInfo.url));
    if (!!ProductDetailPageConf && shouldLoadUI(ProductDetailPageConf)) {
      logger.debug("Match:", { config: ProductDetailPageConf, tabId: tabInfo.id });
      logger.debug("workingMode", { workingMode: ProductDetailPageConf.workingMode });
      this._tabs[tabInfo.id || -1] = { tabInfo, config: ProductDetailPageConf };
      this.onTabMatched({
        config: ProductDetailPageConf,
        tabInfo,
        isProductPage: true
      });
      return;
    }
  }
  /**
   * Should be executed when tab refreshes or changes
   */
  onTabUpdated(tabId, changeInfo, tabInfo) {
    if (!changeInfo || !changeInfo) {
      return;
    }
    const currentTab = this._tabs[tabId];
    logger.debug(`tab updated:`, {
      id: tabId,
      change: changeInfo,
      tab: tabInfo
    });
    if (currentTab && tabInfo.url !== currentTab.tabInfo.url) {
      delete this._tabs[tabId];
    }
    logger.debug("Current tabs:", this._tabs);
    if (changeInfo.status === "complete") {
      this.processTab(tabInfo);
    }
  }
}
var ExtensionManager;
((_ExtensionManager) => {
  const tabMatchStorage = new DataRepository("tabMatchConf", {});
  class ExtensionManager2 {
    /**
     * Register main extension lifecicle hooks & start up the extension.
     */
    constructor() {
      this._tabManager = new TabManager({
        getConfig: ShopScrapperConf.get,
        onTabMatched: this.onTabMatched
      });
      const baseurl = "https://jqm86z5xub.execute-api.eu-west-1.amazonaws.com/v1";
      logger.debug(`baseurl: ${baseurl}`);
      browser.alarms.onAlarm.addListener((alarm) => {
        logger.debug("alarm", { alarm });
        switch (alarm.name) {
          case "mainLoop":
            this.refreshData();
            break;
          case "scrapConfigMatch":
            tabMatchStorage.get().then(({ tabMatchConf: { id, config, isProductPage } }) => {
              if (isProductPage) {
                sendMessage(id, scrapConfigMatch(config));
              }
            });
        }
      });
      this.onTabMatched = this.onTabMatched.bind(this);
      this.onExtensionLoad = this.onExtensionLoad.bind(this);
      this.refreshData = this.refreshData.bind(this);
      this._tabManager.start();
      registerSyncHandler((message) => this._tabManager.broadcast(message));
      browser.runtime.setUninstallURL("https://chollo.to/uninstall").then(() => {
        logger.log("Uninstall URL");
      });
      this.onExtensionLoad();
      this.refreshData();
      browser.alarms.create("mainLoop", {
        periodInMinutes: 30
      });
    }
    get tabManager() {
      return this._tabManager;
    }
    /**
     * Check if url tab matched extension conf. If so it shows the extension.
     * @param tabMatch
     */
    async onTabMatched({ config, tabInfo, isProductPage }) {
      analytics.productView({
        url: tabInfo?.url?.split("?")[0],
        tabId: tabInfo.id
      });
      await tabMatchStorage.set({
        tabMatchConf: { id: tabInfo.id, config, isProductPage }
      });
      browser.alarms.create("scrapConfigMatch", {
        when: Date.now() + 700
      });
    }
    /**
     * Clear ls & shows onboarding page first time extension is installed.
     * @param details
     */
    /**
     * Inits extension data, should be executed once
     */
    async onExtensionLoad() {
      logger.debug("extension load");
      analytics.extensionLoad();
    }
    /**
     * Request extension-config api and set product scrapper config.
     */
    async refreshData() {
      const { data } = await makeRequest({
        endpoint: "extension-config"
      });
      this.getSerpData();
      logger.debug("configuration load", { config: data });
      await ShopScrapperConf.set(data.scrapConfig);
      await NotificationIcon.refreshCount();
    }
    async getSerpData() {
      const { data } = await makeRequest({
        endpoint: "shop"
      });
      serpShopsData.set(data);
    }
  }
  let singletonExtensionManager = null;
  function get() {
    singletonExtensionManager = singletonExtensionManager === null ? new ExtensionManager2() : singletonExtensionManager;
    return singletonExtensionManager;
  }
  _ExtensionManager.get = get;
})(ExtensionManager || (ExtensionManager = {}));
var NotificationIcon;
((NotificationIcon2) => {
  async function refreshCount() {
    if (!await userIsLoggedIn())
      return;
    try {
      const { data } = await makeRequest({
        endpoint: "price-track/notifications/"
      });
      const notifications = data.map((ptnot) => {
        ptnot.product.id = ptnot.product["productInfoId"];
        return ptnot;
      });
      const unreadNotifications = notifications?.filter(
        (v) => v.status === 0 || v.status === 1
      );
      browser.browserAction.setBadgeText({
        text: (unreadNotifications?.length || "").toString()
      });
    } catch (e) {
      logger.warn("Cannot get notifications", e);
    }
  }
  NotificationIcon2.refreshCount = refreshCount;
})(NotificationIcon || (NotificationIcon = {}));
logger.log("vars", { "VITE_ENDPOINT_ENV": "ENDPOINT_production", "VITE_GA_TRACKID": "UA-201381774-1", "VITE_AMPLITUDE_APIKEY": "a6c25343bc8b5de1226ea5501012ae6b", "VITE_SENTRY_DSN": "https://e561726aa4a243948cd55d272396cde9@o548651.ingest.sentry.io/5682487", "VITE_SENTRY_AUTH_TOKEN": "9dc8044b3fbb4094956b3bba45a9e2d131be5e386aaf4126bd6393dc0023f56a", "VITE_DEBUG_APIKEY": "fsSM42zywE6AdYTfKvOQzapD2JRVKn472rdok7Hp", "VITE_DEBUG_ENDPOINT": "https://4hmvn9jqe6.execute-api.eu-west-1.amazonaws.com/prod/scrapper/scrap-config", "VITE_INCLUDE_UTILS": "0", "VITE_NO_SHADOW_ROOT": "0", "VITE_SKIP_TUNNEL": "0", "VITE_FT_PI": "true", "VITE_ENDPOINT": "https://jqm86z5xub.execute-api.eu-west-1.amazonaws.com/v1", "VITE_METRICS_ENDPOINT": "https://wp1tzimk7i.execute-api.eu-west-1.amazonaws.com/v1/metrics", "VITE_NODE_ENV": "production", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true });
async function checkStorageVersion() {
  const schema = await schemaData.get();
  if (schema?.version === null || schema.version < 2 && {}.VITE_E2E !== "1") {
    await browser.storage.local.clear();
    await browser.storage.sync.clear();
    await schemaData.set({ version: 2 });
  }
}
async function launchBg() {
  try {
    await checkStorageVersion();
    if ((await privatePolicyData.get()).isPolicyAuth) {
      ExtensionManager.get();
    } else {
      const ppPage = getExtensionPage("privatePolicy.html");
      logger.log(ppPage);
      const ppTab = await browser.tabs.create({ url: ppPage });
      await privatePolicyData.set({ ppId: ppTab.id, isPolicyAuth: false });
    }
  } catch (error) {
    logger.debug("error loading extension", { e: error });
  }
}
launchBg();
