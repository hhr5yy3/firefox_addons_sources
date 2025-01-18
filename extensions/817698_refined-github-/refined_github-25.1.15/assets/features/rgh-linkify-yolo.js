import React from '../npm/dom-chef.js';
import { isSingleFile } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { isRefinedGitHubYoloRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import { createRghIssueLink, getFeatureUrl } from '../helpers/rgh-links.js';

function linkifyIssue(issueCell) {
	// Linkify with hovercards
	issueCell.replaceChildren(createRghIssueLink(issueCell.textContent));
}

function linkifyFeature(issueCell) {
	const url = getFeatureUrl(issueCell.textContent );
	issueCell.replaceChildren(
		React.createElement('code', null
, React.createElement('a', { className: "d-inline-block", href: url,}
, issueCell.firstChild
)
),
	);
}

function init(signal) {
	// .js-csv-data is the old selector
	observe(':is(.js-csv-data, .react-csv-row) td:nth-child(2)', linkifyFeature, {signal});
	observe(':is(.js-csv-data, .react-csv-row) td:nth-child(3)', linkifyIssue, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isRefinedGitHubYoloRepo,
		isSingleFile,
		() => location.pathname.endsWith('broken-features.csv'),
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/yolo/blob/main/broken-features.csv

*/
