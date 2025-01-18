const FVDVideoDownloader = function () {
    const videoConfig = {
        'video/webm':      {ext: 'webm'},
        'video/mp4':       {ext: 'mp4'},
        'video/x-flv':     {ext: 'flv'},
        'video/3gpp':      {ext: '3gp'},
        'video/x-msvideo': {ext: 'avi'},
        'video/x-ms-wmv':  {ext: 'wmv'},
        'video/mpeg':      {ext: 'mpg'},
        'video/quicktime': {ext: 'mov'},
        'video/ogg':       {ext: 'ogv'}
    };
    const tabsInfo  = {};

    const getVideoInfo = function (headers) {
        var info = {};

        for (let i = 0; i < headers.length; i++) {
            var header = headers[i],
                name   = header.name,
                value  = header.value;

            if (!name) continue;

            switch (name.toLowerCase()) {
                case 'content-type':
                    info.type = value.split(';', 1)[0];
                    break;

                case 'content-length':
                    info.size          = parseInt(value);
                    info.formattedSize = formatSize(value);
                    break;
            }
        }

        return info.size && info.type && videoConfig[info.type] ? info : null;
    };

    const parseFileName = function (url, type) {
        const clearedUrl = url.split('?', 1)[0];
        const urlParts   = clearedUrl.split('/');
        let filename     = urlParts.length > 0 ? urlParts[urlParts.length - 1] : 'unknown';
        const nameParts  = filename.split('.');

        if (nameParts[nameParts.length - 1] !== videoConfig[type].ext) {
            filename += '.' + videoConfig[type].ext;
        }

        return filename;
    };

    const formatSize = function (size) {
        let measurement = 'B';

        if (size > 1024) { size = Math.round(size / 1024 * 100) / 100; measurement = 'KB'; }
        if (size > 1024) { size = Math.round(size / 1024 * 100) / 100; measurement = 'MB'; }
        if (size > 1024) { size = Math.round(size / 1024 * 100) / 100; measurement = 'GB'; }
        return size + measurement;
    };

    const processHeaders = function (details) {
        if (!details.responseHeaders || !details.url || details.tabId < 1) return;

        const video = getVideoInfo(details.responseHeaders);
        if (!video) return;

        video.url      = details.url;
        video.filename = parseFileName(details.url, video.type);

        const tabId    = details.tabId;
        const uniqueId = Math.random().toString(16).slice(2);

        if (!tabsInfo[tabId]) {
            tabsInfo[tabId] = {videos: {}};

            chrome.tabs.get(tabId, function (tab) {
                tabsInfo[tabId].page = {url: tab.url, title: tab.title};
            });
        }

        for (let v in tabsInfo[tabId].videos) {
            if(tabsInfo[tabId].videos[v].url === video.url) return;
        }
        tabsInfo[tabId].videos[uniqueId] = video;
    };

    const clearFilename = function(filename) {
        const unsafeChars = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        return filename
            .replace(/^\./, '_')
            .replace(/"/g, '')
            .replace(/\t/g, ' ')
            .replace(unsafeChars, '')
            .replace(/[\\/:*?<>|~]/g, '_');
    };

    const processMessage = function (request, sender, sendResponse) {
        switch (request.msg) {
            case 'fetchVideos':
                sendResponse({fetchedVideos: tabsInfo[request.tabId]});
                break;

            case 'startDownloading':
                chrome.downloads.download({url: request['url'], filename: clearFilename(request['filename']), saveAs: true});
                break;

            case 'setBadge':
                setBadge(request['value'], sender.tab.id);
                break;

            case 'setBadgeForDefaultSchema':
                if(!tabsInfo[sender.tab.id] || !tabsInfo[sender.tab.id].videos) return;
                const count = Object.keys(tabsInfo[sender.tab.id].videos).length;
                setBadge(count, sender.tab.id);
                break;

            case 'ajaxGet':
                ajaxGet(request.url, sendResponse);
                break;

        }
        return true;
    };

    const onTabUpdated = function (tabId, changeInfo) {
        if (changeInfo.status && changeInfo.status === 'loading') {
            delete tabsInfo[tabId];
        }
    };

    const onTabClosed = function (tabId) { delete tabsInfo[tabId]; };

    const disableTwitterVerify = () => {
        chrome.webRequest.onBeforeSendHeaders.addListener(
            details => {
                var requestHeaders = details.requestHeaders.filter( item => item.name.toLowerCase() !== 'cookie');
                return { requestHeaders: requestHeaders };
            },
            {urls : ['*://api.twitter.com/oauth2/token']},
            ['blocking', 'requestHeaders']
        );
    };

    const ajaxGet = (url, cb) => {
        var x = new XMLHttpRequest();
        x.open('GET', url, true);
        x.onload = () => cb(x.responseText);
        x.send();
    };

    const setBadge = (val, tabId) => {
        let text = val ? String(val) : '';
        chrome.browserAction.setBadgeBackgroundColor({color: [16, 201, 33, 100], tabId});
        chrome.browserAction.setBadgeText({text: text, tabId});
    };

    return {
        init: function () {
            chrome.webRequest.onHeadersReceived.addListener(processHeaders, {urls: ["<all_urls>"]}, ["responseHeaders"]);
            chrome.runtime.onMessage.addListener(processMessage);
            chrome.tabs.onUpdated.addListener(onTabUpdated);
            chrome.tabs.onRemoved.addListener(onTabClosed);

            disableTwitterVerify();
        }
    };
}();

FVDVideoDownloader.init();
