(function () {

	window.MUZLI_SERVER = 'https://beta.api.muz.li/v1';
	window.MUZLI_SERVER_INITIAL = window.MUZLI_SERVER;

	window.MUZLI_ADMIN_SERVER = 'https://admin.muz.li';

	window.MUZLI_AD_SERVER = 'https://bobo.muz.li';
	window.MUZLI_SHARE_SERVER = 'https://s.muz.li/';
	window.MUZLI_COLORS_SERVER = 'https://colors.muz.li';
	window.MUZLI_WEBSITE_URL = 'https://muz.li';
	window.MUZLI_SEARCH_URL = 'https://search.muz.li';
	window.MUZLI_COMMUNITY_PUBLIC_URL = 'https://muz.li/community';

	window.MUZLI_CARBON_URL_ROOT = 'https://srv.buysellads.com';
	window.MUZLI_CARBON_ZONE_MAIN = 'CEAIL53I';
	window.MUZLI_CARBON_ZONE_FEED = 'CWYDTKQM';

	window.OUTBRAINZONE = 'MUZLI1Q3GB5F0MG6CB1P65AQN';
	
	window.GA_TRACKING_CODE = 'UA-53926383-11';
	window.GA_MP_ID = 'G-CGBWXM990Y';
	window.GA_MP_API_SECRET = 'Y8tLexH8Rhye2yRCwqPV_w';
	window.GA_MP_GTM = '45je36l0';
	window.MIXPANEL_TOKEN = 'dfd4ff2fc72adfdf3a6de9ae5451908b';
	window.MUZLI_MIN_REFERRALS = 5;

	chrome?.storage?.local?.get(['developEnvironment', 'endpoint']).then((storage) => {
		if (storage.endpoint) {
			window.MUZLI_SERVER = `https://${storage.endpoint}.api.muz.li/v1`;
		}
	})

	chrome?.storage?.onChanged?.addListener((changes, namespace) => {
		if (changes.endpoint) {
			if (changes.endpoint.newValue) {
				window.MUZLI_SERVER = `https://${changes.endpoint.newValue}.api.muz.li/v1`;
			} else {
				window.MUZLI_SERVER = window.MUZLI_SERVER_INITIAL;
			}
		}
	});
	
})();