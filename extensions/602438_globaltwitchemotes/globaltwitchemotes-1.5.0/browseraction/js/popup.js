(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const FORBIDDEN_DOMAINS = [
    'addons.mozilla.org'
];

var tabListener = null;

function isBackgroundScript() {
    return new Promise(function(resolve, reject) {
        if (browser.extension.getBackgroundPage() === window) {
            resolve();
        } else {
            reject();
        }
    });
}

function addOnMessageCallback(callback) {
    browser.runtime.onMessage.removeListener(callback);
    browser.runtime.onMessage.addListener(callback);
}

function removeOnMessageCallback(callback) {
    browser.runtime.onMessage.removeListener(callback);
}

function sendMessageToTab(tab, message, onResponseCallback) {
    browser.tabs.sendMessage(tab.id, message, onResponseCallback);
}

function sendMessageToBackground(message, onResponseCallback) {
    browser.runtime.sendMessage(message, onResponseCallback);
}


function loadStorage(storageType) {
    return browser.storage[storageType].get(null);
}

function saveStorage(data, storageType) {
    return browser.storage[storageType].set(data);
}

function injectScriptToTab(script, tab, allFrames) {
    return browser.tabs.executeScript(tab.id, {
        file: script,
        runAt: allFrames === true ? 'document_idle' : 'document_start',
        allFrames: allFrames
    });
}

function listenForTabs(callback) {
    if (tabListener !== null) {
        browser.tabs.onUpdated.removeListener(tabListener);
    }

    tabListener = function(tabID, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
            callback(tab);
        }
    };

    browser.tabs.onUpdated.addListener(tabListener);
}

function getActiveTab() {
    return new Promise(function(resolve, reject) {
        browser.tabs.query({
            active: true,
            lastFocusedWindow: true
        }).then(function(tabs) {
            if (tabs.length === 0) {
                reject();
            } else {
                resolve(tabs[0]);
            }
        });
    });
}

function reloadTab(tab) {
    return browser.tabs.reload(tab.id);
}

function openOptionsPage() {
    browser.runtime.openOptionsPage();
}

function setBadgeText(tab, string, backgroundColor) {
    var text = string.length > 4 ? '∞' : string;

    browser.browserAction.setBadgeBackgroundColor({
        color: backgroundColor,
        tabId: tab.id
    });

    browser.browserAction.setBadgeText({
        text: text,
        tabId: tab.id
    });
}

function getURL(url) {
    return browser.extension.getURL(url);
}

