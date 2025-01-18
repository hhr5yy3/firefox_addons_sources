import { isReleasesOrTags, isNewRelease, isEditingRelease } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { registerHotkey } from '../github-helpers/hotkey.js';
import { buildRepoURL } from '../github-helpers/index.js';

function init(signal) {
	// Reasoning for this feature: #1254
	registerHotkey('c', buildRepoURL('releases/new'), {signal});
}

void features.add(import.meta.url, {
	shortcuts: {
		c: 'Create a new release',
	},
	include: [
		isReleasesOrTags,
	],
	exclude: [
		isNewRelease,
		isEditingRelease,
	],
	init,
});

/*

Test URLs

https://github.com/refined-github/refined-github/releases
https://github.com/refined-github/sandbox/releases/new
https://github.com/refined-github/sandbox/releases/tag/cool

*/
