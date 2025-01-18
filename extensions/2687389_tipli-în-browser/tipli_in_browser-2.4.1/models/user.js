import { load, cache } from './index.js';
import { ModelTypes } from '../types.js';
import { notEmptyObject } from '../library.js';

const inAnHour = () => Date.now() + 1 * 60 * 60 * 1000;
const inFewMinutes = () => Date.now() + 15 * 60 * 60 * 1000;

export const DEFAULT_EMPTY_USER = { empty: true };

/**
 *
 * @typedef {Object} UserModel
 * @property {string} name
 * @property {number} balance
 * @property {string} currency
 *
 * @returns {UserModel}
 */
export default async function modelUser({ fresh = false } = {}) {
  const cached = await cache(ModelTypes.USER);
  if (fresh) cached.expire();

  try {
    const loaded = (cached.isEmpty || cached.isExpired) ? await load(`/user`, { throwError: true }) : null;
    // Update stored data
    if (cached.isEmpty || cached.isEmpty || loaded) {
      const dataToStore = loaded || DEFAULT_EMPTY_USER;
      await cached.update(dataToStore, { expiresAt: inAnHour() });
    }
  } catch (error) {
    if (fresh && (error.status > 400 || error.status < 500)) {
      await cached.update(DEFAULT_EMPTY_USER);
    }
  }

  return cached.data;
}

modelUser.refreshed = () => modelUser({ fresh: true });
