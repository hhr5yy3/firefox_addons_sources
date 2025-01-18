import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { $$, expectElement } from '../npm/select-dom.js';
import TagIcon from '../npm/octicons-plain-react-components-Tag.js';
import { isPRConversation, isMergedPR, isOpenConversation } from '../npm/github-url-detection.js';
import InfoIcon from '../npm/octicons-plain-react-components-Info.js';
import features from '../feature-manager.js';
import fetchDom from '../helpers/fetch-dom.js';
import onPrMerge from '../github-events/on-pr-merge.js';
import createBanner from '../github-helpers/banner.js';
import { TimelineItemOld } from '../github-helpers/timeline-item.js';
import attachElement from '../helpers/attach-element.js';
import { buildRepoURL, getRepo, isRefinedGitHubRepo } from '../github-helpers/index.js';
import { getReleases } from './releases-tab.js';
import observe from '../helpers/selector-observer.js';
import { userHasPushAccess } from '../github-helpers/get-user-permission.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

function excludeNightliesAndJunk({textContent}) {
	// https://github.com/refined-github/refined-github/issues/7206
	return !textContent.includes('nightly') && /\d[.]\d/.test(textContent);
}

function ExplanationLink() {
	// If you tweak this the alignment value, verify it against both the tagged and untagged states
	// See screenshots in https://github.com/refined-github/refined-github/pull/7498
	return (
		React.createElement('a', { href: "https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#closing-remarks",}
, React.createElement(InfoIcon, { width: 12, height: 12, style: {verticalAlign: '-2px'},} )
)
	);
}

const firstTag = new CachedFunction('first-tag', {
	async updater(commit) {
		const tagsAndBranches = await fetchDom(buildRepoURL('branch_commits', commit));
		const tags = $$('ul.branches-tag-list a', tagsAndBranches);
		// eslint-disable-next-line unicorn/no-array-callback-reference -- Just this once, I swear
		return tags.findLast(excludeNightliesAndJunk)?.textContent ?? false;
	},
	cacheKey: ([commit]) => [getRepo().nameWithOwner, commit].join(':'),
});

function createReleaseUrl() {
	if (isRefinedGitHubRepo()) {
		return 'https://github.com/refined-github/refined-github/actions/workflows/release.yml';
	}

	return buildRepoURL('releases/new');
}

async function init(signal) {
	const mergeCommit = expectElement(`.TimelineItem.js-details-container.Details a[href^="/${getRepo().nameWithOwner}/commit/" i] > code`).textContent;
	const tagName = await firstTag.get(mergeCommit);

	if (tagName) {
		const tagUrl = buildRepoURL('releases/tag', tagName);

		// Add static box at the bottom
		addExistingTagLinkFooter(tagName, tagUrl);

		// PRs have a regular and a sticky header
		observe('#partial-discussion-header relative-time', addExistingTagLinkToHeader.bind(undefined, tagName, tagUrl), {signal});
	} else {
		void addReleaseBanner('This PR’s merge commit doesn’t appear in any tags');
	}
}

function addExistingTagLinkToHeader(tagName, tagUrl, discussionHeader) {
	discussionHeader.parentElement.append(
		React.createElement('span', null
, React.createElement(TagIcon, { className: "ml-2 mr-1 color-fg-muted"  ,} )
, React.createElement('a', {
				href: tagUrl,
				className: "commit-ref",
				title: `${tagName} was the first Git tag to include this pull request`,}

, tagName
)
),
	);
}

function addExistingTagLinkFooter(tagName, tagUrl) {
	const linkedTag = React.createElement('a', { href: tagUrl, className: "Link--primary text-bold" ,}, tagName);
	attachElement(expectElement('#issue-comment-box'), {
		before: () => (
			React.createElement(TimelineItemOld, null
, createBanner({
					icon: React.createElement(TagIcon, { className: "m-0",} ),
					text: React.createElement(React.Fragment, null, "This pull request first appeared in "      , linkedTag, " " , React.createElement(ExplanationLink, null )),
					classes: ['flash-success', 'rgh-bg-none'],
				})
)
		),
	});
}

async function addReleaseBanner(text = 'Now you can release this change') {
	const [releases] = await getReleases();
	if (releases === 0) {
		return;
	}

	const url = createReleaseUrl();
	const bannerContent = {
		icon: React.createElement(TagIcon, { className: "m-0",} ),
		classes: ['rgh-bg-none'],
		text: React.createElement(React.Fragment, null, text, " " , React.createElement(ExplanationLink, null )),
	};

	attachElement(expectElement('#issue-comment-box'), {
		before: () => (
			React.createElement(TimelineItemOld, null
, createBanner(
					url
						? {
								...bannerContent,
								action: url,
								buttonLabel: 'Draft a new release',
							}
						: bannerContent,
				)
)
		),
	});
}

void features.add(import.meta.url, {
	// When arriving on an already-merged PR
	asLongAs: [
		isPRConversation,
		isMergedPR,
	],
	awaitDomReady: true, // It must look for the merge commit
	init,
}, {
	// This catches a PR while it's being merged
	asLongAs: [
		isPRConversation,
		isOpenConversation,
		userHasPushAccess,
	],
	awaitDomReady: true, // Post-load user event, no need to listen earlier
	init(signal) {
		onPrMerge(addReleaseBanner, signal);
	},
});

/*
Test URLs

- PR: https://github.com/refined-github/refined-github/pull/5600
- Locked PR: https://github.com/eslint/eslint/pull/17
- Archived repo: https://github.com/fregante/iphone-inline-video/pull/130
- Junk tag: https://github.com/refined-github/sandbox/pull/1
	- See: https://github.com/refined-github/sandbox/branch_commits/f743c334f6475021ef133591b587bc282c0cf4c4
- Normal tag: https://togithub.com/refined-github/refined-github/pull/7127
	- See https://github.com/refined-github/refined-github/branch_commits/5321825
- Nightly tag: https://togithub.com/neovim/neovim/pull/22060
	- see: https://github.com/neovim/neovim/branch_commits/27b81af

*/
