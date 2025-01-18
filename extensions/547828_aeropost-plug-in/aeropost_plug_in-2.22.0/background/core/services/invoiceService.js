/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Invoice Service.
 */
var InvoiceService = {

  /**
   * Initializes the service.
   */
  _init : function() {
    Logger.trace("InvoiceService._init");

    ObserverHelper.addObserver(this, Topics.DATABASE_STARTED);
  },

  /**
   * Retrieves the invoice related to the specified courier number
   * @param aCourierNumber the courier number to search the respective invoice
   * @param aCallback the callback to be called on return
   */
  getInvoice : function(aCourierNumber, aCallback) {
    Logger.trace("InvoiceService.getInvoice");

    var localCallback = function(aInvoice) {
      aCallback(aInvoice);
    };

    InvoiceDAO.getInvoice(aCourierNumber, localCallback);
  },

  /**
   * Inserts an invoice in the local database
   * @param aInvoice the invoice to be stored
   * @param aCallback the callback to be called on return
   */
  insertInvoice : function(aInvoice, aCallback) {
    Logger.trace("InvoiceService.insertInvoice");
    InvoiceDAO.insertInvoice(aInvoice, aCallback);
  },

  /**
   * Deletes an invoice from the local database
   * @param aCourierNumber the courier number to delete the respective invoice
   * @param aCallback the callback to be called on return
   */
  deleteInvoice : function(aCourierNumber, aCallback) {
    Logger.trace("InvoiceService.deleteInvoice");
    InvoiceDAO.deleteInvoice(aCourierNumber, aCallback);
  },

  /**
   * Purges the invoices stored in the database, that are older than the ttl
   * specified in the config settings file
   */
  purgeStoredInvoices : function() {
    Logger.trace("InvoiceService.purgeStoredInvoices");
    InvoiceDAO.purgeStoredInvoices();
  },

  /**
   * Observes for changes.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {
    Logger.trace("InvoiceService.observe");

    switch (aTopic) {
      case Topics.DATABASE_STARTED:
        InvoiceService.purgeStoredInvoices();
        break;
    }
  }

};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(InvoiceService);
