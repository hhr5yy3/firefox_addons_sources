if (browser.tabs && browser.tabs.query) {
	function getActiveTab() {
		return browser.tabs.query({currentWindow: true, active: true});
	}
	getActiveTab().then(function (data) {

		document.querySelector('#option').href = chrome.runtime.getURL('/data/options.html')


		function onError(error) {
			console.log(`Error: ${error}`);
		}



		const getting = browser.storage.sync.get();
		getting.then(function (item) {
			data = data[0]; /* only tab in set */
			var el = kjua({
				render: 'canvas',
				text: data.url,
				size: item.size || 200,
				fill: item.fillColor || 'black',
				back: item.bgColor || 'white',
			});
			el.className = "qrcode"
			el.style = "width:100%; height: 100%";
			document.querySelector('#qr').appendChild(el);
		}, onError);


	});
}
