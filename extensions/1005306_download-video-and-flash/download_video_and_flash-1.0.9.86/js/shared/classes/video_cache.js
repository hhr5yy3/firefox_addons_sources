var VideoCache = (function() {
	const CACHE_CLEAN_UP_DAYS_INTERVAL = 5;
	const STORAGE_AREA = "local";
	const LIMITS = {
		MAX_CACHE_ITEMS: 120,
		MAX_SIZE: 600000,
		NUM_OF_CACHE_ITEMS_TO_CLEAN_UP: 20
	};

	class VideoCache {
		constructor(params = { cache: {}, storageKey: null }) {
			this.enabled = true;	// will only enable/disable getting data from the cache - storing will occur anyways
			this.cache = params.cache || {};
			this.storageKey = params.storageKey || null;
			this.syncWithLocalStorage = params.storageKey ? true : false;
			this.nextCacheCleanUpTime = this.getNextCacheCleanUpTime();

			this.bindFunctions();
			this.loadStorageCache();
		}

		get NumOfCacheItems() {
			return Object.keys(this.cache).length;
		}

		get SizeOfCache() {
			return JSON.stringify(this.cache).length;
		}

		setEnabledCache(value) {
			this.enabled = value;
		}

		bindFunctions() {
			this.onStorageCacheChanged = this.onStorageCacheChanged.bind(this);
		}

		// will override "this.cache" if a cache is loaded from the storage
		async loadStorageCache() {
			try {
				if (this.syncWithLocalStorage) {
					let storage = await browser.storage.local.get();
					let storageVideoCache = storage[this.storageKey];
					
					if (storageVideoCache) {
						this.parse(storageVideoCache.cache);
						log(storageVideoCache.nextCacheCleanUpTime);
						this.nextCacheCleanUpTime = storageVideoCache.nextCacheCleanUpTime;
					} else {
						this.updateStorageCache();	// init the storage
					}

					if (this.isTimeToCleanUpCache()) {
						this.resetStorageCache();
					}

					this.listenToStoragCacheChanges();
				}
			} catch(ex) {
				error(ex);
				this.cache = {};
			}
		}

		listenToStoragCacheChanges() {
			browser.storage.onChanged.addListener(this.onStorageCacheChanged);
		}

		attemptToCleanUpExceededCacheItems() {
			if (this.hasExceededLimit()) {
				this.cleanUpExceededCacheItems();

				return true;
			}

			return false;
		}

		hasExceededLimit() {
			return this.NumOfCacheItems >= LIMITS.MAX_CACHE_ITEMS
				|| this.SizeOfCache >= LIMITS.MAX_SIZE;
		}

		cleanUpExceededCacheItems() {
			let numOfCacheItemsTarget = 
				this.NumOfCacheItems - LIMITS.NUM_OF_CACHE_ITEMS_TO_CLEAN_UP;

			while (numOfCacheItemsTarget < this.NumOfCacheItems &&
				this.NumOfCacheItems > 0) {
				let cacheItem = this.getCacheItemByIndex(0);

				this.removeCacheItem(cacheItem, { 
					isAttemptResetStorageCache: false,
					isUpdateStorageCache: false
				});
			}

			this.updateStorageCache();
		}

		onStorageCacheChanged(changes, area) {
			if (area !== STORAGE_AREA) { return; }

			if (changes[this.storageKey]) {
				log("storage changed - VideoCache");
				log(changes[this.storageKey]);
				this.loadStorageCache();
			}
		}

		resetStorageCache() {
			log("reset storage cache!");
			this.resetCache();
			this.updateStorageCache();
			this.nextCacheCleanUpTime = this.getNextCacheCleanUpTime();
		}

		resetCache() {
			this.cache = {};
		}

		isTimeToCleanUpCache() {
			return !this.nextCacheCleanUpTime || Date.now() >= this.nextCacheCleanUpTime;
		}

		attemptResetStorageCache() {
			if (this.isTimeToCleanUpCache()) { 
				this.resetStorageCache();

				return true;
			}

			return false;
		}	

		getNextCacheCleanUpTime() {
			return Date.now() + (1000 * 60 * 60 * 24 * CACHE_CLEAN_UP_DAYS_INTERVAL);
		}

		updateStorageCache(cache = this.cache) {
			try {
				let localStorageObject = {}
				localStorageObject[this.storageKey] = {};
				localStorageObject[this.storageKey].cache = cache;
				localStorageObject[this.storageKey].nextCacheCleanUpTime = this.getNextCacheCleanUpTime();

				log(localStorageObject);
				return browser.storage.local.set(localStorageObject);
			} catch(ex) {
				error(ex);
			}
		}

		addCacheItem(cacheItem, ignoreSyncWithLocalStorage = false) {
			try {
				this.attemptResetStorageCache();
				this.attemptToCleanUpExceededCacheItems();

				let url = cacheItem.Url;

				if (!url) { 
					throw new Error("VideoCache.addCacheItem: 'url' is null");
				}

				this.cache[url] = cacheItem;

				if (this.syncWithLocalStorage && !ignoreSyncWithLocalStorage) {
					log(57);
					this.updateStorageCache();
				}
			} catch(ex) {
				error(ex);
			}
		}

		getCacheItemByUrl(url) {
			if (!this.enabled) { return null; }

			this.attemptResetStorageCache();

			url = CacheItem.cleanUrl(url);

			if (this.cache.hasOwnProperty(url) 
				&& this.cache[url] instanceof CacheItem) {
				return this.cache[url];
			}

			return null;
		}

		getCacheItemByIndex(index) {
			if (!this.enabled) { return null; }

			let keysArray = Object.keys(this.cache);

			return keysArray[index] ? 
				this.getCacheItemByUrl(keysArray[index]) : null;
		}

		removeCacheItemByUrl(url, options = { 
				isAttemptResetStorageCache: true,
				isUpdateStorageCache: true
			}) {
			if (options.isAttemptResetStorageCache && this.attemptResetStorageCache()) { return; }

			let cacheItem = this.getCacheItemByUrl(url);

			this.removeCacheItem(cacheItem, options);
		}

		removeCacheItem(cacheItem, options = { 
				isAttemptResetStorageCache: true,
				isUpdateStorageCache: true
			}) {
			if (options.isAttemptResetStorageCache && this.attemptResetStorageCache()) { return; }

			if (cacheItem && cacheItem instanceof CacheItem) {
				delete this.cache[cacheItem.Url];

				if (options.isUpdateStorageCache && this.syncWithLocalStorage) {
					this.updateStorageCache();
				}
			}
		}

		parse(storageCache = {}) {
			this.resetCache();

			for (let key in storageCache) {
				let cacheItemParsed = storageCache[key];
				let { url, videoParamsList } = cacheItemParsed;
				let ignoreSyncWithLocalStorage = true;
				
				this.addCacheItem(new CacheItem(url, videoParamsList), ignoreSyncWithLocalStorage);
			}
		}
	}

	return VideoCache;
})();


