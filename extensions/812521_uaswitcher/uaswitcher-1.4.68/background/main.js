/*
 * User Agent Switcher
 * Copyright © 2017-2020  Erin Yuki Schlarb
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* global utils */
"use strict";

/**
 * Default values for all options
 *
 * Defined here so that they are instantly available until the actual value can be loaded from
 * storage.
 */
/** @type {utils.config.Options} */
const OPTIONS_DEFAULT = {
	"current": null,
	
	"available":         [],
	"available-changed": false,
	
	"random-enabled":    false,
	"random-categories": [utils.config.TextEntryCategories.DESKTOP_ENGTEXT],
	"random-interval":   {mode: "startup", value: 1, unit: "h"},
	"random-jitter":     20,
	
	"show-badge-text":     true,
	"override-popup-size": false,
	"popup-collapsed":     [],
	
	"edit-mode": "table",
};


/** @typedef {utils.matchingengine.DataItem<{userAgent: string?}>} OverrideDataItem */


/**
 * Track current add-on options, so that their are always available when resolving a request
 */
// Start with the default options
/** @type {utils.config.OptionsDynamic} */
let options = Object.assign(/** @type {{ [name: string]: string }} */ ({}), OPTIONS_DEFAULT);
/** @type {Map<string, utils.uaparser.DataSet>} */
let userAgentParsedDataSets = new Map();
/** @type {number} */
let optionsLockCount   = 0;
/** @type {browser.storage.ChangeDict} */
let optionsLockChanges = {};

let matchingEngine = new utils.matchingengine.MatchingEngine("override", options);

Promise.resolve().then(() => {
	// Load all currently set options from storage
	return browser.storage.local.get();
}).then(async (result) => {
	// Update the default options with the real ones loaded from storage
	Object.assign(options, result);
	
	//MIGRATE-1.2.1: Mark all previous User-Agent entries as enabled
	if(options["available-changed"]) {
		for(let entry of options["available"]) {
			if(entry.type === "user-agent" && typeof(entry.enabled) !== "boolean") {
				entry.enabled = true;
			}
		}
	}
	
	// Read default list of available user agents from file if none was found in storage or the user
	// has never edited it (so they will automatically stay up-to-date unless they change something)
	if(!options["available-changed"]) {
		let response = await fetch(browser.runtime.getURL("assets/user-agents.txt"));
		let content  = await response.text();
		
		let parser = new utils.config.TextEntryParser();
		options["available"] = await parser.parse(content);
	}
}).then(() => {
	//Migration-1.4: Add the default category label of "Other" for entries that lack one
	for(let entry of options["available"]) {
		if(entry.type === "user-agent" && typeof(entry.category) !== "string") {
			entry.category = utils.config.TextEntryCategories.OTHER_ENGTEXT;
		}
	}
	
	// Write back the final option list so that the defaults are properly displayed on the
	// options page as well
	return browser.storage.local.set(options);
}).then(() => {
	// Possibly enable the request listener already
	return applyRandomMode().then(() => {
		return applyUserAgentConfiguration();
	}).then(() => {
		return updateBrowserAction(true);
	});
}).then(() => {
	// Keep track of new developments in option land
	browser.storage.onChanged.addListener((changes, areaName) => {
		if(areaName !== "local") {
			return;
		}
		
		if(optionsLockCount < 1) {
			// Update state based on which option keys actually changed
			applyOptionChanges(changes);
		} else {
			// Remember list of changed options for later
			for(let name of Object.keys(changes)) {
				optionsLockChanges[name] = changes[name];
			}
		}
	});
	
	// Done setting up options
}).catch(console.exception);


/**
 * @param {browser.storage.ChangeDict} changes
 */
