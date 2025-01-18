browser.pageAction.onClicked.addListener(function(tab) {
    browser.tabs.printPreview();
});

browser.commands.onCommand.addListener(function(command) {
    if (command == "print-preview") {
        browser.tabs.printPreview();
        }
});