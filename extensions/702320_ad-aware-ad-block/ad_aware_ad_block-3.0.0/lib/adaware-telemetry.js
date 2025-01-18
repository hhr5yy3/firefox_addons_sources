'use strict';

import adawareConfig from "./adaware-config.js";
import adawareStorageUtils from "./adaware-storageUtils.js";
import adawareSystemUtils from "./adaware-systemUtils.js";
import adawareTrackingDataUtils from "./adaware-trackingDataUtils.js";

 /* Import Configuration data from config file */
 let configurationData = adawareConfig.data;
 /* Flow Url */
 let flowUrl = configurationData.flowUrl;
 /* Event Prameters */
 let eventParameters = {
     ProductID: configurationData.productId, // static via config file
     Type: "" //dynamica for each request
 };

 /* after install necessary installdata */
 const init = () => {
     onFirstRun();
 }

 /* Send Complete install event  */
 const sendCompleteInstallEvent = () => {
     setTimeout(() => {
        adawareTrackingDataUtils.getInstallDate().then((date) => {
            adawareTrackingDataUtils.getInstallId().then((id) => {
                adawareStorageUtils.load('externalData', '', (ext) => {
                    let installDate = new Date(date.installDate).toISOString();
                    installDate = {installDate: installDate}
                    let installId = id;
                    let externalData = ext.externalData;
                    let browserEnvironment = new adawareSystemUtils.browserEnvironmentData();
                    let completeInstallEventData = adawareTrackingDataUtils.trackingData(browserEnvironment, installDate, installId, externalData);
                    // console.log(completeInstallEventData);
                    sendEvent("CompleteInstall", completeInstallEventData);
                 });
             });
         });
     }, 2000);
 }

 /* Send Daily Activity event */
 const sendDailyActivityEvent = (dailyActivityData) => {
     setTimeout(() => {
        adawareTrackingDataUtils.getInstallDate().then((date) => {
            adawareTrackingDataUtils.getInstallId().then((id) => {
                adawareStorageUtils.load('externalData', '', function (ext) {
                    let dailyData = dailyActivityData;
                    let installDate = new Date(date.installDate).toISOString();
                    installDate = {installDate: installDate}
                    let installId = id;
                    let externalData = ext.externalData;
                    let browserEnvironment = new adawareSystemUtils.browserEnvironmentData();
                    // console.log(adawareTrackingDataUtils.trackingData(dailyData, installDate, installId, externalData));
                    let dailyActivityDataEvent = adawareTrackingDataUtils.trackingData(browserEnvironment, installDate, installId, externalData, dailyData);
                    sendEvent("DailyActivity", dailyActivityDataEvent);
                 });
             });
         });
     }, 2000);
 }

 /* Send Complete Update event */
 const sendCompleteUpdateEvent = (lastVersion) => {
     setTimeout(() => {
        adawareTrackingDataUtils.getInstallDate().then((date) => {
            adawareTrackingDataUtils.getInstallId().then((id) => {
                adawareStorageUtils.load('externalData', '', function (ext) {
                    let installDate = new Date(date.installDate).toISOString();
                    installDate = {installDate: installDate}
                    let installId = id;
                    let externalData = ext.externalData;
                    let browserEnvironment = new adawareSystemUtils.browserEnvironmentData();
                    let fromExtensionVersion = {FromExtensionVersion: lastVersion};
                    let completeUpdateDataEvent = adawareTrackingDataUtils.trackingData(browserEnvironment, installDate, installId, externalData, fromExtensionVersion);
                    // console.log(completeUpdateDataEvent);
                    sendEvent("CompleteUpdate", completeUpdateDataEvent);
                 });
             });
         });
     }, 2000);
 }

 /* send generic event by passing event type and data */
 const sendEvent = (eventType, data) => {
    //  console.log(eventType, data);
     eventParameters.Type = eventType;
     let flowUrlDestination = flowUrl + adawareTrackingDataUtils.dictToStringParams(eventParameters);

     fetch(flowUrlDestination, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
     })
     .then(response => response.json())
     .then(data => {
        console.log("sendReport response : %o", data);
     })
     .catch((error) => {
         // console.error('Error:', error);
         try {
            let parsedResponse = JSON.parse(error);
            console.log("sendReport post failed response : %o (parsed) | %o (raw)", parsedResponse, error);
         } catch (e) {
            console.log("Error parsing install report response %o", e);
         }
     });
 }

 /* send event type, data with meta */
 const sendMetaEvent = (eventType, data) => {
    adawareTrackingDataUtils.getInstallDate().then((date) => {
        adawareTrackingDataUtils.getInstallId().then((id) => {
            adawareStorageUtils.load('externalData', '', function (ext) {
                 let installDate = new Date(date.installDate).toISOString();
                 installDate = {installDate: installDate}
                 let installId = id;
                 let externalData = ext.externalData;
                 let browserEnvironment = new adawareSystemUtils.browserEnvironmentData();
                 let datas = adawareTrackingDataUtils.trackingData(browserEnvironment, installDate, installId, externalData, data);
                 sendEvent(eventType, datas);
             });
         });
     });
 }

 /* first run  */
 const onFirstRun = () => {
     chrome.storage.local.get({
         'firstRun': true
     }, function (fetched) {
         if (fetched.firstRun === true) {
             chrome.storage.local.set({
                 'firstRun': false
             });
             adawareTrackingDataUtils.setInstallId().then((installId) => {
                adawareTrackingDataUtils.setInstallDate(installId).then((installData) => {
                     if (installData == true) {
                        adawareTrackingDataUtils.saveExternalData();
                     }
                 });
             });
         }
     });
 }

 /* extension handler on launch */
 const onExtensionLaunch = (callback) => {
     const defaultVersion = "0.0.0.0";
     adawareStorageUtils.load("version", defaultVersion, (fetched) => {
         var lastVersion = fetched.version;
         var currentVersion = chrome.runtime.getManifest().version;

         if (currentVersion > lastVersion && lastVersion !== defaultVersion) {
            //  console.log("Updated from version %s to %s", lastVersion, currentVersion);
             callback({ reason: "update", lastVersion: lastVersion });
         } else {
            adawareStorageUtils.load("firstRun", true, (fetched) => {
                 if (fetched.firstRun === true) {
                     callback({reason: "install"});
                     adawareStorageUtils.save("firstRun", false);
                 } else {
                     callback({reason: "startup"});
                 }
             });
         }
     });
 }

const adawareTelemetry = {
    init: init,
    sendCompleteInstallEvent: sendCompleteInstallEvent,
    sendDailyActivityEvent: sendDailyActivityEvent,
    sendCompleteUpdateEvent: sendCompleteUpdateEvent,
    sendEvent: sendEvent,
    sendMetaEvent: sendMetaEvent,
    onExtensionLaunch: onExtensionLaunch
};

export default adawareTelemetry;