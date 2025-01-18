window.addEventListener('signFileHash', onSignFileHash);
window.addEventListener('getAddonVersionResponse', onGetAddonVersionResponse);
browser.runtime.onMessage.addListener(backgroundScriptOnMessage);


function onSignFileHash(event) {
    var parameters = event.detail;
    parameters.messageType = 'signFileHashIndex';
    browser.runtime.sendMessage(parameters);
}

function onGetAddonVersionResponse(event) {
    if ($('#addonProperties').length == 0) {
        var $newdiv1 = $("<div id='addonProperties'><div id='addonPropertiesVersion' value='" + event.detail
            + "'/></div>");
        $newdiv1.height(0);
        $('body').append($newdiv1);
    } else {
        if ($('#addonProperties #addonPropertiesVersion').length == 0) {
            $('#addonProperties').append("<div id='addonPropertiesVersion' value='" + event.detail + "'/>");
        } else {
            $('#addonProperties #addonPropertiesVersion').attr('value', event.detail);
        }
    }
}

function backgroundScriptOnMessage(request, sender, sendResponse) {
    var event;
    if (request.messageType === 'signFileHostResult' && request.hash) {
        event = {};
        if (request.hash == 'CANCEL') {
            event = new CustomEvent('signFileHashCancel', { bubbles: true, detail: request.hash });
        } else {
            event = new CustomEvent('signFileHashResDone', { bubbles: true, detail: request.hash });
        }
        document.documentElement.dispatchEvent(event);
    }
    if (request.messageType === 'getAddonVersion' && request.version) {
        event = new CustomEvent('getAddonVersionResponse', { bubbles: true, detail: request.version });
        document.documentElement.dispatchEvent(event);
    }
}

var addonProperties = document.getElementById('addonProperties');
if (!addonProperties) {
    var parameters = {};
    parameters.messageType = 'getAddonVersion';
    browser.runtime.sendMessage(parameters);
}