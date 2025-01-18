(function () {
    'use strict';

    /**
     * Copyright (c) Meta Platforms, Inc. and affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    const STATES = Object.freeze({
        // Starting state for all frames/tabs
        START: 'START',
        // Tab is processing scripts
        PROCESSING: 'PROCESSING',
        // Disable the extension (it shouldn't be running on this tab)
        IGNORE: 'IGNORE',
        // Script verification against the manifest failed.
        INVALID: 'INVALID',
        // Unknown inline script from an extension was found
        RISK: 'RISK',
        // All script verifications succeeded
        VALID: 'VALID',
        // Timed out waiting for the manifest to be available on the page
        TIMEOUT: 'TIMEOUT',
    });
    const ICONS = {
        DEFAULT: {
            32: 'default_32.png',
            64: 'default_64.png',
            128: 'default_128.png',
        },
        FAILURE: {
            32: 'failure_32.png',
        },
        RISK: {
            32: 'risk_32.png',
        },
        VALID: {
            32: 'validated_32.png',
        },
    };
    ({
        [STATES.START]: ICONS.DEFAULT,
        [STATES.PROCESSING]: ICONS.DEFAULT,
        [STATES.IGNORE]: ICONS.DEFAULT,
        [STATES.INVALID]: ICONS.FAILURE,
        [STATES.RISK]: ICONS.RISK,
        [STATES.VALID]: ICONS.VALID,
        [STATES.TIMEOUT]: ICONS.RISK,
    });
    const MESSAGE_TYPE = Object.freeze({
        DEBUG: 'DEBUG',
        LOAD_COMPANY_MANIFEST: 'LOAD_COMPANY_MANIFEST',
        POPUP_STATE: 'POPUP_STATE',
        RAW_SRC: 'RAW_SRC',
        UPDATE_STATE: 'UPDATE_STATE',
        STATE_UPDATED: 'STATE_UPDATED',
        CONTENT_SCRIPT_START: 'CONTENT_SCRIPT_START',
        UPDATED_CACHED_SCRIPT_URLS: 'UPDATED_CACHED_SCRIPT_URLS',
    });
    const ORIGIN_TYPE = Object.freeze({
        FACEBOOK: 'FACEBOOK',
        WHATSAPP: 'WHATSAPP',
        MESSENGER: 'MESSENGER',
        INSTAGRAM: 'INSTAGRAM',
    });
    // Firefox and Safari currently do not support CompressionStream/showSaveFilePicker
    const DOWNLOAD_SRC_ENABLED = 'CompressionStream' in window && 'showSaveFilePicker' in window;

    /**
     * Copyright (c) Meta Platforms, Inc. and affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    const STATE_TO_POPUP_STATE = {
        [STATES.START]: 'loading',
        [STATES.PROCESSING]: 'loading',
        [STATES.IGNORE]: 'loading',
        [STATES.INVALID]: 'error',
        [STATES.RISK]: 'warning_risk',
        [STATES.VALID]: 'valid',
        [STATES.TIMEOUT]: 'warning_timeout',
    };
    const ORIGIN_TO_LEARN_MORE_PAGES = {
        [ORIGIN_TYPE.FACEBOOK]: {
            about: chrome.i18n.getMessage('about_code_verify_faq_url_fb'),
            failure: chrome.i18n.getMessage('validation_failure_faq_url_fb'),
            risk: chrome.i18n.getMessage('possible_risk_detected_faq_url_fb'),
            timeout: chrome.i18n.getMessage('network_timeout_faq_url_fb'),
        },
        [ORIGIN_TYPE.MESSENGER]: {
            about: chrome.i18n.getMessage('about_code_verify_faq_url_msgr'),
            failure: chrome.i18n.getMessage('validation_failure_faq_url_msgr'),
            risk: chrome.i18n.getMessage('possible_risk_detected_faq_url_msgr'),
            timeout: chrome.i18n.getMessage('network_timeout_faq_url_msgr'),
        },
        [ORIGIN_TYPE.WHATSAPP]: {
            about: chrome.i18n.getMessage('about_code_verify_faq_url_wa'),
            failure: chrome.i18n.getMessage('validation_failure_faq_url_wa'),
            risk: chrome.i18n.getMessage('possible_risk_detected_faq_url_wa'),
            timeout: chrome.i18n.getMessage('network_timeout_faq_url_wa'),
        },
        [ORIGIN_TYPE.INSTAGRAM]: {
            about: chrome.i18n.getMessage('about_code_verify_faq_url_ig'),
            failure: chrome.i18n.getMessage('validation_failure_faq_url_ig'),
            risk: chrome.i18n.getMessage('possible_risk_detected_faq_url_ig'),
            timeout: chrome.i18n.getMessage('network_timeout_faq_url_ig'),
        },
    };
    // doing this so we can add support for i18n using messages.json
    function attachTextToHtml() {
        const i18nElements = document.querySelectorAll(`[id^="i18n"]`);
        Array.from(i18nElements).forEach(element => {
            element.innerHTML = chrome.i18n.getMessage(element.id);
        });
    }
    function attachListeners(origin) {
        if (!(origin && origin in ORIGIN_TO_LEARN_MORE_PAGES)) {
            throw new Error(`Learn more pages for origin type: ${origin} do not exist!`);
        }
        const learnMoreUrls = ORIGIN_TO_LEARN_MORE_PAGES[origin];
        const menuButtonsList = document.getElementsByClassName('menu_button');
        Array.from(menuButtonsList).forEach(menuButton => {
            menuButton.addEventListener('click', () => updateDisplay('menu'));
        });
        const closeMenuButton = document.getElementById('close_menu');
        closeMenuButton === null || closeMenuButton === void 0 ? void 0 : closeMenuButton.addEventListener('click', () => window.close());
        const menuRowList = document.getElementsByClassName('menu_row');
        const learnMoreMenuItem = menuRowList[0];
        learnMoreMenuItem.addEventListener('click', _evt => {
            chrome.tabs.create({ url: learnMoreUrls.about });
        });
        if (learnMoreMenuItem instanceof HTMLElement) {
            learnMoreMenuItem.style.cursor = 'pointer';
        }
        const downloadReleaseSourceMenuItem = menuRowList[2];
        downloadReleaseSourceMenuItem.addEventListener('click', _evt => {
            sendMessageToActiveTab('downloadReleaseSource');
        });
        if (downloadReleaseSourceMenuItem instanceof HTMLElement) {
            downloadReleaseSourceMenuItem.style.cursor = 'pointer';
        }
        if (origin === ORIGIN_TYPE.WHATSAPP) {
            downloadReleaseSourceMenuItem.remove();
        }
        const downloadPageSourceText = document.getElementsByClassName('status_message_highlight')[0];
        const downloadSrcButton = document.getElementById('i18nDownloadSourceButton');
        if (DOWNLOAD_SRC_ENABLED) {
            const downloadPageSourceMenuItem = menuRowList[1];
            downloadPageSourceMenuItem.addEventListener('click', () => updateDisplay('download'));
            if (downloadPageSourceMenuItem instanceof HTMLElement) {
                downloadPageSourceMenuItem.style.cursor = 'pointer';
            }
            downloadPageSourceText.addEventListener('click', () => {
                sendMessageToActiveTab('downloadSource');
            });
            if (downloadPageSourceText instanceof HTMLElement) {
                downloadPageSourceText.style.cursor = 'pointer';
            }
            if (downloadSrcButton) {
                downloadSrcButton.onclick = () => {
                    sendMessageToActiveTab('downloadSource');
                };
                downloadSrcButton.style.cursor = 'pointer';
            }
            downloadPageSourceText.addEventListener('click', () => updateDisplay('download'));
            if (downloadPageSourceText instanceof HTMLElement) {
                downloadPageSourceText.style.cursor = 'pointer';
            }
        }
        else {
            menuRowList[1].remove();
            downloadPageSourceText.remove();
            const downloadMessagePartTwo = document.getElementById('i18nValidationFailureStatusMessagePartTwo');
            downloadMessagePartTwo === null || downloadMessagePartTwo === void 0 ? void 0 : downloadMessagePartTwo.remove();
            downloadSrcButton === null || downloadSrcButton === void 0 ? void 0 : downloadSrcButton.remove();
        }
        const learnMoreList = document.getElementsByClassName('anomaly_learn_more_button');
        learnMoreList[0].addEventListener('click', () => {
            chrome.tabs.create({ url: learnMoreUrls.failure });
        });
        if (learnMoreList[0] instanceof HTMLElement) {
            learnMoreList[0].style.cursor = 'pointer';
        }
        const riskLearnMoreList = document.getElementsByClassName('risk_learn_more_button');
        riskLearnMoreList[0].addEventListener('click', () => {
            chrome.tabs.create({ url: learnMoreUrls.risk });
        });
        if (riskLearnMoreList[0] instanceof HTMLElement) {
            riskLearnMoreList[0].style.cursor = 'pointer';
        }
        const retryButtonList = document.getElementsByClassName('retry_button');
        Array.from(retryButtonList).forEach(retryButton => {
            retryButton.addEventListener('click', () => {
                chrome.tabs.reload();
            });
            if (retryButton instanceof HTMLElement) {
                retryButton.style.cursor = 'pointer';
            }
        });
        const timeoutLearnMoreList = document.getElementsByClassName('timeout_learn_more_button');
        timeoutLearnMoreList[0].addEventListener('click', () => {
            chrome.tabs.create({ url: learnMoreUrls.timeout });
        });
        if (timeoutLearnMoreList[0] instanceof HTMLElement) {
            timeoutLearnMoreList[0].style.cursor = 'pointer';
        }
    }
    function updateDisplay(state) {
        const popupState = STATE_TO_POPUP_STATE[state] || state;
        Array.from(document.getElementsByClassName('state_boundary')).forEach((element) => {
            if (element instanceof HTMLElement) {
                if (element.id == popupState) {
                    element.style.display = 'flex';
                    document.body.className = popupState + '_body';
                }
                else {
                    element.style.display = 'none';
                }
            }
        });
    }
    function setUpBackgroundMessageHandler(tabId) {
        if (tabId == null || tabId.trim() === '') {
            console.error('[Popup] No tab_id query param', document.location);
            return;
        }
        chrome.runtime.onMessage.addListener(message => {
            if (!('type' in message)) {
                return;
            }
            if (message.type === MESSAGE_TYPE.STATE_UPDATED &&
                message.tabId.toString() === tabId) {
                updateDisplay(message.state);
            }
        });
    }
    function sendMessageToActiveTab(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.tabs.sendMessage(tabId, { greeting: message }, () => { });
            }
        });
    }
    (function () {
        const params = new URL(document.location.href).searchParams;
        setUpBackgroundMessageHandler(params.get('tab_id'));
        const state = params.get('state');
        state && updateDisplay(state);
        attachTextToHtml();
        attachListeners(params.get('origin'));
    })();

})();
