import React from '../npm/dom-chef.js';
import { elementExists, expectElement } from '../npm/select-dom.js';
import { isSingleReleaseOrTag } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import { getRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import showToast from '../github-helpers/toast.js';
import { expectToken } from '../github-helpers/github-token.js';

const getReleaseEditLinkSelector = () => `a[href^="/${getRepo().nameWithOwner}/releases/edit"]` ;

async function convertToDraft() {
	const tagName = location.pathname.split('/').pop();
	const release = await api.v3(`releases/tags/${tagName}`);
	await api.v3(release.url, {
		method: 'PATCH',
		body: {
			draft: true,
		},
	});

	expectElement(getReleaseEditLinkSelector()).click(); // Visit "Edit release" page
}

const confirmMessage = 'The release will be effectively deleted and a new draft will be created.';
const confirmMessageWithReactions = 'Existing user reactions will be lost.';
const confirmMessageQuestion = 'Continue?';

async function onConvertClick() {
	const message = elementExists('.js-reaction-group-button')
		? [confirmMessage, confirmMessageWithReactions, confirmMessageQuestion]
		: [confirmMessage, confirmMessageQuestion];
	if (!confirm(message.join(' '))) {
		return;
	}

	await showToast(convertToDraft(), {
		message: 'Converting…',
		doneMessage: 'Redirecting…',
	});
}

function attachButton(editButton) {
	if (elementExists('[title="Draft"]')) {
		return;
	}

	editButton.before(
		React.createElement('button', {
			type: "button",
			className: "btn btn-sm ml-3 mr-1 rgh-convert-draft"    ,}
, "Convert to draft"

),
	);
}

async function init(signal) {
	await expectToken();

	observe(getReleaseEditLinkSelector(), attachButton, {signal});
	delegate('.rgh-convert-draft', 'click', onConvertClick, {signal});
}

void features.add(import.meta.url, {
	include: [
		isSingleReleaseOrTag,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/releases/tag/23.7.25

*/
