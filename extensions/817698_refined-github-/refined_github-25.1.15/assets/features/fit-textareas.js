import { isSafari } from '../npm/webext-detect.js';
import fitTextarea from '../npm/fit-textarea.js';
import { expectElement } from '../npm/select-dom.js';
import { hasRichTextEditor } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

const nativeFit = CSS.supports('field-sizing', 'content');

function resetListener({target}) {
	const field = expectElement('textarea', target );
	// Delay because the field is still filled while the `reset` event is firing
	setTimeout(fitTextarea, 0, field);
}

function inputListener({target}) {
	fitTextarea(target );
}

function watchTextarea(textarea, {signal}) {
	// Disable constrained GitHub feature
	textarea.classList.remove('size-to-fit');
	textarea.classList.remove('js-size-to-fit');
	textarea.classList.remove('issue-form-textarea'); // Remove !important height and min-height
	textarea.classList.add('rgh-fit-textareas');

	if (nativeFit) {
		return;
	}

	textarea.addEventListener('input', inputListener, {signal}); // The user triggers `input` event
	textarea.addEventListener('focus', inputListener, {signal}); // The user triggers `focus` event
	textarea.addEventListener('change', inputListener, {signal}); // File uploads trigger `change` events
	textarea.form?.addEventListener('reset', resetListener, {signal});
	fitTextarea(textarea);
}

function init(signal) {
	// `anchored-position`: Exclude PR review box because it's in a `position:fixed` container; The scroll HAS to appear within the fixed element.
	// `#pull_request_body_ghost`: Special textarea that GitHub just matches to the visible textarea
	observe(`
		textarea:not(
			anchored-position #pull_request_review_body,
			#pull_request_body_ghost,
			#pull_request_body_ghost_ruler
		)
	`, watchTextarea, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
	],
	exclude: [
		// Allow Safari only if it supports the native version
		() => isSafari() && !nativeFit,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/issues/3

*/
