/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

var ObjectHelper = {
  /**
   * Gets the typed value.
   * @param aType the type of the value.
   * @param aValue the value.
   * @return the typed value.
   */
  getTypedValue : function(aType, aValue) {
    Logger.trace("ObjectHelper.getTypedValue");

    var value;

    if (undefined == aValue || null == aValue) {
      value = null;
    } else {
      switch (aType) {
        case "number":
          if (isNaN(aValue)) {
            value = null;
          } else {
            value = Number(aValue);
          }
          break;
        case "boolean":
          switch (typeof(aValue)) {
            case "boolean":
              value = Boolean(aValue);
              break;
            case "string":
              if ("true" == aValue) {
                value = true;
              } else if ("false" == aValue) {
                value = false;
              } else {
                value = false;
              }
              break;
            default:
              value = false;
              break;
          }
          break;
        case "string":
          value = String(aValue);
          break;
        case "object":
          value = aValue;
          break;
        default:
          value = aValue;
          break;
      }
    }

    return value;
  },

  /**
   * Creates a copy of the param object.
   * @param aObject the object to be copied.
   * @return the object copy.
   */
  copyObject : function(aObject, aSchema) {
    Logger.trace("ObjectHelper.copyObject");

    var object = this._getObjectFromName(aSchema.NAME);

    for (var name in aSchema.PROPERTIES) {
      object.set(name, aObject.get(name));
    }

    return object;
  },

  /**
   * Updates one DTO to another.
   * @param aCurObject the current DTO.
   * @param aNewObject the new DTO.
   * @param aScheme the DTO scheme.
   * @return the modified fields, if any.
   */
  updateTo : function(aCurObject, aNewObject, aSchema) {
    Logger.trace("ObjectHelper.updateTo");

    var modifiedFields = [];
    var curValue = null;
    var newValue = null;

    for (var name in aSchema.PROPERTIES) {
      curValue = aCurObject.get(name);
      newValue = aNewObject.get(name);

      if (newValue != undefined && newValue != null &&
          curValue != newValue) {
        aCurObject.set(name, newValue);
        //XXX: use this instead of push, since there seems to be a bug with it
        // inside $.each statements.
        modifiedFields[modifiedFields.length] = name;
      }
    }

    return modifiedFields.length > 0 ? modifiedFields : null;
  },

  /**
   * Updates one DTO object with a JSON object.
   * @param aObject the DTO.
   * @param aJSON the JSON.
   * @param aScheme the DTO scheme.
   */
  updateWithJSON : function(aObject, aJSON, aSchema) {
    Logger.trace("ObjectHelper.updateWithJSON");

    $.each(aSchema.PROPERTIES, function(aName) {
      aObject.set(aName, aJSON[aName]);
    });
  },

  /**
   * Populates an object from a database row.
   * @param aSchema the object schema.
   * @param aRow the database row.
   * @return the populated object.
   */
  fromRow : function(aSchema, aRow) {
    Logger.trace("ObjectHelper.fromRow");

    var object = this._getObjectFromName(aSchema.NAME);

    $.each(aSchema.PROPERTIES, function(aName, aValue) {
      object.set(aName, aRow[aName]);
    });

    return object;
  },

  /**
   * Gets an object from the name.
   * @param aName the name of the object.
   * @return the object.
   */
  _getObjectFromName : function(aName) {
    Logger.trace("ObjectHelper._getObjectFromName");

    var object;

    switch (aName.toLowerCase()) {
      case "supportedsite":
        object = new SupportedSite();
        break;
      case "invoice":
        object = new Invoice();
        break;
      case "prealert":
        object = new PreAlert();
        break;
      default:
        Logger.error("ObjectHelper._getObjectFromName: Object name not found: " + aName);
        break;
    }

    return object;
  }
};
