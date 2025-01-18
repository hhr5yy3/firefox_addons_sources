class Popup {
	constructor() {
		this.popupMessageManager = new PopupMessageManager();
		this.urlFileDataMessageListener = new UrlFileDataMessageListener();
		this.fileDataContentLengthUpdatedMessageListener = new FileDataContentLengthUpdatedMessageListener();
		this.localeBinder = new LocaleBinder();
		this.view = null;
		this.urlFileData = null;

		this.popupMessageManager.postMessage({
			message: CONNECTIONS.POPUP.CONNECTION_CHECK
		});

		this.setMessageListeners();
		this.setMessageListenerCallbacks();
		this.addEventListeners();

		// this.view.showNoFilesFoundMessage();
	}

	addEventListeners() {
		document.addEventListener("DOMContentLoaded", this.onDOMContentLoaded.bind(this));		
	}

	async onDOMContentLoaded(event) {
		await UserPrefs.setCachedPrefs();
		
		this.view = new View();
		this.localeBinder.bind();

		this.popupMessageManager
			.portConnector.notifyPortIsReady();	// ready to receive messages
	}	

	setMessageListeners() {
		this.popupMessageManager
			.MessageListenerManager
			.addMessageListener(
				CONNECTIONS.BACKGROUND.CONNECTION_CHECK,
				new ConnectionCheckMessageListener()
			);

		this.popupMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.URL_FILE_DATA,
				this.urlFileDataMessageListener
			);

		this.popupMessageManager
			.MessageListenerManager
			.addMessageListener(
				MESSAGES.BACKGROUND.FILE_DATA_CONTENT_LENGTH_UPDATED,
				this.fileDataContentLengthUpdatedMessageListener
			);			
	}

	setMessageListenerCallbacks() {
		this.urlFileDataMessageListener
			.setCallback(urlFileData => {
				if (!urlFileData) {
					this.view.showNoFilesFoundMessage();
					return;
				}

				this.view.hideNoFilesFoundMessage();
				this.urlFileData = urlFileData;
				this.buildPopupFilesList(this.urlFileData);
				log(urlFileData);
			});

		this.fileDataContentLengthUpdatedMessageListener
			.setCallback(fileData => {
				log(fileData);
				this.view.updateItemLabel(fileData);
				this.view.updateItemInfoFileSize(fileData);				
			});
	}

	buildPopupFilesList(urlFileData) {
		log("buildPopupFilesList");
		this.view.hideNoFilesFoundMessage();

		var flashList = urlFileData.getFilesDataByCategory(FileData.CATEGORY.FLASH);
		var videoList = urlFileData.getFilesDataByCategory(FileData.CATEGORY.VIDEO);
		var isAtLeastOneFlashFileAddedSuccessfully = false;
		var isAtLeastOneVideoFileAddedSuccessfully = false;

		// log(flashList);
		log(videoList);
		isAtLeastOneFlashFileAddedSuccessfully = this.view.buildList({
			containingElementId: "flashContent",
			downloadElementClass: "itemDownloadButton",
			copyUrlElementClass: "itemCopyToURLButton",
			fileDataList: flashList
		});

		isAtLeastOneVideoFileAddedSuccessfully = this.view.buildList({
			containingElementId: "videosContent",
			downloadElementClass: "itemDownloadButton",
			copyUrlElementClass: "itemCopyToURLButton",
			fileDataList: videoList
		});

		if (!isAtLeastOneFlashFileAddedSuccessfully &&
			!isAtLeastOneVideoFileAddedSuccessfully) {
			this.view.showNoFilesFoundMessage();
		}
		// log(this.filesListBuilder);
		// log(flashContainingElement);
	}	
}

let popup = new Popup();