class UrlFileDataCache extends Observer {
	constructor() {
		super();
		this.urlFileDataList = {};	// an "array" of urlFileData objects, set by tab ids
	}

	getTabIdKey(tabId) {
		return "_" + tabId;
	}

	isUrlFileDataExist(tabId) {
		let tabIdKey = this.getTabIdKey(tabId);

		return !!this.urlFileDataList[tabIdKey];
	}

	mergeUrlFileDataObjects(source, target) {
		try {
			if (source.TabId !== target.TabId) {
				throw new Error("UrlFileDataCache.mergeUrlFileDataObjects: different tab ids");
			}

			target.FilesData = [...source.FilesData, ...target.FilesData];

			return true;
		} catch(ex) {
			error(ex);
		}
	}

	addUrlFileData(tabId, urlFileData, options = { append: true }) {
		try {
			if (!tabId || !urlFileData) {
				throw new Error("UrlFileDataCache.addUrlFileData: 'tabId' or 'urlFileData' is null");
			}

			let tabIdKey = this.getTabIdKey(tabId);

			if (this.isUrlFileDataExist(tabId) && options.append) {
				let source = this.urlFileDataList[tabIdKey];
				
				this.mergeUrlFileDataObjects(source, urlFileData);
			}

			this.urlFileDataList[tabIdKey] = urlFileData;

			// will fire this event even though the "UrlFileData" wasn't actually created here,
			// but rather created somewhere else and added to the cache list here
			this.notify(
				EVENTS.BACKGROUND.URL_FILE_DATA_CREATED,
				{ tabId }
			);			
		}
		catch(ex) {
			error(ex);
		}
	}

	getUrlFileData(tabId) {
		let tabIdKey = this.getTabIdKey(tabId);

		return this.urlFileDataList[tabIdKey] ? 
			this.urlFileDataList[tabIdKey] : null;
	}

	clearUrlFileData(tabId) {
		let tabIdKey = this.getTabIdKey(tabId);

		delete this.urlFileDataList[tabIdKey];

		this.notify(
			EVENTS.BACKGROUND.URL_FILE_DATA_CLEARED,
			{ tabId }
		);
	}

	createUrlFileDataByFileData(fileData) {
		let { docUrl, tabId } = fileData;
		let urlFileData = new UrlFileData({ docUrl, tabId});

		urlFileData.addFileData(fileData);
		this.addUrlFileData(tabId, urlFileData);

		this.notify(
			EVENTS.BACKGROUND.URL_FILE_DATA_CREATED,
			{ tabId }
		);
	}
}

class UrlFileDataCacheManager extends Observer {
	constructor(urlFileDataCache) {
		super();
		this.urlFileDataCache = new UrlFileDataCache();
		this.selectedUrlFileData = null;
		this.addTabListeners();
		this.addEventListeners();
		this.addWindowListeners();
	}

	get Cache() {
		return this.urlFileDataCache;
	}

	get SelectedUrlFileData() {
		return this.selectedUrlFileData;
	}

	// returns true if the "selectedUrlFileData" is cleared, false otherwise
	async cacheClearUrlFileData(tabId) {
		this.urlFileDataCache.clearUrlFileData(tabId);

		if (await this.isActiveTab(tabId)) {
			this.selectedUrlFileData = null;

			return true;
		}
		return false;
	}

	addEventListeners() {
		this.urlFileDataCache.subscribe({
			topic: EVENTS.BACKGROUND.URL_FILE_DATA_CREATED,
			callback: async messageObject => {
				let { tabId } = messageObject;

				if (await this.isActiveTab(tabId)) {
					this.setSelectedUrlFileData(tabId);
				}
			}
		});

		// this.urlFileDataCache.subscribe({
		// 	topic: EVENTS.BACKGROUND.URL_FILE_DATA_CLEARED,
		// 	callback: async messageObject => {
		// 		let { tabId } = messageObject;

		// 		if (await this.isActiveTab(tabId)) {
		// 			this.selectedUrlFileData = null;
		// 		}
		// 	}
		// });
	}

