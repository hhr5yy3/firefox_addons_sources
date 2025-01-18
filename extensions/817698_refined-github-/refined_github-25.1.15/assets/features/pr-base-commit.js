import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { isPRConversation, isClosedConversation } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { getBranches } from '../github-helpers/pr-branches.js';
import getPrInfo from '../github-helpers/get-pr-info.js';
import pluralize from '../helpers/pluralize.js';
import { buildRepoURL } from '../github-helpers/index.js';
import { linkifyCommit } from '../github-helpers/dom-formatters.js';
import { isTextNodeContaining } from '../helpers/dom-utils.js';
import { expectToken } from '../github-helpers/github-token.js';

function getBaseCommitNotice(prInfo) {
	const {base} = getBranches();
	const commit = linkifyCommit(prInfo.baseRefOid);
	const count = pluralize(prInfo.behindBy, '$$ commit');
	const countLink = (
		React.createElement('a', { href: buildRepoURL('compare', `${prInfo.baseRefOid.slice(0, 8)}...${base.branch}`),}
, count
)
	);
	return (
		React.createElement('div', null, "It’s " , countLink, " behind (base commit: "    , commit, ")")
	);
}

async function addInfo(statusMeta) {
	// This excludes hidden ".status-meta" items without adding this longass selector to the observer
	// Added: .rgh-update-pr-from-base-branch-row
	// eslint-disable-next-line no-restricted-syntax -- Selector copied from GitHub. Don't @ me
	if (!statusMeta.closest('.merge-pr.is-merging .merging-body, .merge-pr.is-merging .merge-commit-author-email-info, .merge-pr.is-merging-solo .merging-body, .merge-pr.is-merging-jump .merging-body, .merge-pr.is-merging-group .merging-body, .merge-pr.is-rebasing .rebasing-body, .merge-pr.is-squashing .squashing-body, .merge-pr.is-squashing .squash-commit-author-email-info, .merge-pr.is-merging .branch-action-state-error-if-merging .merging-body-merge-warning, .rgh-update-pr-from-base-branch-row')) {
		return;
	}

	const {base} = getBranches();
	const prInfo = await getPrInfo(base.relative);
	if (!prInfo.needsUpdate) {
		return;
	}

	const previousMessage = statusMeta.firstChild; // Extract now because it won't be the first child anymore
	statusMeta.prepend(getBaseCommitNotice(prInfo));
	if (isTextNodeContaining(previousMessage, 'Merging can be performed automatically.')) {
		previousMessage.remove();
	}
}

async function init(signal) {
	await expectToken();

	observe('.branch-action-item .status-meta', addInfo, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	exclude: [
		isClosedConversation,
		() => expectElement('.head-ref').title === 'This repository has been deleted',
	],
	awaitDomReady: true, // DOM-based exclusions
	init,
});

/*
Test URLs

PR without conflicts
https://github.com/refined-github/sandbox/pull/60

Draft PR without conflicts
https://github.com/refined-github/sandbox/pull/61

Native "Update branch" button
(pick a conflict-free PR from https://github.com/refined-github/refined-github/pulls?q=is%3Apr+is%3Aopen+sort%3Acreated-asc)

Native "Resolve conflicts" button
https://github.com/refined-github/sandbox/pull/9

Cross-repo PR with long branch names
https://github.com/refined-github/sandbox/pull/13

*/
