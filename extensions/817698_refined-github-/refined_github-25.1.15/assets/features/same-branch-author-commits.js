import { $$ } from '../npm/select-dom.js';
import { isRepoCommitList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

const authorLinkSelector = 'a[aria-label^="commits by"]';

function init() {
	for (const author of $$(authorLinkSelector)) {
		author.pathname = location.pathname;
	}
}

void features.add(import.meta.url, {
	include: [
		isRepoCommitList,
	],
	awaitDomReady: true, // Small page
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/commits/branch/with/slashes/
https://github.com/refined-github/sandbox/commits/new/.github

*/
