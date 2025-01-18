import React from '../npm/dom-chef.js';
import { expectElement, $$ } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { hasComments, isGist, is404, isSingleFile, isRepoTree } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import addNotice from '../github-widgets/notice-bar.js';
import { linkifiedURLClass } from '../github-helpers/dom-formatters.js';
import { isPermalink, buildRepoURL } from '../github-helpers/index.js';
import { saveOriginalHref } from './sort-conversations-by-update-time.js';
import observe from '../helpers/selector-observer.js';
import GetCommitAtDate from './comments-time-machine-links.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';

async function updateURLtoDatedSha(url, date) {
	const {repository} = await api.v4(GetCommitAtDate, {variables: {date, branch: url.branch}});

	const [{oid}] = repository.ref.target.history.nodes;
	expectElement('a.rgh-link-date').pathname = url.assign({branch: oid}).pathname;
}

async function showTimeMachineBar() {
	const url = new URL(location.href); // This can't be replaced with `GitHubFileURL` because `getCurrentGitRef` throws on 404s
	const date = url.searchParams.get('rgh-link-date');

	// Drop parameter from current page after using it
	url.searchParams.delete('rgh-link-date');
	history.replaceState(history.state, document.title, url.href);

	if (is404()) {
		const pathnameParts = url.pathname.split('/');
		pathnameParts[4] = `HEAD@{${date}}`;
		url.pathname = pathnameParts.join('/');
	} else {
		// This feature only makes sense if the URL points to a non-permalink
		if (await isPermalink()) {
			return false;
		}

		// Selector note: isRepoFile and isRepoTree have different DOM for this element
		const lastCommitDate = await elementReady('.Box-header relative-time', {waitForChildren: false});
		if (lastCommitDate && date > lastCommitDate.getAttribute('datetime')) {
			return false;
		}

		const parsedUrl = new GitHubFileURL(location.href);

		// Handle `isRepoHome` #4979
		parsedUrl.branch ||= await getDefaultBranch();
		parsedUrl.route ||= 'tree';

		// Due to GitHub’s bug of supporting branches with slashes: #2901
		void updateURLtoDatedSha(parsedUrl, date); // Don't await it, since the link will usually work without the update

		// Set temporary URL AFTER calling `updateURLtoDatedSha`
		parsedUrl.branch = `${parsedUrl.branch}@{${date}}`;

		// Use new path in link
		url.pathname = parsedUrl.pathname;
	}

	const link = (
		React.createElement('a', { className: "rgh-link-date", href: url.href,}, "view this object as it appeared at the time of the comment"

)
	);
	await addNotice(
		React.createElement(React.Fragment, null, "You can also "   , link, " (" , React.createElement('relative-time', { datetime: date,} ), ")"),
	);
}

function addInlineLinks(comment, timestamp) {
	for (const link of $$(`a[href^="${location.origin}"]:not(.${linkifiedURLClass})`, comment)) {
		const linkParts = link.pathname.split('/');
		// Skip non-git-object links. `undefined` covers links to the repo home #4979
		if (![undefined, 'blob', 'tree', 'blame'].includes(linkParts[3])) {
			continue;
		}

		// Skip permalinks
		if (/^[\da-f]{40}$/.test(linkParts[4])) {
			continue;
		}

		saveOriginalHref(link);

		const searchParameters = new URLSearchParams(link.search);
		searchParameters.set('rgh-link-date', timestamp);
		link.search = String(searchParameters);
	}
}

function addDropdownLink(menu, timestamp) {
	expectElement('.show-more-popover', menu.parentElement).append(
		React.createElement('div', { className: "dropdown-divider",} ),
		React.createElement('a', {
			href: buildRepoURL(`tree/HEAD@{${timestamp}}`),
			className: 'dropdown-item btn-link ' + linkifiedURLClass,
			role: "menuitem",
			title: "Browse repository like it appeared on this day"       ,}
, "View repo at this time"

),
	);
}

async function init(signal) {
	await expectToken();

	observe('.timeline-comment-actions > details:last-child', menu => {
		if (menu.closest('.js-pending-review-comment')) {
			return;
		}

		// The timestamp of main review comments isn't in their header but in the timeline event above #5423
		const timestamp = menu
			.closest(['.js-comment:not([id^="pullrequestreview-"])', '.js-timeline-item'])
			.querySelector('relative-time')
			.attributes
			.datetime
			.value;

		addInlineLinks(menu.closest('.js-comment'), timestamp);
		addDropdownLink(menu, timestamp);
	}, {signal});

	observe([
		'div.react-issue-comment',
		'[data-testid="review-thread"] > div',
	], comment => {
		const timestamp = expectElement('relative-time', comment).attributes.datetime.value;
		addInlineLinks(comment, timestamp);
	}, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasComments,
	],
	exclude: [
		isGist,
	],
	init,
}, {
	asLongAs: [
		() => new URLSearchParams(location.search).has('rgh-link-date'),
	],
	include: [
		is404,
		isSingleFile,
		isRepoTree,
	],
	init: showTimeMachineBar,
});

/*
Test URLs

Find them in https://github.com/refined-github/refined-github/pull/1863

See the bar on:

- https://github.com/sindresorhus/refined-github/blob/main/source/features/mark-merge-commits-in-list.tsx?rgh-link-date=2019-03-04T13%3A04%3A18Z
*/
