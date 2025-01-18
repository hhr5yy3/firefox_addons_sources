import { load, cache } from './index.js';
import { ModelTypes } from '../types.js';

export const DEFAULT_DATA = {
  banners: [],
  shops: [],
  query: '',
};
export const FEW_SECONDS = 7;

const justFewSeconds = () => Date.now() + FEW_SECONDS * 1000;
const aboutEightHours = () => Date.now() + 8 * 60 * 60 * 1000;

/**
 * Even without query you will get few banners and shops as search result,
 *  those are cached for hours. With search query, user manually type, are result cached for few seconds.
 *
 * @typedef {Object} SearchBanner
 * @property {string} name
 * @property {string} url
 * @property {string} imageUrl
 * @property {string} validTill
 *
 * @typedef {Object} SearchShop
 * @property {string} name
 * @property {string} logoUrl
 * @property {string} redirectUrl
 * @property {string} reward
 * @property {string} rewardSuffix
 *
 *
 * @typedef {Object} SearchData
 * @property {SearchBanner[]} banners
 * @property {SearchShop[]} shops
 * @property {string=} query User's manually typed search query
 *
 * @param {string} query Search query typed by user
 * @returns {SearchData} Banners and shops to display
 */
export default async function modelSearch(query = '') {
  const cached = await cache(ModelTypes.SEARCH);
  if (!cached.isEmpty && cached.data.query !== query) cached.clear();

  const loaded = (cached.isEmpty || cached.isExpired) ? await load(`/search?q=${encodeURIComponent(query)}`) : null;
  const result = loaded || cached.data || DEFAULT_DATA;

  if (cached.isEmpty) {
    result.query = query;
  }

  // Update stored data
  if (loaded) {
    const expiresAt = query ? justFewSeconds() : aboutEightHours();
    await cached.update(result, { expiresAt });
  }

  return cached.data;
}
