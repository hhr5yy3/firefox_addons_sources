import { Core, Storage, Interception } from './interceptor.js';
import { Rules } from './rules.js';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getInterceptStatus") {
        sendResponse({ isInterceptEnabled: Core.isInterceptEnabled });
    } else if (message.action === "toggleIntercept") {
        sendResponse({ isInterceptEnabled: Core.toggleIntercept() });
    } else if (message.action === "getRequests") {
        const { page, itemsPerPage, filter, inverseFilter, sort } = message;
        const result = Storage.getFilteredSortedRequests(filter, inverseFilter, sort, page, itemsPerPage);
        sendResponse(result);
    } else if (message.action === "clearRequests") {
        Storage.clearRequests();
        sendResponse({ status: "OK" });
    } else if (message.action === "sendRepeaterRequest") {
        sendRepeaterRequest(message.request)
            .then(sendResponse)
            .catch(error => sendResponse({ error: error.message }));
        return true; // Indicates that the response is asynchronous
    }
    return true;
});

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({url: "extension-page.html"});
});

function sendRepeaterRequest(request) {
    const startTime = Date.now();
    const originalUrl = request.url;
    let contentTypeChanged = false;
    let protocolChanged = false;
    let domainChanged = false;
    let redirectStatus = null;

    const fetchOptions = {
        method: request.method,
        headers: request.headers,
        redirect: 'follow'
    };
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        fetchOptions.body = request.body;
    }

    return fetch(request.url, fetchOptions).then(async response => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;

        if (response.redirected) {
            const urlObject = new URL(originalUrl);
            const originalProtocol = urlObject.protocol;
            const originalDomain = urlObject.hostname;

            const finalUrl = new URL(response.url);
            if (finalUrl.protocol !== originalProtocol) protocolChanged = true;
            if (finalUrl.hostname !== originalDomain) domainChanged = true;

            redirectStatus = response.status;

            if (response.headers.get('content-type') !== request.headers['content-type']) {
                contentTypeChanged = true;
            }
        }

        return {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers),
            body: await response.text(),
            redirected: response.redirected,
            url: response.url,
            originalUrl: originalUrl,
            totalTime: totalTime,
            contentTypeChanged: contentTypeChanged,
            protocolChanged: protocolChanged,
            domainChanged: domainChanged,
            redirectStatus: redirectStatus
        };
    });
}

// Initialize Rule system
Rules.init();