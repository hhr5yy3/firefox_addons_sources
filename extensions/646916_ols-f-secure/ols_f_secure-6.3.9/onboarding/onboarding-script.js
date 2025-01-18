/*
 * Copyright (c) F-Secure Corporation. All rights reserved.
 * See license terms for the related product.
 */

const schemaMonitor = new FsSchemaMonitor();

function localizeString(str) {
    switch (str) {
        case "ext_onboarding_description_consent_warn_descr":
        {
            const extension_name = chrome.i18n.getMessage('ext_name');
            const privacy = chrome.i18n.getMessage('ext_onboarding_privacy_policy_link');
            return chrome.i18n.getMessage(str, [extension_name, privacy]);
        }
        default:
        {
            return str ? chrome.i18n.getMessage(str) : '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-locale]').forEach(elem => {
        elem.innerHTML = localizeString(elem.dataset.locale);
    });
    document.getElementById('accept-button').addEventListener('click', set_consent_true);
    document.getElementById('decline-button').addEventListener('click', decline);
    document.getElementById('open-privacy-policy').addEventListener('click', open_privacy);
    BrowserStorage.setLocal({consentAccepted: false});
    schemaMonitor.start();
    BrowserStorage.setLocal({browserInfo: navigator.userAgent});
});

function display_done_message() {
    const localized_message = chrome.i18n.getMessage('ext_onboarding_complete_message');
    alert(localized_message);
    close_consent_page();
}

function close_consent_page() {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.remove(tab.id);
    });
}

function set_consent_true() {
    chrome.runtime.sendMessage({ type: MessageName.SetConsent }, () => {
        display_done_message();
    });
}

function decline() {
    const localized_message = chrome.i18n.getMessage("ext_onboarding_fail_message");
    alert(localized_message);
    chrome.runtime.sendMessage({ type: MessageName.ConsentDecline });
}

function open_privacy() {
    let url = chrome.runtime.getURL("legalhtml/eng/privacy_policy.html");
    const privacy_policy_language = get_privacy_policy_language_code();
    if (privacy_policy_language) {
        url = chrome.runtime.getURL(`onboarding/legalhtml/${privacy_policy_language}/browsing_protection.html`);
    }
    chrome.tabs.create({ url });
}

function get_privacy_policy_language_code() {
    let privacy_policy_language = null;
    let current_locale = chrome.i18n.getUILanguage();
    privacy_policy_language = LanguageMap[current_locale];
    if (!privacy_policy_language) {
        const dash_index = current_locale.indexOf('-');
        if (dash_index !== -1) {
            current_locale = current_locale.substring(0, dash_index);
            privacy_policy_language = LanguageMap[current_locale];
        }
    }
    console.debug(`Got language mapping ${privacy_policy_language} for locale ${current_locale}`);
    return privacy_policy_language;
}