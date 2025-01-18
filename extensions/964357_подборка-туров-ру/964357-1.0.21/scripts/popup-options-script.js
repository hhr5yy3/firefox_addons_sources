$(document).ready(function () {
	chrome.storage.sync.get({
		url: ''
	}, function(items) {
		$('#url').val(items.url);
	});

	$(document.body).on('click', '#save', function() {
		var url = $('#url').val().trim().toLocaleLowerCase();
		if (url !== '') {
			url = url.match(/(https|http)?(\:\/\/)?([a-z0-9\-]+)(\.moidokumenti\.ru.*)?/)[3];
		}

		chrome.storage.sync.set({
			url: url
		}, function() {
			$('#url').val(url);
			$('#status').text('Настройки сохранены');
			setTimeout(function() {
				$('#status').html('&nbsp;');
			}, 1000);
		});
	});
});

