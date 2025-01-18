window.service = new Service();
window.store = {
  SimpleStore,
  Prefs,
  ActionStore,
  AttrStore,
  ClientStore,
  ErrorStore,
  KVStore,
  PopupMessageStore,
  RuleStore,
  SieveStore,
  SieveDataStore,
  SieveSnapshotStore,
  SieveDataProxy,
  TagStore,
  UserStore,
  WorkStore,
  ClientGroupStore,
  MacroStore,
};
import { matchRule } from './ui/lib/rules.js';
window.matchRule = matchRule;
window.initLocale = function initLocale() {
  if (Prefs.get('locale')) {
    return;
  }
  const osLocale = chrome.i18n.getUILanguage();
  const lang = osLocale.split(/[-_]/)[0];

  if (['de', 'fr', 'ja', 'ru', 'zh', 'es', 'it', 'pl', 'pt', 'sr'].indexOf(lang) >= 0) {
    Prefs.set('locale', lang);
  }
};

window.fetchLocalFileText = async function fetchLocalFileText(url) {
  let res = await fetch(url);
  let text = await res.text();
  return text;
}

service.on('init:data', async () => {
  service.setActive(Prefs.get('active'));
  try {
    await api('/public/clients', 'POST', await ClientStore.findOne(Prefs.get('client.id')));
  } catch(e) {
    console.error("Could not fetch clients", e);
  }
});

Prefs.on('change:active', (active, name) => {
  service.setActive(active);
  setActionIcon(active);
});

