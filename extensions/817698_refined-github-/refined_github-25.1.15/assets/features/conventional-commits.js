import React from '../npm/dom-chef.js';
import { isCommitList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { commitTitleInLists } from '../github-helpers/selectors.js';
import { parseConventionalCommit, conventionalCommitRegex } from '../helpers/conventional-commits.js';
import { removeTextInTextNode } from '../helpers/dom-utils.js';

/*

This feature is documented at https://github.com/refined-github/refined-github/wiki/Customization#conventional-commits

*/


function renderLabelInCommitTitle(commitTitleElement) {
	const textNode = commitTitleElement.firstChild;
	const commit = parseConventionalCommit(textNode.textContent);

	if (!commit) {
		return;
	}

	// Skip commits that are _only_ "ci:" without anything else. Rare but would be confusing to show just the label
	if (commit.raw === textNode.textContent && !commitTitleElement.nextElementSibling) {
		return;
	}

	commitTitleElement.prepend(
		React.createElement('span', { className: "IssueLabel hx_IssueLabel mr-2"  , 'rgh-conventional-commits': commit.rawType,}
, commit.type
),

		// Keep scope outside because that's how they're rendered in release notes as well
		commit.scope ? React.createElement('span', { className: "color-fg-muted",}, commit.scope) : '',
	);

	removeTextInTextNode(textNode, conventionalCommitRegex);
}

function init(signal) {
	observe(`:is(${commitTitleInLists}) h4 > span > a:first-child`, renderLabelInCommitTitle, {signal});
}

void features.add(import.meta.url, {
	include: [
		isCommitList,
	],
	init,
});

/*

Test URLs:

- Repo commits: https://github.com/refined-github/sandbox/commits/conventional-commits/
- PR commits: https://github.com/refined-github/sandbox/pull/91/commits
- Real data: https://github.com/conventional-changelog/standard-version/commits
- Repo without conventional commits: https://github.com/refined-github/refined-github/commits

*/
