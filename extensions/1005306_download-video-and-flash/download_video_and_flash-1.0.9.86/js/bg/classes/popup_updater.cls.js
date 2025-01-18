class PopupUpdater {
	constructor(backgroundMessageManager, urlFileDataCacheManager) {
		this.backgroundMessageManager = backgroundMessageManager;
		this.urlFileDataCacheManager = urlFileDataCacheManager;
		this.fileDataListContentLengthUpdater = new FileDataListContentLengthUpdater();

		this.subscribeForEvents();
	}

	subscribeForEvents() {
		this.fileDataListContentLengthUpdater.subscribe({
			topic: EVENTS.BACKGROUND.FILE_DATA_CONTENT_LENGTH_UPDATED,
			callback: eventObject => {
				let { fileData, urlFileData } = eventObject;

				this.updatePopupByFileData(fileData, urlFileData);
			}
		});		
	}

	// does 3 things:
	// 1. sets the icon color
	// 2. updates content length - if popup is ready
	// 3. posts a message to the popup with the selected 'UrlFileData'
	updatePopup(urlFileData) {
		// should always update the icon according to the "SelectedUrlFileData"
		BrowserActionSwitcher.setIconActiveTab(
			this.urlFileDataCacheManager.SelectedUrlFileData
		);

		if (!this.shouldUpdatePopupContent(urlFileData)) { return; }		

		if (urlFileData) {
			this.fileDataListContentLengthUpdater
				.updateContentLengthForUrlFileData(urlFileData);
		}

		this.postMessagePopupSelectedUrlFileData();		
	}

	updatePopupByFileData(fileData, urlFileData) {
		log(fileData);
		BrowserActionSwitcher.setIconActiveTab(
			this.urlFileDataCacheManager.SelectedUrlFileData
		);

		if (!this.shouldUpdatePopupContent(urlFileData)) { return; }

		this.postMessagePopupContentLengthUpdated(fileData);
	}	

	shouldUpdatePopupContent(urlFileData) {
		log(this.urlFileDataCacheManager.SelectedUrlFileData);
		
		return this.urlFileDataCacheManager.SelectedUrlFileData === urlFileData
			&& this.backgroundMessageManager.BackgroundPortManager.IsPopupReady;
	}

	postMessagePopupSelectedUrlFileData() {
		let payload = UrlFileData.stringify(
			this.urlFileDataCacheManager.SelectedUrlFileData
		);

		this.backgroundMessageManager.postMessagePopup({
			message: MESSAGES.BACKGROUND.URL_FILE_DATA,
			payload
		});
	}

	postMessagePopupContentLengthUpdated(fileData) {
		this.backgroundMessageManager.postMessagePopup({
			message: MESSAGES.BACKGROUND.FILE_DATA_CONTENT_LENGTH_UPDATED,
			payload: fileData.stringify()
		});
	}
}