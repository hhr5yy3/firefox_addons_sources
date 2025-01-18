import React from '../npm/dom-chef.js';
import { elementExists } from '../npm/select-dom.js';
import { isNewIssue, isNewFile, isCompare, isEditingFile, isPRConversation } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import { modKey } from '../github-helpers/hotkey.js';

function onKeyDown(event) {
	const field = event.delegateTarget;
	const form = field.form;
	if (
		event.key !== 'Enter'
		|| event.ctrlKey
		|| event.metaKey
		|| event.isComposing // #4323
		|| elementExists([
			'.suggester', // GitHub’s autocomplete dropdown
			'.rgh-avoid-accidental-submissions',
		], form)
	) {
		return;
	}

	if (elementExists('.btn-primary[type="submit"]:disabled', form)) {
		return;
	}

	const spacingClasses = isNewFile() || isEditingFile() ? 'my-1' : 'mt-2 mb-n1';

	const message = (
		React.createElement('p', { className: 'rgh-avoid-accidental-submissions ' + spacingClasses,}, "A submission via "
   , React.createElement('kbd', null, "enter"), " has been prevented. You can press "       , React.createElement('kbd', null, "enter"), " again or use "    , React.createElement('kbd', null, modKey), React.createElement('kbd', null, "enter"), "."
)
	);
	if (isNewFile() || isEditingFile() || isPRConversation()) {
		field.after(message);
	} else {
		field.parentElement.append(message);
	}

	event.preventDefault();
}

const inputElements = [
	'form.new_issue input#issue_title',
	'input#pull_request_title',
	'input#commit-summary-input',
	'#merge_title_field',
];

function init(signal) {
	delegate(inputElements, 'keydown', onKeyDown, {signal});
}

void features.add(import.meta.url, {
	include: [
		isNewIssue,
		isNewFile,
		isCompare,
		isEditingFile,
		isPRConversation,
	],
	init,
});

/*

Test URLs:

isNewIssue: https://github.com/refined-github/sandbox/issues/new
isNewFile: https://github.com/refined-github/sandbox/new/default-a
isCompare: https://github.com/refined-github/sandbox/compare/default-a...quick-pr-branch
isEditingFile: https://github.com/refined-github/sandbox/edit/default-a/README.md
isPRConversation: https://github.com/refined-github/sandbox/pull/4

*/
