import React from '../npm/dom-chef.js';
import { isSingleFile, isRepoTree, isBlame, isRepoHome } from '../npm/github-url-detection.js';
import VersionsIcon from '../npm/octicons-plain-react-components-Versions.js';
import { elementExists, expectElement } from '../npm/select-dom.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';
import api from '../github-helpers/api.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import previousVersionQuery from './previous-version.gql.js';
import onReactPageUpdate from '../github-events/on-react-page-update.js';
import { expectToken } from '../github-helpers/github-token.js';

async function getPreviousCommitForFile(pathname) {
	const {user, repository, branch, filePath} = new GitHubFileURL(pathname);
	const {resource} = await api.v4(previousVersionQuery, {
		variables: {
			filePath,
			resource: `/${user}/${repository}/commit/${branch}`,
		},
	});

	// The first commit refers to the current one, so we skip it
	return resource.history.nodes[1]?.oid;
}

async function getPreviousFileUrl() {
	const previousCommit = await getPreviousCommitForFile(location.href);
	if (!previousCommit) {
		return;
	}

	return new GitHubFileURL(location.href)
		.assign({branch: previousCommit})
		.href;
}

function addMobileDom(wrappedHistoryButton) {
	const wrappedPreviousButton = wrappedHistoryButton.cloneNode(true);
	wrappedPreviousButton.setAttribute('aria-label', 'Previous version');
	const previousButton = expectElement('a', wrappedPreviousButton);
	previousButton.classList.add('rgh-previous-version-mobile');
	wrappedHistoryButton.before(wrappedPreviousButton);
	return previousButton;
}

function addDesktopDom(historyButton) {
	const previousButton = historyButton.cloneNode(true);
	previousButton.classList.add('mr-n2', 'rgh-previous-version-desktop');
	expectElement('span[data-component="text"]', previousButton).textContent = 'Previous';
	historyButton.before(previousButton);
	return previousButton;
}

async function add(historyButton, {signal}) {
	const url = await getPreviousFileUrl();
	if (!url) {
		return;
	}

	// The button might be labeled or inside a role="tooltip" element.
	// If it has a tooltip, we need to clone the tooltip element itself, not the button.
	const wrappedHistoryButton = historyButton.closest('[role="tooltip"]');

	if (elementExists(wrappedHistoryButton ? '.rgh-previous-version-mobile' : '.rgh-previous-version-desktop')) {
		return;
	}

	const previousButton = wrappedHistoryButton
		? addMobileDom(wrappedHistoryButton)
		: addDesktopDom(historyButton);

	previousButton.href = url;
	expectElement('span[data-component="leadingVisual"] svg', previousButton).replaceWith(
		React.createElement(VersionsIcon, null ),
	);

	onReactPageUpdate(async pageUnload => {
		const url = await getPreviousFileUrl();
		if (pageUnload.aborted) {
			return;
		}

		if (url) {
			previousButton.href = url;
		}

		previousButton.hidden = !url;
	}, signal);
}

async function init(signal) {
	await expectToken();
	observe('a:has([data-component="leadingVisual"] svg.octicon-history)', add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isSingleFile,
		isRepoTree,
		isBlame,
	],
	exclude: [
		isRepoHome,
	],
	init,
});

/*

Test URL

https://github.com/refined-github/refined-github/tree/main/source
https://github.com/refined-github/refined-github/blob/main/readme.md

*/
