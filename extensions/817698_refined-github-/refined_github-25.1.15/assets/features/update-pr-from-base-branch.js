import React from '../npm/dom-chef.js';
import { expectElement, elementExists, $ } from '../npm/select-dom.js';
import { isPRConversation, isClosedConversation } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import CheckIcon from '../npm/octicons-plain-react-components-Check.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import api from '../github-helpers/api.js';
import { getBranches } from '../github-helpers/pr-branches.js';
import getPrInfo from '../github-helpers/get-pr-info.js';
import showToast from '../github-helpers/toast.js';
import { getConversationNumber } from '../github-helpers/index.js';
import createMergeabilityRow from '../github-widgets/mergeability-row.js';
import { expectToken } from '../github-helpers/github-token.js';

const canNativelyUpdate = '.js-update-branch-form';

async function mergeBranches() {
	return api.v3(`pulls/${getConversationNumber()}/update-branch`, {
		method: 'PUT',
		ignoreHTTPStatus: true,
	});
}

async function handler({delegateTarget: button}) {
	button.disabled = true;
	await showToast(async () => {
		// Reads Error#message or GitHub’s "message" response
		const response = await mergeBranches().catch(error => error);
		if (response instanceof Error || !response.ok) {
			throw new Error(`Error updating the branch: ${response.message }`, {cause: response});
		}
	}, {
		message: 'Updating branch…',
		doneMessage: 'Branch updated',
	});

	button.remove();
}

function createButton() {
	return (
		React.createElement('button', {
			type: "button",
			className: "btn btn-sm rgh-update-pr-from-base-branch tooltipped tooltipped-sw"    ,
			'aria-label': "Use Refined GitHub to update the PR from the base branch"          ,}
, "Update branch"

)
	);
}

async function addButton(mergeBar) {
	if (elementExists(canNativelyUpdate)) {
		return;
	}

	const {base} = getBranches();
	const prInfo = await getPrInfo(base.relative);
	if (!prInfo.needsUpdate || !(prInfo.viewerCanUpdate || prInfo.viewerCanEditFiles) || prInfo.mergeable === 'CONFLICTING') {
		return;
	}

	const mergeabilityRow = $('.branch-action-item:has(.merging-body)');
	if (mergeabilityRow) {
		// The PR is not a draft
		mergeabilityRow.prepend(

			React.createElement('div', {
				className: "branch-action-btn float-right js-immediate-updates js-needs-timeline-marker-header"   ,}

, createButton()
),
		);
		return;
	}

	// The PR is still a draft
	mergeBar.before(createMergeabilityRow({
		className: 'rgh-update-pr-from-base-branch-row',
		action: createButton(),
		icon: React.createElement(CheckIcon, null ),
		iconClass: 'completeness-indicator-success',
		heading: 'This branch has no conflicts with the base branch',
		meta: 'Merging can be performed automatically.',
	}));
}

async function init(signal) {
	await expectToken();

	delegate('.rgh-update-pr-from-base-branch', 'click', handler, {signal});
	observe('.mergeability-details > *:last-child', addButton, {signal});
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

PRs to repos without write access, find one among your own PRs here:
https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3A%40me+archived%3Afalse+-user%3A%40me

*/
