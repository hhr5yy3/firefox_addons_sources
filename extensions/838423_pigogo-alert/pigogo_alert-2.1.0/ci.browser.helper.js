/*
 The script fires event when document is ready
 Using `chrome.tabs.onUpdated` with `status`  == 'complete' fires when document has been loaded completly!
 */
chrome.runtime.sendMessage({
	'name': 'DocumentComplete',
	'url': document.location.href,
	'action': 'ci_browser_DocumentComplete'
});