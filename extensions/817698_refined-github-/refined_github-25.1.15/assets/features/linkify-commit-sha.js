import React from '../npm/dom-chef.js';
import { $ } from '../npm/select-dom.js';
import { isPRCommit } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';

function init() {
	const element = $('.sha.user-select-contain:not(a *)');
	if (element) {
		wrap(element, React.createElement('a', { href: location.pathname.replace(/pull\/\d+\/commits/, 'commit'),} ));
	}
}

void features.add(import.meta.url, {
	include: [
		isPRCommit,
	],
	awaitDomReady: true,
	init,
});

/*

Test URLs:

https://github.com/refined-github/refined-github/pull/1429/commits/b533ffa5820d825e1730c62d11acb2edbfb2d7dd

*/
