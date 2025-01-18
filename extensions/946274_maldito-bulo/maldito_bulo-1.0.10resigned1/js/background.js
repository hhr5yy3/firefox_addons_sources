/*
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMmddddddddddddddddddddddddddddddddddddddddddddmMMMMMMM
 * MMMMMMM:.++++++++++++++++++++++++++++++++++++++++++--MMMMMMM
 * MMMMMMM::MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMyyyyyyyyyyNMMMMMMNyyyyyyyyyyNMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN`         +MMMMMMo          mMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN          `mMMMMN.          NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      `    +MMMMo    `      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      +    `mMMN`    +      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      y:    +MMo    -d      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hh    `mm`    yd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hM:    /o    -Md      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMh    ``    hMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMM:        :MMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMMd        hMMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN      hMMM:      :MMMd      NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMN`     hMMMd`    `hMMMd     `NMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMhhhhhhNMMMMhhhhhhMMMMNhhhhhhNMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM-:MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/-MMMMMMM
 * MMMMMMM:.//////////////////////////////////////////.:MMMMMMM
 * MMMMMMMNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 * MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
 *
 * Developed by David Fernández (dfernandez@maldita.es) for MALDITA www.maldita.es
 * Version 2.0
 *
 */

var baseWebsiteCategories = "https://backend.maldita.es/api/websitecategories";
var baseWebsites = "https://backend.maldita.es/api/websites";
var baseDebunks = "https://backend.maldita.es/api/debunks";
var baseUrls = "https://backend.maldita.es/api/urls";
var baseWebsitesDebunked = "https://backend.maldita.es/api/unlistedwebsitedebunkscount";

var websiteCategoriesKey = "website_categories";
var websitesKey = "websites";
var debunksKey = "debunks";
var urlsKey = "urls";
var websitesDebunkedKey = "websites_debunked";

var websiteCategoriesData;
var websitesData;
var debunksData;
var urlsData;
var websitesDebunkedData;

var storage = chrome.storage.local;

initWebsiteCategories();
initWebsites();
initDebunks();
initUrls();
initWebsitesDebunked();

restartDismissed();

chrome.alarms.onAlarm.addListener(function (alarm) {

    switch (alarm.name) {

        case "websitecategories_update":
            downloadData(baseWebsiteCategories, function (data) {
                saveData(websiteCategoriesKey, data);
                initWebsiteCategories();
            });
            break;
        case "websites_update":
            downloadData(baseWebsites, function (data) {
                saveData(websitesKey, data);
                initWebsites();
            });
            break;
        case "debunks_update":
            downloadData(baseDebunks, function (data) {
                saveData(debunksKey, data);
                initDebunks();
            });
            break;
        case "urls_update":
            downloadData(baseUrls, function (data) {
                saveData(urlsKey, data);
                initUrls();
            });
            break;
        case "websitesdebunked_update":
            downloadData(baseWebsitesDebunked, function (data) {
                saveData(websitesDebunkedKey, data);
                initWebsitesDebunked();
            });
            break;
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (typeof sender.tab.url === 'undefined' || sender.tab.url.indexOf("chrome://") > -1) {
        sendResponse({website: undefined});
        return;
    }

    var url = new URL(sender.tab.url);

    switch (request.message) {

        case "website?":

            // Don't check for local files
            if (url.origin === "file://")
                break;

            var dismissedSites = storage.get("dismissed", function (sites) {

                if (sites.dismissed.includes(cleanUrl(url.hostname, undefined, true)))
                    return;

                var website = checkWebsiteDebunked(cleanUrl(url.hostname, undefined, true));
                if (website !== undefined) {
                    // Send message to the content script
                    website['category'] = websiteCategoriesData[website['category']['id']];
                    sendResponse({website: website});
                } else if (!url.hostname.includes("twitter.com") && !url.hostname.includes("facebook.com")) {
                    website = getDebunksCount(cleanUrl(url.hostname, undefined, false));
                    if (website.corrected > 0 || website.uncorrected > 0)
                        sendResponse({website: website})
                }
            });

            break;

        case "webpage?":

            if (url.pathname !== "/") {
                var webpage = checkInformationDebunked(cleanUrl(url.host, url.pathname, true));

                if (webpage !== undefined) {
                    sendResponse({webpage: webpage});
                }
            }

            break;
    }

    return true;
});


function downloadData(endpoint, callback) {

    getData('key', function (key) {

        var request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status === 200 || request.status === 304) {
                callback(request.responseText);
            }
        };

        request.open('GET', endpoint + "?key=" + JSON.parse(key['key']) + "&version=" + chrome.runtime.getManifest().version, true);
        request.send();
    });
}

