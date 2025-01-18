/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Update Service.
 */
var UpdateService = {
  /* flag to prevent concurrent updates */
  _updating : false,
  _updateCountLimit : 2,
  _updateCount : 0,
  /* Timer to reset the update state after a limit of time */
  _updateResetTimer : null,

  /**
   * Initializes the service.
   */
  _init : function() {
    Logger.trace("UpdateService._init");

    ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNED_IN);
    ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNED_OUT);
    ObserverHelper.addObserver(this, Topics.PACKAGES_UPDATED);
    ObserverHelper.addObserver(this, Topics.PREALERTS_UPDATED);
  },

  /**
   * Forces an update
   */
  forceUpdate : function() {
    var isSignedIn = AccountService.isSignedIn;
    var isClientAllowed = PropertyHelper.get(PropertyHelper.PROP_CLIENT_ALLOWED);
    if (isSignedIn && !this._updating && isClientAllowed) {
      Logger.debug("UpdateService Started Update");
      this._updating = true;
      ObserverHelper.notify(Topics.UPDATE_STARTED, null);
      this._updateCount = 0;
      var that = this;
      this._updateResetTimer = new Timer(function() {
          that._updating = false;
          Logger.debug("UpdateService Finished Update due to Timeout");
          ObserverHelper.notify(Topics.UPDATE_FINISHED, null);
          that._updateCount = 0;
          that._updateResetTimer.cancel();
          that._updateResetTimer = null;
        }, ConfigSettings.UPDATE_TIME_LIMIT);
      //AccountService.getAccountPackages();
      //AccountService.getOrders();
      AccountService.getNewOrdersPackagesByAccount();
      AccountService.getCart();
      PreAlertService.getAccountPreAlerts();
      AccountService.getProfileInformationDelivery();
    } else {
      if (!isClientAllowed) {
        // this means the client is not allowed
        Logger.debug("Unable to force update because this client is not allowed to consume services");
      }
    }
  },

  /**
   * Checks update finish and notifies about it
   */
  _checkUpdateFinish : function() {
    this._updateCount++;
    if (this._updateCount == this._updateCountLimit) {
      // update has finished, now notify
      this._updating = false;
      Logger.debug("UpdateService Finished Update");
      ObserverHelper.notify(Topics.UPDATE_FINISHED, null);
      this._updateCount = 0;
      if (this._updateResetTimer) {
        this._updateResetTimer.cancel();
      }
    }
  },

  /**
   * Observes for changes.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {
    Logger.trace("UpdateService.observe");

    switch (aTopic) {
      case Topics.ACCOUNT_SIGNED_IN:
        this.forceUpdate();
        break;
       case Topics.ACCOUNT_SIGNED_OUT:
        this._updating = false;
        Logger.debug("UpdateService Finished Update due to sign out");
        ObserverHelper.notify(Topics.UPDATE_FINISHED, null);
        this._updateCount = 0;
        if (this._updateResetTimer) {
          this._updateResetTimer.cancel();
        }
        break;
      case Topics.PACKAGES_UPDATED:
        this._checkUpdateFinish();
        break;
      case Topics.PREALERTS_UPDATED:
        this._checkUpdateFinish();
        break;
    }
  }
};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(UpdateService);
