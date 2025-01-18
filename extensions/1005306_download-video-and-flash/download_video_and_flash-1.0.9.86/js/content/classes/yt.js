var FORMAT_MAP = {
    5:   { resolution: "144p", 		fileType: "flv", category: "video" },
    6:   { resolution: "270p", 		fileType: "flv", category: "video" },
    13:  { resolution: "144p", 		fileType: "3gp", category: "video" },
    17:  { resolution: "144p", 		fileType: "3gp", category: "video" },
    18:  { resolution: "360p", 		fileType: "mp4", category: "video" },
    22:  { resolution: "720p", 		fileType: "mp4", category: "video" },
    34:  { resolution: "360p", 		fileType: "flv", category: "video" },
    36:  { resolution: "240p", 		fileType: "3gp", category: "video" },
    43:  { resolution: "360p", 		fileType: "webm", category: "video" },
    45:  { resolution: "720p", 		fileType: "webm", category: "video" }
};

class YouTubeDecResponseMessageListener extends MessageListener {
	constructor() {
		super();
	}

	// messageObject = { message, payload }
	async onMessage(messageObject = {}, port) {
		try {
			let { message, payload } = messageObject;

			super.onMessage(messageObject, port, payload);
		} catch(ex) {
			error(ex);
		}
	}
}

var VideoDetailsUrlFetcher = (function() {
	const MAP_URL = "http://youtube.com/watch?v={{videoId}}&spf=navigate";
	const MAP_URL_GET_VIDEO_INFO = "https://www.youtube-nocookie.com/get_video_info?video_id={{videoId}}&el=detailpage";
	const EURL_PARAM = "eurl=https://www.youtube.com/watch?v={{videoId}}";
	const STS_PARAM = "sts={{sts}}";

	class VideoDetailsUrlFetcher {
		constructor(videoId, url) {
			this.videoId = videoId;
			this.url = url;
		}

		getMapUrl(videoId) {
			return MAP_URL.replace("{{videoId}}", videoId);
		}

		getMapUrlGetVidInfo(params = { videoId: null, sts: null }) {
			if (!params.videoId || !params.sts) {
				throw new Error();
			}

			let { videoId, sts } = params;

			sts = STS_PARAM.replace("{{sts}}", sts);
			let eurl = EURL_PARAM.replace("{{videoId}}", videoId);
			eurl = encodeURIComponent(eurl);

			let mapUrlGetVideoInfo = MAP_URL_GET_VIDEO_INFO.replace("{{videoId}}", videoId);
			mapUrlGetVideoInfo += `&${eurl}&${sts}`;
			
			log(mapUrlGetVideoInfo);
			
			return mapUrlGetVideoInfo;
		}

		fetchRaw() {
			let xhr = new XHR();

			return xhr.send({
				method: "POST",
				url: this.getMapUrl(this.videoId),
				responseType: "json"
			});
		}

		fetchRawGetVidInfo() {
			let sts = this.getStsFromGetVidInfo();
			log(sts);			
			let xhr = new XHR();

			return xhr.send({
				method: "POST",
				url: this.getMapUrlGetVidInfo({ videoId: this.videoId, sts })
				// responseType: "json"
			});
		}		

		fetchDocument() {
			let xhr = new XHR({ mozAnon: false });

			return xhr.send({
				method: "GET",
				url: this.url,
				responseType: "document"
			});
		}

		getStsFromGetVidInfo(data = document.documentElement.innerHTML) {
			let result = /blankSwfConfig\s*=\s*.*("sts"\s*:\s*(\d*))/.exec(data);

			if (!result) {
				result = /"sts"\s*:\s*(\d*)/.exec(data);
			}

			return result ? result[result.length-1] : null;
		}
	}

	return VideoDetailsUrlFetcher;
})();

