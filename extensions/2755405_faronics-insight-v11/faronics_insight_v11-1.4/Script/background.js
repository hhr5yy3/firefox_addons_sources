let blockURLs= [], webHistory = [], webSettings, browserName, uploadWebHistoryInterval,
    socket, stopWebTracking = true, localServerUrl = `http://localhost:8890`,
    extension_blockMessage = chrome.i18n.getMessage("chrome_extension_siteBlockMessage1"),
    isChromeOS = false, chromeAppLocalServerUrl, serverUrl, agentId;

let webLimitMode = {
    BlockAllWebsites: 0,
    AllowWebsites: 1,
    BlockWebsites: 2
};

let getHotName = (url) => {
    const urlObj = new URL('/', url);
    let hostName = null;
    if(urlObj != undefined && urlObj != null) {
        hostName = urlObj.hostname;
    }
    return hostName;
}

let isUrlBlocked = (hostName) => {
    return webSettings.blockWebLimit.some(function(blockUrl){
        return hostName.endsWith(blockUrl);
    });
}

let isUrlAllowed = (hostName) => {
    return webSettings.allowWebLimit.some(function(allowUrl){
        return hostName.endsWith(allowUrl);
    });
}

let makeHistoryObj = (isBlocked, url) => {
	if(!browserName) {
		browserName = getBrowserName();
	}
	let currTime = new Date();
    return {
        url: url,
        browser: browserName,
        time: `${currTime.getFullYear()}-${currTime.getMonth()+1}-${currTime.getDate()} ${currTime.getHours()}:${currTime.getMinutes()}:${currTime.getSeconds()}`,
        isBlocked: isBlocked
    };
}

let maintainHistory = (isBlocked, url) => {
	if(!stopWebTracking) {
	    var historyObj = makeHistoryObj(isBlocked, url);
		webHistory.push(historyObj);
		setOrUpdateLocalStorageItem("FarInWebHistory", JSON.stringify(webHistory));
	}
}

let processBlockWebFiltering = (url) => {
    let hostName = getHotName(url);
    let isBlocked = isUrlBlocked(hostName);
    maintainHistory(isBlocked, hostName, url);
    return isBlocked;
}

let processAllowWebFiltering = (url) => {
    let hostName = getHotName(url);
    return isUrlAllowed(hostName);    
}

let getWebHistoryFromLS = () => {
    webHistory = [];
    var farInWebHistory = getLocalStorageItem("FarInWebHistory");
    if(farInWebHistory != undefined && farInWebHistory != null)
        webHistory = JSON.parse(farInWebHistory);
}

function Interval(fn, time) {
    var timer = false;
    this.start = () => {
        if (!this.isRunning())
            timer = setInterval(fn, time);
    };
    this.stop = () => {
        clearInterval(timer);
        timer = false;
    };
    this.isRunning = () => {
        return timer !== false;
    };
}

let uploadWebHistoryFromLS = () => {
    if(!stopWebTracking && webHistory != undefined && webHistory.length > 0) {
        let uploadWebHistoryAPIUrl = serverUrl ? `${serverUrl}/api/webHistory/${agentId}` : `${localServerUrl}/uploadWebHistory`;
        $.ajax({
            type: "POST",
            url: uploadWebHistoryAPIUrl,
            data: JSON.stringify(webHistory),
            contentType: "application/json; charset=utf-8",
            error: function(xhr,status,error) {
                console.log(`Failed to upload web history. status - ${status}, error - `, xhr);
            },
            success: function() {
                webHistory = [];
                removeLocalStorageItem("FarInWebHistory");
            }
        });
    }
}

