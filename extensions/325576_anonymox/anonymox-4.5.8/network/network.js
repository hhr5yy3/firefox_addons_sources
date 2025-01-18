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

base.Network = (function() {
	var pub;

	var config = base.Configuration.Network;
	var transport = new Thrift.Transport(config.masterURI),
		protocol = new Thrift.Protocol(transport),
		client = new ClientServiceClient(protocol);

	var infoTimeout,
		retry = 0;

	var selfCheckUrlTemplate = (sub) => "http://" + `${sub}.${base.Configuration.Network.selfCheckDomain}/selfcheck?gw=${sub}`;

	var getInfoSuccess = function(data) {

		base.Configuration.Network.externalInfo = data.externalInfo;

		base.Configuration.Ads = data.adBoxInfo;

		base.UserData.premium = data.premium;


		let parts = data.showPremiumInfoParts ? data.showPremiumInfoParts.split(",") : [];
		base.Configuration.showMoreCountries = parts.includes("morecountries");

		if (data.showURL)
			pub.openURI(data.showURL);


		base.Tabs.invalidateCache();



		base.Gateways.list = data.gateways;
		base.state = "started";
		delete base.errorMsg;


		retry = 0;


		if (infoTimeout) {
			clearTimeout(infoTimeout);
		}
		infoTimeout = setTimeout(
			pub.getInfo,

			base.Configuration.periodicCheckTime * (0.8 + Math.random() * 0.4)
		);
	};

	var getInfoFail = function(jqXHR, status, error) {
		console.log("Info FAIL", jqXHR, status, error);
		if (error instanceof GenericException2) {
			if (error.uri) {
				pub.openURI(error.uri);
			} else {
				if (base.state == "starting") {
					base.state = "error";
					base.errorMsg = error.xmessage;
				}
				browser.notifications.create(
					"info-error",
					{
						type: "basic",
						iconUrl: "design/skin/icon64.png",
						title: "Error connecting.",
						message: error.xmessage
					}
				);
			}

		} else {
			let t = base.Configuration.networkTimeout * (1 + Math.min(retry, 5));
			console.log("getInfoFail: will try again in " + t);
			if (infoTimeout) {
				clearTimeout(infoTimeout);
			}
			infoTimeout = setTimeout(
				pub.getInfo,
				t
			);
			retry++;
		}
	}

	var regexAnonymox = new RegExp("^https?://([^/]+\\.)?anonymox\\.net/", "i");

	browser.webRequest.onBeforeSendHeaders.addListener(
		function (details) {
			if (details.url.match(regexAnonymox)) {

				details.requestHeaders.push({
					name: "X-AnonymoX-Capabilities",
					value: "oneclickactivate"
				});
				details.requestHeaders.push({
					name: "X-AnonymoX-Auth",
					value: "uid:" + base.UserData.username
				});
				return {requestHeaders: details.requestHeaders};
			}
		},
		{urls: ["<all_urls>"]},
		['blocking', 'requestHeaders']
	);

	var domainCache = {};

	pub = {
		getInfo: function() {
			return client.Info7(
				base.UserData.username,
				base.UserData.passwordPlain,
				base.Configuration.version,
				base.Configuration.locale,
				base.Configuration.OS,
				getInfoSuccess
			).fail(getInfoFail);
		},

		selfCheckGW: function(gateway, useForMeasure) {
			if (!gateway.checkIsRunning) {

				gateway.checkIsRunning = true;
				var startTime = new Date().getTime();

				var successFunc = function(data, sts, xhr) {
					gateway.checkIsRunning = false;
					var latency = new Date().getTime() - startTime;

					base.Gateways.updateSelfcheckStatus(gateway, true, latency);
				};

				var failedFunc = function(xhr, status, err) {


					var url = selfCheckUrlTemplate("direct");
					$.ajax( url, { timeout: base.Configuration.selfcheckTimeout } ).then(
						data => {
							gateway.checkIsRunning = false;
							base.Gateways.updateSelfcheckStatus(gateway, false, 0, true);
						},
						(xhr, status, err) => {
							gateway.checkIsRunning = false;
							base.Gateways.updateSelfcheckStatus(gateway, false, 0, false);
						}
					);
				};

				var url = selfCheckUrlTemplate(gateway.id);
				$.ajax( url, { timeout: base.Configuration.selfcheckTimeout } ).then(successFunc, failedFunc);
			} else {

			}
		},

		getAccount: function (callbackFn) {
			client.GetAccount2(2, function (data) {
				callbackFn(data.user, data.passwordPlain);
			}).fail(function (jqXHR, status, error) {
				console.log("base.Network.getAccount ERROR", error, status, jqXHR);
				console.log("base.Network.getAccount retry in", base.Configuration.networkTimeout);

				setTimeout(function () {
					base.Network.getAccount(callbackFn);
				}, base.Configuration.networkTimeout);
			});
		},

		activatePremium: function(code) {
			return client.ActivatePremium(
				code,
				base.UserData.username,
				base.UserData.passwordPlain,
				base.Configuration.locale,
				() => {}
			).then(function(result) {
				base.UserData.premium = true;
				base.Network.getInfo()
				.then(base.Tabs.invalidateCache);
			}).fail(function(xhr, status, error) {

				if (error instanceof GenericException2) {
					if (error.uri) {
						base.Network.openURI(error.uri);
					} else {
						console.log("error " + error.xmessage);
					}
				} else {
					console.log(JSON.stringify(xhr));
				}
			});
		},

		openURI: function(url) {
			chrome.tabs.create({'url': url}, function (tab) {});
		},

		loadImgData: function (url, callbackFn) {


			var xhr = new XMLHttpRequest(),
				type = /\.(\w+)$/.exec(url)[1];

			xhr.open('GET', url, true);

			xhr.responseType = 'arraybuffer';

			xhr.onload = function(e) {
				if (this.status == 200) {
					var uInt8Array = new Uint8Array(this.response),
						i = uInt8Array.length,
						binaryString = new Array(i),
						data,
						base64;

					while (i--)
					{
					  binaryString[i] = String.fromCharCode(uInt8Array[i]);
					}

					data = binaryString.join('');

					base64 = window.btoa(data);

					callbackFn("data:image/" + type + ";base64," + base64);
				}
			};

			xhr.send();
		},

		resolveDomain: function(domain) {
			return new Promise((resolve, reject) => {

				reject("-");


















			});
		}
	};

	return pub;
})();
