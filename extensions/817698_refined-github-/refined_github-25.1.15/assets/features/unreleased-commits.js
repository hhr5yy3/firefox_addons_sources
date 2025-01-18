import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { isRepoHome } from '../npm/github-url-detection.js';
import PlusIcon from '../npm/octicons-plain-react-components-Plus.js';
import TagIcon from '../npm/octicons-plain-react-components-Tag.js';
import { elementExists, $ } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import api from '../github-helpers/api.js';
import { getLatestVersionTag, cacheByRepo, getRepo, buildRepoURL } from '../github-helpers/index.js';
import isDefaultBranch from '../github-helpers/is-default-branch.js';
import pluralize from '../helpers/pluralize.js';
import { branchSelector } from '../github-helpers/selectors.js';
import getPublishRepoState from './unreleased-commits.gql.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import abbreviateString from '../helpers/abbreviate-string.js';
import { wrapAll } from '../helpers/dom-utils.js';
import { groupButtons } from '../github-helpers/group-buttons.js';
import { expectToken } from '../github-helpers/github-token.js';
import { userHasPushAccess } from '../github-helpers/get-user-permission.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const undeterminableAheadBy = Number.MAX_SAFE_INTEGER; // For when the branch is ahead by more than 20 commits #5505

const repoPublishState = new CachedFunction('tag-ahead-by', {
	async updater() {
		const {repository} = await api.v4(getPublishRepoState);

		if (repository.refs.nodes.length === 0) {
			return {
				latestTag: false,
				aheadBy: 0,
			};
		}

		const tags = new Map();
		for (const node of repository.refs.nodes ) {
			tags.set(node.name, node.tag.commit?.oid ?? node.tag.oid);
		}

		// If this logic ever gets dropped or becomes simpler, consider using the native "compare" API
		// https://github.com/refined-github/refined-github/issues/6094
		const latestTag = getLatestVersionTag([...tags.keys()]);
		const latestTagOid = tags.get(latestTag);
		const aheadBy = repository.defaultBranchRef.target.history.nodes.findIndex((node) => node.oid === latestTagOid);

		return {
			latestTag,
			aheadBy: aheadBy === -1 ? undeterminableAheadBy : aheadBy,
		};
	},
	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 2},
	cacheKey: cacheByRepo,
});

async function createLink(
	latestTag,
	aheadBy,
) {
	const commitCount
		= aheadBy === undeterminableAheadBy
			? 'More than 20 unreleased commits'
			: pluralize(aheadBy, '$$ unreleased commit');
	const label = `${commitCount}\nsince ${abbreviateString(latestTag, 30)}`;

	return (
		React.createElement('a', {
			className: "btn px-2 tooltipped tooltipped-se"   ,
			href: buildRepoURL('compare', `${latestTag}...${await getDefaultBranch()}`),
			'aria-label': label,}

, React.createElement(TagIcon, { className: "v-align-middle",} )
, aheadBy === undeterminableAheadBy || React.createElement('sup', { className: "ml-n2",}, " +" , aheadBy)
)
	);
}

async function createLinkGroup(latestTag, aheadBy) {
	const link = await createLink(latestTag, aheadBy);
	if (!(await userHasPushAccess())) {
		return link;
	}

	return groupButtons([
		link,
		// `aria-label` wording taken from $user/$repo/releases page
		React.createElement('a', {
			href: buildRepoURL('releases/new'),
			className: "btn px-2 tooltipped tooltipped-se"   ,
			'aria-label': "Draft a new release"   ,
			'data-turbo-frame': "repo-content-turbo-frame",}

, React.createElement(PlusIcon, { className: "v-align-middle",} )
),
	]);
}

async function addToHome(branchSelector) {
	// React issues. Duplicates appear after a color scheme update
	// https://github.com/refined-github/refined-github/issues/7536
	if (elementExists('.rgh-unreleased-commits-wrapper')) {
		return;
	}

	const {latestTag, aheadBy} = await repoPublishState.get();
	const isAhead = aheadBy > 0;

	if (!latestTag || !isAhead) {
		return;
	}

	const linkGroup = await createLinkGroup(latestTag, aheadBy);
	linkGroup.style.flexShrink = '0';

	wrapAll(
		React.createElement('div', { className: "d-flex gap-2 rgh-unreleased-commits-wrapper"  ,} ),
		branchSelector,
		linkGroup,
	);
}

async function addToReleases(releasesFilter) {
	const {latestTag, aheadBy} = await repoPublishState.get();
	const isAhead = aheadBy > 0;

	if (!latestTag || !isAhead) {
		return;
	}

	const widget = await createLink(latestTag, aheadBy);

	// Prepend it to the existing "Draft a new release" button to match the button on the repo home
	const newReleaseButton = $('nav + div a[href$="/releases/new"]');
	if (newReleaseButton) {
		newReleaseButton.before(widget);
		groupButtons([
			widget,
			newReleaseButton,
		]);
		return;
	}

	// Otherwise, add it before filter input
	releasesFilter.form.before(widget);
	releasesFilter.form.parentElement.classList.add('d-flex', 'flex-items-start');
	// The form has .ml-md-2, this restores it on `sm`
	widget.classList.add('mr-md-0', 'mr-2');
}

async function initHome(signal) {
	await expectToken();
	observe(branchSelector, addToHome, {signal});
}

async function initReleases(signal) {
	await expectToken();
	observe('input#release-filter', addToReleases, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isDefaultBranch,
	],
	include: [
		isRepoHome,
	],
	init: initHome,
}, {
	include: [
		// Only first page of Releases
		() => getRepo()?.path === 'releases',
	],
	init: initReleases,
});

/*

Test URLs

Repo with no tags (no button)
https://github.com/refined-github/yolo

Repo with too many unreleased commits
https://github.com/refined-github/sandbox

Repo with some unreleased commits
https://github.com/refined-github/refined-github

Releases page with unreleased commits
https://github.com/facebook/react/releases

Releases page with unreleased commits (user can release)
https://github.com/refined-github/refined-github/releases

Releases page with changelog file
https://github.com/fczbkk/css-selector-generator/releases

*/
