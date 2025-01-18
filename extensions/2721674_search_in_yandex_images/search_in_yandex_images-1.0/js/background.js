"use strict";

function matchPattern(source, regex) {
    let match = null;
    return isString(source) && (match = source.match(regex)), match && match[1];
}

function updateMenuURL(srcURL) {
    imageUrl = srcURL || "", browsi.contextMenus.update("search-picture", {
        contexts: srcURL ? [ "all" ] : [ "browser_action" ]
    });
}

const browsi = window.browser ? browser : chrome, helper = {
    "search-picture": url => `https://yandex.ru/images/search?url=${encodeURIComponent(url)}&rpt=imageview`
};

browsi.contextMenus.create({
    id: "search-picture",
    title: browsi.i18n.getMessage("findImageIn"),
    contexts: [ "browser_action" ],
    documentUrlPatterns: [ "*://*/*" ]
});

let imageUrl = "";

browsi.contextMenus.onClicked.addListener((info, tab) => {
    let getLink = helper[info.menuItemId];
    getLink && browsi.tabs.create({
        url: getLink(imageUrl),
        index: tab.index + 1,
        openerTabId: tab.id
    });    

});

const isString = s => "string" == typeof s || s instanceof String;

browsi.tabs.onActivated.addListener(activeInfo => {
    updateMenuURL("");
}), browsi.runtime.onMessage.addListener((req, sender, res) => {
    "updateMenu" === req.action && updateMenuURL(matchPattern(req.url, /url\(["'](https?.+)["']\)/));
});