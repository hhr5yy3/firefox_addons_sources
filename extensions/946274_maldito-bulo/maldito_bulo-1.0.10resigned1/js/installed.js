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

chrome.runtime.onInstalled.addListener(function (details) {

    if (details.reason === "install") {

        chrome.tabs.create({url: "installed.html"});
        generateKeyAndCreateAlarms();

    } else if (details.reason === "update") {

        // chrome.tabs.create({url: "updated.html"});

        getKey(function (key) {
            if (key.length !== 13) {
                chrome.alarms.clearAll(function () {
                    generateKeyAndCreateAlarms();
                });
            } else {
                chrome.alarms.clearAll(function () {
                    createUpdateAlarms();
                });
            }
        });

    }
});

function generateKeyAndCreateAlarms() {
    var key = "http://malditobulo.maldita.es/api/userkey";
    var params = "?version=" + chrome.runtime.getManifest().version;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            storeKey(this.responseText);
            createUpdateAlarms();
        }
    };
    xhttp.open("GET", key + params, true);
    xhttp.send();
}

function storeKey(key) {
    var storage = chrome.storage.local;
    storage.set({'key': key});
}

function getKey(callback) {
    storage.get('key', function (e) {
        callback(JSON.parse(e['key']));
    })
}

/**
 * Use the Chrome API to create alarms whose firing will execute data updates
 */
function createUpdateAlarms() {
    chrome.alarms.create("websitecategories_update", {delayInMinutes: 0.1, periodInMinutes: 60 * 24});
    chrome.alarms.create("websites_update", {delayInMinutes: 0.1, periodInMinutes: 30});
    chrome.alarms.create("debunks_update", {delayInMinutes: 0.1, periodInMinutes: 30});
    chrome.alarms.create("urls_update", {delayInMinutes: 0.1, periodInMinutes: 30});
    chrome.alarms.create("websitesdebunked_update", {delayInMinutes: 0.1, periodInMinutes: 30});
}