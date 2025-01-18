import React from '../npm/dom-chef.js';
import { expectElement, $, elementExists } from '../npm/select-dom.js';
import { isPRFiles, isPRFile404, isEnterprise, isCompare } from '../npm/github-url-detection.js';
import BookIcon from '../npm/octicons-plain-react-components-Book.js';
import CheckIcon from '../npm/octicons-plain-react-components-Check.js';
import DiffIcon from '../npm/octicons-plain-react-components-Diff.js';
import DiffModifiedIcon from '../npm/octicons-plain-react-components-DiffModified.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { removeTextNodeContaining } from '../helpers/dom-utils.js';

function isHidingWhitespace() {
	// The selector is the native button
	return new URL(location.href).searchParams.get('w') === '1' || elementExists('button[name="w"][value="0"]:not([hidden])');
}

function createWhitespaceButton() {
	const url = new URL(location.href);

	if (isHidingWhitespace()) {
		url.searchParams.delete('w');
	} else {
		url.searchParams.set('w', '1');
	}

	return (
		React.createElement('a', {
			href: url.href,
			'data-hotkey': "d w" ,
			className: 'tooltipped tooltipped-s btn btn-sm tooltipped ' + (isHidingWhitespace() ? 'color-fg-subtle' : ''),
			'aria-label': `${isHidingWhitespace() ? 'Show' : 'Hide'} whitespace changes`,}

, isHidingWhitespace() && React.createElement(CheckIcon, null ), " No Whitespace"
)
	);
}

function attachPRButtons(dropdown) {
	const diffSettingsForm = expectElement('form[action$="/diffview"]', dropdown);

	// Preserve data before emption the form
	const isUnified = new FormData(diffSettingsForm).get('diff') === 'unified';
	const token = expectElement('[name="authenticity_token"]', diffSettingsForm);

	// Empty form except the token field
	diffSettingsForm.replaceChildren(token);

	const type = isUnified ? 'split' : 'unified';
	const Icon = isUnified ? BookIcon : DiffIcon;
	diffSettingsForm.append(
		React.createElement('button', {
			className: "tooltipped tooltipped-s ml-2 btn-link Link--muted px-2"     ,
			'aria-label': `Switch to the ${type} diff view`,
			name: "diff",
			value: type,
			type: "submit",}

, React.createElement(Icon, { className: "v-align-middle",} )
),
	);

	if (!isHidingWhitespace()) {
		diffSettingsForm.append(
			React.createElement('button', {
				'data-hotkey': "d w" ,
				className: "tooltipped tooltipped-s btn-link Link--muted px-2"    ,
				'aria-label': "Hide whitespace changes"  ,
				name: "w",
				value: "1",
				type: "submit",}

, React.createElement(DiffModifiedIcon, { className: "v-align-middle",} )
),
		);
	}

	dropdown.replaceWith(diffSettingsForm);

	// Trim title
	const prTitle = $('.pr-toolbar .js-issue-title');
	if (prTitle && elementExists('.pr-toolbar progress-bar')) { // Only review view has progress-bar
		prTitle.style.maxWidth = '24em';
		prTitle.title = prTitle.textContent;
	}

	// Make space for the new button #655
	removeTextNodeContaining(
		expectElement('[data-hotkey="c"] strong').previousSibling,
		'Changes from',
	);

	// Remove extraneous padding around "Clear filters" button
	$('.subset-files-tab')?.classList.replace('px-sm-3', 'ml-sm-2');
}

function initPR(signal) {
	// There are two "diff settings" element, one for mobile and one for the desktop. We only replace the one for the desktop
	observe('.hide-sm.hide-md details.diffbar-item:has(svg.octicon-gear)', attachPRButtons, {signal});
}

function attachButtons(nativeDiffButtons) {
	const anchor = nativeDiffButtons.parentElement;

	// `usesFloats` is necessary to ensure the order and spacing as seen in #5958
	const usesFloats = anchor?.classList.contains('float-right');
	if (usesFloats) {
		anchor.after(
			React.createElement('div', { className: "float-right mr-3" ,}
, createWhitespaceButton()
),
		);
	} else {
		anchor.before(createWhitespaceButton());
	}
}

function init(signal) {
	observe('[action="/users/diffview"]', attachButtons, {signal});
}

const shortcuts = {
	'd w': 'Show/hide whitespaces in diffs',
};

void features.add(import.meta.url, {
	shortcuts,
	include: [
		isPRFiles,
	],
	exclude: [
		isPRFile404,
		isEnterprise, // #5820
	],
	init: initPR,
}, {
	shortcuts,
	include: [
		isCompare,
	],
	init,
});

/*
# Test URLs

- PR files: https://github.com/refined-github/refined-github/pull/6261/files
- Compare, in "Files changed" tab: https://github.com/rancher/rancher/compare/v2.6.3...v2.6.6
- Compare, without tab: https://github.com/rancher/rancher/compare/v2.6.5...v2.6.6
- Single commit: https://github.com/rancher/rancher/commit/e82921075436c21120145927d5a66037661fcf4e

*/