var CacheItem = (function() {
	class CacheItem {
		constructor(url = null, videoParamsList = null) {
			try {
				log(url);
				this.url = CacheItem.cleanUrl(url);
				this.videoParamsList = this.createVideoParamsList(videoParamsList);
				log(videoParamsList);
				log(this.videoParamsList);

				if (!this.videoParamsList) {
					throw new Error("CacheItem.constructor: videoParamsList is 'null'");
				}
			} catch(ex) {
				error(ex);
			}
		}

		createVideoParamsList(videoParamsList) {
			return videoParamsList instanceof VideoParamsList ?
				videoParamsList : new VideoParamsList(videoParamsList.list);
		}

		get Url() {
			return this.url;
		}

		get VideoParamsList() {
			return this.videoParamsList;
		}

		updateVideoParamsDocUrlForAllItems(docUrl) {
			this.VideoParamsList.setListPropertyForAllItems("docUrl", docUrl);
		}

		static cleanUrl(url) {
			url = url.trim();
			url = url.replace(/\/$/, "");

			return url;
		}
	}

	return CacheItem;
})();


var FacebookCacheItem = (function() {
	const MS = 1000;
	const EXPIRY_DATE_PARAM = "oe";
	const EXPIRY_REFRESH_TIME_REDUCER = 1000 * 60 * 20; // 20 mins

	class FacebookCacheItem extends CacheItem {
		constructor(url, videoParamsList) {
			log(videoParamsList);
			super(url, videoParamsList);

			this.expiryTimestamp = this.getExpiryTimestamp();
		}

		createVideoParamsList(videoParamsList) {
			return videoParamsList instanceof FacebookVideoParamsList ?
				videoParamsList : new FacebookVideoParamsList(videoParamsList.list);
		}

		getExpiryListFromVideoParamsList() {
			try {
				var expiryArray = [];

				for (let key in this.videoParamsList.List) {
					let videoParams = this.videoParamsList.List[key];

					let expiryTimestamp = this.getExpiryTimestampParamFromUrl(videoParams.url);
					if (!expiryTimestamp) {
						throw new Error("FacebookCacheItem.getExpiryListFromVideoParamsList: 'failed to get \"expiry timestamp\"'");
					}

					expiryArray.push(expiryTimestamp);
				}
			} catch(ex) {
				error(ex);
			} finally {
				return expiryArray;
			}
		}

		getExpiryTimestamp() {
			let expiryList = this.getExpiryListFromVideoParamsList();
			let minExpiry = Utils.minHex(expiryList);

			minExpiry = this.convertHexExpiryTimestampToDecimal(minExpiry);

			return this.convertExpiryDateToMilliseconds(minExpiry);
		}

		getExpiryTimestampParamFromUrl(url) {
			let searchParams = Utils.getUrlSearchParams(url);

			for (let param of searchParams) {
				let keyValueParam = param.split("=");

				if (keyValueParam[0] === EXPIRY_DATE_PARAM) {
					return keyValueParam[1];
				}
			}

			return null;
		}

		convertHexExpiryTimestampToDecimal(hexExpiryTimestamp) {
			return parseInt(hexExpiryTimestamp, 16);
		}

		convertExpiryDateToMilliseconds(expiryTimestamp) {
			return expiryTimestamp * MS;
		}

		hasExpired() {
			if (!this.expiryTimestamp) {
				return true;
			}

			return Date.now() >= this.expiryTimestamp - EXPIRY_REFRESH_TIME_REDUCER;
		}
	}

	return FacebookCacheItem;
})();


