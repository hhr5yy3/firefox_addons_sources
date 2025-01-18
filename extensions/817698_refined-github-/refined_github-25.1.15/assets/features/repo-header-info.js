import { hasRepoHeader } from '../npm/github-url-detection.js';
import LockIcon from '../npm/octicons-plain-react-components-Lock.js';
import RepoForkedIcon from '../npm/octicons-plain-react-components-RepoForked.js';
import StarIcon from '../npm/octicons-plain-react-components-Star.js';
import StarFillIcon from '../npm/octicons-plain-react-components-StarFill.js';
import React from '../npm/dom-chef.js';
import { elementExists } from '../npm/select-dom.js';
import '../npm/webext-storage-cache.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import GetRepositoryInfo from './repo-header-info.gql.js';
import { cacheByRepo, buildRepoURL } from '../github-helpers/index.js';
import abbreviateNumber from '../helpers/abbreviate-number.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const repositoryInfo = new CachedFunction('stargazer-count', {
	async updater() {
		const {repository} = await api.v4(GetRepositoryInfo);
		return repository;
	},
	maxAge: {days: 1},
	staleWhileRevalidate: {days: 3},
	cacheKey: cacheByRepo,
});

async function add(repoLink) {
	const {isFork, isPrivate, stargazerCount, viewerHasStarred} = await repositoryInfo.get();

	// GitHub may already show this icon natively, so we match its position
	if (isPrivate && !elementExists('.octicon-lock', repoLink)) {
		repoLink.append(
			React.createElement(LockIcon, { className: "ml-1", width: 12, height: 12,} ),
		);
	}

	// GitHub may already show this icon natively, so we match its position
	if (isFork && !elementExists('.octicon-repo-forked', repoLink)) {
		repoLink.append(
			React.createElement(RepoForkedIcon, { className: "ml-1", width: 12, height: 12,} ),
		);
	}

	if (stargazerCount > 1) {
		let tooltip = `Repository starred by ${stargazerCount.toLocaleString('us')} people`;
		if (viewerHasStarred) {
			tooltip += ', including you';
		}

		repoLink.after(
			React.createElement('a', {
				href: buildRepoURL('stargazers'),
				title: tooltip,
				className: "d-flex flex-items-center flex-justify-center mr-1 gap-1 color-fg-muted"     ,}

, 
					viewerHasStarred
						// Use `color` because `fill` is overridden with `currentColor`
						? React.createElement(StarFillIcon, { className: "ml-1", width: 12, height: 12, color: "var(--button-star-iconColor)",} )
						: React.createElement(StarIcon, { className: "ml-1", width: 12, height: 12,} )
				
, React.createElement('span', { className: "f5",}, abbreviateNumber(stargazerCount))
),
		);
	}
}

async function init(signal) {
	await expectToken();
	observe('.AppHeader-context-full li:last-child a.AppHeader-context-item', add, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRepoHeader,
	],
	init,
});

/*
Test URLs

- Regular: https://github.com/refined-github/refined-github
- Fork: https://github.com/134130/refined-github
- Fork with native icon: https://github.com/refined-github/fork
- Private: https://github.com/refined-github/private
- Private fork: https://github.com/refined-github/fork

*/
