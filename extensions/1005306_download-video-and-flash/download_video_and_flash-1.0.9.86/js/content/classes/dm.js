var DailymotionParser = (function() {
	const VIDEO_FILE_LABEL = "{{videoTitle}}";
	const VIDEO_FILENAME_LABEL = "{{videoTitle}} [{{quality}}].{{fileExt}}";
	const MATCH_PATTERN_REPORTING = /\"qualities\": *(\{.+\}),"reporting"/;
	const MATCH_PATTERN_SHARING = /\"qualities\": *(\{.+\}),"sharing"/;
	const TITLE_MATCH_PATTERN = /\"title\"\s*:\s*\".*?\"/;

	class DailymotionParser {
		constructor() {}

		async getParsedData(rawVideoData) {
			let title = this.getTitle(rawVideoData);
			let videoParamsList = this.attemptToParseDirectLinks(rawVideoData, title);

			if (videoParamsList) { 
				return { videoParamsList };
			}

			videoParamsList = await this.attemptToParseDashLinks(rawVideoData, title);
			// log(videoParamsList);

			return videoParamsList ? { videoParamsList } : null;
		}

		attemptToParseDirectLinks(rawVideoData, title) {
			let urlsPerQuality = rawVideoData.match(MATCH_PATTERN_REPORTING) ||
				rawVideoData.match(MATCH_PATTERN_SHARING);

			urlsPerQuality = urlsPerQuality ? urlsPerQuality[1] : null;
			if (!urlsPerQuality) { return false; }

			urlsPerQuality = JSON.parse(urlsPerQuality);

			let videoParamsList = this.getVideoParamsListFromDirectLinks(urlsPerQuality, title);

			return videoParamsList;
		}

		async attemptToParseDashLinks(rawVideoData, title) {
			let urlsPerQuality = rawVideoData.match(MATCH_PATTERN_REPORTING) ||
				rawVideoData.match(MATCH_PATTERN_SHARING);

			urlsPerQuality = urlsPerQuality ? urlsPerQuality[1] : null;
			if (!urlsPerQuality) { return false; }

			urlsPerQuality = JSON.parse(urlsPerQuality);

			if (urlsPerQuality["auto"] 
					&& urlsPerQuality["auto"][0]
					&& urlsPerQuality["auto"][0]["url"]) {
				let url = urlsPerQuality["auto"][0]["url"];
				let isM3u8 = this.verifyFileExtIsM3u8(url);

				let xhr = new XHR();
				let params = { url };

				let result = await xhr.send(params);
				let manifest = result.response;
				let parser = new m3u8Parser.Parser();

				parser.push(manifest);
				parser.end();

				let parsedManifest = parser.manifest;
				
				let videoParamsList = this.getVideoParamsListFromDashManifest(parsedManifest, title);

				return videoParamsList;
			}
		}

		verifyFileExtIsM3u8(url) {
			let anchor = Utils.getAnchor(url);
			let fileExt = anchor.pathname.substr(anchor.pathname.lastIndexOf(".") + 1);

			return fileExt === "m3u8" || fileExt === "m3u";
		}

		getVideoParamsListFromDirectLinks(urlsPerQuality, title) {
			// let fileLabel = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);
			let videoFilenameLabel = FileLabel.getDesignatedVideoFilenameLabel();
			let popupLabelFormat = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);	// to be displayed in the popup
			let downloadWindowFilenameFormat = new FileLabel(videoFilenameLabel, FileData.CATEGORY.VIDEO);	// to be saved/downloaded - the actual filename			
			let videoParamsList = [];

			for (let quality in urlsPerQuality) {
				let urlPerQuality = urlsPerQuality[quality];

				if (parseInt(quality)) {
					videoParamsList.push(new VideoParams({
						url 			: urlPerQuality[1].url,
						fileType 		: "mp4",
						contentType		: "mp4",
						quality 		: quality + "p",
						docTitle 		: title,
						docDomain 		: document.domain,
						docUrl 			: document.URL,
						contentLength 	: 0,
						category 		: FileData.CATEGORY.VIDEO,
						popupLabelFormatString : popupLabelFormat.toString(),
						downloadWindowFilenameFormatString: downloadWindowFilenameFormat.toString()	// converts it to a format string
					}).JSONParse());
				}
			}
			
			return videoParamsList.length > 0 ? videoParamsList : false;			
		}

		getVideoParamsListFromDashManifest(manifest, title) {
			let videoFilenameLabel = FileLabel.getDesignatedVideoFilenameLabel();
			let popupLabelFormat = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);	// to be displayed in the popup
			let downloadWindowFilenameFormat = new FileLabel(videoFilenameLabel, FileData.CATEGORY.VIDEO);	// to be saved/downloaded - the actual filename			
			let videoParamsList = {};

			let { playlists } = manifest;

			for (let item of playlists) {
				let quality = item.attributes["NAME"];
				let url = item.attributes["PROGRESSIVE-URI"];

				videoParamsList[quality] = new VideoParams({
					url,
					fileType 		: "mp4",
					contentType		: "mp4",
					quality 		: quality + "p",
					docTitle 		: title,
					docDomain 		: document.domain,
					docUrl 			: document.URL,
					contentLength 	: 0,
					category 		: FileData.CATEGORY.VIDEO,
					popupLabelFormatString : popupLabelFormat.toString(),
					downloadWindowFilenameFormatString: downloadWindowFilenameFormat.toString()	// converts it to a format string
				}).JSONParse();
			}

			let videoParamsListArray = Object.keys(videoParamsList)
				.map(key => videoParamsList[key]);

			return videoParamsListArray.length > 0 ? videoParamsListArray : false;	
		}

		getTitle(rawVideoData) {
			let title = rawVideoData.match(/"title"\s*:\s*".*?"/)[0];

			if (!title) { return document.title; }
			let titleObject = JSON.parse(`{${title}}`);
			
			return titleObject.title;
		}
	}

	return DailymotionParser;
})();

let DailymotionVideoDetailsFetcher = (function() {
	const CONFIG_URL = "http://www.dailymotion.com/embed/video/{{videoId}}/";

	class DailymotionVideoDetailsFetcher extends VideoDetailsFetcher {
		constructor(videoId) {
			super(videoId, CONFIG_URL);
		}
	}

	return DailymotionVideoDetailsFetcher;
})();

class DailymotionWatchUrl extends WatchUrl {
	constructor() {
		super();
	}

	isWatchUrl(url) {
		let splitUrl = url.toLowerCase().split("/");

		return splitUrl[3].match(/\bvideo/) != null ? true : false;
	};

	getVideoIdFromUrl(url) {
		let anchor = Utils.getAnchor(url);
		let videoId = anchor.pathname.split("/")[2]

		if (!this.isValidVideoIdLength(videoId)) {
			return null;
		}

		return videoId || null;
	}

	isValidVideoIdLength(videoId) {
		return videoId && 
			typeof videoId === "string" && 
			videoId.length >= 5 && 
			videoId.length <= 7;
	}
}