import React from '../npm/dom-chef.js';
import { expectElement, elementExists } from '../npm/select-dom.js';
import { isRepoTree, isSingleFile, isRepoFile404, isRepoRoot } from '../npm/github-url-detection.js';
import CodeIcon from '../npm/octicons-plain-react-components-Code.js';
import PlusIcon from '../npm/octicons-plain-react-components-Plus.js';
import SearchIcon from '../npm/octicons-plain-react-components-Search.js';
import observe from '../helpers/selector-observer.js';
import { assertNodeContent, wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';

/** Add tooltip on a wrapper to avoid breaking dropdown functionality */
function addTooltipToSummary(childElement, tooltip) {
	wrap(
		childElement.closest('details'),
		React.createElement('div', { className: "tooltipped tooltipped-ne" , 'aria-label': tooltip,} ),
	);
}

function cleanFilelistActions(searchButton) {
	searchButton.classList.add('tooltipped', 'tooltipped-ne');
	searchButton.setAttribute('aria-label', 'Go to file');

	// Replace "Go to file" with  icon
	searchButton.firstChild.replaceWith(React.createElement(SearchIcon, null ));

	// This button doesn't appear on `isSingleFile`
	const addFileDropdown = searchButton.nextElementSibling.querySelector('.dropdown-caret');
	if (addFileDropdown) {
		addFileDropdown.parentElement.classList.replace('d-md-flex', 'd-md-block');

		// Replace label with icon
		assertNodeContent(addFileDropdown.previousSibling, 'Add file')
			.replaceWith(React.createElement(PlusIcon, null ));

		addTooltipToSummary(addFileDropdown, 'Add file');
	}

	if (!isRepoRoot()) {
		return;
	}

	const codeDropdownButton = expectElement('get-repo summary');
	addTooltipToSummary(codeDropdownButton, 'Clone, open or download');

	const label = expectElement('.Button-label', codeDropdownButton);
	if (!elementExists('.octicon-code', codeDropdownButton)) {
		// The icon is missing for users without Codespaces https://github.com/refined-github/refined-github/pull/5074#issuecomment-983251719
		label.before(React.createElement('span', { className: "Button-visual Button-leadingVisual" ,}, React.createElement(CodeIcon, null )));
	}

	label.remove();
}

function init(signal) {
	// `.btn` selects the desktop version
	observe('.btn[data-hotkey="t"]', cleanFilelistActions, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoTree,
		isSingleFile,
	],
	exclude: [
		isRepoFile404,
	],
	init,
});

/*

Test URLs
https://github.com/refined-github/sandbox
https://github.com/refined-github/sandbox/tree/branch/with/slashes

*/