function applyOptionChanges(changes) {
	let changedOptionKeys = [];
	
	// Apply changes to option storage while recording which keys *actually* have a new value
	for(let name of Object.keys(changes)) {
		if(typeof(changes[name].newValue) !== "undefined") {
			if(!options.hasOwnProperty(name)
			|| JSON.stringify(changes[name].newValue) !== JSON.stringify(options[name])) {
				changedOptionKeys.push(name);
			}
			
			options[name] = changes[name].newValue;
		} else {
			changedOptionKeys.push(name);
			
			delete options[name];
		}
	}
	
	let changesApplied = false;
	let userAgentChangesApplied = false;
	let userAgentOverrideApplied = false;
	
	// Call the respective update functions as necessary
	for(let name of changedOptionKeys) {
		switch(name) {
			case "current":
				userAgentChangesApplied = true;
				changesApplied = true;
				break;
			
			//NOTE: "random-jitter" is not part of this list as it should only
			//      have an effect when rescheduling the random-mode timer
			case "random-enabled":
			case "random-categories":
			case "random-interval":
				applyRandomMode().catch(console.exception);
				changesApplied = true;
				break;
			
			case "show-badge-text":
				changesApplied = true;
				break;
		}
		
		if(matchingEngine.isKeyStorageKey(name)) {
			userAgentOverrideApplied = true;
			userAgentChangesApplied = true;
			changesApplied = true;
		}
	}
	
	// Put this here as setting an override may cause the engine
	// to be enabled as well
	if(userAgentChangesApplied) {
		applyUserAgentConfiguration().catch(console.exception);
	}
	
	// Update browser action icon if any changes where actually applied
	if(changesApplied) {
		updateBrowserAction(userAgentOverrideApplied).catch(console.exception);
	}
}


/***************/
/* HTTP Header */
/***************/

/**
 * Callback function for processing about-to-be-sent blocking requests and
 * modifying their "User-Agent"-header based on the current options
 * 
 * @param {typeof browser.webRequest.onBeforeSendHeaders.OUTARG1} request
 * @returns {Promise<browser.webRequest.BlockingResponse>}
 */
async function requestListener(request) {
	// Assume the global setting by default
	let userAgent = options["current"];
	
	// Check if there is any override data for this URL
	try {
		// Use the embedding document's URL if possible to set the current-page
		// User-Agent value for external requests
		let url = new URL(request.documentUrl || request.url);
		
		// For resources from sub-frames, try using the tab API to get the URL
		// of the top-level document instead
		try {
			if(request.frameId !== 0 && request.tabId !== browser.tabs.TAB_ID_NONE) {
				let tabInfo = await browser.tabs.get(request.tabId);
				if(tabInfo.url) {
					url = new URL(tabInfo.url);
				}
			}
		} catch(_) { /* Not really a problem */ }
		
		let overrideData = matchingEngine.findItemInCache(url);
		if(overrideData) {
			userAgent = overrideData.content.userAgent;
		}
	} catch(_) { /* Weird, but may happen I guess… */ }
	
	// Try to apply the found User-Agent value
	if(typeof(userAgent) === "string"
	&& typeof(request.requestHeaders) === "object") {
		for(var header of request.requestHeaders) {
			if(header.name.toLowerCase() === "user-agent") {
				header.value = userAgent;
			}
		}
	}
	
	return {
		requestHeaders: request.requestHeaders
	};
}



/**************/
/* JavaScript */
/**************/

/**
 * @param {string?} userAgent
 */
function generateContentScript(userAgent) {
	if(userAgent === null) {
		// Dummy that marks the override as having taken place, while
		// actually nothing happened
		return `
			if(typeof(window.pageHasOverride) === "undefined" || !window.pageHasOverride) {
				window.pageHasOverride = true;
			}
		`;
	}
	
	// Look up navigator data for User-Agent string
	let userAgentDataSet = userAgentParsedDataSets.get(userAgent);
	if(!userAgentDataSet) {
		userAgentDataSet = {
			userAgent: userAgent,
			platform: null,
			appVersion: "5.0",
			buildID: undefined,
			product: "",
			productSub: "",
			vendor: "",
			vendorSub: "",
		};
	}
	
	// See `content/override-navigator-data.js` for the called function
	return `
		if(typeof(window.pageHasOverride) === "undefined" || !window.pageHasOverride) {
			window.pageHasOverride = true;
			overrideNavigatorData(${JSON.stringify(userAgentDataSet)});
		}
	`;
}

/**
 * @typedef TabChangeInfo
 * @property {boolean | undefined} [audible]
 * @property {boolean | undefined} [discarded]
 * @property {string  | undefined} [favIconUrl]
 * @property {browser.tabs.MutedInfo | undefined} [mutedInfo]
 * @property {boolean | undefined} [pinned]
 * @property {string  | undefined} [status]
 * @property {string  | undefined} [title]
 * @property {string  | undefined} [url]
 */

/** @type {string?} */
let sharedContentScriptJS = null;
async function getSharedContentScriptJS() {
	if(sharedContentScriptJS == null) {
		let sharedJSReq = await fetch(browser.runtime.getURL("content/override-navigator-data.js"));
		sharedContentScriptJS = await sharedJSReq.text();
	}
	return sharedContentScriptJS;
}

