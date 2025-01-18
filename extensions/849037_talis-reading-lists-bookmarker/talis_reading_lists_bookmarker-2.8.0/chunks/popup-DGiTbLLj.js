var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { b as browser, z, U as Uc, l as ls, N as Ni, d as Us, e as bh, s as stringify, M as Ma, h as logPageParsingResult, i as logError, E as Eh, Z, f as fetchTenant, C as Ci, j as getRegistry, k as lh, m as Cs, n as hh, p as postParseResource } from "./api-service-BsN8WBnU.js";
const isActiveTab = (tab) => {
  const errors = [];
  if (!tab.id) {
    errors.push("Tab id is not provided");
  }
  if (!tab.url) {
    errors.push("Tab url is not provided");
  } else if (!tab.url.startsWith("http")) {
    errors.push("Tab url does not start with http");
  }
  if (errors.length === 0) {
    return {
      success: true,
      tab
    };
  } else {
    return {
      errors,
      success: false
    };
  }
};
const getCurrentTab = async () => {
  const tabs = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  if (tabs.length === 0) {
    return { success: false, errors: ["No valid tabs found"] };
  }
  return isActiveTab(tabs[0]);
};
const PageExtractionResultSchema = z.object({
  url: z.string(),
  html: z.string()
});
z.object({
  registry: Uc,
  tenant: ls
});
z.union([
  PageExtractionResultSchema,
  Ni
]);
const isPageExtractionResult = (value) => PageExtractionResultSchema.safeParse(value).success;
var ParserMechanism = /* @__PURE__ */ ((ParserMechanism2) => {
  ParserMechanism2["SearchResultsZ3988"] = "search_results_z3988";
  ParserMechanism2["ResourceParserEmbedded"] = "resource_parser_embedded";
  ParserMechanism2["ResourceParserApi"] = "resource_parser_api";
  ParserMechanism2["ResourceParserLegacyBookmark"] = "resource_parser_legacy_bookmark";
  ParserMechanism2["FailedToParse"] = "failed_to_parse";
  return ParserMechanism2;
})(ParserMechanism || {});
var BrowserMessageType = /* @__PURE__ */ ((BrowserMessageType2) => {
  BrowserMessageType2["PageParsingRequest"] = "PageParsingRequest";
  BrowserMessageType2["IconAnimation"] = "IconAnimation";
  return BrowserMessageType2;
})(BrowserMessageType || {});
var IconAnimationCommand = /* @__PURE__ */ ((IconAnimationCommand2) => {
  IconAnimationCommand2["StartIconAnimation"] = "StartIconAnimation";
  IconAnimationCommand2["StopIconAnimation"] = "StopIconAnimation";
  IconAnimationCommand2["UpdateIconAngle"] = "UpdateIconAngle";
  return IconAnimationCommand2;
})(IconAnimationCommand || {});
const appendTrackingParams = (bookmarkingUrlString, mechanism) => {
  const bookmarkingUrl = new URL(bookmarkingUrlString);
  bookmarkingUrl.searchParams.append(
    "bookmarkingSource",
    "talis_bookmarking_extension"
  );
  bookmarkingUrl.searchParams.append(
    "bookmarkingSourceVersion",
    Us()
  );
  bookmarkingUrl.searchParams.append("bookmarkingMechanism", mechanism);
  return bookmarkingUrl.toString();
};
const getTarlBaseBookmarkingUrl = (tenantCode, region) => {
  return bh(tenantCode, region);
};
const replaceTarlBookmarkingUrlBase = (bookmarkingWorkflowUrlString) => {
  {
    return bookmarkingWorkflowUrlString;
  }
};
const formatError = (error) => {
  if (error instanceof Error) {
    return error;
  } else if (typeof error === "string") {
    return Error(error);
  } else {
    try {
      return Error(stringify(error), { cause: error });
    } catch {
      return Error("Unknown error", { cause: error });
    }
  }
};
const messageListeners = /* @__PURE__ */ new Map();
const sendMessageToTab = async (tabId, type, data) => {
  return browser.tabs.sendMessage(tabId, { type, data });
};
const addMessageListener = (type, listener) => {
  const wrappedListener = async (message) => {
    if (message.type === type) {
      const result = listener(message.data);
      if (result instanceof Promise) {
        return await result;
      }
      return Promise.resolve(result);
    }
    return Promise.resolve(void 0);
  };
  messageListeners.set(
    listener,
    wrappedListener
  );
  browser.runtime.onMessage.addListener(wrappedListener);
};
const removeMessageListener = (listener) => {
  const wrappedListener = messageListeners.get(listener);
  if (wrappedListener) {
    browser.runtime.onMessage.removeListener(wrappedListener);
    messageListeners.delete(listener);
  }
};
var IconType = /* @__PURE__ */ ((IconType2) => {
  IconType2["Default"] = "icon";
  IconType2["Loading"] = "loading";
  return IconType2;
})(IconType || {});
const iconSizes = [16, 32, 48, 96, 128];
const generateLoadingIcon = (angle, size) => {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new ImageData(size, size);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#77e0ce";
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size / 2, size / 2);
  ctx.rotate(angle * Math.PI / 180);
  ctx.strokeStyle = "rgb(41,41,41)";
  ctx.lineWidth = size * 0.1;
  ctx.beginPath();
  ctx.arc(0, 0, size / 3, 0, Math.PI * 1.5);
  ctx.stroke();
  return ctx.getImageData(0, 0, size, size);
};
const generateDefaultIcon = () => {
  const iconUrls = {};
  for (const size of iconSizes) {
    const iconPath = `/${"icon"}/${size}.png`;
    iconUrls[size.toString()] = browser.runtime.getURL(iconPath);
  }
  return iconUrls;
};
const updateLoadingIconAngle = async (angle) => {
  const iconData = {};
  for (const size of iconSizes) {
    iconData[size.toString()] = generateLoadingIcon(angle, size);
  }
  await browser.action.setIcon({ imageData: iconData });
};
const loadingIconAnimationUpdater = async (message) => {
  if (message.command === IconAnimationCommand.UpdateIconAngle && message.angle) {
    const { angle } = message;
    await updateLoadingIconAngle(angle);
  }
};
const startIconAnimation = async (tab) => {
  addMessageListener(
    BrowserMessageType.IconAnimation,
    loadingIconAnimationUpdater
  );
  await sendMessageToTab(tab.id, BrowserMessageType.IconAnimation, {
    command: IconAnimationCommand.StartIconAnimation
  });
};
const stopIconAnimation = async (tab) => {
  const message = {
    command: IconAnimationCommand.StopIconAnimation
  };
  await sendMessageToTab(tab.id, BrowserMessageType.IconAnimation, message);
  removeMessageListener(loadingIconAnimationUpdater);
};
const loadIconAnimator = async (tab) => {
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["icon-animator.js"]
  });
};
const setIcon = async (iconType, tab) => {
  switch (iconType) {
    case "icon":
      await browser.action.setIcon({
        path: generateDefaultIcon()
      });
      break;
    case "loading":
      await startIconAnimation(tab);
      break;
  }
};
class TabStatusObservable {
  constructor() {
    __publicField(this, "listeners", {});
    __publicField(this, "tabStatuses", /* @__PURE__ */ new Map());
  }
  addListener(tabId, listener) {
    this.listeners[tabId] = this.listeners[tabId] ?? [];
    this.listeners[tabId].push(listener);
    const currentStatus = this.tabStatuses.get(tabId);
    if (currentStatus) {
      listener(currentStatus);
    }
  }
  removeListener(tabId, listener) {
    if (this.listeners[tabId]) {
      this.listeners[tabId] = this.listeners[tabId].filter((l) => l !== listener);
    }
  }
  update(tabId, status) {
    const updatedStatus = status === "complete" ? "complete" : "loading";
    this.tabStatuses.set(tabId, updatedStatus);
    this.notifyListeners(tabId, updatedStatus);
  }
  async requestUpdate(tabId) {
    const tab = await browser.tabs.get(tabId);
    this.update(tabId, tab.status);
  }
  notifyListeners(tabId, status) {
    if (this.listeners[tabId]) {
      this.listeners[tabId].forEach((listener) => {
        listener(status);
      });
    }
  }
}
const tabStatusObservable = new TabStatusObservable();
const waitForTabToLoad = async (tabId) => {
  await tabStatusObservable.requestUpdate(tabId);
  return new Promise((resolve) => {
    const onTabStatusChange = (status) => {
      if (status === "complete") {
        tabStatusObservable.removeListener(tabId, onTabStatusChange);
        resolve();
      }
    };
    tabStatusObservable.addListener(tabId, onTabStatusChange);
  });
};
const createFallbackBookmarkingUrl = (tenantCode, region, tab) => {
  const baseUrl = getTarlBaseBookmarkingUrl(tenantCode, region);
  return Eh(
    baseUrl,
    {},
    {
      parserType: Z.NoResourceFound,
      parserName: null,
      referrer: tab.url
    }
  ).toString();
};
const getUrlFromParsingResponse = ({ id, region }, parsingResponse, tab) => {
  if (!lh(parsingResponse)) {
    return createFallbackBookmarkingUrl(id, region, tab);
  }
  if (Cs(parsingResponse)) {
    const baseUrl = getTarlBaseBookmarkingUrl(id, region);
    return Eh(
      baseUrl,
      parsingResponse.resource,
      parsingResponse.meta
    ).toString();
  } else if (hh(parsingResponse)) {
    return replaceTarlBookmarkingUrlBase(
      parsingResponse.bookmarkingWorkflowUrl
    );
  } else {
    return createFallbackBookmarkingUrl(id, region, tab);
  }
};
const retrieveTenant = async () => {
  const selectedTenant = await fetchTenant();
  if (!selectedTenant || !Ci(selectedTenant)) {
    await browser.runtime.openOptionsPage();
    return null;
  }
  return selectedTenant;
};
const requestPageParsing = async (tabId, tenant) => {
  const registry = await getRegistry();
  return sendMessageToTab(tabId, BrowserMessageType.PageParsingRequest, {
    registry,
    tenant
  });
};
const determineApiParserMechanism = (parsingResult) => {
  if (hh(parsingResult)) {
    return ParserMechanism.ResourceParserLegacyBookmark;
  } else if (Cs(parsingResult)) {
    return ParserMechanism.ResourceParserApi;
  } else {
    return ParserMechanism.FailedToParse;
  }
};
const parsePageViaApi = async (parsingResult, selectedTenant, activeTab) => {
  const result = await postParseResource({
    url: parsingResult.url,
    html: parsingResult.html,
    tenantCode: selectedTenant.id,
    region: selectedTenant.region
  });
  const bookmarkingUrl = getUrlFromParsingResponse(
    selectedTenant,
    result,
    activeTab
  );
  if (lh(result)) {
    const mechanism = determineApiParserMechanism(result);
    return {
      mechanism,
      parserName: result.meta.parserName,
      targetUrl: appendTrackingParams(bookmarkingUrl, mechanism)
    };
  } else {
    return {
      mechanism: ParserMechanism.FailedToParse,
      parserName: null,
      targetUrl: bookmarkingUrl
    };
  }
};
const processPageResult = async (pageParsingResult, selectedTenant, activeTab) => {
  if (isPageExtractionResult(pageParsingResult)) {
    return await parsePageViaApi(pageParsingResult, selectedTenant, activeTab);
  }
  const targetUrl = getUrlFromParsingResponse(
    selectedTenant,
    pageParsingResult,
    activeTab
  );
  if (lh(pageParsingResult)) {
    return {
      mechanism: ParserMechanism.ResourceParserEmbedded,
      parserName: pageParsingResult.meta.parserName,
      targetUrl: appendTrackingParams(
        targetUrl,
        ParserMechanism.ResourceParserEmbedded
      )
    };
  } else {
    return {
      mechanism: ParserMechanism.FailedToParse,
      parserName: null,
      targetUrl: appendTrackingParams(targetUrl, ParserMechanism.FailedToParse)
    };
  }
};
const showLoadingIcon = async (activeTab) => {
  await browser.action.disable();
  await loadIconAnimator(activeTab);
  await setIcon(IconType.Loading, activeTab);
};
const showDefaultIcon = async (activeTab) => {
  await setIcon(IconType.Default, activeTab);
  await browser.action.enable();
};
const performBookmarking = async (activeTab) => {
  await showLoadingIcon(activeTab);
  const selectedTenant = await retrieveTenant();
  if (!selectedTenant) {
    await stopIconAnimation(activeTab);
    await showDefaultIcon(activeTab);
    return;
  }
  try {
    await waitForTabToLoad(activeTab.id);
    await browser.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ["./page-parser.js"]
    });
    const pageParsingResult = await requestPageParsing(
      activeTab.id,
      selectedTenant
    );
    if (Ma(pageParsingResult)) {
      await logPageParsingResult(
        activeTab.url,
        ParserMechanism.SearchResultsZ3988,
        null
      );
      await stopIconAnimation(activeTab);
      return;
    }
    const { mechanism, parserName, targetUrl } = await processPageResult(
      pageParsingResult,
      selectedTenant,
      activeTab
    );
    await logPageParsingResult(activeTab.url, mechanism, parserName);
    await stopIconAnimation(activeTab);
    await browser.tabs.update(activeTab.id, {
      url: targetUrl
    });
  } catch (error) {
    await logError(formatError(error));
    const defaultUrl = appendTrackingParams(
      createFallbackBookmarkingUrl(
        selectedTenant.id,
        selectedTenant.region,
        activeTab
      ),
      ParserMechanism.FailedToParse
    );
    await stopIconAnimation(activeTab);
    await browser.tabs.update(activeTab.id, {
      url: defaultUrl
    });
  } finally {
    await showDefaultIcon(activeTab);
  }
};
const launchExtension = async () => {
  const result = await getCurrentTab();
  if (result.success) {
    await performBookmarking(result.tab);
  } else {
    await logError(Error(`Popup active error: ${result.errors}`));
  }
};
const launchExtensionButton = document.getElementById("launchExtensionButton");
if (launchExtensionButton) {
  launchExtensionButton.addEventListener("click", launchExtension);
} else {
  throw new Error("launchExtensionButton not found");
}
