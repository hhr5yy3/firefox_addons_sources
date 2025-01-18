/**
 * Environment variables, imagine this file as a dot file.
 *  `extension/environment.js` is ignored Hard Link
 *
 * Use `npm run env:prod` or `npm run env:local` to use environment you need.
 */

export const LOCALE_TIPLI_URL = {
  cs: 'https://www.tipli.cz',
  sk: 'https://www.tipli.sk',
  pl: 'https://www.tipli.pl',
  ro: 'https://www.tipli.ro',
  hu: 'https://www.tiplino.hu',
};

export const API_PATH = '/api/v2/addon';

export const DEFAULT_LOCALE = 'ro';

export const TIPLI_AFFIL_SLUGS = {
  'cs': '/prejit',
  'sk': '/prejst',
  'pl': '/przejsc',
  'ro': '/redirectioneaza',
  'hu': '/atteres',
};

export const TIPLI_INSTALLED_SLUGS = {
  'cs': '/instalace-doplnku',
  'sk': '/instalacia-doplnku',
  'pl': '/pobierz-wtyczke',
  'ro': '/instalarea-suplimentelor',
  'hu': '/kiegeszito-telepitese',
};
