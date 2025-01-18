'use strict'

const isFirefox = () => {
	if (
		typeof browser === 'object' &&
		typeof browser.runtime === 'object' &&
		typeof browser.runtime.getManifest === 'function'
	) {
		return browser
	}
}

const isChromium = () => {
	if (
		typeof chrome === 'object' &&
		typeof chrome.runtime === 'object' &&
		typeof chrome.runtime.getManifest === 'function'
	) {
		return chrome
	}
}

const extensionApi = isFirefox() || isChromium() || 'Cannot find extensionApi under namespace "browser" or "chrome"'
