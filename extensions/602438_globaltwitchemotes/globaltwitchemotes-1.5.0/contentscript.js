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
var MessageClient = require('messageClient');
var emoteParser = require('./emoteParser');
var tipsy = require('./tipsy');


var client;


function initialize() {
    if (!window.contentScriptInjected) {
        window.contentScriptInjected = true;

        client = new MessageClient();

        client.listen(onMessageFromBackground);

        emoteParser.run(client);
    } else {
        console.log('Reinjection detected and averted');
    }
}

function onMessageFromBackground(message, responseCallback) {
    if (!message) {
        return;
    }

    console.log('Received message with header "' + message.header + '"');

    if (message.header === 'settings') {
        if (message.payload.twitchStyleTooltips === true) {
            tipsy.init();
        }

        if (message.payload.replaceYouTubeKappa === true) {
            emoteParser.replaceKappers();
        }
    } else {
        emoteParser.onBackgroundMessage(message);
    }

    if (responseCallback) {
        responseCallback();
    }
}


initialize();
},{"./emoteParser":3,"./tipsy":5,"messageClient":6}],3:[function(require,module,exports){
var pageObserver = require('./pageObserver');


const MAX_EMOTE_PARSES_PER_ITERATION = 20;
const COUNTER_UPDATE_COOLDOWN = 2000;
const EMOTE_CSS = 'display:inline !important;height:auto !important;width:auto !important;max-height:100% !important;max-width:auto !important;opacity:1 !important;outline:0 !important;border:0 !important;margin:0 !important;padding:0 !important;z-index:auto !important;visibility:visible !important;';
const TIPSY_DATA_ATTRIBUTE = 'gte-tipsy-text';
const KAPPER_SHARED_TOOLTIP_TEXT = ':full_moon_with_face:';
const KAPPA_IMAGE_URL = 'https://static-cdn.jtvnw.net/emoticons/v1/25/1.0';

var counterUpdateCallback;
var emoteCount = 0;

var startNodeID = 0;
var pendingIDToNodesMapping = new Map();
var pendingNodesToIDsMapping = new Map();
var pendingEmoteParses = [];

var messageClient;


function runParser(client) {
    messageClient = client;

    setInterval(applyEmoteSearchResults, 0);

    pageObserver.onIframeFound(notifyBackgroundOnNewIframe);
    pageObserver.observe(extractAndSendText);
}

// Detects if we are running this instance in an iframe or not
function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function notifyBackgroundOnNewIframe() {
    messageClient.messageBackground({
        header: 'iframeFound',
        payload: null
    });
}

function replaceKappers() {
    pageObserver.onImageFound(replaceKapperWithKappa);
}

function replaceKapperWithKappa(imageNode) {
    if (/youtube.com/i.test(window.location.hostname) && imageNode.getAttribute('shared-tooltip-text') === KAPPER_SHARED_TOOLTIP_TEXT) {
        var emoteKey = 'Kapper';

        console.log('Kapper detected!');

        imageNode.setAttribute('class', 'GTEEmote');
        imageNode.setAttribute('src', KAPPA_IMAGE_URL);
        imageNode.setAttribute('title', emoteKey);
        imageNode.setAttribute(TIPSY_DATA_ATTRIBUTE, generateTipsyAlt(emoteKey, ''));
        imageNode.setAttribute('alt', emoteKey);
        imageNode.style.cssText = EMOTE_CSS;
    }
}

function onBackgroundMessage(message) {
    if (message.header === 'emoteSearchResults') {
        processEmoteSearchResults(message.payload.id, message.payload.foundEmotes);
    }
}

function extractAndSendText(node) {
    var nodeText = node.nodeValue;
    var currentID = startNodeID++;

    console.log(nodeText);

    // Need to map both ways to properly detect if a single node changed within the course of the search
    // Necessary because you cannot message nodes to background script
    pendingIDToNodesMapping.set(currentID, node);
    pendingNodesToIDsMapping.set(node, currentID);

    messageClient.messageBackground({
        header: 'searchTextForEmotes',
        payload: {
            id: currentID,
            hostname: window.location.hostname.toLowerCase(),
            text: nodeText
        }
    });
}

function processEmoteSearchResults(id, foundEmotes) {
    var matchingNode = pendingIDToNodesMapping.get(id);
    var resultsAreValid = pendingNodesToIDsMapping.get(matchingNode) === id;

    // If the ID doesn't match the node, then the node has been changed recently. These results must unfortunately be thrown out.
    if (foundEmotes.length > 0 && resultsAreValid === true) {
        pendingEmoteParses.push({
            node: matchingNode,
            processedIndex: 0,
            lastIndex: 0,
            lastLength: 0,
            foundEmotes: foundEmotes
        });
    }

    if (resultsAreValid === false) {
        console.log('Results discarded!');
    }

    pendingIDToNodesMapping.delete(id);
}


function applyEmoteSearchResults() {
    var emotesParsedThisIteration = 0;

    outerLoop: for (var i = pendingEmoteParses.length - 1; i >= 0; --i) {
        var parseSet = pendingEmoteParses[i];

        for (var j = parseSet.processedIndex; j < parseSet.foundEmotes.length; ++j) {
            if (emotesParsedThisIteration === MAX_EMOTE_PARSES_PER_ITERATION) {
                break outerLoop;
            }

            var currentIndex = parseSet.foundEmotes[j].index;

            currentIndex -= parseSet.lastIndex + parseSet.lastLength;

            parseSet.lastIndex = parseSet.foundEmotes[j].index;
            parseSet.lastLength = parseSet.foundEmotes[j].emote.length;

            try {
                parseSet.node = parseEmoteString(parseSet.node, currentIndex, parseSet.foundEmotes[j].emote, parseSet.foundEmotes[j].channel, parseSet.foundEmotes[j].url, parseSet.foundEmotes[j].emoji);
            } catch (e) {
                console.error(e);
            } finally {
                parseSet.processedIndex++;
                emotesParsedThisIteration++;
            }
        }

        pendingNodesToIDsMapping.delete(parseSet.node);
        pendingEmoteParses.splice(i, 1);
    }
}

function parseEmoteString(node, index, emoteKey, emoteChannel, emoteURL, unicodeEmoji) {
    var parent = node.parentNode;
    var nodeText = node.nodeValue;
    var postEmoteTextNode = null;
    var emoteNode;

    if (parent === null) {
        return;
    }

    emoteNode = emoteURL ? createEmoteImage(emoteKey, emoteChannel, emoteURL) : createUnicodeEmoji(emoteKey, emoteChannel, unicodeEmoji);

    console.log('Emote ' + emoteKey + ' found at index ' + index);

    node.isGTENode = true;

    parent.insertBefore(emoteNode, node.nextSibling);

    // Checks for and arranges text after the new emote
    if (index + emoteKey.length < nodeText.length) {
        postEmoteTextNode = document.createTextNode(nodeText.substring(index + emoteKey.length));

        postEmoteTextNode.isGTENode = true;

        parent.insertBefore(postEmoteTextNode, emoteNode.nextSibling);
    }

    // If there's no text before the new emote, remove it
    if (index === 0) {
        parent.removeChild(node);
    } else {
        node.nodeValue = nodeText.substring(0, index);
    }

    onNewEmote();

    return postEmoteTextNode;
}

function createEmoteImage(emoteKey, emoteChannel, emoteURL) {
    var emote = document.createElement('img');

    emote.setAttribute('class', 'GTEEmote');
    emote.setAttribute('src', emoteURL);
    emote.setAttribute('title', emoteKey);
    emote.setAttribute(TIPSY_DATA_ATTRIBUTE, generateTipsyAlt(emoteKey, emoteChannel));
    emote.setAttribute('alt', emoteKey);
    emote.style.cssText = EMOTE_CSS;

    return emote;
}

function generateTipsyAlt(emoteKey, emoteChannel) {
    var result;

    if (emoteChannel === 'FrankerFaceZ Emote' || emoteChannel === 'BetterTTV Emote' || emoteChannel === 'Custom GTE Emote') {
        result = 'Emote: ' + emoteKey + '\n' + emoteChannel;
    } else if (emoteChannel !== '') {
        result = 'Emote: ' + emoteKey + '\n' + 'Channel: ' + emoteChannel;
    } else {
        result = emoteKey;
    }

    return result;
}

function createUnicodeEmoji(emoteKey, emoteChannel, unicodeEmoji) {
    var emote = document.createElement('div');

    emote.setAttribute('class', 'GTEEmote');
    emote.setAttribute('title', emoteKey);
    emote.setAttribute(TIPSY_DATA_ATTRIBUTE, generateTipsyAlt(emoteKey, emoteChannel));
    emote.setAttribute('alt', emoteKey);
    emote.style.cssText = EMOTE_CSS;
    emote.innerText = unicodeEmoji;

    return emote;
}

function onNewEmote() {
    emoteCount++;

    clearTimeout(counterUpdateCallback);
    counterUpdateCallback = setTimeout(updateCounter, COUNTER_UPDATE_COOLDOWN);
}

function updateCounter() {
    if (isInIframe() === false) {
        messageClient.messageBackground({
            header: 'setBadgeText',
            payload: emoteCount
        });
    }
}


module.exports = {
    run: runParser,
    onBackgroundMessage: onBackgroundMessage,
    replaceKappers: replaceKappers
};
},{"./pageObserver":4}],4:[function(require,module,exports){
const PAGE_OBSERVER_PARAMETERS = {
    attributes: false,
    characterData: true,
    childList: true,
    subtree: true
};
const TREE_WALKER_FILTER = {
    acceptNode: treeWalkerFilterFunction
};
const ILLEGAL_TAGNAMES = [
    'IMG', 'NOSCRIPT', 'SCRIPT', 'STYLE', 'TEXTAREA'
];
const CURRENT_HOSTNAME = window.location.hostname.toLowerCase();
const MAX_TREE_WALKER_RUNS_PER_ITERATION = 5;
const MAX_NODES_PER_ITERATION = 1;

var treeWalkers = [];
var mutatedNodes = [];
var mutationObserver;
var nodeCallback;
var iframeFoundCallback;
var imageFoundCallback;

var pendingImages = [];
var iframeFound = false;
var currentlyIteratingThroughTreeWalkers = false;
var currentlyIteratingThroughNodes = false;
var iterateTreeWalkersCallback;
var iterateNodesCallback;


function startMutationObserver(callback) {
    mutationObserver = new MutationObserver(onPageChange);
    nodeCallback = callback;

    mutationObserver.observe(document.body, PAGE_OBSERVER_PARAMETERS);

    addMutatedNode(document.body);
}

function onPageChange(changes) {
    for (var i = 0; i < changes.length; ++i) {
        var pageChange = changes[i];

        if (pageChange.type === 'characterData') {
            addMutatedNode(pageChange.target);
        } else if (pageChange.type === 'childList') {
            for (var index = 0; index < pageChange.addedNodes.length; ++index) {
                var nextNode = pageChange.addedNodes.item(index);

                addMutatedNode(nextNode);

                if (nextNode.tagName === 'IMG') {
                    imageDetected(nextNode);
                }
            }
        }
    }
}

function addMutatedNode(node) {
    if (isIllegalNode(node) === false) {
        mutatedNodes.push(node);
    }

    clearTimeout(iterateNodesCallback);
    iterateNodesCallback = setTimeout(iterateThroughPendingNodes, 0);
}

function iterateThroughPendingNodes() {
    if (currentlyIteratingThroughNodes === false) {
        currentlyIteratingThroughNodes = true;

        var nodesThisIteration = 0;

        while (mutatedNodes.length > 0) {
            if (nodesThisIteration === MAX_NODES_PER_ITERATION) {
                break;
            }

            var nextNode = mutatedNodes.shift();

            if (nextNode.nodeType === Node.TEXT_NODE) {
                nodeCallback(nextNode);
            } else if (nextNode.nodeType === Node.ELEMENT_NODE) {
                addTreeWalker(nextNode);
            }

            nodesThisIteration++;
        }

        currentlyIteratingThroughNodes = false;

        if (mutatedNodes.length > 0) {
            clearTimeout(iterateNodesCallback);
            iterateNodesCallback = setTimeout(iterateThroughPendingNodes, 0);
        }
    }
}

function addTreeWalker(node) {
    treeWalkers.push(document.createTreeWalker(node, NodeFilter.SHOW_TEXT + NodeFilter.SHOW_ELEMENT, TREE_WALKER_FILTER, false));

    clearTimeout(iterateTreeWalkersCallback);
    iterateTreeWalkersCallback = setTimeout(runTreeWalker, 0);
}

function runTreeWalker() {
    if (currentlyIteratingThroughTreeWalkers === false) {
        currentlyIteratingThroughTreeWalkers = true;

        var treeWalkerRuns = 0;

        treeWalkerLoop: while (treeWalkers.length > 0) {
            var treeWalker = treeWalkers[0];
            var treeChild;

            while ((treeChild = treeWalker.nextNode())) {
                addMutatedNode(treeChild);
                treeWalkerRuns++;

                if (treeWalkerRuns === MAX_TREE_WALKER_RUNS_PER_ITERATION) {
                    break treeWalkerLoop;
                }
            }

            treeWalkers.shift();
        }

        currentlyIteratingThroughTreeWalkers = false;

        if (treeWalkers.length > 0) {
            clearTimeout(iterateTreeWalkersCallback);
            iterateTreeWalkersCallback = setTimeout(runTreeWalker, 0);
        }
    }
}

function treeWalkerFilterFunction(node) {
    var filter = NodeFilter.FILTER_SKIP;

    if (node.nodeType === Node.TEXT_NODE) {
        filter = NodeFilter.FILTER_ACCEPT;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'IFRAME') {
            iframeDetected();
        }
    }

    return filter;
}

function iframeDetected() {
    if (iframeFoundCallback) {
        iframeFoundCallback();

        iframeFoundCallback = null;
    }

    iframeFound = true;
}

function onIframeFound(callback) {
    if (iframeFound === true) {
        callback();
    } else {
        iframeFoundCallback = callback;
    }
}

function imageDetected(imageNode) {
    if (imageFoundCallback) {
        imageFoundCallback(imageNode);
    } else {
        pendingImages.push(imageNode);
    }
}

function onImageFound(callback) {
    imageFoundCallback = callback;

    for (var i = 0; i < pendingImages.length; ++i) {
        imageFoundCallback(callback);
    }

    pendingImages = [];
}

function isIllegalNode(node) {
    var isIllegal = true;

    if (node && (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE)) {
        var elementNode = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;

        isIllegal = false;

        if (node.nodeType === Node.TEXT_NODE && !elementNode) {
            isIllegal = true;
        } else if (ILLEGAL_TAGNAMES.indexOf(elementNode.tagName) !== -1) {
            isIllegal = true;
        } else if (elementNode.classList.value.indexOf('GTETipsy') !== -1 || CURRENT_HOSTNAME.indexOf('twitch.tv') !== -1 && elementNode.classList.value.indexOf('tooltip') !== -1) {
            isIllegal = true;
        } else if (elementNode.isContentEditable) {
            isIllegal = true;
        } else if (node.textContent.replace(/\s/g, '').length === 0) {
            isIllegal = true;
        } else if (node.hasOwnProperty('isGTENode') === true) {
            isIllegal = true;
        }
    }

    return isIllegal;
}

module.exports = {
    observe: startMutationObserver,
    onIframeFound: onIframeFound,
    onImageFound: onImageFound
};
},{}],5:[function(require,module,exports){
var pageObserver = require('./pageObserver');


const OUTER_TIPSY_CSS = 'display:block !important;position:absolute !important;opacity:1 !important;z-index:9999999 !important;visibility:visible !important;word-break:break-all !important;padding:5px !important;box-sizing:border-box !important;';
const INNER_TIPSY_CSS = 'display:block !important;position:static !important;background:rgba(0,0,0,0.8) !important;visibility:visible !important;font-size:12px !important;line-height:16px !important;font-family:Arial !important;color:#FFFFFF !important;max-width:200px !important;padding:5px 8px 4px !important;text-align:center !important;white-space:pre !important;';
const ARROW_TIPSY_CSS = 'display:block !important;position:absolute !important;width:0 !important;height:0 !important;border:5px solid transparent !important;right:10px !important;opacity: 0.8 !important;background-color:rgba(0,0,0,0) !important;box-sizing:border-box !important;';
const SOUTH_TIPSY_ARROW_CSS = ARROW_TIPSY_CSS + 'top:0 !important;border-top:none !important;border-bottom-color:#000000 !important;';
const NORTH_TIPSY_ARROW_CSS = ARROW_TIPSY_CSS + 'bottom:0 !important;border-bottom:none !important;border-top-color:#000000 !important;';
const TIPSY_DATA_ATTRIBUTE = 'gte-tipsy-text';

var tipsyVisible = false;
var tipsy = null;


function init() {
    if (tipsy === null) {
        document.body.addEventListener('mouseover', mouseoverEventHandler);

        createTipsy();
    }
}

function mouseoverEventHandler(event) {
    if (event.target.className === 'GTEEmote') {
        showTipsy(event.target);
    } else {
        hideTipsy();
    }
}

function createTipsy() {
    tipsy = {};

    tipsy.outer = document.createElement('div');
    tipsy.outer.className = 'GTETipsy';
    tipsy.outer.style.cssText = OUTER_TIPSY_CSS;

    tipsy.inner = document.createElement('div');
    tipsy.inner.className = 'GTETipsyInner';
    tipsy.inner.style.cssText = INNER_TIPSY_CSS;

    tipsy.arrow = document.createElement('div');
    tipsy.arrow.className = 'GTETipsyArrow';

    tipsy.outer.appendChild(tipsy.inner);
    tipsy.outer.appendChild(tipsy.arrow);

    tipsy.containingDocument = null;
}

function showTipsy(emoteNode) {
    tipsyVisible = true;

    if (emoteNode.title !== '') {
        emoteNode.removeAttribute('title');
    }

    tipsy.inner.textContent = emoteNode.getAttribute(TIPSY_DATA_ATTRIBUTE) || 'null';
    tipsy.containingDocument = emoteNode.ownerDocument.body;
    tipsy.containingDocument.appendChild(tipsy.outer);

    positionTipsy(emoteNode);
}

function hideTipsy() {
    if (tipsyVisible === true) {
        tipsyVisible = false;

        tipsy.containingDocument.removeChild(tipsy.outer);
    }
}

function positionTipsy(emoteNode) {
    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var bodyScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var actualWidth = tipsy.outer.offsetWidth;
    var actualHeight = tipsy.outer.offsetHeight;

    var offset = {
        top: emoteNode.getBoundingClientRect().top + bodyScrollTop,
        left: emoteNode.getBoundingClientRect().left + bodyScrollLeft
    };
    var emotePosition = {
        top: offset.top,
        left: offset.left,
        height: emoteNode.offsetHeight,
        width: emoteNode.offsetWidth
    };

    var forceTipsySouth = (offset.top - actualHeight) < bodyScrollTop;


    if (forceTipsySouth === false) {
        tipsy.outer.style.top = (emotePosition.top - actualHeight) + 'px';
        tipsy.arrow.style.cssText = NORTH_TIPSY_ARROW_CSS;
    } else {
        tipsy.outer.style.top = (emotePosition.top + emotePosition.height) + 'px';
        tipsy.arrow.style.cssText = SOUTH_TIPSY_ARROW_CSS;
    }

    tipsy.outer.style.left = (emotePosition.left + emotePosition.width / 2 - actualWidth + 15) + 'px';
}

module.exports = {
    init: init
};
},{"./pageObserver":4}],6:[function(require,module,exports){
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