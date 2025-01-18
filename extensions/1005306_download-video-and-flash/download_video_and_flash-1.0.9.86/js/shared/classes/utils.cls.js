class Utils {
	static getHost(url) {
		if (url === "") { return ""; }
		
		let anchor = Utils.getAnchor(url);

		if (anchor) {
			return anchor.host;
		}

		return null;
	}

	static getUrlSearchParams(url) {
		return Utils.getAnchor(url).search.split("?")[1].split("&");
	}

	static getAnchor(url) {
		if (!url) {
			throw new Error("Utils.getAnchor: url is undefined");
		}
		if (url.indexOf("about:") === 0 || url.indexOf("moz-extension:") === 0) {
			warn("Utils.getAnchor: unique url (about:, moz-extension:) ignorned");
			return null;
		}
		if (url.indexOf("http") !== 0) {
			throw new Error(`Utils.getAnchor: url is malformed; ${url}`);
		}

		let anchor = document.createElement("a");
		anchor.href = url;
		anchor.hrefWithoutSearch = (anchor.origin + anchor.pathname).replace(/\/$/, "");	// will remove any trailing slashes at the end of the url

		return anchor;
	}

	static isHostYouTube(params = { url: "", host: "" }) {
		return this.isHostExistInUrl(params, Utils.VALID_HOSTS.YOUTUBE_HOST);
	}

	static isHostDailymotion(params = { url: "", host: "" }) {
		return this.isHostExistInUrl(params, Utils.VALID_HOSTS.DAILYMOTION_HOST);
	}

	static isHostVimeo(params = { url: "", host: "" }) {
		return this.isHostExistInUrl(params, Utils.VALID_HOSTS.VIMEO_HOST);
	}

	static isHostFacebook(params = { url: "", host: "" }) {
		return this.isHostExistInUrl(params, Utils.VALID_HOSTS.FACEBOOK_HOST);
	}	

	static isHostExistInUrl(params = { url: "", host: "" }, hostToSearch) {
		try {
			let { url, host } = params;
			if ((!url && !host) || (url === "" && host === "")) {
				throw new Error("Utils.isHostExistInUrl: 'url' and 'host' are undefined. 'params' must be an object.");
			}

			if (url) {
				host = Utils.getHost(url);
			}
			if (host) {
				return host.includes(hostToSearch);
			}

			return false;
		} catch(ex) {
			error(ex);
		}
	}

	static verifyWebUrl(url) {
		if (!url || typeof url !== "string") {
			return false;
		}

		url = url.trim();

		return !!url.match(/^(https?|ftp):/);
	}

	static getRandomChar() {
		return String.fromCharCode(65 + Math.floor(Math.random() * 26));
	};	

	static getRandomString(length) {
		let str = "";

		for (let i = 0; i < length; i++) {
			str += Utils.getRandomChar();
		}

		return str.toLowerCase();
	}

	static isHostValid(params) {
		for (let i in Utils.VALID_HOSTS) {
			let host = Utils.VALID_HOSTS[i];
			if (this.isHostExistInUrl(params, host)) {
				return true;
			}
		}

		return false;
	}

	static decodeString(str) {
		let parser = new DOMParser;
		let dom = parser.parseFromString(str, "text/html");
		let decodedString = dom.body.textContent;

		return decodedString;
	}

	static decodeUnicodeAndEscapedString(str) {
		return decodeURIComponent(JSON.parse(`"${str}"`));
	}

	// example - [ "5AB91F2C", "5AB91AFC", "5AB91D76", "5AB92480", "5AB922F5", "5AB91BC4" ]
	static maxHex(hexArray) {
		let maxIndex = 0;

		for (let i = 1; i < hexArray.length; i++) {
			let num = parseInt(hexArray[i], 16);
			let max = parseInt(hexArray[maxIndex], 16);

			if (num > max) {
				maxIndex = i;
			}
		}

		return hexArray[maxIndex];
	}

	// example - [ "5AB91F2C", "5AB91AFC", "5AB91D76", "5AB92480", "5AB922F5", "5AB91BC4" ]
	static minHex(hexArray) {
		let minIndex = 0;

		for (let i = 1; i < hexArray.length; i++) {
			let num = parseInt(hexArray[i], 16);
			let min = parseInt(hexArray[minIndex], 16);

			if (num < min) {
				minIndex = i;
			}
		}

		return hexArray[minIndex];
	}

	static getArraysDifference(array1, array2) {
		// return array1
		// 	.filter(item => !array2.includes(item))
		// 	.concat(array2.filter(item => !array1.includes(item)));

		return array1.filter(item => !array2.includes(item));
	}

	static async getBrowserVersion() {
		let browserInfo = await browser.runtime.getBrowserInfo();

		return browserInfo.version;
	}

	static async isBrowserVersion57() {
		let browserVersion = await Utils.getBrowserVersion();

		return parseInt(browserVersion) >= 57;
	}
}

Utils.VALID_HOSTS = {};
Utils.VALID_HOSTS.YOUTUBE_HOST = "youtube";
Utils.VALID_HOSTS.DAILYMOTION_HOST = "dailymotion";
Utils.VALID_HOSTS.VIMEO_HOST = "vimeo";
Utils.VALID_HOSTS.FACEBOOK_HOST = "facebook";