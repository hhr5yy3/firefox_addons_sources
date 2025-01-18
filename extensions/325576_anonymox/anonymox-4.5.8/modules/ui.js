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

base.Ui = (function () {
	var pub;



	function getUiData(tabInfo) {
		return new Promise((resolve, reject) => {
			var matchingProfile = base.Profiles.findMatchingProfile(
				tabInfo.url, tabInfo.domain
			);
			var enabled = matchingProfile.enabled || false;

			var uiData = {
				state: base.state,
				url: tabInfo.url,
				domain: tabInfo.domain,
				internal: matchingProfile.isInternal || false,
				profileName: matchingProfile.name,
				currentCountry: matchingProfile.country,
				currentGw: matchingProfile.gateway,
				cookieOption: 0,
				enabled: enabled,
				premium: base.UserData.premium,
				identities: base.Gateways.list.filter(gw => !gw.selfcheckFailed),
				endToEnd: tabInfo.url.startsWith("https://"),
				ownIp: base.Configuration.Network.externalInfo.ip,
				showMoreCountries: base.Configuration.showMoreCountries
			};
			if (base.state == "error") {
				uiData.errorMsg = base.errorMsg;
			}

			if (matchingProfile.isInternal) {
				uiData.remoteIp = "-";
				resolve(uiData);
				return;
			}
			base.Network.resolveDomain(tabInfo.domain).then((remoteIp) => {
				uiData.remoteIp = remoteIp;
				resolve(uiData);
			}).catch((remoteIp) => {
				uiData.remoteIp = remoteIp;
				resolve(uiData);
			});
		});
	}

	var iconFactory = ((premium, state) => {
		var basePath = "ui/browseraction";
		var sizes = [16, 32];
		function produceIcons(premium, state) {
			var iconDecl = {};
			var premiumSuffix = premium ? "-premium": "";
			var stateSuffix = state ? "": "-off";
			for (const size of sizes) {
				iconDecl[size] = `${basePath}/icon${premiumSuffix}${stateSuffix}${size}.png`
			}
			return iconDecl;
		}
		return produceIcons(premium, state);
	});

	pub = {
		getUiData: getUiData,
		setIconActive: function(active) {
			var icons = iconFactory(base.UserData.premium, active);
			browser.browserAction.setIcon({path: icons});
		}
	};

	return pub;
})();
