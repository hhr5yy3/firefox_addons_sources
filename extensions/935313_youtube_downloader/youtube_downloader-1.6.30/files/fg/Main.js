var g_downloadButtonItem = null;
var g_downloadMenuItem = null;
var g_downloadMenuContentItem = null;
var g_decodeSignature = null;
var g_transformUrl = null;

function cyr2latChars(str) {
	var cyr2latChars = new Array(
		['\u0430', 'a'], ['\u0431', 'b'], ['\u0432', 'v'], ['\u0433', 'g'], ['\u0434', 'd'], ['\u0435', 'e'], ['\u0451', 'yo'], ['\u0436', 'zh'], ['\u0437', 'z'], ['\u0438', 'i'], ['\u0439', 'y'], ['\u043A', 'k'], ['\u043B', 'l'], ['\u043C', 'm'], ['\u043D', 'n'], ['\u043E', 'o'], ['\u043F', 'p'], ['\u0440', 'r'], ['\u0441', 's'], ['\u0442', 't'], ['\u0443', 'u'], ['\u0444', 'f'], ['\u0445', 'h'], ['\u0446', 'c'], ['\u0447', 'ch'], ['\u0448', 'sh'], ['\u0449', 'shch'], ['\u044A', ''], ['\u044B', 'y'], ['\u044C', ''], ['\u044D', 'e'], ['\u044E', 'yu'], ['\u044F', 'ya'],

		['\u0410', 'A'], ['\u0411', 'B'], ['\u0412', 'V'], ['\u0413', 'G'], ['\u0414', 'D'], ['\u0415', 'E'], ['\u0401', 'YO'], ['\u0416', 'ZH'], ['\u0417', 'Z'], ['\u0418', 'I'], ['\u0419', 'Y'], ['\u041A', 'K'], ['\u041B', 'L'], ['\u041C', 'M'], ['\u041D', 'N'], ['\u041E', 'O'], ['\u041F', 'P'], ['\u0420', 'R'], ['\u0421', 'S'], ['\u0422', 'T'], ['\u0423', 'U'], ['\u0424', 'F'], ['\u0425', 'H'], ['\u0426', 'C'], ['\u0427', 'CH'], ['\u0428', 'SH'], ['\u0429', 'SHCH'], ['\u042A', ''], ['\u042B', 'Y'], ['\u042C', ''], ['\u042D', 'E'], ['\u042E', 'YU'], ['\u042F', 'YA'],

		['a', 'a'], ['b', 'b'], ['c', 'c'], ['d', 'd'], ['e', 'e'], ['f', 'f'], ['g', 'g'], ['h', 'h'], ['i', 'i'], ['j', 'j'], ['k', 'k'], ['l', 'l'], ['m', 'm'], ['n', 'n'], ['o', 'o'], ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'], ['t', 't'], ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'], ['z', 'z'],

		['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E'], ['F', 'F'], ['G', 'G'], ['H', 'H'], ['I', 'I'], ['J', 'J'], ['K', 'K'], ['L', 'L'], ['M', 'M'], ['N', 'N'], ['O', 'O'], ['P', 'P'], ['Q', 'Q'], ['R', 'R'], ['S', 'S'], ['T', 'T'], ['U', 'U'], ['V', 'V'], ['W', 'W'], ['X', 'X'], ['Y', 'Y'], ['Z', 'Z'],

		[' ', '-'], ['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['-', '-']
	);

	var newStr = new String();

	for (var i = 0; i < str.length; i++) {
		ch = str.charAt(i);
		var newCh = '';

		for (var j = 0; j < cyr2latChars.length; j++) {
			if (ch == cyr2latChars[j][0]) {
				newCh = cyr2latChars[j][1];
			}
		}

		newStr += newCh;
	}
	// remove repeated symbols - we replace spaces on them
	return newStr.replace(/[-]{2,}/gim, '-').replace(/\n/gim, '');
}

//--------------------------------------------------------------------------
// Main
//--------------------------------------------------------------------------	

/**
 *	Called only for Youtube Watch page
 */
function injectToYouTubeWatchPage() {
	// Adding button
	if (addYouTubeWatchPageDownloadButton()) {
		// Reduce UI if necessary for some languages
		reduceSpaceOccupiedByYouTubeBarIfNecessary();

		// Adding menu
		addYouTubeWatchPageMenuPanel();

		// Download signature decoder and then update data
		getSignatureDecoder();
	}
}

//--------------------------------------------------------------------------
// Button
//--------------------------------------------------------------------------	

