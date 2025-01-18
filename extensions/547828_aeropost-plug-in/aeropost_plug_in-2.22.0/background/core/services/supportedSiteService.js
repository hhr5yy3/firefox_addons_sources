/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Supported Site Service.
 */
var SupportedSiteService = {

  /**
   * Initializes the service.
   */
  _init : function() {
    Logger.trace("SupportedSiteService._init");

    ObserverHelper.addObserver(this, Topics.DATABASE_STARTED);
  },

  /**
   * Retrieves the list of supported sites and updates it locally
   */
  getSupportedSites : function() {
    Logger.trace("SupportedSiteService.getSupportedSites");

    var callback = function(aResult) {
      var siteList = aResult.supportedSites;
      if (siteList && siteList.length > 0) {
        for (var i = 0; i < siteList.length; i++) {
          var supportedSite = siteList[i];
          // insert or update if already existing
          SupportedSiteDAO.insertSupportedSite(supportedSite, function() {
              Logger.trace("SupportedSiteService.Updated supported site");
            });
        }
      }
    };

    AeroApi.getSupportedSites(callback);

  },

  /**
   * Retrieves the list of supported sites for the given domain
   * @param aDomain the domain to search for
   * @aCallback the callback to be called
   */
  getSupportedSitesForDomain : function(aDomain, aCallback) {
    Logger.trace("SupportedSiteService.getSupportedSitesForDomain");
    SupportedSiteDAO.selectSupportedSitesForDomain(aDomain, aCallback);
  },

  /**
   * Observes for changes.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {
    Logger.trace("SupportedSiteService.observe");

    switch (aTopic) {
      case Topics.DATABASE_STARTED:
        SupportedSiteService.getSupportedSites();
        break;
    }
  }

};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(SupportedSiteService);
