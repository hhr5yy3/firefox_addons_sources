/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/
var buttonEl = document.getElementById("activateBtn");

if (buttonEl) {
	window.addEventListener("anonymox_websiteComm", function(e) {
		chrome.runtime.sendMessage({
			"cmd": e.target.getAttribute("cmd"),
			"param1": e.target.getAttribute("param1")
		});
	});
}
