/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Initiliaze popup
 *   - Load Storage API data
 *   - Read information about current tab
 *   - Render popup based on tab information
 */
function init() {
    showProgressBar(true);

    browser.storage.local.get((data) => {
        document.manager.profile.value = data.defaultProfile;
        defaultProfile = data.defaultProfile;
        loadProfileList(data);

        if (typeof data.rules != 'object') {
            data.rules = {};
        }

        browser.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (typeof tabs[0].url == 'undefined') {
                // Ask the tab for its URL
                browser.tabs.sendMessage(tabs[0].id, {
                    action: 'getURL'
                }, (response) => {
                    if (typeof response == 'string' && response != null) {
                        renderForUrl(new URL(response), data.rules);
                    } else {
                        renderForGeneral();
                        loadProfile(defaultProfile);
                        if (browser.runtime.lastError == 'undefined') {}
                    }
                });
            } else {
                renderForUrl(new URL(tabs[0].url), data.rules);
            }

            refreshSetAsDefaultButton();
        });
    });
}

/**
 * Preload data for the specific URL
 * @param {URL} url
 * @param {Object} rules
 */
function renderForUrl(url, rules) {
    if (url.protocol == 'file:') {
        renderForLocalFile();
        return;
    }

    const domainRegex = /^(?:(?![-])[a-zA-Z0-9-]+(?<!-)\.)+[a-zA-Z]{2,}$/;
    const ipv4Regex = /^(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
    if (!domainRegex.test(url.hostname) && !ipv4Regex.test(url.hostname) && url.hostname != 'localhost') {
        renderForGeneral();
        return;
    }

    ruleForDomain = url.hostname;
    let usingRule = null;
    let selectedDomain;

    if (rules[url.hostname]) {
        usingRule = rules[url.hostname];
        selectedDomain = url.hostname;
    } else {
        const subdomains = url.hostname.split('.');
        subdomains[subdomains.length - 2] += '.' + subdomains.pop();

        do {
            subdomains[0] = '*';
            const subdomain = subdomains.join('.');

            if (rules[subdomain]) {
                usingRule = rules[subdomain];
                selectedDomain = subdomain;
                break;
            }

            subdomains.shift();
        } while (subdomains.length > 1);
    }

    if (usingRule != null && usingRule != 'default') {
        usingRule = usingRule.split('_')[1];
        document.manager.profile.value = usingRule;

        if (!document.manager.profile.options[document.manager.profile.selectedIndex]) {
            console.error('Scrollbar "%s" cannot be loaded from storage for rule "%s". Using default Scrollbar.', `profile_${usingRule}`, selectedDomain);
            usingRule = 'default';
            currentRule = defaultProfile;
            document.manager.profile.value = usingRule;
        } else {
            displayInheritanceDetails(selectedDomain);
            currentRule = usingRule;
        }

        loadProfile(currentRule);
    } else {
        displayInheritanceDetails('none');
        currentRule = 'default';
        loadProfile(defaultProfile);
    }

    refreshSetAsDefaultButton();
}

/**
 * Preload data for local file setting
 */
function renderForLocalFile() {
    browser.storage.local.get('localFileProfile', (data) => {
        if (typeof data.localFileProfile == 'number' && data.localFileProfile != null) {
            currentRule = data.localFileProfile;
            loadProfile(data.localFileProfile);
        } else if (data.localFileProfile == 'none') {
            currentRule = 'none';
            loadProfile('none');
        } else {
            currentRule = 'default';
            loadProfile(defaultProfile);
        }

        isLocalFile = true;
        document.body.classList.add('local-file');
        document.manager.profile.value = currentRule;
        displayInheritanceDetails('none');
        refreshSetAsDefaultButton();
    });
}

/**
 * Disable website-specific edits
 */
function renderForGeneral() {
    const useButton = document.getElementById('button-use');
    if (useButton) {
        useButton.parentNode.removeChild(useButton);
    }

    document.manager.profile.removeChild(document.manager.profile.children[1]);
    document.manager.profile.value = defaultProfile;

    loadProfile(defaultProfile);
    refreshSetAsDefaultButton();
}

/**
 * Display rule inheritance details
 * @param {String} domain
 */
function displayInheritanceDetails(domain) {
    const selector = document.getElementById('profile-selector-container');
    const bar = document.getElementById('profile-inherit');

    if (domain.charAt(0) == '*') {
        ruleInherit = true;
        bar.textContent = browser.i18n.getMessage('ruleInherit', domain.substring(2));
        bar.parentNode.classList.remove('hide');
        selector.classList.add('has-help');
    } else {
        ruleInherit = false;
        bar.textContent = '';
        bar.parentNode.classList.add('hide');
        selector.classList.remove('has-help');
    }
}

/**
 * Load list of profiles from Storage API
 * @param {Object} data
 */
function loadProfileList(data) {
    let sortedOptions = [];
    document.manager.profile.textContent = '';

    for (const key of Object.keys(data)) {
        if (key.split('_')[0] == 'profile') {
            const option = document.createElement('option');
            option.textContent = data[key].name;
            option.value = key.split('_')[1];
            sortedOptions.push(option);
        }
    }

    sortedOptions = sortedOptions.sort((a, b) => {
        return a.textContent.toUpperCase().localeCompare(b.textContent.toUpperCase());
    })

    for (const option of sortedOptions) {
        document.manager.profile.appendChild(option);
    }

    const defaultProfileName = (defaultProfile != 'none') ? data[`profile_${defaultProfile}`].name : browser.i18n.getMessage('profileUsingNone');
    const option = document.createElement('option');
    option.textContent = browser.i18n.getMessage('profileUsingDefault', defaultProfileName);
    option.value = 'default';
    option.classList.add('fixed-option');
    document.manager.profile.insertBefore(option, document.manager.profile.firstChild);

    const optionNone = document.createElement('option');
    optionNone.textContent = browser.i18n.getMessage('profileUsingNone');
    optionNone.value = 'none';
    optionNone.classList.add('fixed-option');
    document.manager.profile.insertBefore(optionNone, document.manager.profile.firstChild);

    document.manager.profile.value = 'default';
}

/**
 * Load profile from Storage API
 * @param {number} id
 */
function loadProfile(id) {
    showProgressBar(true);

    const widthOutput = document.getElementById('detail-width');
    const autoHideOutput = document.getElementById('detail-autoHide');
    const buttonsOutput = document.getElementById('detail-buttons');
    const thumbRadiusOutput = document.getElementById('detail-thumbRadius');
    const colorThumbOutput = document.getElementById('detail-color-thumb');
    const colorTrackOutput = document.getElementById('detail-color-track');
    const overrideOutput = document.getElementById('detail-override');
    const detailsContainer = document.getElementById('scrollbar-details-container');

    if (id == 'none') {
        detailsContainer.classList.add('dim');

        widthOutput.textContent = '-';
        autoHideOutput.textContent = '-';
        buttonsOutput.textContent = '-';
        thumbRadiusOutput.textContent = '-';
        overrideOutput.textContent = '-';

        colorThumbOutput.style.background = 'unset';
        colorThumbOutput.textContent = '-';
        colorThumbOutput.classList.remove('color-output');

        colorTrackOutput.style.background = 'unset';
        colorTrackOutput.textContent = '-';
        colorTrackOutput.classList.remove('color-output');

        showProgressBar(false);

        return;
    }

    browser.storage.local.get(`profile_${id}`, (data) => {
        const profile = loadWithDefaults(data[Object.keys(data)[0]]);
        detailsContainer.classList.remove('dim');

        // Fill width information
        switch (profile.width) {
            case 'auto':
            case 'unset':
                const key = (runningOn == browsers.FIREFOX) ? 'sizeDefault' : 'sizeWide';
                widthOutput.textContent = browser.i18n.getMessage(key);
                break;
            case 'thin':
                widthOutput.textContent = browser.i18n.getMessage('sizeThin');
                break;
            case 'none':
                widthOutput.textContent = browser.i18n.getMessage('sizeHidden');
                break;
            default:
                widthOutput.textContent = profile.customWidthValue + profile.customWidthUnit;
                break;
        }

        if (profile.width != 'none') {
            // Fill buttons information
            switch (profile.buttons) {
                case 'light':
                case 'dark':
                case 'auto':
                    buttonsOutput.textContent = browser.i18n.getMessage('optionYes');
                    break;
                default:
                    buttonsOutput.textContent = browser.i18n.getMessage('optionNo');
                    break;
            }

            // Thumb radius information
            thumbRadiusOutput.textContent = profile.thumbRadius + '%';

            // Fill auto hide information
            switch (profile.autoHide) {
                case 1:
                    autoHideOutput.textContent = browser.i18n.getMessage('optionYes');
                    break;
                case 0:
                default:
                    autoHideOutput.textContent = browser.i18n.getMessage('optionNo');
                    break;
            }
        } else {
            buttonsOutput.textContent = '-';
            thumbRadiusOutput.textContent = '-';
            autoHideOutput.textContent = '-';
        }

        // Fill color information
        if (profile.colorThumb && profile.colorTrack && profile.width != 'none') {
            colorThumbOutput.style.background = profile.colorThumb;
            colorThumbOutput.textContent = '';
            colorThumbOutput.classList.add('color-output');

            colorTrackOutput.style.background = profile.colorTrack;
            colorTrackOutput.textContent = '';
            colorTrackOutput.classList.add('color-output');
        } else {
            colorThumbOutput.style.background = 'unset';
            colorThumbOutput.textContent = '-';
            colorThumbOutput.classList.remove('color-output');

            colorTrackOutput.style.background = 'unset';
            colorTrackOutput.textContent = '-';
            colorTrackOutput.classList.remove('color-output');
        }

        // Fill override information
        switch (profile.allowOverride) {
            case 0:
                overrideOutput.textContent = browser.i18n.getMessage('overrideNone');
                break;
            case 1:
                overrideOutput.textContent = browser.i18n.getMessage('overrideColor');
                break;
            case 10:
                overrideOutput.textContent = browser.i18n.getMessage('overrideWidth');
                break;
            case 11:
                overrideOutput.textContent = browser.i18n.getMessage('overrideAll');
                break;
        }

        showProgressBar(false);
    });
}

/**
 * Handle profile selection drop-down menu change
 */
function changeSelectedProfile() {
    if (document.manager.profile.value == 'default') {
        loadProfile(defaultProfile);
    } else {
        loadProfile(document.manager.profile.value);
    }
    refreshSetAsDefaultButton();
}

/**
 * Toggle "Set as default" button
 */
function refreshSetAsDefaultButton() {
    const defaultDisabled = (defaultProfile == document.manager.profile.value || document.manager.profile.value == 'default');
    const useDisabled = (!ruleInherit && currentRule == document.manager.profile.value);

    const useButton = document.getElementById('button-use');
    const defaultButton = document.getElementById('button-setDefault');
    
    defaultButton.disabled = defaultDisabled;

    if (useButton) {
        useButton.disabled = useDisabled;
    }
}

/**
 * Update the default profile
 */
function setAsDefault() {
    showProgressBar(true);

    browser.storage.local.set({
        defaultProfile: document.manager.profile.value
    }, () => {
        browser.storage.local.get(init);
    });
}

/**
 * Save rule to Storage API
 */
function updateRule() {
    showProgressBar(true);
    
    if (isLocalFile) {
        let profile = document.manager.profile.value;
            switch (profile) {
                case 'default':
                    profile = null;
                    break;
                case 'none':
                    break;
                default:
                    profile = parseInt(profile);
                    if (isNaN(profile)) {
                        profile = null;
                    }
                    break;
            }
        const data = {
            localFileProfile: profile
        };
        browser.storage.local.set(data, () => {
            browser.storage.local.get(init);
        });
    } else {
        browser.storage.local.get('rules', (data) => {
            if (!data.rules) {
                data.rules = {};
            }

            if (document.manager.profile.value == 'default') {
                if (ruleInherit) {
                    data.rules[ruleForDomain] = 'default';
                } else {
                    delete data.rules[ruleForDomain];
                }
            } else {
                data.rules[ruleForDomain] = `profile_${document.manager.profile.value}`;
            }

            browser.storage.local.set(data, () => {
                browser.storage.local.get(init);
            });
        });
    }
}

/**
 * Show the what's new button (if required)
 */
function showWhatsNew() {
    const whatsNewButton = document.getElementById('whatsnew');

    browser.storage.local.get("showWhatsNew", (data) => {
        if (data.showWhatsNew) {
            whatsNewButton.classList.remove('hide');
        } else {
            whatsNewButton.classList.add('hide');
        }
    });
}

/**
 * Open the what's new information
 */
function openWhatsNew() {
    browser.storage.local.remove("showWhatsNew", () => {
        const version = browser.runtime.getManifest().version.replaceAll(".", "_");

        browser.tabs.create({
            url: `${webBase}/whatsnew/v${version}?locale=${browser.i18n.getUILanguage()}&browser=${getBrowserName().toLowerCase()}`
        });

        showWhatsNew();
    });
}

/**
 * Load i18n data
 */
function parsei18n() {
    i18nParse();

    const whatsNewButton = document.getElementById('whatsnew');
    whatsNewButton.title = browser.i18n.getMessage('whatsnew');
    whatsNewButton.getElementsByTagName('img')[0].alt = browser.i18n.getMessage('whatsnew');

    const feedbackButton = document.getElementById('button-feedback');
    feedbackButton.title = browser.i18n.getMessage('linkFeedback');
    feedbackButton.getElementsByTagName('img')[0].alt = browser.i18n.getMessage('linkFeedback');

    const settingsButton = document.getElementById('button-options');
    settingsButton.title = browser.i18n.getMessage('options');
    settingsButton.getElementsByTagName('img')[0].alt = browser.i18n.getMessage('options');
}

/**
 * Toggle progress bar
 * @param {boolean} show
 */
 function showProgressBar(show) {
    const progressBar = document.getElementById('main-progress-bar');

    if (progressBar) {
        if (show) {
            progressBar.classList.remove('hide');
        } else {
            progressBar.classList.add('hide');
        }
    }
}

// Add browser tag to body class
if (runningOn == browsers.FIREFOX) {
    document.body.classList.add('firefox');
} else {
    document.body.classList.add('chromium');
}

let defaultProfile, ruleForDomain, currentRule, ruleInherit;
let isLocalFile = false;

parsei18n();
showWhatsNew();
init();

document.getElementById('whatsnew').addEventListener('click', openWhatsNew);
document.manager.profile.addEventListener('change', changeSelectedProfile);
document.getElementById('button-setDefault').addEventListener('click', setAsDefault);
document.getElementById('button-options').addEventListener('click', () => {
    browser.runtime.openOptionsPage();
});
document.getElementById('button-feedback').addEventListener('click', () => {
    browser.runtime.sendMessage({
        action: 'openFeedback'
    });
});
document.getElementById('button-use').addEventListener('click', updateRule);
