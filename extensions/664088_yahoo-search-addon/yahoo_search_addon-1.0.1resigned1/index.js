var extGlobal = {}; //jshint ignore: line

extGlobal.logManager = new LogManager();
extGlobal.constants = new Constants();
extGlobal.browserGap = new BrowserGap();
extGlobal.browserGap.init().then(async function() {

    var config = {};
    config.constants = extGlobal.constants;
    config.browserGap = extGlobal.browserGap;
    extGlobal.trackingManager = new TrackingManager();
    extGlobal.trackingManager.init(config);

    browser.runtime.setUninstallURL(extGlobal.constants.uninstallURL);

    async function isFirstRunCompleted() {
        var ysetFirstRunCompleted = await extGlobal.browserGap.localStorage.getItem("ysetFirstRunCompleted");
        return JSON.parse(ysetFirstRunCompleted);
    }

    async function initFirstRun() {
        var firstRun = await isFirstRunCompleted();
        if(!firstRun) {
            var now = new Date();
            await extGlobal.browserGap.localStorage.setItem("ysetFirstRunCompleted", JSON.stringify(true));
            await extGlobal.browserGap.localStorage.setItem("ysetFirstRunCompletedTime", JSON.stringify(now.getTime()));
            sendInstallPing();
        }
    }

    function sendInstallPing(){
        var beaconConfig = {};
        var beaconParams = {};
        beaconParams.itype = extGlobal.constants.TRACKER_ITYPE_INSTALL;
        beaconParams.browser = extGlobal.constants.TRACKER_BROWSER_FF;
        beaconConfig.params = beaconParams;
        extGlobal.trackingManager.sendBeacon(extGlobal.constants.TRACKER_PAGE_INFO, beaconConfig);
    }

    initFirstRun();

    extGlobal.trackingManager.initAlivePing(extGlobal.constants.TRACKER_BROWSER_FF);
    extGlobal.wasYahooDefaultEngine = await extGlobal.browserGap.localStorage.getItem("wasYahooDefaultEngine");
});

browser.runtime.onInstalled.addListener(function(details) { //won't execute as an embedded WE, only as a standalone WE
    if (details.reason === "install") {
        setWasYahooDefaultEngine({reason: details.reason});
    }
});

async function setWasYahooDefaultEngine(details) {
    if (details.reason === "install") {
        // for install case, we don't know what was the previous search engine, so we need to guess based on the cookies
        var cookieConfig = {
            domain: "yahoo.com"
        };
        browser.cookies.getAll(cookieConfig).then(async function(cookies) {
            var dssTimestamp;
            var timeNow = Date.now();
            for (var i in cookies) {
                if (cookies[i].name === "DSS") {
                    dssTimestamp = extractQueryString("sdts", cookies[i].value) + "000";

                    if (timeNow - dssTimestamp < (extGlobal.constants.twoWeeks)) {
                        await extGlobal.browserGap.localStorage.setItem("wasYahooDefaultEngine", true); // yahoo is probably the default search engine since there is DSS and sdts is less than 2 weeks old
                        extGlobal.wasYahooDefaultEngine = await extGlobal.browserGap.localStorage.getItem("wasYahooDefaultEngine");
                        break;
                    }
                }
            }
        });
    }
}

function extractQueryString(param, url) {
    param = param.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    var p = (new RegExp("[\\?&]"+param+"=([^&#]*)")).exec(url);
    return (p===null) ? "" : p[1];
}

browser.webRequest.onBeforeSendHeaders.addListener(function (details) {
    var config = {
        "hsimp": "yhs-102",
        "hspart": "mozilla",
        "type": "dss"
    };

    function getSearchUrl(queryString){
        return "https://search.yahoo.com/yhs/search?p=" + encodeURIComponent(queryString) + "&hsimp=" + config.hsimp + "&hspart=" + config.hspart + "&type=" + config.type; //this extension is hardcoded and only has 1 search URL
    }

    function isYahooSearch(url) { //the domain part is already taken care of by the regular expression in the webRequest listener
        var hasSearchPath = url.indexOf("/search") > -1;
        var hasSearchQuery = url.indexOf("p=") > -1;
        return hasSearchPath && hasSearchQuery;
    }

    function isCorrectTrackingParams(url) {
        var isPathCorrect = url.indexOf("/yhs/search") > -1,
            isParamCorrect;

        isParamCorrect = extractQueryString("hsimp", url) === config.hsimp && extractQueryString("hspart", url) === config.hspart && extractQueryString("type", url) === config.type;
        return isPathCorrect && isParamCorrect;
    }

    function isMainFrame(reqDetails) {
        return reqDetails.type === "main_frame" && reqDetails.frameId === 0;
    }

    function shouldRedirect() {
        //if Yahoo was already the default engine prior to the extension install, we should not change request parameters
        //if the default search engine was Yahoo Partner or another engine, we are free to change s.y.c request parameters
        return !extGlobal.wasYahooDefaultEngine;
    }

    function refererExists(details) {
        var refererExists = false;
        for (var i=0; details.requestHeaders && i<details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name === "Referer" && details.requestHeaders[i].value) {
                refererExists = true;
                break;
            }
        }
        return refererExists;
    }

    function existsYlt(url) {
        var path = url ? url.substring(0, url.indexOf("?")) : "";
        return path.indexOf("_ylt=") > -1;
    }

    if (isMainFrame(details) &&
        shouldRedirect() &&
        !refererExists(details) &&
        isYahooSearch(details.url) &&
        !existsYlt(details.url) &&
        !isCorrectTrackingParams(details.url)) {
        var queryString = extractQueryString("p", details.url);
        return {redirectUrl: getSearchUrl(queryString)};
    }
}, {
    urls: ["https://*.search.yahoo.com/search*", "https://*.search.yahoo.com/yhs/search*"] // List of URLs
}, ["blocking", "requestHeaders"]); // Block intercepted requests until this handler has finished
