import React from '../npm/dom-chef.js';
import doma from '../npm/doma.js';
import delegate from '../npm/delegate-it-delegate.js';
import { expectElement, $$, countElements } from '../npm/select-dom.js';
import { getLocalHotfixes } from '../helpers/hotfix.js';
import { createRghIssueLink, getFeatureUrl } from '../helpers/rgh-links.js';
import { featuresMeta, importedFeatures } from '../feature-data.js';

function moveDisabledFeaturesToTop() {
	const container = expectElement('.js-features');
	const features = $$('.feature').toSorted((a, b) => a.dataset.text.localeCompare(b.dataset.text));
	const grouped = Object.groupBy(features, feature => {
		const checkbox = expectElement('input.feature-checkbox', feature);
		return checkbox.checked ? 'on' : checkbox.disabled ? 'broken' : 'off';
	});
	for (const group of [grouped.off, grouped.broken, grouped.on].filter(Boolean)) {
		for (const feature of group) {
			container.append(feature);
		}
	}
}

async function markLocalHotfixes() {
	for (const [feature, relatedIssue] of await getLocalHotfixes()) {
		if (importedFeatures.includes(feature)) {
			const input = expectElement('#' + feature);
			input.disabled = true;
			input.removeAttribute('name');
			expectElement(`.feature-name[for="${feature}"]`).after(
				React.createElement('span', { className: "hotfix-notice",}, " (Disabled due to "    , createRghIssueLink(relatedIssue), ")"),
			);
		}
	}
}

function buildFeatureCheckbox({id, description, screenshot}) {
	return (
		React.createElement('div', { className: "feature", 'data-text': `${id} ${description}`.toLowerCase(),}
, React.createElement('input', { type: "checkbox", name: `feature:${id}`, id: id, className: "feature-checkbox",} )
, React.createElement('div', { className: "info",}
, React.createElement('label', { className: "feature-name", htmlFor: id,}, id)
, ' '
, React.createElement('a', { href: getFeatureUrl(id), className: "feature-link",}, "source"

)
, React.createElement('input', { hidden: true, type: "checkbox", className: "screenshot-toggle",} )
, screenshot && (
					React.createElement('a', { href: screenshot, className: "screenshot-link",}, "screenshot"

)
				)
, React.createElement('p', { className: "description",}, doma(description))
, screenshot && (
					React.createElement('img', { hidden: true, src: screenshot, loading: "lazy", className: "screenshot",} )
				)
)
)
	);
}

function summaryHandler(event) {
	if (event.ctrlKey || event.metaKey || event.shiftKey) {
		return;
	}

	event.preventDefault();
	if (event.altKey) {
		for (const toggle of $$('input.screenshot-toggle')) {
			toggle.checked = !toggle.checked;
		}
	} else {
		const toggle = event
			.delegateTarget
			.closest('.feature')
			.querySelector('input.screenshot-toggle');
		toggle.checked = !toggle.checked;
	}
}

function featuresFilterHandler() {
	const keywords = this
		.value
		.toLowerCase()
		.replaceAll(/\W/g, ' ')
		.split(/\s+/)
		.filter(Boolean); // Ignore empty strings
	for (const feature of $$('.feature')) {
		feature.hidden = !keywords.every(word => feature.dataset.text.includes(word));
	}
}

const offCount = new Text();

function updateOffCount() {
	const count = countElements('.feature-checkbox:not(:checked)');
	switch (count) {
		case 0: {
			offCount.nodeValue = '';
			break;
		}
		case countElements('.feature-checkbox'): {
			offCount.nodeValue = '(JS off… are you breaking up with me?)';
			break;
		}
		default: {
			offCount.nodeValue = `(${count} off)`;
		}
	}
}

async function initFeatureList() {
	// Generate list
	expectElement('.js-features').append(...featuresMeta
		.filter(feature => importedFeatures.includes(feature.id))
		.map(feature => buildFeatureCheckbox(feature)),
	);

	// Add notice for features disabled via hotfix
	await markLocalHotfixes();

	// Load screenshots
	delegate('.screenshot-link', 'click', summaryHandler);

	// Filter feature list
	expectElement('input#filter-features').addEventListener('input', featuresFilterHandler);

	// Add feature count. CSS-only features are added approximately
	expectElement('.features-header').append(`: ${featuresMeta.length + 25} `, offCount);

	delegate('.feature-checkbox', 'change', updateOffCount);
}

function updateListDom() {
	moveDisabledFeaturesToTop();
	updateOffCount();
}

export { initFeatureList as default, updateListDom };
