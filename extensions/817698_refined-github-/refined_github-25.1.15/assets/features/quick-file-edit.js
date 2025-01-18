import React from '../npm/dom-chef.js';
import PencilIcon from '../npm/octicons-plain-react-components-Pencil.js';
import { isRepoTree, isRepoFile404 } from '../npm/github-url-detection.js';
import { wrap } from '../helpers/dom-utils.js';
import features from '../feature-manager.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import { isArchivedRepoAsync, isPermalink } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import { directoryListingFileIcon } from '../github-helpers/selectors.js';

async function linkifyIcon(fileIcon) {
	const fileLink = fileIcon
		.closest('.react-directory-filename-column')
		.querySelector('a.Link--primary');

	const url = new GitHubFileURL(fileLink.href).assign({
		route: 'edit',
	});

	wrap(fileIcon, React.createElement('a', { href: url.href, className: "rgh-quick-file-edit",} ));
	fileIcon.after(React.createElement(PencilIcon, null ));
}

async function init(signal) {
	observe(directoryListingFileIcon, linkifyIcon, {signal});
}

void features.add(import.meta.url, {
	include: [
		isRepoTree,
	],
	exclude: [
		isRepoFile404,
		isArchivedRepoAsync,
		isPermalink,
	],
	init,
});

/*

Test URLs

Legacy views: https://github.com/refined-github/refined-github
React views: https://github.com/refined-github/refined-github/tree/main/.github

*/
