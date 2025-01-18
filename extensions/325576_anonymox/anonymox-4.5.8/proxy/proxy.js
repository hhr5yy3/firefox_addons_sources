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

base.Proxy = (function() {
	var proxyProfiles = [];

	function gatewayToProxyResponse(gateway) {
		var type = gateway.tls ? "HTTPS" : "HTTP";
		var host = gateway.tls ? gateway.tlsHostname : gateway.ip;
		return {type: type, host: host, port: gateway.port};
	}

	function profileToProxy(profile) {
		if (profile.enabled) {
			return gatewayToProxyResponse(profile.gateway);
		} else {
			return {type: "direct"};
		}
	}

	function handleProxyRequest(requestInfo) {
		var parsedUrl = new URL(requestInfo.url);
		var host = parsedUrl.hostname;

		var defaultProfile;
		if (host.endsWith(base.Configuration.Network.selfCheckDomain)) {
			var gwid = host.split(".")[0];
			if (gwid == "direct") {
				return {type: "direct"};
			} else {
				return gatewayToProxyResponse(base.Gateways.list.find(gw => gw.id == gwid));
			}
		}

		if (host === "ocsp.comodoca.com") {
			return {type: "direct"};
		}
		for (const profile of proxyProfiles) {
			if (profile.name == "default") {
				defaultProfile = profile;
				continue;
			};
			if (

				profile.domain &&
				(host == profile.domain || host.endsWith(`.${profile.domain}`))
				||

				profile.domainMatcher &&
				host.match(profile.domainMatcher)
			) {
				var result = profileToProxy(profile);

				return result;
			}
		}
		if (defaultProfile) {
			var result = profileToProxy(defaultProfile);

			return result;
		}
		return {type: "direct"};
	}

	browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

	function handleMessage(message, sender) {

		if (sender.url !== browser.extension.getURL(proxyScriptURL)) {
			return;
		}
	}

	browser.runtime.onMessage.addListener(handleMessage);

	return {
		updateConfig: function (conf) {

			proxyProfiles = conf;
		},
		enable: function() {
			browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});
			browser.webRequest.onAuthRequired.addListener(
				provideCredentialsSync,
				{urls: ["<all_urls>"]},
				["blocking"]
			);
			base.Profiles.updateProxyConfig();
		},
		disable: function() {
			browser.proxy.onRequest.removeListener(handleProxyRequest);
			browser.webRequest.onAuthRequired.removeListener(
				provideCredentialsSync
			)
		}
	};
})();
