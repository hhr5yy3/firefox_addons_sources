log("%c" + "content dailymotion", "color: yellow");
log("%c" + "content facebook", "color: yellow");
log("%c" + "content vimeo", "color: yellow");
log("%c" + "content youtube", "color: yellow");

class ContentDailymotion {
	constructor() {
		if (!Utils.isHostDailymotion({ host: window.location.hostname })) { 
			log("no dailymotion");
			return;
		}

		log("is dailymotion");

		this.contentMessageManager = new ContentMessageManager();
		this.onDOMContentLoadedDeferred = new Deferred();
		this.watchUrl = new DailymotionWatchUrl();
		this.tabUpdatedMessageListener = new MessageListener();

		this.setMessageListeners();
		this.sendConnectionCheckMessage();

		this.addEventListeners();
		this.setTabUpdatedMessageListener();
		this.getMediaFiles(document.URL);
	}

	addEventListeners() {
		document.addEventListener(
			"DOMContentLoaded", 
			this.onDOMContentLoaded.bind(this)
		);
	}

	setTabUpdatedMessageListener() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.TAB_UPDATED,
				this.tabUpdatedMessageListener
			);

		this.tabUpdatedMessageListener.onMessage = messageObject => {
			let { message, payload } = messageObject;
			this.getMediaFiles(payload.url);
		};
	}

	onDOMContentLoaded(event) {
		this.onDOMContentLoadedDeferred.resolve(event);
	}

	sendConnectionCheckMessage() {
		this.contentMessageManager.postMessage({
			message: CONNECTIONS.CONTENT.CONNECTION_CHECK
		});
	}

	setMessageListeners() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				CONNECTIONS.BACKGROUND.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);
	}

	async getMediaFiles(url) { 
		try {
			if (!this.watchUrl.isNewWatchUrl(url)) { return; }
			this.watchUrl.PrevWatchUrl = url;
			if (!this.watchUrl.isWatchUrl(url)) { return; }

			let videoId = this.watchUrl.getVideoIdFromUrl(url);
			let videoDetailsFetcher = new DailymotionVideoDetailsFetcher(videoId);
			let rawData = await videoDetailsFetcher.fetchRaw();

			let dailymotionParser = new DailymotionParser();
			let parsedData = await dailymotionParser.getParsedData(rawData.response);
			let { videoParamsList } = parsedData;
			log(videoParamsList);

			this.contentMessageManager.postMessage({
				message: MESSAGES.CONTENT.DAILYMOTION_VIDEO_DATA_LIST,
				payload: videoParamsList
			});
		} catch(ex) {
			error(ex);
		}
	}
}

class ContentFacebook {
	constructor() {
		if (!Utils.isHostFacebook({ host: window.location.hostname })) { 
			log("no facebook");
			return;
		}

		log("is facebook");

		this.contentMessageManager = new ContentMessageManager();
		this.onDOMContentLoadedDeferred = new Deferred();
		this.watchUrl = new FacebookWatchUrl();
		this.tabUpdatedMessageListener = new MessageListener();
		this.facebookVideoCache = new FacebookVideoCache();

		// this.facebookAnchorsListMutationObserver = new FacebookAnchorsListMutationObserver();
		// this.facebookAnchorsListMutationObserver.disableObserve();	// will be triggered manually

		this.facebookVideoDetailsFetcher = new FacebookVideoDetailsFetcher({
			observers: [
				new FacebookUserContentMutationObserver()
				// new FacebookVideosElementMutationObserver(),
				// this.facebookAnchorsListMutationObserver
			],
			facebookVideoCache: this.facebookVideoCache
		});

		this.facebookParser = new FacebookParser({
			facebookVideoDetailsFetcher: this.facebookVideoDetailsFetcher,
			facebookVideoCache: this.facebookVideoCache
		});

		this.facebookParser.subscribe({
			topic: EVENTS.CONTENT.FACEBOOK_PARSED_DATA_READY,
			callback: data => {
				log(data);
				this.contentMessageManager.postMessage({
					message: MESSAGES.CONTENT.FACEBOOK_VIDEO_DATA_LIST,
					payload: data.videoParamsList.List
				});
			}
		});

		this.facebookVideoDetailsFetcher.subscribe({
			topic: EVENTS.CONTENT.FACEBOOK_PARSED_DATA_READY,
			callback: data => {
				log(data);
				this.contentMessageManager.postMessage({
					message: MESSAGES.CONTENT.FACEBOOK_VIDEO_DATA_LIST,
					payload: data.videoParamsList.List
				});
			}
		});		

		this.setMessageListeners();
		this.sendConnectionCheckMessage();

		this.addEventListeners();
		this.setTabUpdatedMessageListener();
		this.getMediaFiles(document.URL);
	}

