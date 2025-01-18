'use strict';

// we have to refresh config every 2 hours, as sites configs are stored in java application as a plain json
const CONFIG_REFRESH_PERIOD = 2 * 60 * 60 * 1000;
const ICON_PATHS = {
  active: {
    '128': './icons/active128.png',
    '48': './icons/active48.png',
    '32': './icons/active32.png',
  },
  enabled: {
    '128': './icons/enabled128.png',
    '48': './icons/enabled48.png',
    '32': './icons/enabled32.png',
  },
  disabled: {
    '128': './icons/disabled128.png',
    '48': './icons/disabled48.png',
    '32': './icons/disabled32.png',
  },
};
const QUICK_START_STEP_COMPLETE_URL = 'https://talantix.ru/ats/quickStart/step';
const QUICK_START_STEP_COMPLETE_BODY = '{"completedStep":"installWebextensionCompleted"}';

function getConfig() {
  let config;

  try {
    config = JSON.parse(localStorage.getItem('HHTmsPluginConfig'));
  } catch (e) {}

  if (!config) {
    config = {
      ts: 0,
      parsingParams: null,
    };
  }

  const now = Date.now();
  const timeDelta = now - config.ts;

  if (timeDelta < CONFIG_REFRESH_PERIOD && config.parsingParams) {
    return Promise.resolve(config);
  }

  return fetch('https://talantix.ru/ats/extension/config')
    .then((response) => (response.ok ? response.json() : Promise.resolve(null)))
    .then((parsingParams) => {
      config.parsingParams = parsingParams;
      config.ts = now;
      localStorage.setItem('HHTmsPluginConfig', JSON.stringify(config));
      return config;
    });
}

function getStateByLocation(location, config) {
  const patterns = config && config.parsingParams;
  let state = 'disabled';
  if (patterns) {
    if (patterns.pagesPatterns.some((pattern) => new RegExp(pattern).test(location))) {
      state = 'active';
    } else if (patterns.sitesPatterns.some((pattern) => new RegExp(pattern).test(location))) {
      state = 'enabled';
    }
  }

  return state;
}

function getConfigAndSetIcon(tab) {
  getConfig().then((config) => {
    const location = tab.url;

    chrome.browserAction.setIcon({
      path: ICON_PATHS[getStateByLocation(location, config)],
    });
  });
}

function setInstallWebextensionCompleted() {
  fetch(QUICK_START_STEP_COMPLETE_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: QUICK_START_STEP_COMPLETE_BODY
  })
}

function injectContentScriptsToExistingTabs() {
  const urls = chrome.runtime.getManifest().content_scripts[1].matches;
  const contentScripts = chrome.runtime.getManifest().content_scripts[1].js;
  chrome.tabs.query({
    url: urls,
  }, (tabs) => tabs.forEach((tab) => {
    contentScripts.forEach(contentScript => {
      chrome.tabs.executeScript(tab.id, {
        file: contentScript
      })
    });
  }));
}

// Мозилла учиытвает загрузку страниц в iframe на странице, поэтому, если страница тормозит (например хх.ру),
// то мозилла сбрасывает иконку, если подписывать иконку по tabId. Поэтому хендлим это самостоятельно
chrome.tabs.onUpdated.addListener((data, changeInfo, tabChrome) => {
  let tab = tabChrome;
  if (!tabChrome) {
    tab = data.tab;
  }

  if (!tab.active) {
    return;
  }

  getConfigAndSetIcon(tab);
});

chrome.tabs.onRemoved.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    getConfigAndSetIcon(tab);
  });
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, getConfigAndSetIcon);
});

const ACTIONS = {
  popupOpened: () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.executeScript(tab.id, { file: './entry.js' });
    });
  },
  getConfig: (request, sender, sendResponse) => {
    getConfig()
      .then((config) => {
        const state = getStateByLocation(request.location, config);
        sendResponse(Object.assign({}, { state: state }, config));
      })
      .catch(() => {
        sendResponse({
          state: 'disabled',
          parsingParams: null,
          ts: 0,
        });
      });
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request.action || !ACTIONS[request.action]) {
    return;
  }

  ACTIONS[request.action](request, sender, sendResponse);
  return true;
});

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('getting-started/index.html')
    });

    setInstallWebextensionCompleted();
    injectContentScriptsToExistingTabs();
  }
});
