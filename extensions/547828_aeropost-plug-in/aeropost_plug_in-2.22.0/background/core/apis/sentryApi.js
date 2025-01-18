/**
 * Copyright (C) 2015 Aeropost. All Rights Reserved.
 */

var SentryApi = {


  /**
   * Init
   */
  init : function() {
    Raven.config(ConfigSettings.SENTRY_ENDPOINT).install()
  },

  /**
   * Sends an error report to Sentry
   * @param aError the error to be sent
   */
  reportError : function(aError) {
    Logger.trace("SentryApi.reportError");

    var timestamp = new Date();
    aError.extra.timestamp = timestamp.toISOString();
    aError.logger = "myaero-plugin-logger";
    aError.extra.event_id = UtilityHelper._generateUUID(true);
    aError.extra.release = UtilityHelper.extensionVersion;

    Raven.captureMessage(aError.message, aError);

  }
};

SentryApi.init();
