import React from '../npm/dom-chef.js';
import { isReleases } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import '../npm/webext-storage-cache.js';
import api from '../github-helpers/api.js';
import features from '../feature-manager.js';
import { cacheByRepo, buildRepoURL } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import GetReleases from './releases-dropdown.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const getReleases = new CachedFunction('releases', {
	async updater() {
		const {repository} = await api.v4(GetReleases);
		return repository.releases.nodes.map(({tagName}) => tagName);
	},
	maxAge: {hours: 1},
	staleWhileRevalidate: {days: 4},
	cacheKey: cacheByRepo,
});

// `datalist` selections don't have an `inputType`
async function selectionHandler(event) {
	const field = event.delegateTarget;
	const selectedTag = field.value;
	const releases = await getReleases.get(); // Expected to be in cache
	if (!('inputType' in event) && releases.includes(selectedTag)) {
		location.href = buildRepoURL('releases/tag', encodeURIComponent(selectedTag));
		field.value = ''; // Can't call `preventDefault`, the `input` event is not cancelable
	}
}

async function addList(searchField) {
	const releases = await getReleases.get();
	if (releases.length === 0) {
		return;
	}

	searchField.setAttribute('list', 'rgh-releases-dropdown');
	searchField.after(
		React.createElement('datalist', { id: "rgh-releases-dropdown",}
, releases.map(tag => React.createElement('option', { value: tag,} ))
),
	);
}

const searchFieldSelector = 'input#release-filter';
async function init(signal) {
	await expectToken();
	observe(searchFieldSelector, addList, {signal});
	delegate(searchFieldSelector, 'input', selectionHandler, {signal});
}

void features.add(import.meta.url, {
	include: [
		isReleases,
	],
	init,
});

/*

## Test URLs

https://github.com/refined-github/refined-github/tags
https://github.com/refined-github/sandbox/releases

*/