module.exports = {
    isBackgroundScript: isBackgroundScript,
    addOnMessageCallback: addOnMessageCallback,
    removeOnMessageCallback: removeOnMessageCallback,
    sendMessageToTab: sendMessageToTab,
    sendMessageToBackground: sendMessageToBackground,
    getURL: getURL,
    loadStorage: loadStorage,
    saveStorage: saveStorage,
    injectScriptToTab: injectScriptToTab,
    listenForTabs: listenForTabs,
    getActiveTab: getActiveTab,
    reloadTab: reloadTab,
    openOptionsPage: openOptionsPage,
    setBadgeText: setBadgeText,
    forbiddenDomains: FORBIDDEN_DOMAINS
};
},{}],2:[function(require,module,exports){
var browser = require('browser');
var domainFilter = require('domainFilter');
var MessageClient = require('messageClient');


const ILLEGAL_PAGE_ERROR = 'GTE cannot run on this page.';

var activeTab;
var client = new MessageClient();
var contentDiv;
var activeDomain;
var filterControlsDiv;
var pageFilterStatus;
var userSettings;


function initialize() {
    contentDiv = document.getElementById('content');
    configureOpenSettingsButton();

    browser.getActiveTab().then(function(tab) {
        activeTab = tab;
        activeDomain = domainFilter.extractDomainFromAddress(tab.url);

        if (domainFilter.isURLLegal(tab.url) === false) {
            displayIllegalMessage();
        } else {
            client.listen(onMessage);

            client.messageBackground({
                header: 'getAllSettings'
            });
        }
    });
}

function onMessage(message) {
    console.log('Message received with header "' + message.header + '"');

    if (message.header === 'settings') {
        client.stopListening();

        userSettings = message.payload;

        domainFilter.initialize(userSettings.domainFilterMode, userSettings.domainFilterList);

        updatePopup();
    }
}

function displayIllegalMessage() {
    var messageDiv = document.createElement('div');

    messageDiv.className = 'error';

    messageDiv.textContent = ILLEGAL_PAGE_ERROR;

    while (contentDiv.hasChildNodes()) {
        contentDiv.removeChild(contentDiv.lastChild);
    }

    contentDiv.appendChild(messageDiv);
}

function updatePopup() {
    var filteredRule = domainFilter.getMatchingFilterRule(activeTab.url);

    pageFilterStatus = document.getElementById('pageFilterStatus');

    displayFilterMode();
    displayPageFilterStatus(filteredRule);

    configureFilterButtons(filteredRule);
}

function displayFilterMode() {
    var filterModeContainer = document.getElementById('filterMode');
    var filterModeDiv = document.createElement('b');

    filterModeDiv.textContent = userSettings.domainFilterMode;

    filterModeContainer.appendChild(filterModeDiv);
}

function displayPageFilterStatus(filteredRule) {
    var filterInfoDiv = document.createElement('b');

    if (userSettings.domainFilterList.length === 0 || filteredRule === null) {
        filterInfoDiv.textContent = 'Unfiltered';
    } else {
        filterInfoDiv.textContent = 'Filtered';
    }

    pageFilterStatus.appendChild(filterInfoDiv);
}

function configureFilterButtons(filteredRule) {
    filterControlsDiv = document.getElementById('filterControls');

    if (filteredRule !== null) {
        var removeRuleButton = createInputButton('Remove Associated Rule');

        removeRuleButton.filteredRule = filteredRule;

        removeRuleButton.addEventListener('click', removeAssociatedRule);

        filterControlsDiv.appendChild(removeRuleButton);
    } else {
        var filterEntireDomainButton = createInputButton(userSettings.domainFilterMode + ' ' + activeDomain + '/*');
        var filterSpecificPageButton = createInputButton(userSettings.domainFilterMode + ' This Exact Page');

        filterEntireDomainButton.addEventListener('click', addDomainToList);
        filterSpecificPageButton.addEventListener('click', addURLToList);

        filterControlsDiv.appendChild(filterEntireDomainButton);
        filterControlsDiv.appendChild(filterSpecificPageButton);
    }
}

function removeAssociatedRule() {
    userSettings.domainFilterList.splice(userSettings.domainFilterList.indexOf(this.filteredRule), 1);

    client.messageBackground({
        header: 'setSettingsEntry',
        payload: {
            key: 'domainFilterList',
            value: userSettings.domainFilterList
        }
    });

    disableButtons();
    transformRefreshButton(this);
}

function addDomainToList() {
    userSettings.domainFilterList.push(activeDomain + '/*');

    client.messageBackground({
        header: 'setSettingsEntry',
        payload: {
            key: 'domainFilterList',
            value: userSettings.domainFilterList
        }
    });

    disableButtons();
    transformRefreshButton(this);
}

function addURLToList() {
    userSettings.domainFilterList.push(domainFilter.removeProtocolFromAddress(activeTab.url));

    client.messageBackground({
        header: 'setSettingsEntry',
        payload: {
            key: 'domainFilterList',
            value: userSettings.domainFilterList
        }
    });

    disableButtons();
    transformRefreshButton(this);
}

function configureOpenSettingsButton() {
    document.getElementById('openSettingsButton').addEventListener('click', function() {
        console.log('Opening Options Page...');

        browser.openOptionsPage();
    });
}

function createInputButton(value) {
    var result = document.createElement('input');

    result.type = 'button';
    result.value = value;

    return result;
}

function transformRefreshButton(button) {
    button.value = '';
    button.className = 'refreshButton';
    button.disabled = false;

    button.removeEventListener('click', removeAssociatedRule);
    button.removeEventListener('click', addDomainToList);
    button.removeEventListener('click', addURLToList);

    button.addEventListener('click', function() {
        console.log('Reloading tab...');

        browser.reloadTab(activeTab);

        this.disabled = true;

        window.close();
    });
}

function disableButtons() {
    var buttons = document.querySelectorAll('input[type=button]');

    for (var i = 0; i < buttons.length; ++i) {
        buttons[i].disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    browser.isBackgroundScript().catch(initialize);
}, false);
},{"browser":1,"domainFilter":3,"messageClient":4}],3:[function(require,module,exports){
var browser = require('./browser');


const IS_VALID_URL_REGEX = /^(http|https|ftp)/i;
const PROTOCOL_REMOVAL_REGEX = /^(?:\w+:\/\/)?(?:www\.)?([^\s\/]+(?:\/[^\s\/]+)*)\/*$/i;
const HOSTNAME_EXTRACTION_REGEX = /^(?:\w+:\/\/)?(?:www\.)?([^\\\/]*)/i;

var filterMode;
var filterList;


function initialize(mode, list) {
    filterMode = mode;
    filterList = list;
}

function isAddressAllowed(address) {
    var result = isURLLegal(address);

    if (result === true && filterList.length > 0) {
        var matchingRule = getMatchingFilterRule(address);

        result = matchingRule === null;

        if (filterMode === 'Whitelist') {
            result = !result;
        }
    }

    return result;
}

function getMatchingFilterRule(address) {
    var result = null;

    if (address) {
        var url = removeProtocolFromAddress(address);

        for (var i = 0; i < filterList.length; ++i) {
            var domainRegex = createRegexFromRule(filterList[i]);

            if (domainRegex !== null && domainRegex.test(url) === true) {
                result = filterList[i];
                break;
            }
        }
    }

    return result;
}

function isURLLegal(address) {
    var result = false;

    if (address && IS_VALID_URL_REGEX.test(address)) {
        var url = removeProtocolFromAddress(address);

        result = true;

        for (var i = 0; i < browser.forbiddenDomains.length; ++i) {
            if (url.indexOf(browser.forbiddenDomains[i]) === 0) {
                result = false;
                break;
            }
        }
    }

    return result;
}

function createRegexFromRule(rule) {
    var result = removeProtocolFromAddress(rule || '');

    result = new RegExp('^' + replaceCharactersWithRegexNotation(result) + '$', 'i');

    return result;
}

function replaceCharactersWithRegexNotation(input) {
    var result = input || '';

    result = result.trim();
    result = result.replace(/\s+/g, '%20');
    result = result.replace(/\\/g, '/');
    result = result.replace(/\/\*/g, '*');
    result = result.replace(/\*+/g, '*');
    result = result.replace(/\*/g, '.*');

    return result;
}

