import { hasRichTextEditor, isEditingFile } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import filterAlteredClicks from '../npm/filter-altered-clicks.js';
import features from '../feature-manager.js';

function openInNewTab(event) {
	event.preventDefault();
	window.open(event.delegateTarget.href, '_blank');
}

function init(signal) {
	delegate(
		[
			'.js-preview-body a', // `hasRichTextEditor`
			'.html-blob a', // `isEditingFile`
		],
		'click',
		filterAlteredClicks(openInNewTab),
		{signal},
	);
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
		isEditingFile,
	],
	init,
});

/*

## Test URLs

https://github.com/refined-github/sandbox/issues/new
https://github.com/refined-github/refined-github/edit/main/readme.md

*/
