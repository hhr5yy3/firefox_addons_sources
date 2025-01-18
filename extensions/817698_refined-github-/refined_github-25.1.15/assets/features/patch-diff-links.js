import React from '../npm/dom-chef.js';
import { isCommit, isPRCommit404, isPRCommit } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { getCleanPathname } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';

async function addPatchDiffLinks(commitMeta) {
	let commitUrl = '/' + getCleanPathname();

	// Avoids a redirection
	if (isPRCommit()) {
		commitUrl = commitUrl.replace(/\/pull\/\d+\/commits/, '/commit');
	}

	commitMeta.classList.remove('no-wrap'); // #5987
	commitMeta.prepend(
		React.createElement('span', { className: "sha-block", 'data-turbo': "false",}
, React.createElement('a', { href: `${commitUrl}.patch`, className: "sha color-fg-default" ,}, "patch")
, ' '
, React.createElement('a', { href: `${commitUrl}.diff`, className: "sha color-fg-default" ,}, "diff")
, commitMeta.tagName !== 'DIV' && React.createElement('span', { className: "px-2",}, "·")
),
	);
}

async function init(signal) {
	observe([
		'.commit-meta > :is(span, div):last-child', // `isPRCommit` + old `isSingleCommit`
		'[class*="commit-header-actions"] + div pre',
	], addPatchDiffLinks, {signal});
}

void features.add(import.meta.url, {
	include: [
		isCommit,
	],
	exclude: [
		isPRCommit404,
	],
	init,
});

/*

Test URLs:

- Commit:https://github.com/refined-github/refined-github/commit/132272786fdc058193e089d8c06f2a158844e101
- PR Commit: https://github.com/refined-github/refined-github/pull/7751/commits/07ddf838c211075701e9a681ab061a158b05ee79

*/