var FacebookVideoCache = (function() {
	const FACEBOOK_VIDEO_CACHE_STORAGE_KEY = "fbVideoCache";
	const FACEBOOK_CACHE_ENABLED = true;
	const CLEAN_UP_TIMER_INTERVAL = 1000 * 60 * 60; 	// 1 hour
	
	class FacebookVideoCache extends VideoCache {
		constructor() {
			super({ cache: {}, storageKey: FACEBOOK_VIDEO_CACHE_STORAGE_KEY });

			this.setEnabledCache(FACEBOOK_CACHE_ENABLED);

			this.cleanUpTimer = null;
			setTimeout(()=>{	// a temp work around
				this.cleanUp();
			}, 2000);
			this.startCleanUpTimer();
		}

		cleanUp() {
			let hasItemRemoved = false;

			for (let key in this.cache) {
				let cacheItem = this.cache[key];
				log(cacheItem.hasExpired(), cacheItem);
				if (cacheItem.hasExpired()) {
					this.removeCacheItem(cacheItem);
					hasItemRemoved = true;
				}
			}

			if (hasItemRemoved && this.syncWithLocalStorage) {
				this.updateStorageCache();
				return true;
			}

			return false;
		}

		startCleanUpTimer() {
			this.cleanUpTimer = setInterval(
				this.cleanUp.bind(this), 
				CLEAN_UP_TIMER_INTERVAL
			);
		}

		stopCleanUpTimer() {
			if (this.cleanUpTimer) {
				clearInterval(this.cleanUpTimer);
			}
		}

		removeExpiredCacheItem(cacheItem) {
			if (!cacheItem || !cacheItem.hasExpired()) { 
				return false; 
			}

			this.removeCacheItem(cacheItem);

			return true;
		}

		getCacheItemByUrl(url) {
			let cacheItem = super.getCacheItemByUrl(url);

			if (this.removeExpiredCacheItem(cacheItem)) {
				return null;
			}

			return cacheItem;
		}

		getCacheItemByIndex(index) {
			let cacheItem = super.getCacheItemByIndex(index);

			if (this.removeExpiredCacheItem(cacheItem)) {
				return null;
			}

			return cacheItem;
		}

		parse(storageCache = {}) {
			log("266");
			this.resetCache();

			log(153);
			for (let key in storageCache) {
				let facebookCacheItemParsed = storageCache[key];
				let { url, videoParamsList } = facebookCacheItemParsed;
				let ignoreSyncWithLocalStorage = true;
				log(facebookCacheItemParsed);
				this.addCacheItem(new FacebookCacheItem(url, videoParamsList), ignoreSyncWithLocalStorage);
			}
		}
	}

	return FacebookVideoCache;
})();