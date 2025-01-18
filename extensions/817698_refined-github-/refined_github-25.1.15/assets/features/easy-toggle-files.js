import { expectElement } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { hasFiles, isGistRevision, isGlobalSearchResults } from '../npm/github-url-detection.js';
import { codeSearchHeader } from '../github-helpers/selectors.js';
import features from '../feature-manager.js';

function toggleFile(event) {
	const elementClicked = event.target ;
	const headerBar = event.delegateTarget;

	// The clicked element is either the bar itself or one of its 2 children
	if (elementClicked === headerBar || elementClicked.parentElement === headerBar) {
		expectElement('[aria-label="Toggle diff contents"]', headerBar)
			.dispatchEvent(new MouseEvent('click', {bubbles: true, altKey: event.altKey}));
	}
}

function toggleCodeSearchFile(event) {
	const elementClicked = event.target ;
	const headerBar = event.delegateTarget;
	const toggle = expectElement(':scope > button', headerBar);

	// The clicked element is either the bar itself or one of its children excluding the button
	if (elementClicked === headerBar || (elementClicked.parentElement === headerBar && elementClicked !== toggle)) {
		toggle.dispatchEvent(new MouseEvent('click', {bubbles: true, altKey: event.altKey}));
	}
}

function init(signal) {
	delegate('.file-header', 'click', toggleFile, {signal});
}

function initSearchPage(signal) {
	delegate(codeSearchHeader, 'click', toggleCodeSearchFile, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasFiles,
		isGistRevision,
	],
	init,
}, {
	include: [
		isGlobalSearchResults,
	],
	init: initSearchPage,
});

/*

## Test URLs

- Pull Request: https://github.com/refined-github/refined-github/pull/7036/files
- Code Search: https://github.com/search?q=repo%3Arefined-github%2Frefined-github%20easy&type=code

*/
