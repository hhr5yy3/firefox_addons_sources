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

base.UserData = (function () {
	var pub;
	var gatewayCache;
	var premium = false;

	function init () {
		browser.runtime.onMessage.addListener(function(msg) {
			if (msg.cmd && msg.cmd === "activatePremium") {
				base.Network.activatePremium(msg.param1);
			}
		});
	};

	pub = {
		username: undefined,
		passwordPlain: undefined,
		get premium() {
			return premium;
		},
		set premium(state) {
			premium = state;
		},

		save: function () {

			browser.storage.local.set({
				user: pub.username,
				pass: pub.passwordPlain
			});
		},

		refresh: function () {
			return new Promise((resolve, reject) => {

				browser.storage.local.get(["user", "pass"]).then((data) => {
					if (data.user && data.pass) {
						pub.username = data.user;
						pub.passwordPlain = data.pass;
						resolve();
					} else {
						base.Network.getAccount(function (username, passwordPlain) {
							pub.username = username;
							pub.passwordPlain = passwordPlain;
							pub.save();
							base.Network.openURI(base.Configuration.welcomeSiteURI);
							resolve();
						});
					}
				})
			});
		}
	};

	init();

	return pub;
})();
