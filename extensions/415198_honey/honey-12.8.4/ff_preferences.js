const currSettings = JSON.parse(window.localStorage.getItem('device:settings')) || {};

function setSetting(setting, value) {
  currSettings[setting] = value;
  window.localStorage.setItem('device:settings', JSON.stringify(currSettings));
}

if (currSettings.dataShare !== 'off') {
  document.getElementById('data-share-checkbox').checked = true;
}

document.getElementById('data-share').addEventListener('click', () => {
  const currentlyOn = document.getElementById('data-share-checkbox').checked;
  if (currentlyOn) {
    setSetting('dataShare', 'on');
  } else {
    setSetting('dataShare', 'off');
  }
});
