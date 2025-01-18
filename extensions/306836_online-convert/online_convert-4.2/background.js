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
    var createTab = function(url) {
        chrome.tabs.create({
            url: url
        });
    };
    var addContextMenuListener = function(listener) {
        chrome.contextMenus.onClicked.addListener(listener);
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
    var createContextMenu = chrome.contextMenus.create;
    var createContextmenus = function(title, baseId, contexts) {
        var baseMenu = createContextMenu({
            id: baseId,
            title: title,
            contexts: contexts
        });
        if (!baseMenu) {
            return;
        }
        var nTargets = targets.length;
        for (var i = 0; i < nTargets; i++) {
            var target = targets[i];
            createContextMenu({
                id: baseId + "-to-" + target,
                parentId: baseMenu,
                title: targetCaption[target],
                contexts: contexts
            });
        }
    };
    var getBaseUrl = function(urls, target, locale) {
        var targetUrls = urls[target];
        if (typeof locale === "undefined") {
            locale = DEFAULT_LOCALE;
        }
        if (!targetUrls.hasOwnProperty(locale)) {
            locale = DEFAULT_LOCALE;
        }
        return targetUrls[locale];
    };
    var SUPPORTED_LOCALES = [ "en", "es", "fr", "ru", "de" ];
    var targets = [ "archive", "audio", "document", "ebook", "hash", "image", "video" ];
    var locale = getSimplifiedLocale(SUPPORTED_LOCALES);
    var targetCaption = {
        archive: getTranslation("archive"),
        audio: getTranslation("audio"),
        document: getTranslation("document"),
        ebook: getTranslation("ebook"),
        hash: getTranslation("hash"),
        image: getTranslation("image"),
        video: getTranslation("video")
    };
    var urls = {
        homepage: {
            en: "https://www.online-convert.com/",
            es: "https://www.online-convert.com/es",
            fr: "https://www.online-convert.com/fr",
            ru: "https://www.online-convert.com/ru",
            de: "https://www.online-convert.com/de"
        },
        archive: {
            en: "https://archive-conversion.online-convert.com/",
            es: "https://archivo-conversion.online-convert.com/es",
            fr: "https://conversion-archives.online-convert.com/fr",
            ru: "https://archive-conversion.online-convert.com/ru",
            de: "https://archiv-umwandlung.online-convert.com/de"
        },
        audio: {
            en: "https://audio-conversion.online-convert.com/",
            es: "https://audio-conversion.online-convert.com/es",
            fr: "https://conversion-audio.online-convert.com/fr",
            ru: "https://audio-conversion.online-convert.com/ru",
            de: "https://audio-umwandlung.online-convert.com/de"
        },
        document: {
            en: "https://document-conversion.online-convert.com/",
            es: "https://documento-conversion.online-convert.com/es",
            fr: "https://conversion-document.online-convert.com/fr",
            ru: "https://document-conversion.online-convert.com/ru",
            de: "https://dokument-umwandlung.online-convert.com/de"
        },
        ebook: {
            en: "https://ebook-conversion.online-convert.com/",
            es: "https://ebook-conversion.online-convert.com/es",
            fr: "https://conversion-ebook.online-convert.com/fr",
            ru: "https://ebook-conversion.online-convert.com/ru",
            de: "https://ebook-umwandlung.online-convert.com/de"
        },
        hash: {
            en: "https://hash-conversion.online-convert.com/",
            es: "https://hash-conversion.online-convert.com/es",
            fr: "https://conversion-cryptage.online-convert.com/fr",
            ru: "https://hash-conversion.online-convert.com/ru",
            de: "https://hash-umwandlung.online-convert.com/de"
        },
        image: {
            en: "https://image-conversion.online-convert.com/",
            es: "https://imagen-conversion.online-convert.com/es",
            fr: "https://conversion-image.online-convert.com/fr",
            ru: "https://image-conversion.online-convert.com/ru",
            de: "https://bild-umwandlung.online-convert.com/de"
        },
        video: {
            en: "https://video-conversion.online-convert.com/",
            es: "https://video-conversion.online-convert.com/es",
            fr: "https://conversion-video.online-convert.com/fr",
            ru: "https://video-conversion.online-convert.com/ru",
            de: "https://video-umwandlung.online-convert.com/de"
        }
    };
    var convertImageTitle = getTranslation("convert_image_to");
    var convertImageBaseId = "online-convert-image";
    var convertImageContexts = [ "image" ];
    createContextmenus(convertImageTitle, convertImageBaseId, convertImageContexts);
    var convertVideoTitle = getTranslation("convert_video_to");
    var convertVideoBaseId = "online-convert-video";
    var convertVideoContexts = [ "video" ];
    createContextmenus(convertVideoTitle, convertVideoBaseId, convertVideoContexts);
    var convertLinkTitle = getTranslation("convert_link_to");
    var convertLinkBaseId = "online-convert-link";
    var convertLinkContexts = [ "link" ];
    createContextmenus(convertLinkTitle, convertLinkBaseId, convertLinkContexts);
    var convertPageTitle = getTranslation("convert_page_to");
    var convertPageBaseId = "online-convert-page";
    var convertPageContexts = [ "page", "link", "image" ];
    createContextmenus(convertPageTitle, convertPageBaseId, convertPageContexts);
    var listener = function(info, tab) {
        var menuId = info.menuItemId;
        var target = menuId.split("-").pop();
        var baseUrl;
        var urlParam;
        var statsParam = isFirefox() ? "app=extension_firefox" : "app=extension_chrome";
        if (menuId.startsWith(convertImageBaseId + "-to-")) {
            baseUrl = getBaseUrl(urls, target, locale);
            urlParam = "external_url=" + encodeURIComponent(info.srcUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith(convertVideoBaseId + "-to-")) {
            baseUrl = getBaseUrl(urls, target, locale);
            urlParam = "external_url=" + encodeURIComponent(info.srcUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith(convertLinkBaseId + "-to-")) {
            baseUrl = getBaseUrl(urls, target, locale);
            urlParam = "external_url=" + encodeURIComponent(info.linkUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
        if (menuId.startsWith(convertPageBaseId + "-to-")) {
            baseUrl = getBaseUrl(urls, target, locale);
            urlParam = "external_url=" + encodeURIComponent(info.pageUrl);
            createTab(baseUrl + "?" + statsParam + "&" + urlParam);
        }
    };
    addContextMenuListener(listener);
})();