/**
 *	Add download button to Youtube website.
 */
function addYouTubeWatchPageDownloadButton() {
	// New button
	g_downloadButtonItem && g_downloadButtonItem.remove();
	g_downloadButtonItem = null;
	
	var downloadButtonItem = document.createElement('button');
	downloadButtonItem.className = 'addto-button watch show-label yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded mm_download_button';
	downloadButtonItem.setAttribute('style', 'display:none;');
	downloadButtonItem.setAttribute('title', 'Download');
	downloadButtonItem.setAttribute('type', 'button');
	downloadButtonItem.setAttribute('data-button-action', '');
	downloadButtonItem.setAttribute('role', 'button');
	downloadButtonItem.setAttribute('aria-pressed', 'false');
	downloadButtonItem.setAttribute('data-tooltip', 'Download this video');
	downloadButtonItem.setAttribute('data-tooltip-title', '');
	downloadButtonItem.setAttribute('data-tooltip-timer', '6761');
	var byd_plus_button = document.createElement('div');
	byd_plus_button.className = 'yt-uix-button-icon-wrapper byd_plus_button';
	downloadButtonItem.appendChild(byd_plus_button);
	var span1 = document.createElement('span');
	span1.className = 'yt-uix-button-content';
	var span2 = document.createElement('span');
	span2.className = 'addto-label';
	span2.textContent = chrome.i18n.getMessage("download");
	span1.appendChild(span2);
	downloadButtonItem.appendChild(span1);
	var byd_arrow_button = document.createElement('div');
	byd_arrow_button.className = 'yt-uix-button-icon-wrapper byd_arrow_button';
	downloadButtonItem.appendChild(byd_arrow_button);
	
	downloadButtonItem = $(downloadButtonItem);

	// Button OnClick event
	downloadButtonItem.click(function (event) {
		if (g_downloadMenuContentItem) {
			if (g_downloadMenuContentItem.hasClass("active-panel")) {
				setDisplayYouTubeWatchPageMenuPanel(false);
			} else {
				setDisplayYouTubeWatchPageMenuPanel(true);
			}
		}
		event.stopPropagation();
	});


	var inserted = false;

	// do not use getElementById("menu"). Youtube's page contains a lot of such items!
	// do not use getElementById("top-level-buttons"). Youtube's page contains a lot of such items!
	var old_container = "#menu-container #menu #top-level-buttons-computed";
	var new_container = "#actions #menu #top-level-buttons-computed";
	var panelSelector = document.querySelector(new_container) ? new_container : old_container;
	var panel = $(panelSelector);
	if (panel.length) { // like, dislike, share panel
		panel.prepend(downloadButtonItem);
		inserted = true;
	} else {
		var container = $(".yt-uix-button-panel .spf-link .yt-uix-button-subscription-container").parent();
		if (container.length) {
			container.append(downloadButtonItem);
			inserted = true;
		} else if ($("#watch7-subscription-container").length) {
			$("#watch7-subscription-container").append(downloadButtonItem);
			inserted = true;
		}
		// Adding button before element which goes after "watch-flag".
		else if ($("#watch8-secondary-actions").length) {
			$("#watch8-secondary-actions").append(downloadButtonItem);
			inserted = true;
		}
	}

	if (inserted) {
		g_downloadButtonItem = downloadButtonItem;
		// Setting event handler for handling clicks outside the menu.
		$('html').click(function () {
			setDisplayYouTubeWatchPageMenuPanel(false);
		});
		var resize_download_button = function () {
			var label_hided = ($('.view-count').offset().left + $('.view-count').width()) > $('.mm_download_button').offset().left;
			var cur_delta = parseInt(g_downloadButtonItem.offset().left + g_downloadButtonItem.width() - $('.view-count').offset().left);
			var prev_delta = parseInt(g_downloadButtonItem.attr('prev_delta') || cur_delta);

			if (label_hided && !g_downloadButtonItem.hasClass('short') && cur_delta <= prev_delta) {
				g_downloadButtonItem.addClass('short');
			} else if (!label_hided && g_downloadButtonItem.hasClass('short') && cur_delta > prev_delta) {
				g_downloadButtonItem.removeClass('short');
			}

			g_downloadButtonItem.attr('prev_delta', cur_delta);
		}
		$(window).resize(function () {
			setDisplayYouTubeWatchPageMenuPanel(false);
			resize_download_button();
		});
		setTimeout(function () {
			resize_download_button();
		}, 2000);
	}
	return inserted;
}

