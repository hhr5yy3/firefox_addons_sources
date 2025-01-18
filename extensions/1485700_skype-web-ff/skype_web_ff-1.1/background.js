"use strict";

const SKYPE_URLS = [ "https://web.skype.com/*", "https://preview.web.skype.com/*", "https://join.skype.com/*" ];
const CHROME_USER_AGENT = "Mozilla/5.0 (X11; Fedora; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36";

function rewriteUserAgentHeader(evnt) {
    for (let i = 0; i < evnt.requestHeaders.length; i++) {
        if (evnt.requestHeaders[i].name.toLowerCase() === "user-agent") {
            evnt.requestHeaders[i].value = CHROME_USER_AGENT;
        }
    }

    return { requestHeaders: evnt.requestHeaders };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    { urls: SKYPE_URLS },
    [ "blocking", "requestHeaders" ]
);
