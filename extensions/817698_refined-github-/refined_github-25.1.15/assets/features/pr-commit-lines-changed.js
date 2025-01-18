import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import elementReady from '../npm/element-ready.js';
import { isPRCommit } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import pluralize from '../helpers/pluralize.js';
import GetCommitChanges from './pr-commit-lines-changed.gql.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const commitChanges = new CachedFunction('commit-changes', {
	async updater(commit) {
		const {repository} = await api.v4(GetCommitChanges, {
			variables: {
				commit,
			},
		});

		return [repository.object.additions, repository.object.deletions];
	},
});

async function init() {
	const commitSha = location.pathname.split('/').pop();
	const [additions, deletions] = await commitChanges.get(commitSha);
	const tooltip = pluralize(additions + deletions, '1 line changed', '$$ lines changed');
	const diffstat = await elementReady('.diffstat', {waitForChildren: false});
	diffstat.replaceWith(
		React.createElement('span', { className: "ml-2 diffstat tooltipped tooltipped-s"   , 'aria-label': tooltip,}
, React.createElement('span', { className: "color-fg-success",}, "+", additions), ' '
, React.createElement('span', { className: "color-fg-danger",}, "−", deletions), ' '
, React.createElement('span', { className: "diffstat-block-neutral",} )
, React.createElement('span', { className: "diffstat-block-neutral",} )
, React.createElement('span', { className: "diffstat-block-neutral",} )
, React.createElement('span', { className: "diffstat-block-neutral",} )
, React.createElement('span', { className: "diffstat-block-neutral",} )
),
	);
}

void features.add(import.meta.url, {
	include: [
		isPRCommit,
	],
	deduplicate: 'has-rgh-inner',
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/pull/6674/commits/3d93b7823e3c31d3bd1900ab1ec98f5ce41203bf

*/
