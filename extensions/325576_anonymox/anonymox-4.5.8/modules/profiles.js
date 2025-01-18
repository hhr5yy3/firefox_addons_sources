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

base.Profiles = (function () {
	let pub;
	let profiles = [];

	function createInternalProfile(name, filter) {
		let profile = new Profile(name, undefined, filter);
		profile.isInternal = true;
		profile.enabled = false;
		profile.gateway = { tls: false };
		return profile;
	};


	let localProfile = createInternalProfile(
		"local",
		/^(?:localhost|fritz\.box|easy\.box|[^\/]*\.spotilocal.com|127\.0\.0\.1|192\.168\.\d*\.\d*|10\.\d*\.\d*\.\d*|172\.(?:1[6-9]|2[0-9]|3[0-1])\.\d*\.\d*)$/
	);
	let specialProfile = createInternalProfile("special");
	let anynetProfile = createInternalProfile(
		"anynet",
		/^(?:.+\.)?(?:anonymox\.net|curopayments\.net)$/
	);

	function loadBuiltInProfiles() {
		profiles.push(localProfile);
		profiles.push(specialProfile);
		profiles.push(anynetProfile);
	}

	function profilesForStorage() {
		let profilesForStorage = [];
		for (const profile of profiles) {

			if (!profile.isInternal) {
				profilesForStorage.push({
					name: profile.name,
					domain: profile.domain,
					enabled: profile.enabled,
					country: profile.country,
					gatewayId: (profile.gateway) ? profile.gateway.id : undefined,
					gwUserPicked: profile.gwUserPicked,
					cookieAction: profile.cookieAction || 0,
					fakeGeolocation: profile.fakeGeolocation || false
				});
			}
		}
		return profilesForStorage;
	}

	function Profile(name, domain, filter, country, gateway) {
		return {
			name: name,
			domain: domain,
			domainMatcher: filter,
			enabled: true,
			country: country,
			gateway: gateway,
			gwUserPicked: false,
			cookieAction: 0,
			fakeGeolocation: false
		};
	}

	function findProfileByName(name) {
		return profiles.find(p => p.name === name);
	}

	function pingToActivateAuth() {

		browser.runtime.getBrowserInfo().then((info) => {
			if (info.name == "Firefox" && info.version.split(".")[0] < 57) {
				let url = "http://detectportal.firefox.com";
				$.get( url );
			}
		});
	}

	pub = {
		getProfiles: function() {
			return profiles;
		},

		load: function() {
			browser.storage.local.get(["profiles"]).then((data) => {
				if (data.profiles) {
					profiles = data.profiles;
				} else {

					profiles.push(new Profile("default", undefined, ".*"));
					pub.save();
				}
				loadBuiltInProfiles();
			});
		},

		save: function() {
			browser.storage.local.set({profiles: profilesForStorage()});
		},


		modifyProfile: function(data) {
			if (data.profileName === "default") {

				let defaultProfile = profiles.find(p => p.name === "default");
				let country = defaultProfile.country;
				let gateway = defaultProfile.gateway;
				let profile = new Profile(
					data.domain,
					data.domain,
					undefined,
					country,
					gateway
				);
				profile.enabled = defaultProfile.enabled;
				profile.gwUserPicked = defaultProfile.gwUserPicked;
				profiles.push(profile);
				pub.save();
			} else {

				let currentIdx = profiles.findIndex(p => p.name === data.profileName);
				profiles.splice(currentIdx, 1);
				pub.save();
			}
			pub.updateProxyConfig();


			base.Tabs.invalidateCache();
		},

		setCountry: function(name, country) {
			let profile = findProfileByName(name);
			if (country === "automatic") {
				delete profile.country;
			} else {
				profile.country = country;
			}
			profile.gwUserPicked = false;
			pub.assignGatewayForProfile(profile);
			pub.save();
			base.Tabs.invalidateCache();
		},

		setGateway: function(name, gatewayId) {
			let profile = findProfileByName(name);
			profile.gwUserPicked = true;
			profile.gateway = base.Gateways.list.find(gw => gw.id == gatewayId);
			pub.assignGatewayForProfile(profile);
			pub.save();
			base.Tabs.invalidateCache();
		},

		toggleProfile: function(name) {
			for (const profile of profiles) {
				if (profile.name === name) {
					profile.enabled = !profile.enabled;
					if (profile.enabled) {
						pub.assignGatewayForProfile(profile);
					}
					pub.save();
					break;
				}
			}
			base.Proxy.updateConfig(profiles);
		},

		findMatchingProfile: function(url, domain) {
			let defaultProfile;
			let proxifyable = url.startsWith("http://") ||
				url.startsWith("https://") ||
				url.startsWith("ftp://");
			for (const profile of profiles) {

				if (profile.name === "default") {
					defaultProfile = profile;
					continue;
				} else {
					if (proxifyable) {

						if (

							profile.domain && (
								domain == profile.domain ||
								domain.endsWith(`.${profile.domain}`)
							) ||

							profile.domainMatcher &&
							domain.match(profile.domainMatcher)
						) {
							return profile;
						}
					} else {
						return specialProfile;
					}
				}
			}
			return defaultProfile;
		},

		rotateGatewayForProfileName: function(name) {
			pub.rotateGatewayForProfile(findProfileByName(name));
			pub.save();
			base.Tabs.invalidateCache();
		},

		rotateGatewayForProfile: function(profile) {
			profile.gwUserPicked = false;
			if (!profile.gatewayRotateHistory) {
				profile.gatewayRotateHistory = new Array();
			}

			profile.gatewayRotateHistory.push(profile.gateway.id);

			pub.assignGatewayForProfile(profile);
		},

		findGatewayForProfile: function(profile) {
			if (profile.gwUserPicked && profile.gateway) {
				if (base.Gateways.list.some(gw => (gw.id == profile.gateway.id && !gw.selfcheckFailed))) {
					return profile.gateway;
				}
			}


			let countryFilteredGWs = base.Gateways.list.filter(gw => !gw.selfcheckFailed);


			if (profile.country) {
				countryFilteredGWs = countryFilteredGWs.filter(gw => gw.country == profile.country);
				if (countryFilteredGWs.length == 0) {

					profile.country = undefined;
					countryFilteredGWs = base.Gateways.list;
				}
			}


			if (!profile.gatewayRotateHistory) profile.gatewayRotateHistory = new Array();
			let rotateHistoryExcludedGWs = countryFilteredGWs.filter(gw => !profile.gatewayRotateHistory.includes(gw.id));
			if (rotateHistoryExcludedGWs.length == 0) {
				profile.gatewayRotateHistory = new Array();
				rotateHistoryExcludedGWs = countryFilteredGWs;
			}

			let filteredGWs = rotateHistoryExcludedGWs;


			filteredGWs.forEach(function(gw){
				let newScore = 0;

				let usageScore = 1 - gw.usageIndex / 100;
				if (isNaN(usageScore)) usageScore = 0.5;
				newScore += usageScore;

				if (profile.gateway && gw.id == profile.gateway.id)
					newScore += 0.25;
				gw.score = newScore;

			});


			let maxScoreGW = filteredGWs.reduce((a,b) => a.score > b.score ? a : b);

			if (!maxScoreGW) {
				console.log(`no gateway found for profile "${profile}"`);
			}

			return maxScoreGW;
		},

		assignGatewayForProfile: function(profile) {
			if (profile.enabled) {
				if (profile.gatewayId) {
					let restoredGw = base.Gateways.list.find(gw => gw.id == profile.gatewayId);
					if (restoredGw)
						profile.gateway = restoredGw;
					profile.gateway = pub.findGatewayForProfile(profile);
					delete profile.gatewayId;
				} else {
					profile.gateway = pub.findGatewayForProfile(profile);
				}
				if (profile.name == "default") {
					pingToActivateAuth();
				}
			} else {


				return;
			}

			if (!profile.isInternal) {
				base.Gateways.enqueueGWForSelfCheck(profile.gateway);
			}



			pub.updateProxyConfig();
		},

		assignGateways: function() {
			for (const profile of profiles) {
				pub.assignGatewayForProfile(profile);
			}
			base.Tabs.invalidateCache();
		},

		updateProxyConfig: function() {
			base.Proxy.updateConfig(profiles);
		},

		migrateLegacyProfiles: function() {
			browser.storage.local.get(["profiles.list"]).then((data) => {
				let legacyProfiles = data["profiles.list"];
				let newProfiles = [];
				for (const legacyProfile of legacyProfiles) {
					let name,
						domain,
						filter,
						country,
						gw;
					if (legacyProfile.name == "default") {
						name = legacyProfile.name;
						filter = ".*";
					} else {
						name = legacyProfile.site;
						domain = legacyProfile.site;
					}
					country = legacyProfile.gatewayFilter.country;
					gw = { id: legacyProfile.gatewayFilter.lastGW };
					let profile = new Profile(name, domain, filter, country, gw);

					profile.cookieAction = legacyProfile.cookieAction;
					profile.fakeGeolocation = legacyProfile.fakeGeolocation;
					profile.enabled = legacyProfile.gatewayFilter.enabled;
					newProfiles.push(profile);
				}
				profiles = newProfiles;
				pub.save();

			});
		}
	}

	return pub;
})();
