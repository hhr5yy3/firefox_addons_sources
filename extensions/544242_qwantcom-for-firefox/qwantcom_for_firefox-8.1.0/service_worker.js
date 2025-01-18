

const storageCache = {
    disabledHost: []
}

const initStorageCache = chrome.storage.local.get().then((items) => {
    Object.assign(storageCache, items);
});

// Never called on android
// Not sure what it is supposed to do ...
chrome.runtime.onConnect.addListener(async () => {
    try {
        await initStorageCache;
    } catch (e) {
        console.error(e);
    }
});

const ruleset_ids = [
    
    "easy_privacy_optimized",
    
    "fanboy_annoyance",
    
    "filter_unblocking_search_ads_and_self_promotion",
    
    "adblock_warning_removal",
    
];

function tabInfoToStatus(host, enabled) {
    return {
        action: "tabStatus",
        protectionEnabled: enabled,
        tabUrl: host,
    };
}

// Activate or deactivate the extension whenever the active tab changes
chrome.tabs.onActivated.addListener(async (details) => {
    try {
        const tab = await chrome.tabs.get(details.tabId);
        const host = urlToHostname(tab.url);
        const hostDisabledIndex = storageCache.disabledHost.indexOf(host);

        if (hostDisabledIndex > -1) {
            await disableRuleSets();
        } else {
            await enableRuleSets();
        }
    } catch (err) {
        // Ignored
    }
});


chrome.runtime.onConnect.addListener(async (port) => {
    port.onMessage.addListener(function (msg) {
        onMessageReceived(msg, port);
    });
});


// Activate or deactivate the extension whenever the popup toggle is clicked,
// This will update the block list in chrome storage and reload the page if needed
function onMessageReceived(msg, port) {
    getCurrentTab().then(tab => {
        const host = urlToHostname(tab.url);
        const hostDisabledIndex = storageCache.disabledHost.indexOf(host);

        if (!host) {
            // remove notify for android (as it is done within updateIcon)
            
            notifyToggled(tabInfoToStatus(undefined, true), port)
            
            updateIcon(true);
        } else if (msg.action === 'toggleProtection') {
            if (hostDisabledIndex > -1) {
                storageCache.disabledHost.splice(hostDisabledIndex, 1)
                enableRuleSets().then(() => {
                    // remove notify for android (as it is done within updateIcon from enable)
                    
                    notifyToggled(tabInfoToStatus(host, true), port);
                    
                    chrome.tabs.reload(tab.id);
                });
            } else {
                storageCache.disabledHost.push(host)
                disableRuleSets().then(() => {
                    // remove notify for android (as it is done within updateIcon from disable)
                    
                    notifyToggled(tabInfoToStatus(host, false), port);
                    
                    chrome.tabs.reload(tab.id);
                });
            }
        } else if (msg.action === 'askTabStatus') {
            const enabled = !storageCache.disabledHost.includes(host);
            updateIcon(enabled)
            notifyToggled(tabInfoToStatus(host, enabled), port)
        } else {
          console.error('Unknown action', msg)
        }
    })
}

function notifyToggled(response, port) {
  storageCache.disabledHost = removeDuplicates(storageCache.disabledHost)
  chrome.storage.local.set(storageCache);
  port.postMessage(response);
}

// Before navigating on the main frame check either the current host is protected or not
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    try {
        // For firefox and android, use details.frameId !== 0. 
        // Could be used also for chrome based browser I guess.
        
        if (details.frameId !== 0) {
        
            return
        }

        const host = urlToHostname(details.url);
        const hostDisabledIndex = storageCache.disabledHost.indexOf(host);

        if (hostDisabledIndex > -1) {
            await disableRuleSets();
        } else {
            await enableRuleSets();
        }
    } catch (err) {
        // Ignore
    }
});


async function disableRuleSets() {
    await updateIcon(false);
    await chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ruleset_ids,
        enableRulesetIds: [],
    });
}

async function enableRuleSets() {
    await updateIcon(true);
    await chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: [],
        enableRulesetIds: ruleset_ids,
    });
}

async function getCurrentTab() {
    const queryOptions = {active: true, lastFocusedWindow: true};
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function urlToHostname(rawUrl) {
    if (!rawUrl) {
        return;
    }

    const url = new URL(rawUrl);
    return url.host;
}


function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

async function updateIcon(enabled) {
    
    if (enabled) {
        chrome.action.setIcon({path: "icon.png"});
    } else {
        chrome.action.setIcon({path: "icon-deactivated.png"});
    }
    
}

// @formatter:off

// @formatter:on
