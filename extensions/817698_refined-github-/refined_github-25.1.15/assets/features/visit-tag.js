import React from '../npm/dom-chef.js';
import { elementExists } from '../npm/select-dom.js';
import ArrowUpRightIcon from '../npm/octicons-plain-react-components-ArrowUpRight.js';
import CodeIcon from '../npm/octicons-plain-react-components-Code.js';
import { isRepoTree, isSingleFile, isReleasesOrTags, isSingleReleaseOrTag } from '../npm/github-url-detection.js';
import { branchSelector } from '../github-helpers/selectors.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import { wrapAll } from '../helpers/dom-utils.js';
import { buildRepoURL } from '../github-helpers/index.js';

async function addLink(branchSelector) {
	if (elementExists([
		// If the branch picker is open, do nothing #7491
		'#selectPanel',

		// React view deduplication https://github.com/refined-github/refined-github/issues/7601
		'.rgh-visit-tag',
	])) {
		return;
	}

	const tag = branchSelector.getAttribute('aria-label')?.replace(/ tag$/, '');
	if (!tag) {
		throw new Error('Tag not found in DOM. The feature needs to be updated');
	}

	wrapAll(
		React.createElement('div', { className: "d-flex gap-2" ,} ),
		branchSelector,
		React.createElement('a', {
			className: "btn px-2 tooltipped tooltipped-se rgh-visit-tag"    ,
			href: buildRepoURL('releases/tag', tag),
			'aria-label': "Visit tag" ,}

, React.createElement(ArrowUpRightIcon, null )
),
	);
}

function replaceIcon(tagIcon) {
	// https://github.com/refined-github/refined-github/issues/6499#issuecomment-1505256426
	tagIcon.replaceWith(React.createElement(CodeIcon, null ));
}

function clarifyIcon(signal) {
	observe('.Link[href*="/tree/"] svg.octicon-tag', replaceIcon, {signal});
}

function init(signal) {
	observe(`:is(${branchSelector}):has(.octicon-tag)`, addLink, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoTree,
		isSingleFile,
	],
	init,
}, {
	include: [
		isReleasesOrTags,
		isSingleReleaseOrTag,
	],
	init: clarifyIcon,
});

/*

Test URLs:

- https://github.com/refined-github/refined-github/tree/23.11.15
- https://github.com/refined-github/refined-github/blob/23.4.10/.editorconfig

Second part:

- https://github.com/refined-github/refined-github/releases
- https://github.com/refined-github/refined-github/releases/tag/23.11.15
- https://github.com/saadeghi/daisyui/releases/tag/v4.4.15

*/
