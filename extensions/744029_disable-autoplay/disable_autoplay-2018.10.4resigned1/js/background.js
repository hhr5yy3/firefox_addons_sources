const options = {
  defaults: {
    disableAutoplay: true,
    disablePreload: true,
  },
  domainPrefs: {},
};

const background = {};

background.init = async () => {
  const result = await browser.storage.local.get(Object.keys(options));
  Object.assign(options, result);
  browser.runtime.onMessage.addListener(background.handleMessage);
};

background.handleMessage = (message, sender, sendResponse) => {
  switch (message.msg) {
    // from popup.js
    case 'popup-loaded': sendResponse(background.getDomainPrefs(message.domain)); break;
    // from options.js
    case 'get-options': sendResponse(options); break;
    case 'change-default': background.changeDefault(message); break;
    case 'remove-domain-prefs': background.removeDomainPref(message.domain); break;
    // from popup.js or options.js
    case 'save-domain-pref': background.saveDomainPrefs(message); break;
    // from content_script.js
    case 'content-script-loaded': sendResponse(background.onContentScriptLoaded(sender.tab)); break;
    default:
  }
};

background.onContentScriptLoaded = tab => background.getDomainPrefs(new URL(tab.url).hostname);

background.getDomainPrefs = domain => options.domainPrefs[domain] || options.defaults;

background.changeDefault = ({ prefName, value }) => {
  options.defaults[prefName] = value;
  browser.storage.local.set({ defaults: options.defaults });
  for (const domain in options.domainPrefs) {
    if (options.domainPrefs[domain].disableAutoplay === options.defaults.disableAutoplay
    && options.domainPrefs[domain].disablePreload === options.defaults.disablePreload) {
      delete options.domainPrefs[domain];
    }
  }
};

background.saveDomainPrefs = ({ domain, prefName, value }) => {
  if (!options.domainPrefs[domain]) {
    options.domainPrefs[domain] = {};
  }

  Object.assign(options.domainPrefs[domain], options.defaults, { [prefName]: value });

  if (options.domainPrefs[domain].disableAutoplay === options.defaults.disableAutoplay
  && options.domainPrefs[domain].disablePreload === options.defaults.disablePreload) {
    delete options.domainPrefs[domain];
  }

  browser.storage.local.set({ domainPrefs: options.domainPrefs });

  background.domainPrefsChanged(domain, prefName, value).catch(e => console.log(e));
};

background.removeDomainPref = (domain) => {
  delete options.domainPrefs[domain];
  browser.storage.local.set({ domainPrefs: options.domainPrefs });
};

background.domainPrefsChanged = async (domain, prefName, value) => {
  const tabs = await browser.tabs.query({ url: `*://${domain}/*` });
  tabs.forEach(({ id: tabId }) => {
    browser.tabs.sendMessage(tabId, { msg: 'domain-prefs-changed', prefName, value });
  });
};

background.init().catch(e => console.log(e));