var YouTubeParser = (function() {
	const URL = "url=";
	const QUALITY = "quality=";
	const TYPE = "type=";
	const ITAG = "itag=";
	const SIG = "sig=";
	const S = "s=";
	const SPLIT_DELIMITER = "&";
	const SPLIT_DELIMITER_UNICODE = "\\u0026";

	const VIDEO_FILE_LABEL = "{{videoTitle}}";
	const VIDEO_FILENAME_LABEL = "{{videoTitle}} [{{quality}}].{{fileExt}}";
	const PLAYER_JS_URL_REGEX = /\s*js\s*"\s*:\s*"([^"]*)/;
	const REMOVE_TRAILING_YOUTUBE_REGEX = /\s*-\s*YouTube$/i;

	const FORMAT_TYPE = {
		FORMATS: "formats",
		ADAPTIVE_FORMATS: "adaptiveFormats"
	};

	class YouTubeParser {
		constructor(url) {
			this.url = url;
		}

		getDelimiter(rawVideoData) {
			return rawVideoData.includes(SPLIT_DELIMITER_UNICODE) ? 
				SPLIT_DELIMITER_UNICODE : SPLIT_DELIMITER;
		}

		hasSig(url) {
			return url.indexOf("signature") !== -1;
		}

		adjustSig(url, sig) {
			if (sig) { return url += "&signature=" + sig; }
			return url + "&signature=";
		}

		isSigOk(s) {
			return s === null;
		}

		getPlayerJSUrl(data) {
			if (!data) { return null; }
			let swfcfg = this.getVideoSwfcfg(data);
			// log(swfcfg);
			if (swfcfg.hasOwnProperty("assets")
				&& swfcfg.assets.hasOwnProperty("js")) {
				return "https:\/\/youtube.com\/" + swfcfg.assets.js;
			}
			return null;
		}

		getVideoSwfcfg(data) {
			if (!data) { return null; }
			if (data instanceof Array) {
				for (let i in data) {
					if (data[i].hasOwnProperty("data")
						&& data[i].data.hasOwnProperty("swfcfg")) {
						return data[i].data.swfcfg;
					}
				}
			}
			return null;
		}

		getVideoArgs(data) {
			if (!data) { return null; }
			let swfcfg = this.getVideoSwfcfg(data);
			if (swfcfg.hasOwnProperty("args")) {
				return swfcfg.args;
			}
			return null;
		}

		// getVideoTitle(videoArgs) {
		// 	if (!videoArgs || !videoArgs.hasOwnProperty("title")) { return null; }

		// 	return videoArgs.title;
		// }

		getVideoTitle(data = []) {
			if (!data[2]) { 
				return null; 
			}

			let title = data[2].title;

			if (title && typeof title === "string") {
				return this.adjustTitle(title);
			}

			return null;
		}

		getVideoTitleFromGetVidInfo(data) {
			let title = /title=.*/.exec(data)[0].split("&")[0];
			title = title.split("title=")[1];
			title = title.replace(/\+/g," ");
			title = decodeURIComponent(title);

			return title;
		}

		adjustTitle(title) {
			return title.replace(REMOVE_TRAILING_YOUTUBE_REGEX, "");
		}

		rebuildVideoStringFromStreamingDataVideoObject(streamingDataVideoObject) {
			let videoStringArray = [];

			for (let key in streamingDataVideoObject) {
				let value = streamingDataVideoObject[key];

				if (key === "cipher") { continue; }
				
				if (key === "contentLength") {
					key = "clen";
				} else if (key === "mimeType") {
					key = "type";
				} else if (key === "qualityLabel") {
					key = "quality_label";
				}

				if (key === "type") {
					value = value.replace(/\s/g, "+");
				}

				value = encodeURIComponent(value);

				videoStringArray.push(`${key}=${value}`);
			}

			return videoStringArray.join("&");
		};

		extractVideosFromStreamingDataPlayerResponse(swfcfg, formatType) {
			try {
				let playerResponse = swfcfg && swfcfg.args && swfcfg.args["player_response"];
				let urls = [];

				if (!playerResponse) { 
					throw new Error("YouTubeParser.extractVideosFromStreamingDataPlayerResponse: 'player_response' is missing");
				}

				if (formatType !== FORMAT_TYPE.FORMATS 
					&& formatType !== FORMAT_TYPE.ADAPTIVE_FORMATS) {
					throw new Error("YouTubeParser.extractVideosFromStreamingDataPlayerResponse: 'formats' or 'adaptiveFormats' is missing");
				}

				playerResponse = JSON.parse(playerResponse);
				if (!playerResponse.streamingData || !playerResponse.streamingData[formatType]) {
					throw new Error("YouTubeParser.extractVideosFromStreamingDataPlayerResponse: 'streamingData' is missing");
				}

				for (let format of playerResponse.streamingData[formatType]) {
					let videoObject = format;
					let url = this.rebuildVideoStringFromStreamingDataVideoObject(videoObject);

					if (format.cipher) {
						url += `&${format.cipher}`;
					}

					urls.push(url);
				}

				return urls;

			} catch(ex) {
				error(ex);

				return null;
			}
		};

		// getRawGetVidInfoVideoDataArray(data) {
		// 	log("getRawGetVidInfoVideoDataArray");
		// 	let rawVideoData = /url_encoded_fmt_stream_map=.*/.exec(data)[0].split("&")[0];
		// 	rawVideoData = rawVideoData.split("url_encoded_fmt_stream_map=")[1];
		// 	rawVideoData = decodeURIComponent(rawVideoData);
		// 	let rawVideoDataArray = rawVideoData.split(",");

		// 	log(rawVideoData);
		// 	log(rawVideoDataArray);

		// 	return rawVideoDataArray;
		// }

		getRawVideoDataArray(data) {
			let swfcfg = this.getVideoSwfcfg(data);
			let stringifiedData = null;
			let rawVideoDataArray = null;

			if (typeof data === "object") {
				stringifiedData = JSON.stringify(data);
			}

			log(stringifiedData);

			let rawVideoData = /"url_encoded_fmt_stream_map"\s*:\s*"([^"]*)/.exec(stringifiedData);
			if (rawVideoData && rawVideoData[1]) {
				rawVideoDataArray = rawVideoData[1].split(",");
			} else {
				rawVideoDataArray = this.extractVideosFromStreamingDataPlayerResponse(swfcfg, "formats");
			}

			// log(rawVideoDataArray)
			
			log(rawVideoDataArray);
			// let adaptiveData = /"adaptive_fmts"\s*:\s*"([^"]*)/.exec(stringifiedData)[1];
			// let adaptiveDataArray = adaptiveData.split(",");
			// log(adaptiveDataArray);
			// rawVideoDataArray = [...rawVideoDataArray, ...adaptiveDataArray];

			log(rawVideoDataArray);
			// log(/"adaptive_fmts"\s*:\s*"([^"]*)/.exec(stringifiedData)[1]);
			return rawVideoDataArray;
		}


		getVideoDataArray(rawVideoDataArray) {
			let videoDataArray = [];

			// log(rawVideoDataArray);

			for (let rawVideoData of rawVideoDataArray) {
				let url, quality, fileType, itag, sig, s;

				// rawVideoData = unescape(rawVideoData);
				// log(rawVideoData);
				url = quality = fileType = itag = sig = s = null;
				let delimiter = this.getDelimiter(rawVideoData);
			    let params = rawVideoData.split(delimiter);
			    log(params);
			    for (let param of params) {
			    	// log(param);
			    	url 		= param.includes(URL) 		? param.split(URL)[1] 				: url;
			    	quality 	= param.includes(QUALITY) 	? param.split(QUALITY)[1] 			: quality;
			    	fileType	= param.includes(TYPE) 		? param.split(TYPE)[1] 				: fileType;
			    	itag 		= param.includes(ITAG) 		? parseInt(param.split(ITAG)[1]) 	: itag;
			    	sig 		= param.includes(SIG) 		? param.split(SIG)[1] 				: sig;
			    	s 			= param.includes(S) && param.substring(0,2) == S ? param.split(S)[1] : s;
			    	// log(param.includes(S));
			    	// log(param.substring(0,2) === S);
			    	// log(s);
			    	// log(param.split(S)[1]);
			    }

			    // if (!this.hasSig(url)) {
			    // 	// log("no sig");
			    // 	// log(sig);
			    // 	url = this.adjustSig(url, sig);
			    // }

			    log({
			    	url,
			    	quality,
			    	fileType,
			    	itag,
			    	sig,
			    	s
			    });

			    videoDataArray.push({
			    	url,
			    	quality,
			    	fileType,
			    	itag,
			    	sig,
			    	s
			    });
			}

			return videoDataArray;
		}

		isItagExistInFormatMap(itag) {
			return FORMAT_MAP.hasOwnProperty(itag);
		}

		getVideoParamsList(videoDataArray, title, playerJSUrl) {
			let videoFilenameLabel = FileLabel.getDesignatedVideoFilenameLabel();
			let videoParamsList = new YouTubeVideoParamsList();
			let popupLabelFormat = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);	// to be displayed in the popup
			let downloadWindowFilenameFormat = new FileLabel(videoFilenameLabel, FileData.CATEGORY.VIDEO);	// to be saved/downloaded - the actual filename

			for (let videoData of videoDataArray) {
				if (!this.isItagExistInFormatMap(videoData.itag)) {
					continue;
				}

				let formatMapItem = FORMAT_MAP[videoData.itag];

			    videoParamsList.push(new VideoParams({
			    	isYouTube 		: true,
					url 			: videoData.url,								// "\u0026" is an "&"
					quality 		: videoData.quality,							// example, "large", "medium"
					fileType 		: formatMapItem.fileType,			// example, "video/x-flv"
					fileExt 		: formatMapItem.fileType,
					itag 			: formatMapItem.resolution,		// example, "34", "43" (video quality - hd and such)
					formatKey	 	: formatMapItem.fileType,
					qualityKey	 	: formatMapItem.resolution,
					s				: videoData.s,
					isSigOk 		: this.isSigOk(videoData.s),
					playerJSUrl 	: playerJSUrl,
					docTitle 		: title,
					docUrl 			: this.url,
					docDomain 		: Utils.getHost(this.url),
					category 		: FileData.CATEGORY.VIDEO,
					popupLabelFormatString: popupLabelFormat.toString(),			// converts it to a format string
					downloadWindowFilenameFormatString: downloadWindowFilenameFormat.toString()	// converts it to a format string
					// isUseLabelAsFilename : true
			    }).JSONParse());

			    log(new VideoParams({
			    	isYouTube 		: true,
					url 			: videoData.url,								// "\u0026" is an "&"
					quality 		: videoData.quality,							// example, "large", "medium"
					fileType 		: formatMapItem.fileType,			// example, "video/x-flv"
					fileExt 		: formatMapItem.fileType,
					itag 			: formatMapItem.resolution,		// example, "34", "43" (video quality - hd and such)
					formatKey	 	: formatMapItem.fileType,
					qualityKey	 	: formatMapItem.resolution,
					s				: videoData.s,
					isSigOk 		: this.isSigOk(videoData.s),
					playerJSUrl 	: playerJSUrl,
					docTitle 		: title,
					docUrl 			: this.url,
					docDomain 		: Utils.getHost(this.url),
					category 		: FileData.CATEGORY.VIDEO,
					popupLabelFormatString: popupLabelFormat.toString(),			// converts it to a format string
					downloadWindowFilenameFormatString: downloadWindowFilenameFormat.toString()	// converts it to a format string
					// isUseLabelAsFilename : true
			    }));
			}

			return videoParamsList;
		}

		isSwfcfgExist(data) {
			try {
				return !!this.getVideoSwfcfg(data);
			} catch(ex) {
				error(ex);
				return false;
			}
		}

		// async getParsedDataGetVidInfo(data, rawDataFetchRaw) {
		// 	log(data);
		// 	log(rawDataFetchRaw);
		// 	// let playerJSUrl = this.getPlayerJSUrlFromGetVidInfo();
		// 	let playerJSUrl = this.getPlayerJSUrl(rawDataFetchRaw);
		// 	log(playerJSUrl);
		// 	let title = this.getVideoTitleFromGetVidInfo(data);
		// 	log(title);
		// 	let rawVideoDataArray = this.getRawGetVidInfoVideoDataArray(data);
		// 	log(rawVideoDataArray);
		// 	let videoDataArray = this.getVideoDataArray(rawVideoDataArray);
		// 	log(videoDataArray);
		// 	let videoParamsList = this.getVideoParamsList(videoDataArray, title, playerJSUrl);
		// 	videoParamsList.sort();

		// 	return { playerJSUrl, title, videoDataArray, videoParamsList };
		// }

		getParsedData(data) {
			log(data);
			if (!this.isSwfcfgExist(data)) {
				warn("YouTubeParser.getParsedData: 'swfcfg' is not found");
				return null;
			}

			let playerJSUrl = this.getPlayerJSUrl(data);
			let title = this.getVideoTitle(data);
			let rawVideoDataArray = this.getRawVideoDataArray(data);
			let videoDataArray = this.getVideoDataArray(rawVideoDataArray);
			let videoParamsList = this.getVideoParamsList(videoDataArray, title, playerJSUrl);
			videoParamsList.sort();
			// this.sortVideoParamsList(videoParamsList);
			log(playerJSUrl);
			return { playerJSUrl, title, videoDataArray, videoParamsList };
		}

		getParsedDataFromWatchDocument(watchDocument, data) {
			let docStringified = this.getStringifiedDocument(watchDocument);
			let playerJSUrl = this.getPlayerJSUrlFromWatchDocument(docStringified);
			let title = this.getVideoTitle(data);
			let rawVideoDataArray = this.getRawVideoDataArray(docStringified);
			let videoDataArray = this.getVideoDataArray(rawVideoDataArray);
			let videoParamsList = this.getVideoParamsList(videoDataArray, title, playerJSUrl);
			videoParamsList.sort();

			return { playerJSUrl, title, videoDataArray, videoParamsList };
		}

		getPlayerJSUrlFromWatchDocument(docStringified) {
			let result = PLAYER_JS_URL_REGEX.exec(docStringified);

			if (result) {
				let playerJSPath = result[1];
				return `https:\/\/youtube.com\/${playerJSPath}`;
			}

			return null;
		}

		getPlayerJSUrlFromGetVidInfo(data = document.documentElement.innerHTML) {
			let playerJSUrl = /ytplayer.config\s*=\s*.*(assets.*("js":"(.*?)"))/.exec();
			if (playerJSUrl) {
				playerJSUrl = playerJSUrl[playerJSUrl.length-1];
				playerJSUrl = `https:\/\/youtube.com\/${playerJSUrl}`;
				log(playerJSUrl);

				return playerJSUrl;
			}

			playerJSUrl = /script\s*src="(.*base.js)"/.exec(document.documentElement.innerHTML);
			if (playerJSUrl) {
				playerJSUrl = playerJSUrl[playerJSUrl.length-1];
				playerJSUrl = `https:\/\/youtube.com\/${playerJSUrl}`;
				log(playerJSUrl);

				return playerJSUrl;
			}
		}

		getStringifiedDocument(doc) {
			return doc instanceof HTMLDocument ?
				doc.documentElement.outerHTML : null;
		}
	}

	return YouTubeParser;
})();

