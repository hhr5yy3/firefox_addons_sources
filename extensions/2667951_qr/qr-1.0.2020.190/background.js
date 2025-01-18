// äöü
'use strict';


(function () {

	// log to console if debug setting present.
	var dbgLog = (!localStorage.getItem('debug'))?
				function () {}
			: function () { console.log.apply(console, arguments); }
	;


	chrome.runtime.onInstalled.addListener(function (details) {
			dbgLog('qr:onInstalled:: ', details);
			if (('install' === details.reason) || ('update' === details.reason)) {
				var cThisSettingsVersion = 1;
				var storage = localStorage;
				
				// create settings if missing
				if (null === storage.getItem('settingsVersion'))
					storage.setItem('settingsVersion', cThisSettingsVersion);
				if (null === storage.getItem('stateQrSize'))
					storage.setItem('stateQrSize', '200');
				
				// opportunity to update settings
				if (('update' === details.reason)
						&& parseInt(storage.getItem('settingsVersion')) < cThisSettingsVersion) {

					// ...
					// finally update storage version
					//if (parseInt(storage.getItem('settingsVersion')) < cThisSettingsVersion)
						storage.setItem('settingsVersion', cThisSettingsVersion);

				}

				// show options page
				if ('install' === details.reason) { // only on new installs
				// { // alternatively on both, install and update
					chrome.tabs.create({
							url: 'options.html?ref=installed'
						}
					);
				}
			}
			
			// unconditional initializing

			chrome.contextMenus.create({
					id: 'getQR'
					,title: chrome.i18n.getMessage('ctxGenerateQR')
					,contexts: ['link', 'image', 'video', 'audio', 'selection']
					//,targetUrlPatterns: ['http://*/*', 'https://*/*' ]
				}
			);

		}
	);


	chrome.contextMenus.onClicked.addListener(generateQR);


	function generateQR (info, tab) {
		dbgLog('qr:contextMenu:Click:: ', info, tab);

		var stateQrSize = parseInt(localStorage.getItem('stateQrSize')) || 200;
		var url = info.selectionText || info.linkUrl || info.srcUrl || info.pageUrl || tab.url;
	if (true) { // DBG
		window.open('popup/popup.html?url=' + encodeURIComponent(url || ''),
				'QR_popup',
				'height='+ (stateQrSize+25) +',width='+ (stateQrSize+8) +','
				+ 'menubar=0,toolbar=0,location=0,personalbar=0,status=0'
				+ 'resizable=0,scrollbars=0,dependent,dialog');
	} else { // DBG
		chrome.windows.create({
				url: 'popup/popup.html?url=' + encodeURIComponent(url || '')
				,type: 'popup'
				//,type: 'detached_panel'
				//,top: 0
				//,left: 0
				,width: stateQrSize+8
				,height: stateQrSize+90
				,focused: true
			}
			,function () { dbgLog('qr:contextMenu:create:: Ready'); }
		);
	} // DBG
	
	}

})();


/*
chrome.extension.onMessage.addListener(function (req, sender, resp) {
		.........
			var stateQrSize = localStorage.getItem('stateQrSize');
			var dat = stateQrSize.toString();
			dat += 'x' + dat;
			dat = 'http://chart.apis.google.com/chart?chld=Q&choe=UTF-8&cht=qr&chs=' + dat;
			dat += '&chl=' + encodeURIComponent(stateUrl);
		.........
});
*/
