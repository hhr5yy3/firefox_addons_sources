import { $, elementExists, expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { isCompare } from '../npm/github-url-detection.js';
import { setFieldText, insertTextIntoField } from '../npm/text-field-edit.js';
import features from '../feature-manager.js';
import looseParseInt from '../helpers/loose-parse-int.js';

function interpretNode(node) {
	switch (node instanceof Element && node.tagName) {
		case false:
		case 'A': {
			return node.textContent;
		}

		case 'CODE': {
			// Restore backticks that GitHub loses when rendering them
			return '`' + node.textContent + '`';
		}
			// Ignore other nodes, like `<span>...</span>` that appears when commits have a body
	}
}

function getFirstCommit() {
	const titleParts = expectElement('.js-commits-list-item:first-child p').childNodes;

	const body = $('.js-commits-list-item:first-child .Details-content--hidden pre')
		?.textContent
		.trim() ?? undefined;

	const title = [...titleParts]
		.map(node => interpretNode(node))
		.join('')
		.trim();

	return {title, body};
}

async function init() {
	const sessionResumeId = $('meta[name="session-resume-id"]')?.content;
	const previousTitle = sessionResumeId && sessionStorage.getItem(`session-resume:${sessionResumeId}`);
	if (previousTitle) {
		// The user already altered the PR title/body in a previous load, don't overwrite it
		// https://github.com/refined-github/refined-github/issues/7191
		return false;
	}

	const requestedContent = new URL(location.href).searchParams;
	const commitCountIcon = await elementReady('div.Box.mb-3 .octicon-git-commit');
	const commitCount = commitCountIcon?.nextElementSibling;
	if (!commitCount || looseParseInt(commitCount) < 2 || !elementExists('#new_pull_request')) {
		return false;
	}

	const firstCommit = getFirstCommit();
	if (!requestedContent.has('pull_request[title]')) {
		setFieldText(
			expectElement('#pull_request_title'),
			firstCommit.title,
		);
	}

	if (firstCommit.body && !requestedContent.has('pull_request[body]')) {
		insertTextIntoField(
			expectElement('#pull_request_body'),
			firstCommit.body,
		);
	}
}

void features.add(import.meta.url, {
	include: [
		isCompare,
	],
	deduplicate: 'has-rgh',
	init,
});

/*
Test URLs

https://github.com/refined-github/sandbox/compare/rendered-commit-title?expand=1
*/
