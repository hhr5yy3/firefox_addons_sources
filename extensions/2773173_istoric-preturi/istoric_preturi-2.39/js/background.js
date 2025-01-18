chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{
    let response = {};
    let messages = Array.isArray(request.message) ? request.message : [request.message];

    for (let i = 0; i < messages.length; i++)
    {
        let currentResponse = null;
        switch (messages[i])
        {
            case "prepareTab":
                if (isSiteHandled(sender.tab.url))
                {
                    // inject CSS
                    chrome.tabs.insertCSS(sender.tab.id, {file: 'css/inPage.css'}, function ()
                    {
                        // inject variables
                        chrome.tabs.executeScript(sender.tab.id, {code: `var __istoricPreturi_uniqueIdentifier = '${getUniqueIdentifier()}';`}, function ()
                        {
                            // inject scripts
                            let jsFiles = [
                                'lib/jquery.min.js',
                                'lib/bootstrap.min.js',
                                'lib/tether.js',
                                'lib/pako_deflate.min.js',
                                'config.js',
                                'constants.js',
                                'utilShared.js',
                                'lib.js',
                                'util.js',
                                'inPage.js',
                            ];
                            let currentFileIndex = 0;
                            function loadNextFile()
                            {
                                if (currentFileIndex < jsFiles.length)
                                {
                                    chrome.tabs.executeScript(sender.tab.id, {
                                        file: `js/${jsFiles[currentFileIndex]}`,
                                        runAt: 'document_start'
                                    }, function ()
                                    {
                                        currentFileIndex++;
                                        loadNextFile();
                                    });
                                }
                            }
                            loadNextFile();
                        });
                    });
                }
                break;
            // get siteSettings
            case "getSiteSettings":
                currentResponse = getSiteSettings(sender.tab && sender.tab.url ? sender.tab.url : request.hostname);
                break;
            // get config
            case "getConfig":
                currentResponse = CONFIG;
                break;
            // CACHE handling, to be used only by inPage scripts or mainPopup, otherwise just use the CACHE object directly
            case "cacheIsValid":
                currentResponse = {
                    valid: CACHE.valid(request.type, request.identifier),
                    data: CACHE.data(request.type, request.identifier),
                };
                break;
            case "cacheInit":
                CACHE.init(request.type, request.identifier, request.data);
                break;
            // debug mode
            case "isDebugMode":
                currentResponse = DEBUG_MODE;
                break;
            case "isDebugModeCheckPrice":
                currentResponse = localStorage.hasOwnProperty("debugCheckPrice") && parseInt(localStorage.debugCheckPrice);
                break;
            // current tab link is known product page
            case "getSitesCountExisting":
                currentResponse = getSitesCountExisting(request.link);
                break;
            // is product page
            case "isProductPage":
                currentResponse = isProductPage(request.url);
                break;
        }

        response[messages[i]] = currentResponse;
    }

    // if this was a single message then return the response directly, otherwise return array of results
    if (messages.length == 1)
        response = response[messages[0]];
    sendResponse(response);
});

var activeTabLink = "";
function handleLinkUpdate(newLink)
{
    newLink = cleanupLink(newLink);

    // nothing changed
    if (activeTabLink == newLink)
        return;

    activeTabLink = newLink;
    getSitesCount();
}
function onTabUpdated(tabId, changeInfo, tab)
{
    if (tab.active || isMobile())
        handleLinkUpdate(changeInfo.url || tab.url);
}
function onTabActivated(activeInfo)
{
    var tabId = activeInfo.tabId;

    chrome.tabs.get(tabId, function(tab)
    {
        if (!chrome.runtime.lastError && tab)
            handleLinkUpdate(tab.url);
    });
}
function addTabListeners()
{
    if (!chrome.tabs.onActivated.hasListener(onTabActivated))
        chrome.tabs.onActivated.addListener(onTabActivated);
    if (!chrome.tabs.onUpdated.hasListener(onTabUpdated))
        chrome.tabs.onUpdated.addListener(onTabUpdated);
}

function useConfigCache()
{
    if (localStorage.hasOwnProperty("config"))
        if (parsed = parseJson(localStorage.config))
            CONFIG = parsed;
}
function updateConfig(source)
{
    if (typeof source == "undefined" || source === null)
        source = "manual";

    API("updateConfig", { source }, function(data)
    {
        // make sure data is the one expected
        if (data.hasOwnProperty("handledSites"))
        {
            CONFIG = data;

            // save cache
            localStorage.config = JSON.stringify(data);
        }
        // use cache on error
        else
            useConfigCache();
    }, null, true, function()
    {
        // use cache on error
        useConfigCache();
    });
}
function scheduleConfigUpdater()
{
    let interval = 1440;
    if (CONFIG && CONFIG.hasOwnProperty("interval_configUpdate") && CONFIG.interval_configUpdate > 1)
        interval = CONFIG.interval_configUpdate;

    window.setInterval(function() { updateConfig("alarm"); }, interval * 60 * 1000);
}

function addContextMenus()
{
    // older versions
    if (typeof chrome == "undefined" || typeof chrome.i18n == "undefined" || typeof chrome.i18n.getMessage == "undefined")
        return;

    let links = {
        search_explicit: { contexts: ["frame", "selection", "link", "editable", "image", "video", "audio"], link: "search" },
        search_current: { contexts: ["browser_action", "page_action", "page"], link: "search" },
        favorites: { contexts: ["browser_action", "page_action"], link: "favorite" },
        promotions: { contexts: ["browser_action", "page_action"], link: "https://reduceri.istoric-preturi.info/" },
        reportBug: { contexts: ["browser_action", "page_action"], link: "contact" },
    };
    chrome.contextMenus.removeAll();
    for (let idx in links)
    {
        if (links.hasOwnProperty(idx))
        {
            chrome.contextMenus.create({
                id: idx,
                title: chrome.i18n.getMessage(`menu_${idx}`),
                contexts: links[idx].contexts,
                onclick: function(info, tab) {
                    let link = links[idx].link;

                    // search link
                    if (info.menuItemId == "search_explicit" || info.menuItemId == "search_current")
                    {
                        // clicked on a specific in-page link
                        if (info.hasOwnProperty("linkUrl") && info.linkUrl)
                            link += "/" + info.linkUrl;
                        // fallback to current page link
                        else if (activeTabLink)
                            link += "/" + activeTabLink;
                    }

                    newTab(link.substr(0, 4) == "http" ? link : `${mainSite}/${link}`);
                },
            });
        }
    }
}

// on start
initializeUniqueIdentifierIfNeeded();
updateConfig("initialization");
addTabListeners();
scheduleConfigUpdater();
addContextMenus();
