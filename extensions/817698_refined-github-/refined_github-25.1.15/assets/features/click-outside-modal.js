import { isBranches, isRepoCommitList, isRepoTree, isSingleFile } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';

function onButtonClick({delegateTarget: delegate, target}) {
	// Only close if clicking outside of modal
	if (delegate === target) {
		delegate.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'Escape', code: 'Escape'}));
	}
}

function init(signal) {
	delegate('[class*="Dialog__Backdrop-"]', 'click', onButtonClick, {signal});
}

void features.add(import.meta.url, {
	include: [
		isBranches,
		isRepoCommitList,
		isRepoTree,
		isSingleFile,
	],
	init,
});

/*

## Test URLs

- https://github.com/refined-github/refined-github
- https://github.com/refined-github/refined-github/branches
- https://github.com/refined-github/refined-github/commits/main/
- https://github.com/refined-github/refined-github/blob/main/package.json

*/
