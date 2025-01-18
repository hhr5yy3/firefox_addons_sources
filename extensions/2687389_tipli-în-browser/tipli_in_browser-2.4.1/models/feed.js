import { load, cache } from './index.js';
import { ModelTypes } from '../types.js';
import { isUrlOfBase } from '../library.js';

/*
 * Feed data structure:
 * {
 *   pages: [{
 *     url: "example.com",
 *     triggers: {},
 *     read: []
 *    }, ...]
 * }
 */


export const DEFAULT_DATA = {
  count: 0,
  pages: [],
};


/**
 *
 * @typedef {Object} FeedData
 * @property {string} domain
 * @property {Object} triggers
 * @property {Object[]} read
 *
 * @param {string} url An address of page you want to find in the feed
 * @returns {FeedData=} Returns data of particular page only if called with url
 */
export default async function modelFeed(url, { refresh = false } = {}) {
  const cached = await cache(ModelTypes.FEED);
  if (refresh) cached.expire();

  const loaded = (cached.isEmpty || cached.isExpired) ? await load(`/pages`) : null;
  const result = loaded || cached.data || DEFAULT_DATA;

  // Update stored data
  if (loaded) {
    await cached.update(loaded)
  }

  const { pages, ...metadata } = result;

  // If no URL given, pass only metadata of feed
  if (!url) {
    return metadata;
  }

  return pages.find(({ url: base, matchType }) =>
    isUrlOfBase(url, base, matchType)
  );
}

modelFeed.refreshed = () => modelFeed(null, { refresh: true });
