import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { isNotifications } from '../npm/github-url-detection.js';
import { stringToBase64 } from '../npm/uint8array-extras.js';
import features from '../feature-manager.js';
import looseParseInt from '../helpers/loose-parse-int.js';
import { assertNodeContent } from '../helpers/dom-utils.js';
import observe from '../helpers/selector-observer.js';

const itemsPerNotificationsPage = 25;

function linkify(nextButton) {
	const totalNotificationsNode = expectElement('.js-notifications-list-paginator-counts').lastChild;
	assertNodeContent(totalNotificationsNode, /^of \d+$/);
	const totalNotificationsNumber = looseParseInt(totalNotificationsNode);
	const lastCursor = Math.floor((totalNotificationsNumber - 1) / itemsPerNotificationsPage) * itemsPerNotificationsPage;
	const nextButtonSearch = new URLSearchParams(nextButton.search);
	nextButtonSearch.set('after', stringToBase64(`cursor:${lastCursor}`));
	totalNotificationsNode.replaceWith(
		' of ',
		React.createElement('a', { href: '?' + String(nextButtonSearch),}
, totalNotificationsNumber
),
	);
}

function init(signal) {
	// When there's no "next page", this element becomes `<button disabled>`
	observe('a[aria-label="Next"]', linkify, {signal});
}

void features.add(import.meta.url, {
	include: [
		isNotifications,
	],
	init,
});

/*

Test URLs:

https://github.com/notifications

*/
