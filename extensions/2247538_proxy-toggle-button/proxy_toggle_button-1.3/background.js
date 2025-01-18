var privateAllowed;

function updateIcon() {
	browser.proxy.settings.get({}).then(function(fetched) {
		let newSetting = fetched.value;
		if (newSetting.proxyType === "system") {
			// Icon off
			browser.browserAction.setIcon({
				"path": {
					"32": "proxy_off-32.png",
					"64": "Proxy_off-64.png"
				}
			});
			browser.browserAction.setTitle({
				"title": "Turn on proxy"
			});
		}
		else {
			// Icon on
			browser.browserAction.setIcon({
				"path": {
					"32": "proxy_on-32.png",
					"64": "proxy_on-64.png"
				}
			});
			browser.browserAction.setTitle({
				"title": "Turn off proxy"
			});
		}
	});
}

function toggleProxy() {
	if (privateAllowed) {
		browser.proxy.settings.get({}).then(function(fetched) {
			let newSetting = fetched.value;
			if (newSetting.proxyType === "system") {
				// Turn on
				newSetting.proxyType = "manual"
				browser.proxy.settings.set({
					"value": newSetting
				});
			}
			else {
				// Turn off
				newSetting.proxyType = "system";
				browser.proxy.settings.set({
					"value": newSetting
				});
			}
			// Update icon state, will change if succeeded
			updateIcon();
		});
	}
	// User needs to allow in private windows for addon to work
	else {
		// Show message telling user how to fix settings
		browser.browserAction.setPopup({
			"popup": "popup.html"
		});
		browser.browserAction.openPopup();
		browser.browserAction.setPopup({
			"popup": ""
		});
	}
}

/* When the addon starts, reset the setting state
 * If another addon has changed the proxy state, it will take effect
 * Otherwise, the setting will revert to the user base setting.
 * See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/types/BrowserSetting/set
 * NOTE: If debugging as a temporary addon, it will reset to the default value (off), rather than the user-set one */
browser.proxy.settings.clear({}).then(function(){
	// Update the icon to the current proxy state when the extension first starts
	updateIcon();
});

// Toggle on button click
browser.browserAction.onClicked.addListener(toggleProxy);

// Get Private Windows setting for this addon. Must be allowed in Private Windows to set proxy settings in FF 67+.
/* Implementation for user message is convoluted because FF only allows to open popup on "user action".
Getting value of FF settings is async, which no longer counts as "user action" So... solution is to 
check Private Window (PW) setting at start (Changing PW context runs the code again). */
browser.extension.isAllowedIncognitoAccess().then(function(value) {
	privateAllowed = value;
});