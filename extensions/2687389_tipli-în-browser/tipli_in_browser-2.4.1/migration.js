import { DEFAULT_LOCALE } from './environment.js';
import { notEmptyObject } from './library.js';
import { DomainMatchTypes } from './types.js';

const storageKeysToMigrate = ['options', 'feedUpdate', 'domain', 'pages'];
const oneHour = () => Date.now() + 1 * 60 * 60 * 1000;

export const migratePreferences = (preferences) => new Promise(resolve => {
  const migrate = ({ pages = [], options = {} }) => ({
    locale: options.domain === 'cz' ? 'cs' : options.domain || DEFAULT_LOCALE,
    blacklistedDomains: pages.map(p => ({
      urlBase: p.domain,
      matchType: DomainMatchTypes.STARTS_WITH,
      closeContentBoxTill: p.animateAt ? oneHour() : null,
      closeContentBox: p.hiddenUntil > 0 ? true : null
    })),
    scanGoogle: options.displayingSearchCashbackLink === false ? false : true,
    scanHeureka: options.displayingSearchCashbackLink === false ? false : true,
    scanZbozi: options.displayingSearchCashbackLink === false ? false : true,
    scanSeznam: options.displayingSearchCashbackLink === false ? false : true,
  });

  browser.storage.local.get(storageKeysToMigrate, async ({ pages, ...backup }) => {
    const relevantPages = Object.values(pages || {}).filter((p) => (
      (p.animateAt && (new Date(p.animateAt - oneHour()).getTime() > oneHour()))
      || p.hiddenUntil
    ));

    if (relevantPages.length) {
      backup.pages = relevantPages;
    }

    if (notEmptyObject(backup)) {
      const migrated = migrate(backup);
      console.log('Migrate...', { backup, migrated });
      resolve({ ...migrated, backup, migratedAt: Date.now() });
    } else {
      resolve(preferences)
    }
  })
});
