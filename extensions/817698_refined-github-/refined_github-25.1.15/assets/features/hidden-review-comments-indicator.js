import memoize from '../npm/memoize.js';
import React from '../npm/dom-chef.js';
import { countElements, $$ } from '../npm/select-dom.js';
import CommentIcon from '../npm/octicons-plain-react-components-Comment.js';
import { isPRFiles } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import { onAbort } from '../npm/abort-utils-on-abort.js';
import features from '../feature-manager.js';
import preserveScroll from '../helpers/preserve-scroll.js';
import observe from '../helpers/selector-observer.js';

// When an indicator is clicked, this will show comments on the current file
function handleIndicatorClick({delegateTarget}) {
	const commentedLine = delegateTarget.closest('tr').previousElementSibling;
	const resetScroll = preserveScroll(commentedLine);
	delegateTarget
		.closest('.file.js-file')
		.querySelector('input.js-toggle-file-notes')
		.click();

	resetScroll();
}

// `mem` avoids adding the indicator twice to the same thread
const addIndicator = memoize((commentThread) => {
	const commentCount = countElements('.review-comment.js-comment', commentThread);
	commentThread.before(
		React.createElement('tr', null
, React.createElement('td', { className: "rgh-comments-indicator blob-num" , colSpan: 2,}
, React.createElement('button', { type: "button", className: "btn-link",}
, React.createElement(CommentIcon, null )
, React.createElement('span', null, commentCount)
)
)
),
	);
});

// Add indicator when the `show-inline-notes` class is removed (i.e. the comments are hidden)
const indicatorToggleObserver = new MutationObserver(mutations => {
	for (const mutation of mutations) {
		const file = mutation.target ;
		const wasVisible = mutation.oldValue.includes('show-inline-notes');
		const isHidden = !file.classList.contains('show-inline-notes');
		if (wasVisible && isHidden) {
			for (const thread of $$('tr.inline-comments', file)) {
				addIndicator(thread);
			}
		}
	}
});

function init(signal) {
	observe('.file.js-file', element => {
		// #observe won't observe the same element twice
		// TODO: toggle visibility via :has selector instead
		indicatorToggleObserver.observe(element, {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: ['class'],
		});
	}, {signal});

	delegate('.rgh-comments-indicator', 'click', handleIndicatorClick, {signal});

	onAbort(signal, indicatorToggleObserver);
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
	],
	init,
});

/*
Test URLs:

https://github.com/refined-github/sandbox/pull/18/files

*/