/**
 * Callback function for modifying a tab's `navigator.userAgent` object based
 * on the current options
 * 
 * @param {number} tabId
 * @param {TabChangeInfo} changeInfo
 * @param {browser.tabs.Tab} _tab
 */
async function tabListener(tabId, changeInfo, _tab) {
	if(typeof(changeInfo.status) !== "string"
	|| changeInfo.status !== "loading"
	|| !changeInfo.url) {
		return;
	}
	
	/** @type {URL?} */
	let url = null;
	try {
		url = new URL(changeInfo.url);
	} catch(e) {
		return;
	}
	
	// Determine the applicable User-Agent value for this tab's URL
	let userAgent = options["current"];
	/** @type {OverrideDataItem?} */
	let overrideData = matchingEngine.findItemInCache(url);
	if(overrideData) {
		userAgent = overrideData.content.userAgent;
	}
	if(!userAgent) {
		return;
	}
	
	// Inject base script and per-page override in one go
	//
	// (Otherwise they may be injected in the wrong order, causing spurious errors.)
	browser.tabs.executeScript(tabId, {
		allFrames: true,
		runAt:     "document_start",
		matchAboutBlank: true,
		
		code: sharedContentScriptJS + "\n" + generateContentScript(userAgent)
	}).catch(console.exception);
}

/** @type {browser.contentScripts.RegisteredContentScript[]} */
let registeredContentScripts = [];

async function registerContentScripts() {
	// Add base content-script with shared functionality
	registeredContentScripts.push(await browser.contentScripts.register({
		allFrames: true,
		matchAboutBlank: true,
		runAt: "document_start",
		
		matches: ["<all_urls>"],
		
		js: [
			{ code: await getSharedContentScriptJS() }
		]
	}));
	
	// Add content-scripts for the per-page overrides
	/** @type {IterableIterator<OverrideDataItem>} */
	let overrideItemsIterator = matchingEngine.enumerateCachedItems();
	for(let overrideItem of overrideItemsIterator) {
		registeredContentScripts.push(await browser.contentScripts.register({
			allFrames: true,
			matchAboutBlank: true,
			runAt:     "document_start",
			
			matches:      [overrideItem.pattern.toBrowserMatchPattern()],
			includeGlobs: overrideItem.pattern.toBrowserGlobPatternList(),
			
			js: [
				{ code: generateContentScript(overrideItem.content.userAgent) }
			]
		}));
	}
	
	// Add fallback content-script (added last) for the global override
	let userAgent = options["current"];
	if(userAgent) {
		registeredContentScripts.push(await browser.contentScripts.register({
			allFrames: true,
			matchAboutBlank: true,
			runAt: "document_start",
			
			matches: ["<all_urls>"],
			
			js: [
				{ code: generateContentScript(userAgent) }
			]
		}));
	}
}

function unregisterContentScripts() {
	let contentScript;
	while((contentScript = registeredContentScripts.pop()) !== undefined) {
		contentScript.unregister();
	}
}


/********************************
 * Orchestration and GUI tweaks *
 ********************************/
/** @type {number?} */
let randomModeTimer = null;
function applyRandomMode() {
	// Cancel any previous timer for running this function
	if(randomModeTimer !== null) {
		window.clearTimeout(randomModeTimer);
		randomModeTimer = null;
	}
	
	// Nothing else to do if random mode isn't actually enabled
	if(!options["random-enabled"]) {
		return Promise.resolve();
	}
	
	// Build list of applicable User-Agent-entries
	let entries = [];
	for(let entry of options["available"]) {
		if(entry.type == "user-agent" && entry.enabled
		&& options["random-categories"].includes(entry.category)) {
			entries.push(entry);
		}
	}
	
	// Select entry using a poor, but good enough, random number generator
	let entry = entries[Math.floor(Math.random() * entries.length)];
	
	// Set new user-agent string
	return browser.storage.local.set({
		"current": entry.string
	}).then(() => {
		if(options["random-interval"].mode === "timed") {
			let millis;
			switch(options["random-interval"].unit) {
				case "m":
					millis = options["random-interval"].value * 60 * 1000;
					break;
				case "h":
					millis = options["random-interval"].value * 3600 * 1000;
					break;
				case "d":
					millis = options["random-interval"].value * 86400 * 1000;
					break;
				default:
					return;
			}
			
			// Add skew to time value to make tracking harder when using random
			// mode in an effort of avoiding that
			let skew = millis * options["random-jitter"] / 100;
			skew *= Math.random() * 2 - 1;
			
			randomModeTimer = window.setTimeout(applyRandomMode, millis + skew);
		}
	});
}


