import { cache } from './index.js';
import { ModelTypes } from '../types.js';

const storeDataToCache = id => data => cache(ModelTypes.REWARD, { id, dataToStore: data });
const inThirtyMinutes = () => Date.now() + .5 * 60 * 60 * 1000;

export const DEFAULT_DATA = {
  log: [],
  cashback: false,
  coupons: false,
  deactivated: false,
  blocked: false,
};

export const UNKNOWN_YET_BASE_URL = 'unknown-yet';

export default async function modelReward(baseUrl, updates = null) {
  const cached = await cache(ModelTypes.REWARD, { id: baseUrl });

  if (cached.isExpired) {
    // Reward model chould not hold values for long
    await cached.clear();
  }

  if (!updates) {
    return cached.data || DEFAULT_DATA
  }

  if (cached.isEmpty) {
    await cached.update(DEFAULT_DATA);
  }

  // Do not mark as deactivated if non cashback reward present
  if (updates.deactivated && cached.data.cashback == false) {
    updates.deactivated = null;
  }
  // Do not mark as blocked nor deactivated if positive reward updates comming
  else if (updates.coupons || updates.cashback) {
    updates.deactivated = false;
    updates.blocked = false;
  }

  await cached.update({ ...cached.data, ...updates }, { expiresAt: inThirtyMinutes() });

  return cached.data;
}

modelReward.affilRecord = async function getAffilRecord(tabId) {
  const record = await modelReward(UNKNOWN_YET_BASE_URL);
  return (record && record.tabId === tabId) ? record : DEFAULT_DATA;
}

modelReward.recordAffilUrl = async function recordAffilUrl(rec, tabId) {
  const old = await modelReward(UNKNOWN_YET_BASE_URL);
  const log = old.tabId !== tabId ? [rec] : [...old.log, rec]

  return await modelReward(UNKNOWN_YET_BASE_URL, { log, tabId });
}

modelReward.remove = async function removeRewardRecord(baseUrl) {
  const cached = await cache(ModelTypes.REWARD, { id: baseUrl });
  await cached.clear();
}

modelReward.removeAffilRecord = async function removeAffilRecord() {
  await modelReward.remove(UNKNOWN_YET_BASE_URL);
}
