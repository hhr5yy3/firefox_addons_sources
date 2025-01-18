import { $ } from '../npm/select-dom.js';
import oneEvent from '../npm/one-event.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isConversation } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import showToast from '../github-helpers/toast.js';
import { paginationButtonSelector } from '../github-helpers/selectors.js';

// eslint-disable-next-line ts/explicit-function-return-type
async function expandHidden(paginationButton) {
	let wrapper = paginationButton.form.parentElement;
	const isExpandingMainThread = wrapper.id === 'js-progressive-timeline-item-container';

	while (paginationButton) {
		// eslint-disable-next-line no-await-in-loop
		await oneEvent(paginationButton.form, 'page:loaded');
		if (isExpandingMainThread) {
			// Pagination forms in the main thread load their content in a nested wrapper
			wrapper = wrapper.lastElementChild;
		}

		paginationButton = $(`:scope > ${paginationButtonSelector}`, wrapper);
		paginationButton?.click();
	}
}

async function handleAltClick({altKey, delegateTarget}) {
	if (!altKey) {
		return;
	}

	await showToast(expandHidden(delegateTarget), {
		message: 'Expanding…',
		doneMessage: 'Expanded',
	});
}

function init(signal) {
	delegate(paginationButtonSelector, 'click', handleAltClick, {signal});
}

void features.add(import.meta.url, {
	include: [
		isConversation,
	],
	init,
});

/*
Test URLs
https://github.com/rust-lang/rfcs/pull/2544
*/
