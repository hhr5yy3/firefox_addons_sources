function includeFiles(tabID) {
	chrome.tabs.executeScript(tabID, {
		file: 'files/script/jquery-3.2.1.min.js'
	}, function(){
		chrome.tabs.executeScript(tabID, {
			file: 'files/script/postload.js'
		});
		chrome.tabs.insertCSS(tabID, {
			file: 'files/css/style.css'
		});
	});
}

chrome.tabs.query({}, function(tabs){
	for (var i = 0; i < tabs.length; i++) {
		var url = tabs[i].url.slice(7);
		if (url[0] == '/') url = url.slice(1);
		if (url.indexOf('youtube.com') !== 0 && url.indexOf('www.youtube.com') !== 0) continue;
		includeFiles(tabs[i].id);
	}
});
