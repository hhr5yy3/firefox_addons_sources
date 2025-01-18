import { expectElement, $$, $ } from './npm/select-dom.js';
import fitTextarea from './npm/fit-textarea.js';
import { enableTabToIndent } from './npm/indent-textarea.js';
import delegate from './npm/delegate-it-delegate.js';
import { isChrome, isFirefox } from './npm/webext-detect.js';
import './helpers/target-blank-polyfill.js';
import clearCacheHandler from './helpers/clear-cache-handler.js';
import { styleHotfixes, brokenFeatures } from './helpers/hotfix.js';
import { importedFeatures } from './feature-data.js';
import { perDomainOptions } from './options-storage.js';
import isDevelopmentVersion from './helpers/is-development-version.js';
import { doesBrowserActionOpenOptions } from './helpers/feature-utils.js';
import { state } from './helpers/bisect.js';
import initFeatureList, { updateListDom } from './options/feature-list.js';
import initTokenValidation from './options/token-validation.js';
import initToggleAllButtons from './options/toggle-all.js';

const supportsFieldSizing = CSS.supports('field-sizing', 'content');

let syncedForm;

const {version} = chrome.runtime.getManifest();

async function findFeatureHandler() {
	// TODO: Add support for GHE
	const options = await perDomainOptions.getOptionsForOrigin().getAll();
	const enabledFeatures = importedFeatures.filter(featureId => options['feature:' + featureId]);
	await state.set(enabledFeatures);

	this.disabled = true;
	setTimeout(() => {
		this.disabled = false;
	}, 10_000);

	expectElement('#find-feature-message').hidden = false;
}

function focusSection({delegateTarget: section}) {
	const rect = section.getBoundingClientRect();
	if (rect.bottom > window.innerHeight || rect.top < 0) {
		section.scrollIntoView({behavior: 'smooth', block: 'nearest'});
	}

	if (section.open) {
		const field = $('input, textarea', section);
		if (field) {
			field.focus({preventScroll: true});
			if (!supportsFieldSizing && field instanceof HTMLTextAreaElement) {
				// #6404
				fitTextarea(field);
			}
		}
	}
}

function updateRateLink() {
	if (isChrome()) {
		return;
	}

	expectElement('a#rate-link').href = isFirefox() ? 'https://addons.mozilla.org/en-US/firefox/addon/refined-github-' : 'https://apps.apple.com/app/id1519867270?action=write-review';
}

function isEnterprise() {
	return syncedForm.getSelectedDomain() !== 'default';
}

function getExclusions() {
	if (isEnterprise())
		return 'Hotfixes are not applied on GitHub Enterprise.';

	if (isDevelopmentVersion()) {
		return 'Hotfixes are not applied in the development version';
	}
}

async function showStoredCssHotfixes() {
	expectElement('#hotfixes-field').textContent
	= getExclusions()
	?? await styleHotfixes.getCached(version)
	?? 'No CSS found in cache.';
}

async function fetchHotfixes(event) {
	const button = event.currentTarget ;
	button.disabled = true;
	try {
		// Style
		expectElement('#hotfixes-field').textContent
		= getExclusions()
		?? await styleHotfixes.getFresh(version)
		?? 'No hotfixes needed for this version! 🎉';

		// Broken features
		const storage = await brokenFeatures.getFresh();
		const field = expectElement('#broken-features-field');
		field.hidden = false;
		field.textContent = JSON.stringify(storage, undefined, 2);
	} finally {
		button.disabled = false;
	}
}

async function generateDom() {
	// Generate list
	await initFeatureList();

	// Update list from saved options
	syncedForm = await perDomainOptions.syncForm('form');

	// Decorate list
	updateListDom();
	initToggleAllButtons();

	// Only now the form is ready, we can show it
	expectElement('#js-failed').remove();

	// Enable token validation
	void initTokenValidation(syncedForm);

	// Update rate link if necessary
	updateRateLink();

	// Hide non-applicable "Button link" section
	if (doesBrowserActionOpenOptions) {
		expectElement('#action').hidden = true;
	}

	// Show stored CSS hotfixes
	void showStoredCssHotfixes();

	expectElement('#version').textContent = version;
}

function addEventListeners() {
	// Update domain-dependent page content when the domain is changed
	syncedForm?.onChange(async domain => {
		// Point the link to the right domain
		expectElement('a#personal-token-link').host = domain === 'default' ? 'github.com' : domain;

		for (const element of $$('storage-usage[item]')) {
			element.setAttribute('item', domain === 'default' ? 'options' : 'options:' + domain);
		}

		updateListDom();
	});

	// Refresh page when permissions are changed (because the dropdown selector needs to be regenerated)
	chrome.permissions.onRemoved.addListener(() => {
		location.reload();
	});
	chrome.permissions.onAdded.addListener(() => {
		location.reload();
	});

	// Improve textareas editing
	enableTabToIndent('textarea');
	if (!supportsFieldSizing) {
		fitTextarea.watch('textarea');
	}

	// Bring section into view when opened
	delegate('details', 'toggle', focusSection, {capture: true});

	// Add cache clearer
	expectElement('#clear-cache').addEventListener('click', clearCacheHandler);

	// Add bisect tool
	expectElement('#find-feature').addEventListener('click', findFeatureHandler);

	// Handle "Fetch hotfixes" button
	expectElement('#fetch-hotfixes').addEventListener('click', fetchHotfixes);
}

async function init() {
	await generateDom();
	addEventListeners();
}

void init();
