'use strict';

import adawareConfig from "./adaware-config.js";
import adawareStorageUtils from "./adaware-storageUtils.js";

/* Import Configuration data from config file */
let configurationData = adawareConfig.data;
let isStaticExternalData = configurationData.isStaticExternalData;
/* Extension external data */
let externalData = configurationData.externalData;
/* others*/
let installDate = null;

/* set install date when extension installed */
const setInstallDate = () => {
    return new Promise((resolve, reject) => {
        installDate = Date.now();
        let prettyStringDate = installDate;
        adawareStorageUtils.save("installDate", prettyStringDate, function () {
            resolve(true);
        });
    });
}

/* get install date from localstorage */
const getInstallDate = () => {
    return new Promise((resolve, reject) => {
        adawareStorageUtils.load("installDate", Date.now(), (date) => {
            resolve(date);
        });
    });
}

/* setup install uniq id */
const setInstallId = () => {
    return new Promise((resolve, reject) => {
        var d = new Date().getTime();
        var installId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        adawareStorageUtils.save("installId", installId, () => {
            resolve(true);
        })
    });
}

/* get install id from localstorage */
const getInstallId = () => {
    return new Promise((resolve, reject) => {
        adawareStorageUtils.load("installId", "", (id) => {
            resolve(id);
        });
    });
}

/* save external data */
const saveExternalData = () => {
    return new Promise((resolve, reject) => {
        // if (isStaticExternalData) {
            adawareStorageUtils.save('externalData', externalData);
        // }
    })
}

/* set external data */
const setExternalData = (data) => {
    for (var key in data) {
        if (externalData.hasOwnProperty(key) && data[key]) {
            externalData[key] = data[key];
        }
    }
    // console.log("External data set to: %o", externalData);
}

/* get external data */
const getExternalData = () => {
    return externalData;
}

/* setup uninstall */
const setupUninstall = (uninstallUrl) => {
    getInstallDate().then((date) => {
        getInstallId().then((id) => {
            
            let uninstallData = {
                InstallDate: new Date(date.installDate).toISOString(),
                InstallId: id.installId,
                PID: getExternalData().PID,
                InstallSource: getExternalData().InstallSource,
                CampaignID: getExternalData().CampaignID,
                BundleID: getExternalData().BundleID,
                OfferID: getExternalData().OfferID,
                extensionID: chrome.runtime.id
            }

            let trackingDetails = Object.assign(uninstallData);
            // console.log(trackingDetails);
            setUninstallURL(uninstallUrl, trackingDetails);
        });
    });
}

/* set uninstall url */
const setUninstallURL = (uninstallUrl, trackingData) => {
    var uninstallUrl = uninstallUrl;
    uninstallUrl += dictToStringParams(trackingData);
    // console.log("Uninstall URL : %s | Uninstall URL length : %s", uninstallUrl, uninstallUrl.length);
    try {
        chrome.runtime.setUninstallURL(uninstallUrl, () => {
            console.log("Uninstall URL isset.");
        });
    } catch (e) {
        console.log(e);
    }
}

/* function for binding query parameters to url separate*/
const dictToStringParams = (obj) => {
    let result = "";
    let properties = Object.getOwnPropertyNames(obj);
    for (let k in properties) {
        let key = properties[k];
        result = result + key + "=" + obj[key] + "&";
    }
    return result.substring(0, result.length - 1);
}

/*  event tracking data */
const trackingData = (browserEnvironmentData, installData, installId, externalData, ...othersData) => {
    let obj = Object.assign(browserEnvironmentData, installData, installId, externalData, ...othersData);
    obj = trackingDataFormatted(obj);
    return obj;
}

/* format and merge objects */
const trackingDataFormatted = (obj) => {
    let tracking = {};
    let properties = Object.getOwnPropertyNames(obj);
    for (let k in properties) {
        let key = properties[k];
        tracking[key] = obj[key];
    }
    clean(tracking);
    return {
        Data: tracking
    }
}

/* clean up objects which are empty */
const clean = (obj) => {
    let propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
        let propName = propNames[i];
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}

const adawareTrackingDataUtils = {
    getInstallDate: getInstallDate,
    setInstallDate: setInstallDate,
    getInstallId: getInstallId,
    setInstallId: setInstallId,
    saveExternalData: saveExternalData,
    getExternalData: getExternalData,
    setExternalData: setExternalData,
    dictToStringParams: dictToStringParams,
    trackingData: trackingData,
    setupUninstall: setupUninstall
};

export default adawareTrackingDataUtils;
