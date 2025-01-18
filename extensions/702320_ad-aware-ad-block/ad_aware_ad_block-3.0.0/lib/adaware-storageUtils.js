'use strict';

const setStorage = function (key, value, callback) {
    let keyArray = {};
    return keyArray[key] = value, chrome.storage.local.set(keyArray, callback)
};
const getStorage = function (key, value, callback) {
    let keyArray = {};
    return keyArray[key] = value, chrome.storage.local.get(keyArray, function (value) {
        let keyArray = {};
        keyArray[key] = value[key], callback(keyArray)
    })
};
const getAllStorage = (callback) => {
    return chrome.storage.local.get(null, (data) => {
        callback(data);
    });
};

const adawareStorageUtils = {
    save: setStorage,
    load: getStorage,
    loadAll: getAllStorage
};

export default adawareStorageUtils;