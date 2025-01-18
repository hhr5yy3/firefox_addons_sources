class BrowserActionSwitcher {
	static constructor() {}

	static setIconRed(tabId) {
		let path = "images/icons/active.svg";
		browser.browserAction.setIcon({ tabId, path });
	}

	static setIconBlue(tabId) {
		let path = "images/icons/active.svg";
		browser.browserAction.setIcon({ tabId, path });
	}

	static setIconGrey(tabId) {
		let path = "images/icons/grey_not_active.svg";
		browser.browserAction.setIcon({ tabId, path });
	}

	static setIcon(tabId, urlFileData) {
		if (!urlFileData) {
			this.setIconGrey(tabId);
		} else if (urlFileData.hasVideo()) {
			this.setIconRed(tabId);
		} else if (urlFileData.hasFlash()) {
			this.setIconBlue(tabId);
		}
	}

	static async getActiveTabId() {
		let tabArray = await browser.tabs.query({ 
			currentWindow: true, active: true 
		});

		let activeTab = tabArray[0];

		return activeTab.id;
	}

	static async setIconRedActiveTab() {
		let tabId = await this.getActiveTabId();
		this.setIconRed(tabId);
	}

	static async setIconBlueActiveTab() {
		let tabId = await this.getActiveTabId();
		this.setIconBlue(tabId);
	}

	static async setIconGreyActiveTab() {
		let tabId = await this.getActiveTabId();
		this.setIconGrey(tabId);
	}

	static async setIconActiveTab(urlFileData) {
		let tabId = await this.getActiveTabId();
		this.setIcon(tabId, urlFileData);
	}
}