import React from '../npm/dom-chef.js';
import { $$, elementExists, expectElement } from '../npm/select-dom.js';
import { isNotifications } from '../npm/github-url-detection.js';
import LinkExternalIcon from '../npm/octicons-plain-react-components-LinkExternal.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import openTabs from '../helpers/open-tabs.js';
import { appendBefore } from '../helpers/dom-utils.js';
import observe from '../helpers/selector-observer.js';
import { multilineAriaLabel } from '../github-helpers/index.js';
import { getIdentifiers } from '../helpers/feature-helpers.js';

// Selector works on:
// https://github.com/notifications (Grouped by date)
// https://github.com/notifications (Grouped by repo)
// https://github.com/notifications?query=reason%3Acomment (which is an unsaved filter)
const notificationHeaderSelector = '.js-check-all-container .js-bulk-action-toasts ~ div .Box-header';

const openUnread = getIdentifiers('open-notifications-button');
const openSelected = getIdentifiers('open-selected-button');

function getUnreadNotifications(container = document) {
	return $$('.notification-unread', container);
}

async function openNotifications(notifications, markAsDone = false) {
	const urls = notifications
		.reverse() // Open oldest first #6755
		.map(notification => expectElement('a', notification).href);

	const openingTabs = openTabs(urls);
	if (!await openingTabs) {
		return;
	}

	for (const notification of notifications) {
		if (markAsDone) {
			expectElement('[title="Done"]', notification).click();
		} else {
			// Mark all as read instead
			notification.classList.replace('notification-unread', 'notification-read');
		}
	}
}

async function openUnreadNotifications({delegateTarget, altKey}) {
	const container = delegateTarget.closest('.js-notifications-group') ?? document;
	await openNotifications(getUnreadNotifications(container), altKey);

	// Remove all now-unnecessary buttons
	removeOpenUnreadButtons(container);
}

async function openSelectedNotifications() {
	const selectedNotifications = $$('.notifications-list-item :checked')
		.map(checkbox => checkbox.closest('.notifications-list-item'));
	await openNotifications(selectedNotifications);

	if (!elementExists('.notification-unread')) {
		removeOpenUnreadButtons();
	}
}

function removeOpenUnreadButtons(container = document) {
	for (const button of $$(openUnread.selector, container)) {
		button.remove();
	}
}

function addSelectedButton(selectedActionsGroup) {
	const button = (
		React.createElement('button', {
			type: "button",
			className: 'btn btn-sm mr-2 tooltipped tooltipped-s ' + openSelected.class,
			'data-hotkey': "p",
			'aria-label': multilineAriaLabel(
				'Open selected notifications',
				'Hotkey: P',
			),}

, React.createElement(LinkExternalIcon, { className: "mr-1",} ), "Open"
)
	);
	appendBefore(
		selectedActionsGroup,
		'details',
		button,
	);
}

function addToRepoGroup(markReadButton) {
	const repository = markReadButton.closest('.js-notifications-group');
	if (getUnreadNotifications(repository).length === 0) {
		return;
	}

	markReadButton.before(
		React.createElement('button', {
			type: "button",
			className: 'btn btn-sm mr-2 tooltipped tooltipped-w ' + openUnread.class,
			'aria-label': "Open all unread notifications from this repo"      ,}

, React.createElement(LinkExternalIcon, { width: 16,} ), " Open unread"
),
	);
}

function addToMainHeader(notificationHeader) {
	if (getUnreadNotifications().length === 0) {
		return;
	}

	notificationHeader.append(
		React.createElement('button', { className: 'btn btn-sm ml-auto d-none ' + openUnread.class, type: "button",}
, React.createElement(LinkExternalIcon, { className: "mr-1",} ), "Open all unread"
),
	);
}

function init(signal) {
	delegate(openSelected.selector, 'click', openSelectedNotifications, {signal});
	delegate(openUnread.selector, 'click', openUnreadNotifications, {signal});

	observe(notificationHeaderSelector + ' .js-notifications-mark-selected-actions', addSelectedButton, {signal});
	observe(notificationHeaderSelector, addToMainHeader, {signal});
	observe('.js-grouped-notifications-mark-all-read-button', addToRepoGroup, {signal});
}

void features.add(import.meta.url, {
	include: [
		isNotifications,
	],
	shortcuts: {
		p: 'Open selected notifications',
	},
	init,
});

/*

Test URLs:

https://github.com/notifications (Grouped by date)
https://github.com/notifications (Grouped by repo)
https://github.com/notifications?query=reason%3Acomment (which is an unsaved filter)

*/
