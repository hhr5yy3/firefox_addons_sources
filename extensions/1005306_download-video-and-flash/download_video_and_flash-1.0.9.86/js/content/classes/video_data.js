class VideoDetailsFetcher {
	constructor(videoId, configUrl) {
		this.videoId = videoId;
		this.configUrl = configUrl;
	}

	getConfigUrl(videoId) {
		try {
			if (!this.configUrl || !this.configUrl.includes("{{videoId}}")) {
				throw new Error("VideoDetailsFetcher.getConfigUrl: '{{videoId}}' is missing");
			}

			return this.configUrl.replace("{{videoId}}", videoId);
		} catch(ex) {
			error(ex);
		}
	}

	fetchRaw(params = { method: "POST" }) {
		let xhr = new XHR();
		params.url = this.getConfigUrl(this.videoId);

		return xhr.send(params);
	}
}

class VideoParams {
	constructor(params) {
		this.url 			= params.url || null;
		this.contentType 	= params.contentType || null;
		this.contentLength 	= params.contentLength || 0;
		this.fileType 		= params.fileType || null;
		this.filename 		= params.filename || null;
		this.category 		= params.category || null;
		this.docUrl			= params.docUrl || null;
		this.docDomain		= params.docDomain || null;
		this.docTitle 		= params.docTitle || null;
		this.fileExt 		= params.fileExt || null;
		this.quality 		= params.quality || null;		
		this.downloadWindowFilename = params.downloadWindowFilename || null;
		this.downloadWindowFilenameFormatString = params.downloadWindowFilenameFormatString || null;
		this.popupLabelFormatString = params.popupLabelFormatString || null;

		this.isYouTube 		= params.isYouTube || false;
		this.isSigOk 		= params.isSigOk;
		this.itag 			= params.itag || null;
		this.s 				= params.s || null;
		this.playerJSUrl 	= params.playerJSUrl || null;
		this.formatKey 		= params.formatKey || null;
		this.qualityKey 	= params.qualityKey || null;
	}

	get Url() 					{ return this.url; }
	get ContentType() 			{ return this.contentType; }
	get ContentLength() 		{ return this.contentLength; }
	get FileType() 				{ return this.fileType; }
	get Filename()				{ return this.filename; }
	get Category() 				{ return this.category; }
	get DocUrl()	 			{ return this.docUrl; }
	get DocDomain() 			{ return this.docDomain; }
	get DocTitle()	 			{ return this.docTitle; }
	get DownloadWindowFilename(){ return this.downloadWindowFilename; }
	get FileExt() 				{ return this.fileExt; }
	get Quality() 				{ return this.quality; }
	get PopupLabelFormatString(){ return this.popupLabelFormatString; }
	get DownloadWindowFilenameFormatString() { return this.downloadWindowFilenameFormatString; }
	get IsYouTube() 			{ return this.isYouTube; }
	get IsSigOk() 				{ return this.isSigOk; }
	get Itag() 					{ return this.itag; }
	get S() 					{ return this.s; }
	get PlayerJSUrl() 			{ return this.playerJSUrl; }
	get FormatKey()				{ return this.formatKey; }
	get QualityKey()			{ return this.qualityKey; }	

	JSONParse() {
		let parsed = {
			url: this.url,
			contentType: this.contentType,
			contentLength: this.contentLength,
			fileType: this.fileType,
			filename: this.filename,
			category: this.category,
			docUrl: this.docUrl,
			docDomain: this.docDomain,
			docTitle: this.docTitle,
			downloadWindowFilename: this.downloadWindowFilename,
			fileExt: this.fileExt,
			quality: this.quality,
			popupLabelFormatString: this.popupLabelFormatString,
			downloadWindowFilenameFormatString: this.downloadWindowFilenameFormatString,
			isYouTube: this.isYouTube
		};

		if (this.isYouTube) {
			parsed.isSigOk = this.isSigOk;
			parsed.itag = this.itag;
			parsed.s = this.s;
			parsed.playerJSUrl = this.playerJSUrl;
			parsed.formatKey = this.formatKey;
			parsed.qualityKey = this.qualityKey;
		}

		return parsed;
	}
}

class WatchUrl {
	constructor() {
		this.prevWatchUrl = null;
	}

	get PrevWatchUrl() { return this.prevWatchUrl; }
	set PrevWatchUrl(value) { this.prevWatchUrl = value; }

	clearPrevWatchUrl() { this.prevWatchUrl = null; };

	isNewWatchUrl(url) {
		return !this.prevWatchUrl || this.prevWatchUrl !== url;
	}

	isWatchUrl(url) {
		try {
			throw new Error("WatchUrl.isWatchUrl: not implemented");
		} catch(ex) {
			error(ex);
		}
	}

	getVideoIdFromUrl(url) {
		try {
			throw new Error("WatchUrl.getVideoIdFromUrl: not implemented");
		} catch(ex) {
			error(ex);
		}
	}
}