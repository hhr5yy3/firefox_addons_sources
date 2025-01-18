import React from '../npm/dom-chef.js';
import { expectElement, $$, elementExists } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isNotifications } from '../npm/github-url-detection.js';
import CheckCircleIcon from '../npm/octicons-plain-react-components-CheckCircle.js';
import CheckIcon from '../npm/octicons-plain-react-components-Check.js';
import DotFillIcon from '../npm/octicons-plain-react-components-DotFill.js';
import DotIcon from '../npm/octicons-plain-react-components-Dot.js';
import GitMergeIcon from '../npm/octicons-plain-react-components-GitMerge.js';
import GitPullRequestDraftIcon from '../npm/octicons-plain-react-components-GitPullRequestDraft.js';
import GitPullRequestIcon from '../npm/octicons-plain-react-components-GitPullRequest.js';
import IssueOpenedIcon from '../npm/octicons-plain-react-components-IssueOpened.js';
import SquirrelIcon from '../npm/octicons-plain-react-components-Squirrel.js';
import XCircleIcon from '../npm/octicons-plain-react-components-XCircle.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

const prIcons = ':is(.octicon-git-pull-request, .octicon-git-pull-request-closed, .octicon-git-pull-request-draft, .octicon-git-merge)';
const issueIcons = ':is(.octicon-issue-opened, .octicon-issue-closed, .octicon-skip)';
const filters = {
	'Pull requests': prIcons,
	'Issues': issueIcons,
	// This selector is a bit too loose, so it needs to be scoped to the smallest possible element and exclude the bookmark icon
	'Others': `.notification-list-item-link .octicon:not(${prIcons}, ${issueIcons}, .octicon-bookmark)`,
	'Open': ':is(.octicon-issue-opened, .octicon-git-pull-request)',
	'Closed': ':is(.octicon-issue-closed, .octicon-git-pull-request-closed, .octicon-skip)',
	'Draft': '.octicon-git-pull-request-draft',
	'Merged': '.octicon-git-merge',
	'Read': '.notification-read',
	'Unread': '.notification-unread',
} ;




function resetFilters({target}) {
	expectElement('form#rgh-select-notifications-form').reset();
	for (const label of $$('label', target )) {
		label.setAttribute('aria-checked', 'false');
	}
}

function getFiltersSelector(formData, category) {
	return formData.getAll(category).map(value => filters[value ]);
}

function handleSelection({target}) {
	const selectAllCheckbox = expectElement('input[type="checkbox"].js-notifications-mark-all-prompt');
	// Reset the "Select all" checkbox
	if (selectAllCheckbox.checked) {
		selectAllCheckbox.click();
	}

	let excluded = [];
	const toggleSelectability = (elements, state) => {
		for (const element of elements) {
			element.toggleAttribute('data-check-all-item', state);
		}
	};

	if (elementExists(':checked', target )) {
		// @ts-expect-error TS bug
		const formData = new FormData(expectElement('form#rgh-select-notifications-form'));
		const types = getFiltersSelector(formData, 'Type');
		const statuses = getFiltersSelector(formData, 'Status');
		const readStatus = getFiltersSelector(formData, 'Read');

		excluded = $$('.notifications-list-item')
			.filter(notification =>
				(types.length > 0 && !elementExists(types, notification))
				|| (statuses.length > 0 && !elementExists(statuses, notification))
				|| (readStatus.length > 0 && !notification.matches(readStatus)),
			)
			.map(notification => expectElement('.js-notification-bulk-action-check-item', notification));

		// Make excluded notifications unselectable
		toggleSelectability(excluded, false);

		// If at least one notification is selectable, trigger the "Select all" checkbox
		if (elementExists('.js-notification-bulk-action-check-item[data-check-all-item]')) {
			selectAllCheckbox.click();
		}

		// Make all notifications selectable again
		toggleSelectability(excluded, true);
	}
}

