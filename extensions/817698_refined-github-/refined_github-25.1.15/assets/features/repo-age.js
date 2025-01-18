import twas from '../npm/twas-index.es.js';
import '../npm/webext-storage-cache.js';
import React from '../npm/dom-chef.js';
import RepoIcon from '../npm/octicons-plain-react-components-Repo.js';
import elementReady from '../npm/element-ready.js';
import { isRepoRoot, isEmptyRepoRoot } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { cacheByRepo } from '../github-helpers/index.js';
import GetRepoAge from './repo-age.gql.js';
import GetFirstCommit from './repo-age-first-commit.gql.js';
import { randomArrayItem } from '../helpers/math.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const fresh = [
	'Freshly baked',
	'Freshly brewed',
	'Newly minted',
	'Hot off the presses',
	'Straight out of the oven',
	'Still hot',
	'Smells fresh',
	'Just a baby',
	'It’s my birthday',
	'Brand spanking new',
	'It’s a new world ✨',
	'Certified Fresh Repo™',
	'So it begins, the great battle of our time',
];

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
});

async function getRepoAge(commitSha, commitsCount) {
	const {repository} = await api.v4(GetRepoAge, {
		variables: {
			cursor: `${commitSha} ${commitsCount - Math.min(6, commitsCount)}`,
		},
	});

	const {committedDate, resourcePath} = repository.defaultBranchRef.target.history.nodes
		.reverse()
		// Filter out any invalid commit dates #3185
		.find((commit) => new Date(commit.committedDate).getFullYear() > 1970);

	return [committedDate, resourcePath];
}

const firstCommit = new CachedFunction('first-commit', {
	async updater() {
		const {repository} = await api.v4(GetFirstCommit);

		const {oid: commitSha, history, committedDate, resourcePath} = repository.defaultBranchRef.target ;
		const commitsCount = history.totalCount;
		if (commitsCount === 1) {
			return [committedDate, resourcePath];
		}

		return getRepoAge(commitSha, commitsCount);
	},
	cacheKey: cacheByRepo,
});

async function init() {
	const [firstCommitDate, firstCommitHref] = await firstCommit.get();
	const birthday = new Date(firstCommitDate);

	// `twas` could also return `an hour ago` or `just now`
	const [value, unit] = twas(birthday.getTime())
		.replace('just now', '1 second')
		.replace(/^an?/, '1')
		.split(' ');

	// About a day old or less ?
	const age = Date.now() - birthday.getTime() < 10e7
		? randomArrayItem(fresh)
		: React.createElement(React.Fragment, null, React.createElement('strong', null, value), " " , unit, " old" );

	const sidebarForksLinkIcon = await elementReady('.BorderGrid .octicon-repo-forked');
	sidebarForksLinkIcon.closest('.mt-2').append(
		React.createElement('h3', { className: "sr-only",}, "Repository age" ),
		React.createElement('div', { className: "mt-2",}
, React.createElement('a', { href: firstCommitHref, className: "Link--muted", title: `First commit dated ${dateFormatter.format(birthday)}`,}
, React.createElement(RepoIcon, { className: "mr-2",} ), " " , age
)
),
	);
}

void features.add(import.meta.url, {
	include: [
		isRepoRoot,
	],
	exclude: [
		isEmptyRepoRoot,
	],
	deduplicate: 'has-rgh-inner',
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox
https://github.com/refined-github/sandbox/tree/6619

*/
