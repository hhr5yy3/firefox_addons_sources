function _browser() {
    if (typeof browser !== 'undefined') {
        return browser;
    } else {
        return chrome;
    }
}

function setBadgeText(soundVolume) {
    if (100 === soundVolume) {
        _browser().browserAction.setBadgeText({text: null});
    } else {
        _browser().browserAction.setBadgeText({text: soundVolume.toString()});
    }
}

function updateBadgeText() {
    sendToActiveTab('getSoundVolume', response => {
        setBadgeText(response && response.soundVolume >= 0 ? response.soundVolume : 100);
    });
}

function sendToActiveTab(action, onResponse) {
    _browser().tabs.query({'currentWindow': true, 'active': true},
        tabs => {
            try{
                if (tabs.length > 0) {
                    _browser().tabs.sendMessage(tabs[0].id, {'action': action},
                        response => {
                            window.lastError = _browser().runtime.lastError;
                            if (onResponse) {
                                onResponse(response);
                            }
                        });
                } else {
                    onResponse(null);
                }
            } catch (e) {
            }
        });
}

setInterval(updateBadgeText, 500);

_browser().webRequest.onHeadersReceived.addListener(
    function (details) {
        try {
            if (details.type === 'media' && details.thirdParty) {
                var found = false;
                for (var i = 0; i < details.responseHeaders.length; ++i) {
                    var header = details.responseHeaders[i]
                    if (header.name.toLowerCase() === 'access-control-allow-origin') {
                        header.value = '*';
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    header = {name: 'Access-Control-Allow-Origin', value: '*'};
                    details.responseHeaders.push(header);
                }
            }
        } catch (err) {}
        return {responseHeaders: details.responseHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "responseHeaders"]
);