"use strict";

chrome.webRequest.onBeforeRequest.addListener(
    redirect,
    {urls: ["<all_urls>"], types: ["main_frame", "sub_frame"]},
    ["blocking"]
);

chrome.webNavigation.onReferenceFragmentUpdated.addListener(function(details) {
    if ( /webhp.*q=/.test(details.url) ) {
        let new_url = _add_if_necessary(details.url, "safe=active&ssui=on");
        if ( new_url ) {
            chrome.tabs.update(details.tabId, {'url': new_url});
        }
    }
});

function redirect(requestDetails) {
    let redir_url = _alter(requestDetails.url);
    if ( redir_url ) {
        return { redirectUrl: redir_url };
    }
}


function _alter(uri) {
    if ( uri.indexOf("google.") != -1 ) {
        if (/q=/.test(uri)) {
            return _add_if_necessary(uri, "safe=active&ssui=on");
        }
    } else if ( uri.indexOf("search.yahoo.") != -1 ) {
        if (/(\/search)/.test(uri)) {
            return _add_if_necessary(uri, "vm=r");
        }
    } else if ( uri.indexOf("bing.") != -1 ) {
        if (/(\/search|\/videos|\/images|\/news)/.test(uri)) {
            return _add_if_necessary(uri, "adlt=strict");
        }
    } else if ( uri.indexOf("duckduckgo.") != -1 ) {
        if ( uri.indexOf("q=") != -1 ) {
            return _add_if_necessary(uri, "kp=1");
        }
    } else if ( uri.indexOf("yandex.") != -1 ) {
        if ( uri.indexOf("/search") != -1 ) {
            return _add_if_necessary(uri, "fyandex=1");
        }
    }
    return false;
}

function _add_if_necessary(uri, needed_part) {
    if (uri.indexOf(needed_part) == -1) {
        return uri + "&" + needed_part;
    } else {
        return false;
    }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (let i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'YouTube-Restrict') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        details.requestHeaders.push({"name": "YouTube-Restrict",
                                     "value": "Moderate"});
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["*://*.youtube.com/*"], types: ["main_frame", "sub_frame"]},
    ["blocking", "requestHeaders"]
);


chrome.cookies.onChanged.addListener(function(changeInfo) {
    if ( changeInfo.removed ) {
        return;
    }

    if ( changeInfo.cookie.name === "preferences" &&
         ( changeInfo.cookie.domain === ".ixquick.com" ||
           changeInfo.cookie.domain === ".startpage.com" ) ) {
        _removeCookie(changeInfo.cookie);
    }

    if ( changeInfo.cookie.name === "ws_prefs" &&
         ( changeInfo.cookie.domain === "www.dogpile.com" ) ) {
        _removeCookie(changeInfo.cookie);
    }

    if ( changeInfo.cookie.name === "content_rating" &&
         ( changeInfo.cookie.domain === ".vimeo.com" ) ) {
        _removeCookie(changeInfo.cookie);
    }

    if ( changeInfo.cookie.name === "over18" &&
         ( changeInfo.cookie.domain === ".reddit.com" ) ) {
        _removeCookie(changeInfo.cookie);
    }

    if ( changeInfo.cookie.name === "ECFG" &&
         ( changeInfo.cookie.domain === ".ecosia.org" ) ) {
        _removeCookie(changeInfo.cookie);
    }
});
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        return { cancel: details.method === "POST" };
    },
    {urls: ["*://vimeo.com/settings/contentrating"]},
    ["blocking"]
);

function _removeCookie(cookie) {
  let url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name});
}   