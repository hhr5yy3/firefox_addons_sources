/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Invoice DAO.
 * Handles the invoice table using SQLite databases.
 */
var InvoiceDAO = {
  /* Table schema. */
  TABLE_SCHEMA : {
    TABLE_NAME : "invoice",
    COLUMNS : [
      "courierNumber",
      "invoiceHtml",
      "creationDate"
    ],
    PRIMARY_KEYS : [ "courierNumber" ]
  },

  /**
   * Initializes the resource.
   */
  _init : function() {
    Logger.trace("InvoiceDAO._init");

  },

  /**
   * Inserts an invoice.
   * @param aInvoice the invoice object.
   * @param aCallback the callback method.
   */
  insertInvoice : function(aInvoice, aCallback) {
    Logger.trace("InvoiceDAO.insertInvoice");

    if ((null == aInvoice) || !(aInvoice instanceof Invoice)) {
      throw("Invalid Invoice DTO");
    }

    var result = StorageService.insertObject(Invoice.SCHEMA.NAME, aInvoice);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("InvoiceDAO.Error inserting invoice: " + error);
    });
  },

  /**
   * Updates a invoice.
   * @param aInvoice the invoice object.
   * @param aCallback the callback method.
   */
  updateInvoice : function(aInvoice, aCallback) {
    Logger.trace("InvoiceDAO.updateInvoice");

    if ((null == aInvoice) || !(aInvoice instanceof Invoice)) {
      throw("Invalid Invoice DTO");
    }

    var result = StorageService.updateObject(Invoice.SCHEMA.NAME, aInvoice.get("courierNumber"), aInvoice);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("InvoiceDAO.Error updating invoice: " + error);
    });
  },

  /**
   * Deletes an invoice.
   * @param aCourierNumber the courier number to delete the respective invoice
   * @param aCallback the callback method.
   */
  deleteInvoice : function(aCourierNumber, aCallback) {
    Logger.trace("InvoiceDAO.deleteInvoice");

    var result = StorageService.deleteObject(Invoice.SCHEMA.NAME, aCourierNumber);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("InvoiceDAO.Error deleting invoice: " + error);
    });
  },

  /**
   * Deletes all the invoices.
   * @param aCallback the callback method.
   */
  deleteInvoices : function(aCallback) {
    Logger.trace("InvoiceDAO.deleteInvoices");

    var result = StorageService.deleteAllElements(Invoice.SCHEMA.NAME);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("InvoiceDAO.Error deleting all invoices invoice: " + error);
    });
  },

  /**
   * Selects the invoice for the given courier number.
   * @param aCourierNumber the courier number to search for
   * @param aCallback the callback method.
   */
  getInvoice : function(aCourierNumber, aCallback) {
    Logger.trace("InvoiceDAO.getInvoice");
    var result = StorageService.getElementById(Invoice.SCHEMA.NAME, aCourierNumber);
    result.then(aCallback);
    result.catch(function(error) {
      Logger.error("InvoiceDAO.Error getting invoice: " + error);
      aCallback();
    });
  },

  /**
   * Purges the invoices stored in the database, that are older than the ttl
   * specified in the config settings file
   */
  purgeStoredInvoices : function() {
    var ttl = ConfigSettings.INVOICE_TTL;
    var deleteTime = new Date();
    deleteTime.setDate(deleteTime.getDate() - ttl);

    var localCallback = function(aResult) {
      if (aResult && aResult.length > 0) {
        Logger.trace("InvoiceDAO.purging " + aResult.length + " invoices");
        for (var i = 0; i < aResult.length; i++) {
          InvoiceDAO.deleteInvoice(aResult[i].courierNumber, function() {});
        }
      }
    };

    var result = StorageService.getElementsInRange(Invoice.SCHEMA.NAME, "creationDate", null, deleteTime.getTime().toString());
    result.then(localCallback);
    result.catch(function(error) {
      Logger.error("InvoiceDAO.Error purging invoices: " + error);
    });

  }
};

/**
 * Constructor.
 */
(function() { this._init(); }).apply(InvoiceDAO);
