var VimeoParser = (function() {
	const VIDEO_FILE_LABEL = "{{videoTitle}}";
	const VIDEO_FILENAME_LABEL = "{{videoTitle}} [{{quality}}].{{fileExt}}";
	
	class VimeoParser {
		constructor() {}

		getParsedData(rawVideoData) {
			try {
				let videoDataDetails = JSON.parse(rawVideoData.response);
				let videoDataArray = videoDataDetails.request.files.progressive;
				let title = this.getTitle(rawVideoData);

				if (!videoDataArray) {
					throw new Error("VimeoParser.getParsedData: 'videoDataArray' is null");
				}

				log(videoDataArray);
				let videoParamsList = this.getVideoParamsList(videoDataArray, title);
				log(videoParamsList);
				return { videoParamsList };
			} catch(ex) {
				error(ex);
				return null;
			}
		}

		getVideoParamsList(videoDataArray, title) {
			let videoFilenameLabel = FileLabel.getDesignatedVideoFilenameLabel();
			let fileLabel = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);
			let popupLabelFormat = new FileLabel(VIDEO_FILE_LABEL, FileData.CATEGORY.VIDEO);	// to be displayed in the popup
			let downloadWindowFilenameFormat = new FileLabel(videoFilenameLabel, FileData.CATEGORY.VIDEO);	// to be saved/downloaded - the actual filename						
			let videoParamsList = [];

			for (let videoData of videoDataArray) {
				videoParamsList.push(new VideoParams({
					url 			: videoData.url,
					fileType 		: "mp4",
					contentType		: videoData.mime,
					quality 		: videoData.quality,
					docTitle 		: title,
					docDomain 		: document.domain,
					docUrl 			: document.URL,
					contentLength 	: 0,
					category 		: FileData.CATEGORY.VIDEO,
					popupLabelFormatString : popupLabelFormat.toString(),
					downloadWindowFilenameFormatString: downloadWindowFilenameFormat.toString()	// converts it to a format string
				}).JSONParse());
			}

			return videoParamsList.length > 0 ? videoParamsList : false;
		}

		getTitle(rawVideoData) {
			let videoDataDetails = JSON.parse(rawVideoData.response);

			return videoDataDetails.video.title;
		}
	}

	return VimeoParser;
})();

let VimeoVideoDetailsFetcher = (function() {
	const CONFIG_URL = "https://player.vimeo.com/video/{{videoId}}/config?";

	class VimeoVideoDetailsFetcher extends VideoDetailsFetcher {
		constructor(videoId) {
			super(videoId, CONFIG_URL);
		}

		fetchRaw() {
			return super.fetchRaw({ method: "GET" });
		}
	}

	return VimeoVideoDetailsFetcher;
})();

var VimeoWatchUrl = (function() {
	const VIDEO_ID_REGEXP = /^https?:\/\/(?:www\.)?vimeo.com\/([^\/]+)\/?$/;

	class VimeoWatchUrl extends WatchUrl {
		constructor() {
			super();
		}

		isWatchUrl(url) {
			log(url);
			return url.match(VIDEO_ID_REGEXP) !== null;
		};

		getVideoIdFromUrl(url) {
			let results = url.match(VIDEO_ID_REGEXP);	// array
			let videoId = results ? results[1] : false;

			return videoId;
		}
	}

	return VimeoWatchUrl;
})();