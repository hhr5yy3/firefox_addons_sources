import './npm/webext-dynamic-content-scripts.js';
import { globalCache } from './npm/webext-storage-cache.js';
import { addOptionsContextMenu } from './npm/webext-tools.js';
import addPermissionToggle from './npm/webext-permission-toggle.js';
import webextAlert from './npm/webext-alert.js';
import { StorageItem } from './npm/webext-storage-storage-item.js';
import { handleMessages } from './npm/webext-msg.js';
import optionsStorage, { hasToken } from './options-storage.js';
import isDevelopmentVersion from './helpers/is-development-version.js';
import { doesBrowserActionOpenOptions } from './helpers/feature-utils.js';
import { styleHotfixes } from './helpers/hotfix.js';
import { fetchText } from './helpers/isomorphic-fetch.js';
import addReloadWithoutContentScripts from './options/reload-without.js';

const {version} = chrome.runtime.getManifest();

const welcomeShown = new StorageItem('welcomed', {defaultValue: false});

// GHE support
addPermissionToggle();

// Firefox/Safari polyfill
addOptionsContextMenu();

// Add "Reload without content scripts" functionality
addReloadWithoutContentScripts();

handleMessages({
	async openUrls(urls, {tab}) {
		for (const [index, url] of urls.entries()) {
			void chrome.tabs.create({
				url,
				index: tab.index + index + 1,
				active: false,
			});
		}
	},
	async closeTab(_, {tab}) {
		void chrome.tabs.remove(tab.id);
	},
	fetchText,
	async fetchJSON(url) {
		const response = await fetch(url);
		return response.json();
	},
	async openOptionsPage() {
		return chrome.runtime.openOptionsPage();
	},
	async getStyleHotfixes() {
		return styleHotfixes.get(version);
	},
});

chrome.action.onClicked.addListener(async tab => {
	if (doesBrowserActionOpenOptions) {
		void chrome.runtime.openOptionsPage();
		return;
	}

	const {actionUrl} = await optionsStorage.getAll();
	if (!actionUrl) {
		// Default to options page if unset
		void chrome.runtime.openOptionsPage();
		return;
	}

	await chrome.tabs.create({
		openerTabId: tab.id,
		url: actionUrl,
	});
});

async function showWelcomePage() {
	if (await welcomeShown.get()) {
		return;
	}

	const [token, permissions] = await Promise.all([
		hasToken(), // We can't handle an invalid token on a "Welcome" page, so just check whether the user has ever set one
		chrome.permissions.contains({origins: ['https://github.com/*']}),
	]);

	try {
		if (token && permissions) {
			// Mark as welcomed
			return;
		}

		const url = chrome.runtime.getURL('assets/welcome.html');
		await chrome.tabs.create({url});
	} finally {
		// Make sure it's always set to true even in case of errors
		await welcomeShown.set(true);
	}
}

chrome.runtime.onInstalled.addListener(async () => {
	if (isDevelopmentVersion()) {
		await globalCache.clear();
	}

	if (await chrome.permissions.contains({origins: ['*://*/*']})) {
		console.warn('Refined GitHub was granted access to all websites by the user and it’s now been removed. https://github.com/refined-github/refined-github/pull/7407');
		await chrome.permissions.remove({
			origins: [
				'*://*/*',
			],
		});
	}

	// Call after the reset above just in case we nuked Safari's base permissions
	await showWelcomePage();
});

chrome.permissions.onAdded.addListener(async permissions => {
	if (permissions.origins?.includes('*://*/*')) {
		await chrome.permissions.remove({
			origins: [
				'*://*/*',
			],
		});
		await webextAlert('Refined GitHub is not meant to run on every website. If you’re looking to enable it on GitHub Enterprise, follow the instructions in the Options page.');
	}
});
