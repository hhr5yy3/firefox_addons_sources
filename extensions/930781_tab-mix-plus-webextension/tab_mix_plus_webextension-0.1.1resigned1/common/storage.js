'use strict';

const preferencesRestored = browser.storage.local
    .get(null)
    .then(updateAllPrefs, onError);

const defaultValues = {
  'open_newwindow': 3,
  'open_newwindow.override.external': -1,
  'open_newwindow.restriction': 2,
  'browser.altClickSave': false,
  'browser.tabs.opentabfor.middleclick': true,
  'opentabforLinks': 0,
  'enablefiletype': true,
  'middlecurrent': false,
  'linkTarget': false,
  'targetIsFrame': true,
  'singleWindow': false,
  'filetype': 'xpi zip rar exe tar jar gzip gz ace bin doc mdb ppt iso 7z cab arj lzh uue torrent php?attachmentid=.* php?act=Attach&type=post&id=.* /download\\.(php|asp)\\?*/ /&disp=(safe|attd)&/ download\\/file\\.php /\\.xls(x)*(?=\\?|$)/',
};

const preferences = {...defaultValues};

Object.defineProperty(preferences, 'onChanged', {
  value: {
    listeners: [],
    addListener(listener, callWhenReady) {
      this.listeners.push(listener);
      if (callWhenReady) {
        preferencesRestored.then(listener);
      }
    },
    notifyListeners(changes) {
      this.listeners.forEach(cb => cb(changes));
    },
  },
  enumerable: false,
  configurable: false,
  writable: false,
});

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/
function updateAllPrefs(restoredPrefs) {
  const prefs = Object.entries(restoredPrefs);
  for (const [prefName, value] of prefs) {
    updatePref(prefName, value);
  }

  return Object.keys(preferences);
}

/*
Update our preferences object after storage area that changed
*/
function onStorageChanged(changes, area) {
  if (area != 'local') {
    return;
  }

  const changedItems = Object.keys(changes);
  const changedPrefs = changedItems.filter(prefName => {
    const {oldValue, newValue} = changes[prefName];
    return oldValue != newValue && updatePref(prefName, newValue);
  });

  // notify listeners
  if (changedPrefs.length) {
    preferences.onChanged.notifyListeners(changedPrefs);
  }
}

function updatePref(prefName, newValue) {
  const type = typeof newValue != 'undefined' && typeof defaultValues[prefName];
  switch (type) {
    case 'number':
      preferences[prefName] = Number(newValue);
      break;
    case 'boolean':
      preferences[prefName] = Boolean(newValue);
      break;
    default:
      return false;
  }
  return true;
}

function onError(e) {
  console.error(e);
}

browser.storage.onChanged.addListener(onStorageChanged);
