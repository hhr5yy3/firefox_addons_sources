import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import { isUserProfileRepoTab, isGlobalSearchResults } from '../npm/github-url-detection.js';
import GitPullRequestIcon from '../npm/octicons-plain-react-components-GitPullRequest.js';
import IssueOpenedIcon from '../npm/octicons-plain-react-components-IssueOpened.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { assertNodeContent } from '../helpers/dom-utils.js';

function addConversationLinks(repositoryLink) {
	const repository = repositoryLink.closest('li');

	// Remove the "X issues need help" link
	$('[href*="issues?q=label%3A%22help+wanted"]', repository)?.remove();

	// Place before the update date
	assertNodeContent(
		expectElement('relative-time', repository).previousSibling,
		'Updated',
	).before(
		React.createElement(React.Fragment, null
, React.createElement('a', {
				className: "Link--muted mr-3" ,
				href: repositoryLink.href + '/issues',}

, React.createElement(IssueOpenedIcon, null )
)
, React.createElement('a', {
				className: "Link--muted mr-3" ,
				href: repositoryLink.href + '/pulls',}

, React.createElement(GitPullRequestIcon, null )
)
),
	);
}

function addSearchConversationLinks(repositoryLink) {
	// Do not move to `includes` until React AJAX issues are resolved:
	// https://github.com/refined-github/refined-github/pull/7524#issuecomment-2211692096
	// https://github.com/refined-github/refined-github/issues/6554
	if (new URLSearchParams(location.search).get('type') !== 'repositories') {
		return;
	}

	// Place before the update date ·
	repositoryLink
		.closest('[data-testid="results-list"] > div')
		.querySelector('ul > span:last-of-type')
		.before(
			React.createElement(React.Fragment, null
, React.createElement('span', {
					'aria-hidden': "true",
					className: "color-fg-muted mx-2" ,}
, "·"

)
, React.createElement('li', { className: "d-flex text-small" ,}
, React.createElement('a', {
						className: "Link--muted",
						href: repositoryLink.href + '/issues',}

, React.createElement(IssueOpenedIcon, null )
)
)
, React.createElement('li', { className: "d-flex text-small ml-2"  ,}
, React.createElement('a', {
						className: "Link--muted",
						href: repositoryLink.href + '/pulls',}

, React.createElement(GitPullRequestIcon, null )
)
)
),
		);
}

function init(signal) {
	observe('a[itemprop="name codeRepository"]', addConversationLinks, {signal});
}

function initSearch(signal) {
	observe('.search-title a', addSearchConversationLinks, {signal});
}

void features.add(import.meta.url, {
	include: [
		isUserProfileRepoTab, // Organizations already have these links
	],
	init,
}, {
	include: [
		isGlobalSearchResults,
	],
	init: initSearch,
});

/*
Test URLs

isProfileRepoList:
https://github.com/fregante?tab=repositories

isGlobalSearchResults:
https://github.com/search?q=fregante
*/
