log("%c" + "main", "color: yellow");

class Main {
	constructor() {
		this.versionUpdateTasks = new VersionUpdateTasks();
		this.backgroundMessageManager = new BackgroundMessageManager();
		this.youTubeDec = new YouTubeDec();
		this.urlFileDataCacheManager = new UrlFileDataCacheManager();
		this.tabsListener = new TabsListener(this.backgroundMessageManager);
		this.popupUpdater = new PopupUpdater(this.backgroundMessageManager, this.urlFileDataCacheManager);
		this.networkNotifier = new NetworkNotifier();
		this.videoParamsListMessageListener = new VideoParamsListMessageListener();

		this.setMessageListeners();
		this.setMessageListenerCallbacks();
		this.subscribeForEvents();
		this.networkNotifier.startListening();
	}

	getObserverList() {
		let simpleObserverList = {};

		for (let propName in this) {
			if (this.hasOwnProperty(propName)) {
				let prop = this[propName];
				if (prop instanceof Observer) {
					simpleObserverList[propName] = prop;
				}
			}
		}

		// adding manually
		simpleObserverList.backgroundPortManager = 
			this.backgroundMessageManager.BackgroundPortManager;

		return simpleObserverList;
	}

	setMessageListeners() {
		// content script messages
		this.backgroundMessageManager
			.contentScriptMessageListenerManager
			.addMessageListener(
				CONNECTIONS.CONTENT.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);

		this.backgroundMessageManager
			.contentScriptMessageListenerManager
			.addMessageListener(
				MESSAGES.CONTENT.YOUTUBE_DEC_REQUEST,
				new YouTubeDecRequestMessageListener(this.youTubeDec)
			);

		this.backgroundMessageManager
			.contentScriptMessageListenerManager
			.addMessageListener(
				MESSAGES.CONTENT.YOUTUBE_VIDEO_DATA_LIST,
				this.videoParamsListMessageListener
			);

		this.backgroundMessageManager
			.contentScriptMessageListenerManager
			.addMessageListener(
				MESSAGES.CONTENT.DAILYMOTION_VIDEO_DATA_LIST,
				this.videoParamsListMessageListener
			);

		this.backgroundMessageManager
			.contentScriptMessageListenerManager
			.addMessageListener(
				MESSAGES.CONTENT.VIMEO_VIDEO_DATA_LIST,
				this.videoParamsListMessageListener
			);

		this.backgroundMessageManager
			.contentScriptMessageListenerManager
			.addMessageListener(
				MESSAGES.CONTENT.FACEBOOK_VIDEO_DATA_LIST,
				this.videoParamsListMessageListener
			);

		// popup messages
		this.backgroundMessageManager
			.popupMessageListenerManager
			.addMessageListener(
				CONNECTIONS.POPUP.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);
	}

	// while essentially serves similar purposes as the message listeners, these events
	// are not triggred by a message coming from the popup or the content script, they
	// are rather triggered by an internal event happening in the background
	// (for example, when the popup is ready to receive messages)
	subscribeForEvents() {
		this.tabsListener.subscribe({
			topic: EVENTS.BACKGROUND.NEW_NAVIGATION,
			callback: async eventObject => {
				let { tabId } = eventObject;
				let hasSelectedUrlFileDataCleared = 
					await this.urlFileDataCacheManager.cacheClearUrlFileData(tabId);
				
				if (hasSelectedUrlFileDataCleared) {
					this.popupUpdater.updatePopup(null);
				}
			}
		});

		// when the popup is opened, it gets the "selectedUrlFileData"
		this.backgroundMessageManager
			.BackgroundPortManager.subscribe({
				topic: EVENTS.BACKGROUND.POPUP_READY_TO_RECEIVE_MESSAGES,
				callback: eventObject => {
					this.popupUpdater.updatePopup(this.urlFileDataCacheManager.SelectedUrlFileData);
				}
			});

		// if the popup is open and navigation occurs while it's still open (rare case)
		this.urlFileDataCacheManager.subscribe({
			topic: EVENTS.BACKGROUND.SELECTED_URL_FILE_DATA_HAS_BEEN_SET,
			callback: eventObject => {
				log("SELECTED_URL_FILE_DATA_HAS_BEEN_SET");
				let { selectedUrlFileData } = eventObject;

				this.popupUpdater.updatePopup(selectedUrlFileData);
			}
		});

		this.networkNotifier.subscribe({
			topic: EVENTS.BACKGROUND.FILE_DATA_CREATED,
			callback: eventObject => {
				let { fileData } = eventObject;
				let { tabId } = fileData;

				this.urlFileDataCacheManager.addFileData(tabId, fileData);
				this.popupUpdater.updatePopup(null); // need to check, urlFileData is missing
			}
		});
	}

	setMessageListenerCallbacks() {
		this.videoParamsListMessageListener
			.setCallback(async value => {	// might need to move this function somewhere else more appropriate
				let { urlFileData, tabId } = value;

				this.urlFileDataCacheManager
					.addUrlFileData(tabId, urlFileData);
			});
	}
}

var main = new Main();