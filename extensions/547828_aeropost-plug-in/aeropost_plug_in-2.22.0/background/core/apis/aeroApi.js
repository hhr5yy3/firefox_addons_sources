/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

var AeroApi = {

  /**
   * Gets the list of supported sites
   * @param aCallback the callback to be called on return
   */
  getSupportedSites : function(aCallback) {
    Logger.trace("AeroApi.getSupportedSites");
    var that = this;
    var wrappedBody;
    var localCallback;
    var innerBody = "";
    var endpoint = "WS_MyAero";
    //var endpoint = "WS_IEWebSlice";

    // do the call
    wrappedBody = this._wrapCall("getSupportedSites", endpoint, innerBody);
    localCallback = function(aResponse) {
      var result = {};

      try {
        if (aCallback) {
          if (!aResponse) {
            result.errors = true;
          } else {
            //result = that._parseGetSupportedSitesResponse(aResponse);
          }
          var supportedSite = new SupportedSite();
          supportedSite.set("siteId", "1");
          supportedSite.set("siteDomain", "www.amazon.com");
          supportedSite.set("siteFields", "{\"fullName\":{\"attr\":\"name\",\"val\":\"enterAddressFullName\"},\"address1\":{\"attr\":\"name\",\"val\":\"enterAddressAddressLine1\"},\"address2\":{\"attr\":\"name\",\"val\":\"enterAddressAddressLine2\"},\"city\":{\"attr\":\"name\",\"val\":\"enterAddressCity\"},\"stateRegion\":{\"attr\":\"name\",\"val\":\"enterAddressStateOrRegion\"},\"zip\":{\"attr\":\"name\",\"val\":\"enterAddressPostalCode\"},\"country\":{\"attr\":\"name\",\"val\":\"enterAddressCountryCode\"},\"phone\":{\"attr\":\"name\",\"val\":\"enterAddressPhoneNumber\"}}");
          supportedSite.set("siteContainer", "/html/body/table[2]");
          var supportedSite2 = new SupportedSite();
          supportedSite2.set("siteId", "2");
          supportedSite2.set("siteDomain", "checkout.payments.ebay.com");
          supportedSite2.set("siteFields", "{\"fullName\":{\"attr\":\"name\",\"val\":\"contactName\"},\"address1\":{\"attr\":\"name\",\"val\":\"address1\"},\"address2\":{\"attr\":\"name\",\"val\":\"address2\"},\"city\":{\"attr\":\"name\",\"val\":\"city\"},\"stateRegion\":{\"attr\":\"name\",\"val\":\"state\"},\"zip\":{\"attr\":\"name\",\"val\":\"zip\"},\"country\":{\"attr\":\"name\",\"val\":\"country\"},\"phone\":{\"attr\":\"name\",\"val\":\"dayphone1\"}}");
          supportedSite2.set("siteContainer", "//*[@id=\"body\"]/div[2]/div/div/div");
          var supportedSite3 = new SupportedSite();
          supportedSite3.set("siteId", "3");
          supportedSite3.set("siteDomain", "www.forever21.com");
          supportedSite3.set("siteFields", "{\"firstName\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_first_name\"},\"lastName\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_last_name\"},\"address1\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_address_line1\"},\"address2\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_address_line2\"},\"city\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_city\"},\"stateRegion\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_region_us\"},\"zip\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_postal_code\"},\"country\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_country\"},\"phone\":{\"attr\":\"name\",\"val\":\"ctl00$MainContent$address_tel_number\"}}");
          supportedSite3.set("siteContainer", "//td[@height=\"10\"]");
          var supportedSite4 = new SupportedSite();
          supportedSite4.set("siteId", "4");
          supportedSite4.set("siteDomain", "www.aeropostale.com");
          supportedSite4.set("siteFields", "{\"firstName\":{\"attr\":\"name\",\"val\":\"shipFname\"},\"lastName\":{\"attr\":\"name\",\"val\":\"shipLname\"},\"address1\":{\"attr\":\"name\",\"val\":\"shipAddr1\"},\"address2\":{\"attr\":\"name\",\"val\":\"shipAddr2\"},\"city\":{\"attr\":\"name\",\"val\":\"shipCity\"},\"stateRegion\":{\"attr\":\"name\",\"val\":\"shipState\"},\"zip\":{\"attr\":\"name\",\"val\":\"shipZip\"},\"country\":{\"attr\":\"name\",\"val\":\"shipCountry\"},\"phone\":{\"attr\":\"name\",\"val\":\"shipPhone\"}}");
          supportedSite4.set("siteContainer", "//fieldset[@id=\"billingShipping\"]");
          result.supportedSites = [supportedSite, supportedSite2, supportedSite3, supportedSite4];
          aCallback(result);
        }
      } catch (e) {
        Logger.error("AeroApi.getSupportedSites Error: " + e.message);
      }
    };
    var response = ""
    localCallback("response");
    //this._doCall(wrappedBody, "getSupportedSites", endpoint, localCallback);
  },

  /**
   * Validates a user
   * @param aUserCreds the user credentials including device and app info
   * @param aCallback the callback to be called when the request returns
   */
  validate : function(aUserCreds, aCallback) {
    Logger.trace("AeroApi.validate");

    var that = this;
    var localCallback;
    var endpoint = "WS_MyAero";

    // do the call
    var wrappedBody = this._wrapCall("AuthenticateMyAeroUser", endpoint, aUserCreds);
    localCallback = function(aResponse) {
      var result = {};
      try {
        if (aCallback) {
          if (aResponse.apiErrors) {
            result.apiErrors = true;
            result.errorCode = aResponse.errorCode;
            result.errorDescription = aResponse.errorDescription;
          } else {
            var account = new Account(aUserCreds.MyAeroGateway, aUserCreds.MyAeroAccount);
            account.set("md5pass", aUserCreds.MyAeroPasswordMD5);
            account = that._parseValidateResponse(account, aResponse.data);
            result.account = account;
          }
          aCallback(result);
        }
      } catch (e) {
        Logger.error("AeroApi.validate Error: " + e.message);
      }
    };

    this._doCall(wrappedBody, "AuthenticateMyAeroUser", endpoint, localCallback);
  },

  /**
   * Parses the validate response
   * @param aResult the account object to be populated
   * @param aResponse the response to be parsed
   * @returns an account object with the parsed data
   */
  _parseValidateResponse : function(aAccount, aResponse) {
    Logger.trace("AeroApi._parseValidateResponse");
    var isValid = $(aResponse).find("a\\:IsValid, IsValid");
    if (!isValid) {
      aAccount.set("isValid", false);
    } else {
      aAccount.set("isValid", $(isValid).text().indexOf("true") != -1);
    }

    // if not valid, just return and don't parse the rest
    if (aAccount.get("isValid")) {
      aAccount.set("personId", $(aResponse).find("a\\:PersonID, PersonID").text());
      aAccount.set("language", $(aResponse).find("a\\:Language, Language").text());
      aAccount.set("csymbol", $(aResponse).find("a\\:CurrencySymbol, CurrencySymbol").text());
      aAccount.set("currencyISO", $(aResponse).find("a\\:CurrencyISO, CurrencyISO").text());
      aAccount.set("countryCultureInfo", $(aResponse).find("a\\:CountryCultureInfo, CountryCultureInfo").text());
      aAccount.set("accountStatus", $(aResponse).find("a\\:AccountStatus, AccountStatus").text());
      aAccount.set("accountStatusCode", $(aResponse).find("a\\:AccountStatusCode, AccountStatusCode").text());
      aAccount.set("clientFullName", $(aResponse).find("a\\:FullName, FullName").text().trim());
      aAccount.set("clientEmail", $(aResponse).find("a\\:AccountEmail, AccountEmail").text().trim());
      aAccount.set("packagesAddressLine1", $(aResponse).find("a\\:Packages_AddressLine1, Packages_AddressLine1").text().trim());
      aAccount.set("packagesAddressLine2", $(aResponse).find("a\\:Packages_AddressLine2, Packages_AddressLine2").text().trim());
      aAccount.set("packagesCity", $(aResponse).find("a\\:Packages_City, Packages_City").text().trim());
      aAccount.set("packagesState", $(aResponse).find("a\\:Packages_State, Packages_State").text().trim());
      aAccount.set("packagesZipCode", $(aResponse).find("a\\:Packages_ZipCode, Packages_ZipCode").text().trim());
      aAccount.set("packagesPhone", $(aResponse).find("a\\:Packages_Phone, Packages_Phone").text().trim());
      aAccount.set("mailLine1", $(aResponse).find("a\\:Mail_Line1, Mail_Line1").text().trim());
      aAccount.set("mailLine2", $(aResponse).find("a\\:Mail_Line2, Mail_Line2").text().trim());
      aAccount.set("mailLine3", $(aResponse).find("a\\:Mail_Line3, Mail_Line3").text().trim());
      aAccount.set("token", $(aResponse).find("a\\:Token, Token").text().trim());
      aAccount.set("delivery", $(aResponse).find("a\\:DeliveryInstructions, DeliveryInstructions").text().trim());

    }
    return aAccount;
  },

  /**
   * Generates a preAlert
   * @param aPreAlertObj the preAlert object to generate the preAlert from
   * @param aCallback.
   * @returns request object
   */
  packagePreAlert : function(aPreAlertObj, aCallback) {
    Logger.trace("AeroApi.packagePreAlert");

    var that = this;
    var wrappedBody;
    var localCallback;
    var endpoint = "WS_MyAero";

    // do the call
    wrappedBody = this._wrapCall("PackagePrealert", endpoint, aPreAlertObj);
    localCallback = function(aResponse) {
      var result = {};

      try {
        if (aCallback) {
          if (aResponse.apiErrors) {
            result.apiErrors = true;
            result.preAlertExists = aResponse.preAlertExists;
            result.errorCode = aResponse.errorCode;
            result.errorDescription = aResponse.errorDescription;
          } else if (aResponse.invalidToken) {
            result.invalidToken = true;
          } else {
            result = that._parsePackagePreAlertResponse(aResponse.data);
          }
          aCallback(result);
        }
      } catch (e) {
        Logger.error("AeroApi.packagePreAlert Error: " + e.message);
      }
    };

    this._doCall(wrappedBody, "PackagePrealert", endpoint, localCallback);
  },

  _parsePackagePreAlertResponse : function(aResponse) {
    Logger.trace("AeroApi._parsePackagePreAlertResponse");
    var result = {};
    var preAlertResult = $(aResponse).find("a\\:PackagePrealertResult, PackagePrealertResult");
    if (!preAlertResult) {
      result.preAlertErrors = true;
    } else {
      var value = $(preAlertResult).find("a\\:NoteID, NoteID");
      if (value) {
        var valueText = $(value).text();
        if (valueText == "-1") {
          result.preAlertErrors = true;
        } else {
          result.preAlertNumber = valueText;
        }
      } else {
        result.preAlertErrors = true;
      }
    }
    return result;
  },

  /**
   * Uploads an invoice to a preAlert
   * @param aAttachmentObj the object with the attachment info
   * @param aCallback the callback to be called when returned
   */
  uploadPreAlertInvoice : function(aAttachmentObj, aCallback) {
    Logger.trace("AeroApi.uploadPreAlertInvoice");

    var that = this;
    var wrappedBody;
    var localCallback;
    var endpoint = "WS_MyAero";

    // do the call
    wrappedBody = this._wrapCall("AttachFileToPackageOrPreAlert", endpoint, aAttachmentObj);
    localCallback = function(aResponse) {
      var result = {};

      try {
        if (aCallback) {
          if (aResponse.apiErrors) {
            result.apiErrors = true;
            result.errorCode = aResponse.errorCode;
            result.errorDescription = aResponse.errorDescription;
          } else if (aResponse.invalidToken) {
            result.invalidToken = true;
          } else {
            result = that._parseUploadPreAlertInvoiceResponse(aResponse.data);
          }
          aCallback(result);
        }
      } catch (e) {
        Logger.error("AeroApi.packagePreAlert Error: " + e.message);
      }
    };

    this._doCall(wrappedBody, "AttachFileToPackageOrPreAlert", endpoint, localCallback);
  },

  _parseUploadPreAlertInvoiceResponse : function(aResponse) {

    var result = {};
    var value = $(aResponse).find("a\\:ResultValue, ResultValue");
    var exception = $(aResponse).find("a\\:ErrorDescriptions, ErrorDescriptions");

    if (value.length > 0) {
      var valueString = $(value).text();
      if (valueString == "false") {
        result.attachmentErrors = true;
      } else {
        result.value = valueString;
      }
    }
    if ($(exception).text().length > 0) {
      result.attachmentErrors = true;
      result.errorText = $(exception).text();
    }

    return result;
  },

  /**
   * Retrieves the list of packages for the signed in user
   * @param aToken the signed in user token
   * @param aLanguage the language to be used in the request
   * @param aStart the starting index
   * @param aQuantity how many to retrieve (for pagination)
   * @param aCallback the callback to be called on return
   */
  getAccountPackages : function(aToken, aPageIndex, aPageSize, aCallback) {
    Logger.trace("AeroApi.getAccountPackages");

    var that = this;
    var wrappedBody;
    var localCallback;
    var params = {};
    params.Token = aToken;
    params.PageIndex = aPageIndex;
    params.PageSize = aPageSize;

    var endpoint = "WS_MyAero";

    // do the call
    wrappedBody = this._wrapCall("GetAccountPackages", endpoint, params);
    localCallback = function(aResponse) {
      var result = {};

      try {
        if (aCallback) {
          if (aResponse.apiErrors) {
            result.apiErrors = true;
            result.errorCode = aResponse.errorCode;
            result.errorDescription = aResponse.errorDescription;
          } if (aResponse.invalidToken) {
            result.invalidToken = true;
          } else {
            result = that._parseGetAccountPackages(aResponse.data);
          }
          aCallback(result);
        }
      } catch (e) {
        Logger.error("AeroApi.getAccountPackages Error: " + e.message);
      }
    };

    this._doCall(wrappedBody, "GetAccountPackages", endpoint, localCallback);
  },

  /**
   * Parses the getAccountPackages response
   * @param aResponse the response to be parsed
   */
  _parseGetAccountPackages : function(aResponse) {
    Logger.trace("AeroApi._parseGetAccountPackages");
    var result = {};
    var packagesResult = $(aResponse).find("a\\:GetAccountPackagesResult, GetAccountPackagesResult");
    if (!packagesResult) {
      result.requestErrors = true;
    } else {
      var errorText = $(packagesResult).find("a\\:Errors, Errors").text();
      if (errorText && errorText.length > 0) {
        result.errorText = errorText;
      }

      var packages = $(packagesResult).find("a\\:PackageDetail, PackageDetail");
      if (packages.length > 0) {
        result.packages = new Array();
        for (var i = 0; i < packages.length; i++) {
          var element = packages[i];
          var aeroTrack = $(element).find("a\\:Aerotrack, Aerotrack");
          if (aeroTrack.length > 0) {
            aeroTrack = aeroTrack.text();
            var pack = new Package(aeroTrack);
            pack.set("aeroTrackUrl", $(element).find("a\\:AerotrackURL, AerotrackURL").text());
            pack.set("courierNumberUrl", $(element).find("a\\:CourierNumberURL, CourierNumberURL").text());
            pack.set("description", $(element).find("a\\:Description, Description").text());
            pack.set("status", $(element).find("a\\:Status, Status").text());
            pack.set("statusCode", $(element).find("a\\:StatusCode, StatusCode").text());
            pack.set("courierName", $(element).find("a\\:CourierName, CourierName").text());
            pack.set("courierNumber", $(element).find("a\\:CourierNumber, CourierNumber").text());
            pack.set("shipper", $(element).find("a\\:Shipper, Shipper").text());
            pack.set("consignee", $(element).find("a\\:Consignee, Consignee").text());
            pack.set("ammountUSD", $(element).find("a\\:AmountUSD, AmountUSD").text());
            pack.set("ammountLocal", $(element).find("a\\:AmountLocal, AmountLocal").text());
            pack.set("creationDate", $(element).find("a\\:CreationDate, CreationDate").text());
            pack.set("lastUpdate", $(element).find("a\\:LastUpdate, LastUpdate").text());
            pack.set("weight", $(element).find("a\\:Weight, Weight").text());
            result.packages.push(pack);
          }
        }
      }
      result.accountPackagesTotal = $(packagesResult).find("a\\:AccountPackagesTotal, AccountPackagesTotal").text();
    }
    return result;
  },

  /**
   * Retrieves the list of preAlerts for the signed in user
   * @param aToken the signed in user token
   * @param aStart the starting index
   * @param aQuantity how many to retrieve (for pagination)
   * @param aCallback the callback to be called on return
   */
  getAccountPreAlerts : function(aToken, aPageIndex, aPageSize, aCallback) {
    Logger.trace("AeroApi.getAccountPreAlerts");

    var that = this;
    var wrappedBody;
    var localCallback;
    var params = {};
    params.Token = aToken;
    params.PageIndex = aPageIndex;
    params.PageSize = aPageSize;

    var endpoint = "WS_MyAero";

    // do the call
    wrappedBody = this._wrapCall("GetAccountPreAlerts", endpoint, params);
    localCallback = function(aResponse) {
      var result = {};

      try {
        if (aCallback) {
          if (aResponse.apiErrors) {
            result.apiErrors = true;
            result.errorCode = aResponse.errorCode;
            result.errorDescription = aResponse.errorDescription;
          } if (aResponse.invalidToken) {
            result.invalidToken = true;
          }  else {
            result = that._parseGetAccountPreAlerts(aResponse.data);
          }
          aCallback(result);
        }
      } catch (e) {
        Logger.error("AeroApi.getAccountPreAlerts Error: " + e.message);
      }
    };

    this._doCall(wrappedBody, "GetAccountPreAlerts", endpoint, localCallback);
  },

  /**
   * Parses the getAccountPreAlerts response
   * @param aResponse the response to be parsed
   */
  _parseGetAccountPreAlerts : function(aResponse) {
    Logger.trace("AeroApi._parseGetAccountPreAlerts");
    var result = {};
    var packagesResult = $(aResponse).find("a\\:GetAccountPreAlertsResult, GetAccountPreAlertsResult");
    if (!packagesResult) {
      result.apiErrors = true;
    } else {
      var preAlerts = $(packagesResult).find("a\\:NoteDetail, NoteDetail");
      if (preAlerts.length > 0) {
        result.preAlerts = new Array();
        for (var i = 0; i < preAlerts.length; i++) {
          var element = preAlerts[i];
          var id = $(element).find("a\\:NoteID, NoteID");
          if (id.length > 0) {
            id = id.text();
            var preAlert = new PreAlert(id);
            preAlert.set("description", $(element).find("a\\:Description, Description").text());
            preAlert.set("courierName", $(element).find("a\\:CourierName, CourierName").text());
            preAlert.set("courierNumber", $(element).find("a\\:CourierTracking, CourierTracking").text());
            preAlert.set("courierURL", $(element).find("a\\:CourierURL, CourierURL").text());
            preAlert.set("value", $(element).find("a\\:Value, Value").text());
            preAlert.set("shipperName", $(element).find("a\\:ShipperName, ShipperName").text());
            preAlert.set("creationDate", $(element).find("a\\:CreationDate, CreationDate").text());
            result.preAlerts.push(preAlert);
          }
        }
      }
    }
    return result;
  },

  /**
   * Reports any error messages in the API response.
   * @param aResponse the API response.
   * @param aRequestName the name of the request
   */
  _validateResponse : function(aResponse, aRequestName) {
    Logger.trace("AeroApi._validateResponse");
    var result = {};
    result.apiErrors = false;
    if (!aResponse) {
      Logger.error("AeroApi error (no reponse document!)");
      result.apiErrors = true;
      return result;
    }

    var errorCodes = $(aResponse).find("a\\:ErrorCodes, ErrorCodes").text();
    if (errorCodes.length > 0) {
      result.errorCode = errorCodes;
      switch (errorCodes) {
        case "0101":
          // the client has been blocked, so we set the respective flag
          this._setClientAllowed(false);
          result.apiErrors = true;
          break;
        case "0009":
          result.invalidToken = true;
          ObserverHelper.notify(Topics.FORCE_ACCOUNT_SIGN_OUT, null);
          break;
        default:
          result.apiErrors = true;
          break;
      }
    } else {
      this._setClientAllowed(true);
    }

    // log error description
    var errorDesc = $(aResponse).find("a\\:ErrorDescriptions, ErrorDescriptions").text();
    if (errorDesc.length > 0) {
      Logger.error("API Error (" + aRequestName + "): " + errorDesc);
      //ObserverHelper.notify(Topics.AEROAPI_ERROR, errorDesc);
      result.errorDescription = errorDesc;
      if (result.errorDescription.indexOf("tracking number already has an active pre-alert") != -1 ||
        result.errorDescription.indexOf("ya tiene una pre-alerta activa") != -1) {
        result.preAlertExists = true;
      }
    }

    return result;
  },

  /**
   * Checks the state of the access flag and updates it if it is different from
   * the stored value
   * @param aAllowed whether the client is allowed or not
   */
  _setClientAllowed : function(aAllowed) {
    var currentValue = PropertyHelper.get(PropertyHelper.PROP_CLIENT_ALLOWED);
    if (currentValue != aAllowed) {
      PropertyHelper.set(PropertyHelper.PROP_CLIENT_ALLOWED, aAllowed);
      // notify to show/hide the kill switch screen
      ObserverHelper.notify(Topics.CLIENT_ALLOW_CHANGE, null);
    }
  },

  /**
   * Wraps an XML fragment into a MyEbayApplication API call
   * @param aRequestName The name of the call (without "Request")
   * @param aNamespace the namespace to be used
   * @param aInnerBody The body of the call
   * @returns the fully-formed text
   */
  _wrapCall : function(aRequestName, aNamespace, aParameters) {
    Logger.trace("AeroApi._wrapCall");

    var namespace =  "xmlns=\"https://www2.myaeropost.com/NAMESPACE\"";
    namespace = namespace.replace("NAMESPACE", aNamespace);

    var prefix = "tem:";

    var soapRequest = "<soapenv:Envelope " +
      "xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" " +
      "xmlns:tem=\"http://tempuri.org/\">";

    soapRequest += "<soapenv:Header/>";
    soapRequest += "<soapenv:Body>";
    soapRequest += "<" + prefix + aRequestName + ">";
    for (key in aParameters) {
      soapRequest += "<" + prefix + key + ">";
      soapRequest += aParameters[key];
      soapRequest += "</" + prefix + key + ">";
    }
    /*if (aRequestName == "PackagePrealert") {
     soapRequest += "<" + prefix + "WebServiceSecurity_User>" + "hola" + "</" + prefix + "WebServiceSecurity_User>";
     } else {*/
    soapRequest += "<" + prefix + "WebServiceSecurity_User>" + ConfigSettings.AUTH_CODE_USER + "</" + prefix + "WebServiceSecurity_User>";
    //}
    soapRequest += "<" + prefix + "WebServiceSecurity_Password>" + ConfigSettings.AUTH_CODE + "</" + prefix + "WebServiceSecurity_Password>";
    soapRequest += "</" + prefix + aRequestName + ">";
    soapRequest += "</soapenv:Body>";
    soapRequest += "</soapenv:Envelope>";

    return soapRequest;
  },

  /**
   * Performs MDNSApi API call
   * @param aRequestBody The full body of the call, as will be POSTed
   * @param aRequestName the request name to be performed
   * @param aEndPoint the endpoint to use
   * @param aCallback The callback function
   */
  _doCall : function(aRequestBody, aRequestName, aEndpoint, aCallback) {
    Logger.trace("AeroApi._doCall");
    var that = this;

    var endpoint = ConfigSettings.WS_METRO_PUBLIC_ENDPOINT;
    switch (aEndpoint) {
      case "WS_MyAero":
        endpoint = ConfigSettings.WS_MY_AERO_ENDPOINT;
        break;
    }

    var soapAction = "http://tempuri.org/IServices/" + aRequestName

    var request =
      $.ajax({
        type: "POST",
        beforeSend: function (request, settings)
        {
          request.setRequestHeader("SOAPAction", soapAction);
          /*if (ConfigSettings.authorizationEnabled) {
            RestClientSignatureHelper.setAuthorizationHeader(request, settings);
          }*/
        },
        contentType: "text/xml",
        url: endpoint,
        data: aRequestBody,
        dataType: "xml",
        jsonp: false,
        timeout: 60 * 1000,
      }).done(function(aData) {
        var results = that._validateResponse(aData, aRequestName);
        results.data = aData;
        if (aCallback) {
          aCallback(results);
        }
      }).fail(function(aXHR, aTextStatus, aError) {
        Logger.error("AeroApi Error: Unable to contact the " +
          "server. Call: " + aRequestName + ": " + aError) ;
        // there were errors, so we notify the observer to stop the refresh
        // throbber
        ObserverHelper.notify(Topics.AEROAPI_ERROR, null);

        var result = {};
        result.apiErrors = true;
        result.errorDescription = aError;
        if (aCallback) {
          aCallback(result);
        }
      });
  }
};
