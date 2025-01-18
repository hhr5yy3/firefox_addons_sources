import React from '../npm/dom-chef.js';
import { elementExists, expectElement } from '../npm/select-dom.js';
import { isCompare } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { wrapAll } from '../helpers/dom-utils.js';

function init() {
	const changedFilesSummary = expectElement('.Box li:has(.octicon-file-diff)');
	wrapAll(
		React.createElement('a', { className: "no-underline rgh-link-to-compare-diff" , href: "#files_bucket",} ),
		...changedFilesSummary.children,
	);
}

void features.add(import.meta.url, {
	include: [
		isCompare,
	],
	exclude: [
		() => elementExists('.tabnav'), // The commit list and compare diff are in two separate tabs
	],
	deduplicate: 'has-rgh-inner',
	awaitDomReady: true, // DOM-based filter
	init,
});

/*

Test URLs:

Separate tabs: https://github.com/refined-github/sandbox/compare/buncha-files...default-a
One view: https://github.com/refined-github/sandbox/compare/default-a...buncha-files

*/
