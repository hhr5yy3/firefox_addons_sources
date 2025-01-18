const _COM = function() {
  function l(msgId) {
    return chrome.i18n.getMessage(msgId);
  }
  const extensionId = chrome.runtime.id;
  const l_key = "toolFav";
  const cStorageKeys = ["uid", "last_click_tab", "option_default_tab", "PageCacheStatus", "option_view_type", "initialSidePanelWidth", "toolFav"];
  return {l, getURL:function(path) {
    return chrome.runtime.getURL(path);
  }, getCashStorageKeys:function() {
    return cStorageKeys;
  }, getToolFavKey:function() {
    return l_key;
  }};
};
const _c = _COM();
const Util = function() {
  function getStorageKeys() {
    return _c.getCashStorageKeys();
  }
  function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
  }
  function onClickMiniActBtn(_this, root = null, getPgData = null) {
    let actMode = $(_this).data("act-mode");
    let dataIndex = $(_this).data("index");
    let dataSource = $(_this).data("data-source");
    dataIndex = parseInt(dataIndex);
    let copyTxtArr = [];
    if (dataSource === "jsonLd") {
      let jsonInfo = getJsonLdData(dataIndex, getPgData);
      let rawData = jsonInfo.rawData;
      let rawDataTxt = reverseJsonToString(rawData, "\t");
      rawDataTxt = '<script type="application/ld+json">' + "\n" + rawDataTxt + "\n";
      rawDataTxt = rawDataTxt + "\x3c/script>\n";
      if (actMode === "copy") {
        execCopyTextarea(rawDataTxt);
      } else if (actMode === "code") {
        openNewTab(rawDataTxt);
      }
    } else if (dataSource === "tag") {
      if (actMode === "link") {
        let url = $(_this).data("link-url");
        openUrlNewTab(url);
      }
    } else if (dataSource === "html-desc") {
      if (actMode === "copy") {
        let parent = $(_this).parent().parent().parent().children(".desc");
        let descTxt = $(parent).text().trim();
        execCopyTextarea(descTxt);
      }
    } else if (dataSource === "html-external-link") {
      if (actMode === "copy") {
        copyTxtArr = getExternalLinkContents(root, "external");
        execCopyForArray(copyTxtArr);
      }
    } else if (dataSource === "html-internal-link") {
      if (actMode === "copy") {
        copyTxtArr = getExternalLinkContents(root, "internal");
        execCopyForArray(copyTxtArr);
      }
    } else if (dataSource === "html-inPage-link") {
      if (actMode === "copy") {
        copyTxtArr = getInPageLinkContents(root, "inPage");
        execCopyForArray(copyTxtArr);
      }
    }
  }
  function getJsonLdData(seqNum, getPgData) {
    let data = "";
    let _pageData = getPgData();
    $(_pageData._jsonLd).each(function(i, jsonInfo) {
      if (jsonInfo.seqNum === seqNum) {
        data = jsonInfo;
        return false;
      }
    });
    return data;
  }
  function getExternalLinkContents(root = null, target = "external") {
    let copyTxtArr = [];
    let contents = null;
    if (root === null) {
      contents = $("." + target + "-link-contents");
    } else {
      contents = $(root).find("." + target + "-link-contents");
    }
    contents.each(function(i, val) {
      let findTitle = $(val).find(".contents-title");
      if (findTitle.length === 0) {
        return true;
      }
      let titleText = $(findTitle[0]).text();
      let listType = "";
      let indentStr = "  ";
      let exterLinkItemList = $(val).find("." + target + "LinkItem > a");
      if (copyTxtArr.length > 0) {
        copyTxtArr.push("");
      }
      copyTxtArr.push(listType + titleText);
      $(exterLinkItemList).each(function(extLinkIndex, linkItem) {
        let href = $(linkItem).attr("href");
        copyTxtArr.push(indentStr + listType + href);
      });
    });
    if (copyTxtArr.length > 0) {
      copyTxtArr.unshift(l(target + "Link"));
      copyTxtArr.unshift("");
    }
    return copyTxtArr;
  }
  function getInPageLinkContents(root = null, target = "external") {
    let copyTxtArr = [];
    let contents = null;
    if (root === null) {
      contents = $("." + target + "-link-contents");
    } else {
      contents = $(root).find("." + target + "-link-contents");
    }
    contents.each(function(i, val) {
      let titleText = "";
      let listType = "";
      let separator = "\t";
      let indentStr = "";
      let inPageLinkItemList = $(val).find("." + target + "LinkItem a.copy-target");
      if (copyTxtArr.length > 0) {
        copyTxtArr.push("");
      }
      copyTxtArr.push(indentStr + listType + "href" + separator + "text" + separator + "img");
      $(inPageLinkItemList).each(function(extLinkIndex, linkItem) {
        let href = $(linkItem).attr("href");
        let text = $(linkItem).text();
        let copyData = $(linkItem).data("copy-data");
        if (copyData === "img") {
          text = "";
          let imgSrc = $(linkItem).data("img-src");
          copyTxtArr.push(indentStr + listType + href + separator + text + separator + imgSrc);
        } else {
          copyTxtArr.push(indentStr + listType + href + separator + text);
        }
      });
    });
    if (copyTxtArr.length > 0) {
      copyTxtArr.unshift(l(target + "Link"));
      copyTxtArr.unshift("");
    }
    return copyTxtArr;
  }
  function onClickMoveHlBtn(_this, root = null) {
    let parent1 = $(_this).parent().find(".headline").html();
    let h1to6Index = $(_this).data("index");
    scrollHeadline(h1to6Index);
  }
  function scrollHeadline(h1to6Index) {
    let myconfig = {h1to6Index:h1to6Index};
    scrollStart(myconfig);
  }
  function scrollStart(config) {
    let h1to6Index = config.h1to6Index;
    let hs = document.querySelectorAll("h1,h2,h3,h4,H4,h5,h6");
    let element = hs[h1to6Index];
    ScrollWindow(element);
  }
  function ScrollWindow(element) {
    let rect = element.getBoundingClientRect();
    let elemtop = rect.top + window.pageYOffset;
    element.scrollIntoView({behavior:"smooth", block:"center"});
    cleanHighlighted();
    highlightElement(element);
  }
  function cleanHighlighted() {
    let highlightedElements = window.document.querySelectorAll("*[data-" + HIGHLIGHT_KEY + "-highlight]");
    highlightedElements.forEach(function(element) {
      element.removeAttribute("data-" + HIGHLIGHT_KEY + "-highlight");
    });
  }
  function highlightElement(element) {
    if (!element) {
      return;
    }
    element.setAttribute("data-" + HIGHLIGHT_KEY + "-highlight", "true");
  }
  function reverseJsonToString(json, space = "") {
    return JSON.stringify(json, null, space);
  }
  function isFireFox() {
    return !(navigator.userAgent.indexOf("Chrome") !== -1);
  }
  function bw() {
    if (isFireFox()) {
      return browser;
    } else {
      return chrome;
    }
  }
  function browserChromeTabs() {
    if (isV3()) {
      return chrome.scripting;
    } else {
      return bw().tabs;
    }
  }
  function logging(...log) {
    chrome.runtime.sendMessage({action:"logging", log:log}, function(response) {
    });
  }
  function l(msgId) {
    let isObj = false;
    if (typeof i18n !== "undefined") {
      if (!isEmptyObj(i18n)) {
        isObj = true;
      }
    } else {
      isObj = false;
    }
    if (isObj) {
      return i18n[msgId];
    } else {
      return _c.l(msgId);
    }
  }
  function openNewTab(text) {
    let url = URL.createObjectURL(new Blob([text], {type:"text/plain"}));
    let myWindow = window.open(url, "_blank");
  }
  function openUrlNewTab(url) {
    let myWindow = window.open(url, "_blank");
  }
  function onClickMainTab(_this, root = null) {
    let id = $(_this).attr("id");
    let lastClick = id => {
      setStorage("last_click_tab", id);
    };
    lastClick(id);
    let target = null;
    if (root !== null) {
      let tmp = $(root).find(".custom-scrollbar.panel-results");
      target = $(tmp[0]);
    } else {
      target = $("body,html");
    }
    target.animate({scrollTop:0}, 50);
  }
  function onClickTool(_this, root = null) {
    let toolId = $(_this).data("tool-id");
    if (toolId === undefined || toolId === "" || toolId === "0") {
      return;
    }
    let btnTxt = $(_this).text();
    let sndType = toolId + "-" + btnTxt;
    sndType = ("000" + toolId).slice(-4) + "-" + btnTxt;
    chrome.runtime.sendMessage({action:"FavoriteTool", toolId:toolId}, function(response) {
    });
  }
  function pEv(req) {
    if (req.action === "sendEvent") {
      myEvent(req.message, req.type);
    }
  }
  function myEvent(category, action) {
    endTime = new Date();
    if (startTime === null) {
      startTime = new Date();
    }
    const engagementTimeMsec = endTime - startTime;
    g.data(getUid(), category, action, getSessionId(), engagementTimeMsec);
  }
  function getUid() {
    const key = "uid";
    let uid = _storageCache_u[key];
    if (uid === undefined || uid === "" || uid === null) {
      uid = self.crypto.randomUUID();
      setStorage(key, uid);
      _storageCache_u[key] = uid;
    }
    return uid;
  }
  function getSessionId() {
    if (sessionId === undefined || sessionId === "" || sessionId === null) {
      sessionId = Date.now().toString();
    }
    return sessionId;
  }
  function setStorage(key, data) {
    let keyVal = {};
    keyVal[key] = data;
    if (typeof _storageCache !== "undefined") {
      _storageCache[key] = data;
    }
    _storageCache_u[key] = data;
    chrome.storage.local.set(keyVal, function() {
      updateBackgroundStData(key, data);
    });
  }
  function updateBackgroundStData(key, val) {
    chrome.runtime.sendMessage({action:"updateBackgroundStData", key:key, val:val}, function(response) {
    });
  }
  function initStorageCache(afterInitCache = null) {
    return getAllStorageSyncData().then(items => {
      Object.assign(_storageCache_u, items);
      afterInitCache && afterInitCache(_storageCache_u);
    });
  }
  function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(getStorageKeys(), items => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      });
    });
  }
  function execCopyForArray(arr) {
    if (arr.length > 0) {
      let copyTxt = arr.join("\n");
      execCopyTextarea(copyTxt);
    }
  }
  function execCopyTextarea(string) {
    let clipboard = $("<textarea></textarea>");
    clipboard.val(string);
    $("body").append(clipboard);
    clipboard.select();
    document.execCommand("copy");
    clipboard.remove();
  }
  function executeScripts(tabId, injectDetailsArray, lastCallback) {
    function getCallback(tabId, injectDetails, innerCallback) {
      return () => {
        executeScript(tabId, injectDetails, innerCallback);
      };
    }
    let callback = lastCallback;
    for (let i = injectDetailsArray.length - 1; i >= 0; --i) {
      callback = getCallback(tabId, injectDetailsArray[i], callback);
    }
    callback && callback();
  }
  function getManifestVer() {
    return chrome.runtime.getManifest().manifest_version;
  }
  function isV3() {
    if (version < 0) {
      version = getManifestVer();
    }
    return version === 3;
  }
  function getExtUrl(path) {
    if (isV3()) {
      return chrome.runtime.getURL(path);
    } else {
      return chrome.extension.getURL(path);
    }
  }
  function executeScript(tabId, injectDetails, innerCallback) {
    if (isV3()) {
      if (injectDetails.file !== undefined) {
        chrome.scripting.executeScript({target:{tabId:tabId, allFrames:injectDetails.allFrames}, files:[injectDetails.file]}, innerCallback);
      } else {
      }
    } else {
      browserChromeTabs().executeScript(tabId, injectDetails, innerCallback);
    }
  }
  function insertCssFile(tabId, fileInfo) {
    if (isV3()) {
      chrome.scripting.insertCSS({target:{tabId:tabId}, files:[fileInfo.file]});
    } else {
      chrome.tabs.insertCSS(fileInfo);
    }
  }
  function getManifestData(data) {
    let manifestData = chrome.runtime.getManifest();
    return manifestData[data];
  }
  function jSelector(selector, sr = "") {
    let $hItems = [];
    if (sr === "") {
      $hItems = $(selector);
    } else {
      $hItems = $(sr).find(selector);
    }
    return $hItems;
  }
  function closeAllDropDownMenu(sr = "") {
    jSelector(".dropdown_menu", sr).each(function(i, v) {
      if ($(this).css("display") !== "none") {
        $(this).toggle();
      }
    });
  }
  function genBaseTabCopyList(indentStr = "  ", listType = "", sr = "") {
    let copyTxtArr = [];
    let copyTxt = "";
    if (listType !== "") {
      listType = listType + " ";
    }
    let $hItems = [];
    if (sr === "") {
      $hItems = $("#base_info_contents .sum-info-item");
    } else {
      $hItems = $(sr).find("#base_info_contents .sum-info-item");
    }
    $hItems.each(function() {
      let title = $(this).find(".title");
      let descs = $(this).find(".desc");
      let extInfos = $(this).find(".ext-info");
      let desc = "";
      let extInfo = "";
      if (descs.length > 0) {
        desc = $(descs[0]).text().trim();
      }
      if (extInfos.length > 0) {
        extInfo = $(extInfos[0]).text().trim();
      }
      if (title.length > 0) {
        title = $(title[0]).text().trim();
        copyTxtArr.push(listType + title);
        copyTxtArr.push(indentStr + listType + desc);
        if (extInfo !== "") {
          copyTxtArr.push(indentStr + listType + extInfo);
        }
      }
    });
    return copyTxtArr;
  }
  function genHeadlinesTabCopyList(indentStr = "  ", markdownListStyle = "", copyFormat = "", isHeadTagName = false, sr = "") {
    let copyTxtArr = [];
    let copyTxt = "";
    let $hItems = [];
    if (markdownListStyle === "*") {
      indentStr = "  ";
    }
    if (sr === "") {
      $hItems = $(".headline-item");
    } else {
      $hItems = $(sr).find(".headline-item");
    }
    $hItems.each(function() {
      let headlines = $(this).find(".headline");
      if (headlines.length > 0) {
        let $headline = $(headlines[0]);
        let headlineNum = $headline.data("h-num");
        let tabs = "";
        let addListStyle = "";
        let tagName = "";
        if (isHeadTagName) {
          tagName = "H" + headlineNum + " | ";
        }
        if (copyFormat === "markdown") {
          if (markdownListStyle !== "") {
            addListStyle = addListStyle + markdownListStyle;
          }
        }
        for (let loopIndex = 1; loopIndex < headlineNum; ++loopIndex) {
          tabs = tabs + indentStr;
          if (copyFormat === "markdown") {
            if (markdownListStyle === "#") {
              addListStyle = addListStyle + markdownListStyle;
            }
          }
        }
        if (markdownListStyle !== "") {
          addListStyle = addListStyle + " ";
        }
        copyTxtArr.push(tabs + addListStyle + tagName + $headline.text());
      }
    });
    return copyTxtArr;
  }
  function genJsonLdTabCopyList(indentStr = "  ", markdownListStyle = "", copyFormat = "", isHeadTagName = false, sr = "") {
    let copyTxtArr = [];
    let $hItems = [];
    let copyTxt = "";
    if (markdownListStyle === "*") {
      indentStr = "  ";
    }
    if (sr === "") {
      $hItems = $("#json-ld_list .sum-info-item");
    } else {
      $hItems = $(sr).find("#json-ld_list .sum-info-item");
    }
    let tabStr = "\t";
    tabStr = "  ";
    $hItems.each(function() {
      let titles = $(this).find(".title");
      let title = "";
      let descs = $(this).find(".desc");
      let desc = "";
      if (titles.length > 0) {
        title = $(titles[0]).text().trim();
        copyTxtArr.push(title);
      }
      if (descs.length > 0) {
        desc = $(descs[0]).text().trim();
        copyTxtArr.push(tabStr + desc);
      }
    });
    return copyTxtArr;
  }
  function createElement(tagName, attributes = {}, childNodes = [], events = []) {
    let newElement = document.createElement(tagName);
    for (let propertyName in attributes) {
      newElement.setAttribute(propertyName, attributes[propertyName]);
    }
    childNodes = Array.isArray(childNodes) ? childNodes : [childNodes];
    for (let i = 0; i < childNodes.length; i++) {
      if (typeof childNodes[i] === "string" || typeof childNodes[i] === "number") {
        let textNode = createTextNode(childNodes[i]);
        newElement.appendChild(textNode);
      } else {
        newElement.appendChild(childNodes[i]);
      }
    }
    events = Array.isArray(events) ? events : [events];
    for (let i = 0; i < events.length; i++) {
      const {name, callback} = events[i];
      newElement.addEventListener(name, callback);
    }
    return newElement;
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function collectBodyStyles(body) {
    let bodyStyleAttribute = body.getAttribute("style");
    let bodyPosition = window.getComputedStyle(body, null).getPropertyValue("position");
    let bodyWidth = window.getComputedStyle(body, null).getPropertyValue("width");
    let bodyMarginLeft = window.getComputedStyle(body, null).getPropertyValue("margin-left");
    let bodyMarginRight = window.getComputedStyle(body, null).getPropertyValue("margin-right");
    return {attribute:bodyStyleAttribute, position:bodyPosition, width:bodyWidth, marginLeft:bodyMarginLeft, marginRight:bodyMarginRight};
  }
  function recoverBodyStyles(body, bodyStyles) {
    body.style.position = bodyStyles.position;
    body.style.width = bodyStyles.width;
    body.style.marginLeft = bodyStyles.marginLeft;
    body.style.marginRight = bodyStyles.marginRight;
    if (bodyStyles.attribute) {
      body.setAttribute("style", bodyStyles.attribute);
    } else {
      body.removeAttribute("style");
    }
  }
  function checkJsonLd(type, raw) {
    const Answer = entity => {
      let missingList = [];
      let checkType = "Answer";
      if (!checkLdType(entity, checkType)) {
        missingList.push(checkType);
        return missingList;
      }
      let checkKey = "text";
      if (!checkLdKey(entity, checkKey)) {
        missingList.push(checkKey);
        return missingList;
      }
      return missingList;
    };
    const Question = function(entity) {
      let missingList = [];
      let checkType = "Question";
      if (!checkLdType(entity, checkType)) {
        missingList.push(checkType);
        return missingList;
      }
      let checkKey = "acceptedAnswer";
      if (!checkLdKey(entity, checkKey)) {
        missingList.push(checkKey);
        return missingList;
      }
      let res = Answer(entity[checkKey]);
      if (res.length > 0) {
        missingList = missingList.concat(res);
      }
      return missingList;
    };
    const itemReviewed = entity => {
      let missingList = [];
      if (entity["name"] === undefined) {
        missingList.push("itemReviewed.name");
      }
      return missingList;
    };
    const reviewRating = entity => {
      let missingList = [];
      if (entity["ratingValue"] === undefined) {
        missingList.push("reviewRating.ratingValue");
      }
      return missingList;
    };
    let missingList = [];
    if (type === "FAQPage" && raw["mainEntity"] !== undefined) {
      $.each(raw["mainEntity"], (i, entity) => {
        let res = Question(entity);
        if (res.length > 0) {
          missingList = missingList.concat(res);
        }
      });
    } else if (type === "Review") {
      if (raw["itemReviewed"] !== undefined) {
        let res = itemReviewed(raw["itemReviewed"]);
        if (res.length > 0) {
          missingList = missingList.concat(res);
        }
      }
      if (raw["reviewRating"] !== undefined) {
        let res = reviewRating(raw["reviewRating"]);
        if (res.length > 0) {
          missingList = missingList.concat(res);
        }
      }
    }
    missingList = Array.from(new Set(missingList));
    return missingList;
  }
  function checkLdType(entity, type) {
    if (entity["@type"] === undefined || entity["@type"] !== type) {
      return false;
    }
    return true;
  }
  function checkLdKey(entity, key) {
    if (entity[key] === undefined) {
      return false;
    }
    return true;
  }
  const entityMap = {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;", "\u2019":"&#39;", "\u02bc":"&#39;", "/":"&#x2F;"};
  const HIGHLIGHT_KEY = "SeoMeta1Copy";
  const _L_HEAD = "[SMI BG]";
  const cStorageKeys = ["uid", "last_click_tab", "option_default_tab", "PageCacheStatus", "option_view_type", "initialSidePanelWidth", "toolFav"];
  const SIDEBAR_DEFAULT_WIDTH = 700;
  const g = GA();
  let version = -1;
  let startTime = new Date();
  let endTime = null;
  let sessionId = "";
  let _storageCache_u = {};
  return {l, isV3, insertCssFile, getExtUrl, getManifestData, onClickMiniActBtn, isEmptyObj, onClickMoveHlBtn, onClickMainTab, onClickTool, reverseJsonToString, executeScripts, getStorageKeys, jSelector, closeAllDropDownMenu, getExternalLinkContents, getInPageLinkContents, genBaseTabCopyList, genHeadlinesTabCopyList, genJsonLdTabCopyList, execCopyTextarea, execCopyForArray, initStorageCache, pEv, myEvent, collectBodyStyles, recoverBodyStyles, checkJsonLd, createElement, createTextNode, getDefaultSideBarWidth:() => 
  {
    return SIDEBAR_DEFAULT_WIDTH;
  }, isNotEmpty:function(data) {
    return data !== "" && data !== undefined && data !== "undefined" && data !== null;
  }, isEmpty:function(data) {
    return data === undefined || data === null || data === "" || data === "undefined";
  }, isArray:function(val) {
    return Array.isArray(val);
  }, isDataImage:function(src) {
    return src.indexOf("data:image/") === 0;
  }, isStr:function(obj) {
    return typeof obj == "string" || obj instanceof String;
  }, overStringSlice:function(str) {
    if (this.isEmpty(str)) {
      str = "";
    }
    let maxStr = 130;
    if (str.length > maxStr) {
      str = str.substring(0, maxStr) + "...";
    }
    return str;
  }, escapeHtml:function(string) {
    if (typeof string === "undefined") {
      return "";
    }
    if (this.isEmpty(string)) {
      return "";
    }
    try {
      return String(string).replace(/[&<>"'\u2019\u02bc\/]/g, function(s) {
        return entityMap[s];
      });
    } catch (e) {
      console.error("Error with escape html of : " + string);
      console.error(e);
      return "";
    }
  }, numberFormat:function(speedVal, keta = 1) {
    let val = Math.round(speedVal * keta);
    val = val / keta;
    return val.toLocaleString();
  }, calcByteAddUnit:function(byte) {
    if (byte > 1024) {
      let kiroByte = byte / 1024;
      kiroByte = kiroByte.toFixed(2);
      return kiroByte + "KB";
    }
    return byte + "B";
  }, lowerTrim:function(toTrim) {
    if (this.isNotEmpty(toTrim)) {
      toTrim = toTrim.toLowerCase().trim();
    }
    return toTrim;
  }, calcStrBytes:function(str) {
    return str.replace(/%../g, "x").length;
  }, lenStr:function(input) {
    if (this.isEmpty(input)) {
      return 0;
    } else {
      return input.length;
    }
  }, isLenCheck:function(number, min, max) {
    let intNumber = parseInt(number);
    return min <= number && number <= max;
  }, attrAll:function($thisCurrent) {
    let ret = {};
    let attrs = $thisCurrent.get(0).attributes;
    let attr;
    for (let i = 0, len = attrs.length; i < len; i++) {
      attr = attrs[i];
      ret[attr.name] = attr.value;
    }
    return ret;
  }, getHref:function(href) {
    let src = href;
    let urlHost = $.url(window.location.href);
    let port = "";
    if (urlHost.attr("port") !== "") {
      port = ":" + urlHost.attr("port");
    }
    if (src != null && !($.trim(src) === "") && !src.match("^http") && !src.match("^javascript")) {
      if (src.match("^//")) {
        src = urlHost.attr("protocol") + ":" + src;
      } else if (src.match("^/")) {
        src = urlHost.attr("protocol") + "://" + urlHost.attr("host") + port + src;
      } else {
        src = urlHost.attr("protocol") + "://" + urlHost.attr("host") + port + urlHost.attr("directory") + src;
      }
    }
    return src;
  }, isExistList:function(checkStr, strList) {
    let newInput = "";
    try {
      newInput = checkStr.toLowerCase();
    } catch (e) {
      newInput = checkStr + "";
    }
    for (let i in strList) {
      if (newInput === strList[i]) {
        return true;
      }
    }
    return false;
  }, isImgExt:function(str) {
    if (this.isEmpty(str)) {
      return false;
    }
    if (Number.isInteger(str)) {
      return false;
    }
    if (!this.isStr(str)) {
      return false;
    }
    let strings = str.split("?");
    if (strings.length >= 2) {
      str = strings[0];
    }
    let dotSplit = str.split(".");
    if (dotSplit.length <= 0) {
      return false;
    }
    let ext = dotSplit[dotSplit.length - 1];
    ext = ext.toLowerCase();
    let isImg = false;
    $(["jpg", "png", "gif", "webp", "jpeg"]).each(function(i, imgExt) {
      if (ext === imgExt) {
        isImg = true;
        return false;
      }
    });
    return isImg;
  }, sortText:function(a, b) {
    return jQuery(a).text().toLowerCase() > jQuery(b).text().toLowerCase() ? 1 : -1;
  }, sortNodeName:function(a, b) {
    return a.nodeName.toLowerCase() > b.nodeName.toLowerCase() ? 1 : -1;
  }, sortHref:function(a, b) {
    return a.href.toLowerCase() > b.href.toLowerCase() ? 1 : -1;
  }, sortProp:function(a, b, propName) {
    return jQuery(a).prop(propName).toLowerCase() > jQuery(b).prop(propName).toLowerCase() ? 1 : -1;
  }, sortObj:function(a, b, name) {
    let a_val = a[name];
    let b_val = b[name];
    if (a_val === undefined) {
      a_val = "";
    }
    if (b_val === undefined) {
      b_val = "";
    }
    return a_val.toLowerCase() > b_val.toLowerCase() ? 1 : -1;
  }, getFavorites:function(tools, _toolCnts, useMin, listMax) {
    let favoriteItems = [];
    for (let toolIdKey in _toolCnts) {
      let useCnt = _toolCnts[toolIdKey];
      if (useCnt < useMin) {
        continue;
      }
      let toolId = toolIdKey.replace("t", "");
      toolId = parseInt(toolId);
      let toolLinkItem = this.searchTool(toolId, tools);
      if (toolLinkItem !== null) {
        favoriteItems.push(toolLinkItem);
        if (favoriteItems.length >= listMax) {
          break;
        }
      }
    }
    return favoriteItems;
  }, searchTool:function(id, tools) {
    let tool = null;
    let _self = this;
    $(tools).each(function(i, group) {
      let titleName = group.groupName;
      if (_self.isEmpty(titleName)) {
        return true;
      }
      $(group.items).each(function(i, toolLinkItem) {
        let btnTxt = toolLinkItem.name;
        if (_self.isEmpty(btnTxt) || btnTxt === "xxxx") {
          return true;
        }
        if (toolLinkItem.id === id) {
          tool = toolLinkItem;
          return false;
        }
      });
      if (tool !== null) {
        return false;
      }
    });
    return tool;
  }};
};

