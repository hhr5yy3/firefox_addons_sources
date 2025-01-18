import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { isForkedRepo, isBranches } from '../npm/github-url-detection.js';
import GitMergeIcon from '../npm/octicons-plain-react-components-GitMerge.js';
import GitPullRequestIcon from '../npm/octicons-plain-react-components-GitPullRequest.js';
import GitPullRequestClosedIcon from '../npm/octicons-plain-react-components-GitPullRequestClosed.js';
import GitPullRequestDraftIcon from '../npm/octicons-plain-react-components-GitPullRequestDraft.js';
import RepoForkedIcon from '../npm/octicons-plain-react-components-RepoForked.js';
import memoize from '../npm/memoize.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { cacheByRepo } from '../github-helpers/index.js';
import AssociatedPullRequests from './show-associated-branch-prs-on-fork.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const pullRequestsAssociatedWithBranch = new CachedFunction('associatedBranchPullRequests', {
	async updater() {
		const {repository} = await api.v4(AssociatedPullRequests);

		const pullRequests = {};
		for (const {name, associatedPullRequests} of repository.refs.nodes) {
			const [prInfo] = associatedPullRequests.nodes ;
			// Check if the ref was deleted, since the result includes pr's that are not in fact related to this branch but rather to the branch name.
			const headRefWasDeleted = prInfo?.timelineItems.nodes[0]?.__typename === 'HeadRefDeletedEvent';
			if (prInfo && !headRefWasDeleted) {
				prInfo.state = prInfo.isDraft && prInfo.state === 'OPEN' ? 'DRAFT' : prInfo.state;
				pullRequests[name] = prInfo;
			}
		}

		return pullRequests;
	},
	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 4},
	cacheKey: cacheByRepo,
});

const stateIcon = {
	OPEN: GitPullRequestIcon,
	CLOSED: GitPullRequestClosedIcon,
	MERGED: GitMergeIcon,
	DRAFT: GitPullRequestDraftIcon,
};

async function addLink(branch) {
	const prs = await pullRequestsAssociatedWithBranch.get();
	const branchName = branch.getAttribute('title');
	const prInfo = prs[branchName];
	if (!prInfo) {
		return;
	}

	const StateIcon = stateIcon[prInfo.state] ?? (() => {});
	const stateClassName = prInfo.state.toLowerCase();

	const cell = branch
		.closest('tr.TableRow')
		.children
		.item(4);

	cell.classList.add('rgh-pr-cell');
	cell.append(
		React.createElement('div', { className: "rgh-pr-box",}
, React.createElement('a', {
				href: prInfo.url,
				target: "_blank", // Matches native behavior
				'data-hovercard-url': prInfo.url + '/hovercard',
				'aria-label': `Link to the ${prInfo.isDraft ? 'draft ' : ''}pull request #${prInfo.number}`,
				className: "rgh-pr-link",
				rel: "noreferrer",}

, React.createElement(StateIcon, { width: 14, height: 14, className: stateClassName,} )
, React.createElement(RepoForkedIcon, { width: 14, height: 14, className: `mr-1 ${stateClassName}`,} ), "#"
, prInfo.number
)
),
	);
}

async function init(signal) {
	await expectToken();
	// Memoize because it's being called twice for each. Ideally this should be part of the selector observer
	// https://github.com/refined-github/refined-github/pull/7194#issuecomment-1894972091
	observe('react-app[app-name=repos-branches] a[class*=BranchName] div[title]', memoize(addLink), {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isForkedRepo,
	],
	include: [
		isBranches,
	],
	init,
});

/*

Test URLs:

https://github.com/bfred-it-org/github-sandbox/branches

*/

export { pullRequestsAssociatedWithBranch, stateIcon };
