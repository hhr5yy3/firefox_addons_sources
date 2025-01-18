chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == 'protocol_request') {}
	if (request.action == 'setup_request') {}	
});