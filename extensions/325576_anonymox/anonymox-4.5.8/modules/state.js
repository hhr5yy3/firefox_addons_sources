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
var base = base || {};

base.State = (function () {
	var pub;
	var disabled = false;

	pub = {
		get disabled() {
			return disabled;
		},
		set disabled(state) {
			disabled = state;
			if (disabled) {
				base.Proxy.disable();
				browser.browserAction.disable();
			} else {
				base.Proxy.enable();
				browser.browserAction.enable();
			}
		}
	};

	return pub;
})();
