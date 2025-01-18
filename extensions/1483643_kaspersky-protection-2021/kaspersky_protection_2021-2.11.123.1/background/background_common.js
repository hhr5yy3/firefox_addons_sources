
function GetHostAndPort(url)
{
    if (!url)
        return "";

    let urlString = typeof url !== "string" ? url.toString() : url;
    let hostBeginPos = urlString.indexOf("//");
    if (hostBeginPos === -1)
    {
        urlString = self.location.pathname || "";
        hostBeginPos = urlString.indexOf("//");
        if (hostBeginPos === -1)
            return "";
    }
    hostBeginPos += 2;
    let hostEndPos = urlString.indexOf("/", hostBeginPos);
    if (hostEndPos === -1)
        hostEndPos = urlString.length;
    const originParts = urlString.substring(0, hostEndPos).split("@");
    const origin = originParts.length > 1 ? originParts[1] : originParts[0];
    return origin[0] === "/" ? self.location.protocol + origin : origin;
}

const AvNs = {
    EmptyFunc: () => {},
    RunModule: func =>
    {
        try
        {
            func();
        }
        catch (e)
        {
            AvNs.SessionError(e);
        }
    },
    SetTimeout: (callback, timeout, pluginId) => setTimeout(() =>
    {
        try
        {
            callback();
        }
        catch (e)
        {
            AvNs.SessionError(e, pluginId);
        }
    }, timeout),
    SetInterval: (callback, timeout, pluginId) => setInterval(() =>
        {
            try
            {
                callback();
            }
            catch (e)
            {
                AvNs.SessionError(e, pluginId);
            }
        },
        timeout),
    Log: () => {},

    NmsLog: () => {},

    IsDefined: variable => typeof variable !== "undefined",
    JSONParse: message => JSON.parse(message),
    JSONStringify: obj => JSON.stringify(obj),
    BrowserName: "firefox",
    IsSenderPopup: sender => sender.id === browsersApi.runtime.id && sender.url === browsersApi.runtime.getURL("popup/popup.html"),
    EncodeTabId: (windowId, tabId, frameId) => `${AvNs.BrowserName}.tab.${windowId}:${tabId}.${frameId}`,
    SplitTabId: encodedTabId =>
    {
        const result = encodedTabId.match(/(\w*).tab.(\d*):(\d*).(\d*)/);
        const browser = result[1];
        const windowId = parseInt(result[2], 10);
        const tabId = parseInt(result[3], 10);
        const frameId = parseInt(result[4], 10);
        return { browser: browser, windowId: windowId, tabId: tabId, frameId: frameId };
    },
    ValidateTabId: encodedTabId =>
    {
        try
        {
            const parts = AvNs.SplitTabId(encodedTabId);
            return parts.browser === AvNs.BrowserName;
        }
        catch (e)
        {
            AvNs.SessionLog(e);
            return false;
        }
    },
    TrySendResponse: (sendResponse, responseObject) =>
    {
        try
        {
            sendResponse(responseObject);
        }
        catch (e)
        {
            AvNs.Log(`Response was not sent, sender page was closed or redirected: ${e}`);
        }
    },
    MaxRequestDelay: 2000,
    StartLocationHref: browsersApi.runtime.getURL("background/main.html"),
    IsTopLevel: true,
    GetPageStartTime: () => 0,
    IsCorsRequest: (url, initiator) =>
    {
        try
        {
            const urlOrigin = GetHostAndPort(url);
            const initiatorOrigin = GetHostAndPort(initiator);

            return Boolean(urlOrigin) && Boolean(initiatorOrigin) && urlOrigin !== initiatorOrigin;
        }
        catch (e)
        {
            AvNs.SessionLog(`Error check CORS request, url: ${url} , initiator: ${initiator}, error: ${e.message}`);
            return false;
        }
    },
    TryCreateUrl: url =>
    {
        try
        {
            return new URL(url);
        }
        catch (e)
        {
            AvNs.SessionLog(`Can't create URL from ${url}`);
            return null;
        }
    },
    TrySendMessage: (port, message) =>
    {
        try
        {
            port.postMessage(message);
        }
        catch (e)
        {
            if (e.message && e.message.startsWith("Attempt to postMessage on disconnected port"))
                AvNs.SessionLog(`Attempt to postMessage on disconnected port: ${JSON.stringify(message)}`);
            else if (e.message && e.message.startsWith("Attempting to use a disconnected port object"))
                AvNs.SessionLog(`Attempting to use a disconnected port object ${JSON.stringify(message)}`);
            else
                AvNs.SessionError(e, "nms_back");
        }
    }
};
