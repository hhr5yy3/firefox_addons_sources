import React from '../npm/dom-chef.js';
import { countElements, expectElement } from '../npm/select-dom.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import { getBranches } from '../github-helpers/pr-branches.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import cleanCommitMessage from '../helpers/clean-commit-message.js';
import { userHasPushAccess } from '../github-helpers/get-user-permission.js';
import { expectToken } from '../github-helpers/github-token.js';
import attachElement from '../helpers/attach-element.js';
import observe from '../helpers/selector-observer.js';

const isPrAgainstDefaultBranch = async () => getBranches().base.branch === await getDefaultBranch();

// TODO: Drop in May 2025
function handleLegacyToggle(event) {
	if (event.detail?.open !== true) {
		return;
	}

	const messageField = expectElement('textarea#merge_message_field', event.delegateTarget);
	if (messageField.value.trim()) {
		clear(messageField);
	}
}

function clearReactTextarea(textarea) {
	if (textarea.labels[0]?.textContent === 'Commit message') {
		clear(textarea);
	}
}

async function clear(messageField) {
	const originalMessage = messageField.value;
	const cleanedMessage = cleanCommitMessage(originalMessage, !await isPrAgainstDefaultBranch());

	if (cleanedMessage === originalMessage.trim()) {
		return;
	}

	// Do not use `text-field-edit` #6348
	messageField.value = cleanedMessage ? cleanedMessage + '\n' : '';

	// Trigger `fit-textareas` if enabled
	messageField.dispatchEvent(new Event('input', {bubbles: true}));

	// TODO: Drop `?? messageField` in May 2025
	const anchor = messageField.closest('span[class^="TextInputWrapper"]') ?? messageField;

	// TODO: Drop `<hr>` in May 2025
	attachElement(anchor ?? messageField, {
		after: () => (
			React.createElement('div', { className: "flex-self-stretch",}
, React.createElement('p', { className: "note",}, "The description field was cleared by "
      , React.createElement('a', { target: "_blank", href: "https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#clear-pr-merge-commit-message", rel: "noreferrer",}, "Refined GitHub" ), "."
)
, anchor.nodeName === 'TEXTAREA' && React.createElement('hr', null )
)
		),
	});
}

async function init(signal) {
	await expectToken();
	delegate('.js-merge-pr', 'details:toggled', handleLegacyToggle, {signal});
	observe('[aria-label="Checks"] ~ div textarea[id]', clearReactTextarea, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isPRConversation,
		userHasPushAccess,
	],
	exclude: [
		// Don't clear 1-commit PRs #3140
		() => countElements('.TimelineItem.js-commit') === 1,
	],
	awaitDomReady: true, // Appears near the end of the page anyway
	init,
});

/*

Test URLs

PR against non-default branch:
https://github.com/refined-github/sandbox/pull/53

*/
