browser.runtime.onMessage.addListener(onContentScriptMessage);
var port = browser.runtime.connectNative('com.dataverse.docutrackssigner');

function onContentScriptMessage(request, sender, sendResponse) {
    if (navigator.platform.indexOf('Mac') >= 0) {
        port = browser.runtime.connectNative('com.dataverse.docutrackssigner');
    }
    if (port.onMessage.hasListener(onPortMessage)) {
        port.onMessage.removeListener(onPortMessage);
    }
    port.onMessage.addListener(onPortMessage);

    if (request.messageType === 'signFileHashIndex') {
        request.tabId = sender.tab.id || {};
        port.postMessage(request);
    }

    if (request.messageType === 'getAddonVersion') {
        request.tabId = sender.tab.id || {};
        request.version = browser.runtime.getManifest().version;
        browser.tabs.sendMessage(request.tabId, request);
    }
}

function onPortMessage(response) {
    console.info('got response from host', response);
    if (response.messageType === 'signFileHostResult' && response.tabId) {
        browser.tabs.sendMessage(response.tabId, response);
    }
}