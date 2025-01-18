import {
  MessageTypes,
  ContentTypes,
  SerpTypes,
  ControlIconTypes,
} from './types.js';
import models from './models/index.js';
import {
  listenToMessages,
  getActiveTabOfCurrentWindow,
  isWebAddress,
  getStorage,
  notEmptyObject,
  isUrlOfBase,
  isUrlDomainOnList,
  isAnyUrlParamOnList,
  hasUrlParam,
  sleep,
  // makeWeakUrlBase,
} from './library.js';
import { LOCALE_TIPLI_URL, TIPLI_AFFIL_SLUGS, TIPLI_INSTALLED_SLUGS } from './environment.js';
import { migratePreferences } from './migration.js';


// DEV access
window.models = models;

/*
 * Handlers and other local methods, the 🥩 code exists on very bottom of this file
 * ========================================
 */

async function handleBasicDataRequest({ tab, preferences }) {
  if (tab && isWebAddress(tab.url)) {
    return console.error('Due to security only Popup and Extension screens can request data of user');
  }

  const user = await models.user();
  const { tipliLinks } = await models.addon();

  return { user, preferences, tipliLinks };
}



async function handleInstructionsRequest({ tab, url, meta, preferences }) {
  const data = !meta ? null : await models.page(meta, url);

  if (!meta || !data) {
    return { instructions: null }; // causes end of content script activity
  }

  const { disableExtension } = await models.preferences.domain(meta) || {};
  if (disableExtension) {
    return { instructions: null }
  }

  const user = await models.user();
  const reward = await models.reward(meta.url) || {};

  // No user now but cashback previously activated, so we neeed to reset the state
  if ((!user || user.empty) && (reward.cashback || reward.deactivated)) {
    await models.reward(meta.url, { cashback: false, deactivated: false });
    await resetCloseContentBoxTill(meta.url);
  }

  // hook
  if (data.popup.shop) {
    setupInteractiveIcon({ data, tab, meta, user, reward }).catch(console.warn);
  }

  const { read, triggers } = meta;
  const { locale } = preferences;

  // Pass only what templates need, no internal data..
  return {
    instructions: { read, triggers, locale },
  };
}

const iconBlinkIntervals = [];

async function setupInteractiveIcon({ data, tab, meta, user, reward }) {
  const { sales = [], shop = {} } = data.popup || {};
  const salesCount = sales.filter((x) => !x.isSimilar).length;
  const tabId = tab.id;

  if (salesCount) {
    browser.browserAction.setBadgeBackgroundColor({
      // color: '#3B3B3B',
      color: '#EE7836',
      tabId,
    });
    browser.browserAction.setBadgeText({
      text: salesCount.toString(),
      tabId,
    });
  }

  const setIcon = (type) => {
    // TODO: handle setIcon on closed tab
    browser.browserAction.setIcon(
      { tabId, path: `./assets/icon-${type}.png` }
    )
  }


  // blink 🟧, 🟥, ..., 🟥
  if (
    (shop.rewardType === 'cashback' && !reward.cashback)
    || reward.deactivated
    || reward.blocked
  ) {
    for (let i = 0; i < 10; i++) {
      let id = setTimeout(() => {
        setIcon((i % 2 === 0) ? 'normal' : 'negative');
      }, i * 750);
      iconBlinkIntervals.push(id);
    }
    return;
  }

  // still 🟩
  if (
    user && !user.empty && // only for logged in users
    shop.rewardType === 'cashback' &&
    reward.cashback
  ) {
    iconBlinkIntervals.forEach(clearInterval);
    setIcon('positive');
    return;
  }

}

async function handleSerpRequest(type, preferences) {
  const resp = await models.serp(type);
  return { serpResults: resp.list, preferences };
}

