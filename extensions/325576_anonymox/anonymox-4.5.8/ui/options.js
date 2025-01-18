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

var myPort = browser.runtime.connect({name: "port-from-prefs"});


myPort.onMessage.addListener(handleMessage);


function handleMessage(message, sender, sendResponse) {
	if (message.premium) {
		jQuery("#activate-premium-form").hide();
		jQuery("#activate-premium-noaction").show();
	}
	if (message.activateError) {
		jQuery("#activate-premium-result").text(message.activateError);
	}

	if (message.browserInfo) {
		jQuery("#browser-version").val(message.browserInfo.name + " " + message.browserInfo.version);
	}
	if (message.extVersion) {
		jQuery("#ext-version").val(message.extVersion);
	}
	if (message.userId) {
		jQuery("#user-id-field").val(message.userId);
	}
}

myPort.postMessage({ requestState: ["premium", "userId"] });

jQuery('#activate-premium-submit').click(() => {
	var code = jQuery("#premium-code").val();
	jQuery("#activate-premium-result").text("");
	myPort.postMessage({ activateCode: code });
});


jQuery('body').find("[data-i18n]").each(function(idx, val) {
	var el = $(val);
	var text = browser.i18n.getMessage(el.data("i18n"));
	el.text(text);
});
