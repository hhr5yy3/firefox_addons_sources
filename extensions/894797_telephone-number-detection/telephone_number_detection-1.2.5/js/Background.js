/*
*	Telephone Number Detection
*	Source © CTI Telephony
*	CTITelephony@GMail.com
*/

var pref = Preferences; // alias for the Preferences object
var ext = new Process();
ext.init(); // set the initial state of the extension icon (ON/OFF)
browser.browserAction.onClicked.addListener(function(TAB) { ext.toggle(); });
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.pageLoad && pref.get('enabled')) sendResponse({ parseDOM: true });
});
window.setInterval(function(){ext.isPageComplete();}, 5000);