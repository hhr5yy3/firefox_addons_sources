import { load, cache } from './index.js';
import { ModelTypes } from '../types.js';

const DEFAULT_DATA = {
  list: []
};

/**
 * @typedef {Object} SerpModel
 *
 * @param {SerpType} type One of SerpTypes like "google"
 * @returns {SerpModel}
 */
export default async function modelSerp(type) {
  const cached = await cache(ModelTypes.SERP, { id: type });
  const loaded = (cached.isEmpty || cached.isExpired) ? await load(`/${type}`) : null;

  if (loaded) {
    await cached.update(loaded);
  }

  return cached.data || DEFAULT_DATA;
}
