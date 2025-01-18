import { $$, expectElement } from '../npm/select-dom.js';
import { onAbort } from '../npm/abort-utils-on-abort.js';
import { isPRFiles } from '../npm/github-url-detection.js';
import debounceFunction from '../npm/debounce-fn.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import clickAll from '../helpers/click-all.js';
import showToast from '../github-helpers/toast.js';
import getItemsBetween from '../helpers/get-items-between.js';

let previousFile;
let runningBatch = false;

function remember(event) {
	// Only remember if the user clicked it. `isTrusted` doesn't work because `remember` is called on a fake `submit` event
	if (!runningBatch) {
		previousFile = event.delegateTarget.closest('.js-file');
	}
}

function isChecked(file) {
	return expectElement('input.js-reviewed-checkbox', file).checked;
}

// A single click is somehow causing two separate trusted `click` events, so it needs to be debounced
const batchToggle = debounceFunction((event) => {
	if (!event.shiftKey) {
		return;
	}

	event.stopImmediatePropagation();

	const files = $$('.js-file');
	const thisFile = event.delegateTarget.closest('.js-file');
	const isThisBeingFileChecked = !isChecked(thisFile); // Flip it because the value hasn't changed yet

	runningBatch = true;
	const selectedFiles = getItemsBetween(files, previousFile, thisFile);
	for (const file of selectedFiles) {
		if (
			file !== thisFile
			// `checkVisibility` excludes filtered-out files
			// https://github.com/refined-github/refined-github/issues/7819
			&& file.checkVisibility()
			&& isChecked(file) !== isThisBeingFileChecked
		) {
			expectElement('.js-reviewed-checkbox', file).click();
		}
	}

	runningBatch = false;
}, {
	before: true,
	after: false,
});

function markAsViewedSelector(target) {
	const checked = isChecked(target) ? ':not([checked])' : '[checked]';
	// The `hidden` attribute excludes filtered-out files
	// https://github.com/refined-github/refined-github/issues/7819
	return '.file:not([hidden]) .js-reviewed-checkbox' + checked;
}

const markAsViewed = clickAll(markAsViewedSelector);

// A single click is somehow causing two separate trusted `click` events, so it needs to be debounced
const onAltClick = debounceFunction((event) => {
	if (!event.altKey || !event.isTrusted) {
		return;
	}

	const newState = isChecked(event.delegateTarget) ? 'unviewed' : 'viewed';
	void showToast(async () => {
		markAsViewed(event);
	}, {
		message: `Marking visible files as ${newState}`,
		doneMessage: `Files marked as ${newState}`,
	});
}, {
	before: true,
	after: false,
});

function avoidSelectionOnShiftClick(event) {
	if (event.shiftKey) {
		event.preventDefault();
	}
}

function init(signal) {
	delegate('.js-reviewed-toggle', 'click', onAltClick, {signal});
	delegate('.js-reviewed-toggle', 'click', batchToggle, {signal});
	delegate('.js-reviewed-toggle', 'mousedown', avoidSelectionOnShiftClick, {signal});
	delegate('.js-toggle-user-reviewed-file-form', 'submit', remember, {signal});
	onAbort(signal, () => {
		previousFile = undefined;
	});
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/pull/55/files

Use this style to avoid layout shift while testing:

```css
table {display: none !important;}
```

*/
