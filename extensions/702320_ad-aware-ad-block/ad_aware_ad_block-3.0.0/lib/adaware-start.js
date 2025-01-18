'use strict';

import µb from '../js/background.js';

import adawareConfig from './adaware-config.js';
import adawareTrackingDataUtils from '../lib/adaware-trackingDataUtils.js';
import adawareTelemetry from '../lib/adaware-telemetry.js';
import adawareStorageUtils from './adaware-storageUtils.js';

// Adaware variables
const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
let lastPing;
const currentVersion = chrome.runtime.getManifest().version;
const UNINSTALL_URL = "https://www.surveymonkey.com/r/AdawareAdBlock_Uninstallation?";
const THANKYOU_URL = "https://www.adaware.com/ad-block/thank-you";

// Adaware methods
const getUrlParameterFromString = (url, name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const sendDailyActivityData = (lastPingTime) => {
    let lastPingDate = new Date(lastPingTime);
    let currentPingDate = Date.now();
    let deltaMinutes = (currentPingDate - lastPingDate.getTime()) / oneMinute;
    // console.debug("Last daily ping time: %s | %s minutes ago", lastPingDate.toString(), deltaMinutes);

    let dailyActivityData = {};
    dailyActivityData.LastCallbackDate = lastPingDate.toISOString();

    adawareTelemetry.sendDailyActivityEvent(dailyActivityData);
};

const onAllReady = () => {
    // Daily activity counter
    lastPing = Date.now();
    setInterval(() => {
        sendDailyActivityData(lastPing);
        lastPing = Date.now();
    }, oneDay);
};

const onVersionReady = (lastVersion) => {
    if (lastVersion !== currentVersion) {
        adawareStorageUtils.save("version", currentVersion);
    }
};

// Only launches when all chrome browser processes are closed and is not first install or update
const onStartupHandler = () => {
    adawareStorageUtils.load("startupTime", Date.now(), (fetched) => {
        // console.log("Last startup time: %s", new Date(fetched.startupTime).toString());
        if (Date.now() - fetched.startupTime > oneDay) { // if last startup time is greater than 24 hours
            sendDailyActivityData(fetched.startupTime);
        }
        adawareStorageUtils.save("startupTime", Date.now());
    });
};

const onFirstInstallHandler = () => {
    let externalData = {
        "PID": adawareConfig.data.externalData.PID || "",
        "CampaignID": adawareConfig.data.externalData.CampaignID || "",
        "InstallSource": adawareConfig.data.externalData.InstallSource || "",
        "BundleID": adawareConfig.data.externalData.BundleID || "",
        'OfferID': adawareConfig.data.externalData.OfferID || "",
        "TemplateID": adawareConfig.data.externalData.TemplateID || ""
    };

    const getParametersFromStore = () => {
        // console.log("Get parameters from chrome store");

        return new Promise((resolve, reject) => {
            try {
                chrome.tabs.query({ url: "https://chrome.google.com/webstore/detail/adaware-ad-block/*" }, (tabs) => {
                    if (tabs.length > 0) {
                        let url = tabs[0].url;

                        if ((url.split("?")).length > 1) {
                            externalData.PID = getUrlParameterFromString(url, "partnerId") || adawareConfig.data.externalData.PID;
                            externalData.CampaignID = getUrlParameterFromString(url, "campaignId") || "";
                            externalData.InstallSource = getUrlParameterFromString(url, "sourceTraffic") || "";
                            externalData.BundleID = getUrlParameterFromString(url, "bundleId") || "";
                            externalData.OfferID = getUrlParameterFromString(url, "offerId") || "";
                        }
                        // console.log("Parameters from chrome store %o", externalData);
                        resolve(externalData);
                    } else {
                        // console.log("No chrome store url open %o", externalData);
                        resolve(externalData);
                    }
                });
            } catch (err) {
                // console.log(err);
                resolve(externalData);
            }
        });
    };

    const saveAndSendData = (externalData) => {
        // console.log("Save external data... %o", externalData);
        adawareTrackingDataUtils.setExternalData(externalData);
        adawareTrackingDataUtils.saveExternalData();
        
        adawareTelemetry.sendCompleteInstallEvent();
        adawareTrackingDataUtils.setupUninstall(UNINSTALL_URL);
    };

    adawareTrackingDataUtils.setInstallDate().then(() => {
        // console.log("Set uninstall date to localstorage");
        adawareTrackingDataUtils.setInstallId().then(() => {
            // console.log("Set install id to localstorage");
            getParametersFromStore().then(saveAndSendData);
        });
    });
};

const onUpdatedHandler = (lastVersion) => {
    const saveAndSendData = () => {
        adawareTelemetry.sendCompleteUpdateEvent(lastVersion);
    }
    saveAndSendData();
};

const onExtensionLaunchHandler = (ev) => {
    // console.log("on %s event...", ev.reason);
    let promiseList = [];
    promiseList.push(new Promise((resolve, reject) => {
        adawareStorageUtils.load("externalData", adawareTrackingDataUtils.getExternalData(), (fetched) => {
            adawareTrackingDataUtils.setExternalData(fetched.externalData);
            // console.log("Loaded external data: %o", fetched.externalData);
            resolve("externalData");
        });
    }));

    Promise.all(promiseList).then((resolutionMessage) => {
        // console.log("Resolution message %o", resolutionMessage);
        if (ev.reason === "install") {
            // console.log("This is the very first run after installation");
            chrome.tabs.create({ url: THANKYOU_URL })
            onFirstInstallHandler();

            // removed filters
            setTimeout(() => {
                console.log(µb.selectedFilterLists);
                let filterLists = ["easyprivacy", "plowe-0"];

                for (let i = 0; i < filterLists.length; i++) {
                    let str = µb.selectedFilterLists.indexOf(filterLists[i]);
                    if (str != -1) {
                        µb.selectedFilterLists.splice(str, 1);
                    }
                }
                console.log(µb.selectedFilterLists);
            }, 3000)
        } else if (ev.reason === "update") {
            // console.log("Extension is updated");
            onUpdatedHandler(ev.lastVersion);
            setTimeout(() => {
                chrome.runtime.reload();
            }, 6000);
        } else if (ev.reason === "startup") {
            onStartupHandler();
        } else {
            console.log("Unhandled extension event");
        }
    });
};

const onFirstFetchReady = (fetched) => {
    onVersionReady(fetched.version);
    onAllReady();
};

adawareTelemetry.onExtensionLaunch(onExtensionLaunchHandler);
adawareStorageUtils.load("version", "0.0.0.0", onFirstFetchReady);