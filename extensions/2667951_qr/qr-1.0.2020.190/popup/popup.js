// äöü
'use strict';

(function () {


	$(function () {

		var stateQrSize = parseInt(localStorage.getItem('stateQrSize')) || 200;

		updateQR(stateQrSize);

		$(window).resize(function() {
			if (window.location.search) updateQR(Math.min($(this).width(), $(this).height()) - 20);
		});

		$('#qr').resizable({
				alsoResize: 'body',
				autoHide: true,
				//handles: 'sw,se',
				grid: [ 10, 10 ],
				aspectRatio: 1,
				minHeight: 160,
				maxHeight: 550,
				stop: function (e, ui) {
						updateQR(ui.size.height);
				}
		});

	});


	function updateQR (stateQrSize) {

		if (window.location.search) {
			updateQRfromQuery(stateQrSize);
		}
		else {
			updateQRfromTab(stateQrSize);
		}

	}


	function updateQRfromTab (stateQrSize) {

		chrome.tabs.query({active: true, currentWindow: true, windowType: 'normal'},
				function (tabs){

					// console.log('qr:popup:: Received chrome.tabs-tab info ', tabs);
					doUpdateQR(stateQrSize, (tabs && tabs[0])? tabs[0]: null);

				}
		);

	}


	function getQueryVar (variable) {
		
		return decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(variable).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));

	}


	function updateQRfromQuery (stateQrSize) {
		
		var tab = { url: getQueryVar('url') /*, title: null */ };
		

		// console.log('qr:popup:: Received GET-tab info ', tab);
		doUpdateQR(stateQrSize, tab.url? tab: null);
		
	}


	function doUpdateQR (stateQrSize, tab) {

			//var qr = $('#qr');
			if (tab && tab.url) {
						$('#qr').children('canvas, div#noqr').remove();
						$('#qr').qrcode({width: stateQrSize, height: stateQrSize, text: tab.url});
			}
			else {
				var txt = chrome.i18n.getMessage("noQR").replace('"', '\\"');
				$('#qr').children('canvas, div#noqr').remove();
				$('#qr').append('<div id="noqr" title="'+ txt +'"></div>');
			}

			$('#qr').width(stateQrSize).height(stateQrSize); // req -- plus workaround a possible rect refresh bug
	}


})();
