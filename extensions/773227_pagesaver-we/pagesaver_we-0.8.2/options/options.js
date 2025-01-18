/* Copyright (c) 2016-2022 Pearl Crescent, LLC.  All Rights Reserved. */
/* vim: set sw=2 sts=2 ts=8 et syntax=javascript: */

const kStorageType = "local";

PageSaverUtil.localize(document);

let gPort = chrome.runtime.connect({ name: "pagesaver-options" });
const kButtonIDs = [ "sendFeedback", "makeDonation" ];
kButtonIDs.forEach(aID => {
  document.getElementById(aID).addEventListener("click",
      function() {
        gPort.postMessage({ msg: "action", action: aID });
      });
});


const kSamplePageTitle = PageSaverUtil.getLocalizedString("samplePageTitle");
const kSamplePageURL = PageSaverUtil.getLocalizedString("samplePageURL");

const kClickActionRadioIDs = [ "entire", "visible", "menu" ];
const kCaptureMethodRadioIDs = [ "capture-method-no-scroll",
                                 "capture-method-scroll" ];
const kFileNamePatternID = "filename-pattern";
const kSaveActionRadioIDs = [ "save-prompt", "save-download" ];
const kFormatRadioIDs = [ "format-png", "format-jpeg" ];
const kDownloadSubfolderID = "save-download-subfolder";
const kImageSizeID = "image-size";
const kImageSizeUnitsID = "image-size-units";
const kAddHeaderID = "add-header";
const kHeaderPatternID = "header-pattern";
const kAddFooterID = "add-footer";
const kFooterPatternID = "footer-pattern";
const kPlaySoundID = "playsound";
const kShowContextMenuItemsID = "showContextMenuItems";
const kOtherOnChangeIDs = [ kFileNamePatternID, "save-overwrite",
                            kDownloadSubfolderID, "jpeg-quality",
                            kImageSizeID, kImageSizeUnitsID,
                            kHeaderPatternID, kFooterPatternID,
                            kPlaySoundID, kShowContextMenuItemsID ];

let gFileNamePatternElem, gImageSizeElem, gImageSizeUnitsElem, gJPEGQualityElem;
let gHeaderPatternElem, gFooterPatternElem;

document.addEventListener("DOMContentLoaded", loadOptions);

// Listen for beforeunload to ensure that option values are saved if the user
// closes the window that contains this options page.
window.addEventListener("beforeunload", saveOptions);

// TODO: simplify / refactor
kClickActionRadioIDs.forEach(aID => {
  document.getElementById(aID).addEventListener("change", saveOptions);
});

kCaptureMethodRadioIDs.forEach(aID => {
  document.getElementById(aID).addEventListener("change", saveOptions);
});

document.getElementById(kFileNamePatternID).addEventListener("input",
                                                updateExampleFilename);
document.getElementById(kHeaderPatternID).addEventListener("input",
                                                updateExampleHeader);
document.getElementById(kFooterPatternID).addEventListener("input",
                                                updateExampleFooter);

if (PageSaverUtil.hasDownloadSaveAs) {
  kSaveActionRadioIDs.forEach(aID => {
    document.getElementById(aID).addEventListener("change", function() {
      saveOptions();
      updateSaveToLocalFileUI();
    });
  });
} else {
  // TODO: Chrome support.
  // Our version of Firefox is too old to support saveAs.
  [ "save-prompt", "save-prompt-label" ].forEach(aID => {
    let elem = document.getElementById(aID);
    if (elem)
      elem.setAttribute("disabled", true);
  });
}

kFormatRadioIDs.forEach(aID => {
  document.getElementById(aID).addEventListener("change", function() {
    updateExampleFilename();
    saveOptions();
  });
});

document.getElementById(kAddHeaderID).addEventListener("change", function() {
  updateAddHeaderUI();
  saveOptions();
});

document.getElementById(kAddFooterID).addEventListener("change", function() {
  updateAddFooterUI();
  saveOptions();
});

kOtherOnChangeIDs.forEach(aID => {
  let elem = document.getElementById(aID);
  if (elem)
    elem.addEventListener("change", saveOptions);
});

document.getElementById("show-legal-btn").addEventListener("click",
    function() {
      document.body.setAttribute("show-legal", true);
    });

