import { $ } from '../npm/select-dom.js';
import { isIssueOrPRList, isMilestone } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

function init() {
	// TODO: Drop feature in January 2025
	$('.subnav-search')?.setAttribute('autocomplete', 'off');
}

void features.add(import.meta.url, {
	include: [
		isIssueOrPRList,
	],
	exclude: [
		isMilestone,
	],
	awaitDomReady: true, // Not urgent
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/issues
https://github.com/refined-github/refined-github/pulls

*/
