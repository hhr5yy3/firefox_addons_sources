browser.runtime.onMessage.addListener(preInit);
var extGlobal = {}; //jshint ignore: line

//WebExtension apis
extGlobal.constants = new Constants();
extGlobal.browserGap = new BrowserGap();
extGlobal.photoManager = new PhotoManager();
extGlobal.trendingNow = new TrendingNow();
extGlobal.tracker = new Tracker();
extGlobal.tabs = browser.tabs;
extGlobal.photoManager.init();
extGlobal.browserGap.loadTrackingParams();
if (extGlobal.constants.weatherUI) {
    extGlobal.weather = new Weather();
    extGlobal.weather.init();
}

if (extGlobal.constants.weatherUI) {
    extGlobal.weather = new Weather();
    extGlobal.weather.init();
}
if (extGlobal.constants.contentEnhancerFF) {
    extGlobal.contentEnhancer = new ContentEnhancer();
    extGlobal.userPref = new UserPreferences();
}

browser.runtime.setUninstallURL(extGlobal.constants.extensionUninstallUrl);

browser.browserAction.onClicked.addListener(function(activeTab) {
    browser.tabs.create({url: "./newtab.html"});
});
    
browser.runtime.onInstalled.addListener(function(details) { //won't execute as an embedded WE, only as a standalone WE
    if (details.reason === "install") {
        setDistributionChannel({reason: details.reason});
        setWasYahooDefaultEngine({reason: details.reason});
    }
});

setTimeout(async () => { //after 2 seconds, partner should be set up from install or update, and we can load all scripts that need partner info
    var partner = await extGlobal.browserGap.localStorage.getItem("partner");
    if (!partner) {
        await setDistributionChannel({reason: "missingDistributionChannel"});
    } else {
        extGlobal.distributionChannel = partner;
    }
    extGlobal.wasYahooDefaultEngine = await extGlobal.browserGap.localStorage.getItem("wasYahooDefaultEngine");

    extGlobal.trendingNow.init(); //needs distributionChannel to be set
    if (extGlobal.constants.financeUI) {
        extGlobal.finance = new Finance();
        extGlobal.finance.init(); //needs distributionChannel to be set
    }

    extGlobal.tracker.initAlivePing(extGlobal.constants.distributionChannels[extGlobal.distributionChannel].firefox_space_id || extGlobal.constants.firefox_space_id, extGlobal.constants.tracker_browser_ff);
}, 2000);