/**
 *	With popular movies and transcript feature,
 *	sometime the could be less space when required for our download button.
 *	As a result, last buttons will be wrapped into next line.
 *	We would like to ommit this by removing title from "like" button in this case.
 *
 */
function reduceSpaceOccupiedByYouTubeBarIfNecessary() {
	// Determine current language
	var language = getYouTubeWatchPageCurrentLanguage();

	// Languages for each there is a need to reduce bar.
	var reduceSpaceForLanguages = [
		// Required 100% by our tests:
		"eu", "sw", "bg", "uk", "el",
		// Recommended (to avoid possible problems with "watch-transcript" button)
		"ca", "de", "es", "es-419", "gl", "zu", "it", "lt", "hu", "pt",
		"ro", "sl", "sk", "fi", "ru", "ur", "fa", "mr", "bn", "ta"
	];

	// Determine if it is needed to process.
	var shouldReduce = false;
	for (var i = 0; i < reduceSpaceForLanguages.length; i++) {
		if (reduceSpaceForLanguages[i] == language) {
			shouldReduce = true;
		}
	}

	if (shouldReduce) {
		// Removing text "Like"
		$("#watch-like span.yt-uix-button-content").remove();

		// Adjust CSS
		var watchLikeJQ = $("#watch-like");
		watchLikeJQ.css("margin-right", "0px");
		watchLikeJQ.css("width", "35px");
	}
}

//--------------------------------------------------------------------------
// Menu Panel
//--------------------------------------------------------------------------	

/**
 *	Adds menu panel.
 */
function addYouTubeWatchPageMenuPanel() {
	// HTML
	g_downloadMenuItem && g_downloadMenuItem.remove();
	g_downloadMenuContentItem = document.createElement('ul');
	g_downloadMenuContentItem.className = 'menu-panel content';
	g_downloadMenuContentItem = $(g_downloadMenuContentItem);
	g_downloadMenuItem = document.createElement('div');
	g_downloadMenuItem.className = 'yt-uix-button-menu mm_download_menu';
	g_downloadMenuItem = $(g_downloadMenuItem).append(g_downloadMenuContentItem);

	// Appending menu
	$("body").append(g_downloadMenuItem);

	// Clicking on any element will force menu to close.
	// We should avoid menu closing by clicking on menu serface.
	g_downloadMenuItem.click(function (event) {
		event.stopPropagation();
	});
}

/**
 *	Adject menu position based on button coordinates.
 */
function adjustYouTubeWatchPageMenuPanelPosition() {
	// Elements
	if (g_downloadButtonItem && g_downloadMenuItem) {
		// Moving panel into place
		var newOffset = g_downloadButtonItem.offset();
		newOffset.top += 31;
		g_downloadMenuItem.offset(newOffset);
	}
}

/**
 *	Popup Download Panel.
 *
 *	@param shouldDisplay 	Pass true to display and false to hide.
 */
var setDisplayYouTubeWatchPageMenuPanel = (function () {
	var isDownloadMenuVisible = false;

	return function (shouldDisplay) {
		// Checking state
		if (g_downloadButtonItem && g_downloadMenuItem && g_downloadMenuContentItem &&
			shouldDisplay != isDownloadMenuVisible) {
			// Updating state
			isDownloadMenuVisible = shouldDisplay;

			// Showing/Hiding panel
			if (shouldDisplay) {
				// Adjusting menu position
				adjustYouTubeWatchPageMenuPanelPosition();

				// Styles
				g_downloadMenuItem.css('visibility', 'visible');
				g_downloadMenuContentItem.addClass("active-panel");
				g_downloadButtonItem.addClass("yt-uix-button-active");
			} else {
				// Styles
				g_downloadMenuItem.css('visibility', 'hidden');
				g_downloadMenuContentItem.removeClass("active-panel");
				g_downloadButtonItem.removeClass("yt-uix-button-active");
			}
		}
	}
})();

