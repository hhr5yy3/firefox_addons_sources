/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

var AnalyticsApi = {
  _IS_ENABLED : true,

  init: function() {
    if (this._IS_ENABLED) {
      // XXX: required to test like we were using it in localhost. Otherwise,
      // requests are not sent to google servers
      _gaTracker('create', 'UA-57056743-1', {
        'cookieDomain': 'none'
      });
      _gaTracker('set', 'checkProtocolTask', function(){});
      _gaTracker('require', 'displayfeatures');
    }
  },

  push: function(aArray) {
    if (this._IS_ENABLED) {
      _gaTracker('send', {
        'hitType': 'event',          // Required.
        'eventCategory': aArray[0],   // Required.
        'eventAction': aArray[1],      // Required.
        'eventLabel': aArray[2],      // Required.
        'eventValue': aArray[3],      // Required.
        'hitCallback': function() {
        }
      });
    }
  }
};

var googleAnalyticsLib = 'lib/analytics.js';
if("Safari" == UtilityHelper.clientType) {
  //Important: The base URI ends in a forward slash. Do not begin the path with another.
  googleAnalyticsLib = safari.extension.baseURI + googleAnalyticsLib;
} else {
  googleAnalyticsLib = '/' + googleAnalyticsLib;
}


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script',googleAnalyticsLib,'_gaTracker');

AnalyticsApi.init();
