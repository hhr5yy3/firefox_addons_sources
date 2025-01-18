/**
 * Background video finder and downloader:
 * - find videos on webRequest.onHeadersReceived
 * - get video URL from content script's messages
 * - downloading play-lists,
 * - merging parts of streaming content.
 *
 * @date: 23.01.2017
 * @author: anastasiya.lubimova92@gmail.com
 */

// output debug info on development only
var debug = false;

// video ext by content-type
var videoExt = {
        'video/webm': 'webm',
        'video/mp4': 'mp4',
        'video/vivo': 'vivo',
        'video/x-flv': 'flv',
        'video/3gpp': '3gp',
        'video/msvideo': 'avi',
        'video/x-msvideo': 'avi',
        'application/x-troff-msvideo': 'avi',
        'video/x-ms-wmv': 'wmv',
        'video/mpeg': 'mpg',
        'video/quicktime': 'mov',
        'video/ogg': 'ogv',
        'application/x-mpegURL': 'm3u8',
        'application/vnd.apple.mpegurl': 'm3u8'
    },
// information about videos in tabs
    tabsInfo = {};

// hash function for creating Video Ids
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
};

// add video or m3u8 playlist to downloads
var downloadVideo = function (video) {

    if (video.url.search(".m3u8") > 0) {
        return downloadVideoFromPlaylist(video);
    }

    debug && console.log('Downloading file ' + video.url);

    chrome.downloads.download({
        url: video.url,
        filename: video.filename,
        saveAs: true
    }, function () {
        tabsInfo[video.tabId].videos[video.video_id]['started'] = false;
        debug && console.log('Download Finished: video_id=' + video.video_id);
    });
};

// message receiver
var processMessage = function (request, sender, sendResponse) {
    switch (request.msg) {
        case 'getVideos':
            sendResponse({
                fetchedVideos: tabsInfo[request.tabId]
            });

            break;

        case 'startDownloading':
            debug && console.log('Message: startDownloading tabId=' + request.tabId + " videoId=" + request.videoId);
            if (tabsInfo[request.tabId] && tabsInfo[request.tabId].videos[request.videoId]) {
                debug && console.log('Video was found in tabsInfo.');
                sendResponse({started: true});
                tabsInfo[request.tabId].videos[request.videoId]['started'] = true;
                downloadVideo(tabsInfo[request.tabId].videos[request.videoId]);
            } else {
                debug && console.log('Video was NOT found in tabsInfo.');
                sendResponse({started: false});
            }

            break;

        case 'checkVideoIsNew':
            debug && console.log('checkVideoIsNew');
            if (tabsInfo[sender.tab.id] && tabsInfo[sender.tab.id].videos)
                for (var vIndex in tabsInfo[sender.tab.id].videos)
                    if (tabsInfo[sender.tab.id].videos[vIndex].url == request.url)
                        return sendResponse({isNew: false});
            debug && console.log(true);
            sendResponse({isNew: true});

            break;
    }
};

var getVideoInfo = function (headers) {
    var info = {};

    for (var i = 0; i < headers.length; i++) {
        var header = headers[i],
            name = header.name,
            value = header.value;

        if (!name) {
            continue;
        }

        switch (name.toLowerCase()) {
            case 'content-type':
                info.type = value.split(';', 1)[0];
                break;

            case 'content-length':
                info.size = parseInt(value);
                info.formattedSize = formatSize(value);
                break;
        }
    }
    if (!info.size) {
        info.size = 0;
        info.formattedSize = '';
    }

    return info.type && videoExt[info.type] ? info : null;
};

