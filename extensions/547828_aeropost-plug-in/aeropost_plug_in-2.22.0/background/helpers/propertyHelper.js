/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Properties Helper.
 * Wrapper to store name/value pairs, based on HTML5 local storage.
 */
var PropertyHelper = {
  PROP_FIRST_RUN :                           'aero.first.run',
  PROP_COLORBOX_FIRST_RUN_PREFIX :           'aero.colorbox.first.run.',
  PROP_COLORBOX_FIRST_RUN_AMAZON :           'aero.colorbox.first.run.amazon',
  PROP_COLORBOX_FIRST_RUN_AMAZON_DETAILS :   'aero.colorbox.first.run.amazonDetails',
  PROP_COLORBOX_FIRST_RUN_EBAY :             'aero.colorbox.first.run.ebay',
  PROP_COLORBOX_FIRST_RUN_EBAY_DETAILS :     'aero.colorbox.first.run.ebayDetails',
  PROP_COLORBOX_FIRST_RUN_RAKUTEN :          'aero.colorbox.first.run.rakuten',
  PROP_COLORBOX_FIRST_RUN_AEROPOSTALE :      'aero.colorbox.first.run.aeropostale',
  PROP_COLORBOX_FIRST_RUN_AEROPOSTALE_DETAILS : 'aero.colorbox.first.run.aeropostaleDetails',
  PROP_COLORBOX_FIRST_RUN_FOREVER21 :        'aero.colorbox.first.run.forever21',
  PROP_COLORBOX_FIRST_RUN_FOREVER21_DETAILS : 'aero.colorbox.first.run.forever21Details',
  PROP_CLIENT_ID :                           'aero.client.id',
  PROP_SCHEMA_VERSION :                      'aero.schema.version',
  PROP_CLIENT_ALLOWED :                      'aero.client.allowed',
  PROP_TRACKED_INSTALL :                     'aero.tracked.install',
  PROP_FIRST_PREALERT :                      'aero.first.prealert',
  PROP_EXTENSION_VERSION :                   'aero.extension.version',
  PROP_CHECK_RECIPIENT :                     'aero.check.recipient',
  PROP_SIGNIN_REMEMBER :                     'aero.signin.remember',
  PROP_RESTRICT_JPG_INVOICE_UPLOAD :         'aero.restrict.jpg.invoice.upload',
  PROP_JPG_INVOICE_RESTRICTION_COUNTRIES :   'aero.jpg.invoice.restriction.countries',


  /* Default properties and values. */
  DEFAULT_PROPERTIES : {
    PROP_FIRST_RUN :                            true,
    PROP_COLORBOX_FIRST_RUN_AMAZON :            true,
    PROP_COLORBOX_FIRST_RUN_AMAZON_DETAILS :    true,
    PROP_COLORBOX_FIRST_RUN_EBAY :              true,
    PROP_COLORBOX_FIRST_RUN_EBAY_DETAILS :      true,
    PROP_COLORBOX_FIRST_RUN_RAKUTEN :           true,
    PROP_COLORBOX_FIRST_RUN_AEROPOSTALE :       true,
    PROP_COLORBOX_FIRST_RUN_AEROPOSTALE_DETAILS : true,
    PROP_COLORBOX_FIRST_RUN_FOREVER21 :         true,
    PROP_COLORBOX_FIRST_RUN_FOREVER21_DETAILS : true,

    PROP_SCHEMA_VERSION :                       0,
    PROP_CLIENT_ALLOWED :                       true,
    PROP_TRACKED_INSTALL :                      false,
    PROP_FIRST_PREALERT :                       true,
    PROP_CHECK_RECIPIENT :                      true,
    PROP_SIGNIN_REMEMBER :                      false,
    PROP_RESTRICT_JPG_INVOICE_UPLOAD :          true,
    PROP_JPG_INVOICE_RESTRICTION_COUNTRIES :    "EIS",
  },

  /**
   * Initializes the resource.
   */
  _init : function() {
    Logger.trace("PropertyHelper._init");

    var that = this;

    // sets the default properties if the values don't exist.
    $.each(that.DEFAULT_PROPERTIES, function(aName, aValue) {
      if (that.get(PropertyHelper[aName]) == null) {
        that.set(PropertyHelper[aName], aValue);
      } else if (PropertyHelper[aName] == that.PROP_JPG_INVOICE_RESTRICTION_COUNTRIES) {
        // force invoice restriction preference value
        that.set(PropertyHelper[aName], aValue);
      }
    });

    if (that.get(that.PROP_FIRST_RUN)) {
      // calls to get the client id, which sets it if not set
      UtilityHelper.getClientId();
      that.set(that.PROP_FIRST_RUN, false);
    }

    if (!that.get(that.PROP_TRACKED_INSTALL)) {
      AnalyticsApi.push(["install", UtilityHelper.clientType + "-" + UtilityHelper.extensionVersion]);
      that.set(that.PROP_TRACKED_INSTALL, true);
    }
  },

  /**
   * Sets a property.
   * @param aKey the property key.
   * @param aValue the property value.
   */
  set : function(aKey, aValue) {
    Logger.trace("PropertyHelper.set");

    localStorage.setItem(aKey, aValue);
    ObserverHelper.notify(Topics.PROPERTY_CHANGED, {name: aKey, value: PropertyHelper.get(aKey)})
  },

  /**
   * Gets a property.
   * @param aKey the property key.
   * @return the property value.
   */
  get : function(aKey) {
    Logger.trace("PropertyHelper.get");

    var propValue = localStorage.getItem(aKey);
    // XXX : if the value is a boolean, it still returns a string so a
    // conversion is needed.
    if (propValue == "true") {
      propValue = true;
    } else if (propValue == "false") {
      propValue = false;
    }

    return propValue;
  },

  /**
   * Removes a property.
   * @param aKey the property key.
   */
  remove : function(aKey) {
    Logger.trace("PropertyHelper.remove");

    localStorage.removeItem(aKey);
  },

  /**
   * Clears all the stored properties.
   */
  clear : function() {
    Logger.trace("PropertyHelper.clear");

    localStorage.clear();
  }
};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(PropertyHelper);
