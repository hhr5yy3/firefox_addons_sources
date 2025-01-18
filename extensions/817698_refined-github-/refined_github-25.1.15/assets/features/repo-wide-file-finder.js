import { elementExists } from '../npm/select-dom.js';
import { isRepo, isEmptyRepo, isPRFiles, isFileFinder } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import { buildRepoURL } from '../github-helpers/index.js';
import getCurrentGitRef from '../github-helpers/get-current-git-ref.js';
import { registerHotkey } from '../github-helpers/hotkey.js';
import { expectToken } from '../github-helpers/github-token.js';

async function init(signal) {
	await expectToken();
	const ref = getCurrentGitRef() ?? await getDefaultBranch();
	const url = buildRepoURL('tree', ref) + '?search=1';
	registerHotkey('t', url, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepo,
	],
	exclude: [
		() => elementExists('[data-hotkey="t"]'),
		isEmptyRepo,
		isPRFiles,
		isFileFinder,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/actions

*/
