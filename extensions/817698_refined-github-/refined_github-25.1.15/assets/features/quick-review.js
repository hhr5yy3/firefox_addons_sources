import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isPRConversation, isPRFiles, isClosedConversation } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import delay from '../helpers/delay.js';
import api from '../github-helpers/api.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import showToast from '../github-helpers/toast.js';
import { getUsername, getConversationNumber, scrollIntoViewIfNeeded, triggerConversationUpdate } from '../github-helpers/index.js';
import { randomArrayItem } from '../helpers/math.js';
import { getToken } from '../options-storage.js';

const emojis = [...'🚀🐿️⚡️🤌🥳🥰🤩🥸😎🤯🚢🛫🏳️🏁'];

async function quickApprove(event) {
	const approval = event.altKey ? '' : prompt('Approve instantly? You can add a custom message or leave empty');
	if (approval === null) {
		return;
	}

	const call = api.v3(`pulls/${getConversationNumber()}/reviews`, {
		method: 'POST',
		body: {event: 'APPROVE', body: approval},
	});

	await showToast(call, {
		message: 'Approving…',
		doneMessage: `${randomArrayItem(emojis)} Approved`,
	});

	// Update timeline and scroll to bottom so the new review appears in view
	scrollIntoViewIfNeeded(expectElement('#partial-timeline'));
	triggerConversationUpdate();
}

async function addSidebarReviewButton(reviewersSection) {
	const reviewFormUrl = new URL(location.href);
	reviewFormUrl.pathname += '/files';
	reviewFormUrl.hash = 'review-changes-modal';

	// Occasionally this button appears before "Reviewers", so let's wait a bit longer
	await delay(300);
	const quickReview = (
		React.createElement('span', { className: "text-normal color-fg-muted" ,}, "– "
 , React.createElement('a', { href: reviewFormUrl.href, className: "btn-link Link--muted Link--inTextBlock"  , 'data-hotkey': "v", 'data-turbo-frame': "repo-content-turbo-frame",}, "review now" )
)
	);

	reviewersSection.append(quickReview);

	// Can't approve own PRs and closed PRs
	// API required for this action
	if (
		getUsername() === expectElement('.author').textContent
		|| isClosedConversation()
		|| !(await getToken())
	) {
		return;
	}

	quickReview.append(
		' – ',
		React.createElement('button', {
			type: "button",
			className: "btn-link Link--muted Link--inTextBlock rgh-quick-approve tooltipped tooltipped-nw"     ,
			'aria-label': "Hold alt to approve without confirmation"     ,}
, "approve now"

),
	);
}

async function initSidebarReviewButton(signal) {
	observe('[aria-label="Select reviewers"] .discussion-sidebar-heading', addSidebarReviewButton, {signal});
	delegate('.rgh-quick-approve', 'click', quickApprove, {signal});
}

function focusReviewTextarea(event) {
	if ('newState' in event && event.newState === 'open') {
		expectElement('textarea', event.delegateTarget).focus();
	}
}

async function initReviewButtonEnhancements(signal) {
	delegate('#review-changes-modal', 'toggle', focusReviewTextarea, {capture: true, signal});

	const reviewDropdownButton = await elementReady('.js-reviews-toggle');
	if (reviewDropdownButton) {
		reviewDropdownButton.dataset.hotkey = 'v';
	}
}

async function openReviewPopup(button) {
	await delay(100); // The popover appears immediately afterwards in the HTML, observe() might trigger too soon
	(button.popoverTargetElement ).showPopover();
}

function initNativeDeepLinking(signal) {
	// Cannot target the [popover] itself because observe() can't see hidden elements
	observe('[popovertarget="review-changes-modal"]', openReviewPopup, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	init: initSidebarReviewButton,
}, {
	shortcuts: {
		v: 'Open PR review popup',
	},
	include: [
		isPRFiles,
	],
	init: initReviewButtonEnhancements,
}, {
	asLongAs: [
		() => location.hash === '#review-changes-modal',
		isPRFiles,
	],
	init: initNativeDeepLinking,
});

/*

Test URLs:

- Open PR (review, approve) https://github.com/refined-github/sandbox/pull/10
- Closed PR (only review) https://github.com/refined-github/sandbox/pull/26

*/