function addHTMLTemplateForDownloadUrls(title, postfix, url) {
	if (g_downloadMenuContentItem) {
		var workElem = document.createElement('span');
		workElem.className = 'yt-uix-button-menu-item yt-uix-tooltip';
		workElem.setAttribute('url', url);
		workElem.setAttribute('data-possible-tooltip', '');
		workElem.setAttribute('data-tooltip-show-delay', '750');
		workElem.setAttribute('data-list-action', '');
		workElem.textContent = title;
		workElem = $(workElem);

		// Handling onclick event
		workElem.click(function (event) {
			// Getting URL
			var navigationURL = $(this).attr("url");

			// Action
			if (navigationURL) {
				// Added title to downloaded file
				var videoTitle = document.getElementById("watch-actions") ?
					document.getElementById('eow-title').title : document.title;

				var expr = new RegExp('["<>\*\?\|\\\:/]', 'g');

				var fullUrl = navigationURL + "&title=" + cyr2latChars(videoTitle.replace(expr, '_'));

				// fullUrl = fullUrl.replace(/\//g, "\\/").replace(/&/g, ":amp:").replace(/\?/g, ":quo:");

				Events.sendMessage("openBYDTab", {
					url: fullUrl
				});
			}

			// Closing menu
			setDisplayYouTubeWatchPageMenuPanel(false);
		});

		// Adding item
		g_downloadMenuContentItem.append($(document.createElement('li')).append(workElem));
	}
}

function clearDownloadLinks() {
	g_downloadMenuContentItem && g_downloadMenuContentItem.empty();
}

function showDownloadButton() {
	g_downloadButtonItem && g_downloadButtonItem.show();
}

/**
 *	Fetching video download links and add the into menu.
 */
function updateYouTubeWatchPageMenuPanelContent(fmt) {
	clearDownloadLinks();

	// Fetching download links
	var downloadLinks = [];
	if (fmt.fmt_list && fmt.fmt_stream_map) {
		downloadLinks = getLinksFromFormatListAndStreamMap(fmt.fmt_list, fmt.fmt_stream_map);
	} else if (fmt.formats) {
		downloadLinks = getLinksFromStreamingDataFormats(fmt.formats);
	}
	if (g_downloadMenuContentItem) {
		downloadLinks = removeYouTubeDownloadLinksDuplicates(downloadLinks);
		var addedSome = false;
		if (downloadLinks.length) {
			// Adding new menu items
			for (var i = 0; i < downloadLinks.length; i++) {
				// Download data
				var data = downloadLinks[i];
				if (data) {
					var url = data.url;
					if (data.signature && url.indexOf('&sig=') < 0) {
						url += ('&sig=' + data.signature);
					}
					addHTMLTemplateForDownloadUrls(getYouTubeDownloadLinkTitle(data), i, url)
					addedSome = true;
				}
			}
		}

		if (addedSome) {
			showDownloadButton();
		} else {
			var video = $("video[data-youtube-id]");
			if (video.length) {
				var videoID = $(video[0]).attr("data-youtube-id");
				Events.sendMessage("get_links", videoID);
			}
		}
	}
}

function linksFromBackground(type, videoObject) {
	if (videoObject.error === 0) {
		clearDownloadLinks();

		if (g_downloadMenuContentItem) {
			var videos = videoObject.videos;

			var addedSome = false;
			for (var key in videos) {
				if (typeof videos[key] == "object") {
					addHTMLTemplateForDownloadUrls(videos[key].format[0] + " " + videos[key].format[1], key,
						videos[key].url);
					addedSome = true;
				}
			}

			if (addedSome) {
				showDownloadButton();
			}
		}
	}
}


/**
 *	Get download link title based on information from newYouTubeDownloadLink.
 *
 *	@param information		Download information.
 *	@return					Title.
 */
function getYouTubeDownloadLinkTitle(information) {
	var title = "";
	var titleType = "";
	var titleQuality = "";

	// Analyzing type
	var type = information.type.toLowerCase();
	if (type.search("video/x-flv") != -1) titleType = "FLV";
	else if (type.search("video/mp4") != -1) titleType = "MP4";
	else if (type.search("video/3gpp") != -1) titleType = "3GP";
	else if (type.search("video/webm") != -1) titleType = "WebM";

	// Analyzing quality
	var quality = information.quality.toLowerCase();
	if (quality.search("small") != -1) titleQuality = "Low";
	else if (quality.search("low") != -1) titleQuality = "Low";
	else if (quality.search("medium") != -1) titleQuality = "Normal";
	else if (quality.search("large") != -1) titleQuality = "High";
	else if (quality.search("high") != -1) titleQuality = "High";
	else if (quality.search("hd720") != -1) titleQuality = "HD 1280X720";
	else if (quality.search("hd1080") != -1) titleQuality = "HD 1920X1080";

	// Combaining title
	if (titleType != "" && titleQuality != "") {
		title = titleType + " " + titleQuality;
	} else {
		title = "Unknown (" + type + "; " + quality + ")";
	}

	return title;
}


