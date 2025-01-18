import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import { isPRCommit } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

function init() {
	const originalPreviousNext = $('.commit .float-right.ButtonGroup');
	if (!originalPreviousNext) {
		return false;
	}

	// Wrap the button in a <div> to avoid #4503
	expectElement('#files').after(
		React.createElement('div', { className: "d-flex flex-justify-end mb-3"  ,}
, originalPreviousNext.cloneNode(true)
),
	);
}

void features.add(import.meta.url, {
	include: [
		isPRCommit,
	],
	deduplicate: 'has-rgh-inner',
	awaitDomReady: true,
	init,
});

/*
Test URLs:

Condensed commit: https://github.com/refined-github/refined-github/pull/4448/commits/0b8966c918eae11da9fc992368741757088edf08
Regular commit: https://github.com/refined-github/refined-github/pull/5113/commits/5b7282afc40b013f5928271fb6740cf70b4e4295

*/
