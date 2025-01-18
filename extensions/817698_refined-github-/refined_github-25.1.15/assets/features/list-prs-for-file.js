import React from '../npm/dom-chef.js';
import '../npm/webext-storage-cache.js';
import { isFirefox } from '../npm/webext-detect.js';
import { isSingleFile, isEditingFile } from '../npm/github-url-detection.js';
import AlertIcon from '../npm/octicons-plain-react-components-Alert.js';
import GitPullRequestIcon from '../npm/octicons-plain-react-components-GitPullRequest.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import { cacheByRepo, buildRepoURL } from '../github-helpers/index.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import observe from '../helpers/selector-observer.js';
import listPrsForFileQuery from './list-prs-for-file.gql.js';
import { expectToken } from '../github-helpers/github-token.js';
import CachedFunction from '../npm/webext-storage-cache-cached-function.js';

function getPRUrl(prNumber) {
	// https://caniuse.com/url-scroll-to-text-fragment
	const hash = isFirefox() ? '' : `#:~:text=${new GitHubFileURL(location.href).filePath}`;
	return buildRepoURL('pull', prNumber, 'files') + hash;
}

function getHovercardUrl(prNumber) {
	return buildRepoURL('pull', prNumber, 'hovercard');
}

const buttonId = 'rgh-list-prs-for-file-';
let count = 0;

function getDropdown(prs) {
	const isEditing = isEditingFile();
	const icon = isEditing
		? React.createElement(AlertIcon, { className: "color-fg-attention",} )
		: React.createElement(GitPullRequestIcon, null );

	count++;
	return (
		React.createElement('div', null
, React.createElement('button', {
				type: "button",
				className: "Button Button--secondary color-fg-muted"  ,
				id: buttonId + count,
				// @ts-expect-error HTML standard
				popovertarget: buttonId + 'popover-' + count,}

, icon
, React.createElement('span', { className: "color-fg-default",}, " " , prs.length, " " )
, React.createElement('div', { className: "dropdown-caret",} )
)

, React.createElement('anchored-position', {
				id: buttonId + 'popover-' + count,
				anchor: buttonId + count,
				popover: "auto",}

, React.createElement('div', { className: "Overlay Overlay--size-auto" ,}
, React.createElement('div', { className: "px-3 pt-3 h6 color-fg-muted"   ,}, "File also being edited in"

)
, React.createElement('ul', { className: "ActionListWrap ActionListWrap--inset" ,}
, prs.map(prNumber => (
							React.createElement('li', { className: "ActionListItem",}
, React.createElement('a', {
									className: "ActionListContent js-hovercard-left" ,
									href: getPRUrl(prNumber),
									'data-hovercard-url': getHovercardUrl(prNumber),}
, "#"
, prNumber
)
)
						))
)
)
)
)
	);
}

/**
@returns prsByFile {"filename1": [10, 3], "filename2": [2]}
*/
const getPrsByFile = new CachedFunction('files-with-prs', {
	async updater() {
		const {repository} = await api.v4(listPrsForFileQuery, {
			variables: {
				defaultBranch: await getDefaultBranch(),
			},
		});

		const files = {};

		for (const pr of repository.pullRequests.nodes) {
			for (const {path} of pr.files.nodes) {
				files[path] ??= [];
				if (files[path].length < 10) {
					files[path].push(pr.number);
				}
			}
		}

		return files;
	},
	maxAge: {hours: 2},
	staleWhileRevalidate: {days: 9},
	cacheKey: cacheByRepo,
});

async function add(anchor) {
	const path = new GitHubFileURL(location.href).filePath;
	const prsByFile = await getPrsByFile.get();
	let prs = prsByFile[path];

	if (!prs) {
		return;
	}

	const editingPRNumber = new URLSearchParams(location.search).get('pr')?.split('/').slice(-1);
	if (editingPRNumber) {
		prs = prs.filter(pr => pr !== Number(editingPRNumber));
		if (prs.length === 0) {
			return;
		}
	}

	const dropdown = getDropdown(prs);
	if (anchor.parentElement.matches('.gap-2')) {
		// `isSingleFile`
		anchor.before(dropdown);
	} else {
		// `isEditingFile`
		dropdown.classList.add('mr-2');
		anchor.parentElement.prepend(dropdown);
	}
}

async function init(signal) {
	await expectToken();

	observe([
		'[aria-label="More file actions"]', // `isSingleFile`
		'[data-hotkey="Mod+s"]', // `isEditingFile`
	], add, {signal});
}

void features.add(import.meta.url, {
	include: [
		isSingleFile,
		isEditingFile,
	],
	init,
});

/*

## Test URLs

- isSingleFile: https://github.com/refined-github/sandbox/blob/6619/6619
- isEditingFile: https://github.com/refined-github/sandbox/edit/6619/6619

*/