class YouTubeVideoParamsList extends VideoParamsList {
	constructor() {
		super();

		this.isSigDecRequired = false;
	}

	get IsSigDecRequired() {
		return this.isSigDecRequired;
	}

	push(videoParams) {
		super.push(videoParams);

		if (!videoParams.isSigOk) {
			this.isSigDecRequired = true;
		}		
	}

	appendSigsToUrls() {
		try {
			for (let videoParams of this.List) {
				log(videoParams);
				if (!this.isSigExistInUrl(videoParams.url)) {
					videoParams.url += "&sig=" + videoParams.s;
				}
			}
		} catch(ex) {
			error(ex);
		}
	}

	updateSigs(sigBatchArray) {
		for (let i = 0; i < sigBatchArray.length; i++) {
			let sigBatchItem = sigBatchArray[i];
			let videoParams = this.List[i];

			if (videoParams.s === sigBatchItem.s) {
				videoParams.s = sigBatchItem.decS;
			} else {
				return false;
			}
		}

		return true;
	}

	isSigExistInUrl(url) {
		try {
			let paramArray = Utils.getUrlSearchParams(decodeURIComponent(url));

			return paramArray.indexOf("signature=") > 0;
		} catch(ex) { 
			error(ex);
		}
	}

	extractSigBatchArray() {
		let sigs = [];

		for (let videoParams of this.List) {
			if (!videoParams.s) { return null; }
			
			sigs.push({
				s: videoParams.s,
				decS: null
			});
		}

		return sigs;
	}

