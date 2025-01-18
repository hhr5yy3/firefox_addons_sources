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

base.Tabs = (function () {
	var pub;


	var tabPort;
	var tabPortConnected = false;

	var cache = (function() {
		return {
			has: function(tab) {
				return tab in this;
			},
			get: function(tab) {
				return this[tab];
			},
			set: function(tab, data) {
				this[tab] = data;
			},
			remove: function(tab) {
				delete this[tab];
			}
		};
	})();
	var activeTab;


	function sendTabChange(tab) {
		var domain = new URL(tab.url).hostname;
		var info = {
			tabId: tab.id,
			windowId: tab.windowId,
			url: tab.url,
			domain: domain
		};


		if (cache.has(tab.id)) {
			var data = cache.get(tab.id);
			if (tab.id == activeTab) {
				base.Ui.setIconActive(data.enabled);
			}
			if (tabPortConnected) {
				tabPort.postMessage({uidata: data});
			}
			return {info: info, data: data};
		} else {
			return base.Ui.getUiData(info).then(function(data) {
				cache.set(tab.id, data);
				if (tab.id == activeTab) {
					base.Ui.setIconActive(data.enabled);
				}
				if (tabPortConnected) {
					tabPort.postMessage({uidata: data});
				}
				return {info: info, data: data};
			});
		}
	}

	function requestTabInfo() {
		getCurrentTab().then(sendTabChange);
	}

	function connected(p) {
		if (p.name === "port-from-popup") {
			tabPort = p;
			tabPortConnected = true;

			tabPort.onDisconnect.addListener((p) => {
				tabPortConnected = false;
			});

			tabPort.onMessage.addListener(handleMessage);
			requestTabInfo();
		}
	}
	browser.runtime.onConnect.addListener(connected);




	chrome.tabs.onRemoved.addListener(function(tabId) {

		cache.remove(tabId);
	});

	let adCounter = 0;
	function insertAd(tabInfoData) {
		if (base.UserData.premium || base.State.disabled) return;
		let tabData = tabInfoData.data;
		if (!tabData.internal && tabData.enabled) {
			adCounter++;
			if (adCounter >= base.Configuration.Ads.pageChangesPerAd) {
				adCounter = 0;
				console.log("show ad for ", tabData);
				browser.tabs.executeScript(tabInfoData.info.tabId, {file: "contentscript/advertising.js"})
				.then(() => {
					loadAdvertising(tabInfoData.info.tabId, base.Intercom.adsPort);
				}, (error) => {
					console.log(error);
				});
			}
		}
	}


	chrome.tabs.onActivated.addListener(function(activeInfo) {

		activeTab = activeInfo.tabId;
		browser.tabs.get(activeInfo.tabId)
		.then(sendTabChange)
		.then(insertAd);
	});


	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

		if (changeInfo.status === "loading" && changeInfo.url !== undefined) {
			cache.remove(tabId);
			sendTabChange(tab);
		}
	});


	function getCurrentTab() {

		if (activeTab) {
			return browser.tabs.get(activeTab);
		}


		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		return gettingActiveTab.then(function(tabs) {
			for (let tab of tabs) {
				activeTab = tab.id;
				return tab;
			}
		});
	}

	function loadAdvertising(tab, port) {
		$.ajax({
			url: base.Configuration.Ads.frameURL
		}).then(function (html) {
			var frameWidth = parseInt(/<body frame_width="(\d+)"/g.exec(html)[1], 10),
				frameHeight = parseInt(/<body frame_width="(\d+)" frame_height="(\d+)"/g.exec(html)[2], 10);


			if (frameHeight < 85) {
				frameHeight = 85;
			}


			if (tab.width < frameWidth * 2 || tab.height < frameHeight * 3) {
				console.log("tab is too small, will not insert Ads!");
				return false;
			}

			if (!frameWidth || !frameHeight) {
				console.log("no frameWidth || frameHeight, will not insert Ads!");
				return false;
			}

			var adHTML = $("<div>").css({ display: "inline-block" }).html(html);

			var loadImgData = new Promise(function(resolve, reject) {



				var imgs = 0,
					loaded = 0;

				adHTML.find("img").each(function () {
					var that = this;
					imgs += 1;

					base.Network.loadImgData(this.src, function (data) {
						loaded += 1;

						if (imgs == loaded) {
							resolve();
						}

						that.src = data;
						return that;
					});
				});
			});

			loadImgData.then(function() {
				var adCode = adHTML[0].outerHTML;

				adCode = adCode.replace(/\r?\n|\r/g, "");

				port.postMessage({
					width: frameWidth + 120,
					height: frameHeight,
					marginLeft: (frameWidth / 2) * -1,
					adCode: adCode
				});
			});
		});
	}


	function handleMessage(message) {
		if (message.getCurrentTab) {

			requestTabInfo();
		}
		if (message.profileSettingsAction) {
			base.Profiles.modifyProfile(message.profileSettingsAction);
		}
		if (message.toggleActiveForProfile) {
			base.Profiles.toggleProfile(message.toggleActiveForProfile);
			pub.refreshCache();
		}
		if (message.switchProxy) {
			base.Profiles.rotateGatewayForProfileName(message.switchProxy);
		}
		if (message.changeCountry) {
			base.Profiles.setCountry(message.changeCountry.profileName, message.changeCountry.country);
		}
		if (message.changeIdentity) {
			base.Profiles.setGateway(message.changeIdentity.profileName, message.changeIdentity.identity);
		}
		if (message.showPremiumInfoSrc) {
			base.Network.openURI(base.Configuration.premiumInfoURI + message.showPremiumInfoSrc);
		}
		if (message.showSupportPage) {
			base.Network.openURI(base.Configuration.supportFeedbackPageURI);
		}
		if (message.showSettings) {
			browser.runtime.openOptionsPage();
		}
		return true;
	}

	pub = {
		refreshCache: function() {
			if (activeTab) {
				cache.remove(activeTab);
			}
			requestTabInfo();
		},
		invalidateCache: function() {
			browser.tabs.query({windowType: "normal"}).then(function(tabs) {
				for (let tab of tabs) {
					cache.remove(tab.id);
				}
			});
			requestTabInfo();
		}
	};

	return pub;
})();
