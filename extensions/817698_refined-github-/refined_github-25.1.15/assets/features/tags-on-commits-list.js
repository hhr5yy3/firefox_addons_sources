import React from '../npm/dom-chef.js';
import cache from '../npm/webext-storage-cache-legacy.js';
import { $$, expectElements, expectElement } from '../npm/select-dom.js';
import TagIcon from '../npm/octicons-plain-react-components-Tag.js';
import { isRepoCommitList } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { getCommitHash } from './mark-merge-commits-in-list.js';
import { getRepo, buildRepoURL } from '../github-helpers/index.js';
import GetTagsOnCommit from './tags-on-commits-list.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import delay from '../helpers/delay.js';

const arrayUnion = (x, y) => [...new Set([...x, ...y])];





















function mergeTags(oldTags, newTags) {
	const result = {...oldTags};
	for (const commit of Object.keys(newTags)) {
		result[commit] = result[commit]
			? arrayUnion(result[commit], newTags[commit])
			: newTags[commit];
	}

	return result;
}

function isTagTarget(target) {
	return 'tagger' in target;
}

async function getTags(lastCommit, after) {
	const {repository} = await api.v4(GetTagsOnCommit, {
		variables: {
			commit: lastCommit,
			...after && {after},
		},
	});
	const nodes = repository.refs.nodes ;

	// If there are no tags in the repository
	if (nodes.length === 0) {
		return {};
	}

	let tags = {};
	for (const node of nodes) {
		const commit = node.target.commitResourcePath.split('/')[4];
		tags[commit] ||= [];

		tags[commit].push(node.name);
	}

	const lastTag = nodes.at(-1).target;
	const lastTagIsYounger = new Date(repository.object.committedDate) < new Date(isTagTarget(lastTag) ? lastTag.tagger.date : lastTag.committedDate);

	// If the last tag is newer than last commit on the page, then not all commits are accounted for, keep looking
	if (lastTagIsYounger && repository.refs.pageInfo.hasNextPage) {
		tags = mergeTags(tags, await getTags(lastCommit, repository.refs.pageInfo.endCursor));
	}

	// There are no tags for this commit
	return tags;
}

async function init() {
	await expectToken();
	const cacheKey = `tags:${getRepo().nameWithOwner}`;

	let commitsOnPage = $$('[data-testid="commit-row-item"]');
	if (commitsOnPage.length === 0) {
		// Try waiting a bit longer
		// https://github.com/refined-github/refined-github/issues/7954
		await delay(1000);
		commitsOnPage = expectElements('[data-testid="commit-row-item"]');
	}

	const lastCommitOnPage = getCommitHash(commitsOnPage.at(-1));
	let cached = await cache.get(cacheKey) ?? {};
	const commitsWithNoTags = [];
	for (const commit of commitsOnPage) {
		const targetCommit = getCommitHash(commit);
		let targetTags = cached[targetCommit];

		if (!targetTags) {
			// No tags for this commit found in the cache, check in github
			cached = mergeTags(cached, await getTags(lastCommitOnPage)); // eslint-disable-line no-await-in-loop
			targetTags = cached[targetCommit];
		}

		if (!targetTags) {
			// There was no tag for this commit, save that info to the cache
			commitsWithNoTags.push(targetCommit);
		} else if (targetTags.length > 0) {
			const commitMeta = expectElement('div[data-testid="list-view-item-description"]', commit);

			commitMeta.append(
				React.createElement('span', { className: "d-flex flex-items-center gap-1"  ,}
, React.createElement(TagIcon, { className: "ml-1",} )
, ...targetTags.map(tag => (
						React.createElement(React.Fragment, null
, ' '
/* .markdown-title enables the background color */
, React.createElement('a', {
								className: "Link--muted markdown-title" ,
								href: buildRepoURL('releases/tag', tag),}

, React.createElement('code', null, tag)
)
)
					))
),
			);
			commit.classList.add('rgh-tagged');
		}
	}

	if (commitsWithNoTags.length > 0) {
		for (const commit of commitsWithNoTags) {
			cached[commit] = [];
		}
	}

	await cache.set(cacheKey, cached, {days: 1});
}

void features.add(import.meta.url, {
	include: [
		isRepoCommitList,
	],
	awaitDomReady: true,
	deduplicate: 'has-rgh-inner',
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/commits/19.5.21.1921

*/