extGlobal.browserGap.addNewTabListener(async function(msg, response) {
    if(msg.renderNewTab) {
        var newTabData = {};
        if (extGlobal.constants.weatherUI) {
          newTabData.weatherData = await extGlobal.browserGap.localStorage.getItem("localStorageWeather");
        }
        newTabData.topSites = extGlobal.browserGap.getTopSites();
        newTabData.distributionChannel = extGlobal.distributionChannel;
        newTabData.trendingNowData = await extGlobal.browserGap.localStorage.getItem("trendingStories");
        newTabData.enableTN = extGlobal.enableTN;
        var cePrompt = await extGlobal.browserGap.localStorage.getItem(extGlobal.constants.yahoo_content_enhancer_prompt);
        newTabData.promptCE = extGlobal.constants.contentEnhancerFF && !cePrompt;
        if (extGlobal.constants.financeUI) {
            newTabData.financeData = extGlobal.finance.loadFinanceData(); //shows last quote data from local storage
            extGlobal.finance.refreshFinanceData(true); //will refresh quotes shortly after tab opens (async)
        }
        var firstTabCompleted = await extGlobal.browserGap.localStorage.getItem("firstTabCompleted");
        if (!firstTabCompleted) {
            if (extGlobal.distributionChannel === extGlobal.constants.mktg_external) {
                var ctid = await extGlobal.browserGap.localStorage.getItem("ctid");
                var mktgUrl = extGlobal.constants.mktg_url.replace("{BROWSER}", "firefox").replace("{GUID}", ctid).replace("{USERTYPE}", "");
                newTabData.semPostInstall = {
                    url: mktgUrl
                };
            }
            extGlobal.tracker.triggerAcceptBeacon(extGlobal.constants.distributionChannels[extGlobal.distributionChannel].firefox_space_id || extGlobal.constants.firefox_space_id, extGlobal.constants.tracker_browser_ff);
            await extGlobal.browserGap.localStorage.setItem("firstTabCompleted", true);
        }
        await extGlobal.photoManager.changeBackgroundPhoto();
        response(newTabData);
    }
    if(msg.tracker) {
        msg.beaconConfig.params.browser = extGlobal.constants.tracker_browser_ff;
        if(msg.pageInfo) {
            extGlobal.tracker.sendBeacon(extGlobal.constants.distributionChannels[extGlobal.distributionChannel].firefox_space_id || extGlobal.constants.firefox_space_id, extGlobal.constants.tracker_page_info, msg.beaconConfig);
        }
        else if(msg.linkView) {
              extGlobal.tracker.sendBeacon(extGlobal.constants.distributionChannels[extGlobal.distributionChannel].chrome_space_id || extGlobal.constants.chrome_space_id, extGlobal.constants.tracker_link_view, msg.beaconConfig);
        }
        else {
            extGlobal.tracker.sendBeacon(extGlobal.constants.distributionChannels[extGlobal.distributionChannel].firefox_space_id || extGlobal.constants.firefox_space_id, extGlobal.constants.tracker_click_info, msg.beaconConfig);
        }
        response(null);
    }
    /* user preference messaging */
    if (msg.prefLoad || msg.prefContentEnhancer || msg.prefFeedback || msg.prefPrivacy || msg.prefPromptCE) {
        extGlobal.userPref.handleRequest(msg, response);
    }
    /* content enhancer messaging */
    if (msg.ceLoadParams || msg.ceSearch) {
        extGlobal.contentEnhancer.handleRequest(msg, response);
    }
    /* -------------------------- */
}, preInit);

function preInit( msg, sender, response) {
    if(msg.newTab) {
        response(null);
    }
}

browser.runtime.onConnect.addListener(async function(port) {
    port.postMessage(await extGlobal.browserGap.getGDPRprivacyObject());
    /*port.onMessage.addListener(function(msg) {
        // See other examples for sample onMessage handlers.
        console.log('onConnect->onMessage', msg);
    });*/
});

browser.runtime.onConnectExternal.addListener(async function(port) {
    port.postMessage(await extGlobal.browserGap.getGDPRprivacyObject());
    /*port.onMessage.addListener(function(msg) {
      // See other examples for sample onMessage handlers.
      console.log('onConnectExternal->onMessage', msg);
    });*/
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
                        break;
                    }
                }
            }
        });
    }
}