	addTabListeners() {
		browser.tabs.onUpdated.addListener(this.onUpdated.bind(this));
		browser.tabs.onRemoved.addListener(this.onRemoved.bind(this));
		browser.tabs.onActivated.addListener(this.onActivated.bind(this));
	}

	addWindowListeners() {
		browser.windows.onFocusChanged.addListener(this.onFocusChanged.bind(this));
	}

	onRemoved(tabId) {
		this.urlFileDataCache.clearUrlFileData(tabId);
	}

	onUpdated(tabId, changeInfo, tabInfo) {
		try {
			let isIgnoreSearchQuery = false;

			let { url, id } = tabInfo;

			if (!url) { throw new Error("UrlFileDataCacheManager.onUpdated: 'url' is undefined"); }
			if (!id) { throw new Error("UrlFileDataCacheManager.onUpdated: 'id' is undefined"); }

			let urlFileData = this.urlFileDataCache.getUrlFileData(id);
			if (!urlFileData) { return; }

			if (Utils.isHostFacebook({ url })) {
				isIgnoreSearchQuery = true;
			}

			if (!this.compareUrls(url, urlFileData.DocUrl, isIgnoreSearchQuery)) {
				log("not the same");
				log(url);
				log(urlFileData.DocUrl);
				this.urlFileDataCache.clearUrlFileData(tabId);
				
				if (this.selectedUrlFileData === urlFileData) {
					this.selectedUrlFileData = null;
				}
			} else {
				log("same id");
			}

			// log(this.compareUrls(url, urlFileData.DocUrl));
		} catch(ex) { 
			error(ex);
		}
	}

	async onFocusChanged(windowId) {
		let activeTabId = await this.getActiveTabId();

		this.setSelectedUrlFileData(activeTabId);
	}

	onActivated(activeInfo) {
		log(activeInfo);
		let { tabId, windowId } = activeInfo;

		this.setSelectedUrlFileData(tabId);
	}

	compareUrls(url1, url2, isIgnoreSearchQuery) {
		if (isIgnoreSearchQuery) {
			url1 = Utils.getAnchor(url1).hrefWithoutSearch;
			url2 = Utils.getAnchor(url2).hrefWithoutSearch;
		}

		return url1.trim() === url2.trim();
	}

	setSelectedUrlFileData(tabId) {
		let previousSelectedUrlFileData = this.selectedUrlFileData;
		this.selectedUrlFileData = this.urlFileDataCache.getUrlFileData(tabId);

		// fire event if 'this.selectedUrlFileData' was changed
		if (previousSelectedUrlFileData !== this.selectedUrlFileData) {
			// log(previousSelectedUrlFileData); log(this.selectedUrlFileData);
			this.notify(
				EVENTS.BACKGROUND.SELECTED_URL_FILE_DATA_HAS_BEEN_SET,
				{ selectedUrlFileData: this.selectedUrlFileData }
			);
		}
	}

	addFileData(tabId, fileData) {
		// if doesn't exist, create and add the fileData
		if (!this.urlFileDataCache.isUrlFileDataExist(tabId)) {
			this.urlFileDataCache.createUrlFileDataByFileData(fileData);
			return;
		}

		let urlFileData = this.urlFileDataCache.getUrlFileData(tabId);

		urlFileData.addFileData(fileData);
	}

	addUrlFileData(tabId, urlFileData, options) {
		this.urlFileDataCache.addUrlFileData(tabId, urlFileData, options);
	}

	async getActiveTabId() {
		let tabArray = await browser.tabs.query({ 
			currentWindow: true, active: true 
		});

		let activeTab = tabArray[0];

		return activeTab.id;
	}

	async isActiveTab(tabId) {
		let activeTabId = await this.getActiveTabId();

		return tabId === activeTabId;
	}
}