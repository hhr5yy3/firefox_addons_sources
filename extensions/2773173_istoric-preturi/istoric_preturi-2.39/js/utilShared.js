function CACHE_handle(type, identifier, callbackValid, callbackInvalid)
{
    chrome.runtime.sendMessage({
        message: "cacheIsValid",
        type: type,
        identifier: identifier,
    }, function (result)
    {
        if (result.valid)
        {
            if (typeof callbackValid == "function")
                callbackValid(result.data);
        }
        else
        {
            if (typeof callbackInvalid == "function")
                callbackInvalid();
        }
    });
}

function CACHE_init(type, identifier, data)
{
    if (typeof data == "undefined")
        data = null;

    chrome.runtime.sendMessage({
        message: "cacheInit",
        type: type,
        identifier: identifier,
        data: data !== null ? { data } : null,
    });
}

function DEBUG_OR_EXECUTE(debugMessageOrCallback, nonDebugCallback)
{
    chrome.runtime.sendMessage({
        message: "isDebugMode",
    }, function (debugMode)
    {
        if (debugMode)
        {
            if (typeof debugMessageOrCallback == "function")
                debugMessageOrCallback();
            else
                alert(`Istoric Preturi debug:\n\n${debugMessageOrCallback}`);
        }
        else
        {
            if (typeof nonDebugCallback == "function")
                nonDebugCallback();
        }
    });
}

function DEBUG_CONSOLE(msg)
{
    console.log(`ISTORIC PRETURI EXTENSION:\n\n${msg}`);
}

function getHostnameFromLink(href)
{
    var l = document.createElement("a");
    l.href = href;
    return l;
}

function extractVariantFromPage(siteConfig, contents, pageLink)
{
    if (siteConfig && siteConfig.hasOwnProperty("selectors_variant") && siteConfig.selectors_variant !== null)
    {
        for (let i = 0; i < siteConfig.selectors_variant.length; i++)
        {
            let selector = siteConfig.selectors_variant[i];

            try
            {
                // extract from contents by default
                let whereToSearch = contents;
                // extract from URL
                if (selector.substr(-4) == "@URL")
                {
                    whereToSearch = pageLink;
                    selector = selector.slice(0, -4);
                }

                let caseInsensitive = selector.substr(-2) == "/i";
                let pattern = selector.substr(1, selector.length - (caseInsensitive ? 3 : 2));
                let regExp = new RegExp(pattern, caseInsensitive ? "i" : "");
                let groups = whereToSearch.match(regExp);
                if (groups && groups[1].length)
                    return groups[1];
            }
            catch (e) { }
        }
    }
    
    return "";
}

(function ()
{
    var CurrentUrlService = function ()
    {
        var getUrl = function ()
        {
            return new Promise(function (resolve, reject)
            {
                if (chrome.tabs)
                {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs)
                    {
                        resolve(tabs[0].url);
                    });
                }
                else
                    resolve(window.location.href);
            });
        };
        var getTitle = function ()
        {
            return new Promise(function (resolve, reject)
            {
                if (chrome.tabs)
                {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs)
                    {
                        resolve(tabs[0].title);
                    });
                }
                else
                {
                    resolve(document.title);
                }
            });
        };
        var getContents = function (contents)
        {
            return new Promise(function (resolve, reject)
            {
                // inPage call, we already have the contents
                if (contents !== null)
                {
                    resolve(contents);
                }
                // extension bar call, need to fetch contents
                else if (chrome.tabs)
                {
                    chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    }, function (tabs)
                    {
                        chrome.tabs.executeScript(tabs[0].id, { code: `document.documentElement.outerHTML` }, function (result)
                        {
                            resolve(Array.isArray(result) ? result[0] : result)
                        });
                    });
                }
                else
                {
                    resolve(document.documentElement.outerHTML);
                }
            });
        };

        return {
            getUrl: getUrl,
            getTitle: getTitle,
            getContents: getContents,
        };
    }();

    window.istoricPreturi = {};
    window.istoricPreturi.loadContent = function (inPage)
    {
        let $iframe = $("#istoricPreturi-iframe");
        let initializeIframe = function(content, fromCache)
        {
            if (inPage)
            {
                // check if prepared content to be shown through iframe src instead of srcdoc
                let preparedKeyword = "__PREPARED__";
                if (content.substr(0, preparedKeyword.length) == preparedKeyword)
                {
                    let id = content.substr(preparedKeyword.length);
                    $iframe.attr("src", `${apiEndpoint}/getProductInfo_prepared?id=${id}`);
                }
                else
                    $iframe.attr("srcdoc", content);
            }
            else            
                $iframe.attr("srcdoc", content);

            let $loader = $("#istoricPreturi-loading-icon");
            if (fromCache)
            {
                $loader.hide();
                $iframe.fadeIn("fast");
            }
            else
                $loader.fadeOut("fast", function () { $iframe.fadeIn("fast"); });
        }

        CurrentUrlService.getUrl().then(function (currentUrl)
        {
            let currentUrlOriginal = currentUrl;
            currentUrl = cleanupLink(currentUrl);

            CurrentUrlService.getTitle().then(function (title)
            {
                CurrentUrlService.getContents(inPage ? document.documentElement.outerHTML : null).then(function (contents)
                {
                    var hostname = getHostnameFromLink(currentUrl).hostname.replace("www.", "");
                    chrome.runtime.sendMessage({
                        message: ["getSiteSettings"],
                        // getSiteSettings
                        hostname: hostname,
                        url: currentUrl,
                    }, function(siteConfig)
                    {
                        // check which variant is selected (if any)
                        let variant = extractVariantFromPage(siteConfig, contents, currentUrlOriginal);

                        // inPage and popup getProductInfo cache needs to be separated, they (may) have different contents
                        let cacheIdentifier = currentUrl + (inPage ? "_inPage" : "") + (variant.length ? "_%s".fmt(variant.hash()) : "");
                        CACHE_handle("getProductInfo", cacheIdentifier, function(data)
                        {
                            initializeIframe(data.data, true);
                        },
                        function ()
                        {
                            API("getProductInfo", { link: encodeURIComponent(currentUrl), title: encodeURIComponent(title), inPage: inPage ? 1 : 0, variant: variant }, function (data)
                            {
                                if (isNotPermittedResult(data))
                                    data = genericError;
                                else
                                    CACHE_init("getProductInfo", cacheIdentifier, data);

                                initializeIframe(data, false);
                            }, function (customError)
                            {
                                initializeIframe(typeof customError != "undefined" && customError ? customError : genericError, false);
                            }, false, null, "text");
                        });
                    });
                });
            });
        });
    };
})();