function getBrowserName() { 
    let userAgentInfo = navigator.userAgent;
    if(userAgentInfo.indexOf("Firefox") != -1 ){
        return 'Mozilla Firefox';
    }else if(userAgentInfo.indexOf("Edg") != -1 ){
        return 'Microsoft Edge';
    }  else if((userAgentInfo.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
        return 'IE';
    } else if(userAgentInfo.indexOf("Chrome") != -1 ) {
        return 'Google Chrome';
    } else {
        return 'Unknown';
    }
}

function init() {
    isChromeOS = /\bCrOS\b/.test(navigator.userAgent);
    console.log(`isChromeOS : ${isChromeOS}`);
    if(!isChromeOS && !socket) {
        socket = io.connect(`${localServerUrl}?type=ext`, { transports: ["websocket"] });
        
        socket.on("connect", () => {
            console.log(`Web socket connected`);
            if(!stopWebTracking) {
                uploadWebHistoryInterval.start();
            }
        });

        socket.on("disconnect", () => {
            console.log(`Web socket disconnected`);
            uploadWebHistoryInterval.stop();
        });

        socket.on("error", (error) => {
            console.log(`Failed to connect local web socket : ${JSON.stringify(error)}`);
        });

        socket.on("perform-action", (actionInfo) => {
            console.log(`perform action : ${JSON.stringify(actionInfo)}`);
            switch(actionInfo.cmd) {
                case "start-web-tracking": {
                    stopWebTracking = false;
                    uploadWebHistoryInterval.start();
                    break;
                }
                case "stop-web-tracking": {
                    stopWebTracking = true;
                    uploadWebHistoryInterval.stop();
                    break;
                }
                case "start-web-limiting": {
                	updateSettings(actionInfo.data);
                    break;
                }
                case "stop-web-limiting": {
                    updateSettings();
                    break;
                }
            }
        });
    }

    uploadWebHistoryInterval = new Interval(() => { uploadWebHistoryFromLS(); }, 1 * 60 * 1000);
}

chrome.runtime.onInstalled.addListener(reason => {
    init();
});

chrome.runtime.onStartup.addListener(reason => {
    init();
});
  
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let sendResponseJson = {};
    let url = request.URL;
    if(isChromeOS) {
        if(/\bqid=23763B86296F41699CDA32C9420ABBB2\b/.test(url)) {
            sendResponseJson.closeTab = true;
            chromeAppLocalServerUrl = (new URL(url)).origin;
            console.log(`local server url : ${chromeAppLocalServerUrl}`);
            loadWebLimitingSettings();
            sendResponse(sendResponseJson);
            return true;
        }
    }

    let isBlocked = false;
	if(webSettings != undefined) {
		if(webSettings.webLimitMode == webLimitMode.BlockAllWebsites)
			isBlocked = true;
		else if(webSettings.webLimitMode == webLimitMode.BlockWebsites)
			isBlocked = processBlockWebFiltering(url);
		else if(webSettings.webLimitMode == webLimitMode.AllowWebsites)
			isBlocked = !processAllowWebFiltering(url);
	}
    maintainHistory(isBlocked, url);
    sendLastVisitedUrl({ visitedUrl: url, isSiteBlocked: isBlocked});
    if(isBlocked) {
        let blockHTMLStr = getSiteBlockHTML(extension_blockMessage);
        sendResponseJson = { isSiteBlocked: true, blockHTML: blockHTMLStr };
    }
    else {
        sendResponseJson = { isSiteBlocked: false};
    }
    
    sendResponse(sendResponseJson);
    return true;
});

function updateSettings(settings) {
    webSettings = settings;
    if(!webSettings)
        return;
    let blockWebLimit = [];
    webSettings.blockWebLimit.forEach(blockUrl => {
        if(blockUrl.indexOf("://") != -1) {
            blockUrl = getHotName(blockUrl);
        }
        blockWebLimit.push(blockUrl.toString().toLowerCase())
    });
    webSettings.blockWebLimit = blockWebLimit;
    let allowWebLimit = [];
    webSettings.allowWebLimit.forEach(allowedUrl => {
        if(allowedUrl.indexOf("://") != -1) {
            allowedUrl = getHotName(allowedUrl);
        }
        allowWebLimit.push(allowedUrl.toString().toLowerCase());
    });
    webSettings.allowWebLimit = allowWebLimit;
}

function sendLastVisitedUrl(visitedUrlInfo) {
    if(serverUrl) {
        $.ajax({
            type: "POST",
            url: `${serverUrl}/api/lastVisitedSiteChanged/${agentId}`,
            data: JSON.stringify(visitedUrlInfo),
            contentType: "application/json; charset=utf-8",
            error: function(xhr,status,error) {
                console.log(`Failed to update last visited site info. status - ${status}, error - `, xhr);
            },
            success: function() {
                console.log(`Successfully updated last visited site info.`);
            }
        });
    } else if(socket) {
        socket.emit("send-action", { type: 7, handlerFuncName: "lastVisitedSiteChanged", data: visitedUrlInfo });
    }
}

function loadWebLimitingSettings() {
    setTimeout(() => {
        $.get(`${chromeAppLocalServerUrl}/settings`, function(response) {
            console.log(`web limit response : ${JSON.stringify(response)}`);
            serverUrl = response.serverUrl;
            agentId = response.agentId;
            if(serverUrl) {
                stopWebTracking = false;
                uploadWebHistoryInterval.start();
            } else {
                stopWebTracking = true;
                uploadWebHistoryInterval.stop();
            }
            updateSettings(response.webLimiting);
        });
    }, 500);
}