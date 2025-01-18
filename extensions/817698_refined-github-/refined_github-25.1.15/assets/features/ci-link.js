import React from '../npm/dom-chef.js';
import { hasRepoHeader } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { buildRepoURL } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import getChecks from './ci-link.gql.js';
import { expectToken } from '../github-helpers/github-token.js';

async function getCommitWithChecks() {
	const {repository} = await api.v4(getChecks);
	// Check earlier commits just in case the last one is CI-generated and doesn't have checks
	for (const commit of repository.defaultBranchRef.target.history.nodes) {
		if (commit.statusCheckRollup) {
			return commit.oid;
		}
	}

	return undefined;
}

async function add(anchor) {
	const commit = await getCommitWithChecks();
	if (!commit) {
		return;
	}

	const endpoint = buildRepoURL('commits/checks-statuses-rollups');
	anchor.parentElement.append(
		React.createElement('span', { className: "rgh-ci-link ml-1" , title: "CI status of latest commit"    ,}
, React.createElement('batch-deferred-content', { hidden: true, 'data-url': endpoint,}
, React.createElement('input', {
					name: "oid",
					value: commit,
					'data-targets': "batch-deferred-content.inputs",}
				)
)
),
	);

	// A parent is clipping the popup
	anchor.closest('.AppHeader-context-full')?.style.setProperty('overflow', 'visible');
}

async function init(signal) {
	await expectToken();

	observe([
		// Desktop
		'.AppHeader-context-item:not([data-hovercard-type])',

		// Mobile. `> *:first-child` avoids finding our own element
		'.AppHeader-context-compact-mainItem > span:first-child',
	], add, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRepoHeader,
	],
	init,
});

/*
Test URLs

CI:
https://github.com/refined-github/refined-github

No CI:
https://github.com/fregante/.github
*/
