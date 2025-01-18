/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Account Data Transfer Object.
 */
function Account(aGateway, aAccountNumber) {
  this._init(aGateway, aAccountNumber);
}

/* DTO Schema. */
Account.SCHEMA = {
  NAME: "Account",
  PROPERTIES: {
    "gateway":            { type: "string"},
    "accountNumber":      { type: "number"},
    "md5pass":            { type: "string"},
    "token":              { type: "string"},
    "accountStatus":      { type: "string"},
    "accountStatusCode":  { type: "number"},
    "countryCultureInfo": { type: "string"},
    "csymbol":            { type: "string"},
    "currencyISO":        { type: "string"},
    "isValid":            { type: "boolean"},
    "language":           { type: "string"},
    "personId":           { type: "number"},
    "clientFullName":     { type: "string"},
    "clientEmail":        { type: "string"},
    "packagesAddressLine1":        { type: "string"},
    "packagesAddressLine2":        { type: "string"},
    "packagesCity":       { type: "string"},
    "packagesState":      { type: "string"},
    "packagesZipCode":    { type: "string"},
    "packagesPhone":      { type: "string"},
    "mailLine1":          { type: "string"},
    "mailLine2":          { type: "string"},
    "mailLine3":          { type: "string"},
    "delivery":           { type: "string"},
    "tokenMyAero":        { type: "string"},
    "sessionId":          { type: "string"},
    "priceSmartMembershipId": { type: "number"},
    "owner":              { type: "boolean"},
    "userBoxAddressCity": { type: "string"},
    "userBoxAddressLine1": { type: "string"},
    "userBoxAddressLine2": { type: "string"},
    "userBoxAddressPhone": { type: "string"},
    "userBoxAddressState": { type: "string"},
    "userBoxAddressZipCode": { type: "string"},
    "userBoxAddressGateway": { type: "string"},
    "preferedLanguage": { type: "number"},
  
  }
};

/* DTO Prototype. */
Account.prototype = {
  /**
   * Used to determine the type of the object
   */
  name : Account.SCHEMA.NAME,

  /**
   * Initializes the object.
   * @param aGateway the account gateway.
   * @param aAccountNumber the account number.
   */
  _init : function(aGateway, aAccountNumber) {
    this.set("gateway", aGateway);
    this.set("accountNumber", aAccountNumber);
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
    var type = Account.SCHEMA.PROPERTIES[aProperty].type;

    aValue = ObjectHelper.getTypedValue(type, aValue);
    this[aProperty] = aValue;
  },

  /**
   * Updates the current account to the new account passed.
   * @return the modified fields, if any.
   */
  updateTo : function(aNewObject) {
    return ObjectHelper.updateTo(this, aNewObject, Account.SCHEMA);
  },

  /**
   * Updates the current item with a JSON passed.
   */
  updateWithJSON : function(aJSON) {
    ObjectHelper.updateWithJSON(this, aJSON, Account.SCHEMA);
  },

  /**
   * Creates a copy of the current account
   * @return the copy of the account
   */
  copy : function() {
    return ObjectHelper.copyObject(this, Account.SCHEMA);
  }
};
