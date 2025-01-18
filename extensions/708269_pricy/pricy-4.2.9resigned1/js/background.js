function getVersion() {
    "use strict";
    var manifest = chrome.runtime.getManifest();
    return manifest.version;
}

var browser = 'Firefox';
var version = `${getVersion()}-${browser}`;

function executeContentScript(tabId, fileName) {
    return new Promise(function (resolve, reject) {
        var file = 'js/' + fileName;

        chrome.tabs.executeScript(tabId, {
            file: file,
            runAt: 'document_start'
        }, function () {
            resolve();
        });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.message) {
        case "init":
            isWebsiteSupported(sender.tab.url).then(function (isSupported) {
                if (isSupported) {
                    chrome.tabs.insertCSS(sender.tab.id, {
                        file: 'css/inline-out.css'
                    }, function () {
                        var sequence = Promise.resolve();

                        var jsFiles = [
                            'jquery.js',
                            'bootstrap.min.js',
                            'popover.min.js',
                            'tether.js',
                            'inline-out.js'
                        ];

                        for (var i = 0; i < jsFiles.length; i++) {
                            var jsFile = jsFiles[i];
                            sequence = sequence.then(executeContentScript(sender.tab.id, jsFile));
                        }
                    });
                }
            }, function (err) {

            });

            // Indicate that the response is sent asynchronously.
            return true;
        case "getInPagePopupXPath":
            getSiteSettings(getUrlForSiteSettings(sender.tab, request)).then(function (siteSettings) {
                var inPagePopupXPath = null;
                if (siteSettings) {
                    inPagePopupXPath = siteSettings.InPagePopupXPath;
                }

                sendResponse({
                    inPagePopupXPath: inPagePopupXPath
                });
            }, function (err) {

            });

            // Indicate that the response is sent asynchronously.
            return true;
        case "getVersion":
            var version;
            if (currVersion) {
                version = currVersion;
            } else {
                version = getVersion();
            }

            sendResponse({
                "version": version
            });
            break;
        case "createTab":
            chrome.tabs.create({
                url: request.url
            });
            break;
    }
});

var host = "https://www.pricy.ro";

function getUrlForSiteSettings(tab, request) {
    "use strict";

    if (tab && tab.url) {
        return tab.url;
    }

    return request.url;
}

function getSiteSettings(url) {
    "use strict";

    return new Promise(function (resolve, reject) {
        getSupportedSites().then(function (sites) {
            for (var i = 0; i < sites.length; i++) {
                if (url.indexOf(sites[i].Url) !== -1) {
                    resolve(sites[i]);
                    return;
                }
            }

            resolve(null);
        }, function (err) {
            reject();
        });
    });
}

function isWebsiteSupported(url) {
    "use strict";

    return new Promise(function (resolve, reject) {
        getSupportedSites().then(function (sites) {
            for (var i = 0; i < sites.length; i++) {
                if (url.indexOf(sites[i].Url) !== -1) {
                    resolve(true);
                    return;
                }
            }

            resolve(false);
        }, function (err) {
            reject();
        });
    });
}

function getNumberOfPriceChanges(currentUrl) {
    "use strict";

    isWebsiteSupported(currentUrl).then(function (isSupported) {
        if (!isSupported) {
            chrome.browserAction.setBadgeText({
                text: ""
            });
            return;
        }

        var dataUrl = `${host}/api/extension/pricechanges?url=${encodeURIComponent(currentUrl)}&v=${version}`;
        $.getJSON(dataUrl)
            .done(function (data) {
                if (data && data.Count !== 0) {
                    chrome.browserAction.setBadgeText({
                        text: String(data.Count)
                    });
                } else {
                    chrome.browserAction.setBadgeText({
                        text: ""
                    });
                }
            })
            .fail(function () {
                console.error('Failed to get number of price changes.');
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            });

    }, function (err) {

    });
}

function onInstall() {
    "use strict";
    console.log("Extension Installed");

    chrome.tabs.create({
        url: `${host}/changelog/installed?v=${version}`
    });
}

