/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Account Service.
 */
var AccountService = {
  /* Active account. */
  _activeAccount : null,
  /* Account Packages */
  _accountPackages : null,
  /* Shopping Cart */
  _cart : null,
  /* Calculator categories */
  _categories : null,
  /* Calculator account types */
  _accountTypes : null,
  /* Orders */
  _orders : null,
  /* Countries */
  _countries: null,

  /**
   * Resturns whether a user is signed in or not
   */
  get isSignedIn() {
    return (this._activeAccount != null &&
            this._activeAccount.get("isValid") != null &&
            this._activeAccount.get("isValid") == true);
  },

  /**
   * Gets the active account.
   * @return the active account.
   */
  get activeAccount() {
    return this._activeAccount;
  },

  /**
   * Gets the account packages
   * @return the account packages
   */
  get accountPackages() {
    return this._accountPackages;
  },

   /**
   * Gets the orders list
   * @return the orders list
   */
  get orders() {
    return this._orders;
  },

  /**
   * Gets the shopping cart
   * @return the shopping cart
   */
  get cart() {
    return this._cart;
  },

  /**
   * Initializes the service.
   */
  _init : function() {
    Logger.trace("AccountService._init");

    var that = this;
    // get the locally stored account (if any) and use it
    var storedAccountCallback = function(aStoredAccount) {
      if (aStoredAccount) {
        that._activeAccount = aStoredAccount;
        var result = {};
        that._signedIn(result);
      } else {
        that.signOut();
      }
    };
    StorageHelper.getActiveAccount(storedAccountCallback);

    ObserverHelper.addObserver(this, Topics.FORCE_ACCOUNT_SIGN_OUT);
  },

  /**
   * Returns the MIA for a given courier number, if any available
   * @param aCourierNumber the courier number to look for a MIA
   * @returns the respective MIA, null if not found
   */
  getMIA : function(aCourierNumber) {
    var mia = null;

    if (this._accountPackages) {
      for (var i = 0; i < this._accountPackages.length; i++) {
        var pack = this._accountPackages[i];
        if (pack.get("courierNumber") == aCourierNumber) {
          mia = pack;
          break;
        }
      }
    }

    return mia;
  },

  /**
   * Authenticates a user
   * @param aUserCreds an object with the user credentials
   */
  validate : function(aUserCreds) {
   Logger.trace("AccountService.signIn");

    var that = this;
    var validateCallback = function(aResult) {
      try {
        if (aResult != null && aResult.status && aResult.status == 200) {
          if (aResult.results != null && aResult.results.customerInformation != null) {
            //console.log("respuesta: " + JSON.stringify(aResult));
            var account = new Account(aResult.results.customerInformation.gateway.webCode, aResult.results.customerInformation.accout);
            var passValue = CryptoJS.MD5(aUserCreds.password).toString()
            account.set("md5pass", passValue);
            account = that._parseValidateResponse(account, aResult);
            that._activeAccount = account;
            that._signedIn(aResult);
          }else{
            new Timer(function() {
              ObserverHelper.notify(Topics.ACCOUNT_SIGN_IN_FAILED, null);
            }, 500);
          }
        }
      } catch (e) {
        Logger.error("AccountService.signIn Error: " + e.message);
      }
    };

    // complete the user credentials with the device and app info
    aUserCreds.deviceID = UtilityHelper.getClientId();
    aUserCreds.mobileType = 8; // (undefined according to documentation)
    aUserCreds.operatingSystemName = UtilityHelper.OSName;
    aUserCreds.operatingSystemVersion = UtilityHelper.OSVersion;
    aUserCreds.deviceBrand = UtilityHelper.browserName;
    aUserCreds.deviceModel = UtilityHelper.browserVersion;
    // XXX: encoded the app name because it has the TradeMark character
    aUserCreds.appName = he.encode(UtilityHelper.appName);
    aUserCreds.appVersion = UtilityHelper.extensionVersion;
    aUserCreds.service = "MobileAeropost";
    

    var jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(ConfigSettings.RSA_KEY);

    var dataJson = null;
    if(null != aUserCreds){
      dataJson = JSON.stringify(aUserCreds);  
    }
    _request = jsEncrypt.encrypt(dataJson);
    _deviceId = jsEncrypt.encrypt(UtilityHelper.getClientId());
    
    var params = {
      appId: ConfigSettings.APP_ID,
      deviceId: _deviceId,
      request: _request
    };

    //AeroApi.validate(aUserCreds, validateCallback);
    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_AUTH_USER, "POST", null, params, validateCallback);
    PropertyHelper.set(PropertyHelper.PROP_SIGNIN_REMEMBER, aUserCreds.remember);
    if (aUserCreds.remember) {
      // store user credentials
      StorageHelper.setCredentials({gtw : aUserCreds.MyAeroGateway,
                                    acc : aUserCreds.MyAeroAccount}, function() {});
    } else {
      StorageHelper.setCredentials(null, function() {});
    }
  },

  /**
   * Calls once an account is signed in.
   * @param aResult the object that contains the authentication process result
   */
  _signedIn : function(aResult) {
    Logger.trace("AccountService._signedIn");

    // store the active account info to the DB
    var activeAccount = this._activeAccount;
   
    if (activeAccount != null &&
        !aResult.apiErrors &&
        activeAccount.get("isValid") == true) {
      StorageHelper.setActiveAccount(this._activeAccount, function() {});
      new Timer(function() {
        ObserverHelper.notify(
          Topics.ACCOUNT_SIGNED_IN,
          null);
        }, 500);
    } else {
      switch (aResult.errorCode) {
        case "0101":
          new Timer(function() {
          ObserverHelper.notify(
            Topics.INVALID_CLIENT_ERROR,
            null);
          }, 500);
          break;
        default:
          new Timer(function() {
          ObserverHelper.notify(
            Topics.ACCOUNT_SIGN_IN_FAILED,
            null);
          }, 500);
          break;
      }
    }

  },

  /**
   * Invalidates the active account.
   */
  signOut : function() {
    Logger.trace("AccountService.signOut");

    this._activeAccount = null;
    this._accountPackages = null;
    this._cart = null;
    this._orders = null;
    StorageHelper.setActiveAccount(this._activeAccount);

    var that = this;
    new Timer(function() {
      ObserverHelper.notify(
        Topics.ACCOUNT_SIGNED_OUT,
        null);
      }, 500);
  },

  /**
   * Gets the list of packages for the signed in account
   */
  getAccountPackages : function() {

    var that = this;
    var localCallback = function(aResult) {
      // set the local list and notify to update
      if (aResult.packages) {
        that._accountPackages = aResult.packages;
      }

      if (aResult.apiErrors) {
        // there were errors, create a notification
        var notification = new NotificationObject(new Date().getTime());
        notification.type = "basic";
        notification.point = null;
        notification.title = $.i18n.getString("extension.api.error.title");
        notification.msg = $.i18n.getString("extension.api.getPackages.error.msg");
        NotificationService.showNotification(notification);
      } else {
        ObserverHelper.notify(Topics.PACKAGES_UPDATED, aResult);
      }
    }
    var activeAccount = this.activeAccount;
    AeroApi.getAccountPackages(activeAccount.get("token"),
                               0,
                               ConfigSettings.PACKAGE_LIST_QUANTITY,
                               localCallback);
  },

  /**
   * Gets the list of orders for the signed in account
   */
  getOrders : function() {

    var that = this;
    var localCallback = function(aResult) {
      var ordersList = [];
      that._orders = ordersList;
      // set the local list and notify to update
      if (typeof aResult != "undefined" && aResult != null){

        if(aResult.status && aResult.status == 200) {
          if(aResult.results.orderResponses.length > 0){
            for (var a = 0; a < aResult.results.orderResponses.length; a++) {
              var order = {};
              order.number = aResult.results.orderResponses[a].order.orderNum;
              order.statusDescription = aResult.results.orderResponses[a].order.orderStatus.description;
              order.statusId = aResult.results.orderResponses[a].order.orderStatus.statusId;
              order.total = aResult.results.orderResponses[a].order.payments[0].amount;
              order.date = aResult.results.orderResponses[a].order.orderDate;
              order.orderDetails = [];
              if(aResult.results.orderResponses[a].order.orderDetails.length > 0){
                orderDescription = [];
                for (var i = 0; i < aResult.results.orderResponses[a].order.orderDetails.length; i++) {
                  orderDescription[i] = aResult.results.orderResponses[a].order.orderDetails[i].description;
                }
                order.orderDetails = orderDescription;  
              }
              ordersList[a] = order;
            }
            that._orders = ordersList;
            ObserverHelper.notify(Topics.ORDERS_UPDATED, order);
          }          
        } else {
          // there were errors, create a notification
          var notification = new NotificationObject(new Date().getTime());
          notification.type = "basic";
          notification.point = null;
          notification.title = $.i18n.getString("extension.api.error.title");
          notification.msg = $.i18n.getString("extension_api_getOrders_error_msg");
          NotificationService.showNotification(notification);
        }

      } 
          
    }
    var activeAccount = this.activeAccount;

    var filter = {};
    var fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 5);
    filter.StartDate = fromDate;

    var toDate = new Date();
    toDate.setMonth(toDate.getMonth() + 1);
    filter.EndDate = toDate;
    filter.OnlyPendingPayment = true;
    filter.OnlyCancelled = false;
    filter.OnlyOpen = true;
    filter.Account = activeAccount.get("accountNumber");
    filter.Gateway = activeAccount.get("gateway");
    filter.RowsPerPage = 10;
    filter.PageNumber = 1;
    filter.OrderNum = null;

    var params = {};
    params.filters = filter;
    params.token = activeAccount.get("token");
    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GETORDERS_URL, "POST", null, params, localCallback);
  },


   /**
   * Gets the list of orders and packages for the signed in account
   */
  getNewOrdersPackagesByAccount : function() {

    var that = this;
    var localCallback = function(aResult) {
        //console.log("respuesta: " + JSON.stringify(aResult));
        var packages = [];
        var orders = [];
         if(aResult.status && aResult.status == 200) {
            if(aResult.results.orderResponses.length > 0){
              if(aResult.results.orderResponses.length > 0){
                for (var i = 0; i < aResult.results.orderResponses.length; i++) {
                  var pack = aResult.results.orderResponses[i];
                    if (pack.order.type == "packages") {
                        var package = new Package(pack.order.orderDetails[0].aeroTracking);
                        package.set("aeroTrackUrl", pack.order.aeroTrackUrl);
                        //package.set("courierNumberUrl", $(element).find("a\\:CourierNumberURL, CourierNumberURL").text());
                        package.set("description", pack.order.orderDetails[0].description);
                        var status = "";
                        if(that.activeAccount.get("language") == "es"){
                          status = pack.order.orderStatus.name.spa 
                        } else {  
                          status = pack.order.orderStatus.name.eng 
                        }
                        package.set("status", status);
                        package.set("statusCode", pack.order.orderStatus.statusId);
                        package.set("courierName", pack.order.orderDetails[0].courierName);
                        package.set("courierNumber", pack.order.orderDetails[0].courierTracking);
                        package.set("shipper", pack.order.orderDetails[0].store);
                        package.set("consignee", pack.order.consignee.name);
                        package.set("ammountUSD", pack.order.totals.usdTotal.currentTotal);
                        package.set("ammountLocal", pack.order.totals.localTotal.currentTotal);
                        package.set("creationDate", pack.order.orderDate);
                        package.set("lastUpdate", pack.order.orderDateUpdate);
                        package.set("weight", pack.order.orderDetails[0].weight.kilos);
                        packages.push(package);
                    }else{
                        var order = {};
                        order.number = pack.order.orderNum;
                        order.statusDescription = pack.order.orderStatus.description;
                        order.statusId = pack.order.orderStatus.statusId;
                        order.total = pack.order.payments[0].amount;
                        order.date = pack.order.orderDate;
                        order.orderDetails = [];
                        if(pack.order.orderDetails.length > 0){
                          orderDescription = [];
                          for (var j = 0; j < pack.order.orderDetails.length; j++) {
                            orderDescription[j] = pack.order.orderDetails[j].description;
                          }
                          order.orderDetails = orderDescription;  
                        }
                        orders.push(order);
                    }
                }

                that._orders = orders;
                ObserverHelper.notify(Topics.ORDERS_UPDATED, orders);

                that._accountPackages = packages;
                ObserverHelper.notify(Topics.PACKAGES_UPDATED, packages);
              }
            }
          }else{
            // there were errors, create a notification
            var notification = new NotificationObject(new Date().getTime());
            notification.type = "basic";
            notification.point = null;
            notification.title = $.i18n.getString("extension.api.error.title");
            notification.msg = $.i18n.getString("extension_api_getOrders_error_msg");
            NotificationService.showNotification(notification);

            var notification = new NotificationObject(new Date().getTime());
            notification.type = "basic";
            notification.point = null;
            notification.title = $.i18n.getString("extension.api.error.title");
            notification.msg = $.i18n.getString("extension.api.getPackages.error.msg");
            NotificationService.showNotification(notification);
          }

    };
    var activeAccount = this.activeAccount;

    var filter = {};

    filter.account = activeAccount.get("accountNumber");
    filter.fillPackagesCharge = false;
    filter.filterByStatus = "";
    filter.gateway = activeAccount.get("gateway");
    filter.includePreAlerts = false;
    filter.isGraphicView = false;
    filter.lang = activeAccount.get("language");
    filter.onlyCancelled = false;
    filter.onlyOpen = true;
    filter.onlyPendingPayment = true;
    filter.pageNumber = 1;
    filter.rowsPerPage = 10;
    filter.searchText = "";
    filter.sortIsDescending = true;
    filter.orderRowsPerPage = 5;
    filter.pakagesRowsPerPage = 5;

    var params = {};
    params.filters = filter;
    params.pageIndex = 1;
    params.pageSize = 1;
    params.token = activeAccount.get("token");
    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GET_NEW_ORDERS_PACKAGES_BY_ACCOUNT, "POST", null, params, localCallback);
  },

  /**
   * Gets the shopping cart
   * @param aCallback the callback to call
   */
  getCart : function() {
    if (AccountService.isSignedIn) {
      var activeAccount = AccountService.activeAccount;
      var that = this;
      var getCartCallback = function(aResponse) {
        if (aResponse != null &&
          aResponse.status &&
          aResponse.status == 200) {
          var cart = aResponse.results;
          if (cart != null) {
            that._cart = cart;
          }
          ObserverHelper.notify(Topics.CART_UPDATED, null);
        } else {
          that._cart = null;
        }
      };

      var params = {};
      params.gateway = activeAccount.get("gateway");
      params.sessionId = activeAccount.get("sessionId");
      params.account = activeAccount.get("accountNumber");
      params.showLocalCurrency = false;
      if(activeAccount.get("priceSmartMembershipId") > 0){
        params.apmodifiers = "apm_ispricesmart:true|account:" + activeAccount.get("accountNumber");
      }else{
        params.apmodifiers = "apm_ispricesmart:false|account:" + activeAccount.get("accountNumber");
      }

      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GETCART_URL, "GET", params, null, getCartCallback);
    }
  },

  /**
   * Quotes a product
   * @param aRequest the request object received through the notification from the content script
   * @param aCallback the callback to call
   */
  quoteProduct : function(aRequest, aCallback) {
    if (AccountService.isSignedIn) {
      var activeAccount = AccountService.activeAccount;
      var productASIN = aRequest.productASIN;
      var color = aRequest.color;
      var size = aRequest.size;
      var quoteCallback = function(aResponse) {

        if (typeof aResponse != "undefined" && aResponse != null &&
          aResponse.status &&
          aResponse.status == 200) {
          var product = aResponse.results[0];
          if (product != null) {
            // set selected variation
            var variationKey = size != null ? size.toLowerCase().replace(".", ",") : "";
            variationKey += color != null ? color.toLowerCase() : "";

            var variation = product.itemVariations[variationKey];

            if (variation != null) {
              product.price = variation.price;
              product.priceBreakdown.total = product.price;
              product.size = variation.size;
              product.color = variation.color;
              product.selectedVariation = variation;
            } else {
              product.selectedVariation = null;
            }

            var info = {};
            info.product = product;
            aCallback(info);
          }
        } else {
          var info = {};
          aCallback(info);
        }
      };

      var params = {};
      params.productId = productASIN;
      params.sourceType = "amz";
      params.gateway = activeAccount.get("gateway");
      if(null != aRequest.lang && aRequest.lang.length > 0){
        params.lang =  aRequest.lang;
      } else {
        params.lang = activeAccount.get("language");  
      } 
      params.quantity = 1;
      params.cartSubTotal = 0;
      params.sessionId = activeAccount.get("sessionId");
      params.account = activeAccount.get("accountNumber");
      params.showLocalCurrency = false;
      if(null != aRequest.variantLookup){
        params.variantLookup = aRequest.variantLookup;
      } else {
        params.variantLookup = true;
      }

      if(activeAccount.get("priceSmartMembershipId") > 0){
        params.apmodifiers = "apm_ispricesmart:true|account:" + activeAccount.get("accountNumber");
      }else{
        params.apmodifiers = "apm_ispricesmart:false|account:" + activeAccount.get("accountNumber");
      }

      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_LOOKUP_URL, "GET", params, null, quoteCallback);
    }
  },

  /**
   * Adds a product to the marketplace shopping cart
   * @param aProductInfo the info of the product to be added to the cart
   * @param aCallback the callback to call
   */
  addToCart : function(aProductInfo, aCallback) {
    if (AccountService.isSignedIn) {
      var activeAccount = AccountService.activeAccount;
      

      var addToCartCallback = function(aResponse) {
        var _i18n = $.i18n;
        // show notification
        if (aResponse != null && aResponse.status == 201) {
          var notification = new NotificationObject(aResponse.results.productId);
          notification.type = "basic";
          notification.point = null;
          notification.title = _i18n.getString("extension.addtocart.congratulations.title");
          notification.msg = _i18n.getString("extension.addtocart.congratulations.msg");
          NotificationService.showNotification(notification, false, 1);
          aCallback({processed: "adding to cart"});
        } else {
          Logger.error("Error adding product to cart: " + JSON.stringify(aResponse));
          var notification = new NotificationObject(new Date().getTime());
          notification.type = "basic";
          notification.point = null;
          notification.title = _i18n.getString("extension.addtocart.error.title");
          notification.msg = _i18n.getString("extension.addtocart.error.msg");
          NotificationService.showNotification(notification);
        }
      }

      var product = aProductInfo;
      var cartProduct = {};
      cartProduct.lang = activeAccount.get("language");
      cartProduct.sessionId = activeAccount.get("sessionId");
      cartProduct.cartId = ""; // new cart
      cartProduct.account = activeAccount.get("accountNumber");
      cartProduct.gateway = activeAccount.get("gateway");

      cartProduct.amazonTax = product.priceBreakdown.tax;
      cartProduct.shipping = product.priceBreakdown.shipping;
      cartProduct.shippingRate = product.priceBreakdown.shippingRate;

      cartProduct.subtotal = product.priceBreakdown.subtotal;
      cartProduct.taxes = product.priceBreakdown.taxes;
      cartProduct.totalPrice = product.priceBreakdown.total;

      cartProduct.hcCode = product.hcInfo.hc;

      cartProduct.image = product.imageLink;

      cartProduct.productUrl = product.link;
      cartProduct.quantity = product.quantity;
      cartProduct.administrativeFee = product.administrativeFee;
      cartProduct.declaredValue = product.priceBreakdown.declaredValue;
      cartProduct.price = product.price;
      cartProduct.category = product.category;
      cartProduct.title = product.productName;
      cartProduct.weight = product.weight;
      cartProduct.amazonTax = product.priceBreakdown.amazonTax;

      var selectedVariation = product.selectedVariation;

      if (selectedVariation != null) {
        product.sku = selectedVariation.sku;
      }
      cartProduct.sku = product.sku;

      cartProduct.productJson = product;

      cartProduct.productJson.offers = null;
      cartProduct.productJson.itemVariations = null;
      cartProduct.productJson.selectedVariation = null;
      cartProduct.productJson.selectedOffer = null;

      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_ADDTOCART_URL, "POST", null, cartProduct, addToCartCallback);
    }
  },

  removeFromCart : function(aProductId, aCallback){
    if (AccountService.isSignedIn) {
      
      var removeToCartCallback = function(aResponse) {
        var _i18n = $.i18n;
        // show notification
        if (aResponse != null && aResponse.status == 200) {
          var notification = new NotificationObject(aResponse.results.productId);
          notification.type = "basic";
          notification.point = null;
          notification.title = _i18n.getString("extension.addtocart.congratulations.title");
          notification.msg = _i18n.getString("extension_removetocart_congratulations_msg");
          NotificationService.showNotification(notification, false, 1);
          AccountService.getCart();
          aCallback(aResponse);
        } else {
          Logger.error("Error adding product to cart: " + JSON.stringify(aResponse));
          var notification = new NotificationObject(new Date().getTime());
          notification.type = "basic";
          notification.point = null;
          notification.title = _i18n.getString("extension.addtocart.error.title");
          notification.msg = _i18n.getString("extension_removetocart_error_msg");
          NotificationService.showNotification(notification);
        }
      }

      shoppingCart= {};
      shoppingCart.cartId = this._cart.cartId;
      shoppingCart.productId = aProductId;
      shoppingCart.sessionId = this._cart.sessionId;
      MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_REMOVE_PRODUCT, "DELETE", shoppingCart, null, removeToCartCallback);
      
    }
  },

  /**
   * Loads the list of categories and account types for the calculator
   * @param aCallback the callback to be called with the returned info
   */
  loadCalculatorData : function(aCallback) {
    if (AccountService.isSignedIn) {
      var that = this;
      if (this._categories == null) {
        var getCategoriesCallback = function(aResponse) {
          if (aResponse != null &&
              aResponse.status != null &&
              aResponse.status == 200 &&
              aResponse.results != null) {
            that._categories = aResponse.results.categories;
            var responseObj = {};
            responseObj.categories = that._categories;
            aCallback(responseObj);
          } else {
            Logger.error("There was an error retrieving the calculator categories");
          }
        };

        var params = {};
        params.gateway = this._activeAccount.get("gateway");
        MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GETCATEGORIES_URL, "GET", params, null, getCategoriesCallback);
      } else {
        var responseObj = {};
        responseObj.categories = this._categories;
        aCallback(responseObj);
      }

      if (this._accountTypes == null) {
        var getAccountTypesCallback = function(aResponse) {
          if (aResponse != null &&
              aResponse.status != null &&
              aResponse.status == 200 &&
              aResponse.results != null) {
            that._accountTypes = aResponse.results;
            var responseObj = {};
            responseObj.accountTypes = that._accountTypes;
            aCallback(responseObj);
          } else {
            Logger.error("There was an error retrieving the calculator categories");
          }
        };
        var params = {};
        params.gateway = this._activeAccount.get("gateway");
        params.lang = this._activeAccount.get("language");
        MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GETACCOUNTTYPES_URL, "GET", params, null, getAccountTypesCallback);
      } else {
        var responseObj = {};
        responseObj.accountTypes = this._accountTypes;
        aCallback(responseObj);
      }
    }
  },

    /**
   * Loads the list of countries
   * @param aCallback the callback to be called with the returned info
   */
   getCountries : function(aCallback, language) {

      var that = this;
      if (this._categories == null) {
        var getCountriesCallback = function(aResponse) {
          if (aResponse != null &&
              aResponse.status != null &&
              aResponse.status == 200 &&
              aResponse.results != null) {
            that._countries = aResponse.results.countries;
            var responseObj = {};
            responseObj.countries = that._countries;
            aCallback(responseObj);
          } else {
            Logger.error("There was an error retrieving the calculator categories");
          }
        };

        var params = {};
        params.lang = language;
        MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GET_COUNTRIES, "GET", params, null, getCountriesCallback);
      } else {
        var responseObj = {};
        responseObj.categories = this._categories;
        aCallback(responseObj);
      }
  },

  getProfileInformation : function(aCallback) {

    var that = this;
    
    var getProfileInformationCallback = function(aResponse) {
      if (aResponse != null &&
          aResponse.status != null &&
          aResponse.status == 200 &&
          aResponse.results != null) {
        
        var aAccount = that._activeAccount;
        aAccount.set("preferedLanguage", aResponse.results.profileInformation.preferedLanguage);
        aAccount.set("clientEmail", aResponse.results.profileInformation.email);
        //aAccount.set("delivery", aResponse.results.profileInformation.deliverySetting.address.deliveryInstruction.value);
        aAccount.set("delivery", aResponse.results.profileInformation.deliverySetting.address != null ? aResponse.results.profileInformation.deliverySetting.address.deliveryInstruction.value :  aResponse.results.profileInformation.deliverySetting.counterDescription);


        that._activeAccount = aAccount;
        aCallback(that._activeAccount);
       
        //console.log("respuesta: " + JSON.stringify(aResponse));
      } else {
        Logger.error("There was an error retrieving the calculator categories");
      }
    };

    var params = {};
    params.gateway = this._activeAccount.get("gateway");
    params.isOwner = this._activeAccount.get("owner");
    params.account = this._activeAccount.get("accountNumber");
    params.lang = this._activeAccount.get("language");
    params.uniqueId = this._activeAccount.get("personId");

    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GET_USER_INFORMATION, "POST", null, params, getProfileInformationCallback);
      
  },


  getProfileInformationDelivery : function() {

    var that = this;
    
    var getProfileInformationCallback = function(aResponse) {
      if (aResponse != null &&
          aResponse.status != null &&
          aResponse.status == 200 &&
          aResponse.results != null) {
        
        var aAccount = that._activeAccount;
        //aAccount.set("delivery", aResponse.results.profileInformation.deliverySetting.address.deliveryInstruction.value);
        aAccount.set("delivery", aResponse.results.profileInformation.deliverySetting.address != null ? aResponse.results.profileInformation.deliverySetting.address.deliveryInstruction.value :  aResponse.results.profileInformation.deliverySetting.counterDescription);


        that._activeAccount = aAccount;
      //  aCallback(that._activeAccount);
       
        //console.log("respuesta: " + JSON.stringify(aResponse));
      } else {
        Logger.error("There was an error retrieving the calculator categories");
      }
    };

    var params = {};
    params.gateway = this._activeAccount.get("gateway");
    params.isOwner = this._activeAccount.get("owner");
    params.account = this._activeAccount.get("accountNumber");
    params.lang = this._activeAccount.get("language");
    params.uniqueId = this._activeAccount.get("personId");

    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_GET_USER_INFORMATION, "POST", null, params, getProfileInformationCallback);
      
  },

  /**
   * Performs a calculation based on the data passed as parameter
   * @param aCalcFormData the form data from the calculator
   * @param calculatorCallback the callback to be called with the result
   */
  calculate : function(aCalcFormData, aCalculatorCallback) {

    var calcObject = this._getCalcObject(aCalcFormData);

    MarketplaceApi.sendRequest(ConfigSettings.MARKETPLACE_CALCULATOR_URL, "POST", null, calcObject, aCalculatorCallback);
  },

  /**
   * Generates the object to be sent along with the calculator request
   * @param aCalcFormData the data be be used to generate the object
   * @return the calculation object to be sent
   */
  _getCalcObject : function(aCalcFormData) {
    var calcObject = {};

    var kg = 0;
    var lb = 0;
    if (aCalcFormData.inlineRadioOptions.indexOf("pounds") != -1) {
      lb = parseFloat(aCalcFormData.weightCalc);
      kg = lb * 0.454;
    } else {
      kg = parseFloat(aCalcFormData.weightCalc);
      lb = kg * 2.2046;
    }

    var declaredValue = parseFloat(aCalcFormData.priceCalc) + parseFloat(aCalcFormData.shippingCalc);

    calcObject.feePercentage = 0;
    calcObject.gateway = this._activeAccount.get("gateway");
    calcObject.harmonizedCode = null;
    calcObject.isPackagePrealerted = true;
    calcObject.numberPackages = 1;
    calcObject.productTitle = aCalcFormData.productCategory;
    calcObject.totalWeightKilos = kg;
    calcObject.totalWeightPounds = lb;
    calcObject.upc = null;
    calcObject.accountId = aCalcFormData.accountType;
    calcObject.additionalCodeType = "";
    calcObject.additionalCode = "";
    calcObject.diminimus = false;
    calcObject.showLocalCurrency = false;
    calcObject.declaredValue = declaredValue;
    calcObject.codeType = null;
    calcObject.isAmazonProduct = false;

    return calcObject;
  },

  /**
   * Observes for changes.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {
    Logger.trace("AccountService.observe");

    switch (aTopic) {
      case Topics.FORCE_ACCOUNT_SIGN_OUT:
        this.signOut();
        break;
    }
  },

  /**
   * Parses the validate response
   * @param aResult the account object to be populated
   * @param aResponse the response to be parsed
   * @returns an account object with the parsed data
   */
  _parseValidateResponse : function(aAccount, aResponse) {
    Logger.trace("AeroApi._parseValidateResponse");
    //var isValid = $(aResponse).find("a\\:IsValid, IsValid");
    if (aResponse.results.errors.length > 0) {
      aAccount.set("isValid", false);
    } else {
      aAccount.set("isValid", true);
    }

    // if not valid, just return and don't parse the rest
    if (aAccount.get("isValid")) {
      aAccount.set("personId", aResponse.results.customerInformation.id);
      aAccount.set("language", aResponse.results.customerInformation.language);
      aAccount.set("csymbol", aResponse.results.customerInformation.gateway.currencySymbol);
      aAccount.set("currencyISO", aResponse.results.customerInformation.gateway.currencyISO);
      //aAccount.set("countryCultureInfo", $(aResponse).find("a\\:CountryCultureInfo, CountryCultureInfo").text());
      aAccount.set("accountStatus", aResponse.results.customerInformation.status);
      aAccount.set("accountStatusCode", aResponse.results.customerInformation.status);
      aAccount.set("clientFullName", aResponse.results.customerInformation.fullName);
      aAccount.set("clientEmail", aResponse.results.customerInformation.email);
      aAccount.set("packagesAddressLine1", aResponse.results.customerInformation.addressLine1);
      aAccount.set("packagesAddressLine2", aResponse.results.customerInformation.addressLine2);
      aAccount.set("packagesCity", aResponse.results.customerInformation.city);
      aAccount.set("packagesState", aResponse.results.customerInformation.regionProvinceState);
      aAccount.set("packagesZipCode",aResponse.results.customerInformation.gateway.zipCode);
      aAccount.set("packagesPhone", aResponse.results.customerInformation.phoneMobileNumber);
      //aAccount.set("mailLine1", $(aResponse).find("a\\:Mail_Line1, Mail_Line1").text().trim());
      //aAccount.set("mailLine2", $(aResponse).find("a\\:Mail_Line2, Mail_Line2").text().trim());
      //aAccount.set("mailLine3", $(aResponse).find("a\\:Mail_Line3, Mail_Line3").text().trim());
      aAccount.set("token", aResponse.results.token);
      aAccount.set("tokenMyAero", aResponse.results.tokenMyAero);
      aAccount.set("priceSmartMembershipId", aResponse.results.customerInformation.priceSmartMembershipId);
      aAccount.set("sessionId", UtilityHelper._generateUUID(true));
      aAccount.set("userBoxAddressCity", aResponse.results.customerInformation.userBoxAddress.city);
      aAccount.set("userBoxAddressLine1", aResponse.results.customerInformation.userBoxAddress.line1);
      aAccount.set("userBoxAddressLine2", aResponse.results.customerInformation.userBoxAddress.line2);
      aAccount.set("userBoxAddressPhone", aResponse.results.customerInformation.userBoxAddress.phone);
      aAccount.set("userBoxAddressState", aResponse.results.customerInformation.userBoxAddress.state);
      aAccount.set("userBoxAddressZipCode", aResponse.results.customerInformation.userBoxAddress.zipcode);
      aAccount.set("userBoxAddressGateway", aResponse.results.customerInformation.userBoxAddress.gateway);
      aAccount.set("owner", aResponse.results.customerInformation.owner);
      //aAccount.set("delivery", aResponse.results.customerInformation.addressLine1);

    }


    return aAccount;
  },

};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(AccountService);
