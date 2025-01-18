/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

var PopupStateHandler = {

  /* Background View. */
  _backgroundView : null,

  /**
   * Gets the background view.
   * @return the background view.
   */
  get backgroundView() {
    if (!this._backgroundView) {
      this._backgroundView = BackgroundHelper.getBackgroundPage();
    }

    return this._backgroundView;
  },

  _init : function() {

    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNED_IN);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGN_IN_FAILED);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNED_OUT);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNING_IN);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.AEROAPI_ERROR);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.UPDATE_STARTED);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.UPDATE_FINISHED);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.CART_UPDATED);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.CLIENT_ALLOW_CHANGE);
    PopupStateHandler.backgroundView.ObserverHelper.addObserver(this, Topics.INVALID_CLIENT_ERROR);

    // set version label
    // XXX: delayed to make sure the value is initialized
    new Timer(function() {
      // set version label

      $(".aero-footer-version").text($(".aero-footer-version").text() + "V." + UtilityHelper.extensionVersion);
      $(".aero-version").text($(".aero-version").text() + "V." + UtilityHelper.extensionVersion);
    }, 1000);

    this._updatePopupState();
  },

  _uninit : function() {
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.ACCOUNT_SIGNED_IN);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.ACCOUNT_SIGN_IN_FAILED);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.ACCOUNT_SIGNED_OUT);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.ACCOUNT_SIGNING_IN);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.AEROAPI_ERROR);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.UPDATE_STARTED);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.UPDATE_FINISHED);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.CART_UPDATED);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.CLIENT_ALLOW_CHANGE);
    PopupStateHandler.backgroundView.ObserverHelper.removeObserver(this, Topics.INVALID_CLIENT_ERROR);
  },

  /**
   * Clears the lists from their contents
   */
  _clearContents : function() {
    $("#aero-packages-list").empty();
    $("#aero-prealerts-list").empty();
  },

  /**
   * Sets the popup UI state
   */
  _updatePopupState : function() {
    try {
      if (!$("#aero-main-panel").hasClass("hide")) {
        $("#aero-main-panel").addClass("hide");
      }
      var signedOutContent = $("#aero-signed-out-content");
      var signedInContent = $("#aero-signed-in-content");

      var accountText = $("#aero-signin-account");
      var passText = $("#aero-signin-password");
      this.showSpinner(false);
      PopupStateHandler._showSignInError(false);

      if (this.backgroundView.AccountService.isSignedIn) {
        $(signedOutContent).hide();
        if (PopupStateHandler.backgroundView.PropertyHelper.get(PopupStateHandler.backgroundView.PropertyHelper.PROP_CLIENT_ALLOWED)) {
          $("#aero-allowed-content").show();
          $("#aero-not-allowed-content").hide();
          PopupStateHandler.populateListInfo("packages");
          PopupStateHandler.populateListInfo("prealerts");
          PopupStateHandler.populateListInfo("orders");
          PopupStateHandler.populateUserInfo();
          PopupStateHandler.populateShoppingCart();
        } else {
          $("#aero-allowed-content").hide();
          $("#aero-not-allowed-content").show();
        }
        $(signedInContent).show();
        $(accountText).val("");
        $(passText).val("");
      } else {
        // reset to packages tab
        $('#aero-tab-list a[href="#aero-cart-pane"]').tab('show');
        $(signedInContent).hide();
        $(signedOutContent).show();
      }
      new Timer(function() {
        if ($("#aero-main-panel").hasClass("hide")) {
          $("#aero-main-panel").removeClass("hide");
        }
      }, 150);
      new Timer(function() {
        PopupStateHandler._populateCreds();
        }, 500);
    } catch(e) {
      // catching some random error that happens when we hide and show stuff
      console.log(e.stack);
    }
  },

  _populateCreds : function() {
    var remember =
      PopupStateHandler.backgroundView.PropertyHelper.get(
        PopupStateHandler.backgroundView.PropertyHelper.PROP_SIGNIN_REMEMBER);
    if (remember) {
      var credsCallback = function(aCreds) {
        if (aCreds) {
          $("#aero-signin-country").val(aCreds.gtw);
          $("#aero-signin-account").val(aCreds.acc);
          $("#aero-signin-account").attr("class", "form-control aero-main-font-small ng-untouched ng-valid-pattern ng-dirty ng-valid-parse ng-valid ng-valid-required");
          $("#aero-signin-password").val(aCreds.pass);
          $("#aero-signin-password").attr("class", "form-control aero-main-font-small ng-untouched ng-valid-pattern ng-dirty ng-valid-parse ng-valid ng-valid-required");
          $("#aero-remember-me").prop("checked", true);
          $("#aero-signin-button").prop("disabled", false);
        }
      }
      PopupStateHandler.backgroundView.StorageHelper.getCredentials(credsCallback);
    }
  },

  /**
   * Displays or hides the sign in error message
   * @param aShow whether to show or hide the message
   */
  _showSignInError : function(aShow) {
    var signInError = $("#aero-signin-error");
    if (aShow) {
      $(signInError).show();
    } else {
      $(signInError).hide();
    }
  },

  /**
   * Shows/hides the spinner as needed
   * @param aShow whether to show or hide
   */
  showSpinner : function(aShow) {
    try {
      var formContainer = $("#aero-signin-form-container");
      var spinnerContainer = $("#aero-signin-spinner-container");

      if (aShow) {
        $(formContainer).hide();
        $(spinnerContainer).show();
      } else {
        $(spinnerContainer).hide();
        $(formContainer).show();
      }
    } catch (e) {
      // catching some random error that happens when we hide and show stuff
      console.log(e.stack);
    }
  },

  /**
   * Shows/hides the update spinner as needed
   * @param aShow whether to show or hide
   */
  showUpdateSpinner : function(aShow) {
    var updateSpinner = $(".refresh-button");
    if (aShow) {
      $(updateSpinner).addClass("spinning");
    } else {
      $(updateSpinner).removeClass("spinning");
    }
  },

  /**
   * Populates the packages list
   * @param aListName the list to be populated
   */
  populateListInfo : function(aListName) {
    try {
      var emptyListContainer = $("#aero-" + aListName + "-empty-list");
      var listContainer = $("#aero-" + aListName + "-container");
      var elementsList = $("#aero-" + aListName + "-list");

      var creatingPreAlerts = false;
      var creatingOrders = false;
      var elements = null;
      switch (aListName) {
        case "prealerts":
          creatingPreAlerts = true;
          elements = this.backgroundView.PreAlertService.preAlerts;
        break;
        case "packages":
          elements = this.backgroundView.AccountService.accountPackages;
        break;
        case "orders":
          creatingOrders = true;
          elements = this.backgroundView.AccountService.orders;
          break; 
      }
      if (elements && elements.length > 0) {
        $(emptyListContainer).hide();
        // clear the list
        $(elementsList).empty();
        // fill the list
        for (var i = 0; i < elements.length; i++) {
          var elementInfo = elements[i];
          var elementNode;
          if (creatingPreAlerts) {
            elementNode = this._createPreAlertNode(elementInfo);
          } else if(creatingOrders){
            elementNode = this._createOrderNode(elementInfo);
            $("#aero-packages-empty-list").hide();
            $("#aero-packages-container").show();
          } else {
            elementNode = this._createPackageNode(elementInfo);
          }
          $(elementsList).append(elementNode);
        }
        $(listContainer).show();
      } else {
        $(emptyListContainer).show();
        $(listContainer).hide();
      }
    } catch (e) {
      // catching some random error that happens when we hide and show stuff
      console.log(e.stack);
    }
  },

  /**
   * Populates the shopping cart tab
   */
  populateShoppingCart : function() {
    var cart = this.backgroundView.AccountService.cart;

    var cartContentNode = $("#aero-cart-content");
    var emptyCartContentNode = $("#aero-cart-empty-content");

    var cartHeader = $("#aero-cart-header");
    if (cart != null && cart.shoppingCartProducts != null && cart.shoppingCartProducts.length > 0) {
      // set the header
      $(cartHeader).text($.i18n.getString("mainpanel.cart.pane.cart.header").replace("%S", cart.shoppingCartProducts.length));

      // populate the list
      this._populateShoppingCartProducts(cart.shoppingCartProducts);

      // populate the cart summary
      this._createOrderSummary(cart);

      $(cartContentNode).show();
      $(emptyCartContentNode).hide();
    } else {
      // show empty cart content
      $(cartHeader).text($.i18n.getString("mainpanel.cart.pane.empty.cart.header"));
      $(cartContentNode).hide();
      $(emptyCartContentNode).show();
    }
  },

  /**
   * Populates the list of shopping cart products
   * @param aProductsList the list of products in the shopping cart
   */
  _populateShoppingCartProducts : function(aProductsList) {
    var cartItemListNode = $("#aero-cart-item-list");
    // clear the list
    $(cartItemListNode).empty();

    // fill the list
    for (var i = 0; i < aProductsList.length; i++) {
      var aProduct = aProductsList[i];
      var aProductNode = this._createShoppingCartProductNode(aProduct);
      $(cartItemListNode).append(aProductNode);
    }
  },

  /**
   * Creates a shopping cart product node
   * @param aPackage the product to use to crate the shopping cart product node
   */
  _createShoppingCartProductNode : function(aProduct) {
    //console.log(aProduct);
    var productNode = $("<div class='plugin_cartItem'>" +
      "<div class='col-xs-3 cartItemImageContainer'>" +
        "<span class='thumbProd'><img src='" + aProduct.image + "'/></span>" +
      "</div>" +
      "<div class='col-xs-9'>" +
        "<div class='modalProdInfo'>" +
          "<p class='labelSm'>" + aProduct.title + "</p>" +
          "<p class='labelMd'><strong>" + aProduct.price + "</strong></p>" +
          "<p class='labelXs labelQuantity'>" + $.i18n.getString("mainpanel.cart.pane.product.quantity.label") + aProduct.quantity + "</p>" +
          "<a class='removeproduct' id='" + aProduct.productId + "' href='#'>" + $.i18n.getString("mainpanel.cart.pane.product.remove.label") + "</a>" +
        "</div>" +
      "</div>" +
    "</div>");

    that = this;

    $("[class=removeproduct]", productNode).click(function(event){
        var getCartCallback = function(aResponse) {
          PopupStateHandler.populateShoppingCart();
        }        
        that.backgroundView.AccountService.removeFromCart(aProduct.productId, getCartCallback);
    });
    return productNode;
  },

  /**
   * Creates the order summary nodes from the given cart
   * @param aCart the cart to create the order summary content
   */
  _createOrderSummary : function(aCart) {
    var summaryContainer = $("#plugin_orderSummaryCont");
    $(summaryContainer).empty();

    var summaryNode = "<div class='plugin_SummaryInfo'>" +
      "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-8'>" +
          "<p class='labelSm text-right'>" + $.i18n.getString("mainpanel.cart.pane.subtotal") + "</p>" +
        "</div>" +
        "<div class='col-xs-4'>" +
          "<p class='labelSm text-left'>$" + aCart.subtotal + "</p>" +
        "</div>" +
      "</span>" +
      "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-8'>" +
          "<p class='labelSm text-right'>" + $.i18n.getString("mainpanel.cart.pane.admin.fee") + "</p>" +
        "</div>" +
        "<div class='col-xs-4'>" +
          "<p class='labelSm text-left'>$" + aCart.administrativeFee + "</p>" +
        "</div>" +
      "</span>" +
      "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-8'>" +
          "<p class='labelSm text-right'>" + $.i18n.getString("mainpanel.cart.pane.taxes") + "</p>" +
        "</div>" +
        "<div class='col-xs-4'>" +
          "<p class='labelSm text-left'>$" + aCart.taxes + "</p>" +
        "</div>" +
      "</span>" +
      "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-8'>" +
          "<p class='labelSm text-right'>" + $.i18n.getString("mainpanel.cart.pane.shipping.cost") + "</p>" +
        "</div>" +
        "<div class='col-xs-4'>" +
          "<p class='labelSm text-left'>$" + aCart.shippingQuote + "</p>" +
        "</div>" +
      "</span>";
      if(aCart.multipleItemsShippingDiscount > 0 ){
        summaryNode += "<span class='plugin_summaryItem'>" +
          "<div class='col-xs-8'>" +
            "<p class='labelSm text-right'>" + $.i18n.getString("mainpanel.cart.pane.multiple.prod.discount") + "</p>" +
          "</div>" +
          "<div class='col-xs-4'>" +
            "<p class='labelSm text-left discountSummaryItem'>-$" + aCart.multipleItemsShippingDiscount + "</p>" +
          "</div>" +
        "</span>";
      }
      if(aCart.additionalDiscount > 0 ){
        summaryNode += "<span class='plugin_summaryItem'>" +
          "<div class='col-xs-8'>" +
            "<p class='labelSm text-right'>" + $.i18n.getString("mainpanel.cart.pane.psmt.prod.discount") + "</p>" +
          "</div>" +
          "<div class='col-xs-4'>" +
            "<p class='labelSm text-left discountSummaryItem'>-$" + aCart.additionalDiscount + "</p>" +
          "</div>" +
        "</span>";
      }
      summaryNode += "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-12'>" +
          "<hr style='margin-top: 10px;margin-bottom: 10px;'>" +
        "</div>" +
      "</span>" +
      "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-8'>" +
          "<h3 class='plugHeadingMdBasic text-right'>" + $.i18n.getString("mainpanel.cart.pane.order.total") + "</h3>" +
        "</div>" +
        "<div class='col-xs-4'>" +
          "<h3 class='plugHeadingMdBasicBk text-left'>$" + aCart.totalPrice + "</h3>" +
        "</div>" +
        "<div class='col-xs-8'>" +
          "<p class='labelXs text-right' style='margin:0;'>" + $.i18n.getString("mainpanel.cart.pane.ship.tax.included.label") + "</p>" +
        "</div>" +
        "<div class='col-xs-4'></div>" +
      "</span>" +
      "<span class='plugin_summaryItem'>" +
        "<div class='col-xs-12'><br></div>" +
      "</span>" +
    "</div>";
    $(summaryNode);
    $(summaryContainer).append(summaryNode);
  },

  /**
   * Creates a package node
   * @param aPackage the package to use to crate the package node
   */
  _createPackageNode : function(aPackage) {
    var statusIcon = aPackage.getStatusCodeIcon();
    var date = new Date(aPackage.get("creationDate"));
    var month = date.getMonth() + 1;
    var year = (date.getFullYear() + "").substr(2,4);
    var dateFormat = date.getDate() + "/" + month + "/" + year;
    var packageNode = $("<div class='plugin_panelPackages'>" +
      "<div class='panel panel-default'>" +
      "<div class='panel-heading '>" +
          "<div class='row'>" +
          "<div class='col-xs-2'> <span class='leadXs text-left pull-left'><span class='textXxs'>"+ $.i18n.getString("mainpanel_packages_date_label") +"</span><br>"+dateFormat+"</span></div>" +
            "<div class='col-xs-4'><span class='leadXs text-left pull-left'><span class='textXxs'>"+ $.i18n.getString("mainpanel_packages_tracking_number_label") +"</span><br> " + aPackage.get("aeroTrack") + "</span></div>" +
            "<div class='col-xs-6'><span class='leadXs text-center pull-center'><span class='textXxs'>" + $.i18n.getString("mainpanel.packages.status") + "</span><br> <strong> " + aPackage.get("status") + "</strong></span></div>" +
          "</div>" +
      "</div>" +
        "<div class='panel-body'>" +
          "<div class='plugin_PackageInfo'>" +
            "<div class='plugin_PackageItem'>" +
              "<div class='col-xs-1 col-md-1 imgContainer'>" +
                "<img class='imgStatusPackage aero-package-image-" + statusIcon +"'/>" +
              "</div>" +
              "<div class='col-xs-7 col-md-7'>" +
                "<p class='Package_ItemDesc labelSm text-left'>" +
                  "<span class='packageDesc'>" + aPackage.get("description") + "</span>" +
                  "<br>" +
                "</p>" +
              "</div>" +
              "<div class='col-xs-4 col-md-4 payPackageButton' style='display: none'>" +
                "<button class='btn btn-md btn-primary btn-block'>" + $.i18n.getString("mainpanel.packages.pay.package.button") + "</button>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>");
    $(packageNode).attr("aeroTrack", aPackage.get("aeroTrack"));
    $(packageNode).click(function(event) {
      PopupStateHandler.backgroundView.Background.openPage("package", aPackage.get("aeroTrackUrl"));
      //PopupStateHandler.backgroundView.Background.openPage("package", ConfigSettings.PACKAGE_INFORMATION_URL.replace("%S1", aPackage.get("aeroTrack")));
      PopupStateHandler.backgroundView.AnalyticsApi.push(["click", "package"]);
      });
    return packageNode;
  },

  /**
   * Creates a preAlert node
   * @param aPreAlert the preAlert to use to crate the preAlert node
   */
  _createPreAlertNode : function(aPreAlert) {
    var preAlertNode = $("<div class='plugin_panelPrealert'>" +
      "<div class='panel panel-default'>" +
        "<div class='panel-body'>" +
          "<div class='plugin_PrealertInfo'>" +
            "<div class='plugin_PrealertItem'>" +
              "<div class='col-xs-1 imgContainer'>" +
                "<img class='imgStatusPrealert aero-prealert-image'/>" +
              "</div>" +
              "<div class='col-xs-6'>" +
                "<p class='Prealert_ItemDesc labelSm text-left'>" +
                  "<span class='PrealertDesc'>" + aPreAlert.get("description") + "</span>" +
                  "<br>" +
                  "<span class='Prealert_courierNo'><a class='courierUrl'>" + aPreAlert.get("courierNumber") + "</a></span>" +
                  "<br>" +
                  "<span class='Prealert_Status'><strong>" + aPreAlert.get("courierName") + "</strong></span>" +
                "</p>" +
              "</div>" +
              "<div class='col-xs-4'>" +
                "<button class='btn btn-md btn-primary plugin_BtnClear editPrealert'>" + $.i18n.getString("mainpanel.packages.prealerts.edit.prealert.button") + "</button>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>");

    var courierLink = $(".courierUrl", preAlertNode);
    $(courierLink).attr("courierURL", aPreAlert.get("courierURL"));
    $(courierLink).click(function(event) {
      var courierURL = $(this).attr("courierURL");
      PopupStateHandler.backgroundView.Background.openPage("preAlert", courierURL);
      PopupStateHandler.backgroundView.AnalyticsApi.push(["click", "preAlert"]);
      });

    var editButton = $(".editPrealert", preAlertNode);
    $(editButton).attr("preAlertId", aPreAlert.get("preAlertId"));
    $(editButton).click(function(event) {
      var preAlertId = $(this).attr("preAlertId");
      PopupStateHandler.backgroundView.Background.openPage("editPreAlert", preAlertId);
      PopupStateHandler.backgroundView.AnalyticsApi.push(["click", "editPreAlert"]);
    });
    return preAlertNode;
  },

  /**
   * Creates a preAlert node
   * @param aPreAlert the preAlert to use to crate the preAlert node
   */
  _createOrderNode : function(aOrder) {

    var date = new Date(aOrder.date);
    var month = date.getMonth() + 1;
    var year = (date.getFullYear() + "").substr(2,4);
    var dateFormat = date.getDate() + "/" + month + "/" + year;

    var orderDetailNode = "";
    for (var i = 0; i < aOrder.orderDetails.length; i++) {

      orderDetailNode = orderDetailNode + "<div class='panel-body'>"+
        "<!-- Order -->"+
        "<div class='plugin_OrderInfo'>"+
          "<span class='plugin_OrderItem'>"+
            "<div class='col-xs-1'><div class='aero-order-image-status'></div></div>"+
            "<div class='col-xs-11'><span class='order_ItemDesc labelSm text-left'>"+aOrder.orderDetails[i]+"</span></div>"+
          "</span>"+
          "</div>"+
        "</div>";
    }

    var orderNode = $("<!--Panel Order -->"+
      "<div class='plugin_panelOrders'>"+
        "<div class='panel panel-default OrderOpen'>"+
          "<div class='panel-heading'>"+
                "<div class='row'>"+
              "<div class='col-xs-2'> <span class='leadXs text-left pull-left'><span class='textXxs'>"+ $.i18n.getString("mainpanel_packages_date_label") +"</span><br> "+dateFormat+"</span></div>"+
              "<div class='col-xs-4'><span class='leadXs text-left pull-left'><span class='textXxs'>"+ $.i18n.getString("mainpanel_orders_pane_order_number_label") + "</span><br> " +aOrder.number+"</span></div>"+
              "<div class='col-xs-4'><span class='leadXs text-center pull-center'><span class='textXxs'>" + $.i18n.getString("mainpanel_orders_pane_order_status_label") +"</span><br> <strong>"+ $.i18n.getString("mainpanel_orders_pane_status_"+aOrder.statusId+"")+"</strong></span></div>"+
              "<div class='col-xs-2'><span class='leadXs text-right pull-right'><span class='textXxs'>"+ $.i18n.getString("mainpanel_orders_pane_order_total_label") +"</span><br> $"+aOrder.total+"</span></div>"+
                "</div>"+
          "</div>"+ orderDetailNode + 
            "</div>"+
      "</div>");

    $(orderNode).click(function(event){
      PopupStateHandler.backgroundView.Background.openPage("showOrder", aOrder.number);
      PopupStateHandler.backgroundView.AnalyticsApi.push(["click", "showOrder"]);
    });
    
    
    return orderNode;
  },

  /**
   * Populates the user info in the signed in state
   */
  populateUserInfo : function() {
    // ACCOUNT INFO
    var activeAccount = this.backgroundView.AccountService.activeAccount;
    $("#aero-account-name-value").text(activeAccount.get("clientFullName"));
    var accountNumber =
      activeAccount.get("gateway") + "-" + activeAccount.get("accountNumber");
    $("#aero-account-number-value").text(accountNumber);

    //DELIVERY INFO
    $("#aero-account-counter-value").text(activeAccount.get("delivery"));
    //$("#aero-account-counter-value").html(activeAccount.get("packagesAddressLine1") + "<br>" + activeAccount.get("packagesAddressLine2"));

    // ADDRESS INFO
    $("#aero-account-addresss-value").html(activeAccount.get("userBoxAddressLine1") + "<br>" + activeAccount.get("userBoxAddressLine2"));
    var stateString = activeAccount.get("userBoxAddressCity") + ", " +
                      activeAccount.get("userBoxAddressState") + " " +
                      activeAccount.get("userBoxAddressZipCode");
    $("#aero-account-city-value").text(stateString);
    $("#aero-account-phone-value").text(activeAccount.get("userBoxAddressPhone"));

    // header info
    $("#aero-header-userName").text(activeAccount.get("clientFullName"));
    $("#aero-header-userNo").text(accountNumber);
  },

  /**
   * Processes the calculation response and displays it to the user
   * @param aResponse the response from the calculation process
   */
  calculateCallback : function(aResponse) {
    if (aResponse != null && aResponse.status != null && aResponse.status == 200 && aResponse.results != null) {
      // remove item nodes
      $("#aero-calc-items-container").empty();
      var calcResults = aResponse.results.resultList;
      if (calcResults != null) {
        var totalCost = aResponse.input.declaredValue;
        $("#aero-calc-declared-value").text("$" + Number(totalCost).toFixed(2));
        for (var i = 0; i < calcResults.length ; i++) {
          var item = calcResults[i];
          if (item.lineName == "CIF") {
            $("#aero-calc-cif-value").text("$" + Number(item.lineValue).toFixed(2));
          } else if (item.lineName == "Total Charges") {
            $("#aero-calc-shipping-value").text("$" + Number(item.lineValue).toFixed(2));
            totalCost += item.lineValue;
            $("#aero-calc-total-shipping-value").text("$" + Number(item.lineValue).toFixed(2));
          } else {
            // any other items
            var itemNode = PopupStateHandler._createCalculatorItemNode(item);
            $("#aero-calc-items-container").append(itemNode);
          }
        }
        $("#aero-calc-total-value").text("$" + Number(totalCost).toFixed(2));
        $("#aero-calc-result-container").show();
        $("#aero-calc-form-container").hide();
      }
    }
  },

  /**
   * Created a calculation results item node
   */
  _createCalculatorItemNode : function(aItem) {
    var itemNode = $("<div class='col-xs-12 col-sm-12 col-md-12 resultDiv'>" +
      "<div class='row'>" +
      "<div class='col-xs-7 col-sm-6 col-md-5'><p class='lead-thin headingSm'>" + aItem.lineName + "</p></div>" +
      "<div class='col-xs-5 col-sm-6 col-md-7'><span class='lead-thin'>$" + Number(aItem.lineValue).toFixed(2) + "<span class='smThin'> USD</span></span></div>" +
      "</div></div>");

    return itemNode;
  },

  /**
   * Observes for notifications.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {

    switch(aTopic) {
      case Topics.ACCOUNT_SIGNED_IN:
      case Topics.AEROAPI_ERROR:
      case Topics.INVALID_CLIENT_ERROR:
      case Topics.CLIENT_ALLOW_CHANGE:
        PopupStateHandler._updatePopupState();
        break;
      case Topics.ACCOUNT_SIGN_IN_FAILED:
        PopupStateHandler._updatePopupState();
        PopupStateHandler._showSignInError(true);
        break;
      case Topics.ACCOUNT_SIGNED_OUT:
        PopupStateHandler._updatePopupState();
        PopupStateHandler._clearContents();
        break;
      case Topics.ACCOUNT_SIGNING_IN:
        PopupStateHandler.showSpinner(true);
        break;
      case Topics.UPDATE_STARTED:
        PopupStateHandler.showUpdateSpinner(true);
        break;
      case Topics.UPDATE_FINISHED:
        PopupStateHandler.showUpdateSpinner(false);
        PopupStateHandler.populateListInfo("packages");
        PopupStateHandler.populateListInfo("prealerts");
        PopupStateHandler.populateListInfo("orders");
        break;
      case Topics.CART_UPDATED:
        PopupStateHandler.populateShoppingCart();
        break;
    }
  }
};
(function() { this._init(); }).apply(PopupStateHandler);
