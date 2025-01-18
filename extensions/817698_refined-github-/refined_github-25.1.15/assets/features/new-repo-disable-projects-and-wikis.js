import React from '../npm/dom-chef.js';
import { $, expectElement } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import domLoaded from '../npm/dom-loaded.js';
import { isNewRepo, isNewRepoTemplate } from '../npm/github-url-detection.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';
import api from '../github-helpers/api.js';
import observe from '../helpers/selector-observer.js';
import { expectToken } from '../github-helpers/github-token.js';

const documentation = 'https://github.com/refined-github/refined-github/wiki/Extended-feature-descriptions#new-repo-disable-projects-and-wikis';

async function disableWikiAndProjectsOnce() {
	delete sessionStorage.rghNewRepo;

	await api.v3('', {
		method: 'PATCH',
		body: {
			has_projects: false,
			has_wiki: false,
		},
	});
	await domLoaded;
	$('[data-menu-item$="wiki-tab"]')?.remove();
	$('[data-menu-item$="projects-tab"]')?.remove();
	$('li:has([data-content="Wiki"]')?.remove();
	$('li:has([data-content="Projects"])')?.remove();
}

function setStorage() {
	if (expectElement('input#rgh-disable-project').checked) {
		sessionStorage.rghNewRepo = true;
	}
}

function add(submitButtonLine) {
	submitButtonLine.before(
		React.createElement('div', { className: "flash flash-warn py-0 ml-n3"   ,}
, React.createElement('div', { className: "form-checkbox checked" ,}
, React.createElement('label', null
, React.createElement('input', {
						checked: true,
						type: "checkbox",
						id: "rgh-disable-project",}
					), " Disable Projects and Wikis"
)
, React.createElement('span', { className: "note mb-2" ,}, "After creating the repository disable the projects and wiki. "
         , React.createElement('a', { href: documentation, target: "_blank", rel: "noreferrer",}, "Suggestion by Refined GitHub."   )
)
)
),
	);
}

async function init(signal) {
	await expectToken();
	observe('form :has(> [type=submit])', add, {signal});
	delegate(['#new_repository', '#new_new_repository'], 'submit', setStorage, {signal});
}

void features.add(import.meta.url, {
	include: [
		isNewRepo,
		isNewRepoTemplate,
	],
	init,
}, {
	include: [
		() => Boolean(sessionStorage.rghNewRepo),
	],
	init: onetime(disableWikiAndProjectsOnce),
});

/*

Test URLs:

https://github.com/new
https://github.com/new?template_name=browser-extension-template&template_owner=fregante

*/
