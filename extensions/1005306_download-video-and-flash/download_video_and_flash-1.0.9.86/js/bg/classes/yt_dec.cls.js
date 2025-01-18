var YouTubeDec = (function() {
	const CACHED_DEC = true;				// keep in storage
	const DEC_STORAGE_KEY = "ytDec";
	const DEC_URL_STORAGE_KEY = "ytDecUrl";

	class YouTubeDec {
		constructor() {
			this.url = null;
			this.playerJSRaw = null;
			this.decrypter = new Decrypter();

			this.loadDecrypterFromStorage();
		}

		get Decrypter() { return this.playerJSMod; }	// an alias

		async loadDecrypterFromStorage() {
			try {
				if (!CACHED_DEC) { return; }

				let storage = await browser.storage.local.get();

				if (storage[DEC_STORAGE_KEY] && storage[DEC_URL_STORAGE_KEY]) {
					let importedDecrypter = storage[DEC_STORAGE_KEY];
					this.url = atob(storage[DEC_URL_STORAGE_KEY]);
					this.decrypter.import(importedDecrypter);

					return true;
				}

				return false;
			} catch(ex) {
				error(ex);
			}
		}

		setDecrypterInStorage() {
			try {
				if (!CACHED_DEC) { return; }
				let decSettings = {};

				info("YouTubeDec.setDecrypterInStorage: decrypter set");
				if (!this.decrypter || !this.url) {
					throw new Error("YouTubeDec.setDecrypterInStorage: 'this.decrypter' or 'this.url' is null");
				}

				decSettings[DEC_STORAGE_KEY] = this.decrypter.export();
				decSettings[DEC_URL_STORAGE_KEY] = btoa(this.url);
				browser.storage.local.set(decSettings);
			} catch(ex) {
				error(ex);
			}
		}

		// getEncodedDecrypter() {
		// 	return btoa(this.playerJSMod);
		// }
	
		isNewUrl(url) {
			try {
				if (!url) {
					throw new Error("YouTubeDec.isNewUrl: 'url' is undefined");
				}
				if (!Utils.verifyWebUrl(url)) {
					throw new Error("YouTubeDec.isNewUrl: 'url' is invalid");
				}
				return this.url === null || this.url !== url;
			} catch(ex) {
				error(ex);
			}
		}

		verifyDecrypter() {
			return this.decrypter.verify();
		}

		updateUrl(url) {
			if (url && this.isNewUrl(url)) {
				this.url = url;
			}
		}

		async getPlayerJSRaw() {
			try {
				let xhr = new XHR();

				let response = await xhr.send({
					method: "GET",
					url: this.url
				});				

				return response.responseText;
			} catch(ex) { 
				error(ex); 
				return null;
			}
		}

		async update(url) {
			try {
				log(url);
				this.updateUrl(url);
				this.playerJSRaw = await this.getPlayerJSRaw(url);
				this.createDecrypter();
				this.setDecrypterInStorage();
			} catch(ex) { 
				error(ex);
			}
		}

		createDecrypter() {
			log(this.playerJSRaw);
			this.decrypter = new Decrypter();
			this.decrypter.setBaseCode(this.playerJSRaw);
			this.decrypter.create();
		}
	}

	YouTubeDec.DEC_STORAGE_KEY = DEC_STORAGE_KEY;
	YouTubeDec.DEC_URL_STORAGE_KEY = DEC_URL_STORAGE_KEY;

	return YouTubeDec;
})();