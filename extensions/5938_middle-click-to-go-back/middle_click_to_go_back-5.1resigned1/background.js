var urlNow;

chrome.runtime.onConnect.addListener(function(port, name) {
  port.onMessage.addListener(function(msg) {
		chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs) {
			var tab = tabs[0];
			urlNow = tab.url;
			chrome.tabs.executeScript(tab.id, {code:"history.back();"}, function (){
				if(localStorage["removeTab"]!="true")
					return;					
				maybeRemoveTab();
			});
		});
  });
});

function maybeRemoveTab(){
	chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs) {
		var tab = tabs[0];
		var urlBack = tab.url;
		if(urlNow==urlBack && tab.status=="complete"){
			chrome.tabs.query({currentWindow:true}, function(tabs) {
				chrome.windows.getAll({populate:false}, function(windows){
					//never close chrome (do not close if only one window left with one tab on it)
					if(!(windows.length == 1 && tabs.length == 1))
						chrome.tabs.remove(tab.id);
				});
			});
		}
	});
}

