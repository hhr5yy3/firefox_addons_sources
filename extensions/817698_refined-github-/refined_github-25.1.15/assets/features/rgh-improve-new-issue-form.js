import React from '../npm/dom-chef.js';
import { expectElement } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import { isNewIssue } from '../npm/github-url-detection.js';
import features from '../feature-manager.js';
import { OptionsLink } from '../helpers/open-options.js';
import clearCacheHandler from '../helpers/clear-cache-handler.js';
import { baseApiFetch } from '../github-helpers/github-token.js';
import { getToken } from '../options-storage.js';
import { isRefinedGitHubRepo } from '../github-helpers/index.js';

const isSetTheTokenSelector = 'input[name^="issue_form[token]"]';
const liesGif = 'https://github.com/user-attachments/assets/f417264f-f230-4156-b020-16e4390562bd';

function addNotice(adjective) {
	expectElement('#issue_body_template_name').before(
		React.createElement('div', { className: "flash flash-error h3 my-9"   , style: {animation: 'pulse-in 0.3s 2'},}
, React.createElement('p', null, "Your token is "
   , adjective, ". Many Refined GitHub features don't work without it. You can update it "
    , React.createElement(OptionsLink, { className: "btn-link",}, "in the options"  ), "."
)
, React.createElement('p', null, "Before creating this issue, add a valid token and confirm the problem still occurs."             )
),
	);
}

async function checkToken() {
	const token = await getToken();
	if (!token) {
		addNotice('missing');
		return;
	}

	try {
		await baseApiFetch({apiBase: 'https://api.github.com/', path: 'user', token});
	} catch (error) {
		if (!navigator.onLine || (error )?.message === 'Failed to fetch') {
			return;
		}

		addNotice('invalid or expired');
		return;
	}

	// Thank you for following the instructions. I'll save you a click.
	expectElement(isSetTheTokenSelector).checked = true;
}

async function setVersion() {
	const {version} = chrome.runtime.getManifest();
	// Mark the submission as not having a token set up because people have a tendency to go through forms and read absolutely nothing. This makes it easier to spot liars.
	const field = expectElement('input#issue_form_version');
	field.value = version;
	if (!await getToken()) {
		field.value = '(' + version + ')';
		field.disabled = true;
	}
}

async function linkifyCacheRefresh() {
	expectElement('[href="#clear-cache"]').replaceWith(
		React.createElement('button', {
			className: "btn",
			type: "button",
			onClick: clearCacheHandler,}
, "Clear cache"

),
	);
}

function Lies() {
	return (
		React.createElement('a', { href: "https://www.youtube.com/watch?v=YWdD206eSv0",}
, React.createElement('img', { src: liesGif, alt: "Just go on the internet and tell lies?"       , className: "d-inline-block",} )
)
	);
}

async function lieDetector({delegateTarget}) {
	if (delegateTarget.checked) {
		delegateTarget.closest('fieldset').append(React.createElement(Lies, null ));
	}
}

async function validateTokenCheckbox() {
	if (await getToken()) {
		return;
	}

	// eslint-disable-next-line new-cap -- Preload image
	Lies();

	delegate(isSetTheTokenSelector, 'click', lieDetector, {
		once: true,
	});
}

void features.add(import.meta.url, {
	asLongAs: [
		isRefinedGitHubRepo,
		isNewIssue,
		() => new URL(location.href).searchParams.get('template') === '1_bug_report.yml',
	],
	awaitDomReady: true, // Small page
	deduplicate: 'has-rgh-inner',
	init: [
		linkifyCacheRefresh,
		checkToken,
		validateTokenCheckbox,
		setVersion,
	],
});

/*

Test URLs:

https://github.com/refined-github/refined-github/issues/new?assignees=&labels=bug&projects=&template=1_bug_report.yml

*/
