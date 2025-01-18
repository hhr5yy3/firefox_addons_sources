'use strict';

let type = 'popup';
let port;
try {
  port = document.getElementById('wa-port');
  port.remove();
}
catch (e) {
  port = document.createElement('span');
  port.id = 'wa-port';
  document.documentElement.append(port);
}

port.dataset.notification = 'granted';
port.addEventListener('title-changed', e => {
  e.stopPropagation();

  const value = /\((\d+)\)/.exec(e.detail);
  chrome.runtime.sendMessage({
    method: 'badge',
    value: value && value.length ? value[1] : 0
  });
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.method === 'interface') {
    response(true);
    chrome.runtime.sendMessage({
      method: 'focus'
    });
  }
});

const build = () => {
  document.body.dataset.type = 'popup';
  const div = document.createElement('div');
  div.classList.add('toolbar');
  const reload = document.createElement('span');
  reload.classList.add('reload');
  reload.onclick = () => window.location.reload();
  div.appendChild(reload);
  reload.title = 'Reload this page';
  const home = document.createElement('span');
  home.classList.add('homepage');
  div.appendChild(home);
  home.title = 'Open FAQs page';
  document.body.insertBefore(div, document.body.firstChild);
  home.onclick = () => {
    const url = chrome.runtime.getManifest().homepage_url;
    chrome.runtime.sendMessage({
      method: 'open',
      url
    });
  };
  const settings = document.createElement('span');
  settings.classList.add('settings');
  settings.onclick = () => {
    chrome.runtime.sendMessage({
      method: 'options'
    });
  };
  div.appendChild(settings);
  settings.title = 'Open Options page';
};

const observe = () => {
  const store = () => {
    chrome.storage.local.set({
      left: window.screenX,
      top: window.screenY,
      width: window.outerWidth,
      height: window.outerHeight
    });
  };

  let id;
  addEventListener('resize', () => {
    clearTimeout(id);
    id = setTimeout(store, 1000);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({
    method: 'type'
  }, r => {
    type = r;
    if (type === 'popup') {
      chrome.storage.local.get({
        toolbar: true
      }, prefs => prefs.toolbar && build());
      observe();
    }
  });
});

addEventListener('beforeunload', () => chrome.runtime.sendMessage({
  method: 'badge',
  value: ''
}));

chrome.storage.local.get({
  notification: true
}, prefs => {
  port.dataset.notification = prefs.notification ? 'granted' : 'denied';
});
chrome.storage.onChanged.addListener(prefs => {
  if (prefs.notification) {
    port.dataset.notification = prefs.notification.newValue ? 'granted' : 'denied';
  }
});
