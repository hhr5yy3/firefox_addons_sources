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
extGlobal.utils = new ViewUtils();
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
    extGlobal.distributionChannelConfig = await extGlobal.browserGap.localStorage.getItem("distribChannelConfig");
    extGlobal.distributionChannelConfig = JSON.parse(extGlobal.distributionChannelConfig);
    if (!extGlobal.distributionChannelConfig) {
        await setDistributionChannel({reason: "missingDistributionChannel"});
        setTimeout(initWhenReady, 2000);
    } else {
        initWhenReady();
    }

    async function initWhenReady() {
        extGlobal.wasYahooDefaultEngine = await extGlobal.browserGap.localStorage.getItem("wasYahooDefaultEngine");
        extGlobal.trendingNow.init(); //needs distributionChannel to be set
        if (extGlobal.constants.financeUI) {
            extGlobal.finance = new Finance();
            extGlobal.finance.init(); //needs distributionChannel to be set
        }
        extGlobal.tracker.initAlivePing((extGlobal.distributionChannelConfig.spaceid && extGlobal.distributionChannelConfig.spaceid.firefox ? extGlobal.distributionChannelConfig.spaceid.firefox : extGlobal.constants.firefox_space_id), extGlobal.constants.tracker_browser_ff);
    }
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
        newTabData.distributionChannelConfig = extGlobal.distributionChannelConfig;
        newTabData.enableTN = extGlobal.enableTN;
        if (extGlobal.constants.financeUI) {
            newTabData.financeData = extGlobal.finance.loadFinanceData(); //shows last quote data from local storage
            extGlobal.finance.refreshFinanceData(true); //will refresh quotes shortly after tab opens (async)
        }
        var firstTabCompleted = await extGlobal.browserGap.localStorage.getItem("firstTabCompleted");
        if (!firstTabCompleted) {
            extGlobal.tracker.triggerAcceptBeacon((extGlobal.distributionChannelConfig.spaceid && extGlobal.distributionChannelConfig.spaceid.firefox ? extGlobal.distributionChannelConfig.spaceid.firefox : extGlobal.constants.firefox_space_id), extGlobal.constants.tracker_browser_ff);
            await extGlobal.browserGap.localStorage.setItem("firstTabCompleted", true);
        }
        await extGlobal.photoManager.changeBackgroundPhoto();
        response(newTabData);
    }
    if(msg.tracker) {
        msg.beaconConfig.params.browser = extGlobal.constants.tracker_browser_ff;
        if(msg.pageInfo) {
            extGlobal.tracker.sendBeacon((extGlobal.distributionChannelConfig.spaceid && extGlobal.distributionChannelConfig.spaceid.firefox ? extGlobal.distributionChannelConfig.spaceid.firefox : extGlobal.constants.firefox_space_id), extGlobal.constants.tracker_page_info, msg.beaconConfig);
        }
        else if(msg.linkView) {
              extGlobal.tracker.sendBeacon((extGlobal.distributionChannelConfig.spaceid && extGlobal.distributionChannelConfig.spaceid.firefox ? extGlobal.distributionChannelConfig.spaceid.firefox : extGlobal.constants.firefox_space_id), extGlobal.constants.tracker_link_view, msg.beaconConfig);
        }
        else {
            extGlobal.tracker.sendBeacon((extGlobal.distributionChannelConfig.spaceid && extGlobal.distributionChannelConfig.spaceid.firefox ? extGlobal.distributionChannelConfig.spaceid.firefox : extGlobal.constants.firefox_space_id), extGlobal.constants.tracker_click_info, msg.beaconConfig);
        }
        response(null);
    }
    /* user preference messaging */
    if (msg.prefLoad || msg.prefContentEnhancer || msg.prefFeedback || msg.prefPrivacy) {
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

async function setDistributionChannel(details) { //setDistributionChannel sets the channel in 3 cases: install, update and "missingDistributionChannel" (it was not set somehow when browser starts)
    if (details.reason === "install") {
        var yahooUrlPattern = extGlobal.constants.yahoo_pattern_url,
            amoUrlPattern = extGlobal.constants.amo_pattern_url,
            beFrugalPattern = extGlobal.constants.befrugal_pattern_url,
            partnerFound = false,
            partner;

        var tabs = await browser.tabs.query({url: [yahooUrlPattern, amoUrlPattern, beFrugalPattern]});
        var bookmarks = await browser.bookmarks.search({query: "yahoo.com/#extInstall?"});
        var urlList = tabs.concat(bookmarks);
        var distrib = extGlobal.utils.checkDistribution(urlList) || { "channel": "default" };

        extGlobal.utils.getRemoteDistributionConfig(distrib.channel, async function (config) {
            if (config) {
                extGlobal.distributionChannelConfig = config;
                await extGlobal.browserGap.localStorage.setItem("distribChannelConfig", JSON.stringify(config));
                if (config.searchConfig.subCampaigns) {
                    await extGlobal.browserGap.localStorage.setItem("campaign", distrib.campaign);
                }
            } else {
                extGlobal.distributionChannelConfig = extGlobal.constants.defaultConfig;
                await extGlobal.browserGap.localStorage.setItem("distribChannelConfig", JSON.stringify(extGlobal.constants.defaultConfig));
            }
            //initRightRail(extGlobal.distributionChannelConfig);
            checkTYPage();
            initFirstRun();
        });
    } else if (details.reason === "update" || details.reason === "missingDistributionChannel") {
        var partner = await extGlobal.browserGap.localStorage.getItem("partner") || "default";
        var distrib = await extGlobal.browserGap.localStorage.getItem("distribChannelConfig");
        partner = partner.replace("external-", "");
        if (!distrib) { //this code should be executed for users getting version 2.2.1. For future update, they will already have distribChannelConfig set
            extGlobal.utils.getRemoteDistributionConfig(partner, async function (config) {
                if (config) {
                    extGlobal.distributionChannelConfig = config;
                    await extGlobal.browserGap.localStorage.setItem("distribChannelConfig", JSON.stringify(config));
                } else {
                    extGlobal.distributionChannelConfig = extGlobal.constants.defaultConfig;
                    await extGlobal.browserGap.localStorage.setItem("distribChannelConfig", JSON.stringify(extGlobal.constants.defaultConfig));
                }
            });
        }
    }
}

function checkTYPage() {
    var tyPage = extGlobal.distributionChannelConfig.postInstallPage,
        tyPageUrl;
    if (tyPage) {
        if (tyPage === "newtab") {
            tyPageUrl = browser.extension.getURL("newtab.html");
        } else {
            tyPageUrl = tyPage;
        }
        setTimeout(function () {
            browser.tabs.create({url: tyPageUrl});
        }, 2000);
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
        extGlobal.tracker.sendBeacon((extGlobal.distributionChannelConfig.spaceid && extGlobal.distributionChannelConfig.spaceid.firefox ? extGlobal.distributionChannelConfig.spaceid.firefox : extGlobal.constants.firefox_space_id), extGlobal.constants.tracker_page_info, beaconConfig);
    }, 2000);
}

