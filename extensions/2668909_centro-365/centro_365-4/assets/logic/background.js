//	Name:			background.js
//	Description:	Background activities
//	Author:			Sean O'Sullivan

// Actions for a fresh install and in-place update
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason === "install") {
		// Code to be executed on first install
		chrome.tabs.create({
			url: "https://seanosullivan.co.uk/projects/centro365/welcome"
		})
		//chrome.runtime.setUninstallURL("https://seanosullivan.co.uk/projects/centro365/goodbye");
	} else if (details.reason === "update") {
		// When extension is updated
		chrome.tabs.create({
			url: "https://seanosullivan.co.uk/projects/centro365/updated"
		});
		//chrome.runtime.setUninstallURL("https://seanosullivan.co.uk/projects/centro365/goodbye");
	} else if (details.reason === "chrome_update") {
		// When browser is updated
		// Nothing right now :)
	} else if (details.reason === "shared_module_update") {
		// When a shared module is updated
		// Nothing right now :)
	}
});


// Omnibox
// Our array of searchable items
const items = [
	{ name: "365 Admin", url: "https://admin.microsoft.com/AdminPortal/Home#/homepage", aliases: ["admin"] },
	{ name: "365 Apps", url: "https://config.office.com/officeSettings", aliases: ["apps", "office"] },
	{ name: "365 Lighthouse", url: "https://lighthouse.microsoft.com/#home", aliases: ["lighthouse"] },
	{ name: "Azure Portal", url: "https://portal.azure.com/#home", aliases: ["azure", "portal"] },
	{ name: "XDR Defender", url: "https://security.microsoft.com/homepage", aliases: ["XDR", "defender"] },
	{ name: "Defender Cloud Apps", url: "https://portal.cloudappsecurity.com/#/discovery?tab=dashboard", aliases: ["Cloud Apps"] },
	{ name: "Entra", url: "https://entra.microsoft.com/#home", aliases: ["Entra ID", "AAD", "Azure AD"] },
	{ name: "Exchange", url: "https://admin.exchange.microsoft.com", aliases: ["email", "exchange"] },
	{ name: "InTune", url: "https://intune.microsoft.com/#blade/Microsoft_Intune_DeviceSettings/DevicesMenu/overview", aliases: ["Endpoint Manager"] },
	{ name: "OneDrive", url: "https://admin.microsoft.com/sharepoint?page=settings&modern=true", aliases: ["Onedrive"] },
	{ name: "Power Platform", url: "https://admin.powerplatform.microsoft.com", aliases: ["Power Apps"] },
	{ name: "Purview", url: "https://compliance.microsoft.com/homepage", aliases: ["audit", "logs"] },
	{ name: "SharePoint", url: "https://admin.microsoft.com/sharepoint?page=siteManagement&modern=true", aliases: ["SharePoint"] },
	{ name: "Stream", url: "https://web.microsoftstream.com/admin", aliases: ["Stream"] },
	{ name: "Teams", url: "https://admin.teams.microsoft.com/dashboard", aliases: ["Teams"] },
	{ name: "Viva", url: "https://admin.microsoft.com/AdminPortal/Home?#/viva", aliases: ["Yammer"] },
	{ name: "Service Health", url: "https://admin.microsoft.com/AdminPortal/Home#/servicehealth", aliases: ["Service Health", "health", "status"] },
	{ name: "Message Centre", url: "https://admin.microsoft.com/AdminPortal/Home#/MessageCenter", aliases: ["Message Centre", "messages", "Message Center"] },
	{ name: "About Centro 365", url: "https://seanosullivan.co.uk/projects/centro365", aliases: ["About Centro 365", "about"] }
];

// Function to search items by name or aliases
function searchItems(query) {
	return items.find(item =>
		item.name.toLowerCase() === query.toLowerCase() || item.aliases.some(alias => alias.toLowerCase().includes(query.toLowerCase()))
	);
}

// Add event listener for omnibox input changed
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	const suggestions = items.filter(item =>
		item.name.toLowerCase().includes(text.toLowerCase()) || item.aliases.some(alias => alias.toLowerCase().includes(text.toLowerCase()))
	).map(item => ({
		content: item.url,
		description: item.name
	}));
	suggest(suggestions);
});

// Add event listener for omnibox input entered
chrome.omnibox.onInputEntered.addListener(text => {
	const selectedItem = searchItems(text);
	if (selectedItem) {
		chrome.tabs.create({ url: selectedItem.url });
	} else {
		chrome.tabs.create({ url: 'https://seanosullivan.co.uk/projects/centro365/omnibox-guide' });
	}
});