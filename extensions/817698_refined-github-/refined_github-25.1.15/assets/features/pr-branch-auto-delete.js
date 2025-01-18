import React from '../npm/dom-chef.js';
import { $$ } from '../npm/select-dom.js';
import InfoIcon from '../npm/octicons-plain-react-components-Info.js';
import elementReady from '../npm/element-ready.js';
import { isPRConversation, isOpenConversation } from '../npm/github-url-detection.js';
import api from '../github-helpers/api.js';
import features from '../feature-manager.js';
import onPrMerge from '../github-events/on-pr-merge.js';
import { getBranches } from '../github-helpers/pr-branches.js';
import matchesAnyPattern from '../helpers/matches-any-patterns.js';
import GetPrsToBaseBranch from './pr-branch-auto-delete.gql.js';

// DO NOT ask for additions or customizations. This is just a list of "obvious" permanent branches.
// Protect your permanent branches instead: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
const exceptions = [
	'dev',
	'develop',
	'development',
	'main',
	'master',
	'next',
	'pre',
	'prod',
	'stage',
	'staging',
	/production/,
	/^release/,
	/^v\d/,
];

async function init() {
	const deleteButton = $$([
		'[action$="/cleanup"] [type="submit"]', // TODO: Drop in May 2025
		'[class^="MergeBoxSectionHeader"] button',
	]).find(button => button.textContent === 'Delete branch');
	if (!deleteButton) {
		return;
	}

	// Skip branches that are likely to be long-lived https://github.com/refined-github/refined-github/issues/7755
	const {head} = getBranches();
	if (matchesAnyPattern(head.branch, exceptions)) {
		return;
	}

	// Skip branches that have PRs open https://github.com/refined-github/refined-github/issues/7782
	const {repository} = await api.v4(GetPrsToBaseBranch, {
		variables: {
			baseRefName: head.branch,
		},
	});

	if (repository.pullRequests.totalCount) {
		return;
	}

	// TODO: Drop label in May 2025
	deleteButton.dataset.disableWith = 'Auto-deleting…';
	deleteButton.click();

	const deletionEvent = await elementReady('.TimelineItem-body:has(.pull-request-ref-restore-text)', {
		stopOnDomReady: false,
		timeout: 2000,
	});

	const url = 'https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#pr-branch-auto-delete';
	deletionEvent.append(
		React.createElement('a', { className: "d-inline-block", href: url,}, "via Refined GitHub "   , React.createElement(InfoIcon, null )),
	);
}

void features.add(import.meta.url, {
	asLongAs: [
		isPRConversation,
		isOpenConversation,
	],
	awaitDomReady: true, // Post-load user event, no need to listen earlier
	init(signal) {
		onPrMerge(init, signal);
	},
});

/*

Test URLs:

1. Open https://github.com/pulls
2. Click on any PRs you can merge (in repositories without native auto-delete)
3. Merge the PR

*/
