/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Storage Service.
 * Based on HTML5 databases.
 */
var StorageService = {
  /* Database object. */
  _database : null,

  /**
   * Initializes the resource.
   */
  _init : function() {
    Logger.trace("StorageService._init");

    var that = this;

    //try {
    //  // this is to overwrite the underlying indexedDb object with the shimmed one on Safari
    //  // on Chrome, this throws an exception
    //  window.shimIndexedDB.__useShim();
    //} catch(e) {
    //  // silent exception
    //}

    //
    // Declare Database
    //
    try {
      this._database = new Dexie("Aeropost");
      this._database.version(1).stores({
        invoice: "courierNumber,creationDate",
        supportedSite: "siteId,siteDomain"
      });

      this._database.invoice.mapToClass(Invoice);
      this._database.supportedSite.mapToClass(SupportedSite);

      // Open the database
      this._database.open().then(function() {
        Logger.trace("Database opened successfully!");
        ObserverHelper.notify(Topics.DATABASE_STARTED, null);
      }).catch(function(error) {
       Logger.error("Unable to open database: " + error);
       });

    } catch(e) {
      Logger.error("Unable to perform database operation: ", e.message);
    }
  },

  /**
   * Removes all elements from the specified storeName
   * @param aStoreName the storeName to be purged
   * @return returns the operation promise
   */
  deleteAllElements : function(aStoreName) {
    return this._database[aStoreName].clear();
  },

  /**
   * Returns all the objects for the specified store
   * @param aStoreName the store to get all its objects
   * @return returns the operation promise
   */
  getAllElements : function(aStoreName) {
    return this._database[aStoreName].toArray();
  },

  /**
   * Gets an element by Id from the given store
   * @param aStoreName the store to be searched
   * @param aId the id value to be searched for
   * @return returns the operation promise
   */
  getElementById : function(aStoreName, aId) {
    return this._database[aStoreName].get(aId);
  },

  /**
   * Gets all elements that match the given value for the specified index
   * @param aStoreName the store to be searched
   * @param aIndexName the index to be used for the comparison
   * @param aValue the value to be matched
   * @return returns the operation promise
   */
  getElementByValue : function(aStoreName, aIndexName, aValue) {
    return this._database[aStoreName].where(aIndexName).equals(aValue).toArray();
  },

  /**
   * Gets the list of elements in the given range
   * @param aStoreName the store to be searched
   * @param aIndexName the name of th index to be used in the range
   * @param aLowValue the lowest value in the range
   * @param aHighValue the highest value in the range
   * @return returns the operation promise
   */
  getElementsInRange : function(aStoreName, aIndexName, aLowValue, aHighValue) {
    if (aLowValue && aHighValue) {
      return this._database[aStoreName].where(aIndexName).between(aLowValue, aHighValue).toArray();
    } else if (aLowValue) {
      return this._database[aStoreName].where(aIndexName).above(aLowValue).toArray();
    } else {
      return this._database[aStoreName].where(aIndexName).below(aHighValue).toArray();
    }

  },

  /**
   * Insert an object in the specified store
   * @param aStoreName the store to be used for insertion
   * @param aObject the object to be stored
   * @return returns the operation promise
   */
  insertObject : function(aStoreName, aObject) {
    return this._database[aStoreName].put(aObject);
  },

  /**
   * Deletes an object in the specified store
   * @param aStoreName the store to be used for insertion
   * @param aId the id of the object to be deleted
   * @return returns the operation promise
   */
  deleteObject : function(aStoreName, aId) {
    return this._database[aStoreName].delete(aId);
  },

  /**
   * Updates an object in the specified store
   * @param aStoreName the store to be used for insertion
   * @param aId the id of the object to be updated
   * @param aObject the object to be updated
   * @return returns the operation promise
   */
  updateObject : function(aStoreName, aId, aObject) {
    return this._database[aStoreName].update(aId, aObject);
  }
};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(StorageService);
