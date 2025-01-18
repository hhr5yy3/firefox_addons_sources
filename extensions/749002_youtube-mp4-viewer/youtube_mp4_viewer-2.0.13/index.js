var domChanges = [];

// load add-on config
function loadAddonConfig() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var config = JSON.parse(this.responseText);  
						
			if (config.domChanges) {
				domChanges = config.domChanges;
			}
		}
	};
	
	xhttp.open("GET", browser.extension.getURL("data/configuration.json"), true);
	xhttp.overrideMimeType('application/json');
	xhttp.send();
}

loadAddonConfig();

function handleMessage(message, sender) {
	if (message.action == 'doDownload') {
		browser.tabs.create({url: message.url});
	} else if (message.action == 'getEmbedOverlay') {
		browser.tabs.sendMessage(sender.tab.id, {'action': 'applyEmbedOverlay', 'url': browser.extension.getURL("data/download-white.png")});
	} else if (message.action == 'getDOMChanges') {
		for (var i = 0; i < domChanges.length; i++) {
			var content = domChanges[i].content;
			
			content = content.replace('##download-icon-url##', browser.extension.getURL("data/download.png"));
						
			browser.tabs.sendMessage(sender.tab.id, {'action': 'applyDOMChanges', 'type': domChanges[i].type, 'selector': domChanges[i].selector, 'content': content, 'content_id': domChanges[i].content_id});
		}
		
		browser.tabs.sendMessage(sender.tab.id, {'action': 'applyDOMActions'});
	}
}

browser.runtime.onMessage.addListener(handleMessage);

function handleInstalled(details) {
	if (details.reason == 'install') {
		browser.tabs.create({
			url: "http://www.addonsrv.net/pages/ytmp4-install.php"
		});
	}
}

browser.runtime.setUninstallURL("http://www.addonsrv.net/pages/ytmp4-uninstall.php");

if (browser.runtime.onInstalled) {
	browser.runtime.onInstalled.addListener(handleInstalled);
}
