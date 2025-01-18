const nativeMessagingHostId = 'com.rs.openweblaunch';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.runtime.sendNativeMessage(nativeMessagingHostId, request, response => {
    if (chrome.runtime.lastError != null) {
      chrome.tabs.create({ url: 'main.html' });
      return;
    }
    console.log('Received ' + JSON.stringify(response));
  });
});

function checkMessagingHost() {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendNativeMessage(nativeMessagingHostId, { status: 'get' }, response => {
      if (chrome.runtime.lastError != null) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

function downloadMessagingHost() {
  if (navigator.appVersion.indexOf("Windows")!=-1) {
    const link = 'https://github.com/RocketSoftware/open-web-launch/releases/latest/download/open-web-launch-setup-user.exe';
    chrome.downloads.download({
      url: link,
      filename: "open-web-launch-setup.exe"
    });
  } else if (navigator.appVersion.indexOf("Mac")!=-1) {
    const link = 'https://download-eu.rocketsoftware.com/ro/d/E898CE5023764BA393D0AC1C52AFCD4D';
    chrome.downloads.download({
      url: link,
      filename: "openweblaunch"
    });
  } else if (navigator.appVersion.indexOf("Linux")!=-1) {
    const link = 'https://download-eu.rocketsoftware.com/ro/d/B028F33F03F6446EBA00EF0B3FB55C29';
    chrome.downloads.download({
      url: link,
      filename: "openweblaunch"
    });
  } else {
    alert('Open Web Launch cannot yet be installed over the web for this platform.' + '\n' + navigator.appVersion);
  }
}

chrome.runtime.onInstalled.addListener(function() {
  checkMessagingHost()
    .then(response =>
      console.log(`messaging host is installed: ${JSON.stringify(response)}`)
    )
    .catch(e => {
      console.log(`messaging host is not installed: ${e.message}`);
      chrome.tabs.create({ url: 'main.html' });
    });
});