//--------------------------------------------------------------------------
// Localization
//--------------------------------------------------------------------------	

/**
 *	Get currentl selected language.
 *
 *	@return  String with language identificator.
 */
function getYouTubeWatchPageCurrentLanguage() {
	var language = "";

	// Getting text from <span> for selected language (in the bottom of Youtube page)
	language = $("html").attr("lang");

	return language;
}


//--------------------------------------------------------------------------
// Download Links
//--------------------------------------------------------------------------	

/**
 *  Inject decoder into page.
 */
function applyDecoder(data) {
	d_log("Injecting!");
	if (data.res) {
		data = data.data;
		g_decodeSignature = getDecodeSignatureFunc(data.code);
        g_transformUrl = getTransformUrlFunc(data.code);
		// Updating menu content
		updateYouTubeWatchPageMenuPanelContent(data.fmt);
	}
}

/**
 *  Try to get signature decoder for this particular video.
 */
var getSignatureDecoder = (function () {
	var m_curUrl = null;

	return function () {
		var curUrl = window.location.href;
		if (curUrl != m_curUrl) {
			m_curUrl = curUrl;
			Events.dispatchEvent("get_sig_decoder", {
				href: curUrl
			}, 0, function (event) {
				if (curUrl == m_curUrl && window.location.href == curUrl) {
					var data = event.data;
					applyDecoder(data);
					m_curUrl = null;
				}
			});
		}
	};
})();

/**
 *	Parsing fmt_list and fmt_stream_map and obtain link informations.
 *
 *	@param fmt_list			Format list.
 *	@param fmt_stream_map	Stream map.
 *	@return					Array with information about download links.
 */
function getLinksFromFormatListAndStreamMap(fmt_list, fmt_stream_map) {
	//alert(fmt_list);
	//alert(fmt_stream_map);
	var downloadLinks = [];

	try {
		// Splitting.
		var fmt_list_s = fmt_list.split(",");
		var fmt_stream_maps = fmt_stream_map.split(",");


		for (var i = 0; i < fmt_list_s.length; i++) {
			// Video variables.
			var vid_vars = fmt_stream_maps[i].split("&");

			// Video information (will be stored during parsing).
			var url = "";
			var sig = "";
			var conn = "";
			var stream = "";
			var type = "";
			var quality = "";
			var stereo3d = "0";
			var itag = "-1";
			var resolution = "";
			//var title = "";

			// Enumerating video variables.
			for (var j = 0; j < vid_vars.length; j++) {
				// Getting key and value.
				var key = vid_vars[j].substr(0, vid_vars[j].indexOf("="));
				var value = unescape(vid_vars[j].substr(vid_vars[j].indexOf("=") + 1));

				//alert("KEY: " + key + "	" + "Value: " + value);

				switch (key) {
					case "itag":
						if (itag == -1) itag = value;
						break;
					case "url":
						if (url == "" && conn == "") url = value;
						break;
					case "sig":
						if (sig == "") sig = value;
						break;
					case "s": // encrypted signature
						if (sig == "" && g_decodeSignature) {
							d_log("Decoding!");
							sig = g_decodeSignature(value);
						}
						break;
					case "conn":
						if (conn == "") conn = value;
						break;
					case "stream":
						if (stream == "") stream = value;
						break;
					case "type":
						if (type == "") type = value;
						break;
					case "quality":
						if (quality == "") quality = value;
						break;
					case "stereo3d":
						if (stereo3d == 0) stereo3d = value;
						break;
						//case "title": if (title=="") title=value; break;
					case "fallback_host":
						break;
					default:
						break;
				}
			}

			// Comparing mt_list and fmt_stream_maps.
			if (itag == fmt_list_s[i].split("/")[0]) {
				resolution = fmt_list_s[i].split("/")[1];
			} else {
				d_log("Error: fmt_list and fmt_stream_maps mismatch.");
			}


			// New download link.
			var newDownloadLink = null;
			if (url.length != 0) {
				newDownloadLink = newYouTubeDownloadLink(url, sig, type, resolution, quality, stereo3d, itag);
			} else if (conn.length != 0) {
				url = conn + (stream.length != 0 ? ("?" + stream) : "");
				newDownloadLink = newYouTubeDownloadLink(url, sig, type, resolution, quality, stereo3d, itag);
			}

			// If new URL information is ok.
			if (newDownloadLink != null) {
				// Adding to collection of URLs.
				downloadLinks.push(newDownloadLink);
			} else {
				d_log("Error: Unsupported protocol found.");
			}
		}

	} catch (e) {}

	return downloadLinks;
}

