!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/utils"));
    } else {
        factory(global.utils);
        global.startup = {};
    }
}(this, function(_utils) {
    "use strict";
    browser.runtime.onInstalled.addListener(function allowAnalytics(details) {
        (0, _utils.storageGet)("analytics").then(function(data) {
            if (!data || !data.analytics) {
                browser.tabs.create({
                    url: browser.runtime.getURL("html/opt-in.html")
                });
            }
        });
    });
});