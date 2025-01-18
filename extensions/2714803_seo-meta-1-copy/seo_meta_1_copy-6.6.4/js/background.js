let dataLog = {};
const _L_HEAD = "[SMI BG]";
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
const l_key = _c.getToolFavKey();
const cStorageKeys = _c.getCashStorageKeys();
const IS_DEFAULT_POPUP = true;
let version = -1;
function getManifestVer() {
  return chrome.runtime.getManifest().manifest_version;
}
function isV3() {
  if (version < 0) {
    version = getManifestVer();
  }
  return version === 3;
}
let browserAction = null;
if (isV3()) {
  browserAction = chrome.action;
} else {
  browserAction = chrome.browserAction;
}
browserAction.onClicked.addListener(onClickIconAction);
const _storageCache = {};
function onClickIconAction(tab) {
  initStorageCache(tab, clickedIcon, false);
}
function clickedIcon(tab, forceSide = false) {
  let tabId = tab.id;
  if (!forceSide && isShowPopup(tabId)) {
    browserAction.setPopup({popup:"html/popup.html"});
  }
  if (forceSide || isShowSide(tabId)) {
    createSideBar(tabId);
  }
}
const openSettings = () => {
  const e = chrome.runtime.getURL("/html/options_new.html");
  chrome.tabs.create({url:e});
};
const updateContextMenus = async() => {
  await chrome.contextMenus.removeAll();
  let iconContexts = "browser_action";
  if (isV3()) {
    iconContexts = "action";
  }
  chrome.contextMenus.create({id:"open-settings", title:l("settings"), contexts:[iconContexts]});
};
chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch(info.menuItemId) {
    case "open-settings":
      openSettings();
      break;
  }
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === "loading") {
    resetFlag(tabId);
  }
});
chrome.commands.onCommand.addListener(command => {
  switch(command) {
    case "cmd01SideOn":
      getCurrentTab(cmdSideOn);
      break;
    case "cmd02SideClose":
      getCurrentTab(cmdSideClose);
      break;
  }
});
function cmdSideOn(tab) {
  sideFlag(tab.id, true);
  initStorageCache(tab, clickedIcon, true);
}
function cmdSideClose(tab) {
  const tabId = tab.id;
  resetFlag(tabId);
  const send_data = {sendTo:"sb", action:"sidebar_close"};
  chrome.tabs.sendMessage(tabId, send_data, {}, function(res) {
  });
}
function getCurrentTab(callback) {
  const queryOptions = {active:true, currentWindow:true};
  const [tab] = chrome.tabs.query(queryOptions, function(activeTabs) {
    callback(activeTabs[0]);
  });
}
let sFlg = {};
function resetFlag(tabId) {
  sFlg[tabId] = 0;
}
function sideFlag(tabId, flag) {
  if (flag) {
    sFlg[tabId] = 1;
  } else {
    sFlg[tabId] = 2;
  }
}
function sideFlagDefault(tabId) {
  if (sFlg[tabId] === undefined || sFlg[tabId] === 0) {
    return true;
  }
  return true;
}
function sideFlagOn(tabId) {
  if (sFlg[tabId] === undefined || sFlg[tabId] !== 1) {
    return false;
  }
  return true;
}
function isShowSide(tabId) {
  if (sideFlagOn(tabId) === true) {
    return true;
  }
  if (sideFlagDefault(tabId) === false) {
    return false;
  }
  let option_view_type = _storageCache["option_view_type"];
  if (option_view_type === undefined) {
    return !IS_DEFAULT_POPUP;
  } else if (option_view_type === 2 || option_view_type === "2") {
    return true;
  } else if (option_view_type === 3 || option_view_type === "3") {
    return true;
  }
  return false;
}
function isShowPopup(tabId) {
  if (sideFlagOn(tabId) === true) {
    return false;
  }
  if (sideFlagDefault(tabId) === false) {
    return true;
  }
  let option_view_type = _storageCache["option_view_type"];
  if (option_view_type === undefined) {
    return IS_DEFAULT_POPUP;
  } else if (option_view_type === 1 || option_view_type === "1") {
    return true;
  } else if (option_view_type === 3 || option_view_type === "3") {
    return true;
  }
  return false;
}
function createSideBar(tabId) {
  call_background_for_widget(tabId);
}
const initStorageCache = function(tab, loadedCallback, forceSide = false) {
  let length = Object.keys(_storageCache).length;
  if (length > 0) {
    loadedCallback(tab, forceSide);
  } else {
    return getAllStorageSyncData().then(items => {
      Object.assign(_storageCache, items);
      loadedCallback(tab, forceSide);
    });
  }
};
function getAllStorageSyncData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(cStorageKeys, items => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let resData = "";
  if (request.action === "logging") {
    console.log("logging", request.log);
  } else if (request.action === "saveLog") {
    resData = "saveLog res.";
    dataLog[request.page] = request.cacheData;
  } else if (request.action === "getCache") {
    resData = dataLog[request.page];
  } else if (request.action === "FavoriteTool") {
    updateFavoriteTool(request.toolId);
  } else if (request.action === "getToolCnt") {
    resData = toolCntSum();
  } else if (request.action === "update_sidebar") {
    createSideBar(request.tabId);
  } else if (request.action === "update_sidebar_pagelog") {
    let tabId = request.tabId;
    let action = request.action;
    let params = request;
    let message = {action, params};
    if (isShowSide(tabId)) {
      chrome.tabs.sendMessage(tabId, message, {}, function() {
      });
    }
  } else if (request.action === "barUpdate") {
    if (request.target !== undefined && request.target === "s") {
      let tabId = request.tabId;
      if (isShowSide(tabId)) {
        let action = request.action;
        let params = request;
        let message = {action, params};
        chrome.tabs.sendMessage(tabId, message, {}, function() {
        });
      }
    }
  } else if (request.action === "imgDelayChecked") {
    if (request.target !== undefined && request.target === "s") {
      if (dataLog[request.page] !== undefined && dataLog[request.page] !== null) {
        if (request.imgTabHtml !== "") {
          dataLog[request.page].imgTabHtml = request.imgTabHtml;
        }
      }
      let tabId = request.tabId;
      if (isShowSide(tabId)) {
        let action = "update_img_tab_in";
        let params = request;
        let message = {action, params};
        chrome.tabs.sendMessage(tabId, message, {}, function() {
        });
      }
    }
  } else if (request.action === "updateBackgroundStData") {
    _storageCache[request.key] = request.val;
  } else if (request.action === "pagelog") {
  } else if (request.action === "resultAnalytics") {
    let type = "popup";
    let tabId = request.tabId;
    if (isShowSide(tabId)) {
      type = "sidebar";
    }
    let data = {type:type};
    sendResponse({action:"resultAnalytics", resData:data});
    return;
  } else if (request.action === "initLoad") {
    sendResponse({action:request.action, aTabId:sender.tab.id, toolCnts:toolCntSum()});
    return;
  } else if (request.action === "h1to6Index") {
    return;
  } else if (request.action === "initTabCt") {
    let tabId = sender.tab.id;
    resetFlag(tabId);
    return;
  } else if (request.action === "closeWidget") {
    let tabId = sender.tab.id;
    resetFlag(tabId);
    return;
  } else if (request.action === "reLoadImgData") {
    console.log("background.js reLoadImgData skip.");
    return;
  } else {
    console.log("background.js request", request);
  }
  sendResponse({res:"success.", resData:resData});
});
let _counterList = null;
let getCounterList = function() {
  if (_counterList !== null) {
    return _counterList;
  }
  let counterList = _storageCache[l_key];
  if (counterList === null || counterList === undefined) {
    counterList = {};
  } else {
    counterList = JSON.parse(counterList);
  }
  _counterList = counterList;
  return counterList;
};
let toolCntSum = function() {
  let counterList = getCounterList();
  let sum = {};
  for (let ym in counterList) {
    for (let toolId in counterList[ym]) {
      if (sum[toolId] === undefined) {
        sum[toolId] = 0;
      }
      sum[toolId] += counterList[ym][toolId];
    }
  }
  let pairs = Object.entries(sum);
  pairs.sort(function(p1, p2) {
    let p1Val = p1[1];
    let p2Val = p2[1];
    return p2Val - p1Val;
  });
  sum = Object.fromEntries(pairs);
  return sum;
};
let setStorage = function(key, data) {
  let keyVal = {};
  keyVal[key] = data;
  chrome.storage.local.set(keyVal, function() {
  });
};
let setCounterList = function(counterList) {
  _storageCache[l_key] = counterList;
  let data = JSON.stringify(counterList);
  setStorage(l_key, data);
};
let updateFavoriteTool = function(toolId) {
  let counterList = getCounterList();
  let d = new Date();
  let year = d.getFullYear();
  year = ("0" + year).slice(-2);
  let month = d.getMonth() + 1;
  month = ("000" + month).slice(-2);
  let day = d.getDate();
  day = ("000" + day).slice(-2);
  let d_key = year + "_" + month + day;
  let monthList = counterList[d_key];
  if (monthList === undefined) {
    monthList = {};
  }
  if (monthList["t" + toolId] === undefined) {
    monthList["t" + toolId] = 0;
  }
  monthList["t" + toolId] += 1;
  counterList[d_key] = monthList;
  if (Object.keys(counterList).length >= 30) {
    let delKey = "";
    for (let key in counterList) {
      delKey = key;
      break;
    }
    if (delKey !== "") {
      delete counterList[delKey];
    }
  }
  setCounterList(counterList);
};
function call_background_for_widget(tabId) {
  executeFunctionInContentScripts(tabId);
}
const jqueryScript = {file:"plugin/jquery.js", allFrames:false};
const resizerScript = {file:"js/sideBarResizer.js", allFrames:false};
const fontScript = {file:"js/font.js", allFrames:false};
const sideBarScript = {file:"js/sideBar.js", allFrames:false};
const utilScript = {file:"js/util.js", allFrames:false};
const gScript = {file:"rep/g.js", allFrames:false};
const purifyScript = {file:"plugin/purify.js", allFrames:false};
const sideBarDocScript = {file:"js/sideBarDoc.js", allFrames:false};
const inSideStyles = {file:"css/side.css", allFrames:true};
const contentScripts = [jqueryScript, gScript, utilScript, purifyScript, resizerScript, sideBarDocScript, fontScript, sideBarScript];
const cssToInject = [inSideStyles];
function executeFunctionInContentScripts(tabId) {
  const functionToExecute = toggleSideBar;
  const contentToInject = {contentScripts, cssToInject};
  sendMessageToContentScript(tabId, {ping:"ping", execute:true}, {frameId:0}, responseMessage => {
    responseMessage ? functionToExecute(tabId)() : injectScriptsAndExecuteCallback(tabId, contentToInject, functionToExecute);
  });
}
function sendMessageToContentScript(tabId, message, options, callback) {
  message.tabId = tabId;
  chrome.tabs.sendMessage(tabId, message, options, callback);
}
function messageReceiver(portFromCS) {
  portFromCS.onMessage.addListener((message, objectFromSender) => {
    const sender = objectFromSender.sender;
    const tabId = sender.tab.id;
    if (!message.action) {
      actions[message] && actions[message](tabId);
    } else {
      actions[message.action] && actions[message.action](tabId, message.params);
    }
  });
}
function injectScriptsAndExecuteCallback(tabId, contentToInject, callback) {
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
  function insertCSS(tabId, cssToInject) {
    for (let i = cssToInject.length - 1; i >= 0; --i) {
      insertCssFile(tabId, cssToInject[i]);
    }
  }
  if (!chrome.runtime.onConnect.hasListener(messageReceiver)) {
    chrome.runtime.onConnect.addListener(messageReceiver);
  }
  const scripts = contentToInject.contentScripts;
  const css = contentToInject.cssToInject;
  scripts && executeScripts(tabId, scripts, callback(tabId));
  css && insertCSS(tabId, css);
}
function executeScript(tabId, injectDetails, innerCallback) {
  if (isV3()) {
    if (injectDetails.file !== undefined) {
      chrome.scripting.executeScript({target:{tabId:tabId, allFrames:injectDetails.allFrames}, files:[injectDetails.file]}, innerCallback);
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
function toggleSideBar(tabId) {
  return () => {
    initialize(tabId);
  };
}
const actions = {toggle:(tabId, params, options) => {
  return sendActionToContentScript(tabId, "toggle", params, options);
}, getDocumentList};
function sendActionToContentScript(tabId, action, params = {}, options = {}, callback) {
  let message = {action, params};
  sendMessageToContentScript(tabId, message, options, callback);
}
function initialize(tabId) {
  const browserLanguage = getLanguage();
  sendActionToContentScript(tabId, "initializeWidget", {browserLanguage:browserLanguage}, {frameId:0});
}
function getLanguage() {
  return chrome.i18n.getUILanguage();
}
function getDocumentList(tabId) {
  startCollectMetaInfo(tabId);
}
function startCollectMetaInfo(tabId) {
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
  function tmpCallBack(tabId) {
    return () => {
    };
  }
  let addJsFilePath = "";
  if (isFireFox()) {
    addJsFilePath = "../";
  }
  let _toolCnts = {};
  _toolCnts = toolCntSum();
  let scripts = [jqueryScript, {file:addJsFilePath + "plugin/purl.js"}, {file:addJsFilePath + "plugin/ExifReader/exif-reader.js"}, utilScript, {file:addJsFilePath + "js/main.js"}];
  let executeSkip = false;
  if (isShowSide(tabId)) {
    executeSkip = true;
  }
  sendMessageToContentScript(tabId, {action:"load", params:"m"}, {frameId:0}, responseMessage => {
    if (responseMessage !== undefined && responseMessage.action) {
      if (responseMessage.action === "loaded" && responseMessage.params === "m") {
        executeSkip = true;
      }
    }
    if (executeSkip) {
      scripts = scripts.filter(script => {
        return script.file !== addJsFilePath + "js/util.js";
      });
    }
    scripts && executeScripts(tabId, scripts, tmpCallBack(tabId));
  });
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
  return bw().tabs;
}
function l(msgId) {
  return _c.l(msgId);
}
;
