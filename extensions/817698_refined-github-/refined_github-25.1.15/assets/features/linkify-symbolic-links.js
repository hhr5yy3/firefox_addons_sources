import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import { isSingleFile, isRepoFile404 } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';

function init() {
	if ($('.file-mode')?.textContent === 'symbolic link') {
		const line = expectElement('.js-file-line');
		wrap(line.firstChild, React.createElement('a', { href: line.textContent, 'data-turbo-frame': "repo-content-turbo-frame",} ));
	}
}

void features.add(import.meta.url, {
	include: [
		isSingleFile,
	],
	exclude: [
		isRepoFile404,
	],
	deduplicate: 'has-rgh',
	awaitDomReady: true, // Small page
	init,
});

/*

Test URLs:

https://github.com/wmluke/angular-flash/blob/0.1.14/app/components

*/
