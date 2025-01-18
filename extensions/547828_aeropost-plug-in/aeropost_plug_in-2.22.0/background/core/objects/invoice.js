/**
 * Copyright (C) 2015 Aeropost. All Rights Reserved.
 */

/**
 * Invoice Data Transfer Object.
 */
function Invoice() {
}

/* DTO Schema. */
Invoice.SCHEMA = {
  NAME: "invoice",
  PROPERTIES: {
    "courierNumber":      { type: "string"},
    "invoiceHtml":        { type: "string"},
    "creationDate" :      { type: "string"},
  }
};

/* DTO Prototype. */
Invoice.prototype = {
  /**
   * Used to determine the type of the object
   */
  name : Invoice.SCHEMA.NAME,

  /**
   * Initializes the object.
   * @param aCourierNumber the courier number related to the invoice
   */
  _init : function(aCourierNumber) {
    this.set("courierNumber", aCourierNumber);
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
    var type = Invoice.SCHEMA.PROPERTIES[aProperty].type;

    aValue = ObjectHelper.getTypedValue(type, aValue);
    this[aProperty] = aValue;
  },

  /**
   * Updates the current account to the new account passed.
   * @return the modified fields, if any.
   */
  updateTo : function(aNewObject) {
    return ObjectHelper.updateTo(this, aNewObject, Invoice.SCHEMA);
  },

  /**
   * Updates the current item with a JSON passed.
   */
  updateWithJSON : function(aJSON) {
    ObjectHelper.updateWithJSON(this, aJSON, Invoice.SCHEMA);
  },

  /**
   * Creates a copy of the current account
   * @return the copy of the account
   */
  copy : function() {
    return ObjectHelper.copyObject(this, Invoice.SCHEMA);
  }
};