/**
 * @param {string?} userAgent
 */
function generateIconBadgeText(userAgent) {
	// No text if disabled
	if(typeof(userAgent) !== "string") {
		return "";
	}
	
	// Lookup human-readable label for current UA string
	let entryLabel = null;
	for(let entry of options["available"]) {
		if(entry.type === "user-agent" && entry.string === userAgent) {
			entryLabel = entry.label;
			break;
		}
	}
	
	if(typeof(entryLabel) !== "string") {
		return "";
	}
	
	// Vary based on label style
	if(entryLabel.includes("/")) {
		// Style used by the default list: <OS> / <Browser> => O/B
		return entryLabel.split("/", 2).map((s) => s.trim().substr(0,1)).join("/").toUpperCase();
	} else if(entryLabel.includes(" ")) {
		// More than one word: <One> <Two> <Three> => OTT
		return entryLabel.split(/\s+/g, 3).map((s) => s.substr(0,1)).join("").toUpperCase();
	} else if(+entryLabel == parseInt(entryLabel)) {  // ← Checks if value is plain integer
		// Just one number: <Number> => 1234
		// (Requested in https://gitlab.com/ntninja/user-agent-switcher/issues/62 .)
		return entryLabel.substr(0,4);
	} else {
		// Just one word: <Word> => WO
		return entryLabel.substr(0, 2).toUpperCase();
	}
}

/**
 * @param {string?} userAgent
 * @param {"default" | "random" | "override"} mode
 */
function generateIconTitle(userAgent, mode) {
	let titleMsgID = "icon_title_"
		+ (mode === "override"
			? ("override_" + (typeof(userAgent) === "string" ? "enabled" : "disabled"))
			: (mode === "random"
				? "random"
				: (typeof (userAgent) === "string" ? "enabled" : "disabled")
			)
		);
	
	// @ts-ignore: Error in WebExtension definition file
	let title = browser.runtime.getManifest().name + " – " + browser.i18n.getMessage(titleMsgID);
	if(typeof(userAgent) === "string") {
		for(let entry of options["available"]) {
			if(entry.type === "user-agent" && entry.string === userAgent) {
				title += " (" + entry.label + ")";
				break;
			}
		}
	}
	return title;
}


/**
 * @param {string?} userAgent
 * @param {"default" | "random" | "override"} mode
 * @param {number | undefined} [tabId]
 */
function setBrowserAction(userAgent, mode, tabId = undefined) {
	// Update text
	browser.browserAction.setTitle({
		title: generateIconTitle(userAgent, mode),
		tabId: tabId,
	});
	
	// Update icon
	//COMPAT: Firefox for Android 55+
	if(typeof(browser.browserAction.setIcon) !== "undefined") {
		let path = null;
		if(mode === "override" && typeof(userAgent) === "string") {
			// Colored icon for per-domain override, enabled by override" text
			path = "assets/icon-override.svg";
		} else if(mode === "override") {
			// Grayed-out colored icon of per-domain override, "disabled by override" text
			path = "assets/icon-override-disabled.svg";
		} else if(mode === "random") {
			// Colored icon for random-mode, "random-mode" text
			path = "assets/icon-random.svg";
		} else if(typeof(userAgent) === "string") {
			// Colored icon, "enabled" text
			path = "assets/icon.svg";
		} else {
			// Grayscale icon, "disabled" text
			path = "assets/icon-disabled.svg";
		}
		
		if(path) {
			browser.browserAction.setIcon({ path: path, tabId: tabId}).catch(console.exception);
		}
	}
	
	// Update badge
	//COMPAT: Firefox for Android 55+
	if(typeof(browser.browserAction.setBadgeText)            !== "undefined"
	&& typeof(browser.browserAction.setBadgeBackgroundColor) !== "undefined") {
		if(options["show-badge-text"]) {
			const BADGE_COLORS = {
				"override": "goldenrod",
				"random":   "darkgreen",
				"default":  "darkgray",
			};
			browser.browserAction.setBadgeText({ text: generateIconBadgeText(userAgent), tabId: tabId });
			browser.browserAction.setBadgeBackgroundColor({ color: BADGE_COLORS[mode], tabId: tabId });
		} else {
			browser.browserAction.setBadgeText({ text: "", tabId: tabId });
		}
	}
}


