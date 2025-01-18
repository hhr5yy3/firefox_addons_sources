/* Copyright (c) 2016-2022 Pearl Crescent, LLC.  All Rights Reserved. */
/* vim: set sw=2 sts=2 ts=8 et syntax=javascript: */

const kStorageType = "local";

PageSaverUtil.localize(document);

let gHaveClipboardSetData = browser.clipboard && browser.clipboard.setImageData;
if (!gHaveClipboardSetData)
{
  let elem = document.getElementById("saveto-menu");
  elem.style.display = "none";
  elem = document.getElementById("saveto-line");
  elem.style.display = "none";
  chrome.storage[kStorageType].set({ saveTo: "file" });
}

let gMode;

let gDidClose = false;

let gCaptureActions = [ "saveVisible", "saveEntire", "saveFrame",
                        "saveRegion" ];
let gOtherActions = [ "openOptions", "sendFeedback", "makeDonation" ];

gCaptureActions.forEach(aAction => {
  let elem = document.getElementById(aAction);
  attachAction(elem, aAction, false);
});

gOtherActions.forEach(aAction => {
  let elem = document.getElementById(aAction);
  attachAction(elem, aAction, true);
});

let gProgressContainerElem = document.getElementById("progress-container");
let gProgressBarElem = document.getElementById("progress-bar");
let gCancelElem = document.getElementById("cancelButton");

gCancelElem.addEventListener("click", aEvent => {
  cancelCapture();
  closePopup();
}, false);

window.addEventListener("unload", aEvent => {
  if ("status" == gMode)
    cancelCapture();      // cancel when the user closes the popup
}, false);

document.getElementById("okButton").addEventListener("click", aEvent => {
  closePopup();
});

// Support keyboard shortcuts:
//   'e' - entire page capture
//   'v' - visible page capture
//   'o' - open options
document.body.addEventListener("keypress", aEvent => {
  let action;
  let key = aEvent.key.toLowerCase();
  
  if ('e' == key)
    action = "saveEntire";
  else if ('v' == key)
    action = "saveVisible";
  else if ('o' == key)
    action = "openOptions";

  if (action) {
    let closePopup = (action == "openOptions");
    sendActionMessage(action, closePopup);
  }
}, false);

// Set the focus to our hidden button so that we can capture key events.
// TODO: ideally we should do this based on an event instead of using
//       setTimeout().
setTimeout(function() { document.getElementById("hiddenButton").focus(); },
           100);

let gPort = chrome.runtime.connect({ name: "pagesaver-popup" });
gPort.onMessage.addListener( aMessage => {
  if ("setmode" == aMessage.msg) {
    if (aMessage.errorDetails) {
      let span = document.getElementById("error-details");
      if (span)
        span.innerText = aMessage.errorDetails;
    }
    gMode = aMessage.mode;
    document.body.setAttribute("mode", gMode);
    if ("error" == gMode) {
      document.getElementById("okButton").focus();
    }
  } else if ("progress" == aMessage.msg) {
    gProgressBarElem.value = aMessage.value;
    gProgressContainerElem.setAttribute("progress", aMessage.value);
  } else if ("close" == aMessage.msg) {
    closePopup();
  }
});

gPort.postMessage({ msg: "start" });

chrome.storage[kStorageType].get("saveTo", function(aItems) {
  if (aItems.hasOwnProperty("saveTo")) {
    let el = document.getElementById(aItems.saveTo);
    if (el.value === aItems.saveTo) {
      el.setAttribute("checked", "checked");
      return;
    }
  }
  PageSaverUtil.debugLog("Invalid value for saveTo (val: "
                         + JSON.stringify(aItems.saveTo) + ")");
  onSaveToChange(false);
});

// We use a click event listener here because "change" does not fire
// if an already checked radio item is selected (and we want to close
// the popup in that case).
let gSaveToMenuElem = document.getElementById("saveto-menu");
gSaveToMenuElem.addEventListener("click", function() {
  onSaveToChange(true);
});

function onSaveToChange(aClosePopupWhenDone) {
  let saveTo = gSaveToMenuElem.elements.saveto.value;
  chrome.storage[kStorageType].set({ saveTo: saveTo }, function() {
    PageSaverUtil.debugLog("Updated saveTo to " + saveTo);
    if (aClosePopupWhenDone)
      closePopup();
  });
};

function attachAction(aElement, aAction, aClose) {
  if (!aElement)
    return;

  aElement.addEventListener("click", function() {
    if (!aElement.classList.contains("disabled")) {
      sendActionMessage(aAction, aClose);
    }
  });
}

function sendActionMessage(aAction, aClose) {
  gPort.postMessage({ msg: "action", action: aAction });
  if (aClose)
    closePopup();
}

function cancelCapture() {
  if (gPort)
    gPort.postMessage({ msg: "cancel" });
}

function closePopup()
{
  if (gPort) {
    gPort.disconnect();
    gPort = undefined;
  }

  window.close();
}
