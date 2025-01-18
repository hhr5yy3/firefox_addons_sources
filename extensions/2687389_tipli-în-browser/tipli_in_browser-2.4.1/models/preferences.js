import { load, cache } from './index.js';
import { ModelTypes, DomainMatchTypes } from '../types.js';
import { getStorage, notEmptyObject, makeWeakUrlBase } from '../library.js';
import { DEFAULT_LOCALE } from '../environment.js';

export const STORED_PREFERENCES_KEY = 'preferences';

const LOCALE_TLD = { 'cs': 'cz' };
const localeToTld = locale => LOCALE_TLD[locale] || locale;

const DEFAULT_DATA = {
  locale: DEFAULT_LOCALE,
  tld: localeToTld(DEFAULT_LOCALE),
  scanGoogle: true,
  scanHeureka: true,
  scanZbozi: true,
  scanSeznam: true,
  blacklistedDomains: [],
};

const DEFAULT_DOMAIN_PREF_RECORD = {
  urlBase: null,
  matchType: DomainMatchTypes.STARTS_WITH,
  closeContentBoxTill: null,
  closeContentBox: null,
  disableExtension: null,
};

const mapToModelData = ({ data } = {}) => {
  // Hotfix corupteed data
  if (data && data.blacklistedDomains) {
    data.blacklistedDomains = Object.values(data.blacklistedDomains);
  }
  return {
    ...(notEmptyObject(data) ? data : DEFAULT_DATA),
    tld: localeToTld(data.locale),
  }
}


/**
 *
 * @typedef {Object} DomainConfig
 * @property {string} baseUrl
 * @property {boolean} closeContentBoxTill unix timestamp
 * @property {boolean} closeContentBox
 * @property {boolean} disableExtension
 *
 * @typedef {Object} PreferencesModel
 * @property {string} locale
 * @property {string} tld
 * @property {boolean} scanGoogle
 * @property {boolean} scanHeureka
 * @property {boolean} scanZbozi
 * @property {DomainConfig[]} blacklistedDomains
 *
 * @returns {PreferencesModel}
 */
export default async function modelPreferences(updates, { serverLoad = false } = {}) {
  const source = `/user/settings`;
  const loaded = serverLoad ? await load(source) : null;
  const mapped = loaded ? mapToModelData(loaded) : null;
  const cached = await cache(ModelTypes.PREFERENCES);

  if (loaded) {
    await getStorage('sync').set(STORED_PREFERENCES_KEY, mapped);
    await cached.update(mapped, { regenerateCacheKey: true });
  }

  const stored = await getStorage('sync').get(STORED_PREFERENCES_KEY);

  if (stored && cached.isEmpty) {
    await cached.update(stored, { regenerateCacheKey: true });
  }

  if (notEmptyObject(updates)) {
    const updated = { ...cached.data, ...updates };

    updated.tld = localeToTld(updated.locale);

    // Update cache and storage
    await getStorage('sync').set(STORED_PREFERENCES_KEY, updated);
    await cached.update(updated, { regenerateCacheKey: true });

    // Send user preferences to the server but ignore result, ...
    await load(source, { payload: updated, method: 'PUT', throwError: false });
    // ... unlogged user receives 403
  }

  if (cached.isEmpty) {
    await cached.update(DEFAULT_DATA);
  }

  return cached.data;
}

modelPreferences.refreshed = async function loadedPreferencesModel() {
  return await modelPreferences(null, { serverLoad: true });
}

modelPreferences.reset = async function resetPreferencesModel() {
  await modelPreferences(DEFAULT_DATA);
}

modelPreferences.removeDomain = async function updateDomainPreferences({ url }) {
  const {
    blacklistedDomains = [],
    ...nextCurrentPreferences
  } = await modelPreferences();

  if (!blacklistedDomains || !blacklistedDomains.length) return;

  await modelPreferences({
    ...nextCurrentPreferences,
    blacklistedDomains: blacklistedDomains.filter(
      pref => (pref && pref.urlBase === url) ? false : true
    )
  });
}

modelPreferences.domain = async function updateDomainPreferences({ url } = {}, updates) {
  const {
    blacklistedDomains = [],
    ...nextCurrentPreferences
  } = await modelPreferences();

  let domainPreferences = blacklistedDomains.find(
    (p) => p && url === p.urlBase
  );

  // Validate address
  try {
    const { hostname } = new URL(`http://${makeWeakUrlBase(url)}`);
    const test = hostname.split('.').filter(Boolean).length >= 2;

    if (!test) throw null;
  }
  catch (o_O) { return null; }

  if (!domainPreferences) {
    domainPreferences = {
      ...DEFAULT_DOMAIN_PREF_RECORD,
      urlBase: makeWeakUrlBase(url),
    };
    blacklistedDomains.push(domainPreferences);
  }

  if (updates) {
    const updated = { ...domainPreferences, ...updates };
    await modelPreferences({
      ...nextCurrentPreferences,
      blacklistedDomains: blacklistedDomains.map(
        pref => (pref.urlBase === url) ? updated : pref
      )
    });
    return updated;
  } else {
    return domainPreferences
  }
}