import React from '../npm/dom-chef.js';
import { elementExists, expectElement } from '../npm/select-dom.js';
import XIcon from '../npm/octicons-plain-react-components-X.js';
import { isConversation, isArchivedRepo } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import showToast from '../github-helpers/toast.js';
import { getConversationNumber } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import { expectToken } from '../github-helpers/github-token.js';
import { assertError } from '../npm/ts-extras-assert-error.js';

// Don't cache: https://github.com/refined-github/refined-github/issues/7283
function canEditLabels() {
	return elementExists('.label-select-menu .octicon-gear');
}

function getLabelList() {
	return expectElement('.label-select-menu [src] .hx_rsm-content');
}

function removeLabelList() {
	const list = getLabelList();
	list.closest('details').addEventListener('toggle', restoreLabelList, {once: true});
	list.replaceChildren();
}

function restoreLabelList() {
	const list = getLabelList();
	list.replaceChildren(
		React.createElement('include-fragment', { src: list.closest('[src]').getAttribute('src'),} ),
	);
}

async function removeLabelButtonClickHandler(event) {
	event.preventDefault();

	const removeLabelButton = event.delegateTarget;
	const label = removeLabelButton.closest('a');

	try {
		label.hidden = true;
		// Disable dropdown list to avoid race conditions in the UI.
		// Each deletion would be followed by a reload of the list _at the wrong time_
		removeLabelList();

		await api.v3(`issues/${getConversationNumber()}/labels/${removeLabelButton.dataset.name}`, {
			method: 'DELETE',
		});
	} catch (error) {
		assertError(error);
		void showToast(error);
		removeLabelButton.blur();
		label.hidden = false;
		return;
	}

	label.remove();
}

function addRemoveLabelButton(label) {
	label.classList.add('d-inline-flex');
	label.append(
		React.createElement('button', {
			type: "button",
			className: "btn-link rgh-quick-label-removal" ,
			'data-name': label.dataset.name,}

, React.createElement(XIcon, null )
),
	);
}

async function init(signal) {
	await expectToken();

	delegate('.rgh-quick-label-removal:enabled', 'click', removeLabelButtonClickHandler, {signal});
	observe('.js-issue-labels .IssueLabel', addRemoveLabelButton, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isConversation,
		canEditLabels,
	],
	exclude: [
		isArchivedRepo,
	],
	awaitDomReady: true, // The sidebar is near the end of the page
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/pull/3454
https://github.com/refined-github/refined-github/issues/3440

*/
