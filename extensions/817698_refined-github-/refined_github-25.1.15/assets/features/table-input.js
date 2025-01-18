import React from '../npm/dom-chef.js';
import TableIcon from '../npm/octicons-plain-react-components-Table.js';
import { hasRichTextEditor } from '../npm/github-url-detection.js';
import { insertTextIntoField } from '../npm/text-field-edit.js';
import delegate from '../npm/delegate-it-delegate.js';
import { expectElement } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import smartBlockWrap from '../helpers/smart-block-wrap.js';
import observe from '../helpers/selector-observer.js';

function addTable({delegateTarget: square}) {
	const container = square.closest('[data-testid="comment-composer"]');
	const field = expectElement(
		'textarea[aria-labelledby="comment-composer-heading"]',
		container,
	);
	const cursorPosition = field.selectionStart;

	const columns = Number(square.dataset.x);
	const rows = Number(square.dataset.y);
	const row = columns === 1
		// One HTML line per row
		? '<tr><td>\n'

		// <tr> on its own line
		// "1 space" indents without causing unwanted Markdown code blocks that 4 spaces would cause
		: '<tr>\n' + ' <td>\n'.repeat(columns);
	field.focus();
	const table = '<table>\n' + row.repeat(rows) + '</table>';
	insertTextIntoField(field, smartBlockWrap(table, field));

	// Move caret to first cell
	field.selectionEnd = field.value.indexOf('<td>', cursorPosition) + '<td>'.length;
}

function append(container) {
	container.append(
		React.createElement('details', { className: "details-reset details-overlay select-menu select-menu-modal-right hx_rsm"    ,}
, React.createElement('summary', {
				className: "Button Button--iconOnly Button--invisible Button--medium"   ,
				role: "button",
				'aria-label': "Add a table"  ,
				'aria-haspopup': "menu",}

, React.createElement('div', {
					className: "tooltipped tooltipped-sw" ,
					'aria-label': "Add a table"  ,}

, React.createElement(TableIcon, null )
)
)
, React.createElement('details-menu', {
				className: "select-menu-modal position-absolute right-0 hx_rsm-modal rgh-table-input"    ,
				role: "menu",}

, Array.from({length: 25}).map((_, index) => (
					React.createElement('button', {
						type: "button",
						role: "menuitem",
						className: "rgh-tic btn-link" ,
						'data-x': (index % 5) + 1,
						'data-y': Math.floor(index / 5) + 1,}
					)
				))
)
),
	);
}

function init(signal) {
	observe('[aria-label="Formatting tools"]', append, {signal});
	delegate('.rgh-tic', 'click', addTable, {signal});
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
