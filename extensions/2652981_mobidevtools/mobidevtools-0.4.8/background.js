browser.browserAction.onClicked.addListener((tab) => {
    if (tab) {
        try {
            browser.tabs.sendMessage(tab.id, {
                action: "toggle_devtools"
            }, (response) => {
                if (!response || !response.success) {
                    browser.runtime.lastError.message; // literally just ackknowledge that the call failed so Chrome doesn't log it
                    browser.tabs.executeScript(tab.id, {
                        file: 'mobile-devtools.js'
                    });
                }
            });
        } catch (err) {} // sendMessage will fail in extensions menu, new tab, etc.
    }
});
