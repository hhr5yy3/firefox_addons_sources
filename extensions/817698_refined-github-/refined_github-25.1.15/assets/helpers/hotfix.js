import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { isEnterprise } from '../npm/github-url-detection.js';
import compareVersions from '../npm/tiny-version-compare.js';
import { any } from '../npm/code-tag.js';
import isDevelopmentVersion from './is-development-version.js';
import { isomorphicFetchText } from './isomorphic-fetch.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

const {version: currentVersion} = chrome.runtime.getManifest();

function parseCsv(content) {
	const lines = [];
	const [_header, ...rawLines] = content.trim().split('\n');
	for (const line of rawLines) {
		if (line.trim()) {
			lines.push(line.split(',').map(cell => cell.trim()));
		}
	}

	return lines;
}

async function fetchHotfix(path) {
	// Use GitHub Pages host because the API is rate-limited
	return isomorphicFetchText(`https://refined-github.github.io/yolo/${path}`, {
		cache: 'no-store', // Disable caching altogether
	});
}



const brokenFeatures = new CachedFunction('broken-features', {
	async updater() {
		const content = await fetchHotfix('broken-features.csv');
		if (!content) {
			return [];
		}

		const storage = [];
		for (const [featureID, relatedIssue, unaffectedVersion] of parseCsv(content)) {
			if (featureID && relatedIssue && (!unaffectedVersion || compareVersions(unaffectedVersion, currentVersion) > 0)) {
				storage.push([featureID , relatedIssue, unaffectedVersion]);
			}
		}

		return storage;
	},
	maxAge: {hours: 6},
	staleWhileRevalidate: {days: 30},
});

const styleHotfixes = new CachedFunction('style-hotfixes', {
	updater: async (version) => fetchHotfix(`style/${version}.css`),

	maxAge: {hours: 6},
	staleWhileRevalidate: {days: 300},
	cacheKey: () => '',
});

async function getLocalHotfixes() {
	// To facilitate debugging, ignore hotfixes during development.
	// Change the version in manifest.json to test hotfixes
	if (isDevelopmentVersion()) {
		return [];
	}

	return await brokenFeatures.get() ?? [];
}

async function getLocalHotfixesAsOptions() {
	const options = {};
	for (const [feature] of await getLocalHotfixes()) {
		options[`feature:${feature}`] = false;
	}

	return options;
}

async function applyStyleHotfixes(style) {
	if (isDevelopmentVersion() || isEnterprise() || !style) {
		return;
	}

	// Prepend to body because that's the only way to guarantee they come after the static file
	document.body.prepend(React.createElement('style', null, style));
}

let localStrings = {};
function _(...arguments_) {
	const original = any(...arguments_);
	return localStrings[original] ?? original;
}

const localStringsHotfix = new CachedFunction('strings-hotfixes', {
	async updater() {
		const json = await fetchHotfix('strings.json');
		return json ? JSON.parse(json) : {};
	},
	maxAge: {hours: 6},
	staleWhileRevalidate: {days: 30},
});

// Updates the local object from the storage to enable synchronous access
async function preloadSyncLocalStrings() {
	if (isDevelopmentVersion() || isEnterprise()) {
		return;
	}

	localStrings = await localStringsHotfix.get() ?? {};
}

export { _, applyStyleHotfixes, brokenFeatures, getLocalHotfixes, getLocalHotfixesAsOptions, preloadSyncLocalStrings, styleHotfixes };
