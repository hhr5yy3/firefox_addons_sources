import React from '../npm/dom-chef.js';
import { isRepo } from '../npm/github-url-detection.js';
import IssueOpenedIcon from '../npm/octicons-plain-react-components-IssueOpened.js';
import { expectElement } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import { isArchivedRepoAsync, buildRepoURL, getRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';

const labelId = 'rgh-quick-new-issue';

function add(listItem) {
	const newIssueItem = listItem.cloneNode(true);

	const link = expectElement('a', newIssueItem);
	const label = expectElement('[id="' + link.getAttribute('aria-labelledby').trim() + '"]', newIssueItem);
	link.setAttribute('aria-labelledby', labelId);
	label.id = labelId;

	link.href = buildRepoURL('issues/new/choose');
	label.textContent = `New issue in ${getRepo()?.name}`;

	expectElement('svg', newIssueItem).replaceWith(React.createElement(IssueOpenedIcon, null ));

	listItem.parentElement.append(newIssueItem);

	const separator = expectElement('[data-component="ActionList.Divider"]', listItem.parentElement).cloneNode(true);
	newIssueItem.before(separator);
}

async function init(signal) {
	observe('li:has(>a[href="/new/import"])', add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepo,
	],
	exclude: [
		isArchivedRepoAsync,
	],
	init,
});

/*

Test URLs:

Repo home:
https://github.com/fregante/webext-storage-cache

Wiki, template picker:
https://github.com/refined-github/refined-github/wiki

Archived repo (feature disabled):
https://github.com/fregante/iphone-inline-video

*/
