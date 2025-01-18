'use strict';

(function () {
	'use strict';

	var EXT_ID = 'adcm-chrome';
	var API_URL = 'https://dmg.digitaltarget.ru/1/1020/i/i';

	var USER_ID;
	var PLUGIN_ID;

	var DEFAULT_FILTER = {
		urls: ['<all_urls>'],
		types: ['main_frame']
	};

	function adcm() {
		this.init();
	}

	adcm.prototype = {
		init: function init() {
			this.bindEventListeners();

			USER_ID = this.generateId();

			chrome.storage.sync.get('adcmUserID', function (result) {
				if (result.adcmUserID) {
					USER_ID = result.adcmUserID;
				} else {
					chrome.storage.sync.set({
						adcmUserID: USER_ID
					});
				}
			});
		},

		bindEventListeners: function bindEventListeners() {
			chrome.runtime.onMessage.addListener(this.onExternalMessage.bind(this));
			chrome.webRequest.onCompleted.addListener(this.onRequestCompleted.bind(this), DEFAULT_FILTER);
		},

		onRequestCompleted: function onRequestCompleted(details) {
			var self = this;

			if (this.isBlacklistedUrl(details.url)) {
				return;
			}

			chrome.tabs.executeScript(details.tabId, {
				code: "(function () { return {referrer:document.referrer, url:window.location.href, cb:Date.now()}})();"
			}, function (result) {
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError.message);
				} else {
					if (result && result.length > 0) {
						self.sendRequest(result[0], true);
						console.log('Request completed in tab %s', details.tabId);
					} else {
						console.log('Wrong page context in tab %s', details.tabId);
					}
				}
			});
		},

		prepareData: function prepareData(data) {
			var result = "i=" + this.getUserId() + (data.cb ? "." + data.cb : "") + "." + this.generateId();
			var params = [];

			if (data && this.getPluginId()) {
				params.push("up:" + this.getPluginId());
			}

			if (data && data.ids) {
				params.push("ds:20");

				data.ids = this.encode(data.ids);

				params.push("pc:" + data.ids);
			}

			if (data && data.url) {
				params.push("cu:" + this.encode(data.url));
			}

			if (data && data.referrer) {
				params.push("cr:" + this.encode(data.referrer));
			}

			if (params.length > 0) {
				result += "&c=" + params.join(".");
			}

			return result;
		},

		encode: function encode(str) {
			return encodeURIComponent(str);
		},

		sendRequest: function sendRequest(data, initial) {
			var xhr = new XMLHttpRequest();
			xhr.onload = this.handleResponse.bind(this, xhr, data, initial);
			xhr.open('POST', API_URL, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(this.prepareData(data));
			console.log("Send request: " + this.prepareData(data));
		},

		handleResponse: function handleResponse(xhr, data, initial) {

			if (xhr.readyState !== 4) return;

			if (xhr.status === 200 || xhr.status === 204) {
				return;
			} else {
				console.error('Server error: %d (%s)', xhr.status, xhr.statusText);
			}
		},

		onExternalMessage: function onExternalMessage(object, sender, sendResponse) {
			console.log("Get message from:" + sender);
			if (object && object.status === "userID" && object.userID) {
				PLUGIN_ID = object.userID;
			}
			if (object && object.status === "productInfo" && object.data.catID) {
				var data = {
					ids: object.data.catID + '|' + this.encode(object.data.productName)
				};
				this.sendRequest(data, true);
			}
		},

		generateId: function generateId() {
			return Math.round(1E15 * Math.random());
		},

		getUserId: function getUserId() {
			return USER_ID;
		},

		getPluginId: function getPluginId() {
			return PLUGIN_ID || null;
		},

		isBlacklistedUrl: function isBlacklistedUrl(url) {
			var patterns = [
			// chrome:// URLs
			/^(chrome-?\S*:\/\/)/i,
			// New tab URLs
			/(\/(?:chrome|async)\/newtab)/i,
			// Google's stuff
			/(google.\w+\/webhp\?.+)$/i];

			//noinspection JSAnnotator
			for (var i = patterns.length; i--;) {
				if (patterns[i].test(url)) {
					console.log("url included in the blacklist:" + url);
					return true;
				}
			}
			return false;
		}
	};

	new adcm();
})();