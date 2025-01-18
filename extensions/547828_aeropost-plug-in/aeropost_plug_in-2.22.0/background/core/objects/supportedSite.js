/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * SupportedSite Data Transfer Object.
 */
function SupportedSite() {
}

/* DTO Schema. */
SupportedSite.SCHEMA = {
  NAME: "supportedSite",
  PROPERTIES: {
    "siteId":             { type: "string"},
    "siteDomain":         { type: "string"},
    "siteContainer":      { type: "string"},
    "siteFields":         { type: "string"}
  }
};

/* DTO Prototype. */
SupportedSite.prototype = {
  /**
   * Used to determine the type of the object
   */
  name : SupportedSite.SCHEMA.NAME,

  /**
   * Initializes the object.
   * @param aSiteId the site id.
   */
  _init : function(aSiteId) {
    this.set("siteId", aSiteId);
  },

  /**
   * Returns the value of the given property.
   * @param aProperty the property name.
   * @return the property value.
   */
  get : function(aProperty) {
    return this[aProperty];
  },

  /**
   * Sets the given property to the given value, checking that the value is of
   * the correct type for the property
   * @param aProperty the property name.
   * @param aValue the property value.
   */
  set : function(aProperty, aValue) {
    var type = SupportedSite.SCHEMA.PROPERTIES[aProperty].type;

    aValue = ObjectHelper.getTypedValue(type, aValue);
    this[aProperty] = aValue;
  },

  /**
   * Updates the current account to the new account passed.
   * @return the modified fields, if any.
   */
  updateTo : function(aNewObject) {
    return ObjectHelper.updateTo(this, aNewObject, SupportedSite.SCHEMA);
  },

  /**
   * Updates the current item with a JSON passed.
   */
  updateWithJSON : function(aJSON) {
    ObjectHelper.updateWithJSON(this, aJSON, SupportedSite.SCHEMA);
  },

  /**
   * Creates a copy of the current account
   * @return the copy of the account
   */
  copy : function() {
    return ObjectHelper.copyObject(this, SupportedSite.SCHEMA);
  }
};
