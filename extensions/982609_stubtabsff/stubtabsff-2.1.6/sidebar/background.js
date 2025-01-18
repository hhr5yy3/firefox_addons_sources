'use strict';

const marker_uri = 'data:text/plain,tab-sidebar-marker:';

const store = {
  unfolded_markers: {},
  // for tabs API bug
  tab_id_map: {}
}

function activate_markertab(i) {
  browser.tabs.query({currentWindow:true}).then((tabs) => {
    let mtabs = []
    for (let tab of tabs) {
      if (tab.url.startsWith(marker_uri))
        mtabs.push(tab);
    }
    if (i < 0)
      i += mtabs.length;
    if (mtabs[i])
      browser.tabs.update(mtabs[i].id, {active:true});
  });
}

function update_markertab_commands(enabled) {
  // browser.commands.update supported on Firefox 60 and later
  if (!browser.commands.update)
    return;

  if (enabled) {
    for (let i=1; i<9; i++)
      browser.commands.update({name: 'markertab'+i, shortcut: 'Alt+'+i});
    browser.commands.update({name: 'lastmarkertab', shortcut: 'Alt+9'});
  } else {
    for (let i=1; i<9; i++)
      browser.commands.reset('markertab'+i);
    browser.commands.reset('lastmarkertab');
  }
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if ('get_store' in msg)
    sendResponse(store);
  else if ('set_unfolded_markers' in msg)
    store.unfolded_markers[msg.set_unfolded_markers] = true;
  else if ('delete_unfolded_markers' in msg)
    delete store.unfolded_markers[msg.delete_unfolded_markers];
  else if ('set_tab_id_map' in msg)
    store.tab_id_map[msg.set_tab_id_map.key] = Number(msg.set_tab_id_map.value);
});

browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case 'markertab1':
    case 'markertab2':
    case 'markertab3':
    case 'markertab4':
    case 'markertab5':
    case 'markertab6':
    case 'markertab7':
    case 'markertab8':
      activate_markertab(Number(command.slice(-1)) - 1);
      break
    case 'lastmarkertab':
      activate_markertab(-1);
      break;
  }
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    if ('key_activate_markertab' in changes)
      update_markertab_commands(changes.key_activate_markertab.newValue);
  }
});

browser.storage.local.get(null).then((res) => {
  update_markertab_commands(res.key_activate_markertab || false);
});
