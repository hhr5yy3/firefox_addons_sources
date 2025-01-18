/* eslint-disable no-sequences */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-expressions */
// import browser from 'webextension-polyfill';

const MSG_CONTEXT_MENU_LINK_SUPPORT = chrome.i18n.getMessage('general_context_menu_supporter');

// Asynchronously retrieve data from storage.sync, then cache it.
const storageCache = {};
const initStorageCache = getAllStorageSyncData().then((items) => {
	// Copy the data retrieved from storage into storageCache.
	Object.assign(storageCache, items);
});

// invoke content script if icon clicked
function openOptionsPage() {
	chrome.tabs.create({
		url: chrome.runtime.getURL('options.html'),
	});
}

// invoke content script if icon clicked
function openSupportersPage() {
	chrome.tabs.create({
		url: 'https://www.buymeacoffee.com/thisissteven',
	});
}

async function buildStorageCache() {
	try {
		await initStorageCache;
	} catch (e) {
		// Handle error that occurred during storage initialization.
		console.error(e);
	}
}

chrome.runtime.onInstalled.addListener(async (details) => {
	// eslint-disable-next-line no-unused-vars
	const currentVersion = chrome.runtime.getManifest().version;
	// eslint-disable-next-line no-unused-vars
	const { previousVersion } = details;
	const { reason } = details;

	switch (reason) {
		case 'install':
			openOptionsPage();
			break;
		case 'update':
			openOptionsPage();
			// set updates
			break;
		default:
			break;
	}

	await buildStorageCache();
});

// handle uninstall
if (chrome.runtime.setUninstallURL) {
	chrome.runtime.setUninstallURL('https://docs.google.com/forms/d/e/1FAIpQLSeDV3Ec_PyseGwfDqa4gs44iaJs77JZdKPK7LuU31QPqESY-g/viewform?usp=sf_link');
} else {
	// Not yet enabled
}

// register listener, go to options page when app icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
	openOptionsPage();
	await buildStorageCache();
});

// changes holds newValue and oldValue storageType == sync / local ..
chrome.storage.onChanged.addListener((changes, storageType) => {
	console.log(changes);
	console.log(storageCache);
	if (changes.templates) {
		storageCache.templates = changes.templates.newValue;
	} else if (changes.options) {
		storageCache.options = changes.options.newValue;
	}
});

// register listeners for menu
chrome.contextMenus.onClicked.addListener(async function registerContextMenuEntries(info, tab) {
	chrome.scripting.executeScript(
		{
			target: {
				tabId: tab.id,
			},
			files: ['contentScript.js'],
		},
		function createContextMenu() {
			// get for context menu activated templates
			const templates = JSON.parse(storageCache.templates);
			const result = [];
			templates.forEach((item) => {
				if (item.quickAccessContextMenu) {
					result.push(item);
				}
			});
			result.push({
				ticketDesc: 'donate_link',
				templateName: MSG_CONTEXT_MENU_LINK_SUPPORT,
			});

			for (let j = 0; j < result.length; j += 1) {
				if (info.menuItemId === `contextMenu${j}`) {
					// add template to options.html not work
					if (tab.url == chrome.runtime.getURL('options.html')) {
						/* chrome.runtime.getBackgroundPage((page) => {
						console.log(page);
						console.log(page.browser)
					});

					let res = {
						contextMenu: result[j].ticketDesc,
						templateType: result[j].issueType,
					};

					document.activeElement.value = res.contextMenu;
					console.log(res); */
					}

					// send user options to frontend script
					chrome.tabs.sendMessage(
						tab.id,
						{
							contextMenu: result[j].ticketDesc,
							templateType: result[j].issueType,
						},
						(response) => {
							return response.message;
						}
					);
				}
			}
		}
	);
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	let templates;
	let result;

	switch (request) {
		case 'getIcon':
			sendResponse(chrome.runtime.getURL('assets/icons/icon16.png'));
			break;

		case 'getDomains':
			sendResponse(JSON.parse(storageCache.options).validDomains);
			break;

		case 'getOptions':
			sendResponse(JSON.parse(storageCache.options));
			break;

		case 'getTemplates':
			sendResponse(JSON.parse(storageCache.templates));
			break;

		// buttons for comment shall be activated and issueType === 'comment'
		case 'getButtonsForComment':
			templates = JSON.parse(storageCache.templates);
			result = [];
			templates.forEach((item) => {
				if (item.issueType.toLowerCase() === 'comment' || item.quickAccessCommentButton) {
					result.push(item);
				}
			});
			sendResponse(result);
			break;

		// buttons for description shall be activated, issueType !== 'comment'
		case 'getButtonsForDescription':
			templates = JSON.parse(storageCache.templates);
			result = [];
			templates.forEach((item) => {
				if (item.quickAccessButton) {
					result.push(item);
				}
			});
			sendResponse(result);
			break;

		// entries for dropdown shall be activated and templateName should not be empty
		case 'getEntriesForDropdown':
			templates = JSON.parse(storageCache.templates);
			result = [];
			templates.forEach((item) => {
				if (item.templateName !== '' && item.quickAccessDropdown) {
					result.push(item);
				}
			});
			sendResponse(result);
			break;

		case 'getSupportersPage':
			openSupportersPage();
			sendResponse('done');
			break;

		default:
			if (request.name === 'tracker') {
				// track in local stats
				const stats = JSON.parse(storageCache.statistics);
				stats.charactorsTyped += request.templateLength;
				if (request.eventAction !== 'autofill') stats.buttonsDropdownsUsed += 1;
				if (request.eventAction === 'autofill') stats.templatesAutofilled += 1;
				storageCache.setItem('statistics', JSON.stringify(stats));
			}
			break;
	}
});

const devMode = chrome.i18n.getMessage('DEV_MODE');
// deactive console.logs in production
if (devMode === 'false') {
	console.log = () => {};
	console.debug = () => {};
	console.error = () => {};
	console.info = () => {};
	console.warn = () => {};
} else {
	console.log(`Dev Mode: true`);
}

// Reads all data out of storage.sync and exposes it via a promise.
// copied from https://developer.chrome.com/docs/extensions/reference/storage/#usage
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.
function getAllStorageSyncData() {
	// Immediately return a promise and start asynchronous work
	return new Promise((resolve, reject) => {
		// Asynchronously fetch all data from storage.sync.
		chrome.storage.sync.get(null, (items) => {
			// Pass any observed errors down the promise chain.
			if (chrome.runtime.lastError) {
				return reject(chrome.runtime.lastError);
			}
			// Pass the data retrieved from storage down the promise chain.
			resolve(items);
		});
	});
}
