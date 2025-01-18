$(document).ready(function () {
	chrome.storage.sync.get({
		url: ''
	}, function(items) {
		if (items.url === '') {
			chrome.runtime.openOptionsPage();
		} else {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var current_url = tabs[0].url;

				$('#preview-popup').attr('src', 'https://'+items.url+'.moidokumenti.ru/onlineext/extension-popup?url='+encodeURIComponent(current_url));
			});
		}
	});

	$('#preview-popup').on('load', function() {
		//console.log('Frame loaded');
	});
});

window.addEventListener('message', function(message) {
	if (message.data.action == 'apply-export-data') {
		chrome.runtime.sendMessage(message.data, function(response) { });
		//window.close();
	}
});
