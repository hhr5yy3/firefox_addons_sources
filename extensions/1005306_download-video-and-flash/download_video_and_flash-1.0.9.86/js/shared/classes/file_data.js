class FileData {
	constructor(params) {
		this.url 					= params.url || null;
		this.contentType 			= params.contentType || null;
		this.contentLength 			= params.contentLength || null;
		this.fileType 				= params.fileType || null;
		this.filename 				= params.filename || null;
		this.category 				= params.category || null;
		this.docUrl					= params.docUrl || null;
		this.docDomain				= params.docDomain || null;
		this.docTitle 				= params.docTitle || null;
		this.tab 					= params.tab || null;
		this.tabId					= params.tabId || null;
		this.downloadWindowFilename = params.downloadWindowFilename || null;
		this.filenameNoExt			= params.filenameNoExt || null;
		this.fileExt 				= params.fileExt || null;
		this.quality 				= params.itag || params.quality || null;
		this.formatKey 				= params.formatKey || null;
		this.qualityKey 			= params.qualityKey || null;
		this.popupLabelFormatString = params.popupLabelFormatString || null;
		this.downloadWindowFilenameFormatString = params.downloadWindowFilenameFormatString || null;
		this.popupLabel 			= params.popupLabel || null;
		this.isYouTube				= params.isYouTube || false;

		this.init(params);
	}

	init(params) {
		this.setContentLength(params.contentLength);
		this.setFilename(params.url);
		this.setFileExt();
		this.setFilenameNoExt();		
	}

	setContentLength(contentLength) {
		this.contentLength = new ContentLength(contentLength);
	}

	setFilename(url) {
		if (this.filename || !url) { return; }
		var slashPos = url.lastIndexOf("/");
		this.filename = url.substr(slashPos + 1);;
		var quesMarkPos = this.filename.indexOf("?");
		if (quesMarkPos != -1) {
			this.filename = this.filename.substr(0, quesMarkPos);
		}
	}

	setFilenameNoExt() {
		this.filenameNoExt = this.filename.split(".")[0];
	}

	setFileExt() {
		if (!this.filename || this.fileExt) { return; }
		var dotPos = this.filename.lastIndexOf(".");
		this.fileExt = this.filename.substr(dotPos + 1);
		this.fileExt = this.fileExt.split("?")[0];
	}

	stringify() {
		return FileData.stringify.call(null, this);
	}


	// getters
	get Url() 					{ return this.url; }
	get ContentType() 			{ return this.contentType; }
	get ContentLength() 		{ return this.contentLength; }
	get FileType() 				{ return this.fileType; }
	get Filename()				{ return this.filename; }
	get Category() 				{ return this.category; }
	get BrowserMM() 			{ return this.browserMM; }
	get DocUrl()	 			{ return this.docUrl; }
	get DocDomain() 			{ return this.docDomain; }
	get DocTitle()	 			{ return this.docTitle; }
	get Browser() 				{ return this.aDOMWindow; }
	get Tab() 					{ return this.tab; }
	get TabId() 				{ return this.tabId; }
	get DownloadWindowFilename(){ return this.downloadWindowFilename; }
	get FilenameNoExt() 		{ return this.filenameNoExt; }
	get FileExt() 				{ return this.fileExt; }
	get Quality() 				{ return this.quality ? this.quality : ""; }
	get PopupLabel() 			{ return this.popupLabel; }
	get FormatKey() 			{ return this.formatKey; }
	get QualityKey() 			{ return this.qualityKey; }
	get PopupLabelFormatString(){ return this.popupLabelFormatString; }
	get DownloadWindowFilenameFormatString() 	{ return this.downloadWindowFilenameFormatString; }
	get IsYouTube() 			{ return this.isYouTube; }

	// setters
	set Url(value) 					{ this.url = value; }
	set ContentType(value)			{ this.contentType = value; }
	set ContentLength(value) 		{ this.setContentLength(value); }
	set FileType(value) 			{ this.fileType = value; }
	set Filename(value) 			{ this.filename = value; }
	set Category(value) 			{ this.category = value; }
	set BrowserMM(value)			{ this.browserMM = value; }
	set DocUrl(value)	 			{ this.docUrl = value; }
	set DocDomain(value)			{ this.docDomain = value; }
	set DocTitle(value)	 			{ this.docTitle = value; }
	set Browser(value) 				{ this.aDOMWindow = value }
	set Tab(value) 					{ this.tab = value; }
	set TabId(value) 				{ this.tabId = value; }
	set DownloadWindowFilename(value) { this.downloadWindowFilename = value; }
	set FilenameNoExt(value) 		{ this.filenameNoExt = value; }
	set FileExt(value) 				{ this.fileExt = value; }	
	set Quality(value) 				{ this.quality = value; }
	set FormatKey(value) 			{ this.formatKey = value; }
	set QualityKey(value) 			{ this.qualityKey = value; }
	set PopupLabelFormatString(value) { this.popupLabelFormatString = value; }
	set DownloadWindowFilenameFormatString(value)	{ this.downloadWindowFilenameFormatString = value; }
	set PopupLabel(value) 			{ this.popupLabel = value; }
	set IsYouTube(value) 			{ this.isYouTube = value; }
}

FileData.prototype.CATEGORY = {
	VIDEO: "video",
	FLASH: "flash",
	AUDIO: "audio"
}

FileData.CATEGORY = FileData.prototype.CATEGORY;

FileData.parse = function(json) {
	return new FileData(JSON.parse(json));
}

FileData.stringify = function(fileData) {
	return JSON.stringify(fileData);
}

class ContentLength {
	constructor(contentLength) {
		this.init(contentLength);
	}

	init(contentLength) {
		if (typeof contentLength === "object" && contentLength.contentLength) {
			this.contentLength = parseInt(contentLength.contentLength);
			return;
		}

		if (!contentLength || isNaN(contentLength)) {
			this.contentLength = 0;
		} else {
			this.contentLength = parseInt(contentLength);
		}
	}

	calculateFileSize(withSuffix) {
		let size;

		if (this.contentLength >= 1073741824) {
		    size = this.contentLength/1073741824;
		    size = Math.floor(size * 100) / 100;
		    if (withSuffix) { size += " GB"; }
		}
		else if (this.contentLength >= 1048576) {
		    size = this.contentLength/1048576;
		    size = Math.floor(size * 100) / 100;
		    if (withSuffix) { size += " MB"; }
		}
		else if (this.contentLength >= 1024) {
		    size = this.contentLength/1024;
		    size = Math.floor(size * 100) / 100;
		    if (withSuffix) { size += " KB"; }
		}
		else {
		    size = this.contentLength;
		    if (withSuffix) { size += " bytes"; }
		}
		return size;
	}

	toString() {
		return this.calculateFileSize(this.contentLength);
	}

	isEmpty() {
		return this.contentLength === -1 || this.contentLength === 0;
	}

	setContentLength(value) {
		this.contentLength = value;
	}
}