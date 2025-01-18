chrome.browserAction.onClicked.addListener(function(activeTab){
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	  if(tabs[0].url.indexOf("youtube.com") != -1 || tabs[0].url.indexOf("youtu.be") != -1){ 
		chrome.tabs.create({ url: "https://ytmp3eu.com?autocomplete=".concat(encodeURIComponent(tabs[0].url)) });
	  }
	  else { alert('This site is not supported. We support only YouTube.com!'); }
});
});