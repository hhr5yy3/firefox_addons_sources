import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import TagIcon from '../npm/octicons-plain-react-components-Tag.js';
import elementReady from '../npm/element-ready.js';
import { hasRepoHeader } from '../npm/github-url-detection.js';
import { $ } from '../npm/select-dom.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import abbreviateNumber from '../helpers/abbreviate-number.js';
import createDropdownItem from '../github-helpers/create-dropdown-item.js';
import { cacheByRepo, getRepo, buildRepoURL, triggerRepoNavOverflow } from '../github-helpers/index.js';
import { appendBefore } from '../helpers/dom-utils.js';
import { repoUnderlineNavUl, repoUnderlineNavDropdownUl } from '../github-helpers/selectors.js';
import GetReleasesCount from './releases-tab.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

function detachHighlightFromCodeTab(codeTab) {
	codeTab.dataset.selectedLinks = codeTab.dataset.selectedLinks.replace('repo_releases ', '');
}

const releasesCount = new CachedFunction('releases-count', {
	updater: fetchCounts,
	shouldRevalidate: cachedValue => typeof cachedValue === 'number',
	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 3},
	cacheKey: cacheByRepo,
});

async function getReleases() {
	const repo = getRepo().nameWithOwner;
	return releasesCount.get(repo);
}

async function fetchCounts(nameWithOwner) {
	const [owner, name] = nameWithOwner.split('/');
	const {repository: {releases, tags}} = await api.v4(GetReleasesCount, {
		variables: {name, owner},
	});

	if (releases.totalCount) {
		return [releases.totalCount, 'Releases'];
	}

	if (tags.totalCount) {
		return [tags.totalCount, 'Tags'];
	}

	return [0];
}

async function addReleasesTab(repoNavigationBar) {
	const [count, type] = await getReleases();
	if (!type) {
		return false;
	}

	// Wait for the dropdown because `observe` fires as soon as it encounter the container. `releases-tab` must be appended.
	await elementReady(repoUnderlineNavUl);

	repoNavigationBar.append(
		React.createElement('li', { className: "d-flex",}
, React.createElement('a', {
				href: buildRepoURL(type.toLowerCase()),
				className: "js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item rgh-releases-tab"     ,
				'data-hotkey': "g r" ,
				'data-selected-links': "repo_releases",
				'data-tab-item': "rgh-releases-item",
				'data-turbo-frame': "repo-content-turbo-frame",}

, React.createElement(TagIcon, { className: "UnderlineNav-octicon d-none d-sm-inline"  ,} )
, React.createElement('span', { 'data-content': type,}, type)
, React.createElement('span', { className: "Counter", title: count > 999 ? String(count) : '',}, abbreviateNumber(count))
)
),
	);

	triggerRepoNavOverflow();
}

async function addReleasesDropdownItem(dropdownMenu) {
	const [, type] = await getReleases();

	if (!type) {
		$('.dropdown-divider', dropdownMenu)?.remove();
		return false;
	}

	appendBefore(
		dropdownMenu,
		'.dropdown-divider', // Won't exist if `clean-repo-tabs` is disabled
		createDropdownItem({
			'label': type,
			'href': buildRepoURL(type.toLowerCase()),
			'icon': TagIcon,
			'data-menu-item': 'rgh-releases-item',
		}),
	);

	triggerRepoNavOverflow();
}

async function init(signal) {
	await expectToken();
	observe(repoUnderlineNavUl, addReleasesTab, {signal});
	observe(repoUnderlineNavDropdownUl, addReleasesDropdownItem, {signal});
	observe(['[data-menu-item="i0code-tab"] a', 'a#code-tab'], detachHighlightFromCodeTab, {signal});
}

void features.add(import.meta.url, {
	shortcuts: {
		'g r': 'Go to Releases',
	},
	include: [
		hasRepoHeader,
	],
	init,
});

/*

Test URLs:

Releases: https://github.com/refined-github/refined-github
Tags: https://github.com/python/cpython

*/

export { getReleases };
