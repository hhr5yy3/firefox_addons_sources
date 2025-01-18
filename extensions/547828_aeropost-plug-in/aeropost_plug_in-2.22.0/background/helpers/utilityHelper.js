/**
 * Copyright (C) 2014 Aerocasillas. All Rights Reserved.
 */

/**
 * Utility Helper.
 * Handles all utility calls.
 */
var UtilityHelper = {
  /* the client id */
  _clientId : null,

  /**
   * Gets the client type
   */
  get clientType() {
    return "Firefox";
  },

  /**
   * Gets the extension version.
   * @returns a string with the extension version.
   */
  get extensionVersion() {
    var details = chrome.runtime.getManifest();
    return details.version;
  },

  /**
   * Gets the app name
   */
  get appName() {
    var details = chrome.runtime.getManifest();
    return details.name;
  },

  /**
   * Gets the OS name
   */
  get OSName() {
    return $.client.os;
  },

  /**
   * Gets the OS version
   */
  get OSVersion() {
    return $.client.osversion;
  },

  /**
   * Gets the browser name
   */
  get browserName() {
    return $.client.browser;
  },

  /**
   * Gets the browser version
   */
  get browserVersion() {
    return $.client.version;
  },

  /**
   * Generates a UUID.
   * @param withoutDashes true if we don't want dashes in the generated uuid
   * @return an UUID.
   */
  _generateUUID : function(withoutDashes) {
    Logger.trace("UtilityHelper._generateUUID");

    var baseString = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    if (withoutDashes) {
      baseString = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    }

    var uuid = baseString.replace(/[x]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });

    return uuid;
  },

  /**
   * Returns the "unique" instance identifier (if stored) or generates and
   * stores one
   */
  getClientId : function() {
    Logger.trace("UtilityHelper.getInstanceIdentifier");

    if (!this._clientId) {
      // Retrieve the identifier from storage, if it is there
      var storedIdentifier =
        PropertyHelper.get(PropertyHelper.PROP_CLIENT_ID);
      if (null == storedIdentifier) {
        // no instance identifier? generate and store one
        this._clientId = this._generateUUID();
        PropertyHelper.set(PropertyHelper.PROP_CLIENT_ID,
                        this._clientId);
      } else {
        this._clientId = storedIdentifier;
      }
    }
    return this._clientId;
  },

  /**
   * Generates a request url using the specified baseUrl and params
   * @param baseUrl the base url
   * @param params the params object
   */
  buildRequestUrl : function(baseUrl, params) {
    var generatedUrl = baseUrl;
    if (params) {
    var generatedUrl = baseUrl + "?";
      for (var key in params) {
        generatedUrl += key + "=" + params[key] + "&";
      }

      // remove trailing &
      if (generatedUrl.endsWith("&")) {
        generatedUrl = generatedUrl.substring(0, generatedUrl.length - 1);
      }
    }

    return generatedUrl;
  }
};
