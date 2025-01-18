try {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            var res = {};
            switch (request.task) {
                case valueMap.requestKeys.getId: {
                    sendResponse({id: getExtensionId()});
                    break;
                }
            }
        });
} catch (err) {
}


function closePage(id) {
    setTimeout(() =>
        chrome.tabs.remove(id), 100);
}

try {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            var resp = {};
            switch (request.task) {
                case valueMap.requestKeys.storageChecker: {
                    resp.status = "install";
                    break;
                }
            }
            sendResponse(resp);
        });
} catch (err) {
}

function sendDataToDomainPages(messageObject) {
    try {
        chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                try {
                    chrome.tabs.sendMessage(tabs[i].id, messageObject, function (response) {});
                } catch (e) {
                    console.log("error in message communication", e);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}


