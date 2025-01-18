import { load, cache } from './index.js';
import { ModelTypes } from '../types.js';
import { isUrlOfBase } from '../library.js';

export const DEFAULT_DATA = {
  pagesExpiration: 1600,
  googleExpiration: 1600,
  // domeny affiliate siti, ktere resetuji aktivitu cashbacku, pokud clovek nepresel s jejich pouzitim pres tipli
  affiliateDomains: [
    'cj.com',
    'ehub.cz',
  ],
  // parametry pro resetovani aktivniho cashbacku v pripade, ze clovek projde mimo odkazy bez tipli
  affiliateParams: [
    'aid',
    'abid',
  ],
  blockedDomains: [
    // CJ
  ]
}

const inOneDay = () => Date.now() + 24 * 60 * 60 * 1000;

/**
 *
 * @typedef {Object} AddonData
 * @property {string} pagesExpiration
 * @property {string} googleExpiration
 * @property {string[]} affiliateDomains
 * @property {string[]} affiliateParams
 *
 * @returns {AddonData} Returns addons configuration data
 */
export default async function modelAddon() {
  const cached = await cache(ModelTypes.ADDON);
  const loaded = (cached.isEmpty || cached.isExpired) ? await load(`/addon`) : null;

  // Update stored data
  if (loaded) {
    await cached.update(loaded, { expiresAt: inOneDay() })
  }

  return cached.data || DEFAULT_DATA;
}