async function handleContentsRequest({ tab, url, message, preferences }) {
  // Prepare search content to render
  const { search: searchQuery } = message.payload || {}
  const popupSearch = {
    contentType: ContentTypes.POPUP_SEARCH,
    contentData: await models.search(searchQuery),
    appearance: {
      selector: 'article#search',
    }
  };

  if (!isWebAddress(url)) return tab ? [] : [popupSearch]; // only http pages displayes content

  const meta = await models.feed(url);

  // No meta, page not found in the feed, abort
  if (!meta) {
    return tab ? [] : [popupSearch];
  }

  const {
    disableExtension,
    closeContentBox,
  } = await models.preferences.domain(meta) || {};

  if (disableExtension) {
    const popupDisabled = {
      contentType: ContentTypes.POPUP_DISABLED,
      contentData: {},
      appearance: {
        selector: 'article#content',
      },
    }
    return tab ? [] : [popupSearch, popupDisabled];
  }


  // only content boxes sends payload of page data
  const { content, popup } = await models.page(meta, url, tab ? message.payload : null);

  if (tab && !notEmptyObject(content.shop)) {
    console.info('Empty page data.');
    return [];
  }
  if (!tab && !notEmptyObject(popup.shop)) {
    console.info('Empty popup data.');
    return [popupSearch];
  }

  const reward = await models.reward(meta.url);

  if (!tab) {
    const popupContent = {
      contentType: ContentTypes.POPUP_CONTENT,
      contentData: {
        ...popup,
        shop: { ...popup.shop, deepUrl: url },
        reward
      },
      appearance: {
        selector: 'article#content',
      },
    };
    return [popupSearch, popupContent];
  }

  const { [meta.url]: closeContentBoxTill } = await getStorage('local').get('closeContentBoxTill') || {};

  // Temporary close box since cashback reward activated.
  if (reward.cashback) {
    await handleContentBoxClose(ControlIconTypes.CLOSE, url);
  }

  // Keep closed only if rewards are not deactivated
  if (closeContentBoxTill > Date.now()) {
    if (reward.deactivated) {
      await resetCloseContentBoxTill(meta.url);
    } else {
      return [];
    }
  }


  if (closeContentBox) {
    return [];
  }

  if (reward.blocked) {
    return [];
  }

  const contentBox = {
    contentType: ContentTypes.CONTENT_BOX,
    contentData: {
      ...content,
      shop: { ...content.shop, deepUrl: url },
      reward,
      preferences,
    },
    appearance: {
      selector: 'body',
    },
  };

  // Define more content targets here ...
  return [contentBox];
}

async function handlePreferencesUpdate(values) {
  if (!values) return console.error('No preference values provided.');
  try {
    await models.preferences(values);
    return { success: true, failure: null };
  } catch (error) {
    console.error(error);
    return { success: false, failure: error };
  }
}

async function handleContentBoxClose(type, url) {
  const meta = await models.feed(url);

  if (type === ControlIconTypes.CLOSE) {
    await doCloseContentBoxTillHour(meta.url);
  }
  else if (type === ControlIconTypes.HIDE) {
    const closeContentBox = true;
    const updates = { baseUrl: meta.url, closeContentBox };
    await models.preferences.domain(meta, updates);
  }
  else {
    console.warn('Unknown close type', type);
  }
}

async function doCloseContentBoxTillHour(baseUrl) {
  const till = Date.now() + 1 * 60 * 60 * 1000;
  const prev = getStorage('local').get('closeContentBoxTill');
  const next = { ...prev, [baseUrl]: till };
  await getStorage('local').set('closeContentBoxTill', next);
}

async function resetCloseContentBoxTill(baseUrl) {
  const prev = getStorage('local').get('closeContentBoxTill');
  const next = { ...prev, [baseUrl]: null };
  await getStorage('local').set('closeContentBoxTill', next);
}


/*
 * 1. Entry, extension installed
 * ========================================
 * Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
 */
browser.runtime.onInstalled.addListener(handleInstalled);

async function handleInstalled({ reason }) {
  await bootstrap(); // 👈 call this first

  if (reason === 'install') {
    const { locale } = await models.preferences();
    const url = LOCALE_TIPLI_URL[locale] + TIPLI_INSTALLED_SLUGS[locale];
    browser.tabs.create({ url }); // open new tab with on installed info
  }
}

