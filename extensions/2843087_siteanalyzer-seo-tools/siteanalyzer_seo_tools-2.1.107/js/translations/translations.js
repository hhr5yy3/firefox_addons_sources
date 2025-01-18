const defaultLocale = "ru";
var locale = defaultLocale;
var translations = {};

function setLocale(newLocale) {
  locale = newLocale;
  api.storage.local.set({ locale: newLocale }).then(() => {
    document.dispatchEvent(new CustomEvent("languageChanged"));
  });
}

function translate(token) {
  return (translations[locale] && translations[locale][token]) || token;
}

/**
 * @param {HTMLElement} element
 * @returns {HTMLElement}
 */
function translateElement(element) {
  const translatedItems = element.querySelectorAll("[data-translation]");
  translatedItems.forEach((item) => {
    item.innerHTML = translate(item.getAttribute("data-translation"));
  });

  const translatedTitles = element.querySelectorAll("[data-translated-title]");
  translatedTitles.forEach((item) =>
    item.setAttribute(
      "title",
      translate(item.getAttribute("data-translated-title"))
    )
  );
  const translatedPlaceholders = element.querySelectorAll("[data-translated-placeholder]");
  translatedPlaceholders.forEach((item) =>
    item.setAttribute(
      "placeholder",
      translate(item.getAttribute("data-translated-placeholder"))
    )
  );

  return element;
}

function translateAll() {
  const translatedItems = document.querySelectorAll("[data-translation]");
  translatedItems.forEach(
    (item) =>
      (item.innerHTML = translate(item.getAttribute("data-translation")))
  );
  const translatedTitles = document.querySelectorAll("[data-translated-title]");
  translatedTitles.forEach((item) =>
    item.setAttribute(
      "title",
      translate(item.getAttribute("data-translated-title"))
    )
  );
  const translatedPlaceholders = document.querySelectorAll("[data-translated-placeholder]");
  translatedPlaceholders.forEach((item) =>
    item.setAttribute(
      "placeholder",
      translate(item.getAttribute("data-translated-placeholder"))
    )
  );
}

/**
 * @param {string} code
 * @returns {string}
 */
function normalizeLanguageCode(code) {
  return code?.substring(0, 2);
}

function isLocaleSupported(locale) {
  if (!locale) return false;
  return !!translations[locale];
}

document.addEventListener("DOMContentLoaded", () => {
  api.storage.local.get("locale").then(({ locale }) => {
    const normalizedLocale = normalizeLanguageCode(locale);
    if (normalizedLocale && isLocaleSupported(normalizedLocale)) {
      setLocale(normalizedLocale);
      return;
    }

    const browserLocale = normalizeLanguageCode(navigator.language);
    setLocale(browserLocale || defaultLocale);
  });
});

document.addEventListener("languageChanged", () => {
  api.storage.local.get("locale").then(() => {
    translateAll();
  });
});
