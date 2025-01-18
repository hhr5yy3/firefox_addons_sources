var extensionConfig = {
	"appInfo": {
		"quantum": true,
		"safari": false,
		"environment": "firefox extension",
		"version": "2.7.8",
		"manifestVersion": "2.7.8",
		"upgradeDB": false,
		"updateManifestURL": {
			"display": true,
			"fr": "/html/manifests/update-fr.html",
			"en": "/html/manifests/update-en.html"
		},
		"installManifestURL": {
			"display": true,
			"fr": "/html/manifests/install-fr.html",
			"en": "/html/manifests/install-en.html"
		},
		"updateAvailableURL": {
			"fr": "/html/manifests/updateavailable-fr.html",
			"en": "/html/manifests/updateavailable-en.html"
		},
		"verifromHost": "vrf01.signal-spam.fr",
		"uninstallURL": "https://vrf01.signal-spam.fr/extension/uninstall/",
		"runtimeId": "",
		"name": "Signal Spam",
		"localesFolder": "locales_signalspam",
		"localesFileprefix": "signalspam",
		"scriptFilesFolder": "js/",
		"htmlFilesFolder": "html/",
		"cssFilesFolder": "css/",
		"sidebarCSSFileName": "sidebar.css",
		"extensionName": "SignalSpam",
		"extensionCodeName": "SIGSPDEV",
		"sidebarIframeName": "SigSpamEmailScaled",
		"stopPhishingFeature": true,
		"stopPhishingCollisionCheckAPI": true,
		"optionsRequired": false,
		"feedBackLoop": true,
		"logLevel": -1,
		"staging": false,
		"testautomationAllowed": false,
		"chrome": false,
		"thunderbird": false
	},
	"jsonConfig": {
		"localFileName": "signalspam/config.json",
		"url": "https://vrf01.signal-spam.fr/extension/params/firefox/prod/firefox_extension_params_v2.7.8.json",
		"staging": "https://vrf01.signal-spam.fr/extension/params/firefox/preprod/firefox_extension_params_v2.7.8.json"
	}
};