/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */

function isTrustedShoppingRequestValid(url, referrer) {
    if (!Settings.trusted_shopping) {
        return false;
    }
    var isInRefferer = function(url, referrer)
    {
        if (!referrer) {
            return false;
        }
        if (new URL(url).hostname == new URL(referrer).hostname) {
            return true;
        }
        return false;
    }

    if (isInRefferer(url, referrer)) {
        return false;
    }

    return true;
}

const worker = new OlsWorker();
var PageInfoMap = {};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.type) {
        case MessageName.Init:
            worker.getNativeMessagingStatus((status) => {
                const response = (status === ConnectionStatus.Connected) ? InitResult.Success : InitResult.Failure;
                sendResponse({status: response, settings: Settings});
            });
            break;
        case MessageName.UserRating:
            worker.userRating(request.info.url, request.info.verdict, request.info.categories, request.info.notes);
            sendResponse();
            break;
        case MessageName.Popup: {
            const url = TabUrl[request.tab.id] ? TabUrl[request.tab.id].url : request.tab.url;
            getUrlInfo(url).then( (result) => {
                let info = result;
                info.tabId = request.tab.id;
                let categories = info.categories;
                if (TabUrl[request.tab.id]) {
                    info.adBlockedCount = worker.getAdCount(request.tab.id);
                    if (TabUrl[request.tab.id].block) {
                        info.block = TabUrl[request.tab.id].block;
                    }
                    if (TabUrl[request.tab.id].orsp && TabUrl[request.tab.id].orsp.length > 0) {
                        categories = TabUrl[request.tab.id].orsp;
                    }
                }
                if (worker.isShoppingWebsite(categories)) {
                    info.shoppingWebsite = true;
                    if (Settings.trusted_shopping) {
                        info.rating = worker.getShoppingRating(categories);
                    }
                }
                chrome.runtime.sendMessage( {type: MessageName.Infopopup, info, settings: Settings} );
            })
            sendResponse();
        }
            break;
        case MessageName.ConsentDecline:
            logi("Uninstalling extension");
            chrome.management.uninstallSelf(() => {
                logi('Uninstall is complete');
            });
            sendResponse();
            break;
        case MessageName.SetConsent:
            logi("Consent accepted");
            BrowserStorage.setLocal({consentAccepted: true});
            Action.onClicked.removeListener(showConsent);
            worker.init();
            sendResponse();
            break;
        case MessageName.AllowDomain:
            worker.allowDomainMessage(request.url);
            sendResponse();
            break;
        case MessageName.OpenExceptions:
            worker.openExceptionsMessage();
            sendResponse();
            break;
        case MessageName.CheckWhitelist:
            worker.checkWhitelistMessage(request.url).then(whitelistInfo => {
                sendResponse(whitelistInfo);
            });
            break;
        case MessageName.GetPlatformInfo:
            chrome.runtime.getPlatformInfo(platform => {
                sendResponse(platform);
            });
            break;
        case MessageName.RequestURLReputation:
            worker.checkURLReputation(request.url).then((response) => {
                sendResponse(response);
            });
            break;
        case MessageName.DebugInfo:
            worker.checkURLReputation(request.url).then((response) => {
                response.settings = Settings;
                response.extId = chrome.runtime.id;
                response.extVer = chrome.runtime.getManifest().version;
                response.browserName = Browser.name;
                response.extName = chrome.runtime.getManifest().name;
                BrowserStorage.getLocal(["customization", "userAdServingDomains"]).then(result => {
                    const domainListCount = result.userAdServingDomains ? result.userAdServingDomains.length : 0;
                    response.userAdServingDomainsLength = domainListCount;
                    response.customization = result.customization;
                    sendResponse(response);
                });
            });
            break;
        case MessageName.SchemaChanged:
            BrowserStorage.setLocal({schema: request.schema}).then(() => {
                const tabId = sender.tab ? sender.tab.id : null;
                if (tabId) {
                    worker.updateStatus(tabId);
                }
                sendResponse();
            });
            break;
        case MessageName.GetBankingMode:
            sendResponse(worker.bankingMode);
            break;
        case MessageName.DevToolsOpened:
            DataPipeline.devToolsOpened(request.url);
            sendResponse();
            break;
        case MessageName.WebsiteConsentRejected:
            DataPipeline.consentRejected(request.url, request.provider, request.result);
            sendResponse();
            break;
        case MessageName.DebugMode:
            sendResponse(Settings.debug_mode);
            break;
        case MessageName.ShoppingWebsite: {
            let orspData = getUrlInfo(request.url);
            orspData.then( (result) => {
                if (isTrustedShoppingRequestValid(request.url, request.referrer) && worker.isShoppingWebsite(result.categories)) {
                    const rating = worker.getShoppingRating(result.categories);
                    logi("Shopping website detected, rating", rating);
                    if (rating >= 1 && rating <= 5) {
                        sendResponse({rating: rating});
                        const sendTelemetrySafeShoppingSite = Settings.trusted_shopping_popup_safe && rating >= 4;
                        const sendTelemetrySuspiciousShoppingSite = Settings.trusted_shopping_popup_suspicious && rating >= 2 && rating <= 3;
                        if (sendTelemetrySafeShoppingSite || sendTelemetrySuspiciousShoppingSite) {
                            DataPipeline.trustedShoppingPopupShown(request.url, rating);
                        }
                    }
                    else {
                        sendResponse();
                    }
                }
                else {
                    sendResponse();
                }
            })}
            break;
        case MessageName.AdBlockStatus:
            sendResponse({type: "adblockStatusResponse", isEnabled: worker.getAdblockStatus()});
            break;
        case MessageName.BlockData:
            if (sender.tab && sender.tab.id && TabUrl[sender.tab.id] && TabUrl[sender.tab.id].block) {
                const block = TabUrl[sender.tab.id].block;
                logd("Responding to block object request with", block, "for tabId", sender.tab.id);
                sendResponse(block);
            } else {
                loge("No block object for tabId", sender.tab.id);
                sendResponse({});
            }
            break;
        case MessageName.PaymentFormFound:
            logd(`Payment form found at url: ${request.url}, tab id: ${sender.tab.id}`);
            worker.contentChecker.setPaymentForm(sender.tab.id, request.url);
            sendResponse();
            break;
        case MessageName.SavePageInfo:
            PageInfoMap[request.tabID] = { 
                status: request.status,
                isBank: request.isBank,
                url: request.url,
                categories: request.categories
            };
            sendResponse();
            break;
        case MessageName.GetPageInfo:
            sendResponse(PageInfoMap[request.tabID]);
            break;
        case MessageName.IframesRemoved:
            DataPipeline.unsafeIframesRemoved(request.url, request.iframesRemoved);
            break;
        }
        return true; // required for async sendResponse object lifetime
    }
);

function showConsent() {
    return new Promise(resolve => {
        // do not show consent if already shown
        chrome.tabs.query({}, tabs => {
            for (const tab of tabs) {
                if (tab.url === chrome.runtime.getURL(OnboardingUrl)) {
                    console.debug("Consent page is already opened");
                    resolve();
                    return;
                }
            }
            // check if consent has been accepted already
            BrowserStorage.getLocal("consentAccepted").then(result => {
                if (!result.consentAccepted) {
                    console.warn("Please, see consent page");
                    const url = chrome.runtime.getURL(OnboardingUrl);
                    chrome.tabs.create({ url });
                    worker.setExtensionNoConsent();
                }
                resolve();
           });
        });
    });
}

// for Edge/Chrome/Safari consent is included into a product onboarding flow, show it just for Firefox
if (Browser.isFirefox) {
    // Show consent also when script fired (to handle incognito mode switch)
    showConsent().then(() => {
        BrowserStorage.getLocal("consentAccepted").then(result => {
            if (result.consentAccepted) {
                // We start listeners here, when consent is accepted
                worker.init();
            } else {
                worker.setExtensionNoConsent();
            }
        });
    });
} else {
    worker.init();
}