async function bootstrap({ reset = false } = {}) {
  // Reset cache
  if (reset) {
    await getStorage('sync').clear(true);
    await getStorage('local').clear(true);
    await models.preferences.reset();
  }

  let preferences = await models.preferences.refreshed();

  // Delete this in a while
  if (!preferences.migratedAt) {
    const migrated = await migratePreferences(preferences);
    if (migrated !== preferences) await models.preferences(migrated);
    preferences = migrated;
  }

  // Pre-cache
  await models.addon();
  await models.user();
  //  ... on background
  models.feed().then(async () => {
    await sleep(4)
    await models.serp(SerpTypes.GOOGLE);
    await sleep(3);
    await models.serp(SerpTypes.ZBOZI);
    await sleep(3);
    await models.serp(SerpTypes.HEUREKA);
    await sleep(3);
    await models.serp(SerpTypes.SEZNAM);
    // await models.search();
  });
}


/*
 * 2. Messaging
 * ========================================
 *  Content script or extension pages (like popup.html) can send request messages
 *  and here we are listening to them...
 */
listenToMessages(async (message, sender) => {
  const { tab } = sender; // no tab means sender is a popup page
  const { url, id: tabId } = tab || await getActiveTabOfCurrentWindow() || { url: null };
  const preferences = await models.preferences();

  switch (message.type) {
    case MessageTypes.BASIC_DATA_REQUEST: {
      return {
        type: MessageTypes.BASIC_DATA_RESPONSE,
        payload: await handleBasicDataRequest({ tab, preferences })
      };
    }
    case MessageTypes.INSTRUCTIONS_REQUEST: {
      if (!isWebAddress(url)) return { instructions: null };
      const meta = await models.feed(url);

      if (meta) {
        await evaluateRewardState({ meta, tab, preferences });
      }

      return {
        type: MessageTypes.INSTRUCTIONS_RESPONSE,
        payload: await handleInstructionsRequest({ tab, url, meta, preferences })
      };
    }
    case MessageTypes.CONTENTS_REQUEST: {
      return {
        type: MessageTypes.CONTENTS_RESPONSE,
        payload: await handleContentsRequest({ tab, url, message, preferences }),
      };
    }
    case MessageTypes.UPDATE_PREFERENCES_REQUEST: {
      return {
        type: MessageTypes.UPDATE_PREFERENCES_RESPONSE,
        payload: await handlePreferencesUpdate(message.payload),
      };
    }
    case MessageTypes.CONTROL_ICON_CLICK: {
      await handleContentBoxClose(message.payload.type, url);
      return { type: MessageTypes.EMPTY_RESPONSE };
    }
    case MessageTypes.POPUP_BOX_OPEN: {
      const meta = await models.feed(url);
      const user = await models.user.refreshed();

      if (meta) {
        await resetCloseContentBoxTill(meta.url);
      }
      return { type: MessageTypes.EMPTY_RESPONSE };
    }
    case MessageTypes.SERP_REQUEST: {
      return {
        type: MessageTypes.SERP_RESPONSE,
        payload: await handleSerpRequest(message.payload.type, preferences),
      };
    }
    case MessageTypes.FEED_META_REQUEST: {
      return {
        type: MessageTypes.FEED_META_RESPONSE,
        payload: await models.feed(),
      };
    }
    case MessageTypes.MANIFEST_REQUEST: {
      return {
        type: MessageTypes.MANIFEST_RESPONSE,
        payload: browser.runtime.getManifest()
      };
    }
    case MessageTypes.RESTORE_EXTENSION: {
      await bootstrap({ reset: true });
      return {
        type: MessageTypes.EMPTY_RESPONSE,
      };
    }
    case MessageTypes.BLACKLIST_URL: {
      const { url } = message.payload || {};
      const meta = await models.feed(url);
      const unknown = { url };
      const updates = { disableExtension: true };

      return {
        type: MessageTypes.DOMAIN_PREFERENCES,
        payload: await models.preferences.domain(meta || unknown, updates),
      };

    }
    case MessageTypes.BLACKLIST_REMOVE_URL: {
      const { url } = message.payload || {};
      await models.preferences.removeDomain({ url });

      return {
        type: MessageTypes.DOMAIN_PREFERENCE_REMOVED
      };

    }
    case MessageTypes.REFRESH_FEED_REQUEST: {
      return {
        type: MessageTypes.REFRESH_FEED_RESPONSE,
        payload: await models.feed.refreshed(),
      };
    }
    default: {
      return { type: null, payload: null };
    }
  }
})


/*
 * 3. Referrals and Cashback
 * ========================================
 *  Watch for URL redirections and track cashback status.
 *  Store last referral for content triggers.
 */

