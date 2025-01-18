class View {
	constructor() {
		this.popupSize = new PopupSize();
		this.fileLabelMaker = new FileLabelMaker();
		this.clipboardCopier = new ClipboardCopier();
		this.fileDownloader = new FileDownloader();
		this.themeLoader = new ThemeLoader();

		this.themeLoader.loadTheme();
		this.setContentMaxHeight();
		this.setCopiedToClipboardMessageTransitionendEvent();
		$("#content").mCustomScrollbar({ 
			// alwaysShowScrollbar: 1,
			// autoHideScrollbar: false,
			theme: "dark",	// the scrollbar's theme
			callbacks: {
			    onTotalScroll: function() {}, 		// scroll to bottom
			    onTotalScrollBack: function() {}, 	// scroll to top
			    onOverflowY: function() {}
			}
		});
	}

	buildList(params) {
		try {
			log(28);
			log(params);
			if (!params || !params.fileDataList || !params.containingElementId) { return; }
			var fileDataList = params.fileDataList;
			var isAtLeastOneFileAddedSuccessfully = false;
			var isAddedSuccessfully;
			// var containingElementId = params.containingElementId;

			for (var i in fileDataList) {
				var fileData = fileDataList[i];

				isAddedSuccessfully = this.addItemToList({
					containingElementId: params.containingElementId,
					downloadElementClass: params.downloadElementClass,
					copyUrlElementClass: params.copyUrlElementClass,
					fileData: fileData
				});

				if (isAddedSuccessfully) {
					isAtLeastOneFileAddedSuccessfully = true;
				}
			}

			log(isAtLeastOneFileAddedSuccessfully);
			return isAtLeastOneFileAddedSuccessfully;
		} catch(ex) { error(ex); }
	}

	shouldAddItemToList(fileData) {
		let isShowFlashFiles = this.isShowFlashFiles();
		let isShowVideoFiles = this.isShowVideoFiles();

		if (fileData.Category === fileData.CATEGORY.FLASH && !isShowFlashFiles) {
			return false;
		}

		if (fileData.Category === fileData.CATEGORY.VIDEO && !isShowVideoFiles) {
			return false;
		}

		return true;
	}

	addItemToList(params) {
		if (!params || !params.fileData || !params.containingElementId) { return; }
		var fileData = params.fileData;
		
		if (!this.shouldAddItemToList(fileData)) {
			return false;
		}
		var containingElementId = params.containingElementId;
		var downloadElementClass = params.downloadElementClass;
		var copyUrlElementClass = params.copyUrlElementClass;

		var item = this.createItem(fileData);
		var downloadElement = $(item).find("." + downloadElementClass);
		var copyUrlElement = $(item).find("." + copyUrlElementClass);
		var containingElement = $("#" + containingElementId);
		item.appendTo(containingElement);

		// add attributes
		// $(item).attr("data-url", encodeURIComponent(fileData.Url));
		// $(item).attr("data-filename", fileData.DownloadWindowFilename);
		// $(item).attr("data-file_ext", fileData.fileExt);
		this.setDownloadClickEventListener(downloadElement, fileData);
		this.setCopyUrlClickEventListener(copyUrlElement, fileData);

		// increase popupSize by the "contentItem" height
		log("item height");
		// log(item);
		// log(item.outerHeight(true));
		// log(($(item)[0]).clientHeight);
		// log(($(item)[0]).offsetHeight);
		// log(($(item)[0]).scrollHeight);

		if (this.isFilterYouTubeItem(fileData)) {
			this.hideItem(item);
			return false;
		}

		// had to use a fixed element height instead of getting it dynamically because for some reason it sometimes gets a 91px height instead of 57px
		this.popupSize.increaseHeight(57);

		return true;
	}

	isFilterYouTubeItem(fileData) {
		log(fileData);
		let qualityPrefName = PREFS.KEYS.YT.QUALITIES[fileData.QualityKey];
		let formatPrefName = PREFS.KEYS.YT.FORMATS[fileData.FormatKey];
		let isDisplayedQuality = UserPrefs.CACHE.getPref(qualityPrefName);
		let isDisplayedFormat = UserPrefs.CACHE.getPref(formatPrefName);

		isDisplayedFormat = isDisplayedFormat !== null ? isDisplayedFormat : true;
		isDisplayedQuality = isDisplayedQuality !== null ? isDisplayedQuality : true;

		log(isDisplayedQuality);
		log(isDisplayedFormat);
		log("format key: " + fileData.QualityKey);
		// log(PrefManager.getPref(qualityPrefName));

		return (!isDisplayedQuality || !isDisplayedFormat) && fileData.IsYouTube;
	}

	isShowFlashFiles() {
		let showFlashFilesPrefName = UserPrefs.CACHE
			.getPref(PREFS.KEYS.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_FLASH_FILES);

		return showFlashFilesPrefName;
	}

	isShowVideoFiles() {
		let showVideoFilesPrefName = UserPrefs.CACHE
			.getPref(PREFS.KEYS.GENERAL.FLASH_AND_VIDEO_FILES.SHOW_VIDEO_FILES);

		return showVideoFilesPrefName;
	}

	setDownloadClickEventListener(element, fileData) {
		$(element).on("click", fileData, 
			event => {
				let fileData = event.data;
				this.fileDownloader.downloadFile(fileData);
			}
		);
	}

	setCopyUrlClickEventListener(element, fileData) {
		$(element).on("click", fileData, 
			event => {
				// if (event.which == 3) {
					let fileData = event.data;
					let url = fileData.Url;
					this.clipboardCopier.copy(url);

					// log("right click");
				// }
			}
		);
	}	

	clearList(elementList) {
		$("#" + elementList).empty();
	}

	setCopiedToClipboardMessageTransitionendEvent() {
		let TOTAL_TRANSITIONS = 3;

		$("#copiedToClipboardMessage").on("transitionend", function() {
			let transitionCounter = $("#copiedToClipboardMessage").attr("data-transCounter");
			$("#copiedToClipboardMessage").attr("data-transCounter", ++transitionCounter);
			if ($("#copiedToClipboardMessage").attr("class") === "show") {
				$("#copiedToClipboardMessage").attr("class", "hide noRotation");
			}
			if (transitionCounter == TOTAL_TRANSITIONS) {
				$("#copiedToClipboardMessage").attr("class", "hide");
				$("#copiedToClipboardMessage").attr("data-transCounter", "0");
			}
		});		
	}

	showCopiedToClipboardMessage() {
		if ($("#copiedToClipboardMessage").attr("class") !== "hide noRotation") {
			$("#copiedToClipboardMessage").attr("class", "show");
		}		
	}

	createItem(fileData) {
		// TODO - if adding a tag that specifies the file type (video/flash) - use the following code-
		// if (fileData.Category === fileData.CATEGORY.FLASH/VIDEO)

		let fileDataAudioCategory = null;	// PART OF PATCH!!
		// fileData relevant properties - 
		// 	Category, ContentLength, FileType, Url, Quality
		if (fileData.fileType === "weba" || fileData.fileType === "m4a") { // PART OF PATCH!!
			fileDataAudioCategory = "audio"; // PART OF PATCH!!
		}

		fileData.PopupLabel = this.fileLabelMaker.getFileLabel(fileData);	// the label to show in the popup
		fileData.DownloadWindowFilename = this.fileLabelMaker.getFilenameLabel(fileData); // the name of the filename when downloading/saving file
		log(fileData);
		log(fileData.DownloadWindowFilename);
		var item = $("<div></div>").addClass("contentItem");
		item.attr("data-url", btoa(fileData.Url));
		item.hover(function() {
			$(".contentItem .itemButtonsInitial").removeClass("itemButtonsInitial");
		});

		// itemTextWrapper
		var itemTextWrapper = $("<div></div>").addClass("itemTextWrapper");
		var itemLabel = $("<div></div>").text(fileData.PopupLabel).addClass("itemLabel");
		var itemInfo = $("<div></div>").addClass("itemInfo");
		itemTextWrapper.append(itemLabel);
		itemTextWrapper.append(itemInfo);

		var itemFileType = $("<div></div>").text(fileData.FileType).addClass("itemFileType");
		var itemQuality = $("<div></div>").text(fileData.Quality).addClass("itemQuality");
		var fileSize = $("<div></div>").text(fileData.ContentLength.toString()).addClass("fileSize");
		itemInfo.append(itemFileType);
		itemInfo.append(itemQuality);
		itemInfo.append(fileSize);

		// itemType
		let textForCategory = fileDataAudioCategory || fileData.Category; // PART OF PATCH!!
		var itemType = $("<div></div>").addClass("itemType");
		var itemTypeSeparator = $("<div></div>").text("|").addClass("itemTypeSeparator");
		var itemTypeText = $("<div></div>").text(textForCategory).addClass("itemTypeText"); // 'textForCategory' PART OF PATCH!!
		// var itemTypeText = $("<div></div>").text(fileData.Category).addClass("itemTypeText"); // WITHOUT PATCH

		itemType.append(itemTypeSeparator);
		itemType.append(itemTypeText);

		// itemButtons
		var itemButtons = $("<div></div>").addClass("itemButtons");
		var itemCopyToURLButton = $("<div>Link</div>")
			.addClass("itemCopyToURLButton")
			.addClass("itemCopyToURLSquareButton")
			.addClass("itemButtonsInitial");
		var itemDownloadButton = $("<div>Download</div>")
			.addClass("itemDownloadButton")
			.addClass("itemDownloadSquareButton")
			.addClass("itemButtonsInitial");
		itemButtons.append(itemCopyToURLButton);
		itemButtons.append(itemDownloadButton);
		$(itemCopyToURLButton).on("click", this.showCopiedToClipboardMessage);

		item.append(itemTextWrapper);
		item.append(itemType);
		item.append(itemButtons);
		log(item);

		return item;
	}

	getContentParentElement(fileData) {
		if (fileData.Category === fileData.CATEGORY.VIDEO) {
			return "#videosContent";
		}
		if (fileData.Category === fileData.CATEGORY.FLASH) {
			return "#flashContent";
		}

		return null;
	}

	updateItem(fileData, updateItemFunction) {
		var contentParentElement = this.getContentParentElement(fileData);
		if (!contentParentElement) { return; }

		$(contentParentElement + " .contentItem").each(function(index, item) {
			var url = atob($(item).attr("data-url"));
			if (url === fileData.Url) {
				updateItemFunction(index, item, fileData);
				return false;
			}
			// log(index + ": " + $(item).attr("data-url") );
		}.bind(this));		
	}

	updateItemLabel(fileData) {
		this.updateItem(fileData, function(index, item, fileData) {
			var label = this.fileLabelMaker.getFileLabel(fileData);
			$(item).find(".itemLabel").text(label);
		}.bind(this));
	}

	updateItemInfoFileSize(fileData) {
		this.updateItem(fileData, function(index, item, fileData) {
			$(item).find(".fileSize").text(fileData.ContentLength.toString());
		});
	}

	resetView(options) {
		options = options || {};
		this.clearList("flashContent");
		this.clearList("videosContent");
		this.hideFlashTitle();
		this.hideVideosTitle();
		this.hideScrollArrows();
	}

	hideNoFilesFoundMessage() {
		this.resetView();
		this.popupSize.reset();
		$("#noFilesFoundMessage").attr("class", "hidden");
	}

	showNoFilesFoundMessage() {
		this.resetView();
		this.popupSize.reset({ resetToNoFilesFoundMessageSize: true });
		$("#noFilesFoundMessage").attr("class", "shown");
	}

	isNoFilesFoundMessageShown() {
		return $("#noFilesFoundMessage").hasClass("shown");
	}

	hideFlashTitle() { this.hideTitle("flashTitle"); }
	hideVideosTitle() { this.hideTitle("videosTitle"); }
	showFlashTitle() { this.showTitle("flashTitle"); }
	showVideosTitle() { this.showTitle("videosTitle"); }

	showTitle(elementId) {
		if (!$("#" + elementId).hasClass("titleHidden")) { return; }

		$("#" + elementId).removeClass("titleHidden");
		this.popupSize.increaseHeight($("#" + elementId).outerHeight(true));
	}

	hideTitle(elementId) {
		if ($("#" + elementId).hasClass("titleHidden")) { return; }

		$("#" + elementId).addClass("titleHidden");
		this.popupSize.decreaseHeight($("#" + elementId).outerHeight(true));
	}

	setTheme(theme) {
		if (!theme) { return; }
		$("#wrapper").attr("class", theme);
	}

	setContentMaxHeight() {
		$("#content").css("max-height", this.popupSize.getMaxContentHeight());
	}

	hideScrollArrows() {
		$(".scrollArrows").css("visibility", "hidden");
	}

	hideItem(item) {
		$(item).addClass("hide");
	}

	showItem(item) {
		$(item).removeClass("hide");
	}
}

