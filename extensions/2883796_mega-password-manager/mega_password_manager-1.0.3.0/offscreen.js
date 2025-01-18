// Worker channel
var workers = Object.create(null);
var clipboardTime = 30;
var clipboardElm = document.querySelector('#clipboard-area');
var megaSendMsg = async(message) => {
    'use strict';
    await chrome.runtime.sendMessage({type: 'alive'});

    return chrome.runtime.sendMessage(message);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    "use strict";

    // Reject all messages not coming from the extension
    if (sender.id !== chrome.runtime.id) {
        return false;
    }

    if (message.type === 'createWorker') {
        workers[message.index] = new Worker(message.scriptUrl);

        workers[message.index].onmessage = function(e) {
            chrome.runtime.sendMessage({type: 'workerResult', data: e.data, index: message.index});
        };
        workers[message.index].onerror = function(error) {
            chrome.runtime.sendMessage({type: 'workerError', data: error, index: message.index});
        };
    }
    else if (message.type === 'workerPostMessage') {
        workers[message.index].postMessage(message.data);
    }
    else if (message.type === 'terminateWorker' && workers[message.index]) {
        workers[message.index].terminate();
    }
    else if (message.type === 'clipboard-time') {
        clipboardTime = Number(message.value);
        if (clipboardTime === 10000) {
            clipboardTime = 0;
        }
    }
    else if (message.type === 'clipboard') {
        const {data} = message;
        try {
            // Error if we received the wrong kind of data.
            if (typeof data !== 'string') {
                throw new TypeError(
                    `Value provided must be a 'string', got '${typeof data}'.`
                );
            }

            clipboardElm.value = data;
            clipboardElm.select();
            document.execCommand('copy');
            document.execCommand('delete');

            if (clipboardTime) {
                setTimeout(() => {
                    clipboardElm.value = ' ';
                    clipboardElm.select();
                    document.execCommand('copy');
                }, clipboardTime * 1000);
            }
            sendResponse({success: true});
        }
        catch (ex) {
            sendResponse({error: ex});
        }
    }
    else if (message.type === 'detect-icon-theme') {
        var matchMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        megaSendMsg({type: 'change-icon-theme', theme: matchMediaQuery.matches ? 'dark' : 'light'});
    }
});

window.addEventListener('online', () => {
    "use strict";

    megaSendMsg({type: 'connection-on'});
});
window.addEventListener('offline', () => {
    "use strict";

    megaSendMsg({type: 'connection-off'});
});
