var onIcon = {
	"path": {
		"19": "icons/mobiledyslexic-on.png",
		"38": "icons/mobiledyslexic-on.png"
	}
};

var offIcon = {
	path: {
		"19": "icons/mobiledyslexic-off.png",
		"38": "icons/mobiledyslexic-off.png"
	}
};

var onTitle = {
	"title": "Dyslexic: On"
};	

var offTitle = {
	"title": "Dyslexic: Off"
};

var settings = {
};

function onStorageResponse(response) {
	for (var key in response) settings[key] = response[key];
	try { browser.browserAction.setTitle(settings.disabled ? offTitle : onTitle); } catch(ex) {}
	try { browser.browserAction.setIcon(settings.disabled ? offIcon : onIcon); } catch(ex) {}
}

function onDisableToggled() {
	settings.disabled = !settings.disabled;
	try { browser.browserAction.setTitle(settings.disabled ? offTitle : onTitle); } catch(ex) {}
	try { browser.browserAction.setIcon(settings.disabled ? offIcon : onIcon); } catch(ex) {}
	browser.storage.local.set(settings);
}

(function(){
	browser.storage.local.get().then(onStorageResponse);
	browser.browserAction.onClicked.addListener(onDisableToggled);
})();
