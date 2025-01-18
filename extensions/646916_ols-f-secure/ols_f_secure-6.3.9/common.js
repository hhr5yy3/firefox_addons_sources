/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */

function extensionName() {
    if (Browser.isSafari) {
        return chrome.i18n.getMessage("ext_name_safari_full");
    }
    return chrome.runtime.getManifest().name;
}

function checkProductMaturity(extension_name, maturity) {
    return new Promise(resolve => {
        if (chrome.runtime.getManifest().name == chrome.i18n.getMessage(extension_name)) {
            resolve(true);
            return;
        }
        BrowserStorage.getLocal(["customization"]).then(storageResult => {
            const customization = storageResult.customization;
            resolve(customization && customization.Maturity && customization.Maturity === maturity);
        });
    });
}

function isAlpha() {
    return checkProductMaturity("ext_name_alpha", "alpha");
}

function isBeta() {
    return checkProductMaturity("ext_name_beta", "beta");
}

function isProduction() {
    return checkProductMaturity("ext_name", "production");
}

function isDebugMode() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: MessageName.DebugMode},
            function (response) {
                resolve(response);
            }
        );
    });
}

function getBlockData() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: MessageName.BlockData }, (block) => {
            resolve(block);
        });
    });
}

function getReputation(url) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            { type: MessageName.RequestURLReputation, url: url },
                 (response) => {
                    resolve(response);
                }
        );
    });
}

function getCategoryValue(categoryName, categories) {
    const categoryEntry = categories.filter(category => categoryName in category);
    return categoryEntry.length > 0 ? categoryEntry[0][categoryName] : -1;
}

function getI18nMessage(stringId, substitute = "") {
        const msg = chrome.i18n.getMessage(stringId, substitute);
        return msg ? msg : (">" + stringId);
}

function getSafetyVerdict(safeCategoryValue) {
    switch (safeCategoryValue) {
        case -100:
        case -80:
            return StatusType.Harmful;
        case -20:
            return StatusType.Suspicious;
        case 0:
            return StatusType.Unknown;
        case 100:
            return StatusType.Safe;
        default:
            break;
    }
    return StatusType.Unknown;
}

function safetyVerdictToExtensionState(verdict) {
    switch (verdict) {
        case StatusType.Harmful:
            return ExtensionState.Harmful;
        case StatusType.Suspicious:
            return ExtensionState.Suspicious;
        case StatusType.Safe:
            return ExtensionState.Safe;
        default:
            return ExtensionState.Unknown;
    }
}

function sanitizeUrlForPrivacy(url) {
    try {
        const parsed = new URL(url);
        return parsed.origin + parsed.pathname;
    }
    catch (_) {
        return "";
    }
}