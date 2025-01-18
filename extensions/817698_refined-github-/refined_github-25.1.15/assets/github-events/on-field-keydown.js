import { elementExists } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';

function onFieldKeydown(selector, callback, signal) {
	delegate(selector , 'keydown', event => {
		const field = event.delegateTarget;

		if (
			event.isComposing
			// New autocomplete dropdown
			|| field.hasAttribute('aria-autocomplete')
			// Classic autocomplete dropdown
			|| elementExists('.suggester', field.form)
		) {
			return;
		}

		callback(event);
	}, {
		// Adds support for `esc` key; GitHub seems to use `stopPropagation` on it
		capture: true,
		signal,
	});
}

function onCommentFieldKeydown(callback, signal) {
	onFieldKeydown('textarea', callback, signal);
}

function onConversationTitleFieldKeydown(callback, signal) {
	onFieldKeydown('input[placeholder="Title"], #issue_title, #pull_request_title', callback, signal);
}

function onCommitTitleFieldKeydown(callback, signal) {
	onFieldKeydown('#commit-summary-input', callback, signal);
}

export { onCommentFieldKeydown, onCommitTitleFieldKeydown, onConversationTitleFieldKeydown };
