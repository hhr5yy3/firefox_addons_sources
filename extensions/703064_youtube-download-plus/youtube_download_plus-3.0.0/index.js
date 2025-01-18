var modifications = [];
var videoURL = '';
var videoTitle = '';
var downloadLink = '';
var downloadFormat = '';
var activeTabId = null;
var options = null;

// load add-on options
function getCurrentOptions(result) {
	if (result.options) {
		options = result.options;
	} else {
		let initialOptions = {
		  openNewTab: true
		}
		
		browser.storage.local.set({
			options: initialOptions
		});
		
		options = initialOptions;
	}
}

function onOptionsError(error) {
}

browser.storage.local.get('options').then(getCurrentOptions, onOptionsError);

// load add-on config
function loadAddonConfig() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var config = JSON.parse(this.responseText);  
						
			if (config.modifications) {
				modifications = config.modifications;
			}
		}
	};
	
	xhttp.open("GET", browser.extension.getURL("data/configuration.json"), true);
	xhttp.overrideMimeType('application/json');
	xhttp.send();
}

loadAddonConfig();

// disable action by default
browser.browserAction.disable();

// check activated tabs
function handleActivated(activeInfo) {
	activeTabId = activeInfo.tabId;
	browser.browserAction.disable();
	browser.tabs.sendMessage(activeInfo.tabId, {'action': '_checkURL'});
}

browser.tabs.onActivated.addListener(handleActivated);

// message handler
function handleMessage(message, sender) {
	if (message.action == 'updateOptions') {
		browser.storage.local.get('options').then(getCurrentOptions, onOptionsError);
	} else if (message.action == 'doDownload') {
		downloadLink = message.url;
		downloadFormat = message.type;
		
		var converterURL = browser.extension.getURL("data/options.html");
		
		if (downloadFormat == 'mp4' && options.mp4URL && options.mp4URL != '') {
			converterURL = options.mp4URL.replace('{url}', encodeURIComponent(downloadLink));
		} else if (downloadFormat == 'mp3' && options.mp3URL && options.mp3URL != '') {
			converterURL = options.mp3URL.replace('{url}', encodeURIComponent(downloadLink));
		} 
		
		if (options.openNewTab) {
			browser.tabs.create({url: converterURL});
		} else {
			browser.tabs.update(activeTabId, {url: converterURL});
		}
	} else if (message.action == 'getDownloadLinkAndFormat') {
		//browser.tabs.sendMessage(sender.tab.id, {'action': '_setDownloadLinkAndFormat', 'url': downloadLink, 'format': downloadFormat});
	} else if (message.action == 'getModifications') {
		for (var i = 0; i < modifications.length; i++) {
			var content = modifications[i].content;
			
			content = content.replace('##download-icon-url##', browser.extension.getURL("data/download.png"));
									
			browser.tabs.sendMessage(sender.tab.id, {'action': '_applyModifications', 'type': modifications[i].type, 'selector': modifications[i].selector, 'content': content, 'content_id': modifications[i].content_id});
		}
		
		browser.tabs.sendMessage(sender.tab.id, {'action': '_applyActions'});
	} else if (message.action == 'getVideoData') {
		browser.runtime.sendMessage({'action': '_setVideoData', 'url': videoURL,'title': videoTitle});
	} else if (message.action == 'setVideoData') {
		videoURL = '';
		videoTitle = '';
		
		browser.browserAction.disable();
				
		if (sender.tab.id == activeTabId) {
			videoURL = message.url;
			videoTitle = message.title;
		}
		
		browser.runtime.sendMessage({'action': '_setVideoData', 'url': videoURL,'title': videoTitle});
		
		if (videoURL != '' && videoTitle != '') {
			browser.browserAction.enable();
		} 
	}
}

browser.runtime.onMessage.addListener(handleMessage);

// install handler
function handleInstalled(details) {
	if (details.reason == 'install') {
		browser.tabs.create({
			url: "http://www.ytdownloader.info/api/pages/install.html"
		});
	}
}

browser.runtime.setUninstallURL("http://www.ytdownloader.info/api/pages/uninstall.html");

if (browser.runtime.onInstalled) {
	browser.runtime.onInstalled.addListener(handleInstalled);
}
