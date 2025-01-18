/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * SQL Query Helper.
 */
var QueryHelper = {
  /* Query types. */
  get TYPE_INSERT() { return 1; },
  get TYPE_UPDATE() { return 2; },
  get TYPE_DELETE() { return 3; },
  get TYPE_SELECT() { return 4; },
  get TYPE_SELECT_ALL() { return 5; },
  get TYPE_CREATE_TABLE() { return 6; },
  get TYPE_COUNT_TABLE() { return 7; },
  get TYPE_CLEAR_TABLE() { return 8; },

  /**
   * Builds a SQL query based on parameters.
   * @param aQueryType the query type.
   * @param aTableSchema the table schema.
   */
  buildQuery : function(aQueryType, aTableSchema) {
    Logger.trace("QueryHelper.buildQuery");

    var query;

    switch (aQueryType) {
      case this.TYPE_INSERT:
      case this.TYPE_UPDATE:
        query = "INSERT OR REPLACE INTO '" + aTableSchema.TABLE_NAME + "'(";
        query += this._getColumns(aTableSchema);
        query += ") VALUES (";
        query += this._getColumnsPlaceholders(aTableSchema);
        query += ");";
        break;
      case this.TYPE_DELETE:
        query = "DELETE FROM '" + aTableSchema.TABLE_NAME + "' WHERE ";
        query += this._getPrimaryKeysWithPlaceholders(aTableSchema);
        query += ";";
        break;
      case this.TYPE_SELECT:
        query = "SELECT ";
        query += this._getColumns(aTableSchema);
        query += " FROM '" + aTableSchema.TABLE_NAME + "' WHERE ";
        query += this._getPrimaryKeysWithPlaceholders(aTableSchema);
        query += ";";
        break;
      case this.TYPE_SELECT_ALL:
        query = "SELECT ";
        query += this._getColumns(aTableSchema);
        query += " FROM '" + aTableSchema.TABLE_NAME + "';";
        break;
      case this.TYPE_CREATE_TABLE:
        query = "CREATE TABLE IF NOT EXISTS '" + aTableSchema.TABLE_NAME + "'(";
        query += this._getColumns(aTableSchema);
        query += ", PRIMARY KEY (";
        query += this._getPrimaryKeys(aTableSchema);
        query += "));";
        break;
      case this.TYPE_COUNT_TABLE:
        query = "SELECT COUNT(*) FROM '" + aTableSchema.TABLE_NAME + "';";
        break;
      case this.TYPE_CLEAR_TABLE:
        query = "DELETE FROM '" + aTableSchema.TABLE_NAME + "';";
        break;
    }

    return query;
  },

  /**
   * Build the array arguments of an object.
   * @param aObject the object.
   * @param aTableSchema the table schema.
   * @return the array arguments of the object.
   */
  buildArguments : function(aObject, aTableSchema) {
    Logger.trace("QueryHelper.buildArguments");

    var args = new Array();
    var column = null;

    for (var i = 0; i < aTableSchema.COLUMNS.length; i++) {
      column = aTableSchema.COLUMNS[i];

      if (aObject.get(column) != undefined) {
        args.push(aObject.get(column));
      } else {
        args.push(null);
      }
    }

    return args;
  },

  /**
   * Gets the columns string comma separated.
   * @param aTableSchema the table schema.
   * @return the columns string comma separated.
   */
  _getColumns : function(aTableSchema) {
    Logger.trace("QueryHelper._getColumns");

    var columns = "";

    $.each(aTableSchema.COLUMNS, function(aIndex, aColumn) {
      columns += aColumn;
      if (aIndex != aTableSchema.COLUMNS.length - 1) {
        columns += ", ";
      }
    });

    return columns;
  },

  /**
   * Gets the columns placeholders string comma separated.
   * @param aTableSchema the table schema.
   * @return the columns placeholders string comma separated.
   */
  _getColumnsPlaceholders : function(aTableSchema) {
    Logger.trace("QueryHelper._getColumnsPlaceholders");

    var columns = "";

    $.each(aTableSchema.COLUMNS, function(aIndex, aColumn) {
      columns += "?" + (aIndex + 1);
      if (aIndex != aTableSchema.COLUMNS.length - 1) {
        columns += ",";
      }
    });

    return columns;
  },

  /**
   * Gets the columns with placeholders string.
   * @param aTableSchema the table schema.
   * @return the columns with placeholders string.
   */
  _getColumnsWithPlaceholders : function(aTableSchema) {
    Logger.trace("QueryHelper._getColumnsWithPlaceholders");

    var columns = "";
    var primaryKeysCount = aTableSchema.PRIMARY_KEYS.length;

    $.each(aTableSchema.COLUMNS, function(aIndex, aColumn) {
      columns += aColumn + "= ?" + (aIndex + primaryKeysCount);
      if (aIndex != aTableSchema.COLUMNS.length - 1) {
        columns += ", ";
      }
    });

    return columns;
  },

  /**
   * Gets the primary keys string comma separated.
   * @param aTableSchema the table schema.
   * @return the primary keys string comma separated..
   */
  _getPrimaryKeys : function(aTableSchema) {
    Logger.trace("QueryHelper._getPrimaryKeys");

    var primaryKeys = "";

    $.each(aTableSchema.PRIMARY_KEYS, function(aIndex, aPrimaryKey) {
      primaryKeys += aPrimaryKey;
      if (aIndex != aTableSchema.PRIMARY_KEYS.length - 1) {
        primaryKeys += ", ";
      }
    });

    return primaryKeys;
  },

  /**
   * Gets the primary keys with placeholders string.
   * @param aTableSchema the table schema.
   * @return the primary keys with placeholders string.
   */
  _getPrimaryKeysWithPlaceholders : function(aTableSchema) {
    Logger.trace("QueryHelper._getPrimaryKeysWithPlaceholders");

    var primaryKeys = "";

    $.each(aTableSchema.PRIMARY_KEYS, function(aIndex, aPrimaryKey) {
      primaryKeys += aPrimaryKey + " = ?" + (aIndex + 1);
      if (aIndex != aTableSchema.PRIMARY_KEYS.length - 1) {
        primaryKeys += " AND ";
      }
    });

    return primaryKeys;
  }
};