/**
 *	Get downloads links from Streaming Data Formats.
 *
 *	@param formats			Streaming Data Formats.
 *	@return					Array with information about download links.
 */
function getLinksFromStreamingDataFormats(formats) {
	//alert(fmt_list);
	//alert(fmt_stream_map);
	var downloadLinks = [];

	for (var i = 0; i < formats.length; i++) {
		
		var url = formats[i].url;
		var sig = '';
		if (formats[i].cipher || formats[i].signatureCipher) {
			var params = (formats[i].cipher || formats[i].signatureCipher).split('&');
			for (var k = 0; k < params.length; k++) {
				var pair = params[k].split('=');
				if (pair[0] == 'url') {
					url = decodeURIComponent(pair[1].replace(/\+/g, " "));
				} else if (pair[0] == 's') {
					if (g_decodeSignature) {
						d_log("Decoding!");
						sig = g_decodeSignature(decodeURIComponent(pair[1].replace(/\+/g, " ")));
					}
				}
			}
		}
        
        url = g_transformUrl(url);

		var link = newYouTubeDownloadLink(
			url, 
			sig, 
			formats[i].mimeType.split(';')[0], 
			formats[i].width + 'x' + formats[i].height, 
			formats[i].quality, 
			true,
			formats[i].itag);
		link && downloadLinks.push(link);
	}

	return downloadLinks;
}

/**
 * 	Return Download Link infromation based on parameters.
 *
 *	@param url				Download URL.
 *	@param type				Video type, for example: "video/3gpp", "video/mp4"
 *	@param resolution		Video resolution, for example: "176x144", "320x240"
 *	@param quality			Video quality, for example: "small", "medium", "high"
 *	@param stereo3d			Flag for stereo 3d.
 *	@param itag				Youtube itag.
 *	@return					Array with information.
 */
function newYouTubeDownloadLink(url, sign, type, resolution, quality, stereo3d, itag) {
	var information = null;

	try {
		if (url != "" && type != "" && stereo3d != "" && itag != "") {
			information = {
				"url": url,
				"signature": sign,
				"type": type, // TODO: FYI: type have code information sometimes, sample: "video/webm;+codecs="vp8.0,+vorbis""
				"resolution": resolution,
				"quality": quality,
				"stereo3d": stereo3d,
				"itag": itag
			};
		}
	} catch (e) {}

	return information;
}

/**
 *	Remove duplicates.
 *
 *	@param originalLinks		Array of original links.
 */
function removeYouTubeDownloadLinksDuplicates(originalLinks) {
	var resultLinks = [];

	try {
		// Enumerate original links
		for (var i = 0; i < originalLinks.length; i++) {
			var foundDuplicate = false;
			var oneOriginalLink = originalLinks[i];

			// Enumerating results
			for (var j = 0; j < resultLinks.length; j++) {
				var oneResultLink = resultLinks[j];

				// Comparing by (URL || (type && quality))
				if ((oneResultLink.url == oneOriginalLink.url) || (oneResultLink.type == oneOriginalLink.type && oneResultLink.quality == oneOriginalLink.quality)) {
					foundDuplicate = true;
					break;
				}

			}

			// Adding to results if not diplicated.
			if (!foundDuplicate) {
				resultLinks.push(oneOriginalLink);
			}
		}
	} catch (e) {}

	return resultLinks;
}

/**
 * Sets background - foreground event listeners
 *
 * @return none
 */
function initMessages() {
	Events.addListener("fire_links_ok", linksFromBackground);
}

var element_checker = (function () {
	var g_CurHref = null;

	function check() {
		setTimeout(check, 2000);
		var href = document.location.href;
		if (href != g_CurHref ||
			!g_downloadButtonItem ||
			!g_downloadButtonItem.parent().is(":visible")) {
			g_CurHref = href;
			injectToYouTubeWatchPage();
		}
	}
	return {
		start: function () {
			setTimeout(check, 3000);
		}
	}
})();

/**
 *	Main function will be called after all scripts for this application will be loaded.
 */
function main() {
	if (typeof window.YoutubeWatchPageDownloadButton373453443 == "undefined") {
		window.YoutubeWatchPageDownloadButton373453443 = true;
		injectToYouTubeWatchPage();
		initMessages();
		element_checker.start();
	}
}

main();