function removeProtocolFromAddress(address) {
    return PROTOCOL_REMOVAL_REGEX.test(address) ? PROTOCOL_REMOVAL_REGEX.exec(address)[1] : address;
}

function extractDomainFromAddress(address) {
    return HOSTNAME_EXTRACTION_REGEX.test(address) ? HOSTNAME_EXTRACTION_REGEX.exec(address)[1] : address;
}

module.exports = {
    initialize: initialize,
    isAddressAllowed: isAddressAllowed,
    getMatchingFilterRule: getMatchingFilterRule,
    isURLLegal: isURLLegal,
    removeProtocolFromAddress: removeProtocolFromAddress,
    extractDomainFromAddress: extractDomainFromAddress
};
},{"./browser":1}],4:[function(require,module,exports){
var browser = require('browser');


function MessageClient() {
    var messageReceivedCallback = null;

    // Set callbacks before listening
    this.listen = function(callback) {
        messageReceivedCallback = callback;

        browser.addOnMessageCallback(onMessage);
    };

    this.stopListening = function() {
        messageReceivedCallback = null;

        browser.removeOnMessageCallback(onMessage);
    };

    this.messageTab = function(tab, message) {
        browser.sendMessageToTab(tab, message, onResponse);
    };

    this.messageBackground = function(message) {
        browser.sendMessageToBackground(message, onResponse);
    };

    function onResponse(response) {
        if (messageReceivedCallback) {
            messageReceivedCallback(response);
        }
    }

    function onMessage(message, sender, responseCallback) {
        if (messageReceivedCallback) {
            messageReceivedCallback(message, responseCallback, sender.tab);
        }

        return true;
    }
}

module.exports = MessageClient;
},{"browser":1}]},{},[2]);
true;