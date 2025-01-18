import React from '../npm/dom-chef.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isPRFiles } from '../npm/github-url-detection.js';
import CheckIcon from '../npm/octicons-plain-react-components-Check.js';
import FileDiffIcon from '../npm/octicons-plain-react-components-FileDiff.js';
import { expectElement } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { assertNodeContent } from '../helpers/dom-utils.js';

function replaceCheckboxes(originalSubmitButton) {
	const form = originalSubmitButton.form;
	const actionsRow = originalSubmitButton.closest('.Overlay-footer');
	const formAttribute = originalSubmitButton.getAttribute('form');

	// Do not use `$$` because elements can be outside `form`
	// `RadioNodeList` is dynamic, so we need to make a copy
	const radios = [...form.elements.namedItem('pull_request_review[event]') ] ;
	if (radios.length === 0) {
		throw new Error('Could not find radio buttons');
	}

	// Set the default action for cmd+enter to Comment
	if (radios.length > 1) {
		form.prepend(
			React.createElement('input', {
				type: "hidden",
				name: "pull_request_review[event]",
				value: "comment",}
			),
		);
	}

	if (actionsRow) {
		actionsRow.prepend(React.createElement('span', { className: "spacer.gif ml-auto" ,} ));
		radios.reverse();
	}

	// Generate the new buttons
	for (const radio of radios) {
		const parent = radio.parentElement;
		const labelElement = (
			parent.querySelector('label')
			?? radio.nextSibling // TODO: Remove after April 2025
		);
		const tooltip = expectElement([
			'p', // TODO: Remove after April 2025
			'.FormControl-caption',
		], parent).textContent.trim().replace(/\.$/, '');
		assertNodeContent(labelElement, /^(Approve|Request changes|Comment)$/);

		const classes = ['btn btn-sm'];

		if (tooltip) {
			classes.push('tooltipped tooltipped-nw tooltipped-no-delay');
		}

		const button = (
			React.createElement('button', {
				type: "submit",
				name: "pull_request_review[event]",
				// Old version of GH don't nest the submit button inside the form, so must be linked manually. Issue #6963.
				form: formAttribute,
				value: radio.value,
				className: classes.join(' '),
				'aria-label': tooltip,
				disabled: radio.disabled,}

, labelElement.textContent
)
		);

		if (!radio.disabled && radio.value === 'approve') {
			button.prepend(React.createElement(CheckIcon, { className: "color-fg-success",} ));
		} else if (!radio.disabled && radio.value === 'reject') {
			button.prepend(React.createElement(FileDiffIcon, { className: "color-fg-danger",} ));
		}

		if (actionsRow) {
			actionsRow.prepend(button);
		} else {
			// TODO: For GHE. Remove after June 2025
			const legacyActionsRow = originalSubmitButton.closest('.form-actions');
			legacyActionsRow.append(button);
		}
	}

	// Remove original fields at last to avoid leaving a broken form
	const fieldset = radios[0].closest('fieldset');

	if (fieldset) {
		fieldset.remove();
	} else {
		// To retain backwards compatibility with older GHE versions, remove any radios not within a fieldset. Issue #6963.
		for (const radio of radios) {
			radio.closest('.form-checkbox').remove();
		}
	}

	originalSubmitButton.remove();
}

let lastSubmission;
function blockDuplicateSubmissions(event) {
	if (lastSubmission && Date.now() - lastSubmission < 1000) {
		event.preventDefault();
		console.log('Duplicate submission prevented');
		return;
	}

	lastSubmission = Date.now();
}

function init(signal) {
	// The selector excludes the "Cancel" button
	observe('#review-changes-modal [type="submit"]:not([name])', replaceCheckboxes, {signal});
	delegate('#review-changes-modal form', 'submit', blockDuplicateSubmissions, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
	],
	awaitDomReady: true,
	init,
});

/*

Test URLs

https://github.com/refined-github/sandbox/pull/4/files
https://github.com/refined-github/sandbox/pull/12/files

*/
