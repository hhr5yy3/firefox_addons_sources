var FacebookKeyListener = (function() {
	const MAX_ATTEMPTS = 20;

	class FacebookKeyListener {
		constructor() {
			this.attempts = 0;
		}

		start() {
			return new Promise((resolve, reject) => {
				this.timer = setInterval(() => {
					let keyList = document.getElementsByName("fb_dtsg");

					if (keyList.length > 0) {
						clearInterval(this.timer);
						log("key found");
						resolve();
						return;
					}

					if (this.attempts >= MAX_ATTEMPTS) {
						clearInterval(this.timer);
						reject("FacebookKeyListener.start: failed to find key");
					}
				}, 500);
			});
		}
	}

	return FacebookKeyListener;
})();

var FacebookVideoUrl = (function() {
	const VIDEO_URL_REGEXP = /(^https:\/\/(www\.)?facebook.com)?\/?((.+?)\/videos\/([^\?\/]+)\/*)\??/;

	class FacebookVideoUrl {
		constructor(url = "") {
			this.url = url;
		}

		getVideoUrlDetails() {
			return this.url.match(VIDEO_URL_REGEXP);
		}

		getVideoId() {
			let details = this.getVideoUrlDetails();

			return details ? details[5] : null;
		}

		getPageId() {
			let details = this.getVideoUrlDetails();

			return details ? details[4] : null;
		}

		static isVideoUrl(url) {
			return url && url.match(VIDEO_URL_REGEXP);
		}
	}

	return FacebookVideoUrl;
})();

class FacebookWatchUrl extends WatchUrl {
	constructor() {
		super();
	}

	isWatchUrl(url) {
		return true;
	};

	getVideoIdFromUrl(url) {
		return null;
	}

	isValidVideoIdLength(videoId) {
		return null;
	}
}

const CONFIG = { subtree: true, childList: true };
const MAX_FEED_ATTEMPTS = 20;

class FacebookMutationObserver extends Observer {
	constructor(searchQueries) {
		super();

		this.searchQueries = null;
		this.videoUrls = [];
		this.observerListIndex = 0;
		this.facebookObserverParser = new FacebookObserverParser();
		this.observeEnabled = true;

		this.setSearchQueries(searchQueries);
		this.bindFunctions();
	}

	bindFunctions() {
		this.observeCallback = this.observeCallback.bind(this);
	}

	setSearchQueries(searchQueries = [null]) {
		try {
			if (searchQueries[0] === null) {
				throw new Error("FacebookMutationObserver.setSearchQueries: 'searchQueries' is null");
			}
		} catch(ex) {
			error(ex);
		} finally {
			this.searchQueries = searchQueries;
		}
	}

	getObservedElement() {
		return new Promise((resolve, reject) => {
			let observedElement = this.findElementToObserve();

			if (observedElement) {
				resolve(observedElement);
				return;
			}

			let retryCount = 0;
			let retryInterval = setInterval(() => {
				log("retrying");
				observedElement = this.findElementToObserve();
				if (observedElement) {
					clearInterval(retryInterval);
					resolve(observedElement);
				}
				else if (retryCount >= MAX_FEED_ATTEMPTS) {
					clearInterval(retryInterval);
					reject();
					return;
				}

				retryCount++;
			}, 1000);
		});
	}

	// may be called via the mutation observer or via the "triggerObserver" method
	observeCallback(mutationsList, updateIndex = true) {
		try {
			// log(mutationsList);
	    	let batch = this.getListToIterateOn();
	    	log(batch);
	    	if (batch === null) {
	    		throw new Error("FacebookMutationObserver.observeCallback: 'batch' is null");
	    	}

	    	let nextBatch = this.getNextBatch(batch);
	    	// log(nextBatch);
	    	// for (let item of nextBatch) { if (item.href) console.log(item.href); }

	    	if (updateIndex) {
	    		this.observerListIndex = this.getUpdatedObserverListIndex(nextBatch);
	    	}

	    	this.processBatch(nextBatch);
		} catch(ex) {
			error(ex);
		}
	}

	triggerObserver() {
		this.observeCallback(null, false);
	}

	processBatch(batch) {
    	let videoUrlsFound = this.facebookObserverParser.processBatch(batch);
    	log(videoUrlsFound);
    	let newVideoUrlsFound = this.findNewVideoUrls(videoUrlsFound);
    	if (newVideoUrlsFound.length > 0) {
    		this.updateVideoUrlsFound(videoUrlsFound);
    		log(EVENTS.CONTENT.FACEBOOK_NEW_VIDEO_URLS_FOUND);
    		// notify here of new videos that were found
    		this.notify(
    			EVENTS.CONTENT.FACEBOOK_NEW_VIDEO_URLS_FOUND,
    			{ 
    				videoUrls: [...this.videoUrls],
    				newVideoUrls: newVideoUrlsFound
    			}
    		);
    		// log(newVideoUrlsFound);
    		log(this.videoUrls);
    	}
	}

	async observe() {
		try {
			if (!this.observeEnabled) { return; }
			let observedElement = await this.getObservedElement();
			let observer = new MutationObserver(this.observeCallback);
			observer.observe(observedElement, CONFIG);
		} catch(ex) {
			error(ex);
		}
	}

	findElementToObserve() {
		for (let query of this.searchQueries) {
			let foundElement = document.querySelector(query);

			if (foundElement) {
				return foundElement;
			}
		}

		return null;
	}

	findNewVideoUrls(videoUrls = null) {
		if (videoUrls === null) { 
			return null;
		}

		let videoUrlsSet = new Set(this.videoUrls);
		let newVideoUrls = videoUrls.filter(videoUrl => !videoUrlsSet.has(videoUrl));

		return [...new Set(newVideoUrls)];
	}

	updateVideoUrlsFound(videoUrlsArray) {
		// merges the two arrays and removes duplicates
		let mergedArray = [...new Set([...this.videoUrls, ...videoUrlsArray])];
		this.videoUrls = mergedArray;
		log(this.videoUrls);
	}

	// list - NodeList, HTMLCollection, Array - are all valid
	getNextBatch(list) {
		let array = [...list];
		log(array);
		// log(this.observerListIndex);
		let nextBatchArray = array.slice(this.observerListIndex);
		log(nextBatchArray);

		return nextBatchArray;
	}

	getUpdatedObserverListIndex(nextBatchArray) {
		return this.observerListIndex + nextBatchArray.length;
	}

	// NodeList, HTMLCollection, Array - are all valid
	getListToIterateOn() {
		try {
			throw new Error("FacebookMutationObserver.getListToIterateOn: method not implemented");
		} catch(ex) {
			error(ex);
			return null;
		}
	}

	enableObserve() {
		this.observeEnabled = true;
	}

	disableObserve() {
		this.observeEnabled = false;
	}
}


const TEMPLATE_URL = "https://www.facebook.com/{{page_id}}/videos/{{top_level_post_id}}";
const BATCH_TYPES = {
	ANCHOR_LIST: 1,
	OTHER: 2
};

class FacebookObserverParser {
	constructor() {}

	identifyBatch(batch) {
		try {
			if (batch && 
				batch[0] && 
				batch[0].tagName && 
				batch[0].tagName === "A") {
				return BATCH_TYPES.ANCHOR_LIST;
			}

			return BATCH_TYPES.OTHER;
		} catch(ex) {
			error(ex);
			return null;
		}
	}

	processBatch(batch) {
		let batchType = this.identifyBatch(batch);

		if (batchType === BATCH_TYPES.ANCHOR_LIST) {
			return [...this.extractVideoUrlsFromAnchorList(batch)];
		} else if (batchType === BATCH_TYPES.OTHER) {
			return [...this.extractVideoUrlsFromElementList(batch)];
		}

		return [];	// didn't find anything
	}

	extractVideoUrlsFromAnchorList(anchorList) {
		let videoUrlsFound = [];

		for (let anchor of anchorList) {
			let videoUrl = this.extractVideoUrlFromAnchor(anchor);

			if (videoUrl) {
				videoUrl = this.appendFacebookDomainToPath(videoUrl);
				videoUrlsFound.push(videoUrl);
			}
		}

		return videoUrlsFound;
	}

	extractVideoUrlsFromElementList(elementList) {
		let videoUrlsFound = [];

		for (let element of elementList) {
			let pageIdLookupResults = this.lookupByPageId(element);
			if (pageIdLookupResults) {
				let videoUrl = this.buildUrlFromTemplateUrl(
					pageIdLookupResults.pageId, 
					pageIdLookupResults.topLevelPostId
				);

				log(videoUrl);

				videoUrlsFound.push(videoUrl);
				continue;
			}

			let anchorList = element.querySelectorAll("[href]");
			videoUrlsFound = [
				...videoUrlsFound, 
				...this.extractVideoUrlsFromAnchorList(anchorList)
			];
		}

		return videoUrlsFound;
	}

	isUserContentWithPossibleVideo(userContent) {
		return userContent.getElementsByTagName("video").length > 0;
	}

	extractPageId(href) {
		let result = href.match(/\[page_id\]=(\d+)&/);

		return result ? result[1] : null;
	}

	extractTopLevelPostId(href) {
		let result = href.match(/\[top_level_post_id\]=(\d+)&/);

		return result ? result[1] : null;
	}

	buildUrlFromTemplateUrl(pageId, topLevelPostId) {
		return TEMPLATE_URL
			.replace("{{page_id}}", pageId)
			.replace("{{top_level_post_id}}", topLevelPostId);
	};

	lookupByPageId(userContent) {
		if (!userContent) {
			return null;
		}

		let pageId = this.extractPageId(userContent.innerHTML);
		let topLevelPostId = this.extractTopLevelPostId(userContent.innerHTML);

		return pageId && topLevelPostId ? { pageId, topLevelPostId } : null;
	};

	extractVideoUrlFromAnchor(anchor = {}) {
		if (anchor.href) {
			let result = FacebookVideoUrl.isVideoUrl(anchor.href);

			return result ? result[3] : null;
		}

		return null;
	}

	appendFacebookDomainToPath(path) {
		return `https://www.facebook.com/${path}`;
	};
}

class FacebookVideoUrlsSubscriber extends Observer {
	constructor(observers = []) {
		super();
		
		this.observers = observers;

		this.bindFunctions();
	}

	bindFunctions() {
		this.newVideoUrlsAdded = this.newVideoUrlsAdded.bind(this);
	}

	addObserver(observer) {
		this.observers.push(observer);
	}

	async subscribeForMutationObserver() {
		try {
			let facebookKeyListener = new FacebookKeyListener();
			await facebookKeyListener.start();
			log("key found 2");
			for (let observer of this.observers) {
				observer.subscribe({
					topic: EVENTS.CONTENT.FACEBOOK_NEW_VIDEO_URLS_FOUND,
					callback: this.newVideoUrlsAdded
				});
			}	
		} catch(ex) {
			error(ex);
		}
	}

	observeAllMutationObservers() {
		for (let observer of this.observers) {
			observer.observe();
		}
	}

	// data = { videoUrls, newVideoUrls }
	newVideoUrlsAdded(data) { 
		try {
			throw new Error("FacebookFeedVideoUrlsSubscriber.newVideoUrlsAdded: 'newVideoUrlsAdded' is not implemented");
		} catch(ex) {
			error(ex);
		}
	}
}

const TAHOE_URL_TEMPLATE = "https://www.facebook.com/video/tahoe/async/{{video_id}}/?payloadtype=primary";
const DATA_TYPE = {
	DOCUMENT: 1,
	TAHOE: 2
};

class FacebookVideoDetailsFetcher extends FacebookVideoUrlsSubscriber {
	constructor(params = { observers: [], facebookVideoCache: null }) {
		super(params.observers);

		this.facebookVideoCache = params.facebookVideoCache;

		this.subscribeForMutationObserver();
	}

	fetchRaw(url = null, method = "GET") {
		try {
			let options = { url, method };
			log(options);
			let xhr = new XHR({ mozAnon: false });

			if (!url) {
				throw new Error("FacebookVideoDetailsFetcher.fetchRaw: 'options.url' is null");
			}

			return xhr.send(options);
		} catch(ex) {
			error(ex);
		}
	}

	fetchRawTahoe(url = null, method = "POST") {
		try {
			log(url);
			let options = { method };
			let xhr = new XHR({ mozAnon: false });
			let facebookVideoUrl = new FacebookVideoUrl(url);
			let videoId = facebookVideoUrl.getVideoId();
			let key = this.getTKey();

			if (!url) {
				throw new Error("FacebookVideoDetailsFetcher.fetchRawTahoe: 'options.url' is null");
			}

			if (!videoId) {
				throw new Error("FacebookVideoDetailsFetcher.fetchRawTahoe: 'videoId' is null");
			}

			if (!key) {
				throw new Error("FacebookVideoDetailsFetcher.fetchRawTahoe: 'key' is null");
			}

			let params = {
				"__a": "1",
				"fb_dtsg": key,
				"chain": true,
				"isvideo": true
			};

			options.url = this.getTahoeUrl(videoId);
			log(videoId);
			log(key);
			log(options.url);
			options.params = params;

			return xhr.send(options);
		} catch(ex) {
			error(ex);
		}
	}

	getTKey() {
		try {
			let keyList = document.getElementsByName("fb_dtsg");
			var key = null;

			if (keyList) { key = keyList[0]; }
			if (key) {
				key = key.value;
				if (!this.validateKey(key)) {
					throw new Error("FacebookVideoDetailsFetcher.getTKey: key validation failed; a check should be made");
				}

				return key;
			}

			return null;
		} catch(ex) {
			warn(ex);
			return key;
		}
	}

	validateKey(key) {
		return key.match(/^.{12}:.{12}$/);
	}

	getTahoeUrl(videoId) {
		return TAHOE_URL_TEMPLATE.replace("{{video_id}}", videoId);
	}

	// data = { videoUrls, newVideoUrls }
	async newVideoUrlsAdded(data)	{
		let { videoUrls, newVideoUrls } = data;

		log(newVideoUrls);

		for (let url of newVideoUrls) {
			log(url);
			url = Utils.getAnchor(url).hrefWithoutSearch;	// will remove the search query and any trailing slashes at the end

			let cacheItem = this.lookupInVideoCache(url);
			log(cacheItem);

			if (cacheItem) {
				log("loading from cache!!");
				this.notify(
					EVENTS.CONTENT.FACEBOOK_PARSED_DATA_READY,
					{ videoParamsList: cacheItem.VideoParamsList }
				);

				return;
			}

			let rawDataObject = await this.fetchRawTahoe(url);
			log(rawDataObject);
			this.notify(
	    			EVENTS.CONTENT.FACEBOOK_RAW_DATA_FETCHED,
	    			{ 
	    				rawDataObject,
	    				url,
	    				dataType: DATA_TYPE.TAHOE
	    			}
			);
		}
	}

	lookupInVideoCache(videoUrl) {
		let cacheItem = this.facebookVideoCache.getCacheItemByUrl(videoUrl);

		// update the DocUrl to prevent conflicts when comparing the DocUrl and the URL (as the DocUrl may differ for the same video)
		if (cacheItem) {
			cacheItem.updateVideoParamsDocUrlForAllItems(document.URL);
			this.facebookVideoCache.addCacheItem(cacheItem);

			return cacheItem;
		}

		return null;
	}
}

FacebookVideoDetailsFetcher.DATA_TYPE = DATA_TYPE;

const VIDEO_FILE_LABEL = "{{videoTitle}}";
const VIDEO_FILENAME_LABEL = "{{videoTitle}} [{{quality}}].{{fileExt}}";
const HD_QUALITY_STRING = "HD";
const SD_QUALITY_STRING = "SD";
const UNKNOWN_TITLE = "Unknown Video Name";

const VIDEODATA_REGEXP_LIST = [
	/videoData\s*"?\s*:\s*([\s\S]*),"?minQuality/i // will match either "DOCUMENT" or "TAHOE"
]

const VIDEO_URLS_REGEXP = /FBQualityLabel=\\?"(.*?)\\?".*?(\\u003C|<|x3C)BaseURL>(.*?)(\\u003C|<|x3C)\\?\/BaseURL>/gi // will match either "DOCUMENT" or "TAHOE"

class FacebookParser extends Observer {
	constructor(params = { facebookVideoDetailsFetcher: null, facebookVideoCache: null }) {
		super();

		this.facebookVideoDetailsFetcher = params.facebookVideoDetailsFetcher;
		this.facebookVideoCache = params.facebookVideoCache;

		this.bindFunctions();
		this.subscribeForVideoDetailsFetcherObserver();
	}

	bindFunctions() {
		this.getParsedData = this.getParsedData.bind(this);
	}

	// "facebookVideoDetailsFetcher" - is also a "Observer"
	subscribeForVideoDetailsFetcherObserver() {
		this.facebookVideoDetailsFetcher.subscribe({
			topic: EVENTS.CONTENT.FACEBOOK_RAW_DATA_FETCHED,
			callback: data => this.getParsedData(data)
		});
	}

	async getParsedData(data) {
		try {
			let rawVideoData = data.rawDataObject.responseText;
			let { dataType, url } = data;	// url - the video url - example: https://www.facebook.com/netflix/videos/477718375992845/
			
			log(rawVideoData);
			log(dataType);

			let videoData = this.parseVideoDataObjectAsStringWithRegExp(rawVideoData);
			log(videoData);
			let videoUrls = this.getVideoUrlsFromVideoData(videoData);
			let videoUrlsSdHd = this.getSdHdVideoUrlsFromVideoData(videoData);
			let videoDataArray = [...videoUrls, ...videoUrlsSdHd];
			log(videoDataArray);
			let title = null;

			if (dataType === FacebookVideoDetailsFetcher.DATA_TYPE.TAHOE) {
				let xhr = await this.facebookVideoDetailsFetcher.fetchRaw(url);
				let rawVideoDataVideoPage = xhr.response;
				log(xhr);
				title = this.getTitle(rawVideoDataVideoPage);
			} else {
				let title = this.getTitle(rawVideoData);
				log(title);
			}

			if (videoDataArray.length === 0) {
				throw new Error("FacebookParser.getParsedData: 'videoDataArray' is empty");
			}

			let videoParamsList = this.getVideoParamsList(videoDataArray, title);
			videoParamsList.sort();
			log(videoParamsList);

			let facebookCacheItem = new FacebookCacheItem(url, videoParamsList);
			this.facebookVideoCache.addCacheItem(facebookCacheItem);

			this.notify(
				EVENTS.CONTENT.FACEBOOK_PARSED_DATA_READY,
				{ videoParamsList }
			);
		} catch(ex) {
			error(ex);

		}
	}

	getVideoParamsList(videoDataArray, title) {
		let videoFilenameLabel = FileLabel.getDesignatedVideoFilenameLabel();
		let fileLabel = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);
		let popupLabelFormat = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);	// to be displayed in the popup
		let downloadWindowFilenameFormat = new FileLabel(videoFilenameLabel, FileData.CATEGORY.VIDEO);	// to be saved/downloaded - the actual filename
		let videoParamsList = new FacebookVideoParamsList();

		for (let videoData of videoDataArray) {
			videoParamsList.push(new VideoParams({
				url 			: videoData.url,
				fileType 		: "mp4",
				contentType		: "mp4",
				quality 		: videoData.quality,
				docTitle 		: title,
				docDomain 		: document.domain,
				docUrl 			: document.URL,
				contentLength 	: 0,
				category 		: FileData.CATEGORY.VIDEO,
				popupLabelFormatString : popupLabelFormat.toString(),
				downloadWindowFilenameFormatString: downloadWindowFilenameFormat.toString()	// converts it to a format string
			}).JSONParse());
		}

		return videoParamsList.Length > 0 ? videoParamsList : false;		
	}

	parseVideoDataObjectAsStringWithRegExp(rawVideoData) {
		try {
			log(rawVideoData);
			for (let regExp of VIDEODATA_REGEXP_LIST) {
				let matched = rawVideoData.match(regExp);

				if (matched && matched[1]) {
					return matched[1];
				}
			}

			throw new Error("FacebookParser.parseVideoDataObjectWithRegExp: Regular expression failed");
		} catch(ex) {
			error(ex);
			return null;
		}
	}

	parseVideoDataObjectAsString(data) {
		let startToken = "[";
		let endToken = "]";
		let index = 0;
		let flag = 0;
		let json = "";

		while (index < data.length) {
			if (data[index] === "[") {
				flag++;
			} else if (data[index] === "]") {
				flag--;
			}
			json += data[index];
			index++;

			if (flag === 0) {
				break;
			}
		}

		return json;
	}

	getVideoUrlsFromVideoData(videoData) {
		try {
			log({videoData});
			// let regExp = /FBQualityLabel=\\\"(.*?)\\\".*?\\x3CBaseURL>(.*?)\\x3C\/BaseURL>/gi;
			let result = null;
			let videoUrls = [];

			// this regular expression works for TAHOE, but should be tested for DOCUMENT type also
			while ((result = VIDEO_URLS_REGEXP.exec(videoData)) !== null) {
				log(result);
				let decodedUrl = Utils.decodeUnicodeAndEscapedString(result[3]);
				decodedUrl = Utils.decodeString(decodedUrl);
				videoUrls.push({
					quality: result[1],
					url: decodedUrl
				});
			}

			log(videoUrls);
			// if (videoUrls.length === 0) {
			// 	throw new Error("FacebookParser.getVideoUrlsFromVideoData: Regular expression failed");
			// }

			return videoUrls;
		} catch(ex) {
			error(ex);
		}
	}

	getSdHdVideoUrlsFromVideoData(videoData) {
		try {
			let videoUrls = [];

			if (!videoData) {
				throw new Error("FacebookParser.getSdHdVideoUrlsFromVideoData: 'videoData' is null");
			}

			let regExpSd = new RegExp(/sd_src\s*"?:\s*"(.*?)"/);
			let regExpHd = new RegExp(/hd_src\s*"?:\s*"(.*?)"/);

			let sd = regExpSd.exec(videoData);
			let hd = regExpHd.exec(videoData);

			if (sd) {
				videoUrls.push({
					quality: SD_QUALITY_STRING,
					url: Utils.decodeUnicodeAndEscapedString(sd[1])
				});
			}

			if (hd) {
				videoUrls.push({
					quality: HD_QUALITY_STRING,
					url: Utils.decodeUnicodeAndEscapedString(hd[1])
				});
			}	

			return videoUrls;
		} catch(ex) {
			error(ex);
			return [];
		}
	}

	getTitle(rawVideoData) {
		try {
			let matched = rawVideoData.match(/<\s*title.*?>([\s\S]*)<\/\s*title\s*>/);
			if (!matched) { return UNKNOWN_TITLE; }

			let title = matched[1].replace(/\n/, "");

			return Utils.decodeString(title);		
		} catch(ex) {
			error(ex);
		}
	}
}