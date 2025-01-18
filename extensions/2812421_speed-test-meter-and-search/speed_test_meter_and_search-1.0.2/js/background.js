browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({url: '../index.html'});
});

browser.runtime.onInstalled.addListener(function (details) {
	if (details.reason === 'install') {
		onInstallHandler();
	} else if (details.reason === 'update') {
		setUninstallUrl();
	}
});

function onInstallHandler() {
	try {
		setUninstallUrl();

		browser.tabs.query({url: ['*://speedtestmeter.com/*']}).then(
			function (tabs) {
				if (tabs) {
					for (var i = 0; i < tabs.length; i++) {
						try {
							var id = tabs[i].id;
							if (id) {
								browser.tabs.sendMessage(id, {method: 'Installed'});
							}
						} catch (e) {
							console.error(`Error in tab: ${e}`);
						}
					}
				} else {
					console.log('No tabs found with the specified URL pattern.');
				}
			},
			function (error) {
				console.error(`Error in processing tabs: ${error}`);
			}
		);
		browser.tabs.create({url: '../index.html', active: false});
	} catch (err) {
		console.error(`Error caught: ${err}`);
	}
}

function setUninstallUrl() {
	var uninstallUrl = `https://speedtestmeter.com/static/feedback.html`;
	try {
		browser.runtime.setUninstallURL(uninstallUrl);
	} catch (err) {
		console.error('Error setting uninstall page', err);
	}
}
