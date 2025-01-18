import { $$ } from '../npm/select-dom.js';
import { isIssueOrPRList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { openIssueToLastComment } from '../github-helpers/selectors.js';

function init() {
	for (const link of $$(openIssueToLastComment)) {
		link.hash = '#issue-comment-box';
	}
}

void features.add(import.meta.url, {
	include: [
		isIssueOrPRList,
	],
	awaitDomReady: true,
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/labels/bug

*/
