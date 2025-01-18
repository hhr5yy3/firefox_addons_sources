/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

var AnalyticsApi = {
  _IS_ENABLED : true,

  init: function() {
  },

  push: function(aArray) {
    if (this._IS_ENABLED) {
      /*var clientId = UtilityHelper.getClientId();

      var requestBody = "v=1" +     // Version.
        "&tid=UA-57056743-1" +      // Tracking ID / Property ID.
        "&cid=" + clientId +        // Anonymous Client ID.
        "&t=event" +                // Event hit type
        "&ec=" + aArray[0] +        // Event Category. Required.
        "&ea=" + aArray[1];         // Event Action. Required.

      if (aArray[2]) {
        requestBody += "&el=" + aArray[2];     // Event label
        if (aArray[3]) {
          requestBody += "&ev=" + aArray[3];     // Event label
        }
      }

      var request =
        $.ajax({
          type: "POST",
          url: ConfigSettings.GOOGLE_ANALYTICS_URL,
          data: requestBody,
          jsonp: false,
          timeout: 60 * 1000
        }).done(function(aData) {
        }).fail(function(aXHR, aTextStatus, aError) {
        });*/
    }
  }

};

AnalyticsApi.init();
