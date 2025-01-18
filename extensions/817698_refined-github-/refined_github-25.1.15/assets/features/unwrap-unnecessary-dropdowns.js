import { $$, expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isNotifications } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

// Replace dropdown while keeping its sizing/positioning classes
function replaceDropdownInPlace(dropdown, form) {
	dropdown.replaceWith(form);
	form.classList.add(...dropdown.classList);
	form.classList.remove('dropdown', 'details-reset', 'details-overlay');
}

async function unwrapNotifications() {
	await elementReady('.js-check-all-container > :first-child'); // Ensure the entire dropdown has loaded
	const forms = $$('[action="/notifications/beta/update_view_preference"]');
	if (forms.length === 0) {
		return false;
	}

	if (forms.length > 2) {
		throw new Error('GitHub added new view types. This feature is obsolete.');
	}

	const dropdown = forms[0].closest('action-menu');
	const currentView = expectElement('.Button-label span:last-child', dropdown).textContent.trim();
	const desiredForm = currentView === 'Date' ? forms[0] : forms[1];

	// Replace dropdown
	replaceDropdownInPlace(dropdown, desiredForm);

	// Fix button’s style
	const button = expectElement('[type="submit"]', desiredForm);
	button.className = 'btn';
	button.textContent = `Group by ${button.textContent.toLowerCase()}`;
}

void features.add(import.meta.url, {
	include: [
		isNotifications,
	],
	deduplicate: 'has-rgh',
	init: unwrapNotifications,
});

/*

Test URLs:
https://github.com/notifications

*/
