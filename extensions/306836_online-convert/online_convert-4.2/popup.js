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
        "https://audio.online-convert.com/": {
            en: "https://audio.online-convert.com/",
            es: "https://audio.online-convert.com/es",
            fr: "https://audio.online-convert.com/fr",
            ru: "https://audio.online-convert.com/ru",
            de: "https://audio.online-convert.com/de"
        },
        "https://video.online-convert.com/": {
            en: "https://video.online-convert.com/",
            es: "https://video.online-convert.com/es",
            fr: "https://video.online-convert.com/fr",
            ru: "https://video.online-convert.com/ru",
            de: "https://video.online-convert.com/de"
        },
        "https://image.online-convert.com/": {
            en: "https://image.online-convert.com/",
            es: "https://imagen.online-convert.com/es",
            fr: "https://image.online-convert.com/fr",
            ru: "https://image.online-convert.com/ru",
            de: "https://bild.online-convert.com/de"
        },
        "https://document.online-convert.com/": {
            en: "https://document.online-convert.com/",
            es: "https://documento.online-convert.com/es",
            fr: "https://document.online-convert.com/fr",
            ru: "https://document.online-convert.com/ru",
            de: "https://dokument.online-convert.com/de"
        },
        "https://ebook.online-convert.com/": {
            en: "https://ebook.online-convert.com/",
            es: "https://ebook.online-convert.com/es",
            fr: "https://ebook.online-convert.com/fr",
            ru: "https://ebook.online-convert.com/ru",
            de: "https://ebook.online-convert.com/de"
        },
        "https://archive.online-convert.com/": {
            en: "https://archive.online-convert.com/",
            es: "https://archivo.online-convert.com/es",
            fr: "https://archives.online-convert.com/fr",
            ru: "https://archive.online-convert.com/ru",
            de: "https://archiv.online-convert.com/de"
        },
        "https://webservice.online-convert.com/": {
            en: "https://webservice.online-convert.com/",
            es: "https://servicios-web.online-convert.com/es",
            fr: "https://serviceweb.online-convert.com/fr",
            ru: "https://webservice.online-convert.com/ru",
            de: "https://webservice.online-convert.com/de"
        },
        "https://hash.online-convert.com/": {
            en: "https://hash.online-convert.com/",
            es: "https://hash.online-convert.com/es",
            fr: "https://cryptage.online-convert.com/fr",
            ru: "https://hash.online-convert.com/ru",
            de: "https://hash.online-convert.com/de"
        }
    };
    translateInner();
    translateTitle();
    translateUrls(urls);
})();