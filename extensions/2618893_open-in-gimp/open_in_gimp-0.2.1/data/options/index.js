'use strict';

const toast = document.getElementById('toast');

// restore
const restore = () => {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    path: '',
    download: true,
    extensions: ['JPEG', 'JPG', 'GIF', 'PNG', 'EPS', 'TIFF', 'PSD', 'INDD', 'RAW', 'WEBP']
  }, prefs => {
    document.getElementById('path').value = prefs.path;
    document.getElementById('download').checked = prefs.download;
    document.getElementById('extensions').value = prefs.extensions.join(', ');
  });
};
document.addEventListener('DOMContentLoaded', restore);
// save
document.getElementById('save').addEventListener('click', () => {
  chrome.storage.local.set({
    path: document.getElementById('path').value,
    extensions: document.getElementById('extensions').value.split(/\s*,\s*/)
      .filter((s, i, l) => s && l.indexOf(s) === i),
    download: document.getElementById('download').checked
  }, () => {
    toast.textContent = 'Options saved.';
    restore();
    setTimeout(() => toast.textContent = '', 750);
  });
});
// reset
document.getElementById('reset').addEventListener('click', e => {
  if (e.detail === 1) {
    toast.textContent = 'Double-click to reset!';
    window.setTimeout(() => toast.textContent = '', 750);
  }
  else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});
// support
document.getElementById('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '&rd=donate'
}));
