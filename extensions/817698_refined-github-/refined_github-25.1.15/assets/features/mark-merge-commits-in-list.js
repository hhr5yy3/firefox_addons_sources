import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { isCommitList, isPRConversation, isCompare } from '../npm/github-url-detection.js';
import GitMergeIcon from '../npm/octicons-plain-react-components-GitMerge.js';
import batchedFunction from '../npm/batched-function.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { commitHashLinkInLists, commitTitleInLists } from '../github-helpers/selectors.js';
import { assertCommitHash } from '../github-helpers/index.js';
import { expectToken } from '../github-helpers/github-token.js';
import { objectEntries } from '../npm/ts-extras-object-entries.js';

const filterMergeCommits = async (commits) => {
	const {repository} = await api.v4(`
		repository() {
			${commits.map((commit) => `
				${api.escapeKey(commit)}: object(expression: "${commit}") {
				... on Commit {
						parents {
							totalCount
						}
					}
				}
			`).join('\n')}
		}
	`);

	const mergeCommits = [];
	for (const [key, commit] of objectEntries(repository)) {
		if (commit.parents.totalCount >= 2) {
			mergeCommits.push(key.slice(1));
		}
	}

	return mergeCommits;
};

function getCommitHash(commit) {
	const hash = expectElement(commitHashLinkInLists, commit).pathname.split('/').pop();
	assertCommitHash(hash);
	return hash;
}

function updateCommitIcon(commit, replace) {
	if (replace) {
		// Align icon to the line; rem used to match the native units
		expectElement('.octicon-git-commit', commit).replaceWith(React.createElement(GitMergeIcon, { style: {marginLeft: '0.5rem'},} ));
	} else {
		expectElement(commitTitleInLists, commit).prepend(React.createElement(GitMergeIcon, { className: "mr-1",} ));
	}
}

async function markCommits(commits) {
	const isPRConversation$1 = isPRConversation();
	const mergeCommits = await filterMergeCommits(commits.map(commit => getCommitHash(commit)));
	for (const commit of commits) {
		if (mergeCommits.includes(getCommitHash(commit))) {
			commit.classList.add('rgh-merge-commit');
			updateCommitIcon(commit, isPRConversation$1);
		}
	}
}

async function init(signal) {
	await expectToken();
	observe([
		'[data-testid="commit-row-item"]',

		'.js-commits-list-item', // `isPRCommitList`
		'.js-timeline-item .TimelineItem:has(.octicon-git-commit)', // `isPRConversation`; "js-timeline-item" excludes "isPRCommitList"
	], batchedFunction(markCommits, {delay: 100}), {signal});
}

void features.add(import.meta.url, {
	include: [
		isCommitList,
		isPRConversation,
		isCompare,
	],
	init,
});

/*

Test URLs

- isPRConversation: https://github.com/refined-github/refined-github/pull/6194#event-8016526003
- isPRCommitList: https://github.com/refined-github/refined-github/pull/6194/commits
- isCommitList: https://github.com/typed-ember/ember-cli-typescript/commits/master?after=5ff0c078a4274aeccaf83382c0d6b46323f57397+174
- isCompare: https://github.com/refined-github/sandbox/compare/e8b25d3e...b3d0d992

*/

export { getCommitHash };
