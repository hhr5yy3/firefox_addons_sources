/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Package Data Transfer Object.
 */
function Package(aAeroTrack) {
  this._init(aAeroTrack);
}

/* DTO Schema. */
Package.SCHEMA = {
  NAME: "Package",
  PROPERTIES: {
    "aeroTrack":          { type: "string"},
    "aeroTrackUrl":       { type: "string"},
    "courierNumberUrl":   { type: "string"},
    "description":        { type: "string"},
    "status":             { type: "string"},
    "statusCode":         { type: "string"},
    "courierName":        { type: "string"},
    "courierNumber":      { type: "string"},
    "shipper":            { type: "string"},
    "consignee":          { type: "string"},
    "declaredValue":      { type: "string"},
    "ammountUSD":         { type: "string"},
    "ammountLocal":       { type: "string"},
    "creationDate":       { type: "string"},
    "lastUpdate":         { type: "string"},
    "weight":             { type: "string"}
  }
};

/* DTO Prototype. */
Package.prototype = {
  /**
   * Used to determine the type of the object
   */
  name : Package.SCHEMA.NAME,

  /**
   * Initializes the object.
   * @param aAeroTrack the aeroTrack value
   */
  _init : function(aAeroTrack) {
    this.set("aeroTrack", aAeroTrack);
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
    var type = Package.SCHEMA.PROPERTIES[aProperty].type;

    aValue = ObjectHelper.getTypedValue(type, aValue);
    this[aProperty] = aValue;
  },

  /**
   * Updates the current account to the new account passed.
   * @return the modified fields, if any.
   */
  updateTo : function(aNewObject) {
    return ObjectHelper.updateTo(this, aNewObject, Package.SCHEMA);
  },

  /**
   * Updates the current item with a JSON passed.
   */
  updateWithJSON : function(aJSON) {
    ObjectHelper.updateWithJSON(this, aJSON, Package.SCHEMA);
  },

  /**
   * Creates a copy of the current account
   * @return the copy of the account
   */
  copy : function() {
    return ObjectHelper.copyObject(this, Package.SCHEMA);
  },

  /**
   * Returns the package status icon, based on its current status
   * @returns the status icon
   */
  getStatusCodeIcon : function() {
    var code = ConfigSettings.packageStatusArray[parseInt(this.get("statusCode"))];
    switch (code) {
      case 0:
      return "barcode";
      case 1:
      return "customs";
      case 2:
      return "packcheck";
      case 3:
      return "alert";
      case 4:
      return "airplane";
      case 5:
      return "truck";
      case 6:
      return "delivered";
      case 7:
      return "returned";
      default:
      return "alert";
    }
  }

};