async function updateBrowserActionOverrideListener() {
	// Generate lists of matching patterns for all currently effective overrides
	/** @type {string[]} */
	let browserMatchPatterns = [];
	/** @type {browser.events.UrlFilter[]} */
	let browserUrlFilters = [];
	/** @type {IterableIterator<OverrideDataItem>} */
	let overrideItemsIterator = matchingEngine.enumerateCachedItems();
	for(let {pattern} of overrideItemsIterator) {
		browserMatchPatterns.push(pattern.toBrowserMatchPattern());
		browserUrlFilters.push(...pattern.toBrowserUrlFilterList());
	}

	// Listen for navigation changes that match any of the generated override
	// patterns
	browser.webNavigation.onCommitted.removeListener(navigationListener);
	if(browserUrlFilters.length > 0) {
		browser.webNavigation.onCommitted.addListener(navigationListener, {
			url: browserUrlFilters
		});
	}
	
	let tabs;
	try {
		// One-time process all currently loaded tabs
		tabs = await browser.tabs.query({
			url: browserMatchPatterns,
			
			// Tabs that are unloaded from memory will trigger a navigation event
			// when being loaded
			discarded: false,
		});
	//COMPAT: Firefox 56- (No support for the discard property)
	} catch(_) {
		// One-time process all currently loaded tabs
		tabs = await browser.tabs.query({
			url: browserMatchPatterns,
		});
	}
	
	for(let tab of tabs) {
		if(!tab.id || tab.id === browser.tabs.TAB_ID_NONE || !tab.url) {
			continue;
		}

		// Process each matched tab as if we had just reloaded it
		await navigationListener({
			tabId: tab.id,
			url: tab.url,
			frameId: 0
		});
	}
}


/**
 * Update the extension icon, title & badge based on the current settings
 */
async function updateBrowserAction(overridesChanged = false) {
	// Update global default icon
	setBrowserAction(options["current"], options["random-enabled"] ? "random" : "default");
	
	if(overridesChanged) {
		await updateBrowserActionOverrideListener();
	}
}

/**
 * Object representing all the navigation data that we may receive but with all
 * properties marked as optional that we don't care about
 * @typedef NavigationListenerData
 * @property {number} tabId
 * @property {string} url
 * @property {number} frameId
 * @property {number} [processId]
 * @property {number} [parentFrameId]
 * @property {number} [timeStamp]
 * @property {browser.webNavigation.TransitionType}        [transitionType]
 * @property {browser.webNavigation.TransitionQualifier[]} [transitionQualifiers]
 */

/**
 * @param {NavigationListenerData} details
 */
async function navigationListener(details) {
	// Browser action only reflects state of the top-level browsing context
	if(details.frameId !== 0) {
		return;
	}
	
	/** @type {URL?} */
	let url = null;
	try {
		url = new URL(details.url);
	} catch(e) {
		return;
	}
	
	/** @type {OverrideDataItem?} */
	let overrideData = matchingEngine.findItemInCache(url);
	if(overrideData) {
		setBrowserAction(overrideData.content.userAgent, "override", details.tabId);
	} else {
		try {
			// Try using the new Firefox 59+ API for resetting the per-tab
			// browser action data
			browser.browserAction.setTitle({
				title: null,
				tabId: details.tabId,
			});
			
			//COMPAT: Firefox for Android 55+
			if(typeof(browser.browserAction.setBadgeText)            !== "undefined"
			&& typeof(browser.browserAction.setBadgeBackgroundColor) !== "undefined") {
				browser.browserAction.setBadgeText({
					text: null,
					tabId: details.tabId,
				});
				browser.browserAction.setBadgeBackgroundColor({
					color: null,
					tabId: details.tabId,
				});
			}
			
			//COMPAT: Firefox for Android 55+
			if(typeof(browser.browserAction.setIcon) !== "undefined") {
				browser.browserAction.setIcon({
					tabId: details.tabId,
				});
			}
		} catch(e) {
			//COMPAT: Firefox 58-
			// Make per-tab data the same as global data and hope that the user
			// will move on or update to a newer version before discovering what
			// we did…
			setBrowserAction(
				options["current"],
				options["random-enabled"] ? "random" : "default",
				details.tabId
			);
		}
	}
}