browser.webRequest.onHeadersReceived.addListener(
  watchForCashbackWalkThrough,
  { urls: ['<all_urls>'], types: ['main_frame'] },
  ['responseHeaders']
);

async function evaluateRewardState({ meta, tab, preferences }) {
  const record = await models.reward.affilRecord(tab.id);
  const reward = await models.reward(meta.url);

  if (tab.active) {
    await models.reward.removeAffilRecord();
    console.info('Affil record removed.');
  }

  const isTipliAffilUrl = url => (
    isUrlOfBase(url, LOCALE_TIPLI_URL[preferences.locale]) &&
    url.indexOf(TIPLI_AFFIL_SLUGS[preferences.locale]) > -1
  );
  const isPageViewStatusCode = c => (c === 200);

  const {
    affiliateDomains,
    affiliateParams,
    blockedDomains,
  } = await models.addon();

  const isRedirectStatusCode = c => (300 < c && c < 400);
  const isTipliAffil = ({ log }) => log.find(r => isTipliAffilUrl(r.url));
  const isAnyAffilDomain = ({ log }) => (
    log.findIndex(l => isUrlDomainOnList(l.url, affiliateDomains)) > -1
  );
  const isAnyAffilParam = ({ log }) => (
    // 👇 hotfix for booking with affil param in web navigation causing false positive deactivation
    log.length > 1 && log.findIndex(l => isAnyUrlParamOnList(l.url, affiliateParams)) > -1
  );
  const hasExtraBlockParam = url => hasUrlParam(url, 'afsrc', '1'); // afsrc=1
  const isBlockedAffil = ({ log }) => (
    log.findIndex(l => isUrlDomainOnList(l.url, blockedDomains) || hasExtraBlockParam(l.url)) > -1
  );


  if (isTipliAffil(record)) {
    console.info('isTipliAffil', record.log);
    const user = await models.user.refreshed(); // cashback related refresh
    await models.page.refreshed(meta); // reload page for new data
    await resetCloseContentBoxTill(meta.url);
    await models.reward(meta.url, { coupons: true, cashback: (user && !user.empty) });
  }
  else if (isBlockedAffil(record)) {
    console.info('isBlockedAffil', record.log);
    await models.reward(meta.url, { blocked: true, deactivated: true, });
  }
  else if (isAnyAffilDomain(record) || isAnyAffilParam(record)) {
    console.info('isAnyAffil', record.log);
    await models.reward(meta.url, { deactivated: true });
  }
}


async function watchForCashbackWalkThrough({ statusCode, url, tabId }) {
  console.info(`[${statusCode}] ${url}`);

  const { locale } = await models.preferences();
  const record = await models.reward.affilRecord(tabId);

  const isTipliAffilUrl = url => (
    isUrlOfBase(url, LOCALE_TIPLI_URL[locale]) &&
    url.indexOf(TIPLI_AFFIL_SLUGS[locale]) > -1
  );
  const isRedirectStatusCode = c => (300 < c && c < 400);
  const isPageViewStatusCode = c => (c === 200);
  const isTabRecording = ({ log }) => log.length > 0;

  if (isTabRecording(record) && isRedirectStatusCode(statusCode)) {
    console.info("Recording and redirection found, pushing new url");
    await models.reward.recordAffilUrl({ url, statusCode }, tabId);
    return;
  }

  if (isTipliAffilUrl(url)) {
    console.info("New Tipli walk trought");
    await models.reward.recordAffilUrl({ url, statusCode }, tabId);
    return;
  }

  const {
    affiliateDomains,
    affiliateParams,
    blockedDomains,
  } = await models.addon();

  if (isUrlDomainOnList(url, affiliateDomains)) {
    console.info("Affil domain walk trought");
    console.info(await models.reward.recordAffilUrl({ url, statusCode }, tabId));
    return;
  }

  if (isUrlDomainOnList(url, blockedDomains) || hasUrlParam(url, 'afsrc', '1')) {
    console.info("Blocked domain walk trought");
    await models.reward.recordAffilUrl({ url, statusCode }, tabId);
    return;
  }

  if (isAnyUrlParamOnList(url, affiliateParams)) {
    console.info("Affil param walk trought");
    await models.reward.recordAffilUrl({ url, statusCode }, tabId);
  }

}
