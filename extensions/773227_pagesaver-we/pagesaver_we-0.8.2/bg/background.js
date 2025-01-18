/* Copyright (c) 2016-2022 Pearl Crescent, LLC.  All Rights Reserved. */
/* vim: set sw=2 sts=2 ts=8 et syntax=javascript: */

// TODO: implement a prefs API in util.js
const kStorageType = "local";

//chrome.storage[kStorageType].clear(); // clear all prefs (useful for testing)

let gPrefs = { clickAction: "menu",
               captureMethod: "scroll",
               saveTo: "file",
               fileName: "%t %Y-%m-%d",
               saveAction: "prompt",
               saveOverwrite: false,
               subfolderPath: "",
               imageSize: "100%",
               format: "png",
               jpegQuality: 92,
               jpegFileExt: "jpg",
               addHeader: false,
               headerPattern: PageSaverUtil.getLocalizedString(
                                                      "defaultHeaderPattern"),
               addFooter: false,
               footerPattern: PageSaverUtil.getLocalizedString(
                                                      "defaultFooterPattern"),
               playSoundOnCapture: true,
               showContextMenuItems: true };

let gPopupPort; // Set while our browser action popup is open.
let gContextMenuItemIDs;  // Array of menu item IDs which we have added.


// Init storage (prefs).
let gPrefNames = Object.keys(gPrefs);

chrome.storage[kStorageType].get(gPrefNames, function(aItems) {
  let prefsToSet = {};
  gPrefNames.forEach(aPrefName => {
    if (aItems.hasOwnProperty(aPrefName))
      gPrefs[aPrefName] = aItems[aPrefName];
    else
      prefsToSet[aPrefName] = gPrefs[aPrefName];
  });

  if (Object.keys(prefsToSet).length > 0) {
    chrome.storage[kStorageType].set(prefsToSet);
    PageSaverUtil.debugLog("stored default settings: "
                           + JSON.stringify(prefsToSet));
  }

  deferredInit(); // Initialize anything that requires prefs.
});


chrome.storage.onChanged.addListener(function(aChanges) {
  gPrefNames.forEach(aPrefName => {
    if (aChanges.hasOwnProperty(aPrefName) &&
        aChanges[aPrefName].hasOwnProperty("newValue")) {
      gPrefs[aPrefName] = aChanges[aPrefName].newValue;
    }
  });

  updateContextMenuItems();
});


function deferredInit()
{
  updateContextMenuItems();
}


// Add or remove browser action context menu items.
// We use the functions under browser.contextMenus instead of the more
// standard browser.menus for compatibility with Firefox 50 - 54.
function updateContextMenuItems()
{
  let menuContexts = [ gPrefs.showContextMenuItems ? "all" : "browser_action" ];

  if (gContextMenuItemIDs)
  {
    gContextMenuItemIDs.forEach(aID => { browser.contextMenus.remove(aID); });
  }

  gContextMenuItemIDs = [];

  let itemID = "saveVisible";
  browser.contextMenus.create({
    id: itemID,
    title: PageSaverUtil.getLocalizedString("saveVisible"),
    contexts: menuContexts
  });
  gContextMenuItemIDs.push(itemID);

  itemID = "saveEntire";
  browser.contextMenus.create({
    id: itemID,
    title: PageSaverUtil.getLocalizedString("saveEntire"),
    contexts: menuContexts
  });
  gContextMenuItemIDs.push(itemID);

  itemID = "openOptions";
  browser.contextMenus.create({
    id: itemID,
    title: PageSaverUtil.getLocalizedString("pageSaverOptions"),
    contexts: menuContexts
  });
  gContextMenuItemIDs.push(itemID);
}


// We use browser.contextMenus.onClicked() instead of the more standard
//   browser.menus.onClicked() for compatibility with Firefox 50 - 54.
let gDeferredAction;
browser.contextMenus.onClicked.addListener((aInfo, aTab) => {
  if ("openOptions" == aInfo.menuItemId) {
    handleAction(aInfo.menuItemId); // No need to open the popup in this case.
  } else {
    gDeferredAction = aInfo.menuItemId;
    browser.browserAction.openPopup();  // This requires Firefox >= 57.0.
  }
});

