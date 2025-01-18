browser.runtime.onInstalled.addListener(function () {
    browser.tabs.create({ url: "https://volumebooster.io" });
});
browser.runtime.setUninstallURL("https://volumebooster.io/feedback/");
