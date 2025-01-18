//	Name:			notificationbanner.js
//	Description:	Main UI notification banner logic
//	Author:			Sean O'Sullivan

// DEBUG: To manually set the extensionVersion value to something older use
// the following on the DevTools console:
// chrome.storage.sync.set({ 'extensionVersion': '3.0' });


// Obtain the current version of Centro 365 from the manifest

const manifestData = chrome.runtime.getManifest();
const extensionVersion = manifestData.version;

// Check the version and decide whether to show the notification banner

chrome.storage.sync.get(['extensionVersion'], function(result) {
	const storedVersion = result.extensionVersion;

	if (!storedVersion || storedVersion < extensionVersion) {
		// Show notification banner
		document.getElementById('container_flex_notificationbanner').style.display = 'flex';
		//console.info('Stored Version:', storedVersion);
		//console.info('Extension Version:', extensionVersion);
		//console.info('Show the notification banner');
	} else {
		// Hide notification banner
		document.getElementById('container_flex_notificationbanner').style.display = 'none';
		//console.info('Stored Version:', storedVersion);
		//console.info('Extension Version:', extensionVersion);
		//console.info('Keep the notification banner hidden');
	}
});

// Update the version number in storage when the user dismisses the banner, so it doesn't show again for this version

document.getElementById('container_flex_notificationbanner_right').addEventListener('click', function() {
	// Save extension version to chrome.storage.sync
	chrome.storage.sync.set({ 'extensionVersion': extensionVersion });
	console.info('Extension Version updated to:', extensionVersion);

	// Hide notification banner
	console.info('Hide the notification banner');
	document.getElementById('container_flex_notificationbanner').style.display = 'none';
});
