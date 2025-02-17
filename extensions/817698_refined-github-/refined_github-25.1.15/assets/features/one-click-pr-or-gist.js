import React from '../npm/dom-chef.js';
import { elementExists, $, $$, expectElement } from '../npm/select-dom.js';
import { isCompare, isGist } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';

function init() {
	const initialGroupedButtons = $('.BtnGroup:has([name="draft"], [name="gist[public]"])');
	if (!initialGroupedButtons) {
		// 1. Free accounts can't open Draft PRs in private repos, so this element is missing
		// 2. PRs can't be created from some comparison pages: Either base is a tag, not a branch; or there already exists a PR.
		return false;
	}

	const parent = initialGroupedButtons.parentElement;

	for (const dropdownItem of $$('.select-menu-item', initialGroupedButtons)) {
		let title = expectElement('.select-menu-item-heading', dropdownItem).textContent.trim();
		const description = expectElement('.description', dropdownItem).textContent.trim();
		const radioButton = expectElement('input[type=radio]', dropdownItem);
		const classList = ['btn', 'ml-2', 'tooltipped', 'tooltipped-s'];

		if (/\bdraft\b/i.test(title)) {
			title = 'Create draft PR';
		} else {
			classList.push('btn-primary');
		}

		initialGroupedButtons.after(
			React.createElement('button', {
				'data-disable-invalid': true,
				className: classList.join(' '),
				'aria-label': description,
				type: "submit",
				name: radioButton.name,
				value: radioButton.value,}

, title
),
		);
	}

	initialGroupedButtons.remove();

	// Add minimal structure validation before adding a dangerous class
	if (parent.classList.contains('d-flex') && parent.parentElement.classList.contains('flex-justify-end')) {
		parent.parentElement.classList.add('flex-wrap');
	}
}

void features.add(import.meta.url, {
	include: [
		isCompare,
		isGist,
	],
	exclude: [
		() => elementExists('[data-show-dialog-id="drafts-upgrade-dialog"]'),
	],
	deduplicate: 'has-rgh',
	awaitDomReady: true,
	init,
});

/*

Test URLs

- Normal: https://github.com/refined-github/sandbox/compare/default-a...fregante-patch-1
- "Allow edits from maintainers": https://github.com/refined-github/refined-github/compare/main...fregante:refined-github:main?expand=1

*/
