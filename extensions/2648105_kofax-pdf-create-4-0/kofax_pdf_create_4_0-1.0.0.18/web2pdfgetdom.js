
// ---------- enable or disable browser action

function enableBrowserActionButton() {
    chrome.runtime.sendMessage({ type: "InvokeEnableBrowserActionButton" }, function(response) {
        if (response == null) {
            setTimeout(function() { enableBrowserActionButton(); }, 100);
        }
    });
}

window.addEventListener("load", function() { enableBrowserActionButton(); });

window.document.addEventListener("readystatechange", function() {
    if (window.document.readyState == "complete") {
        enableBrowserActionButton();
    }
});

if (window.document.readyState == "complete") { enableBrowserActionButton(); }

document.addEventListener("readystatechange", function() {
    if (document.readyState == "complete") {
        enableBrowserActionButton();
    }
});

if (document.readyState == "complete") { enableBrowserActionButton(); }

// ---------- get dom context

function GetCompatModeStr(domDocument) {
    var compatModeStr = "";
    try {
        if (domDocument) {
            var compatStr = domDocument.compatMode;
            if (compatStr.toLowerCase() == "css1compat") {
                var docType = domDocument.doctype;
                if (docType != null) {
                    compatModeStr += "<!DOCTYPE ";
                    if (docType.name != null && docType.name != undefined) {
                        compatModeStr += docType.name;
                        if (docType.publicId != null && docType.publicId != undefined) {
                            compatModeStr += " PUBLIC \"" + docType.publicId + "\"";
                        }
                        if (docType.systemId != null && docType.systemId != undefined) {
                            compatModeStr += " \"" + docType.systemId + "\"";
                        }
                        if (docType.internalSubset != null && docType.internalsubset != undefined) {
                            compatModeStr += "\n[\n" + docType.internalsubset + "\n]";
                        }
                    }
                    compatModeStr += ">\n";
                }
            }
        }
    } catch (err) {}
    return compatModeStr;
}

function GetDOMContentString(domDocument) {
    var domData = GetCompatModeStr(domDocument) + domDocument.documentElement.outerHTML;
    return domData;
}

function ParseDOMContent(domWindow) {
    var domDataArray = [];
    try {
        var domDocument = domWindow.document;
        if (domDocument) {
            var domData = { frameID: "", frameName: "", frameSrc: "", frameBaseUrl: "", url: "", content: "" };
            if (domWindow.frameElement == null) {
                domData.url = domDocument.baseURI;
                domData.content = GetDOMContentString(domDocument);
                domDataArray.push(domData);
            }
            else {
                var st = domWindow.frameElement.style;
                if (st.width === "0px" || st.width === "" || st.height === "0px" || st.height === "" || st.display === "none") {
                    // filter display none element
                } else {
                    domData.frameID = domWindow.frameElement.id;
                    domData.frameName = domWindow.frameElement.name;
                    domData.frameSrc = domWindow.frameElement.src;
                    domData.frameBaseUrl = domWindow.frameElement.baseURI;
                    domData.url = domDocument.baseURI;
                    domData.content = GetDOMContentString(domDocument);
                    domDataArray.push(domData);
                }
            }
        }
        var frameList = domWindow.frames;
        if (!(frameList === undefined)) {
            var numFrames = frameList.length;
            for (var frameIndex = 0; frameIndex < numFrames; frameIndex++) {
                var frameWindow = frameList[frameIndex];
                if (!(frameWindow === undefined)) {
                    domDataArray = domDataArray.concat(ParseDOMContent(frameWindow));

                }
            }
        }
    } catch (err) { }
    return domDataArray;
}

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name == "GetDOMData") {
        port.onMessage.addListener(function(msg) {
            if (msg.request == "GetPageData") {
                var baseURL = document.baseURI;
                var domTitle = document.title;
                var domCookie = document.cookie;
                var domData = JSON.stringify(ParseDOMContent(window));
                port.postMessage({ response: "PageData", domtitle: domTitle, url: baseURL, domdata: domData, domcookie: domCookie, action: msg.action });
            } else if (msg.request == "GetLinkData") {
                var baseURL = msg.url;
                var domTitle = document.title;
                var domCookie = document.cookie;
                var domData = "";
                port.postMessage({ response: "LinkData", domtitle: domTitle, url: baseURL, domdata: domData, domcookie: domCookie, action: msg.action });
            }
        });
    }
});
