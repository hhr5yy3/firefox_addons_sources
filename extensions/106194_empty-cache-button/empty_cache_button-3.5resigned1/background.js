
runEmptyCacheAction = function () {
	
	browser.browsingData.removeCache({}).then(function() {
		
		// Notification
		
		browser.storage.local.get('notif').then(function(item){
			if (item.notif === '1' || item.notif === undefined) {
				browser.notifications.create('ecb-notif', {
					'type': 'basic',
					'iconUrl': browser.extension.getURL('icons/48.png'),
					'title': 'Success!',
					'message': 'Cache has been cleared.'
				}).then(function() {});
			}
		});
		
		// Reload
		
		browser.storage.local.get('reload').then(function(item){
			if (item.reload === '1') {
				browser.tabs.reload();
			}
			if (item.reload === '2') {
				browser.tabs.query({currentWindow: true}).then(function(item) {
					item.forEach(function(element) {
						browser.tabs.reload(element.id);
					});
				});
			}
		});
		
	});
	
}

closeNotification = function() {
	setTimeout(function() { browser.notifications.clear('ecb-notif'); }, 1700);
}

browser.browserAction.onClicked.addListener(runEmptyCacheAction);
browser.notifications.onShown.addListener(closeNotification);
