function saveOptions() {
  const consolelog = document.getElementById('consolelog').checked;
  chrome.storage.local.set({ consolelog }, (result) => {
    const status = document.getElementById('status');
    status.innerHTML = chrome.i18n.getMessage('options_options_saved');
    clearStatus();
  });
}


function restoreOptions() {
  chrome.storage.local.get({
    consolelog,
  }, (items) => {
    for (const [key, value] of Object.entries(items)) {
      document.getElementById(key).checked = value;
    }
  });
}

function saveProxyOption() {
  const id = 99999;
  const name = document.getElementById('proxyname').value;
  const url = document.getElementById('proxyprefix').value;
  const illurl = document.getElementById('illurl1').value;
  const status = document.getElementById('status');
  if (name === '' || url === '') {
    status.innerHTML = chrome.i18n.getMessage('options1_proxy_empty_error');
  }
  chrome.storage.local.set({
    id,
    name,
    url,
    ezproxy: true,
    ill: true,
    illurl
  }, () => {
    // Update status to let user know options were saved.
    restoreOptions();
    status.innerHTML = chrome.i18n.getMessage('options_options_proxy_saved', [id, name]);
    clearStatus();
  });
}

function localizeHtmlPage() {
  // Localize by replacing __MSG_***__ meta tags
  const objects = document.getElementsByTagName('html');
  for (let j = 0; j < objects.length; j++) {
    const obj = objects[j];

    const valStrH = obj.innerHTML.toString();
    const valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => (v1 ? chrome.i18n.getMessage(v1) : ''));

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}

localizeHtmlPage();


function clearStatus() {
  setTimeout(() => {
    document.getElementById('status').innerHTML = '';
  }, 2500);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('proxysave').addEventListener('click', saveProxyOption);
document.getElementById('consolelog').addEventListener('change', saveOptions);
