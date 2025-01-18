function getBrowserName() {
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera
		|| navigator.userAgent.indexOf(' OPR/') >= 0;
	if (isOpera) {
		return 'opera';
	}
	var isFirefox = typeof InstallTrigger !== 'undefined';
	if (isFirefox) {
		return 'firefox';
	}
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	if (isIE) {
		return 'ie';
	}
	var isEdge = !isIE && !!window.StyleMedia;
	if (isEdge) {
		return 'edge';
	}
	var isChrome = !isOpera && !isFirefox && !isIE && !isEdge;
	if (isChrome) {
		return 'chrome';
	}

	return 'unknown';
}

function getBrowser() {
	var currBrowser = window.msBrowser ||
		window.browser ||
		window.chrome || undefined;

	if (currBrowser != null) {
		return currBrowser;
	}

	if (typeof browser !== 'undefined') {
		return browser;
	}

	if (typeof chrome !== 'undefined') {
		return chrome;
	}
}

// setIcon wrapper (browser compat)
function setIcon(icon) {
	var browser = getBrowser();
	switch (getBrowserName()) {
		case 'chrome':
			return new Promise(function (resolve, reject) {
				browser.browserAction.setIcon(icon, function () {
					if (browser.runtime.lastError) {
						reject(new Error(browser.runtime.lastError.message));

						return;
					}

					resolve();
				});
			});
		case 'firefox':
			return browser.browserAction.setIcon(icon);
		case 'edge':
		default:
			console.error((new Date()).toISOString(), 'background::setIcon: not yet implemented for ' + getBrowserName());
	}
}

// handles messages from extension to native app
function messageHandler(port) {
	port.native = getBrowser().runtime.connectNative('com.cafi.certificate.a3');
	port.native.onDisconnect.addListener(function () {
		delete port.native;
		port.disconnect();
	});
	port.native.onMessage.addListener(function (message) {
		if (message.sender && message.sender == 'native') {
			message.sender = 'extension';
			port.postMessage(message);
		}
	});
	// proxies extension messages (content.js) to the native app
	port.onMessage.addListener(function (message) {
		if (!port.native) {
			port.postMessage(
				{
					id: message.id,
					error: 'Native App disconnected',
					sender: 'extension'
				}
			);

			return;
		}
		port.native.postMessage(message);
	});
	port.onDisconnect.addListener(function () {
		if (port.native) {
			port.native.disconnect();
			delete port.native;
		}
	});
}

function requestNativeApplication(request, sendResponseCallback) {
	var hostName = "com.cafi.certificate.a3";
	getBrowser().runtime.sendNativeMessage(hostName, request, function (response) {
		sendResponseCallback(response);
	});
	return true;
}

function pageActionAboutIcon(request, sender) {
	var tabId = sender.tab.id;
	var browser = getBrowser();
	if (sender.id !== browser.runtime.id && sender.extensionId !== browser.runtime.id) {
		return;
	}
	switch (request) {
		case 'show':
			setIcon({
				path: {
					16: browser.extension.getURL('icons/icon-16.png')
				},
				tabId: sender.tab.id
			});
			sendResponse({ 'event': 'iconEnabled' });
			break;
		case 'hide':
			setIcon({
				path: {
					16: browser.extension.getURL('icons/disabled.png')
				},
				tabId: sender.tab.id
			});
			sendResponse({ 'event': 'iconDisabled' });
			break;
	}
}
getBrowser().runtime.onMessage.addListener(function (request, sender, sendResponseCallback) {
	if (request.method) {
		requestNativeApplication(request, sendResponseCallback);
	} else {
		pageActionAboutIcon(request, sender);
	}
	return true;
});