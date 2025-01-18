const once = () => {
  if (once.done) {
    return;
  }
  once.done = true;

  chrome.storage.local.get({
    mode: '',
    player: '',
    tree: '',
    ground: ''
  }, prefs => {
    chrome.contextMenus.create({
      id: 'mode',
      title: 'Display Mode',
      contexts: ['action']
    });
    chrome.contextMenus.create({
      id: 'mode:',
      title: 'Random',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.mode === '',
      parentId: 'mode'
    });
    chrome.contextMenus.create({
      id: 'mode:color',
      title: 'Color',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.mode === 'color',
      parentId: 'mode'
    });
    chrome.contextMenus.create({
      id: 'mode:black',
      title: 'Black and White',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.mode === 'black',
      parentId: 'mode'
    });
    chrome.contextMenus.create({
      id: 'player',
      title: 'Player',
      contexts: ['action']
    });
    chrome.contextMenus.create({
      id: 'player:',
      title: 'Select',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.player === '',
      parentId: 'player'
    });
    chrome.contextMenus.create({
      id: 'player:cat',
      title: 'Cat',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.player === 'cat',
      parentId: 'player'
    });
    chrome.contextMenus.create({
      id: 'player:dinosaur',
      title: 'Dinosaur',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.player === 'dinosaur',
      parentId: 'player'
    });
    chrome.contextMenus.create({
      id: 'player:dog',
      title: 'Dog',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.player === 'dog',
      parentId: 'player'
    });
    chrome.contextMenus.create({
      id: 'player:kangaroo',
      title: 'Kangaroo',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.player === 'kangaroo',
      parentId: 'player'
    });
    chrome.contextMenus.create({
      id: 'tree',
      title: 'Tree',
      contexts: ['action']
    });
    chrome.contextMenus.create({
      id: 'tree:',
      title: 'Random',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.tree === '',
      parentId: 'tree'
    });
    chrome.contextMenus.create({
      id: 'tree:one',
      title: 'Type 1',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.tree === 'one',
      parentId: 'tree'
    });
    chrome.contextMenus.create({
      id: 'tree:two',
      title: 'Type 2',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.tree === 'two',
      parentId: 'tree'
    });
    chrome.contextMenus.create({
      id: 'ground',
      title: 'Ground',
      contexts: ['action']
    });
    chrome.contextMenus.create({
      id: 'ground:',
      title: 'Random',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.ground === '',
      parentId: 'ground'
    });
    chrome.contextMenus.create({
      id: 'ground:one',
      title: 'Type 1',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.ground === 'one',
      parentId: 'ground'
    });
    chrome.contextMenus.create({
      id: 'ground:two',
      title: 'Type 2',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.ground === 'two',
      parentId: 'ground'
    });
    chrome.contextMenus.create({
      id: 'ground:three',
      title: 'Type 3',
      contexts: ['action'],
      type: 'radio',
      checked: prefs.ground === 'three',
      parentId: 'ground'
    });
  });
};
chrome.runtime.onInstalled.addListener(once);
chrome.runtime.onStartup.addListener(once);

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId.startsWith('mode:')) {
    chrome.storage.local.set({
      mode: info.menuItemId.replace('mode:', '')
    });
  }
  else if (info.menuItemId === 'mode:color') {
    chrome.storage.local.set({mode: 'color'});
  }
  else if (info.menuItemId.startsWith('player')) {
    chrome.storage.local.set({
      player: info.menuItemId.replace('player:', '')
    });
  }
  else if (info.menuItemId.startsWith('tree')) {
    chrome.storage.local.set({
      tree: info.menuItemId.replace('tree:', '')
    });
  }
  else if (info.menuItemId.startsWith('ground')) {
    chrome.storage.local.set({
      ground: info.menuItemId.replace('ground:', '')
    });
  }
});

// update player
chrome.storage.onChanged.addListener(ps => {
  if (ps.player) {
    chrome.contextMenus.update('player:' + (ps.player.newValue || ''), {
      checked: true
    }, () => chrome.runtime.lastError);
  }
});

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
