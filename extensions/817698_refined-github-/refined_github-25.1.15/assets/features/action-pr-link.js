import { isRepositoryActions, isPR } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { getConversationNumber } from '../github-helpers/index.js';

function setSearchParameter(anchorElement, name, value) {
	const parameters = new URLSearchParams(anchorElement.search);
	parameters.set(name, value);
	anchorElement.search = String(parameters);
}

async function addForRepositoryActions(prLink) {
	const prNumber = prLink.textContent.slice(1);

	const runLink = prLink.closest('.Box-row').querySelector('a:has(.Link--primary)');
	setSearchParameter(runLink, 'pr', prNumber);
}

async function addForPR(actionLink) {
	setSearchParameter(actionLink, 'pr', String(getConversationNumber()));
}

async function initForRepositoryActionsPage(signal) {
	observe('div.Box-row[id^=check_suite_] a[data-hovercard-type="pull_request"]', addForRepositoryActions, {signal});
}

async function initForPRPage(signal) {
	// Exclude rgh-link, include isPRCommits
	observe([
		'main [href="/apps/github-actions"] ~ div a.status-actions', // Legacy
		'[data-testid="check-run-item"] a[href*="/actions/runs/"]', // React component on isPRCommits
	], addForPR, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepositoryActions,
	],
	init: initForRepositoryActionsPage,
}, {
	include: [
		isPR,
	],
	init: initForPRPage,
});

/*

## Test URLs

https://github.com/refined-github/refined-github/actions

https://github.com/refined-github/refined-github/pull/6794

https://github.com/refined-github/refined-github/pull/6794/commits

*/
