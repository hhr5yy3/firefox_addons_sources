chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.action) {

        case 'changeCountItems':
            chrome.browserAction.setBadgeText({text: request.count.toString()});
            break;

    }
});

chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.create({
        url: 'https://wordstat.yandex.ru'
    });
});