function registerDynamicContentScript() {
  browser.contentScripts.register({
      allFrames: true,
      js: [{file: 'run.js'}],
      matches: ['*://*.youtube.com/*'],
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
      case 'CHECK_YOUTUBE_PERMISSION':
          return new Promise(resolve => {
              chrome.permissions.contains({
                  origins: ['*://*.youtube.com/*'],
              }, (granted) => resolve(granted));
          });
      case 'REQUEST_YOUTUBE_PERMISSION':
          chrome.tabs.create({url: 'permissions_upgrade.html'});
          return Promise.resolve(null);
  }
});

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason !== 'install') {
      return;
  }

  chrome.permissions.contains({
      origins: ['*://*.youtube.com/*'],
  }, (granted) => {
      if (granted) {
          return;
      }
      chrome.tabs.create({url: 'permissions_upgrade.html'});
  });
});

chrome.permissions.onAdded.addListener(() => {
  registerDynamicContentScript();
});

registerDynamicContentScript();
