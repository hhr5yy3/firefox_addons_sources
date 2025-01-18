import React from '../npm/dom-chef.js';
import FoldDownIcon from '../npm/octicons-plain-react-components-FoldDown.js';
import { hasRichTextEditor } from '../npm/github-url-detection.js';
import { insertTextIntoField } from '../npm/text-field-edit.js';
import delegate from '../npm/delegate-it-delegate.js';
import { expectElement } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import smartBlockWrap from '../helpers/smart-block-wrap.js';
import observe from '../helpers/selector-observer.js';
import { triggerActionBarOverflow } from '../github-helpers/index.js';

function addContentToDetails({delegateTarget}) {
	const container = delegateTarget.closest(['form', '[data-testid="comment-composer"]']);

	/* There's only one rich-text editor even when multiple fields are visible; the class targets it #5303 */
	const field = expectElement([
		'textarea.js-comment-field', // TODO: remove after March 2025
		'textarea[aria-labelledby="comment-composer-heading"]',
	], container);
	const selection = field.value.slice(field.selectionStart, field.selectionEnd);

	// Don't indent <summary> because indentation will not be automatic on multi-line content
	const newContent = `
		<details>
		<summary>Details</summary>

		${selection}

		</details>
	`.replaceAll(/(\n|\b)\t+/g, '$1').trim();

	field.focus();
	insertTextIntoField(field, smartBlockWrap(newContent, field));

	// Restore selection.
	// `selectionStart` will be right after the newly-inserted text
	field.setSelectionRange(
		field.value.lastIndexOf('</summary>', field.selectionStart) + '</summary>'.length + 2,
		field.value.lastIndexOf('</details>', field.selectionStart) - 2,
	);
}

function append(container) {
	const classes = [
		'Button',
		'Button--iconOnly',
		'Button--invisible',
		'Button--medium',
		'tooltipped',
		'tooltipped-sw',
		'rgh-collapsible-content-btn',
	];

	const divider = expectElement([
		'hr[data-targets="action-bar.items"]', // TODO: remove after March 2025
		'[class^="Toolbar-module__divider"]',
	], container).cloneNode(true) ;

	container.append(
		divider,
		React.createElement('button', {
			type: "button",
			className: classes.join(' '),
			'aria-label': "Add collapsible content"  ,
			'data-targets': "action-bar.items",}

, React.createElement(FoldDownIcon, null )
),
	);

	if (container.getAttribute('aria-label') === 'Formatting tools')
		return;

	// Only needed on the old version
	// TODO: remove after March 2025
	triggerActionBarOverflow(container);
}

function init(signal) {
	observe(
		[
			'[data-target="action-bar.itemContainer"]', // TODO: remove after March 2025
			'[aria-label="Formatting tools"]',
		],
		append,
		{signal},
	);
	delegate('.rgh-collapsible-content-btn', 'click', addContentToDetails, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
	],
	init,
});

/*

Test URLs:

- Any issue or PR

*/