function loadOptions() {
  // Insert shortcut key text.
  chrome.commands.getAll(aCommands => {
    insertKeyboardShortcut(aCommands);
  });

  gFileNamePatternElem = document.getElementById(kFileNamePatternID);
  gImageSizeElem = document.getElementById(kImageSizeID);
  gImageSizeUnitsElem = document.getElementById(kImageSizeUnitsID);
  gSubfolderElem = document.getElementById(kDownloadSubfolderID);
  if (gSubfolderElem) {
    gSubfolderElem.placeholder = PageSaverUtil.getLocalizedString(
                                      "saveToDownloadsSubfolderPlaceholder");
  }

  gJPEGQualityElem = document.getElementById("jpeg-quality");
  gHeaderPatternElem = document.getElementById(kHeaderPatternID);
  gFooterPatternElem = document.getElementById(kFooterPatternID);

  let prefNames = [ "clickAction", "captureMethod",
                    "saveTo", "fileName", "saveAction",
                    "saveOverwrite", "imageSize", "format", "jpegQuality",
                    "subfolderPath", "addHeader", "headerPattern",
                    "addFooter", "footerPattern",
                    "playSoundOnCapture", "showContextMenuItems" ];
  chrome.storage[kStorageType].get(prefNames, function(aItems) {
    setRadioButton(kClickActionRadioIDs, aItems.clickAction);
    setRadioButton(kCaptureMethodRadioIDs, aItems.captureMethod);
    gFileNamePatternElem.value = aItems.fileName;
    let saveAction = PageSaverUtil.hasDownloadSaveAs
                                          ? aItems.saveAction : "download";
    setRadioButton(kSaveActionRadioIDs, saveAction);
    if (aItems.subfolderPath && (aItems.subfolderPath.length > 0)) {
      gSubfolderElem.value = aItems.subfolderPath;
    }
    setCheckBox("save-overwrite", aItems.saveOverwrite);
    updateSaveToLocalFileUI();
    setRadioButton(kFormatRadioIDs, aItems.format);
    gJPEGQualityElem.value = aItems.jpegQuality;

    if (gImageSizeElem && gImageSizeUnitsElem) {
      let imageSize = aItems.imageSize;
      let selectedIndex = 0;
      if ('%' == imageSize.substr(-1))
        imageSize = imageSize.substr(0, imageSize.length - 1);
      else
        selectedIndex = 1;
      gImageSizeElem.value = imageSize;
      gImageSizeUnitsElem.selectedIndex = selectedIndex;
    }

    setCheckBox(kAddHeaderID, aItems.addHeader);
    gHeaderPatternElem.value = aItems.headerPattern;
    updateAddHeaderUI();

    setCheckBox(kAddFooterID, aItems.addFooter);
    gFooterPatternElem.value = aItems.footerPattern;
    updateAddFooterUI();

    setCheckBox(kPlaySoundID, aItems.playSoundOnCapture);
    setCheckBox(kShowContextMenuItemsID, aItems.showContextMenuItems);

    updateExampleFilename();
    updateExampleHeader();
    updateExampleFooter();
  });
}


function insertKeyboardShortcut(aCommands)
{
  aCommands.forEach(aCommand => {
    if (aCommand.shortcut && (aCommand.name === "_execute_browser_action")) {
      let s = aCommand.shortcut;
      chrome.runtime.getPlatformInfo(aInfo => {
        if ("mac" === aInfo.os) {
          s = s.replace("MacCtrl+", "\u2303");
          s = s.replace("Shift+", "\u21E7");
          s = s.replace("Alt+", "\u2325");  // option key
          s = s.replace("Command+", "\u2318");
          s = s.replace("Ctrl+", "\u2318"); // synonym for Command
        }
        let kbdShorcutSpan = document.getElementById("keyboard-shortcut");
        kbdShorcutSpan.appendChild(document.createTextNode(s));
      });
    }
  });
}


function saveOptions() {
  chrome.runtime.getPlatformInfo(aInfo => {
    saveOptionsForOS(aInfo.os);
  });
}


function saveOptionsForOS(aOS)
{
  let clickAction = getRadioButtonValue(kClickActionRadioIDs);
  let captureMethod = getRadioButtonValue(kCaptureMethodRadioIDs);
  let saveAction = getRadioButtonValue(kSaveActionRadioIDs);
  let saveOverwrite = getCheckBoxValue("save-overwrite");
  let format = getRadioButtonValue(kFormatRadioIDs);
  let subfolder = sanitizePath(aOS, gSubfolderElem.value);
  gSubfolderElem.value = subfolder; // reflect possibly changed value in the UI

  let quality =  parseInt(gJPEGQualityElem.value, 10);
  if (quality < 1)
    quality = 1;
  else if (quality > 100)
    quality = 100;
  gJPEGQualityElem.value = quality;

  let imageSize;
  if (gImageSizeElem && gImageSizeUnitsElem) {
    let imageSizeNum = parseInt(gImageSizeElem.value, 10);
    let selectedIndex = gImageSizeUnitsElem.selectedIndex;
    if (isNaN(imageSizeNum) || imageSizeNum <= 0)
    {
      // Invalid; reset to the default
      imageSizeNum = 100;
      selectedIndex = 0;
      gImageSizeUnitsElem.selectedIndex = selectedIndex;
    }
    gImageSizeElem.value = imageSizeNum;
    imageSize = '' + imageSizeNum;
    if (0 == selectedIndex)
      imageSize += '%';
  }
 
  let addHeader = getCheckBoxValue(kAddHeaderID);
  let addFooter = getCheckBoxValue(kAddFooterID);
  let playSoundOnCapture = getCheckBoxValue(kPlaySoundID);
  let showContextMenuItems = getCheckBoxValue(kShowContextMenuItemsID);
  let opts = { clickAction: clickAction,
               captureMethod: captureMethod,
               fileName: gFileNamePatternElem.value,
               saveAction: saveAction,
               saveOverwrite: saveOverwrite,
               subfolderPath: subfolder,
               format: format,
               jpegQuality: quality,
               addHeader: addHeader,
               headerPattern: gHeaderPatternElem.value,
               addFooter: addFooter,
               footerPattern: gFooterPatternElem.value,
               playSoundOnCapture: playSoundOnCapture,
               showContextMenuItems: showContextMenuItems };
  if (imageSize)
    opts.imageSize = imageSize;
  chrome.storage[kStorageType].set(opts);
}


