browser.storage.onChanged.addListener(function(obj, storage) {
	if (storage !== 'sync')
		return;

	if (obj.showBadge !== undefined) {
		ExtensionSettings.showBadge = obj.showBadge.newValue;

		if (obj.showBadge.newValue == false) {
			browser.browserAction.setBadgeText({text: ""});
		} 
		else {
			// Fast render
			if (timer_iter !== false) {
				renderBadge(date);
			}
		}
	}
})

var ExtensionSettings = {
	showBadge: true,
	stopTimerOnBrowserClose: false,

	init: function() {
		var self = this;

		browser.storage.local.get({showBadge: true}).then((r) => {
			self.showBadge = r.showBadge;
		});
		browser.storage.local.get({stopTimerOnBrowserClose: false}).then((r) => {
			self.stopTimerOnBrowserClose = r.stopTimerOnBrowserClose;
		});
	}
};

browser.browserAction.setBadgeBackgroundColor({color: "#000000"});
ExtensionSettings.init();