async function setDistributionChannel(details) { //setDistributionChannel sets the channel in 3 cases: install, upgrade and "missingDistributionChannel" (it was not set somehow when browser starts)
    if (details.reason === "install") {
        var yahooUrlPattern = extGlobal.constants.yahoo_pattern_url,
            amoUrlPattern = extGlobal.constants.amo_pattern_url,
            beFrugalPattern = extGlobal.constants.befrugal_pattern_url,
            partnerFound = false,
            partner;

        var checkUrl = function(url) {
            try {
                var params;
                if (url.indexOf("#extInstall?") > -1 && !partnerFound) {
                    params = url.substring(url.indexOf("#extInstall?") + 12, url.length);
                    partner = "external-" + params.split("&")[0].split("=")[1];
                } else if (url.indexOf("src=") > -1 && !partnerFound) {
                    partner = url.substring(url.indexOf("src=")+4, url.length).split("&")[0];
                } else if (url.indexOf("firefox/welcome") > -1) {
                    partner = "external-bundled";
                }

                if (extGlobal.constants.distributionChannels[partner]) {
                    partnerFound = true;
                }
            } catch(e) {}
        }

        var tabs = await browser.tabs.query({url: [yahooUrlPattern, amoUrlPattern, beFrugalPattern]});
        var bookmarks = await browser.bookmarks.search({query: "yahoo.com/#extInstall?"});
        var urlList = tabs.concat(bookmarks);
        for (var i = 0; i < urlList.length; i++) {
            checkUrl(urlList[i].url);
        }

        if (!partnerFound) {
            partner = await extGlobal.browserGap.localStorage.getItem("partner"); //check if partner value already exists in localStorage (from previous install?)
            if (partner && extGlobal.constants.distributionChannels[partner]) {
                await initFirstRun(partner);
            } else {
                partner = extGlobal.constants.distributionDefaultChannel;
                await extGlobal.browserGap.localStorage.setItem("partner", partner);
                extGlobal.distributionChannel = partner;
                await initFirstRun(partner);
            }
        } else {
            await extGlobal.browserGap.localStorage.setItem("partner", partner);
            extGlobal.distributionChannel = partner;
            await initFirstRun(partner);
        }

        if ((extGlobal.constants.distributionChannels[extGlobal.distributionChannel].postInstallPage || "") === "newtab") {
            var newTabPage = browser.extension.getURL("newtab.html");
            setTimeout(function () {
                browser.tabs.create({url: newTabPage});
            },2000);
        }

        console.log("Distribution channel=" + partner);


    } else if (details.reason === "upgrade" || details.reason === "missingDistributionChannel") {
        var partner = await extGlobal.browserGap.localStorage.getItem("partner");
        if (partner && extGlobal.constants.distributionChannels[partner]) {
            extGlobal.distributionChannel = partner;
        } else { //update scenario but no data was found in local storage >> setting partner to default channel
            var config;
            try {
                if (browser.storage.managed) {
                    config = await browser.storage.managed.get("partner"); //installer case
                }
            } catch (e) {}
            partner = config && config.partner && extGlobal.constants.distributionChannels[config.partner] ? config.partner : extGlobal.constants.distributionDefaultChannel;
            await extGlobal.browserGap.localStorage.setItem("partner", partner);
            extGlobal.distributionChannel = partner;
        }
        console.log("Distribution channel=" + extGlobal.distributionChannel);
    }
}

async function isFirstRunCompleted() {
    var firstRun = await extGlobal.browserGap.localStorage.getItem("firstRunCompleted") || null;
    return JSON.parse(firstRun);
}

async function initFirstRun() {
    var firstRun = await isFirstRunCompleted();
    if(!firstRun) {
        var now = new Date();
        await extGlobal.browserGap.localStorage.setItem("firstRunCompleted", JSON.stringify(true));
        await extGlobal.browserGap.localStorage.setItem("firstRunCompletedTime", JSON.stringify(now.getTime()));
        if (!extGlobal.browserGap.isOnline()) {
            extGlobal.browserGap.onceOnline(sendInstallPing);
        } else {
            sendInstallPing();
        }
    }
}

function sendInstallPing(){
    var beaconConfig = {};
    var beaconParams = {};
    beaconParams.itype = extGlobal.constants.tracker_install;
    beaconParams.browser = extGlobal.constants.tracker_browser_ff;
    beaconConfig.params = beaconParams;
    setTimeout(function() {
        extGlobal.tracker.sendBeacon(extGlobal.constants.distributionChannels[extGlobal.distributionChannel].firefox_space_id || extGlobal.constants.firefox_space_id, extGlobal.constants.tracker_page_info, beaconConfig);
    }, 2000);
}

function extractQueryString(param, url) {
    param = param.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    var p = (new RegExp("[\\?&]"+param+"=([^&#]*)")).exec(url);
    return (p===null) ? "" : p[1];
}

