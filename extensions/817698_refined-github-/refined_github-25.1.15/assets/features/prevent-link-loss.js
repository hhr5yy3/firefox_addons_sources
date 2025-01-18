import React from '../npm/dom-chef.js';
import { expectElement, $ } from '../npm/select-dom.js';
import AlertIcon from '../npm/octicons-plain-react-components-Alert.js';
import debounceFunction from '../npm/debounce-fn.js';
import { hasRichTextEditor } from '../npm/github-url-detection.js';
import { replaceFieldText } from '../npm/text-field-edit.js';
import delegate from '../npm/delegate-it-delegate.js';
import features from '../feature-manager.js';
import { prCommitUrlRegex, preventPrCommitLinkLoss, prCompareUrlRegex, preventPrCompareLinkLoss, discussionUrlRegex, preventDiscussionLinkLoss } from '../github-helpers/prevent-link-loss.js';
import createBanner from '../github-helpers/banner.js';

const fieldSelector = [
	'textarea.js-comment-field',
	'textarea[aria-labelledby="comment-composer-heading"]', // React view
] ;

const documentation = 'https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#prevent-link-loss';

function handleButtonClick({currentTarget: fixButton}) {
	const field = expectElement(
		fieldSelector,
		fixButton.closest(['form', '[data-testid="markdown-editor-comment-composer"]']),
	);

	replaceFieldText(field, prCommitUrlRegex, preventPrCommitLinkLoss);
	replaceFieldText(field, prCompareUrlRegex, preventPrCompareLinkLoss);
	replaceFieldText(field, discussionUrlRegex, preventDiscussionLinkLoss);
	fixButton.closest('.flash').remove();
}

function getUI(container) {
	return $('.rgh-prevent-link-loss-container', container) ?? (createBanner({
		icon: React.createElement(AlertIcon, { className: "m-0",} ),
		text: (
			React.createElement(React.Fragment, null
, ' Your link may be '
, React.createElement('a', { href: documentation, target: "_blank", rel: "noopener noreferrer" , 'data-hovercard-type': "issue",}, "misinterpreted"

)
, ' by GitHub.'
)
		),
		classes: [
			'rgh-prevent-link-loss-container',
			'flash-warn',
			'my-2',
			container.tagName === 'FORM' ? 'mx-2' : '',
		],
		action: handleButtonClick,
		buttonLabel: 'Fix link',
	}));
}

function isVulnerableToLinkLoss(value) {
	// The replacement logic is not just in the regex, so it alone can't be used to detect the need for the replacement
	return value !== value.replace(prCommitUrlRegex, preventPrCommitLinkLoss)
		|| value !== value.replace(prCompareUrlRegex, preventPrCompareLinkLoss)
		|| value !== value.replace(discussionUrlRegex, preventDiscussionLinkLoss);
}

function updateUI({delegateTarget: field}) {
	if (isVulnerableToLinkLoss(field.value)) {
		if (field.form) {
			expectElement('file-attachment .js-write-bucket', field.form).append(getUI(field.form));
		} else {
			// React view
			const container = field.closest('[data-testid="markdown-editor-comment-composer"]');
			container.append(getUI(container));
		}
	} else {
		getUI(field).remove();
	}
}

const updateUIDebounced = debounceFunction(updateUI, {
	wait: 300,
});

function init(signal) {
	delegate(fieldSelector, 'input', updateUIDebounced, {signal});
	delegate(fieldSelector, 'focusin', updateUI, {signal});
}

void features.add(import.meta.url, {
	include: [
		hasRichTextEditor,
	],
	init,
});

/*

Test URLs:

Test link: `https://github.com/refined-github/refined-github/pull/6954/commits/32d1c8b2e1b6971709fe273cfdd1f959b51e8d85`

New issue form: https://github.com/refined-github/refined-github/issues/new?assignees=&labels=bug&projects=&template=1_bug_report.yml
New comment form: https://github.com/refined-github/sandbox/issues/3
New review form: https://github.com/refined-github/sandbox/pull/4/files#review-changes-modal
New review comment form: https://github.com/refined-github/sandbox/pull/4/files

*/
