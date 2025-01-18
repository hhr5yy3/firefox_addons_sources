/* globals defaultValues, filetypeModal, preferences */
'use strict';

const $ = id => document.getElementById(id);

const prefWindow = {
  initBroadcasters() {
    const items = document.querySelectorAll('input[type="checkbox"]');
    for (const item of items) {
      this.updateBroadcaster(item);
    }
  },

  updateBroadcaster(item) {
    const type = item.getAttribute('type');
    if (item.id && type == 'checkbox') {
      let val = !item.checked;
      if (item.hasAttribute('inverseDependency')) {
        val = !val;
      }
      this.setDisabled(`obs_${item.id}`, val);
    }
  },

  setDisabled(itemOrQuery, val) {
    const items = typeof itemOrQuery == 'string' ?
      document.querySelectorAll(`[observes="${itemOrQuery}"]`) : [itemOrQuery];
    for (const item of items) {
      const disabled = item.getAttribute('inverseDependency') ? !val : val;
      if (disabled) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    }
  },
};

const linksPane = {
  init() {
    this.updateExternalLinkCheckBox();
  },

  updateExternalLinkCheckBox() {
    const checked = $('externalLinkTarget').value != -1;
    $('externalLink').checked = checked;
  },

  externalLinkValue(checked) {
    const external = $('externalLinkTarget');
    const generalWindowOpen = $('generalWindowOpen');
    this.externalLinkLabel(generalWindowOpen);
    $('externalLinkTarget.disabled').hidden = checked;
    external.value = checked ? generalWindowOpen.value : '-1';
    prefWindow.setDisabled('obs_externalLink', !checked);
    updateSyncedValue(external);
  },

  // copy selected label from 'open_newwindow' preference to the disabled
  // selection in 'open_newwindow.override.external'
  externalLinkLabel(item) {
    const selected = Number(item.value);
    const label = item.querySelector(`option[value="${selected}"]`).textContent;
    $('externalLinkTarget.disabled').textContent = label;
  },

  singleWindow(enableSingleWindow) {
    function updateStatus(itemId, testVal, test, newVal) {
      const item = $(itemId);
      const value = Number(item.value);
      if (test ? value == testVal : value != testVal) {
        item.value = newVal;
        updateSyncedValue(item);
      }
    }

    if (enableSingleWindow) {
      updateStatus('generalWindowOpen', 2, true, 3);
      this.externalLinkLabel($('generalWindowOpen'));
      updateStatus('externalLinkTarget', 2, true, 3);
      updateStatus('divertedWindowOpen', 0, false, 0);
    }
  },

  setMiddleCurrentDisabled(val) {
    const enabled = $('opentabforLinks').checked && val == '1';
    $('opentabforLinks.radiogroup').value = val;
    const item = document.querySelector('[preference="middlecurrent"]');
    prefWindow.setDisabled(item, !enabled);
    prefWindow.setDisabled(item.parentNode, !enabled);
  },
};

function handleButtonClick(event) {
  const button = event.target;
  const helpTopic = button.getAttribute('helpTopic');
  if (helpTopic) {
    openHelp(helpTopic);
    return;
  }

  switch (button.id || button.className) {
    case 'contribute-button':
      openContributeTab();
      break;
    case 'filetype-edit-button':
      filetypeModal.open();
      break;
    case 'restore-default-button':
      defaultPreferences();
      break;
    case 'accept-button':
      savePreferences();
      closeTab();
      break;
    case 'apply-button':
      savePreferences();
      break;
    case 'cancel-button':
      closeTab();
      break;
    case 'copy':
      copyToClipboard(button);
      break;
  }
}

async function openContributeTab() {
  const tabs = await browser.tabs.query({currentWindow: true, active: true});
  const index = tabs[0].index + 1;
  const url = 'http://tabmixplus.org/support/contribute/contribute.html';
  browser.tabs.create({url, index});
}

const helpPage = 'http://tabmixplus.org/support/viewtopic.php?t=3&p=';
async function getOpenedHelpPage() {
  const matchUrl = '*://tabmixplus.org/support/*';
  const tabs = await browser.tabs.query({currentWindow: true, url: matchUrl});
  for (const tab of tabs) {
    if (tab.url.startsWith(helpPage)) {
      return tab.id;
    }
  }
  return null;
}

