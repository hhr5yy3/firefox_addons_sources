import React from '../npm/dom-chef.js';
import { elementExists } from '../npm/select-dom.js';
import zipTextNodes from '../_virtual/index2.js';
import { applyToLink } from '../npm/shorten-repo-url.js';
import { linkifyUrlsToDom } from '../npm/linkify-urls.js';
import { linkifyIssuesToDom } from '../npm/linkify-issues.js';
import getTextNodes from '../helpers/get-text-nodes.js';
import parseBackticks$1 from './parse-backticks.js';
import { buildRepoURL } from './index.js';

// Shared class necessary to avoid also shortening the links
const linkifiedURLClass = 'rgh-linkified-code';
const linkifiedURLSelector = '.rgh-linkified-code';

const codeElementsSelector = [
	// Sometimes formatted diffs are loaded later and discard our formatting #5870
	'.blob-code-inner:not(deferred-diff-lines.awaiting-highlight *)', // Code lines
	':is(.snippet-clipboard-content, .highlight) > pre.notranslate', // Code blocks in comments. May be wrapped twice
	'.comment-body code:not(a code, pre code)', // Inline code in comments
];

function shortenLink(link) {
	// Exclude the link if the closest element found is not `.markdown-body`
	// This avoids shortening links in code and code suggestions, but still shortens them in review comments
	// https://github.com/refined-github/refined-github/pull/4759#discussion_r702460890
	if (link.closest(String([...codeElementsSelector, '.markdown-body']))?.classList.contains('markdown-body')) {
		applyToLink(link, location.href);
	}
}

function linkifyIssues(
	currentRepo,
	element,
	options = {},
) {
	const linkified = linkifyIssuesToDom(element.textContent, {
		user: currentRepo.owner ?? '/',
		repository: currentRepo.name ?? '/',
		baseUrl: '',
		...options,
		attributes: {
			class: linkifiedURLClass, // Necessary to avoid also shortening the links
			...options.attributes,
		},
	});
	if (linkified.children.length === 0) { // Children are <a>
		return;
	}

	// Enable native issue title fetch
	for (const link of linkified.children ) {
		const issue = link.href.split('/').pop();
		link.setAttribute('class', 'issue-link js-issue-link');
		link.dataset.errorText = 'Failed to load title';
		link.dataset.permissionText = 'Title is private';
		link.dataset.url = link.href;
		link.dataset.id = `rgh-issue-${issue}`;
		link.dataset.hovercardType = 'issue';
		link.dataset.hovercardUrl = `${link.pathname}/hovercard`;
	}

	zipTextNodes(element, linkified);
}

function linkifyURLs(element) {
	if (element.textContent.length < 15) { // Must be long enough for a URL
		return;
	}

	if (elementExists(linkifiedURLSelector, element)) {
		console.warn('Links already exist', element);
		throw new Error('Links already exist');
	}

	const linkified = linkifyUrlsToDom(element.textContent, {
		attributes: {
			rel: 'noreferrer noopener',
			class: linkifiedURLClass, // Necessary to avoid also shortening the links
		},
	});

	if (linkified.children.length === 0) { // Children are <a>
		return;
	}

	zipTextNodes(element, linkified);
}

function parseBackticks(element) {
	for (const node of getTextNodes(element)) {
		const fragment = parseBackticks$1(node.textContent);

		if (fragment.children.length > 0) {
			node.replaceWith(fragment);
		}
	}
}

function linkifyCommit(sha) {
	// Data attributes copied from the commit in https://github.com/refined-github/github-url-detection/releases/tag/v7.1.2
	return (
		React.createElement('code', null
, React.createElement('a', {
				className: "Link--secondary",
				href: buildRepoURL('commit', sha),
				'data-hovercard-type': "commit",
				'data-hovercard-url': buildRepoURL('commit', sha, 'hovercard'),}

, sha.slice(0, 7)
)
)
	);
}

export { codeElementsSelector, linkifiedURLClass, linkifyCommit, linkifyIssues, linkifyURLs, parseBackticks, shortenLink };
