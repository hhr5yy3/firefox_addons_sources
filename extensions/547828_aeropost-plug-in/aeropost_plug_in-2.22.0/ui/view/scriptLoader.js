/**
 * Copyright (C) 2014 AeroPost. All Rights Reserved.
 */

/**
 * Script Loader Class.
 */
var ScriptLoader = {

  /**
   * Initializes the object.
   */
  init : function() {
    Logger.trace("ScriptLoader.init");

    this._loadScript("/lib/jquery.i18n.js");
    this._loadScript("/background/core/helpers/backgroundHelper.js");
    this._loadScript("/background/core/helpers/md5-min.js");
    this._loadScript("/background/core/helpers/timer.js");
    this._loadScript("/background/helpers/topics.js");
    this._loadScript("/background/helpers/utilityHelper.js");
    this._loadScript("/background/helpers/configSettings.js");
    this._loadScript("popupStateHandler.js");


    var that = this;
    // XXX: minor delay to prevent the popup to be displayed empty in some
    // scenarios (low memory available, high cpu usage)
    window.setTimeout(function() {
      that._loadScript("mainPanel.js");
      }, 200);
  },

  /**
   * Unitializes the object.
   */
  uninit : function() {
    Logger.trace("ScriptLoader.uninit");

  },

  _loadScript : function(aUrl) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= aUrl;
    head.appendChild(script);
  }
};

$(document).ready(function() { ScriptLoader.init(); });
$(window).on("unload", function(e) { ScriptLoader.uninit(); });
