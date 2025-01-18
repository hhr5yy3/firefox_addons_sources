/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Init class.
 */
var Init = {

  /**
   * Initialize this object.
   */
  _init : function() {
    var initCallback = function() {
      Background._init();
      PropertyHelper._init();
      InvoiceService._init();
      SupportedSiteService._init();
      UpdateService._init();
      AccountService._init();
      PreAlertService._init();
      NotificationService._init();
      StorageService._init();
    };
    new Timer(initCallback, 100);

  }

};

/**
 * Constructor.
 */
(function() { this._init(); }).apply(Init);
