import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import api from '../github-helpers/api.js';
import features from '../feature-manager.js';
import { userCanLikelyMergePR, getConversationNumber } from '../github-helpers/index.js';
import onCommitTitleUpdate from '../github-events/on-commit-title-update.js';
import observe from '../helpers/selector-observer.js';
import cleanPrCommitTitle from '../helpers/pr-commit-cleaner.js';

const prTitleFieldSelector = 'input#issue_title';
const commitTitleFieldSelector = '.is-squashing form:not([hidden]) input#merge_title_field';

function getCurrentCommitTitleField() {
	return $(commitTitleFieldSelector);
}

function getCurrentCommitTitle() {
	return getCurrentCommitTitleField()?.value.trim();
}

function formatPrCommitTitle(title, prNumber = getConversationNumber()) {
	return `${title} (#${prNumber})`;
}

function createCommitTitle() {
	const prTitle = expectElement(prTitleFieldSelector).value.trim();
	return formatPrCommitTitle(prTitle);
}

function needsSubmission() {
	const currentCommitTitle = getCurrentCommitTitle();
	return Boolean(currentCommitTitle) && (createCommitTitle() !== currentCommitTitle);
}

function getUI() {
	const cancelButton = React.createElement('button', { type: "button", className: "btn-link Link--muted text-underline rgh-sync-pr-commit-title"   ,}, "Cancel");
	return $('.rgh-sync-pr-commit-title-note') ?? (
		React.createElement('p', { className: "note rgh-sync-pr-commit-title-note" ,}, "The title of this PR will be updated to match this title. "
            , cancelButton
)
	);
}

function updateUI() {
	if (needsSubmission()) {
		getCurrentCommitTitleField().after(getUI());
	} else {
		getUI().remove();
	}
}

async function updatePRTitle() {
	if (!needsSubmission()) {
		return;
	}

	// Remove PR number from commit title
	const title = cleanPrCommitTitle(getCurrentCommitTitle(), getConversationNumber());

	await api.v3(`pulls/${getConversationNumber()}`, {
		method: 'PATCH',
		body: {title},
	});
}

async function updateCommitTitle() {
	const field = getCurrentCommitTitleField();
	if (field) {
		// Do not use `text-field-edit` #6348
		field.value = createCommitTitle();

		// There might be listeners that need to be notified
		field.dispatchEvent(new Event('input', {bubbles: true}));
	}
}

function disableSubmission() {
	features.unload(import.meta.url);
	getUI().remove();
}

function init(signal) {
	// PR title -> Commit title field
	observe(commitTitleFieldSelector, updateCommitTitle, {signal}); // On panel open
	observe('.gh-header-title', updateCommitTitle, {signal}); // On PR title change

	// Commit title field -> toggle checkbox visibility
	onCommitTitleUpdate(updateUI, signal);

	// On submission, update PR
	delegate('form.js-merge-pull-request', 'submit', updatePRTitle, {signal});

	// On "Cancel", disable the feature
	delegate('.rgh-sync-pr-commit-title', 'click', disableSubmission, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		userCanLikelyMergePR,
	],
	include: [
		isPRConversation,
	],
	awaitDomReady: true, // DOM-based filters, feature appears at the end of the page
	init,
});

/*

Test URLs:

1. Open any PR in https://github.com/pulls

*/

export { formatPrCommitTitle };
