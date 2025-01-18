function getExtensionId() {
    var extensionId = "";
    try {
        extensionId = chrome.runtime.id;
    }
    catch (err) {
        console.log("error while getting chromestore id");
    }
    return extensionId;
}



function getNewTabThemeUrl() {
    return chrome.runtime.getURL('html/homepage.html');
}