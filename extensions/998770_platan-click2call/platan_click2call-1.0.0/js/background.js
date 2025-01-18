browser.storage.local.get(['extensionEnabled'], function (data) {
    if (!data.hasOwnProperty('extensionEnabled')) {
        browser.storage.local.set({
            'extensionEnabled': true
        });
    }
});

browser.storage.local.get(['usedClient', 'userExtension', 'serverUrl'], function (data) {
    if (!data.hasOwnProperty('usedClient')) {
        browser.storage.local.set({
            'usedClient': "cti",
        });
    }
    if (!data.hasOwnProperty('userExtension')) {
        browser.storage.local.set({
            'userExtension': "",
        });
    }
    if (!data.hasOwnProperty('serverUrl')) {
        browser.storage.local.set({
            'serverUrl': "",
        });
    }
});

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.showNotify == true) {	
		browser.notifications.create("callmonitor_notify", {
			"type": "basic",
			"iconUrl": browser.extension.getURL("images/icon64x64.png"),
			"title": "Click2Call",
			"message": request.message
		});	
    }
});

browser.contextMenus.create({
    id: "platan_call_dial",
    title: "Wybierz: %s",
    contexts: ["selection"]
});

browser.contextMenus.create({
    id: "platan_call_selection",
    title: "Edytuj w Platan WebDialer",
    contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    let calleeNumber;

    if (!info.selectionText) return;
    
    var regex = /\d/g;
    if (regex.test(info.selectionText)) {
        calleeNumber = info.selectionText.replace(/[a-zA-Z]+/g, '').replace(/[^0-9\+\,]/g, '');
    } else {
        calleeNumber = "Nie zaznaczono numeru";
    }

    if (info.menuItemId == "platan_call_selection") {
        browser.storage.local.set({
            "inputNumber": calleeNumber
        });
        browser.browserAction.openPopup();
    }

    if (info.menuItemId == "platan_call_dial") {
        callTo(calleeNumber);
    }
});
