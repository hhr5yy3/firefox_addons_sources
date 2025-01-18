window.onload = function() 
{ 
	browser.runtime.sendMessage({action : "CustomPageLoaded" });
};
