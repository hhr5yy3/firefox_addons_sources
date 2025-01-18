var port = null;
function handleResponse(message) {
    console.log(`background script sent a response: ${message.response}`);
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

function getBrowserName() {
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera
        || navigator.userAgent.indexOf(' OPR/') >= 0;

    if (isOpera) {
        return 'opera';
    }

    var isFirefox = typeof InstallTrigger !== 'undefined';

    if (isFirefox) {
        return 'firefox';
    }

    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {
        return 'ie';
    }
    var isEdge = !isIE && !!window.StyleMedia;
    if (isEdge) {
        return 'edge';
    }
    var isChrome = !isOpera && !isFirefox && !isIE && !isEdge;

    if (isChrome) {
        return 'chrome';
    }

    return 'unknown';
}
function getBrowser() {
    var currBrowser = window.msBrowser ||
        window.browser ||
        window.chrome || undefined;

    if (currBrowser != null) {
        return currBrowser;
    }

    if (typeof browser !== 'undefined') {
        return browser;
    }

    if (typeof chrome !== 'undefined') {
        return chrome;
    }

    console.error('getBrowser() returns undefined!');
    return undefined;
}

function sendMessage(message, sender) {
    var browser = getBrowser();
    switch (getBrowserName()) {
        case 'firefox':
            return browser.runtime.sendMessage(sender);
        case 'chrome':
            return new Promise(function (resolve, reject) {
                browser.runtime.sendMessage(message, function (response) {
                    if (response == null) {
                        reject(new Error(browser.runtime.lastError.message));

                        return;
                    }

                    resolve(response);
                });
            });
        case 'edge':
        default:
            console.error((new Date()).toISOString(), 'sendMessage: not yet implemented for ' + getBrowserName());
    }
}

function messageHandler(event) {
    if (event.source !== window) {
        return;
    }
    if (event.data.sender && event.data.sender == 'sdk') {
        if (!port) {
            if (getBrowser() == undefined) {
                return;
            }
            sendMessage('cafi@cafi.com.br', 'show');
            sendMessage('cafi@cafi.com.br', event.data).then(function (response) {
                window.postMessage({
                    id: '*',
                    data: response.data,
                    sender: 'rest'
                }, '*');

                sendMessage('cafi@cafi.com.br', 'hide');
            });
            port = getBrowser().runtime.connect({ name: "cafi@cafi.com.br" });
            port.onMessage.addListener(function (message, sender) {
                if (message.sender && message.sender == 'extension') {
                    window.postMessage(message, '*');
                }
            });
            port.onDisconnect.addListener(function () {
                port = null;
                window.postMessage(
                    {
                        id: '*',
                        error: 'Native App disconnected',
                        sender: 'extension'
                    },
                    '*'
                );
            });
        }
        event.data.sender = 'extension';
        event.data.origin = window.location.origin;
        port.postMessage(event.data);
    }
}

var scriptList = document.getElementsByTagName('script'),
    mustInject = false;
if (!mustInject) {
    window.addEventListener('message', messageHandler, false);
    var script = document.createElement('script');
    script.src = chrome.extension.getURL('cert.js');
    (document.head || document.documentElement).appendChild(script);
}
