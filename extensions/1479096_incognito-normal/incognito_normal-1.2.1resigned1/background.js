browser.browserAction.onClicked.addListener((tab) => {
    createNewTabInOppositeMode(tab.url, tab.incognito);
    browser.tabs.remove(tab.id);
});

var openLinkInc = () => {
        browser.contextMenus.create({
            id: "incognitoornot",
            title: "Open Link in Incognito/Normal Window",
            contexts: ["link"],
            onclick: openLink
        });
    },
    txtIncognito = () => {
        browser.contextMenus.create({
            title: "Search text in Incognito/Normal Window",
            contexts: ["selection"],
            onclick: openSearch
        });
    },
    openSearch = (info, tab) => {
        createNewTabInOppositeMode("https://www.google.com/search?q=" + encodeURIComponent(info.selectionText), tab.incognito);
    },
    openLink = (info, tab) => {
        createNewTabInOppositeMode(info.linkUrl, tab.incognito);
    },
    createNewTabInOppositeMode = (url, incognito) => {
        browser.windows.getAll({
            windowTypes: ["normal"]
        }, windows => {
            for (var i = 0; i < windows.length; i++) {
                if (windows[i].incognito != incognito) {
                    browser.tabs.create({
                        windowId: windows[i].id,
                        url: url,
                        active: true
                    });
                    return;
                }
            }
            browser.windows.create({
                url: url,
                incognito: !incognito
            });
        })
    }

browser.runtime.getPlatformInfo(info => {
    if (info.os === 'android') {
        return false;
    } else {
        openLinkInc();
        txtIncognito();
    };
});
