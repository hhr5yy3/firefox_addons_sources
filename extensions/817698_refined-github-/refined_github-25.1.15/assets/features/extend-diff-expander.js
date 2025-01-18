import { expectElement } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { hasFiles } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

const lineSelectors = [
	'.diff-view .js-expandable-line', // Expandable lines in old view
	'.diff-line-row:has(button[data-direction])', // React view
];

const nativeButtonSelector = [
	'.js-expand', // Expand button in old view
	'button[data-direction]', // React view
];

function expandDiff(event) {
	// Skip if the user clicked directly on the icon
	if (!(event.target ).closest(nativeButtonSelector)) {
		expectElement(nativeButtonSelector, event.delegateTarget).click();
	}
}

function init(signal) {
	document.body.classList.add('rgh-extend-diff-expander');
	delegate(lineSelectors, 'click', expandDiff, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasFiles,
	],
	init,
});

/*

Test URLs:

- PR: https://github.com/refined-github/refined-github/pull/940/files
- Compare: https://github.com/microsoft/TypeScript/compare/v4.1.2...v4.1.3
- Commit: https://github.com/microsoft/TypeScript/commit/9d25e593ab722d9cf203690de94e36f8588e968e
*/
