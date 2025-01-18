import React from '../npm/dom-chef.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isPRFiles } from '../npm/github-url-detection.js';
import { stringToBase64 } from '../npm/uint8array-extras.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import showToast from '../github-helpers/toast.js';
import { getBranches } from '../github-helpers/pr-branches.js';
import getPrInfo from '../github-helpers/get-pr-info.js';
import observe from '../helpers/selector-observer.js';
import { expectToken } from '../github-helpers/github-token.js';

async function getMergeBaseReference() {
	const {base, head} = getBranches();
	// This v3 response is relatively large, but it doesn't seem to be available on v4
	const response = await api.v3(`compare/${base.relative}...${head.relative}`);
	return response.merge_base_commit.sha; // #4679
}

async function getHeadReference() {
	const {base} = getBranches();
	const {headRefOid} = await getPrInfo(base.relative);
	return headRefOid;
}

async function getFile(filePath) {
	const ref = await getMergeBaseReference();
	const {textContent} = await api.v3(
		`contents/${filePath}?ref=${ref}`,
		{
			json: false,
			headers: {
				Accept: 'application/vnd.github.raw',
			},
		},
	);
	return textContent;
}

async function discardChanges(progress, originalFileName, newFileName) {
	const [headReference, file] = await Promise.all([
		getHeadReference(),
		getFile(originalFileName),
	]);

	const isNewFile = !file;
	const isRenamed = originalFileName !== newFileName;

	const contents = file ? stringToBase64(file) : '';
	const deleteNewFile = {deletions: [{path: newFileName}]};
	const restoreOldFile = {additions: [{path: originalFileName, contents}]};
	const fileChanges = isRenamed
		? {...restoreOldFile, ...deleteNewFile} // Renamed, maybe also changed
		: isNewFile
			? deleteNewFile // New
			: restoreOldFile; // Changes

	const {nameWithOwner, branch: prBranch} = getBranches().head;
	progress('Committing…');

	await api.v4(`
		mutation discardChanges ($input: CreateCommitOnBranchInput!) {
			createCommitOnBranch(input: $input) {
				commit {
					oid
				}
			}
		}
	`, {
		variables: {
			input: {
				branch: {
					repositoryNameWithOwner: nameWithOwner,
					branchName: prBranch,
				},
				expectedHeadOid: headReference,
				fileChanges,
				message: {
					headline: `Discard changes to ${originalFileName}`,
				},
			},
		},
	});
}

async function handleClick(event) {
	const menuItem = event.delegateTarget;

	const [originalFileName, newFileName = originalFileName] = menuItem
		.closest('[data-path]')
		.querySelector('.Link--primary')
		.textContent
		.split(' → ');
	if (!confirm(`Are you sure you want to discard changes to ${newFileName}?`))
		return;
	await showToast(async progress => discardChanges(progress, originalFileName, newFileName), {
		message: 'Loading info…',
		doneMessage: 'Changes discarded',
	});

	// Hide file from view
	menuItem.closest('.file').remove();
}

function add(editFile) {
	editFile.after(
		React.createElement('button', {
			className: "pl-5 dropdown-item btn-link rgh-restore-file"   ,
			role: "menuitem",
			type: "button",}
, "Discard changes"

),
	);
}

async function init(signal) {
	await expectToken();

	observe('.js-file-header-dropdown a[aria-label^="Change this"]', add, {signal});

	// `capture: true` required to be fired before GitHub's handlers
	delegate('.rgh-restore-file', 'click', handleClick, {capture: true, signal});
}

void features.add(import.meta.url, {
	include: [
		isPRFiles,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/pull/16/files
https://github.com/refined-github/sandbox/pull/29/files

*/
