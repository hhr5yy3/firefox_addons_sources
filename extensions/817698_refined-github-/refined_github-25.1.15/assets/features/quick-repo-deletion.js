import React from '../npm/dom-chef.js';
import elementReady from '../npm/element-ready.js';
import { expectElement, $ } from '../npm/select-dom.js';
import { isRepoRoot, isForkedRepo, isRepoSettings, isOrganizationRepo } from '../npm/github-url-detection.js';
import { setFieldText } from '../npm/text-field-edit.js';
import TrashIcon from '../npm/octicons-plain-react-components-Trash.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import { buildRepoURL, getRepo, getForkedRepo } from '../github-helpers/index.js';
import observe from '../helpers/selector-observer.js';
import { userIsAdmin } from '../github-helpers/get-user-permission.js';
import { expectTokenScope } from '../github-helpers/github-token.js';
import addNotice from '../github-widgets/notice-bar.js';
import api from '../github-helpers/api.js';
import showToast from '../github-helpers/toast.js';

const tooltip = 'Instant deletion: shift-alt-click';
const buttonHashSelector = '#dialog-show-repo-delete-menu-dialog';

// Only if the repository hasn't been starred
async function isRepoUnpopular() {
	const counter = await elementReady('.starring-container .Counter');
	return counter.textContent === '0';
}

async function deleteRepository() {
	const {nameWithOwner} = getRepo();
	await expectTokenScope('delete_repo');
	await api.v3('/repos/' + nameWithOwner, {
		method: 'DELETE',
		json: false,
	});
}

async function modifyUIAfterSuccessfulDeletion() {
	const {nameWithOwner, owner} = getRepo();
	const forkSource = '/' + getForkedRepo();
	const restoreURL = isOrganizationRepo()
		? `/organizations/${owner}/settings/deleted_repositories`
		: '/settings/deleted_repositories';
	const otherForksURL = `/${owner}?tab=repositories&type=fork`;

	await addNotice(
		React.createElement(React.Fragment, null
, React.createElement(TrashIcon, null )
, React.createElement('span', null, "Repository "
 , React.createElement('strong', null, nameWithOwner), " deleted. "  , React.createElement('a', { href: restoreURL,}, "Restore it" ), ", " , React.createElement('a', { href: forkSource,}, "visit the source repo"   ), ", or see "   , React.createElement('a', { href: otherForksURL,}, "your other forks."  )
)
),
		{action: false},
	);
	expectElement('.application-main').remove();
}

async function handleShiftAltClick(event) {
	if (!event.shiftKey || !event.altKey) {
		return;
	}

	event.preventDefault();

	// Can't really prevent default, so we must close the dialog if we're on the repo settings page
	// https://github.com/refined-github/refined-github/pull/7866#issuecomment-2396270060
	$('#' + event.delegateTarget.getAttribute('data-show-dialog-id'))?.close();

	if (confirm('Are you sure you want to delete this repository?')) {
		await showToast(deleteRepository, {
			message: 'Deleting repo…',
			doneMessage: 'Repo deleted',
		});

		modifyUIAfterSuccessfulDeletion();
	}
}

function addShortcutTooltip(button) {
	button.setAttribute('title', tooltip);
}

function addButton(header) {
	header.prepend(
		React.createElement('li', null
, React.createElement('a', {
				href: buildRepoURL('settings', buttonHashSelector),
				className: "btn btn-sm btn-danger rgh-quick-repo-deletion"   ,
				title: tooltip,}

, React.createElement(TrashIcon, { className: "mr-2",} ), "Delete fork"

)
),
	);
}

function autoFill(field) {
	setFieldText(field, getRepo().nameWithOwner);
}

function autoOpenModal(signal) {
	expectElement(buttonHashSelector).click();
	observe('.js-repo-delete-proceed-confirmation', autoFill, {signal});
}

async function initRepoRoot(signal) {
	observe('.pagehead-actions', addButton, {signal});
	delegate('.rgh-quick-repo-deletion', 'click', handleShiftAltClick, {signal});
}

async function initRepoSettings(signal) {
	delegate(buttonHashSelector, 'click', handleShiftAltClick, {signal});
	observe(buttonHashSelector, addShortcutTooltip, {signal});
}

void features.add(import.meta.url, {
	asLongAs: [
		isRepoRoot,
		isForkedRepo,
		userIsAdmin,
		isRepoUnpopular,
	],
	init: initRepoRoot,
}, {
	include: [
		isRepoSettings,
	],
	init: initRepoSettings,
}, {
	include: [
		() => location.hash === buttonHashSelector,
	],
	awaitDomReady: true, // The expected element is towards the bottom of the page
	init: autoOpenModal,
});

/*

Test URLs:

1. Fork a repo, like https://github.com/left-pad/left-pad
2. Star it to see if the "Delete fork" button disappears
3. Click "Delete fork"
4. The confirmation dialog should appear
5. On the last step, the repo name field should be auto-filled

*/
