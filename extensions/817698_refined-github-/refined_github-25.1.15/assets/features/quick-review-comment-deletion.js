import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import TrashIcon from '../npm/octicons-plain-react-components-Trash.js';
import { isPRConversation, isPRFiles } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isChrome } from '../npm/webext-detect.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import loadDetailsMenu from '../github-helpers/load-details-menu.js';
import showToast from '../github-helpers/toast.js';

function onButtonClick({delegateTarget: button}) {
	try {
		button
			.closest('.js-comment')
			.querySelector('.show-more-popover .js-comment-delete > button')
			.click();
	} catch (error) {
		void showToast(new Error('Feature broken. Please open an issue with the link found in the console'));
		throw error;
	}
}

async function preloadDropdown({delegateTarget: button}) {
	const comment = button.closest('.js-comment');
	await loadDetailsMenu(expectElement('details-menu.show-more-popover', comment));
}

function addDeleteButton(cancelButton) {
	cancelButton.after(
		React.createElement('button', { className: "btn btn-danger float-left mr-auto rgh-review-comment-delete-button"    , type: "button",}
, React.createElement(TrashIcon, null )
),
	);
}

function init(signal) {
	delegate('.rgh-review-comment-delete-button', 'click', onButtonClick, {signal});
	delegate('.rgh-quick-comment-edit-button', 'click', preloadDropdown, {signal});
	observe('.review-comment .js-comment-cancel-button', addDeleteButton, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isChrome,
	],
	include: [
		isPRConversation,
		isPRFiles,
	],
	init,
});

/*

Test URLs

- https://github.com/refined-github/sandbox/pull/31
- https://github.com/refined-github/sandbox/pull/31/files

*/
