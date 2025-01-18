(function() {
    "use strict";
    var DEFAULT_LOCALE = "en";
    var getUiLanguage = function() {
        try {
            if (typeof chrome.i18n.getUILanguage !== "function") {
                return DEFAULT_LOCALE;
            }
        } catch (e) {
            return DEFAULT_LOCALE;
        }
        return chrome.i18n.getUILanguage();
    };
    var getSimplifiedLocale = function(supportedLocales) {
        var locale = getUiLanguage();
        locale = locale.toLowerCase();
        locale = locale.split("-")[0];
        locale = locale.split("_")[0];
        if (typeof supportedLocales === "undefined") {
            return locale;
        }
        for (var i = 0; i < supportedLocales.length; i++) {
            if (supportedLocales[i] === locale) {
                return locale;
            }
        }
        return DEFAULT_LOCALE;
    };
    var getTranslation = function(key) {
        var translation = chrome.i18n.getMessage(key);
        if (typeof translation === "string" && translation !== "") {
            return translation;
        }
        return null;
    };
    function isFirefox() {
        try {
            var url = browser.runtime.getURL("/");
            url = url.toLowerCase().trim();
            var start = url.substr(0, 13);
            return start === "moz-extension";
        } catch (e) {}
        return false;
    }
    function isChrome() {
        return !isFirefox();
    }
    var translateInner = function() {
        var elements = document.querySelectorAll(".translate-inner");
        var count = elements.length;
        for (var i = 0; i < count; i++) {
            var el = elements[i];
            var key = el.innerText;
            var translation = getTranslation(key);
            if (typeof translation === "string") {
                el.innerText = translation;
            }
        }
    };
    var translateTitle = function() {
        var elements = document.querySelectorAll(".translate-title");
        var count = elements.length;
        for (var i = 0; i < count; i++) {
            var el = elements[i];
            var key = el.title;
            var translation = getTranslation(key);
            if (typeof translation === "string") {
                el.title = translation;
            }
        }
    };
    var translateUrls = function(allUrls) {
        var locale = getSimplifiedLocale();
        var linkElements = document.querySelectorAll(".translate-url");
        var numberOfElements = linkElements.length;
        for (var i = 0; i < numberOfElements; i++) {
            var link = linkElements[i];
            var keyUrl = link.getAttribute("href");
            keyUrl = keyUrl.toLowerCase().trim();
            var translatedUrl = keyUrl;
            try {
                translatedUrl = allUrls[keyUrl][locale];
            } catch (e) {}
            if (typeof translatedUrl === "string") {
                if (isChrome()) {
                    translatedUrl += "?app=extension_chrome";
                } else if (isFirefox()) {
                    translatedUrl += "?app=extension_firefox";
                }
                link.setAttribute("href", translatedUrl);
            }
        }
    };
    var urls = {
        "https://www.pdf2go.com/edit-pdf": {
            en: "https://www.pdf2go.com/edit-pdf",
            ar: "https://www.pdf2go.com/ar/edit-pdf",
            de: "https://www.pdf2go.com/de/seite-bearbeiten",
            es: "https://www.pdf2go.com/es/editar-pdf",
            fr: "https://www.pdf2go.com/fr/editer-pdf",
            pt: "https://www.pdf2go.com/pt/editar-pdf",
            ru: "https://www.pdf2go.com/ru/edit-pdf",
            vi: "https://www.pdf2go.com/vi/edit-pdf",
            hi: "https://www.pdf2go.com/hi/edit-pdf",
            zh: "https://www.pdf2go.com/zh/edit-pdf",
            id: "https://www.pdf2go.com/id/edit-pdf",
            it: "https://www.pdf2go.com/it/modificare-pdf"
        },
        "https://www.pdf2go.com/compress-pdf": {
            en: "https://www.pdf2go.com/compress-pdf",
            ar: "https://www.pdf2go.com/ar/compress-pdf",
            de: "https://www.pdf2go.com/de/pdf-verkleinern",
            es: "https://www.pdf2go.com/es/comprimir-pdf",
            fr: "https://www.pdf2go.com/fr/compresser-pdf",
            pt: "https://www.pdf2go.com/pt/compactar-pdf",
            ru: "https://www.pdf2go.com/ru/compress-pdf",
            vi: "https://www.pdf2go.com/vi/compress-pdf",
            hi: "https://www.pdf2go.com/hi/compress-pdf",
            zh: "https://www.pdf2go.com/zh/compress-pdf",
            id: "https://www.pdf2go.com/id/kompres-pdf",
            it: "https://www.pdf2go.com/it/comprimere-pdf"
        },
        "https://www.pdf2go.com/convert-to-pdf": {
            en: "https://www.pdf2go.com/convert-to-pdf",
            ar: "https://www.pdf2go.com/ar/convert-to-pdf",
            de: "https://www.pdf2go.com/de/konvertiere-zu-pdf",
            es: "https://www.pdf2go.com/es/convertir-a-pdf",
            fr: "https://www.pdf2go.com/fr/convertir-en-pdf",
            pt: "https://www.pdf2go.com/pt/convert-para-pdf",
            ru: "https://www.pdf2go.com/ru/convert-to-pdf",
            vi: "https://www.pdf2go.com/vi/convert-to-pdf",
            hi: "https://www.pdf2go.com/hi/convert-to-pdf",
            zh: "https://www.pdf2go.com/zh/convert-to-pdf",
            id: "https://www.pdf2go.com/id/convert-ke-pdf",
            it: "https://www.pdf2go.com/it/convertitore-pdf"
        },
        "https://www.pdf2go.com/convert-from-pdf": {
            en: "https://www.pdf2go.com/convert-from-pdf",
            ar: "https://www.pdf2go.com/ar/convert-from-pdf",
            de: "https://www.pdf2go.com/de/pdf-umwandeln",
            es: "https://www.pdf2go.com/es/convertir-de-pdf",
            fr: "https://www.pdf2go.com/fr/convertir-de-pdf",
            pt: "https://www.pdf2go.com/pt/converter-de-pdf",
            ru: "https://www.pdf2go.com/ru/convert-from-pdf",
            vi: "https://www.pdf2go.com/vi/convert-from-pdf",
            hi: "https://www.pdf2go.com/hi/convert-from-pdf",
            zh: "https://www.pdf2go.com/zh/convert-from-pdf",
            id: "https://www.pdf2go.com/id/konversi-dari-pdf",
            it: "https://www.pdf2go.com/it/converti-da-pdf"
        },
        "https://www.pdf2go.com/merge-pdf": {
            en: "https://www.pdf2go.com/merge-pdf",
            ar: "https://www.pdf2go.com/ar/merge-pdf",
            de: "https://www.pdf2go.com/de/pdf-zusammenfuegen",
            es: "https://www.pdf2go.com/es/fusionar-pdf",
            fr: "https://www.pdf2go.com/fr/fusionner-pdf",
            pt: "https://www.pdf2go.com/pt/unir-pdf",
            ru: "https://www.pdf2go.com/ru/merge-pdf",
            vi: "https://www.pdf2go.com/vi/merge-pdf",
            hi: "https://www.pdf2go.com/hi/merge-pdf",
            zh: "https://www.pdf2go.com/zh/merge-pdf",
            id: "https://www.pdf2go.com/id/gabungkan-pdf",
            it: "https://www.pdf2go.com/it/unire-pdf"
        },
        "https://www.pdf2go.com/split-pdf": {
            en: "https://www.pdf2go.com/split-pdf",
            ar: "https://www.pdf2go.com/ar/split-pdf",
            de: "https://www.pdf2go.com/de/pdf-teilen",
            es: "https://www.pdf2go.com/es/dividir-pdf",
            fr: "https://www.pdf2go.com/fr/scinder-pdf",
            pt: "https://www.pdf2go.com/pt/dividir-pdf",
            ru: "https://www.pdf2go.com/ru/split-pdf",
            vi: "https://www.pdf2go.com/vi/split-pdf",
            hi: "https://www.pdf2go.com/hi/split-pdf",
            zh: "https://www.pdf2go.com/zh/split-pdf",
            id: "https://www.pdf2go.com/id/pecahkan-pdf",
            it: "https://www.pdf2go.com/it/dividere-pdf"
        },
        "https://www.pdf2go.com/sort-delete-pdf": {
            en: "https://www.pdf2go.com/sort-delete-pdf",
            ar: "https://www.pdf2go.com/ar/sort-delete-pdf",
            de: "https://www.pdf2go.com/de/sortieren-loeschen",
            es: "https://www.pdf2go.com/es/ordenar-eliminar-pdf",
            fr: "https://www.pdf2go.com/fr/trier-supprimer-pdf",
            pt: "https://www.pdf2go.com/pt/ordenar-excluir-pdf",
            ru: "https://www.pdf2go.com/ru/sort-delete-pdf",
            vi: "https://www.pdf2go.com/vi/sort-delete-pdf",
            hi: "https://www.pdf2go.com/hi/sort-delete-pdf",
            zh: "https://www.pdf2go.com/zh/sort-delete-pdf",
            id: "https://www.pdf2go.com/id/sortir-hapus-pdf",
            it: "https://www.pdf2go.com/it/riordinare-eliminare-pdf"
        },
        "https://www.pdf2go.com/rotate-pdf": {
            en: "https://www.pdf2go.com/rotate-pdf",
            ar: "https://www.pdf2go.com/ar/rotate-pdf",
            de: "https://www.pdf2go.com/de/pdf-drehen",
            es: "https://www.pdf2go.com/es/rotar-pdf",
            fr: "https://www.pdf2go.com/fr/fairepivoter-pdf",
            pt: "https://www.pdf2go.com/pt/girar-pdf",
            ru: "https://www.pdf2go.com/ru/rotate-pdf",
            vi: "https://www.pdf2go.com/vi/rotate-pdf",
            hi: "https://www.pdf2go.com/hi/rotate-pdf",
            zh: "https://www.pdf2go.com/zh/rotate-pdf",
            id: "https://www.pdf2go.com/id/putar-pdf",
            it: "https://www.pdf2go.com/it/ruotare-pdf"
        }
    };
    translateInner();
    translateTitle();
    translateUrls(urls);
})();