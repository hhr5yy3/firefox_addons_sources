/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * PreAlert Service.
 */
var PreAlertService = {

  /* prealerts list */
  _preAlerts : null,

  /**
   * Gets the account prealerts
   * @return the account prealerts
   */
  get preAlerts() {
    return this._preAlerts;
  },

  /**
   * Initializes the service.
   */
  _init : function() {
    Logger.trace("PreAlertService._init");

    ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNED_OUT);

  },

  /**
   * Checks whether a courier number is already in the list of prealerts or not
   * @param aCourierNumber the number to be checked
   * @returns whether the courier number is already prealerted or not
   */
  preAlertExists : function(aCourierNumber) {
    var result = false;

    if (this._preAlerts) {
      for (var i = 0; i < this._preAlerts.length; i++) {
        var preAlert = this._preAlerts[i];
        if (preAlert.get("courierNumber") == aCourierNumber) {
          result = true;
          break;
        }
      }
    }

    return result;
  },

  /**
   * Generates the package preAlert
   * @param aPackage the package to generate its preAlert
   * @param aCallback the callback to be called on return
   */
  packagePreAlert : function(aPackage, aCallback) {
    var localCallback = function(aResult) {
      if (!aResult.apiErrors && !aResult.preAlertExists &&
           aResult.preAlertNumber) {
        // success
        /*var preAlert = new PreAlert(aResult.preAlertNumber);
        preAlert.set("accountId", aPackage.accountNumber);
        preAlert.set("courierNumber", aPackage.courierNumber);
        preAlert.set("courierName", aPackage.courierName);
        preAlert.set("value", aPackage.value);
        preAlert.set("description", aPackage.packageDescription);
        preAlert.set("shipperName", aPackage.shipperName);
        preAlert.set("creationDate", new Date().getTime());
        PreAlertDAO.insertPreAlert(preAlert, function() {
          Logger.debug("created preAlert");
        });*/
      }
      aCallback(aResult);
    };
    //AeroApi.packagePreAlert(aPackage, localCallback);
  },

  /**
   * Generates the package preAlert for Amazon and Ebay
   * @param aPackage the package to generate its preAlert
   * @param aCallback the callback to be called on return
   */
  packagePreAlertRest : function(aShipperName, aPackage, aCallback) {
    var localCallback = function(aResult) {
      if (aResult != null && !aResult.apiErrors && !aResult.preAlertExists &&
           aResult.preAlertNumber) {
      }
      aCallback(aResult);
    };

    if(aShipperName == 'Amazon'){
      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_PREALERTAMAZON_URL, "Post", "", aPackage, localCallback);
    } else {
      aPackage.isDesktop = true;
      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_PREALERTEBAY_URL, "Post", "", aPackage, localCallback);
    }
    
  },


  /**
   * Generates the package preAlert for Amazon and Ebay
   * @param aPackage the package to generate its preAlert
   * @param aCallback the callback to be called on return
   */
  packagePostAlertRest : function(aShipperName, aPackage, aCallback) {
    var localCallback = function(aResult) {
      if (aResult != null && !aResult.apiErrors && !aResult.preAlertExists &&
           aResult.preAlertNumber) {
      }
      aCallback(aResult);
    };

    if(aShipperName == 'Amazon'){
      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_POSTALERTAMAZON_URL, "Post", "", aPackage, localCallback);
    } else {
      aPackage.isDesktop = true;
      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_POSTALERTEBAY_URL, "Post", "", aPackage, localCallback);
    }
    
  },

  /**
   * Uploads the preAlert invoice
   * @param aAttachment the attachment object to be uploaded
   * @param aCallback the callback to be called on return
   */
  uploadInvoice : function(aAttachment, aCallback) {
    AeroApi.uploadPreAlertInvoice(aAttachment, aCallback);
  },

  /**
   * Retrieves the list of locally stored preAlerts for the given account
   * @param aAccountId the account id to retrieve its preAlerts
   * @aCallback the callback to be called
   */
  getPreAlertsForAccount : function(aAccountId, aCallback) {
    PreAlertDAO.selectPreAlertsForAccount(aAccountId, aCallback);
  },

  /**
   * Gets the prealerts from a given user
   */
  getAccountPreAlerts : function() {
    var that = this;
    var localCallback = function(aResult) {
      // set the local list and notify to update
      if (aResult.status == 200) {
        that._preAlerts = that._parseGetAccountPreAlerts(aResult);
      }
      if (aResult.apiErrors) {
        // there were errors, create a notification
        var notification = new NotificationObject(new Date().getTime());
        notification.type = "basic";
        notification.point = null;
        notification.title = $.i18n.getString("extension.api.error.title");
        notification.msg = $.i18n.getString("extension.api.getPreAlerts.error.msg");
        NotificationService.showNotification(notification);
      } else {
        ObserverHelper.notify(Topics.PREALERTS_UPDATED, aResult);
      }
    }
    var activeAccount = AccountService.activeAccount;
    var params = {
      token : activeAccount.get("token"),
      pageSize: 10,
      pageIndex: 0,
      ip: ""
    }
    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GET_PREALERTS_BY_ACCOUNT, "Post", "", params, localCallback);
    /*AeroApi.getAccountPreAlerts(activeAccount.get("token"),
                               0,
                               ConfigSettings.PACKAGE_LIST_QUANTITY,
                               localCallback);*/
  },


  /**
   * Parses the getAccountPreAlerts response
   * @param aResponse the response to be parsed
   */
  _parseGetAccountPreAlerts : function(aResponse) {
    Logger.trace("AeroApi._parseGetAccountPreAlerts");
    var result = [];
    var packagesResult = $(aResponse).find("a\\:GetAccountPreAlertsResult, GetAccountPreAlertsResult");
    if (!packagesResult) {
      result.apiErrors = true;
    } else {
      var preAlerts = aResponse.results.notesDetailList;
      if (preAlerts.length > 0) {
        for (var i = 0; i < preAlerts.length; i++) {
          var element = preAlerts[i];
          var id = element.noteId;
          var preAlert = new PreAlert(id);
          preAlert.set("description", element.description);
          preAlert.set("courierName", element.courierName);
          preAlert.set("courierNumber", element.courierTracking);
          preAlert.set("courierURL",  element.courierURL);
          preAlert.set("value",  element.value);
          preAlert.set("shipperName", element.shipperName);
          preAlert.set("creationDate", element.creationDate);
          result.push(preAlert);

        }
      }
    }
    return result;
  },

  GetPrealertStatusByTracking : function(aTracking, aAddress, aCallback){
    var activeAccount = AccountService.activeAccount;

    var clientInformation = {};
    clientInformation.account = activeAccount.get("accountNumber");
    clientInformation.gateway = activeAccount.get("gateway");
    clientInformation.lang = activeAccount.get("language");

    var trackingList = [];
    var trackingObj = {};
    trackingObj.trackingNumber = aTracking;
    trackingObj.address = aAddress;
    trackingList[0] = trackingObj;

    var prealertByTrackingRequest = {};
    prealertByTrackingRequest.clientInformation = clientInformation;
    prealertByTrackingRequest.trackingList = trackingList;
    prealertByTrackingRequest.token = activeAccount.get("token");

    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_PREALERT_STATUS_URL, "Post", "", prealertByTrackingRequest, aCallback);
  },

  /**
   * Observes for changes.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {

    switch(aTopic) {
      case Topics.ACCOUNT_SIGNED_OUT:
        this._preAlerts = null;
        break;
    }
  }

};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(PreAlertService);
