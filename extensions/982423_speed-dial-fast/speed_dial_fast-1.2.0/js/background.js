function handleInstalled(details) {
	if (details.reason == 'install') {
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				var installConfig = JSON.parse(this.responseText);  
						
				if (installConfig.ref) {
					browser.storage.local.set({'ref': installConfig.ref});
				}
			}
		};
		
		xhttp.open('GET', 'https://www.addonsearch.net/install.json', true);
		xhttp.overrideMimeType('application/json');
		xhttp.send();
	}
}

if (browser.runtime.onInstalled) {
	browser.runtime.onInstalled.addListener(handleInstalled);
}

function init() {
	contextMenusCreate();
	browser.browserAction.onClicked.addListener(() => browser.tabs.create({}));
}
    
function contextMenusCreate() {
	browser.contextMenus.removeAll(() => {
		browser.contextMenus.create({
			id: 'newtab_utilsExtDownloadMenuItem',
			title: 'Add website to Speed Dial',
			contexts: ['page', 'link'],
			onclick: function(a, b) {
				if (-1 !== a.pageUrl.indexOf('moz-extension')) return !1;
				if (a.linkUrl) {
					const b = a.linkUrl,
						c = encodeURIComponent(b);
					browser.tabs.create({
						url: '/pages/newtab.html?add_url=' + c,
						active: !0
					})
				} else if (a.pageUrl) {
					const c = a.pageUrl,
						d = b.title,
						e = encodeURIComponent(c);
					browser.tabs.create({
						url: '/pages/newtab.html?add_url=' + e + '&title=' + d,
						active: !0
					})
				}
			}
		})
	})
}

init();
