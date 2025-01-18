import React from '../npm/dom-chef.js';
import { isConversation } from '../npm/github-url-detection.js';
import BellIcon from '../npm/octicons-plain-react-components-Bell.js';
import BellSlashIcon from '../npm/octicons-plain-react-components-BellSlash.js';
import IssueReopenedIcon from '../npm/octicons-plain-react-components-IssueReopened.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { multilineAriaLabel } from '../github-helpers/index.js';

// Make the element look selected, not disabled, but effectively disable clicks/focus
const disableAttributes = {
	'aria-selected': true,
	'className': 'selected',
	'tabIndex': -1,
	'style': {pointerEvents: 'none'},
} ;

function SubButton() {
	return (
		React.createElement('button', {
			'data-disable-with': true,
			name: "id",
			type: "submit",
			className: "btn btn-sm flex-1 BtnGroup-item tooltipped tooltipped-sw"     ,}
		)
	);
}

function getReasonElement(subscriptionButton) {
	return subscriptionButton
		.closest('.thread-subscription-status')
		.querySelector('p.reason');
}

function getCurrentStatus(subscriptionButton) {
	const reason = getReasonElement(subscriptionButton).textContent;

	// You’re receiving notifications because you chose custom settings for this thread.
	if (reason.includes('custom settings')) {
		return 'status';
	}

	// You’re not receiving notifications from this thread.
	if (reason.includes('not receiving')) {
		return 'none';
	}

	return 'all';
}

function addButton(subscriptionButton) {
	const status = getCurrentStatus(subscriptionButton);
	// Save first
	const originalId = subscriptionButton.form.elements.id;

	subscriptionButton.after(
		React.createElement('div', { className: "BtnGroup d-flex width-full"  ,}
, React.createElement(SubButton, {
				// @ts-expect-error I don't remember how to fix this
				value: "unsubscribe",
				'aria-label': "Unsubscribe",
				...(status === 'none' && disableAttributes),}

, React.createElement(BellSlashIcon, null ), " None"
)

, React.createElement(SubButton, {
				// @ts-expect-error I don't remember how to fix this
				value: "subscribe",
				'aria-label': "Subscribe to all events"   ,
				...(status === 'all' && disableAttributes),}

, React.createElement(BellIcon, null ), " All"
)

, React.createElement(SubButton, {
				// @ts-expect-error I don't remember how to fix this
				value: "subscribe_to_custom_notifications",
				'aria-label': multilineAriaLabel(
					'Subscribe just to status changes',
					'(closing, reopening, merging)',
				),
				...(status === 'status' && disableAttributes),}

, React.createElement(IssueReopenedIcon, null ), " Status"
)
),

		// Always submitted, but ignored unless the value is `subscribe_to_custom_notifications`
		// Keep outside BtnGroup
		React.createElement('input', { type: "hidden", name: "events[]", value: "merged",} ),
		React.createElement('input', { type: "hidden", name: "events[]", value: "closed",} ),
		React.createElement('input', { type: "hidden", name: "events[]", value: "reopened",} ),
	);

	// Remove it only if the form was successfully added
	originalId.remove();
	subscriptionButton.hidden = true;

	// 'all' can have many reasons, but the other two don't add further information #6684
	if (status !== 'all') {
		getReasonElement(subscriptionButton).hidden = true;
	}
}

function init(signal) {
	// Repos you're ignoring can't be subscribed to, so the button is disabled
	observe('button[data-thread-subscribe-button]:enabled', addButton, {signal});
}

void features.add(import.meta.url, {
	include: [
		isConversation,
	],
	awaitDomReady: true, // The sidebar is at the end of the page
	init,
});

/*

Test URLs

- Issue: https://github.com/refined-github/sandbox/issues/3
- PR: https://github.com/refined-github/sandbox/pull/4
- Also test a repo you're completely ignoring

*/
