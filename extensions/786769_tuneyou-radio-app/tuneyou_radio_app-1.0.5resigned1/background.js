var tuneYouCurrentWindow = null;
function focusPopup()
{
	browser.windows.update(tuneYouCurrentWindow.id,{ focused: true });
}
function isPopupWindowExists()
{
	if (tuneYouCurrentWindow)
	{
		return true;
	}
	return false;	
}
var onRemoved = function (windowId)
{
console.log(tuneYouCurrentWindow);
console.log(windowId);
	if (tuneYouCurrentWindow && tuneYouCurrentWindow.id == windowId)
	{
		tuneYouCurrentWindow = null;
	}
}
browser.windows.onRemoved.addListener(onRemoved);