function FileLabelMaker() {
	// these are the formats to be displayed in the popup window:
	// var DEFAULT_FLASH_FILE_FORMAT = "{{filenameNoExt}}";
	// var DEFAULT_VIDEO_FILE_FORMAT = "{{filenameNoExt}}";
	var DEFAULT_FLASH_FILE_FORMAT = "{{filenameNoExt}}";
	var DEFAULT_VIDEO_FILE_FORMAT = "{{filenameNoExt}}";

	// these are the formats to be displayed in the downloads window - when saving/downloading the file
	var DEFAULT_FILENAME_FORMAT = "{{filename}}";
	var FILENAME_FORMAT_AS_TITLE = "{{docTitle}}.{{fileExt}}";

	this.init = function() {
		// log(this.filena)
	};

	this.getFilenameFormat = function() {
		var suggestAltFilenames = UserPrefs.CACHE.getPref(
			PREFS.KEYS.GENERAL.DOWNLOADS.SUGGEST_ALTERNATIVE_FILENAMES
		);

		log(suggestAltFilenames);

		return suggestAltFilenames ? 
			FILENAME_FORMAT_AS_TITLE : DEFAULT_FILENAME_FORMAT;
	};

	// The filename's format and how it's displayed in the popup
	this.getFileLabel = function(fileData) {
		if (!fileData) { return null; }
		if (fileData.Category === FileData.CATEGORY.FLASH) {
			return this.getFlashFileLabel(fileData);
		}
		if (fileData.Category === FileData.CATEGORY.VIDEO) {
			return this.getVideoFileLabel(fileData);
		}
	};

	// The filename's format and how it's displayed in the downloads window
	this.getFilenameLabel = function(fileData) {
		if (!fileData) { return null; }
		if (fileData.Category === FileData.CATEGORY.FLASH) {
			return this.getFlashFilenameLabel(fileData);
		}
		if (fileData.Category === FileData.CATEGORY.VIDEO) {
			return this.getVideoFilenameLabel(fileData);
		}
	};

	this.createLabel = function(format, fileData) {
		if (!format) { return null; }

		format = this.replaceMoustache(format, "quality", fileData.Quality);
		format = this.replaceMoustache(format, "category", fileData.Category);
		format = this.replaceMoustache(format, "filename", decodeURIComponent(fileData.Filename));
		format = this.replaceMoustache(format, "videoTitle", fileData.DocTitle);
		format = this.replaceMoustache(format, "flashTitle", fileData.DocTitle);
		format = this.replaceMoustache(format, "docTitle", fileData.DocTitle);
		format = this.replaceMoustache(format, "filenameNoExt", decodeURIComponent(fileData.FilenameNoExt));
		format = this.replaceMoustache(format, "fileSize", fileData.ContentLength.toString());
		format = this.replaceMoustache(format, "fileExt", fileData.FileExt);
		format = this.replaceMoustache(format, "fileType", fileData.FileType);

		return format;
	};

	// FileLabel functions - to be displayed in the popup
	// creates a flash file label from a file format
	this.getFlashFileLabel = function(fileData) {
		var format = DEFAULT_FLASH_FILE_FORMAT;

		return this.createLabel(format, fileData);
	};

	// creates a video file label from a file format
	this.getVideoFileLabel = function(fileData) {
		var format = this.getVideoFileFormat(fileData);

		return this.createLabel(format, fileData);
	};

	// creates a video file format
	this.getVideoFileFormat = function(fileData) {
		log(fileData);
		if (fileData.PopupLabelFormatString) {
			return (new FileLabel(fileData.PopupLabelFormatString)).Format;
		}
		return DEFAULT_VIDEO_FILE_FORMAT;
	};

	// FilenameLabel functions - to be displayed in the downloads window
	// creates a video filename label from a filename format
	this.getVideoFilenameLabel = function(fileData) {
		var format = this.getVideoFilenameFormat(fileData);
		log(this.createLabel(format, fileData));

		return this.createLabel(format, fileData);
	};

	// creates a video filename format
	this.getVideoFilenameFormat = function(fileData) {
		log(117);
		log(fileData);
		if (fileData.DownloadWindowFilenameFormatString) {
			return (new FileLabel(fileData.DownloadWindowFilenameFormatString)).Format;
		}
		log(this.getFilenameFormat());
		return this.getFilenameFormat();
	};

	// creates a flash filename format
	this.getFlashFilenameLabel = function(fileData) {
		var format = this.getFlashFilenameFormat(fileData);
		log(format);

		return this.createLabel(format, fileData);
	};

	this.getFlashFilenameFormat = function(fileData) {
		return this.getFilenameFormat();
	};

	this.replaceMoustache = function(str, moustache, value) {
		return str.replace("{{" + moustache + "}}", value);
	};

	this.init();
}

