'use strict';

const badge = value => chrome.action.setBadgeText({
  text: value ? String(value) : ''
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.method === 'open') {
    chrome.tabs.create({
      url: request.url
    });
  }
  else if (request.method === 'options') {
    chrome.runtime.openOptionsPage();
  }
  else if (request.method === 'focus') {
    chrome.tabs.update(sender.tab.id, {
      active: true
    });
    chrome.windows.update(sender.tab.windowId, {
      focused: true
    });
  }
  else if (request.method === 'type') {
    chrome.windows.get(sender.tab.windowId, win => {
      response(win.type);
    });
    return true;
  }
  else if (request.method === 'badge') {
    badge(request.value);
  }
});

chrome.action.onClicked.addListener(async tab => {
  try {
    const tabs = await chrome.tabs.query({
      url: '*://web.whatsapp.com/'
    });
    await Promise.any(tabs.map(tab => chrome.tabs.sendMessage(tab.id, {
      method: 'interface'
    })));
  }
  catch (e) {
    const prefs = await chrome.storage.local.get({
      type: 'window'
    });

    if (prefs.type === 'window') {
      const win = await chrome.windows.getCurrent();
      const prefs = await chrome.storage.local.get({
        width: 800,
        height: 600,
        left: win.left + Math.round((win.width - 700) / 2),
        top: win.top + Math.round((win.height - 500) / 2)
      });
      chrome.windows.create({
        url: 'https://web.whatsapp.com/',
        type: 'popup',
        width: prefs.width,
        height: prefs.height,
        left: prefs.left,
        top: prefs.top
      });
    }
    else {
      chrome.tabs.create({
        url: 'https://web.whatsapp.com/',
        index: tab.index + 1
      });
    }
  }
});

{
  const once = async () => {
    if (once.done) {
      return;
    }
    once.done = true;

    const prefs = await chrome.storage.local.get({
      color: '#6e6e6e'
    });
    chrome.action.setBadgeBackgroundColor({
      color: prefs.color
    });
  };
  chrome.runtime.onStartup.addListener(once);
  chrome.runtime.onInstalled.addListener(once);
}

/* FAQs & Feedback */
{
  const {management, runtime: {onInstalled, setUninstallURL, getManifest}, storage, tabs} = chrome;
  if (navigator.webdriver !== true) {
    const {homepage_url: page, name, version} = getManifest();
    onInstalled.addListener(({reason, previousVersion}) => {
      management.getSelf(({installType}) => installType === 'normal' && storage.local.get({
        'faqs': true,
        'last-update': 0
      }, prefs => {
        if (reason === 'install' || (prefs.faqs && reason === 'update')) {
          const doUpdate = (Date.now() - prefs['last-update']) / 1000 / 60 / 60 / 24 > 45;
          if (doUpdate && previousVersion !== version) {
            tabs.query({active: true, lastFocusedWindow: true}, tbs => tabs.create({
              url: page + '?version=' + version + (previousVersion ? '&p=' + previousVersion : '') + '&type=' + reason,
              active: reason === 'install',
              ...(tbs && tbs.length && {index: tbs[0].index + 1})
            }));
            storage.local.set({'last-update': Date.now()});
          }
        }
      }));
    });
    setUninstallURL(page + '?rd=feedback&name=' + encodeURIComponent(name) + '&version=' + version);
  }
}
