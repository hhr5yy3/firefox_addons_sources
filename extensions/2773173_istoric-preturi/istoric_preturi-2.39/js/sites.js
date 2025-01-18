function _cleanupUrlForHost(url)
{
    if (CONFIG.hasOwnProperty("siteUrlCleanupForHost_patterns"))
    {
        let patterns = CONFIG.siteUrlCleanupForHost_patterns;
        patterns.forEach(function(pattern)
        {
            try
            {
                let patternData = pattern.split("|||");
                let regEx = new RegExp(patternData[0], 'i');
                url = url.replace(regEx, patternData.length == 2 ? patternData[1] : '');
            } catch (e) { }
        });
    }

    return url;
}

function getSiteSettings(url)
{
    if (CONFIG.hasOwnProperty("handledSites"))
    {
        url = _cleanupUrlForHost(url);

        // attempt exact match first
        for (var i = 0; i < CONFIG.handledSites.length; i++)
        {
            let currentLinks = [];
            // main link
            currentLinks.push(_cleanupUrlForHost(CONFIG.handledSites[i].link));
            // additional links (for duplicate sites)
            if (CONFIG.handledSites[i].hasOwnProperty("additionalLinks"))
                CONFIG.handledSites[i].additionalLinks.forEach(function(elem) { currentLinks.push(elem); });
            for (let j = 0; j < currentLinks.length; j++)
            {
                let currentLink = currentLinks[j];
                if (url.toLowerCase() == currentLink.toLowerCase())
                    return CONFIG.handledSites[i];
            }
        }

        // fallback to partial match
        let maxIndex = CONFIG.hasOwnProperty("siteUrlCleanupForHost_maxIndex") ? parseInt(CONFIG.siteUrlCleanupForHost_maxIndex) : 9999;
        for (i = 0; i < CONFIG.handledSites.length; i++)
        {
            let index = url.indexOf(CONFIG.handledSites[i].link);
            if (index !== -1 && index <= maxIndex)
                return CONFIG.handledSites[i];
        }
    }

    return null;
}

function isSiteHandled(url)
{
    if (url.indexOf("view-source:") !== -1)
        return false;

    return !!getSiteSettings(url);
}

function isProductPage(url)
{
    if (url.indexOf("view-source:") !== -1)
        return false;

    let siteSettings = getSiteSettings(url);

    // unhandled site
    if (!siteSettings)
        return false;

    // no product page patterns
    if (!siteSettings.hasOwnProperty("productPagePatterns"))
        return true;

    for (var i = 0; i < siteSettings.productPagePatterns.length; i++)
    {
        let regEx = new RegExp(siteSettings.productPagePatterns[i], 'i');
        if (url.match(regEx) !== null)
            return true;
    }

    return false;
}

var __tabSitesCounts = {};
function getSitesCountExisting(tabLink)
{
    return __tabSitesCounts.hasOwnProperty(tabLink) ? __tabSitesCounts[tabLink] : null;
}
function __updateSitesCount(count, title)
{
    setBadgeText(count, "green");
    setBageTitle(title);

    __cacheSitesCount(activeTabLink, count);
}
function __cacheSitesCount(link, count)
{
    __tabSitesCounts[link]= count;
}
function getSitesCount()
{
    // make sure it's a handled site
    if (!isSiteHandled(activeTabLink))
    {
        setBadgeText();
        setBageTitle("Nu avem preturi agregate pentru acest site");
        return;
    }

    // make sure it's a product page
    if (!isProductPage(activeTabLink))
    {
        setBadgeText();
        setBageTitle("Intra pe pagina unui produs ca sa poti vedea istoric");
        return;
    }

    // check cache
    if (CACHE.valid("getSitesCount", activeTabLink))
    {
        let sitesCountCached = CACHE.data("getSitesCount", activeTabLink).sitesCount;
        // if product not found then use an alternative cache duration (which is much lower)
        if (sitesCountCached || CACHE.valid("getSitesCount", activeTabLink, "getSitesCount_notFound"))
        {
            __updateSitesCount(sitesCountCached, CACHE.data("getSitesCount", activeTabLink).result);
            return;
        }
    }

    setBadgeText("...", "orange");
    setBageTitle("Caut produsul, asteapta te rog...");
    let requestTabLink = activeTabLink; // save tab link, activeTabLink might change before request is finished
    API("getSitesCount", { link: encodeURIComponent(requestTabLink) }, function (data)
    {
        let sitesCount = data && data.hasOwnProperty("sitesCount") && data.sitesCount ? data.sitesCount : "";
        let result = data && data.hasOwnProperty("result") ? data.result : "";
        CACHE.init("getSitesCount", requestTabLink, { sitesCount, result });

        // update sites count only if this is the same tab as when the request started and was not changed in the meant ime
        if (activeTabLink == requestTabLink)
            __updateSitesCount(sitesCount, result);
        // otherwise just save the value for when returning to the tab
        else
            __cacheSitesCount(requestTabLink, sitesCount);

        // check if config changed in the mean time to force an update immediately
        if (data && data.hasOwnProperty("__configHash") && CONFIG.hasOwnProperty("__configHash") && data.__configHash != CONFIG.__configHash)
            updateConfig("configHashChanged");
    }, function(error)
    {
        // update sites count only if this is the same tab as when the request started and was not changed in the meant ime
        if (activeTabLink == requestTabLink)
        {
            setBadgeText("...", "#FF9398");
            setBageTitle("%s, mai incerc...".fmt(error && error.indexOf("<html>") == -1 ? "EROARE: %s".fmt(error) : "A aparut o eroare"));
        }
    }, true,
    function(error)
    {
        // update sites count only if this is the same tab as when the request started and was not changed in the meant ime
        if (activeTabLink == requestTabLink)
        {
            setBadgeText("X", "#FF9398");
            setBageTitle("%s, nu se poate verifica produsul".fmt(error && error.indexOf("<html>") == -1 ? "EROARE: %s".fmt(error) : "A aparut o eroare"));
        }
    });
}