/**
 * Start or stop the HTTP header and JavaScript modifications
 */
let processingEnabled = false;
async function applyUserAgentConfiguration() {
	let userAgent = options["current"];
	
	// Is there any current state that *may* cause processing to be effective?
	let havePossibleRules = 
		(typeof(userAgent) === "string" || matchingEngine.haveItemsCached);
	
	if(!processingEnabled && havePossibleRules) {
		processingEnabled = true;
		
		browser.webRequest.onBeforeSendHeaders.addListener(
			requestListener,
			{urls: ["<all_urls>"]},
			["blocking", "requestHeaders"]
		);
		
		//COMPAT: Firefox 58-
		if(typeof(browser.contentScripts) === "undefined") {
			await getSharedContentScriptJS();
			browser.tabs.onUpdated.addListener(tabListener);
		}
	} else if(processingEnabled && !havePossibleRules) {
		//COMPAT: Firefox 58-
		if(typeof(browser.contentScripts) === "undefined") {
			browser.tabs.onUpdated.removeListener(tabListener);
		}
		
		browser.webRequest.onBeforeSendHeaders.removeListener(requestListener);
		processingEnabled = false;
	}
	
	// Ensure we have preparsed navigator data for all User-Agents values
	// that may be encountered during processing
	let preparseUserAgent = ((/** @type {string?} */ userAgent) => {
		if(userAgent && !userAgentParsedDataSets.has(userAgent)) {
			return utils.uaparser.UserAgentParser.parse(userAgent).then((parser) => {
				userAgentParsedDataSets.set(userAgent, parser.asObject());
			});
		} else {
			return Promise.resolve();
		}
	});
	await preparseUserAgent(userAgent);
	/** @type {IterableIterator<OverrideDataItem>} */
	let overrideItemsIterator = matchingEngine.enumerateCachedItems();
	for(let overrideItem of overrideItemsIterator) {
		await preparseUserAgent(overrideItem.content.userAgent);
	}
	
	// Rules have probably been updated now so inform the browser about this
	browser.webRequest.handlerBehaviorChanged().catch(console.error);
	
	//COMPAT: Firefox 58-
	if(typeof(browser.contentScripts) !== "undefined") {
		await unregisterContentScripts();
		await registerContentScripts();
	}
}

/********************
 * Content page API *
 ********************/

browser.runtime.onConnect.addListener((port) => {
	let suspendsOptionProcessing = false;
	function resumeOptionProcessing() {
		if(suspendsOptionProcessing) {
			// @ts-ignore: Probably an error in WebExtension definition
			port.onDisconnect.removeListener(resumeOptionProcessing);
			suspendsOptionProcessing = false;
			
			optionsLockCount--;
			if(optionsLockCount < 1) {
				applyOptionChanges(optionsLockChanges);
				optionsLockChanges = {};
			}
		}
	}
	
	port.onMessage.addListener((message2) => {
		/** @type {{ request?: string }} */
		let message = message2;
		
		if(typeof(message.request) !== "string") {
			return;
		}
		
		switch(message.request) {
			// Client request to stop processing any storage updates
			// until it either sends "unblock-storage-updates" or
			// disconnects
			case "suspend-option-processing":
				if(!suspendsOptionProcessing) {
					suspendsOptionProcessing = true;
					port.onDisconnect.addListener(resumeOptionProcessing);
					
					optionsLockCount++;
				}
				break;
			case "resume-option-processing":
				resumeOptionProcessing();
				break;
		}
	});
});


/*************************************************
 * Browser action workarounds for Firefox Mobile *
 *************************************************/
// Open popup in new tab, if `browser.browserAction.setPopup` is not supported
//COMPAT: Firefox for Android 55+
if(typeof(browser.browserAction.setPopup) === "undefined") {
	browser.browserAction.onClicked.addListener((_tab) => {
		// Retrieve tab data to obtain the current tab URL
		browser.tabs.query({
			currentWindow: true,
			active:        true
		}).then(([tab]) => {
			// Try to extract the tab's URL string
			let urlString = (tab && tab.url) ? tab.url : "";
			
			// Build URL for popup window page
			let popupURL = browser.runtime.getURL(
				`ui/popup/index.html#tab&url=${encodeURIComponent(urlString)}`
			);
			
			// Launch popup window page in new tab
			return browser.tabs.create({
				active: true,
				url:    popupURL
			});
		}).catch(console.exception);
	});
}
