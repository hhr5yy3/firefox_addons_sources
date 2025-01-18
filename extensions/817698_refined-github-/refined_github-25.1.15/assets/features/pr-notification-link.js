import { isNotifications } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

const regex = /\/files\/[\da-f]{40}..[\da-f]{40}$/;

function removeLinkToPRFilesTab(link) {
	if (regex.test(link.pathname)) {
		link.pathname = link.pathname.replace(regex, '');
		link.hash = '#issue-comment-box';
	}
}

function init(signal) {
	// It's ok if it's not 100% safe because trimLink's regex is super specific
	observe('[href*="/pull/"][href*="/files/"][href*=".."]', removeLinkToPRFilesTab, {signal});
}

void features.add(import.meta.url, {
	include: [
		isNotifications,
	],
	init,
});

/*

Test URL:

https://github.com/notifications

*/

export { removeLinkToPRFilesTab };
