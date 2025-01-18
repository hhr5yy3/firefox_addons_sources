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

base.Intercom = (function () {
	var prefsPort,
		adsPort;

	function connected(p) {
		if (p.name === "port-from-prefs") {
			prefsPort = p;
			prefsPort.onMessage.addListener(handlePrefsMessage);
		} else if (p.name === "ad-channel") {
			adsPort = p;
			adsPort.onMessage.addListener(adsPortMessage);
		} else {

		}
	}

	browser.runtime.onConnect.addListener(connected);

	function adsPortMessage(message) {
		switch (message) {
			case "destroy-iframe":
				adsPort.postMessage("destroy");
				break;
			case "open-disable-link":
				base.Network.openURI(base.Configuration.disableAdsURI);
				break;
			default:
				console.log("unknown message");
		}
	}

	function handlePrefsMessage(message) {
		if (message.requestState) {
			prefsPort.postMessage({
				premium: base.UserData.premium,
				userId: base.UserData.username,
				extVersion: base.Configuration.version,
				browserInfo: base.Configuration.browserInfo
			});
		}
		if (message.activateCode) {
			base.Network.activatePremium(message.activateCode)
			.then(() => {
				prefsPort.postMessage({ premium: base.UserData.premium });
			})
			.fail((xhr, status, error) => {
				if (error instanceof GenericException2) {
					prefsPort.postMessage({ activateError: error.xmessage });
				}
			});
		}
	}

	browser.runtime.onConnectExternal.addListener((port) => {
		port.onMessage.addListener((message) => {
			if (message.disable) {
				base.State.disabled = true;
			} else if (message.enable) {
				base.State.disabled = false;
			}
		});
		port.onDisconnect.addListener((p) => {
			console.log(`Disconnected`);
			if (p.error) {
				console.log(`Disconnected due to an error: ${p.error.message}`);
			} else {
				console.log(p);
			}
		});
	});

	return {
		get adsPort() {
			return adsPort;
		}
	}
})();