	addEventListeners() {
		document.addEventListener(
			"DOMContentLoaded", 
			this.onDOMContentLoaded.bind(this)
		);
	}

	setTabUpdatedMessageListener() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.TAB_UPDATED,
				this.tabUpdatedMessageListener
			);

		this.tabUpdatedMessageListener.onMessage = messageObject => {
			let { message, payload } = messageObject;
			this.getMediaFiles(payload.url);
		};
	}

	onDOMContentLoaded(event) {
		this.onDOMContentLoadedDeferred.resolve(event);
	}

	sendConnectionCheckMessage() {
		this.contentMessageManager.postMessage({
			message: CONNECTIONS.CONTENT.CONNECTION_CHECK
		});
	}

	setMessageListeners() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				CONNECTIONS.BACKGROUND.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);
	}

	async getMediaFiles(url) { 
		try {
			if (!this.watchUrl.isNewWatchUrl(url)) { return; }
			this.watchUrl.PrevWatchUrl = url;
			// if (!this.watchUrl.isWatchUrl(url)) { return; }
			log("watch url");

			await this.onDOMContentLoadedDeferred;

			if (FacebookVideoUrl.isVideoUrl(url)) {
				let facebookKeyListener = new FacebookKeyListener();
				facebookKeyListener.start().then(() => {
					this.facebookVideoDetailsFetcher.newVideoUrlsAdded({ newVideoUrls: [url] });
				});
			} else {
				this.facebookVideoDetailsFetcher.observeAllMutationObservers();
				// this.facebookAnchorsListMutationObserver.triggerObserver();
			}
			// });
		} catch(ex) {
			error(ex);
		}
	}
}

class ContentVimeo {
	constructor() {
		if (!Utils.isHostVimeo({ host: window.location.hostname })) { 
			log("no vimeo");
			return;
		}

		log("is vimeo");

		this.contentMessageManager = new ContentMessageManager();
		this.onDOMContentLoadedDeferred = new Deferred();
		this.watchUrl = new VimeoWatchUrl();
		this.tabUpdatedMessageListener = new MessageListener();

		this.setMessageListeners();
		this.sendConnectionCheckMessage();

		this.addEventListeners();
		this.setTabUpdatedMessageListener();
		this.getMediaFiles(document.URL);
	}

	addEventListeners() {
		document.addEventListener(
			"DOMContentLoaded", 
			this.onDOMContentLoaded.bind(this)
		);
	}

	setTabUpdatedMessageListener() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.TAB_UPDATED,
				this.tabUpdatedMessageListener
			);

		this.tabUpdatedMessageListener.onMessage = messageObject => {
			let { message, payload } = messageObject;
			this.getMediaFiles(payload.url);
		};
	}

	onDOMContentLoaded(event) {
		this.onDOMContentLoadedDeferred.resolve(event);
	}

	sendConnectionCheckMessage() {
		this.contentMessageManager.postMessage({
			message: CONNECTIONS.CONTENT.CONNECTION_CHECK
		});
	}

	setMessageListeners() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				CONNECTIONS.BACKGROUND.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);
	}

	async getMediaFiles(url) { 
		try {
			if (!this.watchUrl.isNewWatchUrl(url)) { return; }
			this.watchUrl.PrevWatchUrl = url;
			if (!this.watchUrl.isWatchUrl(url)) { return; }

			let videoId = this.watchUrl.getVideoIdFromUrl(url);
			// log(videoId);
			let videoDetailsFetcher = new VimeoVideoDetailsFetcher(videoId);
			let rawData = await videoDetailsFetcher.fetchRaw();
			// log(rawData);
			let vimeoParser = new VimeoParser();
			// log(vimeoParser.getTitle(rawData));
			let parsedData = vimeoParser.getParsedData(rawData);
			let { videoParamsList } = parsedData;
			// log(videoParamsList);

			this.contentMessageManager.postMessage({
				message: MESSAGES.CONTENT.VIMEO_VIDEO_DATA_LIST,
				payload: videoParamsList
			});
		} catch(ex) {
			error(ex);
		}
	}
}

