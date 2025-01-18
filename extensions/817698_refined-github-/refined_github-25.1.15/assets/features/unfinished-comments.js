import { $$ } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { hasRichTextEditor } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

let submitting;

const prefix = '✏️ Comment - ';

function isFieldDirty(field) {
	return field.matches('[class*="Textarea__StyledTextarea"]')
		? field.value.length > 0 // React fields update both value and textContent, so default to "filled === dirty"
		: field.value !== field.textContent;
}

function hasDraftComments() {
	// `[id^="convert-to-issue-body"]` excludes the hidden pre-filled textareas created when opening the dropdown menu of review comments
	return $$('textarea:not([id^="convert-to-issue-body"])').some(f => isFieldDirty(f));
}

function disableOnSubmit() {
	clearTimeout(submitting);
	submitting = setTimeout(() => {
		submitting = undefined;
	}, 2000);
}

function updateDocumentTitle() {
	if (submitting) {
		return;
	}

	if (document.visibilityState === 'hidden' && hasDraftComments()) {
		document.title = prefix + document.title;
	} else if (document.title.startsWith(prefix)) {
		document.title = document.title.replace(prefix, '');
	}
}

function init(signal) {
	delegate('form', 'submit', disableOnSubmit, {capture: true, signal});
	document.addEventListener('visibilitychange', updateDocumentTitle, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/pull/4

*/
