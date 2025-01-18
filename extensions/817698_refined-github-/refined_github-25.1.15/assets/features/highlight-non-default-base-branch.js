import React from '../npm/dom-chef.js';
import { isRepoIssueOrPRList } from '../npm/github-url-detection.js';
import GitPullRequestIcon from '../npm/octicons-plain-react-components-GitPullRequest.js';
import batchedFunction from '../npm/batched-function.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { buildRepoURL } from '../github-helpers/index.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import observe from '../helpers/selector-observer.js';
import { expectToken } from '../github-helpers/github-token.js';

function isClosed(prLink) {
	return Boolean(prLink.closest('.js-issue-row').querySelector(['.octicon.merged', '.octicon.closed']));
}

function buildQuery(issueIds) {
	return `
		repository() {
			${issueIds.map(id => `
				${id}: pullRequest(number: ${id.replaceAll(/\D/g, '')}) {
					baseRef {id}
					baseRefName
				}
			`).join('\n')}
		}
	`;
}

async function add(prLinks) {
	const query = buildQuery(prLinks.map(pr => pr.id));
	const [data, defaultBranch] = await Promise.all([
		api.v4(query),
		getDefaultBranch(),
	]);

	for (const prLink of prLinks) {
		const pr = data.repository[prLink.id];
		if (pr.baseRefName === defaultBranch) {
			continue;
		}

		// Avoid noise on old PRs pointing to `master` #3910
		// If the PR is open, it means that `master` still exists
		if (pr.baseRefName === 'master' && isClosed(prLink)) {
			continue;
		}

		const branch = pr.baseRef && buildRepoURL('tree', pr.baseRefName);

		prLink.parentElement.querySelector('.text-small.color-fg-muted .d-none.d-md-inline-flex').append(
			React.createElement('span', { className: "issue-meta-section ml-2" ,}
, React.createElement(GitPullRequestIcon, null )
, ' To '
, React.createElement('span', {
					className: "commit-ref css-truncate user-select-contain mb-n1"   ,
					style: (branch ? {} : {textDecoration: 'line-through'}),}

, React.createElement('a', { title: branch ? pr.baseRefName : 'Deleted', href: branch,}
, pr.baseRefName
)
)
),
		);
	}
}

async function init(signal) {
	await expectToken();
	observe('.js-issue-row .js-navigation-open[data-hovercard-type="pull_request"]', batchedFunction(add, {delay: 100}), {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoIssueOrPRList,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/pulls?q=is%3Apr+is%3Aopen+pr+branch

*/
