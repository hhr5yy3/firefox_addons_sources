
if (browser.runtime.onMessageExternal){ // TODO: support it in FF

    browser.runtime.onMessageExternal.addListener(function (request, sender, sendResponse)
    {
        if (sender.url.toLowerCase().indexOf("http://files2.freedownloadmanager.org") == -1)
            return;
        if (request == "uninstall")
        {
            browser.management.uninstallSelf();
        }
    });
}

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
    if (window.browserName !== "Firefox") return;
    switch (reason) {
        case "install":
        {
            const url = browser.runtime.getURL("installed.html");
            await browser.tabs.create({ url });
        }
        break;
    }
});

var fdmext = new FdmExtension;
fdmext.initialize();
