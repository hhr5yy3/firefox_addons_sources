var Strings = (function createStrings() {
    D.func();

    function getWebsiteLanguage() {
        const language = chrome.i18n.getUILanguage();
        if (language === "ru") {
            return language;
        }
        return "en";
    }

    return {
        get: function(id) {
            return id ? chrome.i18n.getMessage(id) : id;
        },

        getWebsiteLanguage: function() {
            return getWebsiteLanguage();
        }
    };
})();