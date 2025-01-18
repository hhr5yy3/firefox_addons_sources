var DEBUG_SETTINGS = {
	DEBUG_ON: false,
	WEBEXTENSION_POLYFILL: true,
	LOG_WARNINGS: true
};

var stg = function() {};

if (DEBUG_SETTINGS.DEBUG_ON) {
	stg = function() { browser.storage.local.get(log); };
}

const EXT_SETTINGS = (function () {
	class ExtSettings {
		static getExtensionId() {
			return browser.runtime.id 
				|| browser.runtime.getManifest().applications.gecko.id;
		}
	}

	try {
		return {
			EXTENSION_ID: ExtSettings.getExtensionId()
		};
	} catch(ex) {
		return {};
	}
})();