// äöü
'use strict';

(function () {

	var /*const*/ stateQrSize = 96;

	window.addEventListener('DOMContentLoaded', function () {

			var manifest = chrome.runtime.getManifest();
			
			$('.tmplShortName').text(manifest['name']);
			$('.tmplDescription').text(manifest['description']);
			$('.tmplVersion').text(manifest['version']);
			$('.tmplAuthor').attr({href: manifest['homepage_url']}).text(manifest['author']);
			//(manifest['homepage_url']);
			
			$('#qr').qrcode({width: stateQrSize, height: stateQrSize, text: 'QR by XAntares.'});

	}, false);


})();

