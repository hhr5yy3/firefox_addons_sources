import React from '../npm/dom-chef.js';
import { replaceFieldText } from '../npm/text-field-edit.js';
import { isCompare } from '../npm/github-url-detection.js';
import { linkifyUrlsToDom } from '../npm/linkify-urls.js';
import shortenRepoUrl from '../npm/shorten-repo-url.js';
import features from '../feature-manager.js';
import { isRefinedGitHubRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';

function extract(textarea) {
	replaceFieldText(textarea, /<!--(.+)-->\n/s, (_, match) => {
		textarea.closest('tab-container').before(
			React.createElement('div', { style: {whiteSpace: 'pre-wrap'}, className: "flash mb-3 p-3"  ,}
, linkifyUrlsToDom(match.trim(), {value: url => shortenRepoUrl(url, location.href)})
),
		);

		return '';
	});
}

function init(signal) {
	observe('#pull_request_body', extract, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isRefinedGitHubRepo,
		isCompare,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/compare/main...sandbox/keep-branch?quick_pull=1

*/