function onUpdate() {
    "use strict";
    console.log("Extension Updated");

    $.getJSON(`${host}/api/extension/updated?v=${version}`);

    var majorVersionUpdate = ('false' === 'true');
    if (!majorVersionUpdate) {
        return;
    }

    chrome.tabs.create({
        url: `${host}/changelog/updated?v=${version}"`
    });
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage.version;

if (currVersion !== prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion === 'undefined') {
        onInstall();
    } else {
        onUpdate();
    }

    localStorage.version = currVersion;
}

var uninstallUrl = `${host}/extensionhtml/uninstalled?v=${version}`;
if (chrome.runtime.setUninstallURL) {
    chrome.runtime.setUninstallURL(uninstallUrl);
} else if (chrome.runtime.onUninstalled && chrome.runtime.onUninstalled.addListener) {
    chrome.runtime.onUninstalled.addListener(function () {
        chrome.tabs.create({
            url: uninstallUrl
        });
    });
}

var currentUrl = "";

// TODO : attach/detach a tab

function onTabUpdated(tabId, changeInfo, tab) {
    "use strict";

    var url = changeInfo.url || tab.url;

    if (tab.active) {
        if (currentUrl !== url) {
            currentUrl = url;
            getNumberOfPriceChanges(currentUrl);
        }
    }
}
if (!chrome.tabs.onUpdated.hasListener(onTabUpdated)) {
    chrome.tabs.onUpdated.addListener(onTabUpdated);
}

function onTabActivated(activeInfo) {
    "use strict";

    var tabId = activeInfo.tabId;

    chrome.tabs.get(tabId, function (tab) {
        if (!chrome.runtime.lastError) {
            if (tab && currentUrl !== tab.url) {
                currentUrl = tab.url;
                getNumberOfPriceChanges(currentUrl);
            }
        }
    });
}
if (!chrome.tabs.onActivated.hasListener(onTabActivated)) {
    chrome.tabs.onActivated.addListener(onTabActivated);
}

function exponentialDelay(tryCount) {
    var delay = Math.pow(2, tryCount - 1) * 1000;
    return delay;
}

var supportedSites;

function getSupportedSitesFromLocalStorage() {
    var sites = localStorage.supportedSites;
    if (sites) {
        try {
            return JSON.parse(sites);
        } catch (e) {
            console.error('Error while trying to parse supported sites fetched from local storage. ' + e);
            return null;
        }
    }

    return null;
}

function getSupportedSites() {
    return new Promise(function (resolve, reject) {
        if (supportedSites) {
            console.log('Returning supported sites from memory.');
            resolve(supportedSites);
        } else {
            var localStorageSupportedSites = getSupportedSitesFromLocalStorage();
            if (localStorageSupportedSites) {
                supportedSites = localStorageSupportedSites;
                console.log('Returning supported sites from local storage.');
                resolve(localStorageSupportedSites);
            } else {
                Promise.resolve(downloadSupportedSites()).then(function (data) {
                    console.log('Supported sites fetched from the server.');

                    supportedSites = data;
                    localStorage.supportedSites = JSON.stringify(data);

                    resolve(data);
                });
            }
        }
    });
}

function downloadSupportedSites() {
    "use strict";

    var dataUrl = `${host}/api/extension/getsupportedsites?v=${version}`;
    return $.ajax({
        dataType: "json",
        url: dataUrl,
        tryCount: 0,
        retryLimit: 5,
        success: function (data) {},
        error: function (xhr, textStatus, errorThrown) {
            console.error('Getting supported sites failed. tryCount = ' + this.tryCount);
            this.tryCount++;

            if (this.tryCount <= this.retryLimit) {
                var delay = exponentialDelay(this.tryCount);
                console.info('Retrying with delay = ' + delay);
                var that = this;

                window.setTimeout(function () {
                    $.ajax(that);
                }, delay);
            } else {
                console.error('Failed to get supported sites after ' + this.retryLimit + ' retries.');
            }
        }
    });
}

function invalidateSupportedSites() {
    "use strict";
    supportedSites = null;
    localStorage.supportedSites = null;

    console.log("Supported sites invalidated.");
}

getSupportedSites().then(function () {
    console.log("Initial supported sites download succeeded.");
}, function () {
    console.log("Initial supported sites download failed.");
});

window.setInterval(function () {
    invalidateSupportedSites();
}, 12 * 60 * 60 * 1000);