import React from '../npm/dom-chef.js';
import { $$ } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import elementReady from '../npm/element-ready.js';
import { isGlobalIssueOrPRList, isIssueOrPRList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import openTabs from '../helpers/open-tabs.js';
import observe from '../helpers/selector-observer.js';

const issueListSelector = isGlobalIssueOrPRList()
	? '#js-issues-toolbar div'
	: 'div[aria-label="Issues"][role="group"]';

function onButtonClick(event) {
	const onlySelected = event.delegateTarget.closest('.table-list-triage')
		? ':has(:checked)'
		: '';

	const issueSelector = `${issueListSelector} .js-issue-row${onlySelected} a.js-navigation-open`;

	const urls = $$(issueSelector ).map(issue => issue.href);
	void openTabs(urls);
}

async function hasMoreThanOneConversation() {
	return Boolean(await elementReady('.js-issue-row + .js-issue-row', {waitForChildren: false}));
}

function add(anchor) {
	anchor.prepend(
		React.createElement('button', {
			type: "button",
			className: "btn-link rgh-open-all-conversations px-2"  ,}

, anchor.closest('.table-list-triage') ? 'Open selected' : 'Open all'
),
	);
}

async function init(signal) {
	observe('.table-list-header-toggle:not(.states)', add, {signal});
	delegate('button.rgh-open-all-conversations', 'click', onButtonClick, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		hasMoreThanOneConversation,
	],
	include: [
		isIssueOrPRList,
	],
	exclude: [
		isGlobalIssueOrPRList,
	],
	init,
}, {
	include: [
		isGlobalIssueOrPRList,
	],
	init,
});

/*

Test URLs:

- Global: https://github.com/issues
- Repo: https://github.com/sindresorhus/refined-github/pulls
- Nothing to open: https://github.com/fregante/empty/pulls

*/
