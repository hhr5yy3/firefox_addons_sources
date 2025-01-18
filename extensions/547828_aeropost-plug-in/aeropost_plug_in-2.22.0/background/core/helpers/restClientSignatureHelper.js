/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Rest API Client signature helper.
 */
var RestClientSignatureHelper = {

  /**
   * Sets the authorization header in the request before sending it
   * @param request the request to which the authorization header will be added
   * @param settings the request object settings
   */
  setAuthorizationHeader : function(request, settings) {

    var contentBase64String = "";
    var requestHttpMethod = settings.type;
    var requestUri = settings.url;

    var a = $('<a>', { href:requestUri } )[0];

    requestUri = requestUri.substring(requestUri.indexOf(a.pathname)).toLowerCase();

    try {
      requestUri = encodeURIComponent(requestUri).toLowerCase();
    } catch (e) {
      // silent exception
    }

    var requestTimestamp = new String(new Date().getTime()/1000|0);
    var nonce = this._generateUUID();

    // process request body if POST
    if (requestHttpMethod == "POST") {
      var dataMD5 = CryptoJS.MD5(settings.data);
      contentBase64String = CryptoJS.enc.Base64.stringify(dataMD5);
    }

    //Creating the raw signature string
    var signatureRawData = "{1}{2}{3}{4}{5}{6}";
    signatureRawData = signatureRawData.replace("{1}", ConfigSettings.appId);
    signatureRawData = signatureRawData.replace("{2}", requestHttpMethod);
    signatureRawData = signatureRawData.replace("{3}", requestUri);
    signatureRawData = signatureRawData.replace("{4}", requestTimestamp);
    signatureRawData = signatureRawData.replace("{5}", nonce);
    signatureRawData = signatureRawData.replace("{6}", contentBase64String);

    // get SHA256 instance and hash the signature

    var secretKey = CryptoJS.enc.Base64.parse(ConfigSettings.apiKey);

    var hash = CryptoJS.HmacSHA256(CryptoJS.enc.Utf8.parse(signatureRawData), secretKey);
    var requestSignatureBase64String = CryptoJS.enc.Base64.stringify(hash);

    var authorizationHeaderValue = "amx {1}:{2}:{3}:{4}";

    authorizationHeaderValue = authorizationHeaderValue.replace("{1}", ConfigSettings.appId);
    authorizationHeaderValue = authorizationHeaderValue.replace("{2}", requestSignatureBase64String);
    authorizationHeaderValue = authorizationHeaderValue.replace("{3}", nonce);
    authorizationHeaderValue = authorizationHeaderValue.replace("{4}", requestTimestamp);

    request.setRequestHeader("Authorization", authorizationHeaderValue);

  },

  /**
   * Generates a UUID.
   * @param withoutDashes true if we don't want dashes in the generated uuid
   * @return an UUID.
   */
  _generateUUID : function(withoutDashes) {
    Logger.trace("UtilityHelper._generateUUID");

    var baseString = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    if (withoutDashes) {
      baseString = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    }

    var uuid = baseString.replace(/[x]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });

    return uuid;
  }
};