function formatSize(bytes) {
    var thresh = 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

var parseFileName = function (url, type) {
    var clearedUrl = url.split('?', 1)[0],
        urlParts = clearedUrl.split('/'),
        filename = urlParts.length > 0 ? urlParts[urlParts.length - 1] : 'unknown',
        nameParts = filename.split('.');

    if (nameParts[nameParts.length - 1] !== videoExt[type]) {
        filename += '.' + videoExt[type];
    }

    return filename;
};

function updateTabIcons() {
    var icon;
    for (var tabid in tabsInfo) {
        icon = "icons/48.png";
        if (tabsInfo[tabid].videos)
            for (var v in tabsInfo[tabid].videos)
                icon = "icons/48g.png";
        chrome.browserAction.setIcon({tabId: parseInt(tabid), path: icon}, function () {
            chrome.runtime.lastError && console.log(chrome.runtime.lastError.message);
        });
    }
}


var processHeaders = function (details) {
    if (!details.responseHeaders || details.tabId < 0) {
        return;
    }

    var video = getVideoInfo(details.responseHeaders);
    var tabId = details.tabId;

    if (!video) {
        if (!details.url.indexOf('https://www.youtube.com/get_video_info?')) {
            getEmbedVideoInfo(details.url, tabId);
            return;
        }

        if (!tabsInfo[tabId]) {
            tabsInfo[tabId] = {
                videos: {}
            };
            chrome.tabs.get(tabId, function (tab) {
                if (tab) {
                    tabsInfo[tabId].page = {
                        url: tab.url,
                        title: tab.title
                    };
                } else {
                    tabsInfo[tabId].error = chrome.runtime.lastError;
                    delete tabsInfo[tabId];
                }
            });
        }
        return;
    }

    video.url = details.url;
    video.filename = parseFileName(details.url, video.type);
    video.ext = videoExt[video.type];

    if (video.ext == 'm3u8')
        video.formattedSize = ''; // don't show size of playlist, we really don't know that


    if (!tabsInfo[tabId]) {
        tabsInfo[tabId] = {
            videos: {}
        };
        chrome.tabs.get(tabId, function (tab) {
            if (tab) {
                tabsInfo[tabId].page = {
                    url: tab.url,
                    title: tab.title
                };
                checkFiltersAllow(video, tabId);
            }
        });
    }
    else
        checkFiltersAllow(video, tabId);
};

function getEmbedVideoInfo(url, tabId) {
    var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.onreadystatechange = function () {
        if (xmlHttpReq.readyState == 4) {
            var contents = xmlHttpReq.responseText;
            var formatStreamArray,
                formatInfoMap, formatInfoElementPair, formatStreamString;
            var formatStreamArrayString = '';
            if (contents.indexOf('id="player-api"') > 0) {
               /* pass */
            } else {
                var parts, youtubeInfoArray = contents.split("&"),
                    formatInfoArray, formatInfoElement;

                for (var i in youtubeInfoArray) {
                    parts = youtubeInfoArray[i].split("=");
                    if (parts[0] == 'url_encoded_fmt_stream_map')
                        formatStreamArrayString = parts[1];
                }

                formatStreamArray = decodeURIComponent(formatStreamArrayString).split(',');

                for (var j in formatStreamArray) {
                    formatStreamString = formatStreamArray[j];
                    formatInfoArray = formatStreamString.split('&');
                    formatInfoMap = {};

                    debug && console.log('formatInfoArray:');
                    debug && console.log(formatInfoArray);

                    for (var b in formatInfoArray) {
                        formatInfoElement = formatInfoArray[b];
                        formatInfoElementPair = formatInfoElement.split('=');
                        formatInfoMap[formatInfoElementPair[0]] = decodeURIComponent(formatInfoElementPair[1])
                    }
                    if (formatInfoMap.itag == '18') {
                        chrome.tabs.sendMessage(tabId, {requestVideoURL: formatInfoMap.url + "&title="});
                    }

                    debug && console.log('Found video in url_encoded_fmt_stream_map: ' + formatInfoMap.url);
                    debug && console.log(formatInfoMap);

                }
            }


        }
    };
    debug && console.log('Fetching EmbedVideoInfo: ' + url);
    xmlHttpReq.open("GET", url, true);
    xmlHttpReq.send();
}

function checkFiltersAllow(video, tabId) {
    /* check video is allowed to download */

    chrome.tabs.get(tabId, function (tab) {

        if (!tab) {
            console.log(chrome.runtime.lastError.message);
            return false;
        }

        var page = tab.url;

        if (!page.indexOf('https://vimeo.com/') && !video.filename.indexOf('segment')) {
            /* segment is a broken video on vimeo */
            debug && console.log('Skipped segment ' + video.url);
            return false;
        }

        if (!page.indexOf('https://coub.com/') && video.url.indexOf('muted_') > 0) {
            chrome.tabs.sendMessage(tabId, {requestVideoURL: video.url.replace('muted_', '').replace('muted_', '')});
            return false;
        }

        if (!page.indexOf('https://www.facebook.com/') && video.url.indexOf('&byteend=') > 0) {
            /* facebook video segments */
            debug && console.log('Skipped segment ' + video.url);
            return false;
        }

        if (!video.url.indexOf('https://www.youtube.com/ptracking?')
            || video.url.indexOf('.googlevideo.com/videoplayback?') > 0
            && video.url.indexOf('source=youtube') > 0
            && video.url.indexOf('title=') < 0
        ) {
            /* broken segments from youtube */
            debug && console.log('Skipped segment ' + video.url);
            return false;
        }

        debug && console.log('Found video ' + video.url);
        video.video_id = video.url.hashCode();
        video.tabId = tabId;
        tabsInfo[tabId].videos[video.video_id] = video;

        updateTabIcons();
    });
}


var onTabUpdated = function (tabId, changeInfo, tab) {
    //debug && console.log('onTabUpdated ' + tabId);
    if (changeInfo.status && changeInfo.url) { // changeInfo.status === 'loading' &&
        //debug && console.log(changeInfo.url);
        delete tabsInfo[tabId];
        updateTabIcons();
    } else if (changeInfo.url)
        updateTabIcons();
};

var onTabClosed = function (tabId, removeInfo) {
    delete tabsInfo[tabId];
};


var downloadVideoFromPlaylist = function (video) {

    debug && console.log('Downloading video via Playlist ' + video.url);

    var queueReadytoJoinVideo = [];
    var queueJoinVideo = [];
    var videoBuffer = new Uint8Array(0);

    var hostURL, playlistURL;

    function findBandwidth(sourcePlaylist) {
        var stringsSplited = sourcePlaylist.split(",");
        for (var i in stringsSplited) {
            if (!stringsSplited[i].indexOf("BANDWIDTH="))
                return Number(stringsSplited[i].split("=")[1]);
        }
        debug && console.log('Bandwidth Not Found');
        // debug && console.log(sourcePlaylist);
        return -1;
    }

    function findPlaylistSource(sourcePlaylist) {
        var stringsSplited = sourcePlaylist.split("\n");
        for (var i in stringsSplited) {
            if (stringsSplited[i].search(".m3u8") > 0) {
                if (!stringsSplited[i].indexOf('http')) {
                    playlistURL = stringsSplited[i];
                    hostURL = null;
                    return stringsSplited[i];
                }

                return hostURL + stringsSplited[i];
            }
        }
        debug && console.log('Playlist Source Not Found');
        // debug && console.log(sourcePlaylist);
        return "";
    }

    function findMaxBandwidthSource(string) {
        var stringsSplited = string.split("#");
        var arrBandwidth = [];
        for (var i in stringsSplited) {
            var bandwidth = findBandwidth(stringsSplited[i]);
            if (bandwidth > 0) {
                arrBandwidth.push(bandwidth);
            }
        }

        var bandwidthMax = Math.max.apply(null, arrBandwidth);

        for (i in stringsSplited) {
            if (bandwidthMax == findBandwidth(stringsSplited[i])) {
                return findPlaylistSource(stringsSplited[i]);
            }
        }
        debug && console.log('Max Bandwidth Source Not Found');
        // debug && console.log(string);
        return "";
    }

    function parsePlaylist(url) {

        playlistURL = url;

        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {

                debug && console.log('parse Playlist ' + url);

                var targetPlaylist = findMaxBandwidthSource(xhr.responseText);

                if (targetPlaylist) {
                    debug && console.log('downloadPlaylist ' + targetPlaylist);
                    downloadPlaylist(targetPlaylist);
                } else {
                    targetPlaylist = getTotalPlaylist(xhr.responseText);
                    debug && console.log('activateSequence ' + targetPlaylist);
                    activateSequence(targetPlaylist);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    function updateHostUrl(playlistLink, fromRoot) {
        playlistURL = playlistLink;
        if (fromRoot) {
            // path from server's root /
            hostURL = playlistURL.indexOf('https') ? 'http://' : 'https://';
            hostURL += playlistURL.substr(hostURL.length).replace(/\/.*/, '');
        } else {
            // relative path
            hostURL = playlistURL.split('/');
            hostURL.pop();
            hostURL = hostURL.join('/') + "/";
        }
        debug && console.log('Playlist host: ' + hostURL);
    }

    function getTotalPlaylist(string) {
        var stringsSplited = string.split("\n");
        var arrPlaylist = [];
        for (var i in stringsSplited) {
            if (!stringsSplited[i] || stringsSplited[i][0] == '#')
                continue;

            if (!hostURL)
                updateHostUrl(playlistURL, stringsSplited[i][0] == '/');

            arrPlaylist.push(hostURL + stringsSplited[i]);
        }

        return arrPlaylist;
    }

    function downloadPlaylist(url) {
        if (url == "") {
            return -1;
        }

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if ((xhr.readyState === 4) && (xhr.status === 200)) {
                var targetPlaylist = getTotalPlaylist(xhr.responseText);
                activateSequence(targetPlaylist);

            }
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    function activateSequence(arrUrls) {
        queueReadytoJoinVideo.push(arrUrls);

        if (queueJoinVideo.length == 0) {
            processNextVideo();
        }
    }

    function processNextVideo() {
        if (queueReadytoJoinVideo.length > 0) {
            queueJoinVideo = queueReadytoJoinVideo.shift();
            accumTsFragment();
        }
    }

    function accumTsFragment() {
        if (queueJoinVideo.length > 0) {
            var nowURL = queueJoinVideo.shift();
            downloadTsFragment(nowURL);
        }
        else {
            downloadTsVideo(videoBuffer);
            videoBuffer = new Uint8Array(0);
        }
    }

    function downloadTsFragment(urlTs) {

        if (!tabsInfo[video.tabId] || !tabsInfo[video.tabId].videos[video.video_id]) {
            // stop downloading when tab was closed
            return;
        }

        var xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.onload = function (e) {
            var arrayBuffer = xhr.response;
            if (arrayBuffer) {
                var now = new Uint8Array(arrayBuffer);
                var prev = new Uint8Array(videoBuffer);

                videoBuffer = new Uint8Array(now.length + prev.length);
                videoBuffer.set(prev);
                videoBuffer.set(now, prev.length);

                accumTsFragment();
            }
        };
        xhr.open('GET', urlTs, true);
        xhr.send(null);
    }

    function downloadTsVideo(data) {
        if (data) {
            var blob = new Blob([data], {type: 'video/mp2t'});
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: video.filename + ".ts",
                saveAs: true
            }, function () {
                tabsInfo[video.tabId].videos[video.video_id]['started'] = false;
                debug && console.log('Download Finished: video_id=' + video.video_id);
            });
        }
    }


    return parsePlaylist(video.url)
};

chrome.webRequest.onHeadersReceived.addListener(processHeaders, {urls: ["<all_urls>"]}, ["responseHeaders"]);
chrome.runtime.onMessage.addListener(processMessage);
chrome.tabs.onUpdated.addListener(onTabUpdated);
chrome.tabs.onRemoved.addListener(onTabClosed);