async function openHelp(helpTopic) {
  if (helpTopic == '_') {
    // XX TODO: get helpTopic from visible panel
    helpTopic = 'links';
  }
  const url = `${helpPage}${helpTopic}`;
  const tabid = await getOpenedHelpPage();
  if (tabid) {
    await browser.tabs.update(tabid, {
      active: true,
      url,
    });
    await browser.tabs.reload(tabid);
  } else {
    const current = await browser.tabs.getCurrent();
    await browser.tabs.create({
      active: true,
      index: current.index + 1,
      url,
    });
  }
}

function onChange(event) {
  const item = event.target;
  updatePrefItem(item);
  if (item.hasAttribute('linked')) {
    const linkedItem = $(item.getAttribute('linked'));
    savePreferences([linkedItem]);
  } else {
    savePreferences([item]);
  }
}

function updatePrefItem(item) {
  switch (item.id) {
    case 'singleWindow':
      linksPane.singleWindow(item.checked);
      break;
    case 'generalWindowOpen':
      linksPane.externalLinkLabel(item);
      break;
    case 'externalLink':
      linksPane.externalLinkValue(item.checked);
      break;
    case 'openintab-all-links':
      linksPane.setMiddleCurrentDisabled(item.value);
      break;
    case 'openintab-other-sites':
      linksPane.setMiddleCurrentDisabled(item.value);
      break;
  }
  prefWindow.updateBroadcaster(item);
  // update middlecurrent after observes updated
  if (item.id == 'opentabforLinks') {
    linksPane.setMiddleCurrentDisabled($('opentabforLinks.radiogroup').value);
  }
  updateSyncedValue(item);
}

function updateSyncedValue(item) {
  const preference = item.getAttribute('preference');
  const syncedItem = preference &&
      document.querySelector(`[synced-item="${preference}"]`);
  if (syncedItem) {
    const type = item.getAttribute('type');
    syncedItem.textContent = type == 'checkbox' ? item.checked : item.value;
  }
}

function defaultPreferences() {
  updateUI(Object.keys(defaultValues));
  browser.storage.local.set(defaultValues)
      .catch(err => console.error('Tabmix: Error occurred when trying to save default preferences\n', err));
}

// Store currently changed preference.
function savePreferences(items) {
  const update = {};

  if (!items) {
    items = document.querySelectorAll('[preference]');
  }
  for (const item of items) {
    const preference = item.getAttribute('preference');
    const type = item.getAttribute('type');
    if (item.localName == 'select') {
      update[preference] = Number(item.value);
    } else if (type == 'checkbox') {
      update[preference] = Boolean(item.checked);
    } else if (type == 'checkbox-radiogroup') {
      const checkbox = $(preference);
      const selected = document.querySelector(`input[name=${preference}]:checked`);
      const value = selected && checkbox.checked ?
        selected.value : item.getAttribute('notChecked');
      update[preference] = Number(value);
    } else {
      console.error('Tabmix Error: unknown item type', item.getAttribute('type'), item);
    }
  }

  browser.storage.local.set(update)
      .catch(err => console.error('Tabmix: Error occurred when trying to save preferences\n', err));
}

function closeTab() {
  browser.tabs.getCurrent().then(tab => browser.tabs.remove(tab.id));
}

function copyToClipboard(button) {
  const el = button.querySelector('label').firstChild;
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  document.execCommand('Copy');
  sel.removeAllRanges();
}

/*
Update the options UI with the settings values retrieved from storage,
or the default settings if the stored settings are empty.
*/

function updateUI(prefs) {
  for (const pref of prefs) {
    const item = document.querySelector(`[preference="${pref}"]`);
    if (item) {
      const value = preferences[pref];
      const type = item.getAttribute('type');
      if (item.localName == 'select') {
        item.value = String(value);
      } else if (type == 'checkbox') {
        item.checked = Boolean(value);
      } else if (type == 'checkbox-radiogroup') {
        // the type of value is string
        const checked = value != item.getAttribute('notChecked');
        $(pref).checked = checked;
        const selectedValue = Number(checked ? value : item.getAttribute('default'));
        item.value = String(selectedValue);
        const selected = document.querySelector(`input[name=${pref}][value="${selectedValue}"]`);
        if (selected) {
          selected.checked = true;
        }
      }
      updatePrefItem(item);
    } else if (pref != 'filetype') {
      console.error(`Tabmix Error: missing item for ${pref} preference`);
    }
  }

  linksPane.init();
  prefWindow.initBroadcasters();
  linksPane.setMiddleCurrentDisabled($('opentabforLinks.radiogroup').value);
}

preferences.onChanged.addListener(updateUI, true);

const prefsContainer = $('prefs-container');
const buttons = prefsContainer.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', handleButtonClick));

prefsContainer.addEventListener('change', onChange);
