import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { hasComments } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { upperCaseFirst } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';

function preview(hiddenCommentHeader) {
	const details = hiddenCommentHeader.closest('details');
	details.classList.add('rgh-preview-hidden-comments'); // Used in CSS

	const comment = expectElement('.comment-body', details);
	const commentText = comment.textContent.trim();
	if (commentText.length === 0) {
		return;
	}

	const commentHeader = hiddenCommentHeader.textContent;
	if (/disruptive|spam/.test(commentHeader)) {
		return;
	}

	// The reason is missing/lost in some cases
	const reason = /duplicate|outdated|off-topic|hidden/.exec(commentHeader)?.[0];
	hiddenCommentHeader.classList.add('css-truncate', 'css-truncate-overflow', 'mr-2');
	hiddenCommentHeader.append(
		React.createElement('span', { className: "Details-content--open",}, hiddenCommentHeader.firstChild),
		React.createElement('span', { className: "Details-content--closed",}
, reason && React.createElement('span', { className: "Label mr-2" ,}, upperCaseFirst(reason)), commentText.slice(0, 100)
),
	);
}

function init(signal) {
	// `.timeline-comment-group` excludes review comments, which are always loaded on click, so it's not possible to preview them
	observe('.timeline-comment-group .minimized-comment .timeline-comment-header-text', preview, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasComments,
	],
	init,
});

/*
Test URLs
https://github.com/refined-github/sandbox/pull/47
*/