function createDropdownList(category, filters) {
	const icons = {
		'Pull requests': React.createElement(GitPullRequestIcon, { className: "color-fg-muted",} ),
		'Issues': React.createElement(IssueOpenedIcon, { className: "color-fg-muted",} ),
		'Open': React.createElement(CheckCircleIcon, { className: "color-fg-success",} ),
		'Others': React.createElement(SquirrelIcon, { className: "color-fg-muted",} ),
		'Closed': React.createElement(XCircleIcon, { className: "color-fg-danger",} ),
		'Draft': React.createElement(GitPullRequestDraftIcon, { className: "color-fg-subtle",} ),
		'Merged': React.createElement(GitMergeIcon, { className: "color-fg-done",} ),
		'Read': React.createElement(DotIcon, { className: "color-fg-accent",} ),
		'Unread': React.createElement(DotFillIcon, { className: "color-fg-accent",} ),
	};

	return (
		React.createElement('div', { className: "SelectMenu-list",}
, React.createElement('header', { className: "SelectMenu-header",}
, React.createElement('span', { className: "SelectMenu-title",}, category)
)
, filters.map(filter => (
				React.createElement('label', {
					className: "SelectMenu-item text-normal" ,
					role: "menuitemcheckbox",
					'aria-checked': "false",
					tabIndex: 0,}

, React.createElement(CheckIcon, { className: "octicon octicon-check SelectMenu-icon SelectMenu-icon--check mr-2"    , 'aria-hidden': "true",} )
, React.createElement('div', { className: "SelectMenu-item-text",}
, React.createElement('input', {
							hidden: true,
							type: "checkbox",
							name: category,
							value: filter,}
						)
, icons[filter]
, React.createElement('span', { className: "ml-2",}, filter)
)
)
			))
)
	);
}

const createDropdown = onetime(() => (
	React.createElement('details', {
		className: "details-reset details-overlay position-relative rgh-select-notifications mr-2"    ,
		onToggle: resetFilters,}

, React.createElement('summary', {
			className: "h6", // `h6` matches "Select all" style
			'data-hotkey': "Shift+S",
			'aria-haspopup': "menu",
			// Don't use tooltipped, it remains visible when the dropdown is open
			title: "Hotkey: Shift+S" ,
			role: "button",}
, "Select by "
  , React.createElement('span', { className: "dropdown-caret ml-1" ,} )
)
, React.createElement('details-menu', {
			className: "SelectMenu left-0" ,
			'aria-label': "Select by" ,
			role: "menu",
			'on-details-menu-selected': handleSelection,}

, React.createElement('div', { className: "SelectMenu-modal",}
, React.createElement('form', { id: "rgh-select-notifications-form",}
, createDropdownList('Type', ['Pull requests', 'Issues', 'Others'])
, createDropdownList('Status', ['Open', 'Closed', 'Merged', 'Draft'])
, createDropdownList('Read', ['Read', 'Unread'])
)
)
)
)
));

function closeDropdown() {
	expectElement('.rgh-select-notifications').removeAttribute('open');
}

function addDropdown(selectAllCheckbox) {
	selectAllCheckbox.style.verticalAlign = '-0.2em'; // #7852
	selectAllCheckbox.closest('label').after(
		// `h6` matches "Select all" style
		React.createElement('span', { className: "mx-2 h6" ,}, "·"),
		createDropdown(),
	);
}

function init(signal) {
	observe('input.js-notifications-mark-all-prompt', addDropdown, {signal});

	// Close the dropdown when one of the toolbar buttons is clicked
	delegate(['.js-notifications-mark-selected-actions > *', '.rgh-open-selected-button'], 'click', closeDropdown, {signal});
}

void features.add(import.meta.url, {
	shortcuts: {
		'shift s': 'Open the "Select by" dropdown',
	},
	include: [
		isNotifications,
	],
	init,
});

/*

Test URLs:

https://github.com/notifications (Grouped by date)
https://github.com/notifications (Grouped by repo)
https://github.com/notifications?query=reason%3Acomment (which is an unsaved filter)

*/
