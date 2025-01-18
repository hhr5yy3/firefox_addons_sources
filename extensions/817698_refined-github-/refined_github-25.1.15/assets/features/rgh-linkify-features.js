import React from '../npm/dom-chef.js';
import { hasComments, isReleasesOrTags, isSingleReleaseOrTag, isCommitList, isSingleCommit, isRepoWiki, isPR, isIssue } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';
import { getFeatureUrl } from '../helpers/rgh-links.js';
import { getNewFeatureName } from '../feature-data.js';
import { isAnyRefinedGitHubRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';

function linkifyFeature(possibleFeature) {
	const id = getNewFeatureName(possibleFeature.textContent);
	if (!id) {
		return;
	}

	const href = getFeatureUrl(id);

	const possibleLink = possibleFeature.firstElementChild ?? possibleFeature;
	if (possibleLink instanceof HTMLAnchorElement) {
		// Possible DOM structure:
		// - <a>
		// - <code> > <a>
		possibleLink.href = href;
		possibleLink.classList.add('color-fg-accent');
	} else if (!possibleFeature.closest('a')) {
		// Possible DOM structure:
		// - <code>
		wrap(
			possibleFeature,
			React.createElement('a', {
				className: "color-fg-accent",
				'data-turbo-frame': "repo-content-turbo-frame",
				href: href,}
			),
		);
	}
}

function init(signal) {
	observe([
		'.js-issue-title code', // `isPR`, Old view `isIssue`
		'[data-testid="issue-title"] code', // `isIssue`
		'.js-comment-body code', // Old view `hasComments`
		'.markdown-body code', // `hasComments`, `isReleasesOrTags`
		'.markdown-title:not(li) code', // `isSingleCommit`, `isRepoTree`, not on the issue autocomplete
		'code .markdown-title', // `isCommitList`, `isRepoTree`
	], linkifyFeature, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isAnyRefinedGitHubRepo,
	],
	include: [
		hasComments,
		isReleasesOrTags,
		isSingleReleaseOrTag,
		isCommitList,
		isSingleCommit,
		isRepoWiki,
		isPR,
		isIssue,
	],
	init,
});

/*

Test URLs

- isReleasesOrTags: https://github.com/refined-github/refined-github/releases
- isSingleCommit: https://github.com/refined-github/refined-github/releases/tag/23.7.25
- isIssue: https://github.com/refined-github/refined-github/issues
- isPR: https://github.com/refined-github/refined-github/pull

*/
