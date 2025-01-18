import { $$ } from '../npm/select-dom.js';
import delegate from '../npm/delegate-it-delegate.js';
import onetime from '../helpers/onetime.js';
import features from '../feature-manager.js';
import { getFeatureID } from '../helpers/feature-helpers.js';

const visible = new Set();
const observer = new IntersectionObserver(entries => {
	let lastModal;
	for (const {intersectionRatio, target: modal} of entries) {
		if (intersectionRatio > 0) {
			visible.add(modal);
		} else {
			visible.delete(modal);
		}

		lastModal = modal;
	}

	if (visible.size === 0) {
		observer.disconnect();
		lastModal.closest('details').open = false;
	}
});

let lastOpen;
const safetySwitch = new AbortController();

function menuActivatedHandler(event) {
	const details = event.target ;

	// Safety check #3742
	if (!details.open && lastOpen > Date.now() - 500) {
		safetySwitch.abort();
		console.warn(`The modal was closed too quickly. Disabling ${getFeatureID(import.meta.url)} for this session.`);
		return;
	}

	lastOpen = Date.now();

	const modals = $$([
		':scope > details-menu', // "Watch repo" dropdown
		':scope > details-dialog', // "Watch repo" dropdown
		':scope > modal-dialog', // "Development" dropdown #7093
		':scope > div > .dropdown-menu', // "Clone or download" and "Repo nav overflow"
	], details);

	for (const modal of modals) {
		observer.observe(modal);
	}
}

function initOnce() {
	delegate('.details-overlay', 'toggle', menuActivatedHandler, {capture: true, signal: safetySwitch.signal});
}

void features.add(import.meta.url, {
	init: onetime(initOnce),
});

/*

Test URLs

- Dropdowns in conversation sidebar: https://github.com/refined-github/sandbox/issues/3
- Star/Watch dropdowns: https://github.com/refined-github/sandbox

*/
