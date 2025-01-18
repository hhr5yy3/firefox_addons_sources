chrome.runtime.onInstalled.addListener(function(details) {
/*if(details.reason == "update"){
    chrome.tabs.create({ url: "https://www.getfvid.com" })
}*/

chrome.runtime.setUninstallURL("https://www.getfvid.com/extension/remove");
})

chrome.runtime.onMessage.addListener((o, e, d) => {
	if(o.todo == "download") {
		chrome.downloads.download({
        	url: o.url,
        	filename: o.name
    	})
	}
});