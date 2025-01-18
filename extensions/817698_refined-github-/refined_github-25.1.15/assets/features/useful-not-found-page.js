import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import elementReady from '../npm/element-ready.js';
import { is404, isSingleFile, isRepoTree, isEditingFile, isPRCommit404, isRepoFile404 } from '../npm/github-url-detection.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import GitHubFileURL from '../github-helpers/github-file-url.js';
import getDefaultBranch from '../github-helpers/get-default-branch.js';
import { getCleanPathname, isUrlReachable } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import GetLatestCommitToFile from './useful-not-found-page.gql.js';
import { expectToken } from '../github-helpers/github-token.js';

function getType() {
	return location.pathname.split('/').pop().includes('.') ? 'file' : 'object';
}

function getStrikeThrough(text) {
	return React.createElement('del', { className: "color-fg-subtle",}, text);
}

async function crossIfNonExistent(anchor) {
	if (anchor instanceof HTMLAnchorElement && !await isUrlReachable(anchor.href)) {
		anchor.replaceWith(getStrikeThrough(anchor.textContent));
	}
}

function parseCurrentURL() {
	const parts = getCleanPathname().split('/');
	if (parts[2] === 'blob') { // Blob URLs are never useful
		parts[2] = 'tree';
	}

	return parts;
}

async function getLatestCommitToFile(branch, filePath) {
	const {repository} = await api.v4(GetLatestCommitToFile, {
		variables: {
			branch,
			filePath,
		},
	});
	const commit = repository.object?.history.nodes[0];
	return commit?.oid;
}

async function getChangesToFileInCommit(sha, filePath) {
	// API v4 doesn't support it: https://github.community/t/what-is-the-corresponding-object-in-graphql-api-v4-for-patch-which-is-available-in-rest-api-v3/13590
	const commit = await api.v3(`commits/${sha}`);
	for (const fileInfo of commit.files ) {
		if ([fileInfo.filename, fileInfo.previous_filename].includes(filePath)) {
			return {
				commit: {
					parentSha: commit.parents[0].sha,
					date: commit.commit.committer.date,
					url: commit.html_url,
				},
				file: fileInfo,
			};
		}
	}
}

async function getUrlToFileOnDefaultBranch() {
	const parsedUrl = new GitHubFileURL(location.href);
	if (!parsedUrl.branch) {
		return;
	}

	parsedUrl.assign({branch: await getDefaultBranch()});
	const urlOnDefault = parsedUrl.href;
	if (urlOnDefault !== location.href && await isUrlReachable(urlOnDefault)) {
		return urlOnDefault;
	}
}

async function showMissingPartOnce() {
	const pathParts = parseCurrentURL();
	const breadcrumbs = [...pathParts.entries()]
		.reverse() // Checks the anchors right to left
		.map(([index, part]) => {
			if (
				// Exclude parts that don't exist as standalones
				(index === 0 && part === 'orgs') // #5483
				|| (index === 2 && ['tree', 'blob', 'edit'].includes(part))
				|| index === pathParts.length - 1 // The last part is a known 404
			) {
				return getStrikeThrough(part);
			}

			const pathname = '/' + pathParts.slice(0, index + 1).join('/');
			const link = React.createElement('a', { href: pathname,}, part);
			void crossIfNonExistent(link);
			return link;
		})
		.reverse() // Restore order
		.flatMap((link, index) => [index > 0 && ' / ', link]); // Add separators

	expectElement(['main > :first-child', '#parallax_illustration']).after(
		React.createElement('h2', { className: "container mt-4 text-center"  ,}, breadcrumbs),
	);
}

async function showDefaultBranchLink() {
	const urlToFileOnDefaultBranch = await getUrlToFileOnDefaultBranch();
	if (!urlToFileOnDefaultBranch) {
		return;
	}

	expectElement('main > .container-lg').before(
		React.createElement('p', { className: "container mt-4 text-center"  ,}
, React.createElement('a', { href: urlToFileOnDefaultBranch,}, "This " , getType()), " exists on the default branch."
),
	);
}

async function getGitObjectHistoryLink() {
	const url = new GitHubFileURL(location.href);
	if (!url.branch || !url.filePath) {
		return;
	}

	const commitSha = await getLatestCommitToFile(url.branch, url.filePath);
	if (!commitSha) {
		return;
	}

	const fileChanges = await getChangesToFileInCommit(commitSha, url.filePath);
	if (!fileChanges) {
		return;
	}

	url.assign({route: 'commits'});
	const commitHistory = React.createElement('a', { href: url.href,}, "Commit history" );
	url.assign({route: 'blob', branch: fileChanges.commit.parentSha, filePath: url.filePath});
	const lastVersionUrl = fileChanges.file.status === 'removed' ? fileChanges.file.blob_url : url.href;
	const lastVersion = React.createElement('a', { href: lastVersionUrl,}, "This " , getType());
	const permalink = (
		React.createElement('a', { href: fileChanges.commit.url,}
, React.createElement('relative-time', { datetime: fileChanges.commit.date,} )
)
	);
	const verb = fileChanges.file.status === 'removed'
		? 'deleted'
		: React.createElement('a', { href: fileChanges.file.blob_url,}, "moved");

	return (
		React.createElement('p', { className: "container mt-4 text-center"  ,}
, lastVersion, " was "  , verb, " (" , permalink, ") - "  , commitHistory, "."
)
	);
}

async function showGitObjectHistory() {
	const link = await getGitObjectHistoryLink();
	if (link) {
		expectElement('main > .container-lg').before(link);
	}
}

async function showGitObjectHistoryOnRepo(description) {
	const link = await getGitObjectHistoryLink();
	if (link) {
		link.className = 'color-fg-muted';
		description.after(link);
	}
}

async function initOnce() {
	await expectToken();

	void showDefaultBranchLink();
	void showGitObjectHistory();
}

async function initPRCommitOnce() {
	const commitUrl = location.href.replace(/pull\/\d+\/commits/, 'commit');
	if (!(await isUrlReachable(commitUrl))) {
		return false;
	}

	const blankSlateParagraph = await elementReady('.blankslate p', {waitForChildren: false});
	blankSlateParagraph.after(
		React.createElement('p', null, "You can also try to "     , React.createElement('a', { href: commitUrl,}, "view the detached standalone commit"    ), "."),
	);
}

async function initRepoFile(signal) {
	await expectToken();
	observe('#repos-header-breadcrumb-wide-heading + ol a', crossIfNonExistent, {signal});
	observe('main div[data-testid="eror-404-description"]', showGitObjectHistoryOnRepo, {signal});	// "eror" as misspelled by GitHub
}

void features.add(import.meta.url, {
	asLongAs: [
		is404,
		() => parseCurrentURL().length > 1,
	],
	awaitDomReady: true, // Small page
	init: onetime(showMissingPartOnce),
}, {
	asLongAs: [
		is404,
	],
	include: [
		isSingleFile,
		isRepoTree,
		isEditingFile,
	],
	awaitDomReady: true, // Small page
	init: onetime(initOnce),
}, {
	include: [
		isPRCommit404,
	],
	init: onetime(initPRCommitOnce),
}, {
	include: [
		isRepoFile404,
	],
	init: initRepoFile,
});

/*

Test URLs:

- 404 issue: https://github.com/refined-github/refined-github/issues/888888
- 404 file: https://github.com/refined-github/refined-github/blob/main/source/features/a-horse-with-no-name.tsx
- 410 file: https://github.com/refined-github/refined-github/blob/main/extension/content.js
- 404 ref: https://github.com/refined-github/refined-github/blob/eggs-for-branch/package.json

*/