extGlobal.getSearchUrl = function(queryString, addTypeBool){
    var url = "",
        distribChannel = extGlobal.constants.distributionChannels[extGlobal.distributionChannel],
        isFirefox = extGlobal.browserGap.isFirefox || extGlobal.browserGap.isWebExtension,
        isSafari = extGlobal.browserGap.isSafari,
        typeDefault = extGlobal.constants.distributionChannels[extGlobal.distributionChannel].typeDefault ? extGlobal.constants.distributionChannels[extGlobal.distributionChannel].typeDefault : extGlobal.constants.typeDefault;
    if (isFirefox){
        url = "https://" + extGlobal.browserGap.getLocalizedString("newtab_extension_search_prov_domain") +
            (distribChannel.hsimp ? "/yhs" : "") +
            "/" + extGlobal.browserGap.getLocalizedString("newtab_extension_search_prov_path") +
            "?p=" + encodeURIComponent(queryString) +
            (distribChannel.hspart ? "&hspart=" + distribChannel.hspart : "") +
            (distribChannel.hsimp ? "&hsimp=" + distribChannel.hsimp : "") +
            (distribChannel.frCodeFirefox && !distribChannel.hsimp ? "&fr=" + distribChannel.frCodeFirefox : "");
            if (addTypeBool) {
                url += "&type=" + typeDefault;
            }
    }
    else if (isSafari){
        var searchParamSf = distribChannel.searchType === "fr" ? "&fr=" + distribChannel.frCodeSafari : "&hspart=" + distribChannel.hspart + "&hsimp=" + distribChannel.hsimp;
        url = "https://" + extGlobal.browserGap.getLocalizedString("newtab_extension_search_prov_domain") +
            (distribChannel.searchType === "hsimp" ? "/yhs" : "") +
            "/" + extGlobal.browserGap.getLocalizedString("newtab_extension_search_prov_path") +
            "?p=" + encodeURIComponent(queryString) + searchParamSf;
            if (addTypeBool) {
                url += "&type=" + typeDefault;
            }
    }
    else {
        var searchParam = distribChannel.searchType === "fr" ? "&fr=" + distribChannel.frCodeChrome : "&hspart=" + distribChannel.hspart + "&hsimp=" + distribChannel.hsimp;
        url = "https://" + extGlobal.browserGap.getLocalizedString("newtab_extension_search_prov_domain") +
            (distribChannel.searchType === "hsimp" ? "/yhs" : "") +
            "/" + extGlobal.browserGap.getLocalizedString("newtab_extension_search_prov_path") +
            "?p=" + encodeURIComponent(queryString) + searchParam; //for chrome it may be fr code OR hsimp+hspart, depending on config
            if (addTypeBool) {
                url += "&type=" + typeDefault;
            }
    }
    return url;
};

browser.webRequest.onBeforeSendHeaders.addListener(function (details) {

    function isYahooSearch(url) { //the domain part is already taken care of by the regular expression in the webRequest listener
        var hasSearchPath = url.indexOf("/search") > -1;
        var hasSearchQuery = url.indexOf("p=") > -1;
        return hasSearchPath && hasSearchQuery;
    }

    function isCorrectTrackingParams(url) {
        var partnerConfig = extGlobal.constants.distributionChannels[extGlobal.distributionChannel],
            isPathCorrect = partnerConfig.hsimp ? url.indexOf("/yhs/search") > -1 : (url.indexOf("/search") > -1 && url.indexOf("/yhs/search") === -1),
            isParamCorrect,
            isTn = extractQueryString("fr", url) === extGlobal.constants.tnFrCode;
        if (isTn) { //user clicked on the TN link - no need to reroute
            isParamCorrect = true;
            isPathCorrect = true;
        } else if (partnerConfig.hsimp) {
            isParamCorrect = extractQueryString("hsimp", url) === partnerConfig.hsimp && extractQueryString("hspart", url) === partnerConfig.hspart;
        } else if (partnerConfig.frCodeFirefox) {
            var typeDefault = extGlobal.constants.distributionChannels[extGlobal.distributionChannel].typeDefault ? extGlobal.constants.distributionChannels[extGlobal.distributionChannel].typeDefault : extGlobal.constants.typeDefault;
            isParamCorrect = extractQueryString("fr", url) === partnerConfig.frCodeFirefox && extractQueryString("type", url) === typeDefault;
        }
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
        !details.originUrl &&
        isYahooSearch(details.url) &&
        !existsYlt(details.url) &&
        !isCorrectTrackingParams(details.url)) {
        var queryString = decodeURIComponent(extractQueryString("p", details.url).replace(/\+/g,  " "));
        return {redirectUrl: extGlobal.getSearchUrl(queryString, true)};
    }
}, {
    urls: ["https://*.search.yahoo.com/search*", "https://*.search.yahoo.com/yhs/search*"] // List of URLs
}, ["blocking", "requestHeaders"]); // Block intercepted requests until this handler has finished
