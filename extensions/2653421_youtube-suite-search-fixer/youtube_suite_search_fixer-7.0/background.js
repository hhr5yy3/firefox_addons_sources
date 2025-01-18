browser.runtime.onInstalled.addListener(onInstalledNotification);

function onInstalledNotification(details) {
    if (details.reason == "install") {
        browser.tabs.create({
            url: "/options.html",
            active: false
        });
    }
}
