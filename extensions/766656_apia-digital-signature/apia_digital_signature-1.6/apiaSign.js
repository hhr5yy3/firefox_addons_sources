/**
 * JS for Apia Digital Signature Extension
 */

var lastSignResponse = false;

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
	if(request.action == 'sign') {
		
		lastSignResponse = null;
		
		var port = browser.runtime.connectNative('com.apia.sign.firefox');
		var tabId = sender.tab.id;
		
		port.onMessage.addListener(function(response) {
			if(!lastSignResponse)
				lastSignResponse = {
					result: 'ok',
					message: response.text,
					appletTokenId: response.appletTokenId,
					status: response.status
				};
		});
		port.onDisconnect.addListener(function() {
			if(!lastSignResponse)
				lastSignResponse = {
					result: 'error',
					message: browser.runtime.lastError
				};
		});

		port.postMessage(request.params);
		
	} else if(request.action == 'check') {
		
		sendResponse(lastSignResponse);
	}
});