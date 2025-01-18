/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

var MarketplaceApi = {

  /**
   * Performs request to the marketplace api
   * @param aTarget the request target
   * @param aMethod GET or POST
   * @param aParamsArray the request parameters
   * @param aBody the request body (for POST requests)
   * @param aCallback the callback to be called on return
   */
  sendRequest : function(aTarget, aMethod, aParamsArray, aBody, aCallback) {
    var targetUrl = UtilityHelper.buildRequestUrl(aTarget, aParamsArray);
    this._sendRequest(targetUrl, aMethod, aBody, aCallback);
  },

  /**
   * Sends a request to the marketplace API
   * @param aUrl the target url
   * @param aMethod the method to be used
   * @param aBody the body to be sent
   * @param aCallback the callback to be called on return
   */
  _sendRequest : function(aUrl, aMethod, aBody, aCallback) {
    Logger.trace("MarketplaceApi._sendRequest" + aUrl);

    var url = ConfigSettings.MARKETPLACE_API_BASE_URL + aUrl;
    var dataJson = null;
    if(null != aBody){
      dataJson = JSON.stringify(aBody);  
    }

    var request =
      $.ajax({
        type: aMethod,
        beforeSend: function (request, settings)
        {
          if (ConfigSettings.authorizationEnabled) {
            RestClientSignatureHelper.setAuthorizationHeader(request, settings);
          }
        },
        contentType: "application/json",
        url: url,
        data:dataJson,
        dataType: "json",
        jsonp: false,
        timeout: 60 * 1000,
        }).done(function(aData) {
          if (aCallback) {
            aCallback(aData);
          }
        }).fail(function(aXHR, aTextStatus, aError) {
          Logger.error("SentryAPI Error: Unable to contact the server.") ;
          //console.log(aError);
          if (aCallback) {
            aCallback(null);
          }
        });

  }

};
