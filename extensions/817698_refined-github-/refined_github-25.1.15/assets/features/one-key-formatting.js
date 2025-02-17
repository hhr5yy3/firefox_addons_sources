import { hasRichTextEditor, isGist, isNewFile, isEditingFile, isDeletingFile } from '../npm/github-url-detection.js';
import { wrapFieldSelection } from '../npm/text-field-edit.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import { onCommentFieldKeydown, onConversationTitleFieldKeydown, onCommitTitleFieldKeydown } from '../github-events/on-field-keydown.js';

const formattingCharacters = ['`', '\'', '"', '[', '(', '{', '*', '_', '~', '“', '‘'];
const matchingCharacters = ['`', '\'', '"', ']', ')', '}', '*', '_', '~', '”', '’'];
const quoteCharacters = new Set(['`', '\'', '"']);

function eventHandler(event) {
	const field = event.delegateTarget;
	const formattingChar = event.key;

	if (!formattingCharacters.includes(formattingChar)) {
		return;
	}

	const [start, end] = [field.selectionStart, field.selectionEnd];

	// If `start` and `end` of selection are the same, then no text is selected
	if (start === end) {
		return;
	}

	// Allow replacing quotes #5960
	if (quoteCharacters.has(formattingChar) && end - start === 1 && quoteCharacters.has(field.value.at(start))) {
		return;
	}

	event.preventDefault();

	const matchingEndChar = matchingCharacters[formattingCharacters.indexOf(formattingChar)];
	wrapFieldSelection(field, formattingChar, matchingEndChar);
}

function init(signal) {
	onCommentFieldKeydown(eventHandler, signal);
	onConversationTitleFieldKeydown(eventHandler, signal);
	onCommitTitleFieldKeydown(eventHandler, signal);
	delegate([
		'input[name="commit_title"]',
		'input[name="gist[description]"]',
		'#saved-reply-title-field',
		'#commit-message-input',
	], 'keydown', eventHandler, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
		isGist,
		isNewFile,
		isEditingFile,
		isDeletingFile,
	],
	init,
});

/*

Test URLs:

- Any comment box and issue/PR title: https://github.com/refined-github/sandbox/issues/3
- Gist title: https://gist.github.com
- Commit title when editing files: https://github.com/refined-github/sandbox/edit/default-a/editable
- Commit title when deleting files: https://github.com/refined-github/sandbox/delete/default-a/editable

*/
