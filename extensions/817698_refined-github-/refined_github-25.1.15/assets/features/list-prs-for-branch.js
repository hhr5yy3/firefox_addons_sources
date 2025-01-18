import React from '../npm/dom-chef.js';
import features from '../feature-manager.js';
import getCurrentGitRef from '../github-helpers/get-current-git-ref.js';
import isDefaultBranch from '../github-helpers/is-default-branch.js';
import { pullRequestsAssociatedWithBranch, stateIcon } from './show-associated-branch-prs-on-fork.js';
import { isRepoCommitListRoot, isPermalink, addAfterBranchSelector } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import { branchSelectorParent } from '../github-helpers/selectors.js';
import { expectToken } from '../github-helpers/github-token.js';

// Taken from https://github.com/fregante/github-issue-link-status/blob/98792f2837352bacbf80664f3edbcec8e579ed17/source/github-issue-link-status.js#L10
const stateColorMap = {
	OPEN: 'color-fg-success',
	CLOSED: 'color-fg-danger',
	MERGED: 'color-fg-done',
	DRAFT: '',
};

async function add(branchSelectorParent) {
	const getPr = await pullRequestsAssociatedWithBranch.get();
	const currentBranch = getCurrentGitRef();
	const prInfo = getPr[currentBranch];
	if (!prInfo) {
		return;
	}

	const StateIcon = stateIcon[prInfo.state];

	addAfterBranchSelector(
		branchSelectorParent,
		React.createElement('a', {
			'data-issue-and-pr-hovercards-enabled': true,
			href: prInfo.url,
			className: "btn flex-self-center rgh-list-prs-for-branch"  ,
			'data-hovercard-type': "pull_request",
			'data-hovercard-url': prInfo.url + '/hovercard',}

, React.createElement(StateIcon, { className: stateColorMap[prInfo.state],} )
, React.createElement('span', null, " #" , prInfo.number)
),
	);
}

async function init(signal) {
	await expectToken();

	observe(branchSelectorParent, add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoCommitListRoot,
	],
	exclude: [
		isDefaultBranch,
		isPermalink,
	],
	init,
});

/*

Test URLs

https://github.com/refined-github/sandbox/commits/4679-1
https://github.com/refined-github/sandbox/commits/branch/with/slashes

*/
