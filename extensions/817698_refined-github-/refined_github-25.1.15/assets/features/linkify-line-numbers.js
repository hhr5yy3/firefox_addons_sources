import { isConversation } from '../npm/github-url-detection.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isAlteredClick } from '../npm/filter-altered-clicks.js';
import features from '../feature-manager.js';

function openLinkToLine(event) {
	const cell = event.delegateTarget;
	const fileLink = cell
		.closest(['.Box', '.review-thread-component'])
		.querySelector(['a[href*="#L"]', 'a[href*="#diff-"]']);
	const url = fileLink.hash.startsWith('#diff-')
		? fileLink.pathname + fileLink.hash + `R${cell.dataset.lineNumber}`
		: fileLink.pathname + `#L${cell.dataset.lineNumber}`;

	if (isAlteredClick(event)) {
		window.open(url);
	} else {
		location.href = url;
	}
}

function init(signal) {
	delegate('td[data-line-number]:empty', 'click', openLinkToLine, {signal});
}

void features.add(import.meta.url, {
	include: [
		isConversation,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/pull/81

*/