function extractQueryString(param, url) {
    param = param.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    var p = (new RegExp("[\\?&]"+param+"=([^&#]*)")).exec(url);
    return (p===null) ? "" : p[1];
}

browser.webRequest.onBeforeSendHeaders.addListener(function (details) {

    function isYahooSearch(url) { //the domain part is already taken care of by the regular expression in the webRequest listener
        var hasSearchPath = url.indexOf("/search") > -1;
        var hasSearchQuery = url.indexOf("p=") > -1;
        return hasSearchPath && hasSearchQuery;
    }

    function isMainFrame(reqDetails) {
        return reqDetails.type === "main_frame" && reqDetails.frameId === 0;
    }

    function shouldRedirect() {
        //if Yahoo was already the default engine prior to the extension install, we should not change request parameters
        //if the default search engine was Yahoo Partner or another engine, we are free to change s.y.c request parameters
        return !extGlobal.wasYahooDefaultEngine;
    }

    function isExtension(url) {
        return extractQueryString("manifest", url) === "1";
    }

    if (isMainFrame(details) &&
        shouldRedirect() &&
        isYahooSearch(details.url) &&
        isExtension(details.url)) {
        var queryString = decodeURIComponent(extractQueryString("p", details.url).replace(/\+/g,  " "));
        return {redirectUrl: extGlobal.utils.getSearchUrl(queryString, true)};
    }
}, {
    urls: ["https://*.search.yahoo.com/search*", "https://*.search.yahoo.com/yhs/search*"] // List of URLs
}, ["blocking", "requestHeaders"]); // Block intercepted requests until this handler has finished
