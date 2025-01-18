browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: 'extractConversation' });
    });
});