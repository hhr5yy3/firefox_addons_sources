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
    var createContextMenu = function(data) {
        chrome.contextMenus.create(data);
    };
    var createContextMenus = function(data) {
        for (var idx = 0; idx < data.length; idx++) {
            createContextMenu(data[idx]);
        }
    };
    var createTab = function(url) {
        chrome.tabs.create({
            url: url
        });
    };
    var addContextMenuListener = function(listener) {
        chrome.contextMenus.onClicked.addListener(listener);
    };
    var getFeatureUrl = function(urls, feature, locale) {
        if (!urls.hasOwnProperty(feature)) {
            return "";
        }
        var featureUrls = urls[feature];
        if (typeof locale === "undefined") {
            locale = DEFAULT_LOCALE;
        }
        if (!featureUrls.hasOwnProperty(locale)) {
            locale = DEFAULT_LOCALE;
        }
        return featureUrls[locale];
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
    var SUPPORTED_LOCALES = [ "en", "ar", "de", "es", "fr", "pt", "ru", "vi", "hi", "zh", "id", "it" ];
    var locale = getSimplifiedLocale(SUPPORTED_LOCALES);
    var urls = {
        cloud: {
            en: "https://www.pdf2go.com/cloud",
            es: "https://www.pdf2go.com/es/cloud",
            fr: "https://www.pdf2go.com/fr/cloud",
            de: "https://www.pdf2go.com/de/cloud",
            zh: "https://www.pdf2go.com/zh/cloud",
            ru: "https://www.pdf2go.com/ru/cloud",
            ar: "https://www.pdf2go.com/ar/cloud",
            hi: "https://www.pdf2go.com/hi/cloud",
            id: "https://www.pdf2go.com/id/cloud",
            it: "https://www.pdf2go.com/it/cloud",
            pt: "https://www.pdf2go.com/pt/cloud",
            vi: "https://www.pdf2go.com/vi/cloud"
        },
        convertTo: {
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
        edit: {
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
        }
    };
    createContextMenus([ {
        id: "pdf2go-image",
        title: getTranslation("convert_image_to_pdf"),
        contexts: [ "image" ]
    }, {
        id: "pdf2go-link",
        title: getTranslation("convert_link_to_pdf"),
        contexts: [ "link" ]
    }, {
        id: "pdf2go-page",
        title: getTranslation("convert_page_to_pdf"),
        contexts: [ "page", "link", "image" ]
    }, {
        id: "pdf2go-pdf",
        title: getTranslation("edit_pdf"),
        contexts: [ "link" ],
        targetUrlPatterns: [ "http://*/*.pdf", "https://*/*.pdf" ]
    }, {
        id: "pdf2go-openpdf",
        title: getTranslation("open_pdf_tools"),
        contexts: [ "link" ],
        targetUrlPatterns: [ "http://*/*.pdf", "https://*/*.pdf" ]
    } ]);
    var listener = function(info, tab) {
        var menuId = info.menuItemId;
        var baseUrl;
        var urlParam;
        var statsParam = isFirefox() ? "app=extension_firefox" : "app=extension_chrome";
        if (menuId.startsWith("pdf2go-page")) {
            baseUrl = getFeatureUrl(urls, "convertTo", locale);
            urlParam = "remote_url=" + encodeURIComponent(info.pageUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith("pdf2go-image")) {
            baseUrl = getFeatureUrl(urls, "convertTo", locale);
            urlParam = "remote_url=" + encodeURIComponent(info.srcUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith("pdf2go-link")) {
            baseUrl = getFeatureUrl(urls, "convertTo", locale);
            urlParam = "remote_url=" + encodeURIComponent(info.linkUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith("pdf2go-pdf")) {
            baseUrl = getFeatureUrl(urls, "edit", locale);
            urlParam = "remote_url=" + encodeURIComponent(info.linkUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith("pdf2go-openpdf")) {
            baseUrl = getFeatureUrl(urls, "cloud", locale);
            urlParam = "remote_url=" + encodeURIComponent(info.linkUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
    };
    addContextMenuListener(listener);
})();