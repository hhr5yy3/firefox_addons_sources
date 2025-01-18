import { load, cache, } from './index.js';
import { notEmptyObject, deepmerge } from '../library.js';
import { ModelTypes } from '../types.js';

const inOneHour = () => Date.now() + 1 * 60 * 60 * 1000;

export default async function modelPage(meta, url, payload = null) {
  const { url: urlBase } = meta; // Using baseUrl as key to store under
  const cached = await cache(ModelTypes.PAGE, { id: urlBase });
  const source = `/page?url=${encodeURIComponent(url || urlBase)}${meta.id ? `&id=${meta.id}` : ''}`;
  const method = 'POST';
  const loaded = (cached.isEmpty || cached.isExpired) ? await load(source, { payload, method }) : null;

  // Update stored data
  if (loaded) {
    const extended = deepmerge(loaded, payload);
    await cached.update(extended, { expiresAt: inOneHour() });
  }

  // Request resolved using cache but still has payload that should be delivered
  if (!cached.isEmpty && notEmptyObject(payload) && !loaded) {
    const fresh = await load(source, { method, payload });
    const extended = deepmerge(fresh, payload);
    await cached.update(extended, { expiresAt: inOneHour() });
  }

  return cached.data;
}

modelPage.refreshed = async function freshModelPage(meta, url = '') {
  const cached = await cache(ModelTypes.PAGE, { id: meta.url });
  await cached.expire();
  return await modelPage(meta, url);
}
