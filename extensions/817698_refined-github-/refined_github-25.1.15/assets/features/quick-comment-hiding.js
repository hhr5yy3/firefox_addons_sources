import React from '../npm/dom-chef.js';
import { expectElement, $$ } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { hasComments } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

const formSelector = [
	'form[action$="/minimize-comment"]',
	'form[action$="/minimize"]', // Review thread comments
] ;

function generateSubmenu(hideButton) {
	if (hideButton.closest('.rgh-quick-comment-hiding-details')) {
		// Already generated
		return;
	}

	const detailsElement = hideButton.closest('details');
	detailsElement.classList.add('rgh-quick-comment-hiding-details');

	const comment = hideButton.closest('.unminimized-comment');
	const hideCommentForm = expectElement(formSelector, comment);

	// Generate dropdown
	const newForm = hideCommentForm.cloneNode();
	const fields = [...hideCommentForm.elements].map(field => field.cloneNode());
	newForm.append(React.createElement('i', { hidden: true,}, fields)); // Add existing fields (comment ID, token)
	newForm.setAttribute('novalidate', 'true');	// Ignore the form's required attributes

	// Imitate existing menu, reset classes
	newForm.className = ['js-comment-minimize', 'dropdown-menu', 'dropdown-menu-sw', 'color-fg-default', 'show-more-popover', 'anim-scale-in'].join(' ');

	for (const reason of $$('option:not([value=""])', hideCommentForm.elements.classifier)) {
		newForm.append(
			React.createElement('button', {
				type: "submit",
				name: "classifier",
				value: reason.value,
				className: "dropdown-item btn-link" ,
				role: "menuitem",}

, reason.textContent
),
		);
	}

	// Close immediately after the clicking option
	newForm.addEventListener('click', () => {
		detailsElement.open = false;
	});

	detailsElement.append(newForm);
}

// Shows menu on top of mainDropdownContent when "Hide" is clicked;
// Hide it when dropdown closes.
// Uses `v-hidden` to avoid conflicts with `close-out-of-view-modals`
function toggleSubMenu(hideButton, show) {
	const dropdown = hideButton.closest('details');

	// Native dropdown
	expectElement('details-menu', dropdown).classList.toggle('v-hidden', show);

	// "Hide comment" dropdown
	expectElement(formSelector, dropdown).classList.toggle('v-hidden', !show);
}

function resetDropdowns(event) {
	toggleSubMenu(event.delegateTarget, false);
}

function showSubmenu(event) {
	generateSubmenu(event.delegateTarget);
	toggleSubMenu(event.delegateTarget, true);

	event.stopImmediatePropagation();
	event.preventDefault();
}

function init(signal) {
	// `capture: true` required to be fired before GitHub's handlers
	delegate('.js-comment-hide-button', 'click', showSubmenu, {capture: true, signal});
	delegate('.rgh-quick-comment-hiding-details', 'toggle', resetDropdowns, {capture: true, signal});
}

// TODO: Drop feature in April 2025
// https://github.com/refined-github/refined-github/issues/7856#issuecomment-2411492400
void features.add(import.meta.url, {
	include: [
		hasComments,
	],
	init,
});

/*

Test URLs

https://github.com/refined-github/sandbox/pull/47

*/
