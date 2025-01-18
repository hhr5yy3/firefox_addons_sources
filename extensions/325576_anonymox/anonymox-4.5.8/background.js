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
base.state = "starting";


let upgradeCheck = browser.storage.local.get(["lastVersion"]);

upgradeCheck.then((data) => {

	if (data.lastVersion) {
		var last = data.lastVersion;
		if (last.addon.split(".")[0] < 4) {
			base.Profiles.migrateLegacyProfiles();
		}
		browser.runtime.getBrowserInfo().then((info) => {
			var currentAddonVersion = browser.runtime.getManifest().version;
			if (
				last.addon !== currentAddonVersion ||
				last.browser !== info.version
			) {
				var lastVersion = {
					addon: currentAddonVersion,
					browser: info.version
				}
				browser.storage.local.set({lastVersion});
			}
		});
	}


	return base.UserData.refresh();
}).then(function() {
	base.Profiles.load();
	base.Network.getInfo()
	.then(() => {
		base.state = "started";
	});
});
