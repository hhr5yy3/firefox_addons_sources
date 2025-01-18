import React from '../npm/dom-chef.js';
import { isQuickPR } from '../npm/github-url-detection.js';
import { expectElement, $$, $ } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import { buildRepoURL } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';

function linkifyQuickPR(element) {
	const branchUrl = buildRepoURL('tree', element.textContent);
	element.replaceWith(
		React.createElement('span', { className: "commit-ref",}
, React.createElement('a', { className: "no-underline", href: branchUrl, 'data-turbo-frame': "repo-content-turbo-frame",}
, element.textContent
)
),
	);
}

function linkifyHovercard(hovercard) {
	const {href} = expectElement('a.Link--primary', hovercard);

	for (const reference of $$('.commit-ref', hovercard)) {
		const url = new GitHubFileURL(href).assign({
			route: 'tree',
			branch: reference.title,
		});

		const user = $('.user', reference);
		if (user) {
			url.user = user.textContent;
		}

		reference.replaceChildren(
			React.createElement('a', { className: "no-underline", href: url.href, 'data-turbo-frame': "repo-content-turbo-frame",}
, [...reference.childNodes]
),
		);
	}
}

async function quickPRInit(signal) {
	observe('.branch-name', linkifyQuickPR, {signal});
}

function hovercardInit(signal) {
	observe('[data-hydro-view*="pull-request-hovercard-hover"] ~ .d-flex.mt-2', linkifyHovercard, {signal});
}

void features.add(import.meta.url, {
	include: [
		isQuickPR,
	],
	init: quickPRInit,
}, {
	init: hovercardInit,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/compare/default-a...quick-pr-branch?quick_pull=1
https://github.com ("Recent activity" box in left sidebar, hover a PR)

*/
