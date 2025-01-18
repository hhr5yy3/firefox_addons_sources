import { $ } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isPRFiles, isPRFile404 } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

function jumpToFirstNonViewed() {
	const firstNonViewedFile = $('[id][data-details-container-group="file"]:not([data-file-user-viewed])');
	if (firstNonViewedFile) {
		// Scroll to file without pushing to history
		location.replace('#' + firstNonViewedFile.id);
	} else {
		// The file hasn't loaded yet, so make GitHub load it by scrolling to the bottom
		window.scrollTo(window.scrollX, document.body.scrollHeight);
	}
}

const selector = '.diffbar-item progress-bar';
async function init(signal) {
	const bar = await elementReady(selector);
	bar.style.cursor = 'pointer';
	delegate(selector, 'click', jumpToFirstNonViewed, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
	],
	exclude: [
		isPRFile404,
	],
	init,
});

/*

Test URLs:

PR: https://github.com/refined-github/sandbox/pull/55/files
Large PR https://github.com/pixiebrix/pixiebrix-extension/pull/6808/files

*/
