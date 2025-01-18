chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == 'apply-export-data') {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			    chrome.tabs.executeScript(tabs[0].id, {file: 'scripts/libs/jquery-3.6.0.min.js', runAt: 'document_end'}, function () {
				    chrome.tabs.executeScript(tabs[0].id, {file: 'scripts/content-script.js', runAt: 'document_end'}, function () {
				    	chrome.tabs.sendMessage(tabs[0].id, request);
				    });
			    });
			});
		}

		return true;
	}
);

