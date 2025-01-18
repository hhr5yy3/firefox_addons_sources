import { expectElement, elementExists } from '../npm/select-dom.js';
import { isPRFiles, isClosedConversation } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { getBranches } from '../github-helpers/pr-branches.js';
import observe from '../helpers/selector-observer.js';

/** Rebuilds the "View file" link because it points to the base repo and to the commit, instead of the head repo and its branch */
function alter(viewFileLink) {
	const {nameWithOwner, branch} = getBranches().head;
	const filePath = viewFileLink.closest('[data-path]').getAttribute('data-path');

	// Do not replace with `GitHubFileURL` #3152 #3111 #2595
	viewFileLink.pathname = [nameWithOwner, 'blob', branch, filePath].join('/');
}

function init(signal) {
	observe('.file-header:not([data-file-deleted="true"]) a.dropdown-item[data-ga-click^="View file"]', alter, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
	],
	exclude: [
		// Editing files doesn't make sense after a PR is closed/merged
		isClosedConversation,
		() => expectElement('.head-ref').title === 'This repository has been deleted',
		// If you're viewing changes from partial commits, ensure you're on the latest one.
		() => elementExists('.js-commits-filtered') && !elementExists('[aria-label="You are viewing the latest commit"]'),
	],
	awaitDomReady: true, // DOM-based filters, feature is invisible and inactive until dropdown is opened
	init,
});

/*

Test URLs

https://github.com/refined-github/sandbox/pull/4/files

*/
