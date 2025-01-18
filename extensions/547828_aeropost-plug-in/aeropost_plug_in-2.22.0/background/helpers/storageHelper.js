/**
 * Copyright (C) 2014 Aerocasillas. All Rights Reserved.
 */

var StorageHelper = {

  init : function() {
    Logger.trace("StorageHelper.init");
  },

  getActiveAccount : function(aCallback) {

    var activeAccount = null;
    chrome.storage.local.get("activeAccount", function(aResult) {
        if (!chrome.runtime.lastError && aResult.activeAccount) {
          var account = new Account();
          account.updateWithJSON(JSON.parse(aResult.activeAccount));
          activeAccount = account;
        }
        aCallback(activeAccount);
      });

  },

  setActiveAccount : function(aActiveAccount, aCallback) {
    if (aActiveAccount) {
      if (aActiveAccount.errors) {
        aActiveAccount.errors = null;
      }
      chrome.storage.local.set({"activeAccount" : JSON.stringify(aActiveAccount)}, aCallback);
    } else {
      chrome.storage.local.remove("activeAccount", aCallback);
    }

  },

  getCredentials : function(aCallback) {
    var creds = null;
    chrome.storage.local.get("aero-creds", function(aResult) {
        if (!chrome.runtime.lastError && aResult["aero-creds"]) {
          creds = JSON.parse(aResult["aero-creds"]);
        }
        aCallback(creds);
      });
  },

  setCredentials : function(aCreds, aCallback) {
    if (aCreds) {
      chrome.storage.local.set({"aero-creds" : JSON.stringify(aCreds)}, aCallback);
    } else {
      chrome.storage.local.remove("aero-creds", aCallback);
    }
  }
};

window.addEventListener("load", function() { StorageHelper.init(); }, false);
