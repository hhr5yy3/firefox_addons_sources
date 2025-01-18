import delegate from '../npm/delegate-it-delegate.js';

const fieldSelector = [
	'#commit-summary-input', // Commit title on edit file page
	'#merge_title_field', // PR merge message field
];

function onCommitTitleUpdate(callback, signal) {
	// GitHub restores the value from the previous session and only triggers this event
	delegate(fieldSelector, 'change', callback, {signal});

	// For immediate user input
	delegate(fieldSelector, 'input', callback, {signal});
}

export { onCommitTitleUpdate as default };
