import user from './user.js';
import feed from './feed.js';
import page from './page.js';
import preferences, { STORED_PREFERENCES_KEY } from './preferences.js';
import search from './search.js';
import addon from './addon.js';
import serp from './serp.js';
import reward from './reward.js';
import { getStorage, notEmptyObject } from '../library.js';
import { LOCALE_TIPLI_URL, API_PATH, DEFAULT_LOCALE } from '../environment.js';

/**
 *
 * @typedef {Object} LoadOptions
 * @property {Object} payload These data will be sent to the API
 * @property {string} method Fetch method GET, POST, ...
 *
 * @param {string} source An End-Point address like "/feed"
 * @param {LoadOptions} options
 */
export async function load(source, { payload, method = 'GET', throwError = false } = {}) {
  if (!load.queue) {
    load.queue = new Map;
  }

  // Cannot call model preferences here, it causes infinity loop, use the storage itself
  const { locale = DEFAULT_LOCALE } = await getStorage('sync').get(STORED_PREFERENCES_KEY) || {};
  const path = LOCALE_TIPLI_URL[locale] + API_PATH + source;

  if (load.queue.has(path)) {
    const data = await load.queue.get(path);
    console.log('queued', path)
    return data
  }

  const loadTask = async () => {
    try {
      const dataToSend = payload ? JSON.stringify(payload) : undefined;
      const manifest = browser.runtime.getManifest();
      const headers = new Headers({
        'Content-Type': 'application/json',
        'x-addon-version': manifest.version,
      })
      const response = await fetch(path, { method, headers, body: dataToSend, });
      if (!response.ok && throwError) throw response;
      const data = await response.json();
      if (!notEmptyObject(data)) return null;
      data.loadedAt = Date.now();
      // transform data here if necessary ..
      console.info(`Model loaded [${method}]`, path, data);
      return data;
    } catch (O_o) {
      if (throwError) throw O_o; // "do not use exceptions as bussiness logic" they said, but we need to display error on form submit
      else console.warn(`Can not load ${path}.`, O_o);
      return null;
    } finally {
      load.queue.delete(path);
    }
  }

  const promise = loadTask();
  load.queue.set(path, promise);

  return await promise;
}


export const DEFAULT_CACHE_EXPIRATION =  8 * 60 * 60 * 1000;

/**
 * @typedef {Object} CacheOptions
 * @property {string} id
 * @property {Object} dataToStore
 * @property {number} expiresAt
 *
 * @param {string} type
 * @param {CacheOptions=} options Optional cache options
 */
export async function cache(type, { id = null } = {}) {
  const createCacheKey = async (id) => {
    // Cannot call model preferences here, it causes infinity loop, use the storage itself
    const { locale = DEFAULT_LOCALE } = await getStorage('sync').get(STORED_PREFERENCES_KEY) || {};
    return id ? `model:${locale}:${type}:${id}` : `model:${locale}:${type}`;
  }

  // Make unique key for cached data
  let key = await createCacheKey(id);
  let storedData = await getStorage().get(key);

  return {
    get data() {
      return storedData;
    },
    get isEmpty() {
      return !storedData
    },
    async update(data, { expiresAt = null, regenerateCacheKey = false } = {}) {
      if (expiresAt === null) expiresAt = Date.now() + DEFAULT_CACHE_EXPIRATION;
      data.expiresAt = expiresAt;
      data.updatedAt = Date.now();

      storedData = data;

      // While preferences changed,
      //  it may require to regenerate cache key using new locale value
      if (regenerateCacheKey) {
        key = await createCacheKey(id);
      }

      await getStorage().set(key, data);
      return data;
    },
    get isExpired() {
      return storedData && storedData.expiresAt <= Date.now();
    },
    expire(at) {
      if (this.isEmpty) return;
      return this.update(storedData, { expiresAt: at || Date.now() });
    },
    clear() {
      storedData = null;
      return getStorage().remove(key);
    },
  }
}


export default {
  user,
  feed,
  page,
  preferences, // has special abilities
  search,
  addon,
  serp,
  reward,
}

