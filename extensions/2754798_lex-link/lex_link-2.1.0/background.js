'use strict';

var rulesAccepted = false;

var read = function (name, deflt) {
    return browser.storage.sync.get([name])
        .then(result => {
            if (browser.runtime.lastError) { // assuming this exists
                throw new Error(browser.runtime.lastError);
            }

            return result[name] || deflt
        })
};

read('rulesAccepted', false).then(function (result) {
    rulesAccepted = result;
});

browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const linkApiUrl = 'https://linkapi.lex.pl';
                
        if (request.from === 'content' && request.subject === 'link') {
            let url = linkApiUrl + '/analyzeHtml';
            let body = 'html=' + escape(request.paragraphHtml)
                + '&siplex=false'
                + '&documentId=' + request.documentId;

            sendHttpPostRequest(url, body).then(response => {
                response.text().then(text => {
                    sendResponse({ status: response.status, html: text });
                });
            });
            return true;
            
        }

        if (request.from === 'content' && request.subject === 'release') {
            let url = linkApiUrl + '/remove';
            let body = 'documentId=' + request.documentId;

            sendHttpPostRequest(url, body);
            sendResponse();
            return true;
        }

        if (request.from === 'popup' && request.subject === 'get-links') {
            let url = linkApiUrl + '/getLinksFromHtml';
            let body = 'html=' + escape(request.text)
                + '&siplex=false'

            sendHttpPostRequest(url, body).then(response => {
                response.text().then(json => {
                    sendResponse({ status: response.status, links: json });
                });
            });
            return true;
        }
        return false;
    });

browser.contextMenus.create({
    'title': 'Szukaj w LEX',
    'contexts': ['selection'],
    'id': 'LexLinkSearchInLex'
});

browser.contextMenus.create({
    'title': 'Skanuj zaznaczony fragment strony',
    'contexts': ['selection'],
    'id': 'LexLinkSearchForLinks',
    'enabled': rulesAccepted
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'LexLinkSearchInLex') {
        LexLinkSearchInLex(info.selectionText);
    }
    if (info.menuItemId === 'LexLinkSearchForLinks') {
        LexLinkSearchForLinks();
    }
});

function LexLinkSearchForLinks() {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { from: 'background', subject: 'linkSelection' });
    });
}

async function sendHttpPostRequest(url, body) {
    return await sendHttpRequest(url, 'POST', body);
}

async function sendHttpRequest(url, method, body) {
    const key = 'ChsFfMTDGpD5ZcEDLzLLsLZdkqY2j7mN';
    let version = browser.runtime.getManifest().version;

    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': key,
        'Version': version
    });

    let options = {
        method: method,
        headers: headers,
        body: body
    };

    const response = await fetch(url, options);
    return response;
}

function LexLinkSearchInLex(text) {
    const sipLexSearchUrl = 'https://sip.lex.pl/#/search?sl=PL&q=';
    const utm = '&wk-ref=LEX_Link';
    const maxUrlLength = 2000;

    const maxSearchTextLength = maxUrlLength - sipLexSearchUrl.length - utm.length;

    let searchText = encodeURIComponent(text);
    if (searchText.length > maxSearchTextLength) {
        searchText = searchText.substring(0, maxSearchTextLength);
    }

    let lastPercent = searchText.lastIndexOf('%');
    if (lastPercent >= searchText.length - 2) {
        searchText = searchText.substring(0, lastPercent);
    }

    browser.tabs.create({
        url: sipLexSearchUrl + searchText + utm
    });
}