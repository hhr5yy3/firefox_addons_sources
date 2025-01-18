var Browser = (function createBrowser() {
    D.func();

    function isFirefox() {
        return window.navigator.userAgent.toLowerCase().indexOf("firefox/") > -1;
    }

    function isEdge() {
        return window.navigator.userAgent.toLowerCase().indexOf("edg/") > -1;
    }

    function isOpera() {
        return window.navigator.userAgent.toLowerCase().indexOf("opr/") > -1;
    }

    function isYandex() {
        return window.navigator.userAgent.toLowerCase().indexOf("yabrowser/") > -1;
    }

    function getBadgeRedColor() {
        if (isFirefox()) {
            return "#F55A47";
        }
        return "#E63B2E";
    }

    function getRateUrl() {
        if (isFirefox()) {
            return "https://addons.mozilla.org/firefox/addon/safe-in-cloud/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search";
        }
        if (isOpera() || isYandex()) {
            return "https://addons.opera.com/extensions/details/safeincloud-password-manager/";
        }
        if (isEdge()) {
            return "https://microsoftedge.microsoft.com/addons/detail/safeincloud-password-mana/bfilcmnckjfhldbbkaeofghnhpbehipd?hl";
        }
        return "https://chrome.google.com/webstore/detail/safeincloud-password-mana/lchdigjbcmdgcfeijpfkpadacbijihjl";
    }

    function getBrowser() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        // Firefox
        if (userAgent.includes("firefox/")) {
            return "Firefox " + getBrowserVersion("firefox/");
        }
        // Edge
        if (userAgent.includes("edg/")) {
            return "Edge " + getBrowserVersion("edg/");
        }
        // Opera
        if (userAgent.includes("opr/")) {
            return "Opera " + getBrowserVersion("opr/");
        }
        // Yandex
        if (userAgent.includes("yabrowser/")) {
            return "Yandex " + getBrowserVersion("yabrowser/");
        }
        // Chrome
        if (userAgent.includes("chrome/")) {
            return "Chrome " + getBrowserVersion("chrome/");
        }
        return null;
    }

    function getBrowserVersion(browser) {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return userAgent.substring(userAgent.indexOf(browser) + browser.length).split(' ')[0];;
    }

    return {
        canConfigureShortcuts: function() {
            return !isFirefox();
        },

        getShortcutsUrl: function() {
            if (isOpera()) {
                return "opera://settings/keyboardShortcuts";
            }
            if (isEdge()) {
                return "edge://extensions/shortcuts";
            }
            return "chrome://extensions/configureCommands";
        },

        getContextMenuContexts: function() {
            return isFirefox() ? ["all"] : ["editable"];
        },

        supportAlerts: function() {
            return !isFirefox();
        },

        getBadgeRedColor: function() {
            return getBadgeRedColor();
        },

        getRateUrl: function() {
            return getRateUrl();
        },

        getBrowser: function() {
            return getBrowser();
        }
    };
})();