	sort() {
		this.List.sort((a, b) => {
			// if (this.isAudioFile(a.fileType)) { return 1; }
			// if (this.isAudioFile(b.fileType)) { return -1; }
			if (parseInt(a.itag) < parseInt(b.itag)) { return -1; }
			else if (parseInt(a.itag) > parseInt(b.itag)) { return 1; }
			else if (a.fileType === "flv") { return 1; }	// flv is bigger than 3gp
			else if (a.fileType === "webm") { return 1; } 	// webm is bigger than mp4 (usually)
			// else if (a.fileType === "m4a") { return 1; } 	// webm is bigger than mp4 (usually)
			// else if (a.fileType === "weba") { return 1; } 	// webm is bigger than mp4 (usually)
			else { return 0; }
		});
	}

	// helps to sort the array
	isAudioFile(fileType) {
		fileType = fileType.toLowerCase();

		return fileType === "weba" || fileType === "m4a";
	}

	// helps to sort the array
	checkForBothAudioItags(itag1, itag2) {
		return this.isAudioFile(itag1) && this.isAudioFile(itag2);
	}

	// helps to sort the array
	compareAudioFiles(a, b) {
		if (a.fileType === "m4a" && b.fileType === "m4a") {
			if (parseInt(a.itag) === 128) { return 1; }	// a is "128", b is "48"
			return -1;	// b is "128", a is "48"
		}

		if (a.fileType === "weba" && b.fileType === "weba") {
			return parseInt(a.itag) - parseInt(b.itag);
		}

		// if (a.fileType === "weba") {
		// 	if (parseInt(a.itag) === 160) {
		// 		return 1;
		// 	}

		// 	// if (parseInt(a.itag === 128))
		// }
	}

}

class YouTubeWatchUrl extends WatchUrl {
	constructor() {
		super();
	}

	isWatchUrl(url) {
		log(url);
		let splitUrl = url.toLowerCase().split("/");
		
		return splitUrl[3].match(/\bwatch/) != null ? true : false;
	}

	getVideoIdFromUrl(url) {
		let anchor = Utils.getAnchor(url);
		let videoId = anchor.search.split("v=")[1];

		return videoId || false;
	}
}