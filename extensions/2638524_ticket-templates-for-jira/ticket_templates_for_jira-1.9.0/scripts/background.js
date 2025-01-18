/* eslint-disable no-sequences */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-expressions */
// import browser from 'webextension-polyfill';

const MSG_CONTEXT_MENU_LINK_SUPPORT = chrome.i18n.getMessage('general_context_menu_supporter');

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

chrome.runtime.onInstalled.addListener((details) => {
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
});

// handle uninstall
if (chrome.runtime.setUninstallURL) {
	chrome.runtime.setUninstallURL('https://docs.google.com/forms/d/e/1FAIpQLSeDV3Ec_PyseGwfDqa4gs44iaJs77JZdKPK7LuU31QPqESY-g/viewform?usp=sf_link');
} else {
	// Not yet enabled
}

// register listener, go to options page when app icon is clicked
chrome.browserAction.onClicked.addListener(openOptionsPage);

// register listeners for menu
chrome.contextMenus.onClicked.addListener(function registerContextMenuEntries(info, tab) {
	chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function createContextMenu() {
		// get for context menu activated templates
		const templates = JSON.parse(localStorage.templates);
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
	});
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	let templates;
	let result;

	switch (request) {
		case 'getIcon':
			sendResponse(chrome.runtime.getURL('assets/icons/icon16.png'));
			break;

		case 'getDomains':
			sendResponse(JSON.parse(localStorage.options).validDomains);
			break;

		case 'getOptions':
			sendResponse(JSON.parse(localStorage.options));
			break;

		case 'getTemplates':
			sendResponse(JSON.parse(localStorage.templates));
			break;

		// buttons for comment shall be activated and issueType === 'comment'
		case 'getButtonsForComment':
			templates = JSON.parse(localStorage.templates);
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
			templates = JSON.parse(localStorage.templates);
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
			templates = JSON.parse(localStorage.templates);
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
				// track in analytics
				try {
					const tracker = ga.getAll()[0];
					if (tracker) {
						tracker.send('event', `${request.eventCategory}`, `${request.eventAction}`, `${request.eventLabel}`);
					}
				} catch (e) {
					console.log(`Tracking deactivated! ${e}`);
				}

				// track in local stats
				const stats = JSON.parse(localStorage.statistics);
				stats.charactorsTyped += request.templateLength;
				if (request.eventAction !== 'autofill') stats.buttonsDropdownsUsed += 1;
				if (request.eventAction === 'autofill') stats.templatesAutofilled += 1;
				localStorage.setItem('statistics', JSON.stringify(stats));
			} else if (request.name === 'setNewTemplate') {
				templates = JSON.parse(localStorage.templates);

				// try to update existing template
				let isUpdated = false;
				for (const key in templates) {
					if (Object.hasOwnProperty.call(templates, key)) {
						if (request.data.uuid === templates[key].uuid) {
							templates[key].issueType = request.data.issueType;
							templates[key].projects = request.data.projects;
							templates[key].templateName = request.data.templateName;
							templates[key].ticketDesc = request.data.newTemplate;
							isUpdated = true;
						}
					}
				}

				// create new template
				if (!isUpdated) {
					const newTemplate = {
						issueType: request.data.issueType,
						projects: request.data.projects,
						quickAccessButton: true,
						quickAccessCommentButton: false,
						quickAccessContextMenu: true,
						quickAccessDropdown: true,
						templateName: request.data.templateName,
						ticketDesc: request.data.newTemplate,
						uuid: request.data.uuid,
					};
					templates.push(newTemplate);
				}

				localStorage.setItem('templates', JSON.stringify(templates));
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
