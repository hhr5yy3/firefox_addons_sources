import delegate from '../npm/delegate-it-delegate.js';
import { isIssue } from '../npm/github-url-detection.js';
import { expectElement } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { getFeatureID } from '../helpers/feature-helpers.js';

const id = getFeatureID(import.meta.url);

const unplannedCheckbox = 'input[name="state_reason"][value="not_planned"]';

function update(dropdown) {
	const form = dropdown.closest('form');
	const radio = expectElement(unplannedCheckbox, dropdown);
	const mainButton = expectElement('[name="comment_and_close"]', form);
	const icon = expectElement('.octicon-skip', dropdown);

	const checkbox = radio.cloneNode();
	checkbox.hidden = true;
	checkbox.type = 'checkbox';

	mainButton.classList.add('tooltipped', 'tooltipped-nw');
	mainButton.setAttribute('aria-label', 'Done, closed, fixed, resolved');

	const unplannedButton = mainButton.cloneNode();
	unplannedButton.append(icon);
	unplannedButton.id = id;
	unplannedButton.classList.add('btn', 'tooltipped', 'tooltipped-nw', 'mr-0');
	// Prevent content from being changed #7024
	unplannedButton.classList.remove('js-comment-and-button');
	unplannedButton.setAttribute('aria-label', 'Close as not planned.\nWon’t fix, can’t repro, duplicate, stale');

	dropdown.replaceWith(unplannedButton);
	form.append(checkbox);
}

function updateCheckbox({delegateTarget: button}) {
	expectElement(unplannedCheckbox, button.form).checked = button.id === id;
}

function init(signal) {
	observe('close-reason-selector .select-menu', update, {signal});
	delegate('[name="comment_and_close"]', 'click', updateCheckbox, {signal});
}

void features.add(import.meta.url, {
	include: [
		isIssue,
	],
	init,
});

/*

Test URLs: (any issue you can close)

https://github.com/refined-github/sandbox/issues/73

*/
