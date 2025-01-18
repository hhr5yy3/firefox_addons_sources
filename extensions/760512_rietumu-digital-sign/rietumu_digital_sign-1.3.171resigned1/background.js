browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var processResponse = function(response) {
		if ("error" != typeof response && 'VERSION' == request.type) {
			sendResponse({
				data: {
					host: response && response.data ? response.data : undefined,
					extension: browser.runtime.getManifest().version
				}
			});
		}
		else {
			sendResponse(response);
		}
	};
	browser.runtime.sendNativeMessage(
		'com.rietumu.plugin',
		request
	).then(processResponse, processResponse)//processResponse will be called even in case of error;
	return true;
});
