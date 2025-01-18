// This is the Firefox extension.
// Listener event created via "browser.runtime.sendMessage".
browser.runtime.onMessage.addListener(callPlugin);

function callPlugin(request) {
    return browser.runtime.sendNativeMessage('com.paygate.messaging', request)
        .then(response => {
            if (browser.runtime.lastError) {
                return "ERROR: " + browser.runtime.lastError.message;
            } else {
                return response;
            }
        })
        .catch(error => console.log(error));
}
