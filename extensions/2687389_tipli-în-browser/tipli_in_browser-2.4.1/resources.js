import locales from './localization.js';

export function initLocalization(locale) {
  const texts = locales[locale];
  return (key, defaultValue = '') => (texts && texts[key]) || defaultValue || key;
}
