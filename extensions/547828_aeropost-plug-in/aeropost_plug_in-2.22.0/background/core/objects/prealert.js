/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * PreAlert Data Transfer Object.
 */
function PreAlert(aPreAlertId) {
  this._init(aPreAlertId);
}

/* DTO Schema. */
PreAlert.SCHEMA = {
  NAME: "PreAlert",
  PROPERTIES: {
    "preAlertId":            { type: "number"},
    "accountId":             { type: "string"},
    "courierNumber":         { type: "string"},
    "courierName":           { type: "string"},
    "courierURL":            { type: "string"},
    "value":                 { type: "string"},
    "description":           { type: "string"},
    "shipperName":           { type: "string"},
    "creationDate":          { type: "number"}
  }
};

/* DTO Prototype. */
PreAlert.prototype = {
  /**
   * Used to determine the type of the object
   */
  name : PreAlert.SCHEMA.NAME,

  /**
   * Initializes the object.
   * @param aAccountId the account id.
   * @param aCourierNumber the courier number
   */
  _init : function(aPreAlertId) {
    this.set("preAlertId", aPreAlertId);
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
    var type = PreAlert.SCHEMA.PROPERTIES[aProperty].type;

    aValue = ObjectHelper.getTypedValue(type, aValue);
    this[aProperty] = aValue;
  },

  /**
   * Updates the current account to the new account passed.
   * @return the modified fields, if any.
   */
  updateTo : function(aNewObject) {
    return ObjectHelper.updateTo(this, aNewObject, PreAlert.SCHEMA);
  },

  /**
   * Updates the current item with a JSON passed.
   */
  updateWithJSON : function(aJSON) {
    ObjectHelper.updateWithJSON(this, aJSON, PreAlert.SCHEMA);
  },

  /**
   * Creates a copy of the current account
   * @return the copy of the account
   */
  copy : function() {
    return ObjectHelper.copyObject(this, PreAlert.SCHEMA);
  }
};
