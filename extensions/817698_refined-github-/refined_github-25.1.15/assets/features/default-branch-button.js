import React from '../npm/dom-chef.js';
import { isRepoRoot, isRepoTree, isSingleFile } from '../npm/github-url-detection.js';
import ChevronLeftIcon from '../npm/octicons-plain-react-components-ChevronLeft.js';
import { $ } from '../npm/select-dom.js';
import memoize from '../npm/memoize.js';
import features from '../feature-manager.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import { groupButtons } from '../github-helpers/group-buttons.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import observe from '../helpers/selector-observer.js';
import { branchSelector } from '../github-helpers/selectors.js';
import isDefaultBranch from '../github-helpers/is-default-branch.js';
import { isRepoCommitListRoot, fixFileHeaderOverlap } from '../github-helpers/index.js';
import { expectToken } from '../github-helpers/github-token.js';

const getUrl = memoize(async (currentUrl) => {
	const defaultUrl = new GitHubFileURL(currentUrl);
	if (isRepoRoot()) {
		// The default branch of the root directory is just /user/repo/
		defaultUrl.route = '';
		defaultUrl.branch = '';
	} else {
		defaultUrl.branch = await getDefaultBranch();
	}

	return defaultUrl.href;
});

async function updateUrl(event) {
	event.currentTarget.href = await getUrl(location.href);
}

function wrapButtons(buttons) {
	groupButtons(buttons, 'd-flex', 'rgh-default-branch-button-group');

	// `rounded-left-0` is for Firefox
	// https://github.com/refined-github/refined-github/pull/8030
	buttons.at(-1).classList.add('rounded-left-0');
}

async function add(branchSelector) {
	// The DOM varies between details-based DOM and React-based one
	const selectorWrapper = branchSelector.tagName === 'SUMMARY'
		? branchSelector.parentElement
		: branchSelector;
	selectorWrapper.classList.add('rgh-highlight-non-default-branch');

	const existingLink = $('.rgh-default-branch-button', branchSelector.parentElement);

	// React issues. Duplicates appear after a color scheme update
	// https://github.com/refined-github/refined-github/issues/7098
	if (existingLink) {
		// Border radius style is removed by the color scheme update
		wrapButtons([existingLink, selectorWrapper]);
		return;
	}

	if (isSingleFile()) {
		fixFileHeaderOverlap(branchSelector);
	}

	const defaultLink = (
		React.createElement('a', {
			className: "btn tooltipped tooltipped-se px-2 rgh-default-branch-button flex-self-start"     ,
			href: await getUrl(location.href),
			'aria-label': "See this view on the default branch"      ,
			// Update on hover because the URL may change without a DOM refresh
			// https://github.com/refined-github/refined-github/issues/6554
			// Inlined listener because `mouseenter` is too heavy for `delegate`
			onMouseEnter: updateUrl,}




, React.createElement(ChevronLeftIcon, null )
)
	);

	selectorWrapper.before(defaultLink);
	wrapButtons([defaultLink, selectorWrapper]);
}

async function init(signal) {
	await expectToken();
	observe(branchSelector, add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoTree,
		isSingleFile,
		isRepoCommitListRoot,
	],
	exclude: [
		isDefaultBranch,
	],
	init,
});

/*

Test URLs:

- isRepoTree https://github.com/refined-github/refined-github/tree/07ecc75
- isSingleFile, 410 Gone from default branch https://github.com/refined-github/refined-github/blob/07ecc75/extension/content.js
- isRepoCommitList: https://github.com/refined-github/refined-github/commits/07ecc75/
- isRepoCommitList (already on default branch): https://github.com/typed-ember/ember-cli-typescript/commits/master
- isRepoCommitListRoot (no branch selector): https://github.com/refined-github/refined-github/commits/07ecc75/extension
- `isRepoHome`, long branch name: https://github.com/refined-github/sandbox/tree/very-very-long-long-long-long-branch-name

*/