// Add command (keyboard shortcut) listener.
chrome.commands.onCommand.addListener(function(aCommand) {
  if (aCommand === "capture_visible")
    gDeferredAction = "saveVisible";
  else if (aCommand === "capture_entire")
    gDeferredAction = "saveEntire";

  if (gDeferredAction)
    browser.browserAction.openPopup();  // This requires Firefox >= 57.0.
});


// Add IPC message listener.
chrome.runtime.onConnect.addListener(function(aPort) {
  if ("pagesaver-popup" == aPort.name) {
    // Handle messages from our browser action popup.
    gPopupPort = aPort;
    aPort.onMessage.addListener(aMessage => {
      if ("start" == aMessage.msg) {
        let isMenu = (gPrefs.clickAction == "menu");
        let mode = (isMenu) ? "menu" : "status";
        aPort.postMessage({ msg: "setmode", mode: mode });
        if (gDeferredAction) {
          handleAction(gDeferredAction);
          gDeferredAction = undefined;
        } else if (!isMenu) {
          capturePage(gPrefs.clickAction);
        }
      } else if ("cancel" == aMessage.msg) {
        CaptureAPI.cancelCapture();
      } else if ("action" == aMessage.msg) {
        handleAction(aMessage.action);
      }
    });

    aPort.onDisconnect.addListener(function() {
      gPopupPort = undefined;
    });
  } else if ("pagesaver-options" == aPort.name) {
    // Handle messages from our options page.
    aPort.onMessage.addListener(aMessage => {
      if ("action" == aMessage.msg)
        handleAction(aMessage.action);
    });
  }
});


function handleAction(aAction)
{
  switch (aAction) {
    case "saveVisible":
      capturePage("visible");
      break;
    case "saveEntire":
      capturePage("entire");
      break;
    case "saveFrame":
      capturePage("frame");
      break;
    case "saveRegion":
      capturePage("region");
      break;
    case "openOptions":
      chrome.runtime.openOptionsPage();
      break;
    case "sendFeedback": {
        let url = "https://pearlcrescent.com/products/pagesaver/feedback.html"
                  + "?FF-WE&" + encodeURIComponent(PageSaverUtil.extVersion);
        chrome.tabs.create({ url: url });
      }
      break;
    case "makeDonation": {
        let url = "https://pearlcrescent.com/products/pagesaver/we-donate";
        chrome.tabs.create({ url: url });
      }
      break;
    default:
      PageSaverUtil.errorLog("Unknown action: ", aAction);
  }
}


function capturePage(aType) {
  PageSaverUtil.debugLog("Capturing... (type: " + aType
                         + ", saveTo: " + gPrefs.saveTo + ")");
  if (gPopupPort)
    gPopupPort.postMessage({ msg: "setmode", mode: "status" });

  chrome.runtime.getPlatformInfo(aInfo => {
    capturePageForOS(aInfo.os, aType);
  });
}


function capturePageForOS(aOS, aType) {
  chrome.tabs.query({ active: true, currentWindow: true }, aTabs => {
    let activeTab = aTabs[0];

    // Nest handleBlobs() so we can access activeTab.
    function handleBlobs(aBlobs) {
      let blobCount = aBlobs ? aBlobs.length : 0;
      if (blobCount > 0) {
        if (gPrefs.playSoundOnCapture)
          PageSaverUtil.playSound();

        let blobIndex = 1;
        aBlobs.forEach(aBlob => {
          downloadImageBlob(aOS, activeTab, aBlob, blobIndex, blobCount);
          ++blobIndex;
        });
      }
    }

    let opts = { jsPrefix: "3rdparty/full-page-screen-capture-chrome-extension",
                 delay: 0,
                 captureMethod: gPrefs.captureMethod,
                 imageSize: gPrefs.imageSize,
                 format: "image/" + gPrefs.format };
    if ("jpeg" == gPrefs.format)
      opts.quality = (gPrefs.jpegQuality / 100.0);

    if (gPrefs.addHeader) {
      let headerText = getHeaderOrFooterText(activeTab, gPrefs.headerPattern);
      if (headerText)
        opts.headerText = headerText;
    }
    if (gPrefs.addFooter) {
      let footerText = getHeaderOrFooterText(activeTab, gPrefs.footerPattern);
      if (footerText)
        opts.footerText = footerText;
    }

    switch (aType) {
      case "visible":
        opts.area = "visiblePage";
        CaptureAPI.captureToBlobs(activeTab, handleBlobs, handleError,
                                  handleProgress, handleSplitNotification,
                                  opts);
        break;
      case "entire":
        opts.area = "entirePage";
        CaptureAPI.captureToBlobs(activeTab, handleBlobs, handleError,
                                  handleProgress, handleSplitNotification,
                                  opts);
        break;
      case "frame":
        // TODO
        break;
      case "region":
        // TODO
        break;
      default:
        PageSaverUtil.errorLog("Capture type '" + aType + "' is not supported");
    }
  });
}