// Adapted from DownloadPaths.sanitize(); see
// toolkit/components/jsdownloads/src/DownloadPaths.jsm
function sanitizePath(aOS, aPath)
{
  let rv = aPath;
  if (aPath) {
    let isWindows = (aOS == "win");

    // Trim whitespace and path separator characters.
    rv = rv.trim();
    let pathSep = isWindows ? '\\' : '/';
    while (rv.startsWith(pathSep))
      rv = rv.substring(pathSep.length);
    while (rv.endsWith(pathSep))
      rv = rv.substring(0, rv.length - pathSep.length);

    if (isWindows) {
      rv = rv.replace(/</g, "(")
             .replace(/>/g, ")")
             .replace(/"/g, "'");
    }

    // We omit the following .replace() because we are processing a path, not
    // just a leafName: rv.replace(/[\\/]+/g, "_")
    rv = rv.replace(getConvertToSpaceRegExp(aOS), " ")
           .replace(/^[\s\u180e.]+|[\s\u180e.]+$/g, "");
  }

  return rv;
}


function getConvertToSpaceRegExp(aOS)
{
  switch (aOS) {
    case "android":
      return /[\x00-\x1f\x7f-\x9f:*?|"<>;,+=\[\]]+/g;
    case "win":
      return /[\x00-\x1f\x7f-\x9f:*?|]+/g;
    case "mac":
      return /[\x00-\x1f\x7f-\x9f:]+/g;
    default:
      return /[\x00-\x1f\x7f-\x9f]+/g;
  }
}


function setRadioButton(aIDs, aValue) {
  aIDs.forEach(aID => {
    let elem = document.getElementById(aID);
    if (elem && (aValue == elem.value))
      elem.checked = true;
  });
}


function getRadioButtonValue(aIDs) {
  let val;
  aIDs.forEach(aID => {
    let elem = document.getElementById(aID);
    if (elem && elem.checked)
      val = elem.value;
  });

  return val;
}


function setCheckBox(aID, aValue) {
  let elem = document.getElementById(aID);
  if (elem)
    elem.checked = aValue;
}


function getCheckBoxValue(aID) {
  let elem = document.getElementById(aID);
  return elem && elem.checked;
}


function updateExampleFilename() {
  let elem = document.getElementById("filename-example");
  if (elem && gFileNamePatternElem)  {
    let fileExt = '.' + getRadioButtonValue(kFormatRadioIDs);  // TODO: PageSaverUtil.getFileExtension(curFormat);
    elem.innerText = PageSaverUtil.formatTextWithPattern(
                          gFileNamePatternElem.value,
                          kSamplePageURL, kSamplePageTitle, true, false,
                          fileExt) + fileExt;
  }
}


function updateSaveToLocalFileUI() {
  let saveAction = getRadioButtonValue(kSaveActionRadioIDs);
  [ "save-download-subfolder-label", kDownloadSubfolderID,
    "save-overwrite", "save-overwrite-label" ].forEach(aID => {
    let elem = document.getElementById(aID);
    if (elem) {
      if ("download" == saveAction)
        elem.removeAttribute("disabled");
      else
        elem.setAttribute("disabled", true);
    }
  });
}


function updateAddHeaderUI() {
  updateHeaderOrFooterUI(kAddHeaderID, "header-container", kHeaderPatternID);
}


function updateAddFooterUI() {
  updateHeaderOrFooterUI(kAddFooterID, "footer-container", kFooterPatternID);
}


function updateHeaderOrFooterUI(aCheckBoxID, aContainerID, aPatternID) {
  let isEnabled = getCheckBoxValue(aCheckBoxID);
  let container = document.getElementById(aContainerID);
  let pattern = document.getElementById(aPatternID);
  if (isEnabled) {
    container.removeAttribute("disabled");
    pattern.removeAttribute("disabled");
  }
  else {
    container.setAttribute("disabled", true);
    pattern.setAttribute("disabled", true);
  }
}


function updateExampleHeader() {
  updateExample(document.getElementById("header-example"), gHeaderPatternElem);
}
  
function updateExampleFooter() {
  updateExample(document.getElementById("footer-example"), gFooterPatternElem);
}
  
function updateExample(aExampleElem, aPatternElem) {
  if (aExampleElem && aPatternElem)  {
    aExampleElem.innerText = PageSaverUtil.formatTextWithPattern(
                          aPatternElem.value, kSamplePageURL, kSamplePageTitle,
                          false, false, undefined);
  }
}
