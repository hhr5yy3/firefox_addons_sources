// static class
class AddonAPI {
	static detectBrowser() {
		let userAgent = navigator.userAgent.toLowerCase();

		if (userAgent.includes("chrome")) {
			if (userAgent.includes("edge")) {
				return AddonAPI.EDGE;
			}
			return AddonAPI.CHROME;
		}

		if (userAgent.includes("firefox")) {
			return AddonAPI.FIREFOX;
		}

		warn("AddonAPI.detectedBrowser: browser detection failed");
	}

	static setAddonAPIObject() {
		let browser;
		let detectedBrowser = AddonAPI.detectBrowser();

		if (detectedBrowser === AddonAPI.FIREFOX 
			|| detectedBrowser === AddonAPI.EDGE) {
			return null;
		}

		if (detectedBrowser === AddonAPI.CHROME) {
			browser = chrome;
		}

		return browser;
	}
}

AddonAPI.FIREFOX = "FIREFOX";
AddonAPI.CHROME = "CHROME";
AddonAPI.EDGE = "EDGE";

if (AddonAPI.setAddonAPIObject() && !DEBUG_SETTINGS.WEBEXTENSION_POLYFILL) {
	var browser = AddonAPI.setAddonAPIObject();
}