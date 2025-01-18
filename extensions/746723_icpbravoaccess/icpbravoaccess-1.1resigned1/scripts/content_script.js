
/*
 * Content Scripts: are JavaScript files that run in the context of web pages. By using the standard Document Object Model (DOM), 
 * they can read details of the web pages the browser visits, or make changes to them.
 */

/*
 *  - Long-lived connections to have a conversation that lasts longer than a single request and response.
 *  https://developer.chrome.com/extensions/messaging
 *  https://developer.chrome.com/extensions/content_scripts
 *  - Creating and triggering events
 *  https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
 *  - Can a site invoke a browser extension? 
 *  http://stackoverflow.com/a/10527809/2004555
 */


//Long-lived connections
var portMPName = 'com.scytl.icpbravoaccess.MP';
var requestEventName = 'com.scytl.icpbravoaccess.request';
var responseEventName = 'com.scytl.icpbravoaccess.response';

var port = null;

var browser = [
    "Default",
    "IE",
    "Chrome",
    "Firefox"
]

// On Receive message from browser
function onReceiveMessage(request) {
    //if the port is closed 		
    if (port == null) {
        port = chrome.runtime.connect({ name: portMPName });
        port.onMessage.addListener(onResponseMessage);
        //port.onDisconnect.addListener(onResponseMessage);
    }
    //post message to extension
    port.postMessage(request);
}

// On Respond message from browser
function onResponseMessage(response) {

    var currentBrowser = browser[response.browser];

    if (currentBrowser === browser[3] && (typeof response.IsExtension === 'undefined' || !response.IsExtension)) {
        var cloned = cloneInto(response, document.defaultView);
        var customEvent = new CustomEvent(responseEventName, { bubbles: true, detail: cloned });
        document.documentElement.dispatchEvent(customEvent);
    } else {
        //var cloned = cloneInto(response, document.defaultView);
        //var customEvent = new CustomEvent(responseEventName, { bubbles: true, detail: cloned });
        //document.documentElement.dispatchEvent(customEvent);
        var customEvent = new CustomEvent(responseEventName, { 'detail': response });
        document.dispatchEvent(customEvent);
    }

}

function browserInfo() {
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};

//init method
function onLoad() {
    registerExtensionId();

    document.addEventListener(requestEventName, function (request) {
        onReceiveMessage(request.detail);
    });
}

//https://developer.chrome.com/webstore/inline_installation
//Checking if an item is already installed 
function registerExtensionId() {
    var isInstalledNode = document.createElement('div');
    isInstalledNode.id = 'icpbravoaccess_loaded';
    document.body.appendChild(isInstalledNode);
}

onLoad();
