import React from '../npm/dom-chef.js';
import { $, elementExists, expectElement } from '../npm/select-dom.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import observe from '../helpers/selector-observer.js';
import features from '../feature-manager.js';
import LoadingIcon from '../github-helpers/icon-loading.js';

function closeModal({delegateTarget: button}) {
	button.append(' ', React.createElement(LoadingIcon, { className: "v-align-middle",} ));
	button.disabled = true;
}

function addConvertToDraftButton(alternativeActions) {
	const existingButton = $('[data-url$="/convert_to_draft"]');
	// Needs to check the existence of both to guarantee the non-draft state
	if (!existingButton || elementExists('[action$="/ready_for_review"]')) {
		return;
	}

	const convertToDraft = existingButton.closest('details').cloneNode(true);
	convertToDraft.classList.replace('d-inline', 'd-inline-block');
	expectElement('.Link--muted', convertToDraft).classList.remove('Link--muted');
	alternativeActions.prepend(convertToDraft);
}

function init(signal) {
	// Immediately close lightbox after click instead of waiting for the ajaxed widget to refresh
	delegate('.js-convert-to-draft', 'click', closeModal, {signal});

	// Copy button to mergeability box
	observe('.alt-merge-options', addConvertToDraftButton, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	init,
});

/*

Test URLs:

1. Visit https://github.com/pulls
2. Open any PRs that aren't already drafts

*/
