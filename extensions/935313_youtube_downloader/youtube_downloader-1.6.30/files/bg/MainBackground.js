function Request (method, url, onSuccess, onFail) 
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4)
		{
			if (xmlHttp.status == 200)
				onSuccess(xmlHttp.responseText);
			else
				onFail(xmlHttp.statusText)
		}
	}
	xmlHttp.open(method, url, true); // true for asynchronous 
	xmlHttp.send(null);
}

var g_downloadManager = (function () {
	var _jsPlayerCache = {};
	var _cache = {};

	function __loadLinksForVideo(idVideo, callback, errback) {
		// Base youtube variables.
		var ytBaseUrl = "http://www.youtube.com/";
		var ytInfoAltB = ytBaseUrl + "oembed?url=",
			ytInfoAltA = "&format=json";
		var ytInfoUrlB = ytBaseUrl + "get_video_info?video_id=",
			ytInfoUrlA = "&el=embedded&ps=default&eurl=&hl=en_US";

		// Regexps
		var rGetId = /^(?:https?:\/\/)?(?:www.)?(?:youtu.be\/|youtube.com(?:\/embed\/|\/v\/|\/watch?v=|\/watch?.+&v=))([\w-]{11})(?:.+)/;
		var rStreamMap = /stream_map=(.[^&]*?)&/;
		var ftmFixMatch = /^(.*?)\\\\u0026/;

		// Const data
		var formats = {
			"37": ["MP4", "1080p", 0],
			"45": ["WebM", "1080p", 1],

			"22": ["MP4", "720p", 2],
			"44": ["WebM", "720p", 3],

			"18": ["MP4", "480p", 4],
			"43": ["WebM", "480p", 5],
			"35": ["FLV", "480p", 6],

			"34": ["FLV", "320p", 7],
			"36": ["3gp", "320p", 8],

			"5": ["FLV", "240p", 9],
			"13": ["3gp", "240p", 10],

			"6": ["FLV", "240p", 11],
			"17": ["3gp", "240p", 12]
		};

		function getYtInfo(idVideo, callback, errback) {
			var url = ytInfoUrlB + idVideo + ytInfoUrlA;
			Request("GET", url, callback, errback);
		}

		// Get video id.
		getYtInfo(idVideo, getVideodata, errback);

		function getVideodata(vInfo) {
			var title = Math.ceil(Math.random() * 10000000000) + "";
			try {
				title = decodeURIComponent(vInfo.match(/title=(.*?)$/i)[0].split("&")[0].split("=")[1]);
				title = title.replace(/[[:blank:]]+/, '_').replace(/[\s\+\-]/g, "_").replace(/[^\w\u0430-\u044f\u0410-\u042f\d_]/g, '').replace(/__/g, "_").replace(/__/g, "_").replace(/__/g, "_");
			} catch (ex) {}

			title = encodeURIComponent(title);

			var matchStream = vInfo.match(rStreamMap);
			if (matchStream && matchStream[1]) {
				var fmtUrl = decodeURIComponent(matchStream[1]);
				var fixFtmMatch = fmtUrl.match(ftmFixMatch);
				if (fixFtmMatch && fixFtmMatch[1]) {
					fmtUrl = fixFtmMatch[1];
				}

				var urls = fmtUrl.split(","),
					necessaryTags = ["sig", "url", "itag"],
					videos = {
						count: 0
					};

				for (var i = 0, li = urls.length; i < li; ++i) {
					var aDetailsVideo = urls[i].split("&");
					var videoInfo = {};
					for (var j = 0, lj = aDetailsVideo.length; j < lj; ++j) {
						for (var k = 0, lk = necessaryTags.length; k < lk; ++k) {
							var regTag = new RegExp("^" + necessaryTags[k] + "=");
							if (regTag.test(aDetailsVideo[j])) {
								videoInfo[necessaryTags[k]] = aDetailsVideo[j].split("=")[1];
							}
						}
					}
					if (videoInfo.sig && videoInfo.url && videoInfo.itag && formats[videoInfo.itag]) {
						videos[formats[videoInfo.itag][2]] = {
							url: decodeURIComponent(videoInfo.url) + "&signature=" + videoInfo.sig + "&title=" + title,
							format: formats[videoInfo.itag]
						};
						videos.count++;
					}
				}
				_cache[idVideo] = videos;
				callback(videos);
			} else {
				errback();
			}
		}
	}

	function _getLinksForVideo(idVideo, tab_id) {
		if (!_cache[idVideo]) {
			__loadLinksForVideo(idVideo,
				function ok(videos) {
					Events.sendMessage("fire_links_ok", {
						id: idVideo,
						videos: videos,
						error: 0
					}, tab_id);
				},
				function fail(data) {
					Events.sendMessage("fire_links_ok", {
						id: idVideo,
						error: data
					}, tab_id);
				});
		} else {
			Events.sendMessage("fire_links_ok", {
				id: idVideo,
				videos: _cache[idVideo],
				error: 0
			}, tab_id);
		}
	}

	function _downloadSignatureDecoderAndDownloadLinks(href, callback, failback) {
		var fmtParams = null;
		var jsPlayerURL = null;

		function parseCode(code) {
			try {
				if (code) {
					callback({
						code: code,
						fmt: fmtParams
					});
					if (jsPlayerURL) {
						_jsPlayerCache[jsPlayerURL] = code;
					}
				}
			} catch (e) {}
			fail();

		}

		function fail() {
			failback();
		}

		function parsePageContent(html) {
			var config = html.match(/ytplayer\.config\s+=\s+(.+?});/);
			if (!config) {
				config = html.match(/var ytInitialPlayerResponse\s*=\s*({[\w\W]+?});/);
			}
			if (config && config.length > 1) {
				try {
					config = JSON.parse(config[1]);
				} catch (e) {
					config = JSON.parse(decodeURIComponent(config[1]));
				}
			}
			if (config && config["args"] && config["args"]["fmt_list"] && config["args"]["url_encoded_fmt_stream_map"]) {
				fmtParams = config["args"];
				fmtParams["fmt_stream_map"] = fmtParams["url_encoded_fmt_stream_map"];
			} else if (config) {
				fmtParams = {};
				var ytInitialPlayerResponse = config["streamingData"] ? config : JSON.parse(config["args"]["player_response"]);
				fmtParams["formats"] = ytInitialPlayerResponse["streamingData"]["formats"];
			}
			if (fmtParams) {
				if (!config["assets"] || !config["assets"]["js"]) {
					jsPlayerURL = html.match(/"PLAYER_JS_URL":"([^"]+)"/);
					jsPlayerURL && jsPlayerURL.length == 2 && (jsPlayerURL = jsPlayerURL[1].replace(/\\\//g, '/'));
				} else {
					jsPlayerURL = config["assets"]["js"];
				}

				if (jsPlayerURL) {
					try {
						if (jsPlayerURL.substr(0, 2) === '//') {
							jsPlayerURL = 'https:' + jsPlayerURL;
						} else if (jsPlayerURL[0] === '/') {
							jsPlayerURL = 'https://www.youtube.com' + jsPlayerURL;
						}

						if (_jsPlayerCache[jsPlayerURL]) {
							parseCode(_jsPlayerCache[jsPlayerURL]);
						} else {
							Request("GET", jsPlayerURL, parseCode, fail);
						}
						return;
					} catch (e) {}
				}
			}
			fail();
		}

		Request("GET", href, parsePageContent, fail);
	}

	function _getParamFromUrl(url, keyName) {
		var value = "";
		var m = url.match(new RegExp("([\\?&#;]" + keyName + "=[^&\\?]+)", "gi"));
		if (m && m.length) {
			value = m[m.length - 1];
			value = value.substr(value.indexOf("=") + 1);
			value = decodeURIComponent(value);
		}
		return value;
	}

	function _getFileExt(mime) {
		switch (mime) {
			case 'video/webm':
				return "webm";
			case 'video/mp4':
				return "mp4";
			case 'video/3gpp':
				return "3gp";
			case 'video/3gpp2':
				return "3g2";
			case 'video/mpeg':
				return "mpg";
			case 'video/ogg':
				return 'ogg';
			case 'video/quicktime':
				return 'mov';
			case 'video/x-ms-wmv':
				return 'wmv';
			case 'video/x-flv':
				return 'flv';
			case 'video/avi':
				return "avi";
			default:
				return null;
		}
	}

	function _getFileNameFromUrl(url) {
		var title = _getParamFromUrl(url, "title");
		if (title) {
			return title.replace(/[\\\/:\?\*<>\|~"\s]+/g, "_");
		}
		return null;
	}

	function _getVideoNameFromUrl(url) {
		var ext = _getFileExt(_getParamFromUrl(url, "mime"));
		if (ext) {
			var name = _getFileNameFromUrl(url);
			if (name) {
				return name + "." + ext;
			}
		}
		return null;
	}

	var _downloadVideo = (function () {
		var _lastDownloadedUrls = [];

		return function (url) {
			if (_lastDownloadedUrls.indexOf(url) < 0) {
				_lastDownloadedUrls.push(url);

				setTimeout(function () {
					// prevent second download of the same url
					var indexEl = _lastDownloadedUrls.indexOf(url);
					if (indexEl >= 0) {
						_lastDownloadedUrls.splice(indexEl, 1);
					}
				}, 5000);

				setTimeout(function () {
					var params = {
						"url": url,
						"saveAs": true,
						"method": "GET",
						"conflictAction": "uniquify"
					};
					var filename = _getVideoNameFromUrl(url);
					if (filename) {
						params["filename"] = filename;
					}
					chrome.downloads.download(params, function() {
						d_log(chrome.runtime.lastError);
					});
				}, 300);
			}
		};
	})();

	return {
		getLinksForVideo: _getLinksForVideo,
		downloadSignatureDecoderAndDownloadLinks: _downloadSignatureDecoderAndDownloadLinks,
		downloadVideo: _downloadVideo
	}
})();

//--------------------------------------------------------------------------
// Initialization
//--------------------------------------------------------------------------	

function main() {
	function openTab(ignore, data) {
		if (typeof data.url !== "undefined") {
			g_downloadManager.downloadVideo(data.url);
		}
	}

	Events.addListener("openBYDTab", openTab);

	Events.addListener("get_links", function (type, idVideo, ignore, tab_id) {
		g_downloadManager.getLinksForVideo(idVideo, tab_id);
	});

	Events.addEventListener("get_sig_decoder", function (event) {
		var data = event.data;
		if (data && data.href) {
			g_downloadManager.downloadSignatureDecoderAndDownloadLinks(data.href, function (data) {
				event.reply({
					res: true,
					data: data
				});
			}, function () {
				event.reply({
					res: false
				});
			});
		}
	});
}

main();