/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Background Helper
 * Assists returning a background object instance based on the client
 */
var BackgroundHelper = {
  _backgroundObject: null,

  /**
   * Gets background process or page.
   */
  getBackgroundPage: function() {
    try {
      return chrome.extension.getBackgroundPage();
    } catch (e) {
      try {
        return safari.extension.globalPage.contentWindow;
      } catch (e) {
        return this._buildBackgroundObject();
      }
    }
  },

  _buildBackgroundObject: function() {
    if (!this._backgroundObject) {
      var Background = require("background").Background;
      var Logger = require("helpers/logger").Logger;
      var Topics = require("helpers/observerHelper").Topics;
      var ObserverHelper = require("helpers/observerHelper").ObserverHelper;
      var AnalyticsApi = require("core/apis/analyticsApi").AnalyticsApi;
      var UpdateService = require("core/services/updateService").UpdateService;
      var AccountService = require("core/services/accountService").AccountService;
      var UtilityHelper = require("helper/utilityHelper").UtilityHelper;
      var ConfigSettings = require("helpers/configSettings").ConfigSettings;
      var PropertyHelper = require("helpers/propertyHelper").PropertyHelper;
      var StorageHelper = require("helpers/storageHelper").StorageHelper;
      var PreAlertService = require("core/services/preAlertService").PreAlertService;

      this._backgroundObject = {
        Background :  Background,
        Logger : Logger,
        Topics : Topics,
        ObserverHelper : ObserverHelper,
        AnalyticsApi : AnalyticsApi,
        UpdateService : UpdateService,
        AccountService : AccountService,
        UtilityHelper : UtilityHelper,
        ConfigSettings : ConfigSettings,
        PropertyHelper : PropertyHelper,
        StorageHelper : StorageHelper,
        PreAlertService : PreAlertService
      };
    }
    return this._backgroundObject;
  }
};

if (typeof exports != "undefined") {
  exports.BackgroundHelper = BackgroundHelper;
}
