import { expectElement } from '../npm/select-dom.js';
import { isIssue, isPR } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { onConversationTitleFieldKeydown } from '../github-events/on-field-keydown.js';

function handleEscPress(event) {
	if (event.key === 'Escape') {
		expectElement('.js-cancel-issue-edit').click();

		event.stopImmediatePropagation();
		event.preventDefault();
	}
}

function init(signal) {
	onConversationTitleFieldKeydown(handleEscPress, signal);
}

// TODO: Drop in March 2025, implemented by GitHub
// https://github.com/refined-github/refined-github/pull/7892
void features.add(import.meta.url, {
	shortcuts: {
		esc: 'Cancel editing a conversation title',
	},
	include: [
		isIssue,
		isPR,
	],
	init,
});

/*

Test URLs:

1. Visit https://github.com/issues?q=+archived%3Afalse+author%3A%40me
2. Open any issue/PR
3. Try to edit the title
4. Press Esc

*/
