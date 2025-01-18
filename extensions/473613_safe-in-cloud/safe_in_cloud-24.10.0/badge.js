var Badge = (function createBadge() {
    D.func();

    var _tabs = {};

    var _activeTabId = null;
    const UPDATE_TIMEOUT = 250;
    const MAX_ATTEMPT_COUNT = 3;

    // listen tab to activate
    chrome.tabs.onActivated.addListener(function onActivated(tab) {
        if (Settings.isShowNumberOfCards()) {
            D.func(tab.tabId);
            _activeTabId = tab.tabId;
            if (getTab(_activeTabId).badge) {
                setBadgeText();
            } else {
                clearBadge();
                getUrl(_activeTabId, 0);
            }
        }
    });

    // listen to close
    chrome.tabs.onRemoved.addListener(function onRemoved(tabId) {
        D.func();
        clearTab(tabId);
        if (tabId === _activeTabId) {
            clearBadge();
        }
    });

    // listen tab to update
    chrome.tabs.onUpdated.addListener(function onUpdated(tabId) {
        if (Settings.isShowNumberOfCards()) {
            D.func(tabId);
            _activeTabId = tabId;
            getUrl(_activeTabId, 0);
        }
    });

    function startUpdateTimer(tabId) {
        D.func();
        if (getTab(tabId).updateTimer) {
            clearTimeout(getTab(tabId).updateTimer);
        }
        getTab(tabId).updateTimer = setTimeout(onUpdateTimeout, UPDATE_TIMEOUT, tabId);
    }

    function onUpdateTimeout(tabId) {
        D.func();
        getTab(tabId).updateTimer = null;
        updateTab(tabId);
    }

    function getUrl(tabId, attempt) {
        chrome.tabs.sendMessage(tabId, {
            target: "geturl.js"
        }, function onGetUrl(response) {
            D.func();
            if (tabId == _activeTabId) {
                if (response) {
                    if (getTab(tabId).url === response.url) {
                        startUpdateTimer(tabId);
                    } else {
                        getTab(tabId).url = response.url;
                        updateTab(tabId);
                    }
                } else {
                    clearBadge();
                    if (attempt < MAX_ATTEMPT_COUNT) {
                        setTimeout(() => { getUrl(tabId, ++attempt); }, 750);
                    }
                }
            }
        });
    }

    function updateTab(tabId) {
        D.func(tabId);
        getCount(tabId);
        hasCardForm(tabId);
    }

    function hasCardForm(tabId) {
        D.func(tabId);
        // detect card form
        chrome.tabs.sendMessage(tabId, {
            target: "hascardform.js",
            tabId: tabId
        });
    }

    function onHasCardFormResponse(tabId, response) {
        D.func(tabId);
        if (response) {
            getTab(tabId).hasCardForm = response.hasCardForm;
            setBadge(tabId);
        }
    }

    function setBadge(tabId) {
        D.func(tabId);
        if (getTab(tabId).hasCardForm) {
            setCardBage(tabId);
        } else if (getTab(tabId).count) {
            setCountBadge(tabId, getTab(tabId).count);
        }
    }

    function setCardBage(tabId) {
        D.func(tabId);
        const GREEN_COLOR = "#009900";
        getTab(tabId).badge = { text: "💳", color: GREEN_COLOR };
        if (tabId === _activeTabId) {
            setBadgeText();
        }
    }

    function getCount(tabId) {
        D.func(tabId);
        if (isGetCountSupported()) {
            Client.getCount(getTab(tabId).url, function onGetCount(response) {
                D.func();
                if (response.success) {
                    getTab(tabId).count = response.count;
                }
                setBadge(tabId);
            });
        }
    }

    function setCountBadge(tabId, count) {
        D.func(tabId);
        const redColor = Browser.getBadgeRedColor();
        getTab(tabId).badge = { text: count.toString(), color: redColor };
        if (tabId === _activeTabId) {
            setBadgeText();
        }
    }

    function isGetCountSupported() {
        return Settings.getVersion() >= 10;
    }

    function setBadgeText() {
        D.func(getTab(_activeTabId).badge.text);
        if (getTab(_activeTabId).badge.text === "0") {
            clearBadge();
        } else {
            chrome.browserAction.setBadgeBackgroundColor({ color: getTab(_activeTabId).badge.color });
            chrome.browserAction.setBadgeText({ text: getTab(_activeTabId).badge.text });
        }
    }

    function clearBadge() {
        D.func();
        chrome.browserAction.setBadgeText({ text: "" });
    }

    function clearTab(tabId) {
        D.func();
        clearTimeout(getTab(tabId).updateTimer);
        _tabs[tabId] = null;
    }

    function getTab(tabId) {
        if (!_tabs[tabId]) {
            _tabs[tabId] = {};
        }
        return _tabs[tabId];
    }

    return {
        onHasCardFormResponse: function(tabId, response) {
            onHasCardFormResponse(tabId, response);
        }
    };

})();