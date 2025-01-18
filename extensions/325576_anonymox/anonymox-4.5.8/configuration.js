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

base.Configuration = (function() {
	var pub;
	var browserInfo;
	browser.runtime.getBrowserInfo().then(info => {
		browserInfo = info;
	});

	pub = {

		OS: (function () {
			if (navigator.appVersion.indexOf("Win") != -1) {
				return "Windows";
			}
			if (navigator.appVersion.indexOf("Mac") != -1) {
				return "MacOS";
			}
			if (navigator.appVersion.indexOf("X11") != -1) {
				return "UNIX";
			}
			if (navigator.appVersion.indexOf("Linux") != -1) {
				return "Linux";
			}
		})(),


		locale: window.navigator.language.split("-")[0],
		get localePrefix() {
			var locale = pub.locale;

			if (locale != "de") {
				locale = "en";
			}
			return locale;
		},


		version: browser.runtime.getManifest().version,
		get browserInfo() {
			return browserInfo;
		},


		periodicCheckTime: 1000 * 60 * 15,


		networkTimeout: 1000 * 30,


		selfcheckTimeout: 1000 * 5,


		isPremium: false,


		homepageBaseURI: "https://www.anonymox.net/",
		selfCheckFailedURL: "https://www.anonymox.net/self-check-failed",
		get supportFeedbackPageURI() {
			return pub.homepageBaseURI + pub.localePrefix + "/support-feedback";
		},
		get premiumInfoURI() {
			return pub.homepageBaseURI + pub.localePrefix + "/premiuminfo?src=";
		},
		get welcomeSiteURI() {
			return pub.homepageBaseURI + pub.localePrefix + "/gettingstarted";
		},


		Network: {
			masterURI : "https://master.anonymox.net/firefox",

			networkInfoURI: "http://nwi.anonymox.net/",
			selfCheckDomain: "sc.nwi.anonymox.net",
			networkInfoSecureURI: "https://nwi.anonymox.net/",
			externalInfo: {
				country: "",
				ip: ""
			}
		},
		get disableAdsURI() {
			return pub.homepageBaseURI + pub.localePrefix + '/disable-ads';
		},

		showMoreCountries: false,


		Ads: {}
	};
	return pub;
})();

