import '../npm/webext-storage-cache.js';
import { countElements, expectElement, $ } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { hasRepoHeader, isOrganizationProfile, isRepo, canUserEditRepo } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import fetchDom from '../helpers/fetch-dom.js';
import api from '../github-helpers/api.js';
import getTabCount from '../github-helpers/get-tab-count.js';
import looseParseInt from '../helpers/loose-parse-int.js';
import abbreviateNumber from '../helpers/abbreviate-number.js';
import { buildRepoURL, cacheByRepo, getRepo } from '../github-helpers/index.js';
import { unhideOverflowDropdown } from './more-dropdown-links.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

async function canUserEditOrganization() {
	return Boolean(await elementReady('.btn-primary[href$="repositories/new"]'));
}

function mustKeepTab(tab) {
	return (
		// User is on tab 👀
		tab.matches('.selected')
		// Repo owners should see the tab. If they don't need it, they should disable the feature altogether
		|| canUserEditRepo()
	);
}

function setTabCounter(tab, count) {
	const tabCounter = expectElement('.Counter', tab);
	tabCounter.textContent = abbreviateNumber(count);
	tabCounter.title = count > 999 ? String(count) : '';
}

function onlyShowInDropdown(id) {
	// TODO: Use selector observer
	const tabItem = $(`li:not([hidden]) > [data-tab-item$="${id}"]`);
	if (!tabItem) { // #3962 #7140
		return;
	}

	tabItem.closest('li').hidden = true;

	const menuItem = expectElement(`[data-menu-item$="${id}"]`);
	menuItem.removeAttribute('data-menu-item');
	menuItem.hidden = false;
	// The item has to be moved somewhere else because the overflow nav is order-dependent
	expectElement('.UnderlineNav-actions ul').append(menuItem);
}

const wikiPageCount = new CachedFunction('wiki-page-count', {
	async updater() {
		const dom = await fetchDom(buildRepoURL('wiki'));
		const counter = dom.querySelector('#wiki-pages-box .Counter');

		if (counter) {
			return looseParseInt(counter);
		}

		return countElements('#wiki-content > .Box .Box-row', dom);
	},
	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 5},
	cacheKey: cacheByRepo,
});

const hasActionRuns = new CachedFunction('workflows-count', {
	async updater(repoWithOwner) {
		return api.v3hasAnyItems(`/repos/${repoWithOwner}/actions/runs`);
	},
	maxAge: {days: 1},
	staleWhileRevalidate: {days: 10},
});

async function updateWikiTab() {
	const wikiTab = await elementReady('[data-hotkey="g w"]');
	if (!wikiTab || mustKeepTab(wikiTab)) {
		return false;
	}

	const count = await wikiPageCount.get();
	if (count > 0) {
		setTabCounter(wikiTab, count);
	} else {
		onlyShowInDropdown('wiki-tab');
	}
}

async function updateActionsTab() {
	const actionsTab = await elementReady('[data-hotkey="g a"]');
	if (!actionsTab || mustKeepTab(actionsTab) || await hasActionRuns.get(getRepo().nameWithOwner)) {
		return false;
	}

	onlyShowInDropdown('actions-tab');
}

async function updateProjectsTab() {
	const projectsTab = await elementReady('[data-hotkey="g b"]');
	if (!projectsTab || mustKeepTab(projectsTab) || await getTabCount(projectsTab) > 0) {
		return false;
	}

	if (isRepo()) {
		onlyShowInDropdown('projects-tab');
		return;
	}

	if (await canUserEditOrganization()) {
		// Leave Project tab visible to those who can create a new project
		return;
	}

	projectsTab.remove();
}

async function moveRareTabs() {
	// The user may have disabled `more-dropdown-links` so un-hide it
	if (!await unhideOverflowDropdown()) {
		return false;
	}

	// Wait for the nav dropdown to be loaded #5244
	await elementReady('.UnderlineNav-actions ul');
	onlyShowInDropdown('security-tab');
	onlyShowInDropdown('insights-tab');
}

void features.add(import.meta.url, {
	include: [
		hasRepoHeader,
	],
	deduplicate: 'has-rgh',
	init: [
		updateActionsTab,
		updateWikiTab,
		updateProjectsTab,
	],
}, {
	include: [
		hasRepoHeader,
	],
	init: moveRareTabs,
}, {
	include: [
		isOrganizationProfile,
	],
	deduplicate: 'has-rgh',
	init: updateProjectsTab,
});

/*

Test URLs:

- Org with 0 projects: https://github.com/babel
- Repo with 0 projects: https://github.com/babel/flavortown
- Repo with 0 wiki: https://github.com/babel/babel-sublime-snippets
- Repo with 0 actions: https://github.com/babel/jade-babel
- Repo with some actions not on main branch: https://github.com/quatquatt/no-actions-menu

*/
