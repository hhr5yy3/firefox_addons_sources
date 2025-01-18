import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isForkedRepo, isRepoMainSettings, canUserEditRepo } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import pluralize from '../helpers/pluralize.js';
import { getUsername, getRepo, getForkedRepo } from '../github-helpers/index.js';
import GetPRs from './show-open-prs-of-forks.gql.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

function getLinkCopy(count) {
	return pluralize(count, 'one open pull request', 'at least $$ open pull requests');
}

const countPRs = new CachedFunction('prs-on-forked-repo', {
	async updater(forkedRepo) {
		const {search} = await api.v4(GetPRs, {
			variables: {
				query: `is:pr is:open archived:false repo:${forkedRepo} author:${getUsername()}`,
			},
		});

		// Only show PRs originated from the current repo
		const prs = search.nodes.filter((pr) => pr.headRepository.nameWithOwner === getRepo().nameWithOwner);

		// If only one is found, pass the PR number so we can link to the PR directly
		if (prs.length === 1) {
			return {count: 1, firstPr: prs[0].number};
		}

		return {count: prs.length};
	},
	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 2},
	cacheKey: ([forkedRepo]) => `${forkedRepo}:${getRepo().nameWithOwner}`,
});

// eslint-disable-next-line ts/no-restricted-types
async function getPRs() {
	// Wait for the tab bar to be loaded
	// Maybe replace with https://github.com/refined-github/github-url-detection/issues/85
	await elementReady('.UnderlineNav-body');
	if (!canUserEditRepo()) {
		return [];
	}

	const forkedRepo = getForkedRepo();
	const {count, firstPr} = await countPRs.get(forkedRepo);
	if (count === 1) {
		return [count, `/${forkedRepo}/pull/${firstPr}`];
	}

	const url = new URL(`/${forkedRepo}/pulls`, location.origin);
	url.searchParams.set('q', 'is:pr is:open sort:updated-desc author:@me');
	return [count, url.href];
}

async function initHeadHint() {
	const [count, url] = await getPRs();
	if (!count) {
		return false;
	}

	expectElement(`[data-hovercard-type="repository"][href="/${getForkedRepo()}"]`).after(
		// The class is used by `quick-fork-deletion`
		React.createElement(React.Fragment, null, " with "  , React.createElement('a', { href: url, className: "rgh-open-prs-of-forks",}, getLinkCopy(count))),
	);
}

async function initDeleteHint() {
	const [count, url] = await getPRs();
	if (!count) {
		return false;
	}

	expectElement('details-dialog[aria-label*="Delete"] .Box-body p:first-child').after(
		React.createElement('p', { className: "flash flash-warn" ,}, "It will also abandon "
    , React.createElement('a', { href: url,}, "your " , getLinkCopy(count)), " in "  , React.createElement('strong', null, getForkedRepo()), " and you’ll no longer be able to edit "         , count === 1 ? 'it' : 'them', "."
),
	);
}

void features.add(import.meta.url, {
	asLongAs: [
		isForkedRepo,
	],
	deduplicate: 'has-rgh',
	init: initHeadHint,
}, {
	asLongAs: [
		isForkedRepo,
	],
	include: [
		isRepoMainSettings,
	],
	deduplicate: 'has-rgh',
	init: initDeleteHint,
});

/*

Test URLs:

1. Visit https://github.com/pulls?q=is%3Apr+is%3Aopen+author%3A%40me+archived%3Afalse+-user%3A%40me
2. Find a PR made from a fork
3. In it, open your own fork

*/
