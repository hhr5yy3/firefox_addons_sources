chrome.runtime.onConnect.addListener(function (externalPort) {
	externalPort.onMessage.addListener((msg) => {
		if (msg === 'tick') {
			externalPort.postMessage('save');
		}
	});
});