function saveData(key, data) {
    var obj = {};
    obj[key] = data;

    storage.set(obj);
}

function getData(key, callback) {
    storage.get(key, function (e) {
        callback(e);
    })
}

function initWebsiteCategories() {
    getData(websiteCategoriesKey, function (data) {

        try {
            websiteCategoriesData = JSON.parse(data[websiteCategoriesKey]);

            var catDict = {};
            websiteCategoriesData.forEach(function (t) {
                catDict[t.id] = t;
            });
            websiteCategoriesData = catDict;
        } catch (err) {
        }
    });
}

function initWebsites() {
    getData(websitesKey, function (data) {
        try {
            websitesData = JSON.parse(data[websitesKey]);
        } catch (err) {
        }
    });
}

function initDebunks() {
    getData(debunksKey, function (data) {
        try {
            debunksData = JSON.parse(data[debunksKey]);
        } catch (err) {
        }
    });
}

function initUrls() {
    getData(urlsKey, function (data) {
        try {
            urlsData = JSON.parse(data[urlsKey]);
        } catch (err) {
        }
    });
}

function initWebsitesDebunked() {
    getData(websitesDebunkedKey, function (data) {
        try {
            websitesDebunkedData = JSON.parse(data[websitesDebunkedKey]);
        } catch (err) {
        }
    });
}

function cleanUrl(url, path, remove_subdomains) {

    var hostName = url;
    var domain = hostName;

    var parts = hostName.split('.');

    if (hostName != null && (remove_subdomains || parts[0] === "www")) {

        parts = parts.reverse();

        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];

            if (parts.length > 3) {
                domain = parts[2] + '.' + domain;
            }
        }
    }

    if (path !== undefined)
        domain = domain + path;

    // remove trailing slash
    if (domain.substr(-1) === '/') {
        return domain.substr(0, domain.length - 1);
    }

    return domain;
}

function checkWebsiteDebunked(url) {

    var result = websitesData.filter(function (t) {
        var domainRegexp = new RegExp("^[a-z]*[.]*" + t.url + "$");
        return domainRegexp.test(url)
    });

    return result[0];
}

function getDebunksCount(url) {

    var domainRegexp = new RegExp("^" + url + ".*");

    var result = {
        uncorrected: 0,
        corrected: 0,
        unlisted: true
    };

    var urls = websitesDebunkedData.filter(function (t) {
        return domainRegexp.test(t.url)
    });

    urls.forEach(function (value) {
        if (value.corrected === true)
            result.corrected = result.corrected + 1;
        else
            result.uncorrected = result.uncorrected + 1;
    });

    return result;
}

function checkInformationDebunked(url) {

    var debunkId = undefined;

    for (var count = urlsData.length - 1; count >= 0; count--) {
        var domainRegexp = new RegExp("^.*" + urlsData[count]['url'] + ".*");
        if (domainRegexp.test(url)) {
            debunkId = urlsData[count]['debunk']['id'];
            break;
        }
    }

    var debunk = undefined;

    // Stop using filter, this is less elegant but allows to break the loop when found
    for (var debCount = debunksData.length - 1; debCount >= 0; debCount--) {
        if (debunksData[debCount]['id'] === debunkId) {
            debunk = debunksData[debCount];
            break;
        }
    }

    return debunk;

}

function restartDismissed() {
    storage.get("dismissed", function (sites) {
        sites.dismissed = [];
        storage.set(sites);
    });
}