function handleError(aReason) {
  PageSaverUtil.debugLog("Unable to capture image: " + aReason);
  if (gPopupPort) {
    let reason = aReason.replace(/ /g, '_');
    let details = PageSaverUtil.getLocalizedString("apiError_" + reason);
    if (!details)
      details = aReason;
    gPopupPort.postMessage({ msg: "setmode", mode: "error",
                             errorDetails: details });
  }
}


function handleProgress(aPercentComplete) {
  if (gPopupPort)
    gPopupPort.postMessage({ msg: "progress", value: aPercentComplete });
}


function handleSplitNotification(aImageCount) {
  PageSaverUtil.debugLog("TODO: handleSplitNotification: " + aImageCount);
}


function closePopup()
{
  // Close the popup (it will remain open if an error occurred).
  if (gPopupPort)
    gPopupPort.postMessage({ msg: "close" });
}


function downloadImageBlob(aOS, aTab, aBlob, aBlobIndex, aBlobCount) {
  function _tryDownload(aDownloadOpts, aUseVerySafeChars) {
    let path = getFileName(aTab, aBlobIndex, aBlobCount, aUseVerySafeChars);
    if (gPrefs.subfolderPath) {
      const pathSep = (aOS == "win") ? '\\' : '/';
      path = gPrefs.subfolderPath + pathSep + path;
    }

    aDownloadOpts.filename = path;
    return browser.downloads.download(aDownloadOpts);
  }

  function _onSuccess() {
    if (aBlobIndex >= aBlobCount)
      closePopup();
  }

  switch(gPrefs.saveTo) {
    case "file":
      const url = URL.createObjectURL(aBlob);
      const opts = {
        url: url,
        incognito: aTab.incognito,
        conflictAction: gPrefs.saveOverwrite ? "overwrite" : "uniquify"
      };

      if (PageSaverUtil.hasDownloadSaveAs) {
        opts.saveAs = ("prompt" == gPrefs.saveAction);
        if (opts.saveAs) {
          opts.conflictAction = "overwrite";
        }
      }
      _tryDownload(opts, false)
      .then(() => _onSuccess())
      .catch(aErr1 => {
        if (!aErr1 || !aErr1.message ||
            !aErr1.message.toLowerCase().includes("illegal")) {
          handleError(aErr1.message);
        } else {
          // Our call to downloads.download() generated an
          // "illegal characters" error.  Try again with aUseVerySafeChars
          // set to true.
          _tryDownload(opts, true)
          .then(() => _onSuccess())
          .catch(aErr2 => {
            handleError(aErr2.message);
          });
        }
      });
      break;
    case "server":
      PageSaverUtil.errorLog("Capturing to server is NYI");
      break;
    case "clipboard":
      let cbURL = URL.createObjectURL(aBlob);
      fetch(cbURL)
      .then(aResponse => aResponse.arrayBuffer())
      .then(aBuffer => browser.clipboard.setImageData(aBuffer, gPrefs.format))
      .catch(aError => PageSaverUtil.errorLog("Cannot copy image: " + aError));

      closePopup();
      break;
    default:
  }
}


function getFileName(aTab, aIndex, aCount, aUseVerySafeChars) {
  let fileExt = '.' +
              (("jpeg" == gPrefs.format) ? gPrefs.jpegFileExt : gPrefs.format);
  let baseName = PageSaverUtil.formatTextWithPattern(gPrefs.fileName, aTab.url,
                                 aTab.title, true, aUseVerySafeChars, fileExt);
  // Append "-#" if the capture produced more than one image.
  if (aCount > 1)
    baseName += '-' + aIndex;

  return baseName + fileExt;
}

function getHeaderOrFooterText(aTab, aPattern) {
  return PageSaverUtil.formatTextWithPattern(aPattern, aTab.url, aTab.title,
                                             false, false, undefined);
}
