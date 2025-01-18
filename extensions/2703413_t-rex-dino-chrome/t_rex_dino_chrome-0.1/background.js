chrome.browserAction.onClicked.addListener(function(tab) {
    openOrFocusOptionsPage();
})

function openOrFocusOptionsPage() {
    var optionsUrl = chrome.extension.getURL('option.html');
	chrome.tabs.create({url: "option.html"});
	/*
    chrome.tabs.query({}, function(extensionTabs) {
        var found = false;
        for (var i=0; i < extensionTabs.length; i++) {
            if (optionsUrl === extensionTabs[i].url) {
                found = true;
                console.log("tab id: " + extensionTabs[i].id);
                chrome.tabs.update(extensionTabs[i].id, {"selected": true});
            }
        }
        if (found === false) {
            chrome.tabs.create({url: "option.html"});
        }
    });*/
}
