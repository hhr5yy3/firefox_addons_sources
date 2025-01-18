var NetworkNotifier = (function() {
	const HEADER_NAMES = {
		CONTENT_TYPE: "content-type",
		CONTENT_LENGTH: "content-length"
	};

	const HEADER_VALUES = {
		CONTENT_TYPE: {
			FLASH: {
				SHOCKWAVE_FLASH: "application/x-shockwave-flash"
			},
			VIDEO: {

			}
		}
	};

	const FILETYPE_FORMATS = {
		MP4 	: "mp4",
		FLV 	: "flv",
		WEBM	: "webm",
		_3GP	: "3gp",
		WEBM_3D	: "3d.webm",
		MP4_3D	: "3d.mp4",
		SWF		: "swf",
		F4V		: "f4v"
	};

	class NetworkNotifier extends Observer {
		constructor() {
			super();
			this.startListening();
		}

		startListening() {
			let urls = ["<all_urls>"];

			browser.webRequest.onResponseStarted.addListener(async details => {
					// log(details);
					let { responseHeaders } = details;

					if (details.url.indexOf(".mp4") !== -1) {
						// log(details);
						// log(details.url);
					}

					let options = { getHeaderLowerCased: true };
					let contentTypeHeader = this.extractResponseHeaderByName(
						HEADER_NAMES.CONTENT_TYPE, 
						responseHeaders,
						options
					);

					// log(contentTypeHeader);

					if (!contentTypeHeader) { return; }

					let contentLengthHeader = this.extractResponseHeaderByName(
						HEADER_NAMES.CONTENT_LENGTH, 
						responseHeaders,
						options
					);

					let headers = { contentTypeHeader, contentLengthHeader };
					let contentType = contentTypeHeader.value;

					if (contentType.toLowerCase() === 
						HEADER_VALUES.CONTENT_TYPE.FLASH.SHOCKWAVE_FLASH) {

						let fileData = await this.createFileData(
							details, headers, FileData.CATEGORY.FLASH
						);

						if (DomainIgnoreList.isDomainInList(fileData)) { return; }

						this.notify(
							EVENTS.BACKGROUND.FILE_DATA_CREATED,
							{ fileData }
						);
						// log(fileData);
						return;
					}

					let fileType = this.getFileType(contentType);

					if (fileType) {
						let fileData = await this.createFileData(
							details, headers, FileData.CATEGORY.VIDEO, fileType
						);

						if (DomainIgnoreList.isDomainInList(fileData)) { return; }

						this.notify(
							EVENTS.BACKGROUND.FILE_DATA_CREATED,
							{ fileData }
						);
					}
				
				}, 
				{ urls },
				["responseHeaders"]
			);
		}

		async createFileData(details, headers, category, fileType = null) {
			let contentType = headers.contentTypeHeader.value;
			let contentLength = headers.contentLengthHeader.value;
			let docUrl = details.originUrl || "";
			let docDomain = Utils.getHost(docUrl);
			let url = details.url;
			let tabId = details.tabId;
			let docTitle = (await browser.tabs.get(tabId)).title;

			let params = {
				contentType,
				contentLength,
				docUrl,
				docDomain,
				url,
				tabId,
				docTitle,
				category
			};

			return new FileData(params);
		}

		extractResponseHeaderByName(headerName, responseHeaders, options) {
			let { getHeaderLowerCased } = options;
	        headerName = headerName.toLowerCase();
	        
	        for (let header of responseHeaders) {
	        	if (header.name.toLowerCase() === headerName) {
	        		if (getHeaderLowerCased) {
	        			header.name = header.name.toLowerCase();
	        			header.value = header.value.toLowerCase();
	        		}

	        		return header;
	        	}
	        }

	        return null;
		}

		getFileType(contentType) {
			if (typeof contentType !== "string") {
				return null;
			}

			contentType = contentType.toLowerCase();

			let fileType = null;

		    if (contentType.match("video/(webm$|x-webm$)")) {	// video/webm, video/x-webm
		    	fileType = "webm"
		    } else if (contentType.match("video/3gp")) {	// video/3gp, video/3gpp, video/3gpp2
				fileType = "3gp";
			} else if (contentType.match("video/(flv$|x-flv$)")) {	// video/flv, video/x-flv
				fileType = "flv";
			} else if (contentType.match("video/(mp4$|x-m4v$)")) {
				fileType = "mp4";
			} else if (contentType === "video/mpeg") {
				fileType = "mpeg";
			} else if (contentType === "video/f4v") {
				fileType = "f4v";
			} else if (contentType === "video/quicktime") {
				fileType = "mov";
			} else if (contentType === "video/x-msvideo") {
				fileType = "avi";
			} else if (contentType === "video/x-ms-wmv") {
				fileType = "wmv";
			}

			return fileType;
		}

		stopListening() {}
	}

	return NetworkNotifier;
})();


var DomainIgnoreList = new function() {
	var FLASH_DOMAINS = [];
	var VIDEO_DOMAINS = ["youtube.com", "facebook.com"];
	var ALL_DOMAINS = [];

	this.init = function() {};

	this.isDomainInList = function(fileData, ignoreList) {
		if (!fileData.DocDomain) { return false; }

		ignoreList = ignoreList || this.getIgnoreList(fileData);
        for (var i in ignoreList) {
            if (fileData.DocDomain.indexOf(ignoreList[i]) != -1) {
                return true;
            }
        }
        if (ignoreList === ALL_DOMAINS) { return false; }

        return this.isDomainInList(fileData, ALL_DOMAINS);
	};

	this.getIgnoreList = function(fileData) {
		if (fileData.Category === FileData.CATEGORY.FLASH) { 
			return FLASH_DOMAINS;
		}
		if (fileData.Category === FileData.CATEGORY.VIDEO) { 
			return VIDEO_DOMAINS;
		}
		return null;
	};

	this.init();
};