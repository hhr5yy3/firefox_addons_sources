var rtccNMPort = undefined;

// Messages from webpage to extension
window.addEventListener('message', function (event) {
	if (event.source != window) {
		return;
	}

	if(rtccNMPort == undefined) {
		rtccNMPort = browser.runtime.connect();
		// Messages from extension to webpage
		rtccNMPort.onMessage.addListener(function (event) {
			window.postMessage(event, '*');
		});
	}
	rtccNMPort.postMessage(event.data);
});

  

