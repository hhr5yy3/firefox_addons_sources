import React from '../npm/dom-chef.js';
import { $ } from '../npm/select-dom.js';
import { isPRFiles, isCommit } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function add(filename) {
	const list = $('ul[aria-label="File Tree"]');
	if (!list && isCommit()) {
		// Silence error, single-file commits don't have the file list
		return;
	}

	const fileInList = $(`[href="${filename.hash}"]`, list);
	if (!fileInList) {
		features.unload(import.meta.url);
		throw new Error('Could not find file in sidebar, is the sidebar loaded?');
	}

	const icon = $(['.octicon-diff-removed', '.octicon-diff-added'], fileInList)
		?.cloneNode(true);
	if (icon) {
		// `span` needed for native vertical alignment
		filename.parentElement.append(React.createElement('span', { className: "ml-1",}, icon));
	}
}

async function init(signal) {
	// Link--primary excludes CODEOWNERS icon #5565
	observe('.file-info a.Link--primary', add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
		isCommit,
	],
	init,
});

/*

## Test URLs

Commit: https://github.com/refined-github/sandbox/commit/a00694ff7370d46b5f6d723a0b39141903dae45a
PR: https://github.com/refined-github/sandbox/pull/71/files
PR with CODEOWNERS: https://github.com/dotnet/winforms/pull/6028/files

Note: Not possible with 1-file commits: https://github.com/refined-github/sandbox/commit/1ed862e3abd13004009927b26355a51a109d6855

*/
