import { expectElement, countElements, $$ } from '../npm/select-dom.js';

function enableToggleAll() {
	const section = expectElement('details#toggle-all');
	section.hidden = false;
	section.open = true;
	this.hidden = true; // Hide button in "Debugging" section
}

function disableAllFeatures() {
	for (const enabledFeature of $$('.feature-checkbox:checked')) {
		enabledFeature.click();
	}

	expectElement('details#features').open = true;
}

function enableAllFeatures() {
	for (const disabledFeature of $$('.feature-checkbox:not(:checked)')) {
		disabledFeature.click();
	}

	expectElement('details#features').open = true;
}

function initToggleAllButtons() {
	const initialButton = expectElement('#toggle-all-features');
	// Show "Toggle All" section if the user already disabled a lot of features
	if (countElements('.feature-checkbox:not(:checked)') > 50) {
		expectElement('details#toggle-all').hidden = false;
		initialButton.hidden = true; // Hide button in "Debugging" section
	} else {
		initialButton.addEventListener('click', enableToggleAll);
	}

	expectElement('#disable-all-features').addEventListener('click', disableAllFeatures);
	expectElement('#enable-all-features').addEventListener('click', enableAllFeatures);
}

export { initToggleAllButtons as default };