var PopupSize = (function() {
	const DEFAULT_POPUP_SIZE = {
		WIDTH: 400,
		HEIGHT: 56
	};

	const CONTENT_ITEM_HEIGHT = 57;
	const MAX_CONTENT_ITEMS = 4;
	const SHOW_NO_FILES_FOUND_HEIGHT = 250;
	const OVERFLOW_MENU_SIZE = 348;	// a fixed value set by firefox

	class PopupSize {
		constructor() {
			this.maxHeight;
			this.totalScrollArrowsHeight;
			this.maxContentHeight;

			this.setMaxHeight();
			this.addEventListeners();
		}

		addEventListeners() {
			document.addEventListener("DOMContentLoaded", this.onDOMContentLoaded.bind(this));		
		}

		onDOMContentLoaded(event) {
			this.reset();
		}

		reset(options) {
			options = options || {};
			let height = options.resetToNoFilesFoundMessageSize ? 
				SHOW_NO_FILES_FOUND_HEIGHT : DEFAULT_POPUP_SIZE.HEIGHT;
			log("40 PopupSize: " + height);
			this.setSize({
				width: DEFAULT_POPUP_SIZE.WIDTH,
				height: height
			});
		}

		isInOverFlowMenu() {
			return window.innerWidth !== parseInt(document.body.style.width) ||
				window.innerWidth === OVERFLOW_MENU_SIZE;
		}

		resetBodyWidth() {
			document.body.style.width = "";
		}

		isSizeSetToNoFilesFoundMessage() {
			return this.getPopupHeight() === SHOW_NO_FILES_FOUND_HEIGHT;
		}

		setMaxContentHeight() {
			this.maxContentHeight = CONTENT_ITEM_HEIGHT * MAX_CONTENT_ITEMS;
		}

		setMaxHeight() {
			this.setMaxContentHeight();

			this.maxHeight = 
				this.maxContentHeight + 
				DEFAULT_POPUP_SIZE.HEIGHT + 
				10;
		}

		setSize(dimensions) {
			let height = dimensions.height;
			let width = dimensions.width + 8;

			// document.documentElement.style.height = `${height}px`;
			// document.documentElement.style.width = `${width + 8}px`;

			if (document.body) {
				document.body.style.height = `${height}px`;
				document.body.style.width = `${width}px`;
			}

			setTimeout(() => {
				if (this.isInOverFlowMenu()) {
					this.resetBodyWidth();
				}
			}, 100);
		}

		getPopupHeight() {
			return parseInt(document.body.style.height);
		}

		getPopupWidth() {
			return parseInt(document.body.style.width);
		}

		getMaxContentHeight() {
			return this.maxContentHeight;
		}

		increaseHeight(value) {
			let newHeight = this.getPopupHeight() + value;
			if (newHeight >= this.maxHeight) { return; }
			this.setSize({
				height: newHeight
			});
		}

		decreaseHeight(value) {
			this.increaseHeight(value * -1);
		}

		increaseWidth(value) {
			this.setSize({
				width: this.getPopupWidth() + value
			});
		}

		decreaseWidth(value) {
			this.increaseWidth(value * -1);
		}

		increaseHeightByItem(numOfItems = 1) {
			this.increaseHeight(CONTENT_ITEM_HEIGHT * numOfItems);
		}

		decreaseHeightByItem(numOfItems = 1) {
			this.increaseHeightByItem(numOfItems * -1);
		}
	}

	return PopupSize;
})();