class ContentYouTube {
	constructor() {
		if (!Utils.isHostYouTube({ host: window.location.hostname })) { 
			log("no youtube");
			return;
		}

		this.contentMessageManager = new ContentMessageManager();
		this.onDOMContentLoadedDeferred = new Deferred();
		this.watchUrl = new YouTubeWatchUrl();
		this.decrypter = new Decrypter();
		this.tabUpdatedMessageListener = new MessageListener();
		this.youTubeDecResponseMessageListener = new YouTubeDecResponseMessageListener();

		this.sendConnectionCheckMessage();
		this.setMessageListeners();

		this.addEventListeners();
		this.setTabUpdatedMessageListener();
		this.getMediaFiles(document.URL);
	}

	addEventListeners() {
		document.addEventListener(
			"DOMContentLoaded", 
			this.onDOMContentLoaded.bind(this)
		);
	}

	setTabUpdatedMessageListener() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.TAB_UPDATED,
				this.tabUpdatedMessageListener
			);

		this.tabUpdatedMessageListener.onMessage = messageObject => {
			let { message, payload } = messageObject;
			this.getMediaFiles(payload.url);
		};
	}

	onDOMContentLoaded(event) {
		this.onDOMContentLoadedDeferred.resolve(event);
	}

	sendConnectionCheckMessage() {
		this.contentMessageManager.postMessage({
			message: CONNECTIONS.CONTENT.CONNECTION_CHECK
		});
	}

	setMessageListeners() {
		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				CONNECTIONS.BACKGROUND.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);

		this.contentMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.YOUTUBE_DEC_RESPONSE,
				this.youTubeDecResponseMessageListener			
			);
	}

	async getMediaFiles(url) {
		try {
			log(url);
			log("getMediaFiles");
			if (!this.watchUrl.isNewWatchUrl(url)) { return; }
			this.watchUrl.PrevWatchUrl = url;
			if (!this.watchUrl.isWatchUrl(url)) { return; }

			let videoId = this.watchUrl.getVideoIdFromUrl(url);
			
			await this.onDOMContentLoadedDeferred;

			let videoDetailsUrlFetcher = new VideoDetailsUrlFetcher(videoId, url);
			// let rawData = await videoDetailsUrlFetcher.fetchRawGetVidInfo();
			// log(rawData);
			let rawDataFetchRaw = await videoDetailsUrlFetcher.fetchRaw();
			log(rawDataFetchRaw);
			let youTubeParser = new YouTubeParser(url);
			let parsedData = await youTubeParser.getParsedData(rawDataFetchRaw.response);
			let watchDocument = null;

			if (!parsedData) {
				let fetchDocumentResponse = await videoDetailsUrlFetcher.fetchRaw();
				watchDocument = fetchDocumentResponse.response;
				parsedData = youTubeParser.getParsedDataFromWatchDocument(watchDocument, rawDataFetchRaw.response);
			}
			
			let { playerJSUrl, videoParamsList } = parsedData;
			log(videoParamsList.extractSigBatchArray());

			this.contentMessageManager.postMessage({
				message: MESSAGES.CONTENT.YOUTUBE_DEC_REQUEST,
				payload: { playerJSUrl }
			});

			let youTubeDecResponse = await this.youTubeDecResponseMessageListener.getDeferred();
			let { decrypter, isNewDecrypter } = youTubeDecResponse;
			log(youTubeDecResponse);

			if (videoParamsList.IsSigDecRequired) {
				log("sig required");
				if (this.isNewDecrypter || !this.decrypter.isReady()) {
					this.decrypter.import(decrypter);
				}
				log(this.decrypter);
				// await this.onDOMContentLoadedDeferred;

				// await this.youTubeSandboxCreator.create(decrypter, isNewDecrypter);
				log(videoParamsList.extractSigBatchArray());

				// let decryptedSigBatchArray = this.youTubeSandboxCreator
				// 		.decryptBatch(videoParamsList.extractSigBatchArray());
				let decryptedSigBatchArray = this.decrypter
					.decryptBatch(videoParamsList.extractSigBatchArray());
				log(videoParamsList.updateSigs(decryptedSigBatchArray));
				videoParamsList.appendSigsToUrls();
				log(decryptedSigBatchArray);
			}

			log(parsedData);
			// let videoParamsList = parsedData.videoParamsList;
			log(videoParamsList);
			videoParamsList.decodeUrls();
			videoParamsList.logUrls();

			this.contentMessageManager.postMessage({
				message: MESSAGES.CONTENT.YOUTUBE_VIDEO_DATA_LIST,
				payload: videoParamsList.List
			});

		} catch(ex) {
			error(ex);
		}
	}
}


function createContent() {
	var contentYouTube = new ContentYouTube();
	var contentVimeo = new ContentVimeo();
	var contentFacebook = new ContentFacebook();
	var contentDailymotion = new ContentDailymotion();
}

createContent();