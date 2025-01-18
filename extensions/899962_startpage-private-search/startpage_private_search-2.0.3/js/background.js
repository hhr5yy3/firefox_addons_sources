const EXT_LABEL = 'ext-ff';
const SEGMENT = 'startpage.defaultffx';
const INSTALL_PARAMS = {
  source: 'organic',
  campaign: 'none',
  date: '2000-01-01',
  live: false,
};

/*
 * Capture OnInstalled event.
 * Communicate it to content script.
 */
browser.runtime.onInstalled.addListener(e => {
  browser.tabs.query({
    currentWindow: true,
    active: true,
  });
  launchSuccess(e.reason);
});

browser.webRequest.onBeforeSendHeaders.addListener(
  augmentSearch,
  {
    urls: [
      'https://*.startpage.com/*',
    ],
    types: [
      'main_frame',
    ],
  },
  ['blocking', 'requestHeaders']
);

browser.browserAction.onClicked.addListener(
  () => browser.tabs.create({url: 'https://www.startpage.com/'})
);

browser.runtime.onMessage.addListener(msg => {
  if (msg.event !== 'spcontentpl') return;
  const urlBase = `https://add.startpage.com/${getLangCode()}/uninstall/`
  browser.storage.local.get(INSTALL_PARAMS)
    .then(
      data => {
        if (data.live) return data;
        const args = Object.keys(INSTALL_PARAMS).reduce(
          (a, p) => (a[p] = msg[p] || a[p], a),
          Object.assign({}, INSTALL_PARAMS)
        );
        browser.storage.local.set(args);
        const u = buildUrl(urlBase, args)
        browser.runtime.setUninstallURL(u);
        return data;
      },
      () => browser.runtime.setUninstallURL(urlBase)
    );
});

const RETRY_PERIOD = 200;
const MAX_TRIES = (60 * 1000) / RETRY_PERIOD;

function launchSuccess(reason, tries=1) {
  if (reason !== 'install' || tries > MAX_TRIES) return;

  browser.search.get().then(engines => {
    const spDefault = engines.some(
      e => e.name.startsWith('Startpage') && e.isDefault
    )
    if (spDefault) {
      browser.tabs.create({url: `https://add.startpage.com/${getLangCode()}/success/`});
    } else {
      setTimeout(
        launchSuccess, RETRY_PERIOD, reason, ++tries
      );
    }
  });
}

function augmentSearch(e) {
  return browser.storage.local.get(INSTALL_PARAMS)
    .then(data => {
      const extensionHeaders = [
        {name: 'Startpage-Extension', value: EXT_LABEL},
        {
          name: 'Startpage-Extension-Version',
          value: browser.runtime.getManifest().version,
        },
        {name: 'Startpage-Extension-Segment', value: SEGMENT}
      ];
      if (e.url.includes('/do/dsearch')) {
        extensionHeaders.push(
          {name: 'Startpage-Extension-Campaign', value: data.campaign}
        );
        extensionHeaders.push(
          {name: 'Startpage-Extension-Date', value: data.date}
        );
        extensionHeaders.push(
          {name: 'Startpage-Extension-Source', value: data.source}
        );
      }
      const newHeaders = e.requestHeaders.concat(extensionHeaders);
      return {requestHeaders: newHeaders};
    });
}

function buildUrl(base, data) {
  const u = new URL(base);
  u.searchParams.set('pl', EXT_LABEL);
  u.searchParams.set('segment', SEGMENT);
  u.searchParams.set('extVersion', browser.runtime.getManifest().version);
  u.searchParams.set('campaign', data.campaign);
  u.searchParams.set('date', data.date);
  u.searchParams.set('source', data.source);
  return u.toString();
}

// NOTE: localization of urls is only en/de for now
function getLangCode() {
  const lang = browser.i18n.getUILanguage().split('-')[0];
  return lang === 'de' ? lang : 'en';
}
