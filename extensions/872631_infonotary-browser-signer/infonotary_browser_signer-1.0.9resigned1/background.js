const ERROR_USER_CANCEL = "error:userCancel";
const ERROR_INTERNAL = "error:internalError";

const SIGNER_STATUS_OK = 0;
const SIGNER_STATUS_ERROR = 1;
const SIGNER_STATUS_NOT_INSTALLED = 2;

const NOTIFY_NOT_INSTALLED = 'insigner-notify-install';
const NM_HOST_NAME = 'com.infonotary.clientsw.edocsigner';
const DOWNLOAD_URL = 'https://www.infonotary.com/?p=doc_l2_4';

let notifications = {};
let queue = [];
let processing = null;
let nativePort = null;

function queuePush(contentPort, data, type) {
  contentPort.onDisconnect.addListener(onContentDisconnected);
  queue.push({'port': contentPort, 'data': data, 'type': type});
  if(queue.length == 1) // If queue was empty, start it.
    callNative();
}

function onContentDisconnected(port) {
  for(let i = queue.length - 1; i >= 0; i--) {
    if(port === queue[i].port) {
      queue.splice(i, 1);
    }
  }
  if(processing && (port === processing.port)) {
    if(nativePort) {
      nativePort.disconnect();
      nativePort = null;
    }
    processing = null;
    if(queue.length != 0) // continue with next in queue if current request is removed.
      callNative();
  }
}

function callNative() {
  processing = queue[0];
  try {
    nativePort = chrome.runtime.connectNative(NM_HOST_NAME);
    if(nativePort) {
      nativePort.onMessage.addListener(onNativeMessage);
      nativePort.onDisconnect.addListener(onDisconnected);
      nativePort.postMessage(processing.data);
    } else {
      console.log("[InfoNotary Browser Signer] Invalid nativePort");
    }
  } catch(ex) {
    console.log("[InfoNotary Browser Signer] Exception: " + ex);
    sendToPage(ERROR_INTERNAL, ['' + ex]);
  }

  return nativePort;
}

// send message to content script
function sendToPage(result, errors) {
  if(!processing)
    return;
  let res = {'id': processing.data.id, 'type': processing.data.type,
             'binary': processing.data.binary, 'result': result,
             'type': processing.type};
  //res.binary = processing.data.type != 'text/plain'
  if(errors && errors.length > 0)
    res.errors = errors;
  else if(result.length === 0) // If there is no error, but result is empty, return ERROR_USER_CANCEL
    res.result = ERROR_USER_CANCEL;
  if(res.result.substr(0, 6) === "error:") {
    if(!res.errors)
      res.errors = [];
    res.errors.push(res.result.substr(6));
  }
  processing.port.postMessage(res);
  
  queue.shift(); // Remove first item in queue
  processing = null; // Finished processing
}

function onNativeMessage(message) {
  sendToPage(message.result, message.errors);
}

function showNotification(status) {
  /*
  switch(status) {
    case SIGNER_STATUS_NOT_INSTALLED:
      if(!notifications[NOTIFY_NOT_INSTALLED]) {
        let opt = {
          type: "basic",
          title: "InfoNotary Browser Signer",
          message: browser.i18n.getMessage("nativeHostMissing"),
          iconUrl: "images/icon-128.png",
          isClickable: true
        };
        chrome.notifications.create(NOTIFY_NOT_INSTALLED, opt);
        notifications[NOTIFY_NOT_INSTALLED] = true;
      }
      break;
  }
  */
}

function onDisconnected(e) {
  nativePort = null;
  if(processing) {
    sendToPage(ERROR_INTERNAL, ['Native host not installed']);
    showNotification(SIGNER_STATUS_NOT_INSTALLED);
  }
  if(queue.length != 0)
    callNative();
}

function onContentMessage(info) {
  if(!info)
    return;
  queuePush(this, info, info.type);
}


chrome.notifications.onClicked.addListener(function(notifyId) {
  if(notifyId === NOTIFY_NOT_INSTALLED) {
    chrome.tabs.create({ url: DOWNLOAD_URL });
  }
  chrome.notifications.clear(notifyId);
});
chrome.notifications.onClosed.addListener(function(notifyId) {
  notifications[notifyId] = false;
});

chrome.runtime.onConnect.addListener(function(port) {
  //Check if connection is from this extension
  if(chrome.runtime.id === port.sender.id || chrome.runtime.id === port.sender.extensionId) {
    port.onMessage.addListener(onContentMessage.bind(port));
  }
});

// Implementation of window.crypto.signText() function
if(typeof browser !== 'undefined') {
  function onSignText(request, sender, resCallback) {
    if (!request)
      return false;
    if(request.type !== 'inotary-sign-request')
      return false;
    let done = false;

    try {
      nativePort = browser.runtime.connectNative(NM_HOST_NAME);
      if(nativePort) {
        nativePort.onMessage.addListener((message) => {
          done = true;
          if(message.errors && message.errors.length > 0)
            resCallback(ERROR_INTERNAL);
          else if(message.result.length === 0) // If there is no error, but result is empty, return ERROR_USER_CANCEL
            resCallback(ERROR_USER_CANCEL);
          else
            resCallback(message.result);
        });
        nativePort.onDisconnect.addListener((e) => {
          if(!done) {
            console.log('[InfoNotary Browser Signer] e-Doc Signer disconnected!');
            showNotification(SIGNER_STATUS_NOT_INSTALLED);
            resCallback(ERROR_INTERNAL);
          }
        });
        nativePort.postMessage(request);
      } else {
        console.log("[InfoNotary Browser Signer] Invalid nativePort");
        showNotification(SIGNER_STATUS_NOT_INSTALLED);
        resCallback(ERROR_INTERNAL);
      }
    } catch(ex) {
      console.log("[InfoNotary Browser Signer] Exception: " + ex);
      resCallback(ERROR_INTERNAL);
    }
    return true;
  }

  browser.runtime.onMessage.addListener(onSignText);
}
