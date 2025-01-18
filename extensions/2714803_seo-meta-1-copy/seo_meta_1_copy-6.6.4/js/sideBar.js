let i18n = {};
let _o = {};
let language = "";
let browserLanguage = "";
let _storageCache = {};
(function() {
  function getSettings(settingsKeys, callback) {
    let savedSettings = chrome.storage.local.get(settingsKeys, callback);
    try {
      savedSettings.then(callback);
    } catch (err) {
    }
  }
  function saveBodyStyles() {
    bodyStyles = t.collectBodyStyles(body);
    body.style.position = "relative";
    body.style.width = "auto";
  }
  function recoverBodyStyles() {
    t.recoverBodyStyles(body, bodyStyles);
  }
  function closeWidget() {
    sendMessageToBackgroundScript("closeWidget");
    let widget = document.getElementById(sideBarWidgetId);
    let widgetParent = widget.parentNode;
    widgetParent.removeChild(widget);
    body.style.marginLeft = initialMarginLeft;
    widgetParent.removeAttribute(sideBarActiveAttribute);
    removeResizer();
    recoverBodyStyles();
    if (_o.tabId !== undefined) {
      chromeRuntime.sendMessage({action:"closeWidget", sendTo:"bg", tabId:_o.tabId}, function(response) {
      });
    }
  }
  function toggleWidget() {
    let isItOpen = document.getElementById(sideBarWidgetId);
    if (!isItOpen) {
      initialize();
    } else {
    }
  }
  function closeSide() {
    const isItOpen = document.getElementById(sideBarWidgetId);
    if (isItOpen) {
      closeWidget();
    }
  }
  function initialize() {
    sendMessageToBackgroundScript({action:"initialize", params:{}});
  }
  function openWidget() {
    widgetPanel = createWidgetPanel();
    sendMessageToBackgroundScript("getDocumentList");
  }
  function createWidgetPanel() {
    function onOpenCallback() {
    }
    function documentSelection() {
      updateLmsg(shadowRoot);
    }
    function saveResizerWidth(optionId, value) {
      const option = {};
      option[optionId] = value;
      chrome.storage.local.set(option);
    }
    function appendAllElements() {
      sideBarBody.appendChild(resizer);
      updatePanelPosition(isDefaultResizerPosition);
      return widgetPanel;
    }
    function generateMainStructure() {
      let utilsBar = createElement("div", {"id":utilsBarId});
      const closingPanelButton = createElement("i", {"class":"fa-times-circle side-close-btn"}, "");
      let tmpLabel = "CLOSE";
      const closeLink = createElement("button", {"class":closeLinkClass + " " + actionButtonClass}, closingPanelButton);
      closeLink.onclick = closeWidget;
      utilsBar.appendChild(closeLink);
      const dialogWrapper = createElement("div", {"id":slidingDialogId, "class":dialogWrapperClass});
      return {utilsBar, dialogWrapper};
    }
    let isItOpen = document.getElementById(sideBarWidgetId);
    if (isItOpen) {
      clearHtml(shadowRoot, i18n, null);
      return;
    }
    updateI18n(i18n);
    saveBodyStyles();
    let widgetPanel = createElement("seometa1copy-panel", {"id":sideBarWidgetId});
    shadowRoot = widgetPanel.attachShadow({mode:"closed"});
    const panelWidth = settings.initialSidePanelWidth || INITIAL_WIDGET_WIDTH;
    let sideBarBody = createElement("div", {class:sideBarBodyClass});
    sideBarBody.style.width = panelWidth + "px";
    if (isDefaultResizerPosition) {
      sideBarBody.style.left = "0";
      body.style.marginLeft = panelWidth + "px";
    } else {
      sideBarBody.style.right = "0";
      body.style.marginRight = panelWidth + "px";
    }
    bodyParent.insertBefore(widgetPanel, body);
    bodyParent.setAttribute(sideBarActiveAttribute, "true");
    shadowRoot.appendChild(sideBarBody);
    sideBarBody.classList.add(darkThemeClass);
    const {utilsBar, dialogWrapper} = generateMainStructure();
    let titleText = i18n.extensionName;
    let title = createElement("h1", {"id":extensionTitleId + ""}, titleText);
    const mainHeaderWrapper = createElement("div", {"id":mainHeaderWrapperId});
    mainHeaderWrapper.appendChild(title);
    mainHeaderWrapper.appendChild(utilsBar);
    const mainWrapper = createElement("div", {"id":sideBarWrapperId});
    sideBarBody.appendChild(mainWrapper);
    mainWrapper.appendChild(mainHeaderWrapper);
    attachStyles(["side", "popup_side", "m-icon-v3_side"], sideBarBody, appendAllElements, t.getExtUrl("css/"));
    attachScripts(["inside"], sideBarBody, appendAllElements, t.getExtUrl("js/"));
    let sideBarDocumentsCombo = createSideBarPanel(shadowRoot, documentSelection, onOpenCallback);
    sideBarDocument = sideBarDocumentsCombo;
    const panels = createElement("div", {"class":tabPanelsContainerClass});
    const tabPanels = createElement("div", {"class":resultsContainerClass + " " + resultsPanelClass});
    panels.appendChild(tabPanels);
    mainWrapper.appendChild(panels);
    resizer = createResizer(sideBarBody, isDefaultResizerPosition, MIN_WIDGET_WIDTH, (width, position) => {
      bodyStyle[`margin${capitalizeFirstLetter(position)}`] = width + "px";
      bodyStyle[position === "left" ? "marginRight" : "marginLeft"] = "auto";
      saveResizerWidth("initialSidePanelWidth", width);
    });
    createSideTest(tabPanels);
  }
  function updateLmsg(html) {
    $(html).find(".mlcl").each(function() {
      let dataMid = $(this).data("mid");
      let lMsg1 = lMsg(dataMid);
      $(this).text(lMsg1);
    });
    return html;
  }
  function lMsg(msgId) {
    return i18n[msgId];
  }
  function initUpdateLmsg(html) {
    updateLmsg(html);
    clearHtml(shadowRoot, i18n, null);
  }
  function initializeWidget(params) {
    let afterLoadCache = function(storageCache) {
      _storageCache = storageCache;
      setTranslations(params, translations => {
        syncStorageCache();
        setTranslationKeys(translations);
        openWidget();
      });
    };
    t.initStorageCache(afterLoadCache);
  }
  function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(t.getStorageKeys(), items => {
        if (chromeRuntime.lastError) {
          return reject(chromeRuntime.lastError);
        }
        resolve(items);
      });
    });
  }
  function setTranslations(params, callback) {
    browserLanguage = params.browserLanguage;
    language = "en";
    if (browserLanguage === "ja") {
      language = browserLanguage;
    }
    getAsyncContent(`_locales/${language}/messages.json`, callback);
  }
  function setTranslationKeys(translations) {
    Object.entries(translations).forEach(([key, value]) => {
      i18n[key] = value.message;
    });
  }
  function syncStorageCache() {
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        _storageCache[key] = newValue;
      }
    });
  }
  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
  function createSideTest(helpContainer) {
    appendAsyncContent(`popup_template.html`, helpContainer, initUpdateLmsg, "._dialog-content");
    return helpContainer;
  }
  function createElement(tagName, attributes = {}, childNodes = [], events = []) {
    return t.createElement(tagName, attributes, childNodes, events);
  }
  function createTextNode(text) {
    return t.createTextNode(text);
  }
  function attachStyles(CSSFiles, container, onLoadCallback = false, baseURL = htmlDirectoryURL) {
    CSSFiles = Array.isArray(CSSFiles) ? CSSFiles : [CSSFiles];
    const CSSFilesLength = CSSFiles.length;
    let stylesLoadedCounter = 0;
    for (let i = 0; i < CSSFilesLength; i++) {
      const httpRequest = new XMLHttpRequest();
      let url = `${baseURL}${CSSFiles[i]}.css`;
      httpRequest.open("GET", url, true);
      httpRequest.onload = () => {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            const styles = httpRequest.responseText.replace(/url\(/g, `url(${baseURL}`);
            const CSSText = createTextNode(styles);
            const styleElement = createElement("style", {}, CSSText);
            container.appendChild(styleElement);
            stylesLoadedCounter++;
            if (stylesLoadedCounter === CSSFilesLength) {
              onLoadCallback && onLoadCallback();
            }
          }
        }
      };
      httpRequest.onerror = e => {
      };
      httpRequest.send(null);
    }
  }
  function attachScripts(CSSFiles, container, onLoadCallback = false, baseURL = htmlDirectoryURL) {
    CSSFiles = Array.isArray(CSSFiles) ? CSSFiles : [CSSFiles];
    const CSSFilesLength = CSSFiles.length;
    let stylesLoadedCounter = 0;
    for (let i = 0; i < CSSFilesLength; i++) {
      const httpRequest = new XMLHttpRequest();
      let url = `${baseURL}${CSSFiles[i]}.js`;
      httpRequest.open("GET", url, true);
      httpRequest.onload = () => {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            const styles = httpRequest.responseText.replace(/url\(/g, `url(${baseURL}`);
            const CSSText = createTextNode(styles);
            const styleElement = createElement("script", {}, CSSText);
            container.appendChild(styleElement);
            stylesLoadedCounter++;
            if (stylesLoadedCounter === CSSFilesLength) {
              onLoadCallback && onLoadCallback();
            }
          }
        }
      };
      httpRequest.onerror = e => {
      };
      httpRequest.send(null);
    }
  }
  function appendAsyncContent(documentToGet, container, onLoadCallback = false, selectorStr = ".dialog-content") {
    let request = new XMLHttpRequest();
    let url = htmlDirectoryURL + documentToGet;
    request.open("GET", url, true);
    request.responseType = "document";
    request.onload = function() {
      if (request.readyState === 4 && request.status === 200) {
        const returnedDOM = request.responseXML.documentElement.querySelector(selectorStr);
        const asJson = html2json(returnedDOM);
        container.appendChild(json2html(asJson));
        onLoadCallback && onLoadCallback(container);
      }
    };
    request.onerror = function(e) {
    };
    request.send(null);
  }
  function textElem(element) {
    return {type:"text", textContent:element.textContent};
  }
  function html2json(element) {
    return {type:"element", tagName:element.tagName, attributes:mapAttributes(element.attributes), children:Array.from(element.childNodes, fromNode)};
  }
  function mapAttributes(attributes) {
    let mappedAttributes = {};
    for (let i = 0; i < attributes.length; i++) {
      mappedAttributes[attributes[i].name] = attributes[i].value;
    }
    return mappedAttributes;
  }
  function fromNode(e) {
    switch(e.nodeType) {
      case 3:
        return textElem(e);
      default:
        return html2json(e);
    }
  }
  function json2html(jsonObject) {
    let htmlElement;
    const type = jsonObject.type;
    const tagName = jsonObject.tagName;
    const attributes = jsonObject.attributes;
    const children = jsonObject.children || [];
    const textContent = jsonObject.textContent;
    if (type === "element") {
      htmlElement = createElement(tagName, attributes, children.map(json2html));
    } else {
      htmlElement = createTextNode(textContent);
    }
    return htmlElement;
  }
  function update_sidebar_pagelog(params) {
    sideBarDocument.updateDocuments(shadowRoot, params);
  }
  function barUpdate(params) {
    sideBarDocument.updateBar(shadowRoot, params);
  }
  function update_img_tab_in(params) {
    sideBarDocument.updateImgContents(shadowRoot, params);
  }
  function getAsyncContent(fileToGet, callback) {
    let request = new XMLHttpRequest();
    let url = t.getExtUrl(fileToGet);
    request.open("GET", url, true);
    request.responseType = "json";
    request.onload = function() {
      if (request.readyState === 4 && request.status === 200) {
        callback(request.response);
      }
    };
    request.onerror = function(e) {
      console.error(e);
    };
    request.send();
  }
  function sendMessageToBackgroundScript(message) {
    seo1CopyPort.postMessage(message);
  }
  const _L_HEAD = "[SMI s2]";
  let sideBarDocument;
  let shadowRoot;
  let menu;
  let resizer;
  const chromeRuntime = chrome.runtime;
  const t = Util();
  const widgetActions = {"toggle":toggleWidget, update_sidebar_pagelog, barUpdate, initializeWidget, update_img_tab_in};
  const SETTING_PROPERTIES = {initialSidePanelWidth:{defaultValue:700}, position:{defaultValue:"left"}, leftPosition:{defaultValue:true}, savePanelWidthOnResize:{defaultValue:false}, initialPanelWidth:{defaultValue:400}, widgetVersion:{}, considerHgroup:{defaultValue:true}, language:{defaultValue:"en"}};
  let settings = SETTING_PROPERTIES;
  const MIN_WIDGET_WIDTH = 350;
  const INITIAL_WIDGET_WIDTH = 700;
  const extensionTitleId = "side_extension_title";
  const mainHeaderWrapperId = "seoMeta1Header";
  const sideBarWidgetId = "seometa1copy-panel";
  const sideBarWrapperId = "seometa1copyMapWrapper";
  const sideBarActiveAttribute = "data-side-seometa1copy-active";
  const closeLinkClass = "seo1copy_panel_closer";
  const tabPanelsContainerClass = "seo1copy-container";
  const utilsBarId = "utilsId";
  const menuId = "main-menu";
  const menuListId = "main-menu-list";
  const menuButtonId = "menu-link";
  const tabLinksId = "tabLinksId";
  const slidingDialogId = "sliding_dialog_panel";
  const darkThemeClass = "dark-theme";
  const activeStatusClass = "active";
  const resultsPanelClass = "panel-results";
  const resultsClass = "results";
  const customScrollbarClass = "custom-scrollbar";
  const resultsContainerClass = customScrollbarClass;
  const dialogWrapperClass = "dialog " + customScrollbarClass;
  const actionButtonClass = "action-button";
  const RESIZER_CLASS = "seo1copy-resizer";
  const sideBarBodyClass = "seo1copy-body";
  const body = document.body;
  const bodyStyle = body.style;
  const bodyParent = body.parentNode;
  const initialMarginLeft = body.style.marginLeft;
  let bodyStyles = {};
  let widgetPane;
  let tabId;
  let widgetPanel;
  const {createResizer, removeResizer, updatePanelPosition} = resizerService(RESIZER_CLASS);
  chromeRuntime.onMessage.addListener((message, sender, sendResponse) => {
    function executeWidgetAction(savedSettings) {
      settings = Object.assign({}, defaultSettings, savedSettings);
      if (!widgetActions[messageAction]) {
        console.log("unknown messageAction", messageAction);
      }
      widgetActions[messageAction] && widgetActions[messageAction](messageParams);
    }
    let defaultSettings = {};
    let messageAction = message.action;
    let messageParams = message.params;
    if (message.ping === undefined || message.ping === "ping") {
      sendResponse("executed");
    }
    if (messageAction === undefined || messageAction === "load") {
      return;
    }
    sendResponse("executed");
    if (messageAction === "test") {
      return;
    }
    if (messageAction === "sidebar_close") {
      closeSide();
      return;
    }
    if (message.tabId !== undefined) {
      _o.tabId = message.tabId;
    }
    for (let key in SETTING_PROPERTIES) {
      defaultSettings[key] = SETTING_PROPERTIES[key].defaultValue;
    }
    const settingsKeys = Object.keys(SETTING_PROPERTIES);
    getSettings(settingsKeys, executeWidgetAction);
  });
  const isDefaultResizerPosition = false;
  const initStorageCache = function() {
    return getAllStorageSyncData().then(items => {
      Object.assign(_storageCache, items);
    });
  };
  const htmlDirectoryURL = t.getExtUrl("html/");
  const {createSideBarPanel, clearHtml, updateI18n} = sideBarDocService();
  const seo1CopyPort = chromeRuntime.connect({name:"port-from-cs"});
})();

