document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('preview-popup').onload = function() {
		chrome.runtime.sendMessage({action: 'getStats'}, function(response) { });
	};
});

window.addEventListener('message', function(message) {
	if (message.data.action == 'tourDeleted') {
		var hash = message.data.hash;
		var toursCount = message.data.tours_count;

		chrome.runtime.sendMessage({action: 'tourDeleted', tours_count: toursCount, hash: hash}, function(response) { });
	}

	if (message.data.action == 'basketChanged') {
		var basketNumber = message.data.basket_number;
		var toursCount = message.data.tours_count;
		var hashes = message.data.hashes;

		chrome.runtime.sendMessage({action: 'basketChanged', tours_count: toursCount, basket_number: basketNumber, hashes: hashes}, function(response) { });
	}
});
