import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import { isPRConversation } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function linkify(textLine) {
	const url = expectElement('a.dropdown-item[href^="#pullrequestreview-"]', textLine.parentElement);
	// `lastChild` is a textNode
	wrap(textLine.lastChild, React.createElement('a', { href: url.hash,} ));
}

function init(signal) {
	observe('.merge-status-item.review-item [title*="requested changes"]', linkify, {signal});
}

void features.add(import.meta.url, {
	include: [
		isPRConversation,
	],
	init,
});

/*
Test URLs

https://github.com/ipaddress-gem/ipaddress/pull/22#partial-pull-merging
*/
