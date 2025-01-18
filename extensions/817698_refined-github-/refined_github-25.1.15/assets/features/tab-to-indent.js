import { eventHandler } from '../npm/indent-textarea.js';
import { hasRichTextEditor } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { onCommentFieldKeydown } from '../github-events/on-field-keydown.js';

function init(signal) {
	onCommentFieldKeydown(eventHandler, signal);
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/issues/new?template=1_bug_report.yml

*/