service.state.on('change:unread', (_, count) => {
  chrome.browserAction.setBadgeText({
    text: count == 0 ? '' : count+'',
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  if (port.sender.tab) {
    handlePort(port);
  } else {
    console.error('Unhandled background port', port);
    port.disconnect();
  }
});

function handlePort(port) {
  const name = port.name;
  const type = name.substring(0, name.indexOf(':'));

  switch (type) {
    case 'loader':
      if (!port.attrs) {
        port.attrs = JSON.parse(name.substring('loader:'.length));
      }

      if (!loaderAttachPort(port)) {
        port.disconnect();
      }
      break;

    case 'selector':
      if (!selectorAttachPort(port)) {
        port.disconnect();
      }
      break;

    default:
      port.disconnect();
  }
};

// Handles messages sent by child frames created by loaders.
addEventListener('message', function(event) {
  // console.log('EXTN:message:', event);
  const
    source = event.source;


  const child = (event.data || {}).distillchildport;

  if (child) {
    // console.log('EXTN:message:send message to child:', child);
    source.postMessage({
      distillparentport: {id: 'BG'},
      forChild: child,
    }, '*');
  }
}, false);

window.addFeedForTab = async function addFeedForTab({identityId}) {
  let [tab] = await chrome.tabs.queryAsync({
    currentWindow: true,
    active: true
  });
  let {id, url} = tab;
  if (!testURL(url)) {
    throw new Error('Page with unsupported url:' + url);
  }

  await chrome.tabs.createAsync({
    active: true,
    openerTabId: id,
    url: `${service.appUrl}#/w/${identityId||0}/sieve/add/feed.d?url=${url}`,
  });
};

window.addSieveForTemplate = async function addSieveForTemplate(tab, tplId) {
  await chrome.tabs.createAsync({
    active: true,
    url: `${service.appUrl}#/w/0/sieve/from-tpl/${tplId}.id?url=${encodeURIComponent(tab.url)}`,
  });
};

async function saveSieve(identityId, sieve) {
  let doc;
  if(identityId) {
    doc = await _api({
      url: CFG.URL.API + SieveStore.urls.root,
      method: 'POST',
      json: sieve,
      headers: { 'x-identity': identityId, }
    });
  } else {
    doc = await SieveStore.create(sieve);
  }
  await chrome.tabs.createAsync({
    active: true,
    url: `${service.appUrl}#/w/${identityId||0}/sieve/edit/${doc.id}.id`,
  });
}

// Miscellaneous APIs\
// Pop up call this method to open the selector
window.openSelector = async function openSelector({identityId} = {}) {
  let [tab] = await chrome.tabs.queryAsync({
    currentWindow: true,
    active: true
  });

  let {id, url} = tab;

  if (!testURL(url)) {
    alert('Page with unsupported url: ' + url);
    return;
  }

  // Create loader for the tab and call openSelectorForTabLoader
  const loader = await createLoader({
    type: 'tab',
    info: {
      tabId: id,
    },
    pageMods: ['locator'],
  });

  addBreadcrumb({
    message: 'openSelector: ' + url,
  });  // some wait for 'reset' timeout
  await loader.waitForEvent('reset', 5000);

  const selector = new VisualSelector({
    loader,
    state: {
      selectorOn: true,
    },
  }, async function(err, sieve) {
    if (err) {
      console.error('Visual Selector error:', err);
      // TODO Log error for user to see?
    } else if (sieve) {
      _.defaults(sieve, {
        schedule: JSON.stringify({
          type: 'INTERVAL',
          params: {interval: 1800},
        }),
        state: 20, // STATE_INIT, used by ui to set default options
      });

      await loader.request(0, {
        path: 'showMsg',
        data: {msg: 'Saving...', hideAfter: 6000},
      });

      await saveSieve(identityId, sieve);
    }
    selector.destroy();
    loader.destroy();
  });
};

window.isActive = function isActive() {
  return Prefs.get('active');
};

window.toggleService = function toggleService() {
  Prefs.set('active', !Prefs.get('active'));
};

window.watchTab = async function watchTab({identityId} = {}) {
  let [tab] = await chrome.tabs.queryAsync({currentWindow: true, active: true});

  let {url} = tab;

  if (!testURL(url)) {
    return alert('Page with unsupported url:' + url);
  }

  const sieve = {
    content_type: 2, // C.TYPE_HTML
    config: JSON.stringify({
      includeStyle: true,
      selections: [{
        frames: [{
          index: 0,
          excludes: [],
          includes: [{
            expr: '/html',
            type: 'xpath',
          }],
        }],
      }],
    }),
    schedule: JSON.stringify({
      type: 'INTERVAL',
      params: {interval: 1800},
    }),
    name: tab.title || 'Untitled',
    uri: url,
    state: 20, // STATE_INIT
  };
  await saveSieve(identityId, sieve);
};

window.setActionIcon = (active) => {
  chrome.browserAction.setIcon({
    path: active ? {
      19: '/ui/img/distill_19.png',
      38: '/ui/img/distill_38.png',
    }: {
      19: '/ui/img/distill_disabled_19.png',
      38: '/ui/img/distill_disabled_38.png',
    },
  });
};

// setActionIcon(Prefs.get('active'));
// Set bg color for other chromium based browsers
chrome.browserAction.setBadgeBackgroundColor({
  color: '#c00',
});

chrome.contextMenus.create({
  documentUrlPatterns: ['http://*/*', 'https://*/*'],
  title: 'Monitor Full Page',
  onclick: (info, tab) => {
    watchTab();
  }
});

chrome.contextMenus.create({
  documentUrlPatterns: ['http://*/*', 'https://*/*'],
  title: 'Monitor Parts of Page',
  onclick: (info, tab) => {
    openSelector();
  }
});

window.removeBlanks = function removeBlanks() {
  chrome.tabs.query({
    pinned: true,
    url: CFG.URL.BLANK,
  }, function(tabs) {
    chrome.tabs.remove(_.pluck(tabs, 'id'));
  });
};

// initLocale();
// removePinnedTabs();
removeBlanks();

window.attachAndOpenSelector = async function attachAndOpenSelector(options) {
  let {url, model, tabId} = options;

  if (!testURL(url)) {
    console.error('Page with unsupported url: ' + url);
    return;
  }

  // Create loader for the tab and call openSelectorForTabLoader
  const loader = await createLoader({
    type: 'tab',
    info: {
      tabId,
      pinned: false,
    },
    closeTabOnDestroy : true,
    pageMods: ['locator'],
  });
  loader.load(url);
  setTimeout(() => {
    chrome.tabs.update(loader.tabId, {active: true})
  }, 500)

  addBreadcrumb({
    message: 'openSelector: ' + url,
  });
  let resultSieve = await new Promise((resolve, reject) => {
    const selector = new VisualSelector({
      loader,
      model,
    }, async function (err, sieve) {
      if (err) {
        console.error('Visual Selector error:', err);
        reject(err);
        // TODO Log error for user to see?
      } else if (sieve) {
        _.defaults(sieve, {
          schedule: JSON.stringify({
            type: 'INTERVAL',
            params: {interval: 1800},
          }),
          state: 20, // STATE_INIT, used by ui to set default options
        });

        await loader.request(0, {
          path: 'showMsg',
          data: {msg: 'Saving...', hideAfter: 6000},
        });
        resolve(sieve);
      } else {
        resolve();
      }
      selector.destroy();
      loader.destroy();
    });
  });
  return resultSieve;
};

window.closeSelector = async function closeSelector(tabId){
  const loader = WebpageLoader.INSTANCES.find((loader) => loader.tabId === tabId );
  loader && await loader.destroy();
}