document.addEventListener("DOMContentLoaded", function(event) 
{
	var background = browser.extension.getBackgroundPage();
	if (background.isPopupWindowExists())
	{
		background.focusPopup();
		window.close();
		return;
	}
	var setWindow = function (data)
	{
		browser.extension.getBackgroundPage().tuneYouCurrentWindow = data;
		window.close();
	}
	var creating = browser.windows.create({url: "http://wapp.tuneyou.com", width:601, height:462,left:2000, top:60, type: "popup"});
	creating.then(setWindow, onError);
	
	
});
function onError(error) {
}