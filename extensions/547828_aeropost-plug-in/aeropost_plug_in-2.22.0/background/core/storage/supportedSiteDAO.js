/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Supported Site DAO.
 * Handles the supportedSite table using SQLite databases.
 */
var SupportedSiteDAO = {
  /* Table schema. */
  TABLE_SCHEMA : {
    TABLE_NAME : "supportedSite",
    COLUMNS : [
      "siteId",
      "siteDomain",
      "siteContainer",
      "siteFields"
    ],
    PRIMARY_KEYS : [ "siteId" ]
  },

  /**
   * Initializes the resource.
   */
  _init : function() {
    Logger.trace("SupportedSiteDAO._init");

  },

  /**
   * Inserts a supportedSite.
   * @param aSupportedSite the supportedSite object.
   * @param aCallback the callback method.
   */
  insertSupportedSite : function(aSupportedSite, aCallback) {
    Logger.trace("SupportedSiteDAO.insertSupportedSite");

    if ((null == aSupportedSite) || !(aSupportedSite instanceof SupportedSite)) {
      throw("Invalid SupportedSite DTO");
    }

    var result = StorageService.insertObject(SupportedSite.SCHEMA.NAME, aSupportedSite);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("SupportedSiteDAO.Error inserting supported site: " + error);
    });
  },

  /**
   * Updates a supportedSite.
   * @param aSupportedSite the supportedSite object.
   * @param aCallback the callback method.
   */
  updateSupportedSite : function(aSupportedSite, aCallback) {
    Logger.trace("SupportedSiteDAO.updateSupportedSite");

    if ((null == aSupportedSite) || !(aSupportedSite instanceof SupportedSite)) {
      throw("Invalid SupportedSite DTO");
    }

    var result = StorageService.updateObject(SupportedSite.SCHEMA.NAME, SupportedSite.get("siteDomain"), aSupportedSite);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("SupportedSiteDAO.Error updating supported site: " + error);
    });
  },

  /**
   * Deletes a supportedSite.
   * @param aSupportedSite the supportedSite object.
   * @param aCallback the callback method.
   */
  deleteSupportedSite : function(aSupportedSite, aCallback) {
    Logger.trace("SupportedSiteDAO.deleteSupportedSite");

    var result = StorageService.deleteObject(SupportedSite.SCHEMA.NAME, aSupportedSite.get("siteDomain"));
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("SupportedSiteDAO.Error deleting supported site: " + error);
    });
  },

  /**
   * Deletes all the supportedSites.
   * @param aCallback the callback method.
   */
  deleteSupportedSites : function(aCallback) {
    Logger.trace("SupportedSiteDAO.deleteSupportedSites");

    var result = StorageService.deleteAllElements(SupportedSite.SCHEMA.NAME);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("SupportedSiteDAO.Error deleting supported sites: " + error);
    });
  },

  /**
   * Selects all supportedSites for the given domain.
   * @param aDomain the domain to get the supportedSites
   * @param aCallback the callback method.
   */
  selectSupportedSitesForDomain : function(aDomain, aCallback) {
    Logger.trace("SupportedSiteDAO.selectSupportedSites");

    var result = StorageService.getElementByValue(SupportedSite.SCHEMA.NAME, "siteDomain", aDomain);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("SupportedSiteDAO.Error getting supported sites for domain: " + error);
      aCallback(new Array());
    });
  }
};

/**
 * Constructor.
 */
(function() { this._init(); }).apply(SupportedSiteDAO);
