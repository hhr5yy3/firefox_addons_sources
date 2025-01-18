'use strict';

const info = document.getElementById('info');

chrome.storage.local.get({
  notification: true,
  toolbar: true,
  color: '#6e6e6e',
  type: 'window'
}, prefs => {
  document.getElementById('notification').checked = prefs.notification;
  document.getElementById('toolbar').checked = prefs.toolbar;
  document.getElementById('color').value = prefs.color;
  document.getElementById('type').value = prefs.type;
});

document.getElementById('save').addEventListener('click', () => {
  const color = document.getElementById('color').value;
  const type = document.getElementById('type').value;
  chrome.storage.local.set({
    notification: document.getElementById('notification').checked,
    toolbar: document.getElementById('toolbar').checked,
    color,
    type
  }, () => {
    info.textContent = 'Options saved';
    setTimeout(() => info.textContent = '', 750);
    chrome.action.setBadgeBackgroundColor({
      color
    });
  });
});

// support
document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '?rd=donate'
}));
// reset
document.getElementById('reset').addEventListener('click', e => {
  if (e.detail === 1) {
    info.textContent = 'Double-click to reset!';
    window.setTimeout(() => info.textContent = '', 750);
  }
  else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});
