/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * AeroCommon class.
 */
var AeroCommon = {
  _stringBundle : null,

  /**
   * Initialize this object.
   */
  _init : function() {
    this._stringBundle =
      $.i18n;
  },

  /**
   * Getter for string bundle
   */
  get stringBundle() {
    return this._stringBundle;
  },

};

/**
 * Constructor.
 */
(function() { this._init(); }).apply(AeroCommon);
