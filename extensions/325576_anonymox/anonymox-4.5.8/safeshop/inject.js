/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/


let affLink = '';
let amazonProductPage = null;
let isAmazonPage = false;

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    const data = event.data;

    if (typeof(window[data.function]) == "function") {
        window[data.function].call();
    }
}

function closeSafeshopModal() {
    $("#safeshop-iframe").addClass('ss-slide-out');
    browser.storage.local.get("dismissList", function(data) {
        const dismissList = data.dismissList;
        const now = new Date();
        if (dismissList) {
            dismissList[window.domain] = now.toJSON()
            browser.storage.local.set({'dismissList': dismissList});
        }
    });
}

function loadAffLink() {
    $("#safeshop-iframe").addClass('ss-slide-out');
    browser.storage.local.get("approvedList", function(data) {
        const approvedList = data.approvedList;
        if (approvedList) {
            approvedList[window.domain] = true;
            browser.storage.local.set({'approvedList': approvedList}, function() {
                if (amazonProductPage) {
                    createAGLArticle(amazonProductPage);
                }
                if (isAmazonPage) {
                    addAmazonRedirectRule();
                }
                window.location.href = affLink;
            });
        }
    });
}

function timeToShow(domain, dismissList, approvedList) {
    const now = Date.now();
    if (approvedList[domain]) {
        return false;
    }
    const lastDismissTime = dismissList[domain];
    if (!lastDismissTime) {
        return true;
    }
    const differenceInDays = (now - new Date(lastDismissTime)) / (1000 * 60 * 60 * 24);
    return differenceInDays > 1;
}

function addAmazonRedirectRule() {
    browser.runtime.sendMessage({
        message: 'addAmazonRedirectRule',
        domain: window.domain
    });
}

function renderAppPanel() {
    browser.storage.local.get(["ssData", "dismissList", "approvedList"], function(data) {
        let currentPage;
        let app_page;
        let html;
        const ssData = data.ssData;
        const dismissList = data.dismissList;
        const approvedList = data.approvedList;
        const domain = location.hostname.replace('www.', '');
        if (ssData) {
            window.domain = domain
            if(ssData[domain]) {
                if (timeToShow(domain, dismissList, approvedList)) {
                    currentPage = location.href;
                    const thisData = ssData[domain];
                    affLink = thisData.skimlink + `&url=${encodeURIComponent(currentPage)}`;
                    app_page = browser.runtime.getURL(`resources/app.html?domain=${domain}&ssl=${(location.protocol === 'https:')}${thisData.verified ? '&verified=true' : ''}${thisData.trusted ? '&trusted=true' : ''}`);
                    html = `<iframe id="safeshop-iframe" class="ss-slide-in" src="${app_page}"></iframe>`;

                    if (domain === "skechers.com") {

                        const div = $(`<div id="safeshop-iframe" class="ss-slide-in"></div>`);
                        const shadow = $(div)[0].attachShadow({ mode: 'closed' });
                        shadow.innerHTML = `<style>
                                                #safeshop-iframe {
                                                    position: fixed!important;
                                                    background: #FFFFFF!important;
                                                    box-shadow: rgb(0 0 0 / 20%) 0px 0px 10px 0px!important;
                                                    border-radius: 8px!important;
                                                    width: 280px!important;
                                                    height: 280px!important;
                                                    border: none!important;
                                                }
                                            </style>` + html;

                        $("body").append(div);
                    } else {

                        $("body").append(html);
                    }
                }
            }
        }
    });
}

browser.storage.local.get("premium").then(data => {
    if (data.premium) {
        browser.storage.local.get("activeSafeshop").then(result => {
            if (result.activeSafeshop) {
                renderAppPanel();
            }
        })
    } else {
        renderAppPanel();
    }
})

window.closeSafeshopModal = closeSafeshopModal;
window.loadAffLink = loadAffLink;

console.debug("inject.js")