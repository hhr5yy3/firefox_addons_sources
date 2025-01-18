/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

var MainPanel = {

  /* Background View. */
  _backgroundView : null,
  _gateways : ["AXA - Anguilla",
               "ANU - Antigua",
               "AUA - Aruba",
               "BHS - Bahamas",
               "BGI - Barbados",
               "BBQ - Barbuda",
               "BDA - Bermuda",
               "BZE - Belize",
               "BOL - Bolivia",
               "BON - Bonaire",
               "SAO - Brasil",
               "CRU - Carriacau",
               "SCL - Chile",
               "BOG - Colombia",
               "SJO - Costa Rica",
               "CUR - Curacao",
               "DOM - Dominica",
               "ECU - Ecuador",
               "MIA - Estados Unidos",
               "SAL - El Salvador",
               "CAY - French Guiana",
               "GCM - Grand Cayman",
               "GND - Grenada",
               "PTP - Guadeloupe",
               "GUA - Guatemala",
               "GEO - Guyana",
               "PAP - Haiti",
               "SAP - Honduras, San Pedro Sula",
               "TEG - Honduras, Tegucigalpa",
               "KIN - Jamaica",
               "FDF - Martinique",
               "MNI - Montserrat",
               "NEV - Nevis",
               "MGA - Nicaragua",
               "PTY - Panama",
               "LIM - Peru",
               "SDQ - Republica Dominicana",
               "SBH - Saint Barthelemy",
               "STX - Saint Croix",
               "SKB - Saint Kitts",
               "SLU - Saint Lucia",
               "STT - Saint Thomas",
               "SVD - Saint Vincent&Grenadines",
               "SXM - Sint Maarten/Saint Martin",
               "EIS - Tortola / British Virgin Islands",
               "POS - Trinidad&Tobago",
               "CCS - Venezuela",
               "TCA - Turks & Caicos"],

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

  /**
   * Initializes the object.
   */
  init : function() {
    Logger.trace("MainPanel.init");

    var lang = $.i18n.getString("extension.locale.code") == "1" ? "en" : "es";

    $("html").addClass("aero-lang-" + lang);

    // Apply locale to the relevant nodes.
    $("[rel^=i18n],[title^=i18n],[data-val-required^=i18n],[placeholder^=i18n]").i18n({ attributeNames: [ "title", "data-val-required", "placeholder" ] });
    this._populateGateways();
    this._addEventListeners();
    MainPanel.backgroundView.AnalyticsApi.push(["open", "popup"]);
    // force an update every time the popup is opened
    MainPanel.backgroundView.UpdateService.forceUpdate();
  },

  _populateCalcCategories : function(aCategoryList) {
    var categoriesInput = $("#aero-calc-prod-cat");
    if (aCategoryList != null) {
      // remove all options
      $(categoriesInput).find('option').remove();
      var lang = $.i18n.getString("extension.locale.code") == "1" ? "ENG" : "SPA";
      // create select node
      var optionNode = document.createElement("option");
      var optionText = $.i18n.getString("mainpanel.calculator.pane.product.category.select.label");
      $(optionNode).text(optionText.trim());
      $(optionNode).appendTo(categoriesInput);

      for (var i = 0; i < aCategoryList.length; i++) {
        var category = aCategoryList[i];
        var optionNode = document.createElement("option");
        $(optionNode).attr("value", category.flexibleName);
        var optionText = category["flexibleName" + lang] + " - (" + category["totalTax"] + "%)";
        $(optionNode).text(optionText.trim());

        $(optionNode).appendTo(categoriesInput);
      }
    }
  },

  _populateCalcAccountTypes : function(aAccountTypesList) {
    var accountTypesInput = $("#aero-calc-prod-account-type");
    if (aAccountTypesList != null) {
      // remove all options
      $(accountTypesInput).find('option').remove();
      // create select node
      var optionNode = document.createElement("option");
      var optionText = $.i18n.getString("mainpanel.calculator.pane.product.account.type.select.label");
      $(optionNode).text(optionText.trim());
      $(optionNode).appendTo(accountTypesInput);

      for (var i = 0; i < aAccountTypesList.length; i++) {
        var accountType = aAccountTypesList[i];
        var optionNode = document.createElement("option");
        $(optionNode).attr("value", accountType.code);
        var optionText = accountType.name;
        $(optionNode).text(optionText.trim());

        $(optionNode).appendTo(accountTypesInput);
      }
    }
  },

  _populateGateways : function() {

    var lang = $.i18n.getString("extension.locale.code") == "1" ? "en" : "es";

    var countryInput = $("#aero-signin-country");

    var optionNode = document.createElement("option");
    $(optionNode).attr("value", "-1");
    $(optionNode).text($.i18n.getString("mainpanel_signin_pick_country_option"));
    $(optionNode).appendTo(countryInput);

    var loadCountriesDataCallback = function(aResponse) {
     
      var countryInput = $("#aero-signin-country");

      for (var i = 0; i < aResponse.countries.length; i++) {
        var country = aResponse.countries[i];
        var code = country.gateway;
        var optionNode = document.createElement("option");
        $(optionNode).attr("value", code);
        var text =  navigator.language == "en" ?  country.nameEnglish : country.nameSpanish;
        $(optionNode).text(text);

        $(optionNode).appendTo(countryInput);
      }
    };


    MainPanel.backgroundView.AccountService.getCountries(loadCountriesDataCallback, lang);

  },

  _addEventListeners : function() {
    // main tab click listener
    $('.aero-tab-list a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
      // IF THE CALCULATOR TAB IS SELECTED, LOAD THE CATEGORIES AND ACCOUNT TYPES
      var selectedTab = $(this).attr("href");
      if (selectedTab == "#aero-calculator-pane") {
        var loadCalculatorDataCallback = function(aResponse) {
          if (aResponse.categories != null) {
            MainPanel._populateCalcCategories(aResponse.categories);
          }

          if (aResponse.accountTypes != null) {
            MainPanel._populateCalcAccountTypes(aResponse.accountTypes);
          }
        };
        MainPanel.backgroundView.AccountService.loadCalculatorData(loadCalculatorDataCallback);
      }
      MainPanel.backgroundView.AnalyticsApi.push(["click", selectedTab]);
    });

    // packages tab click listener
    $('.aero-packages-tab-list a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
      // IF THE CALCULATOR TAB IS SELECTED, LOAD THE CATEGORIES AND ACCOUNT TYPES
      var selectedTab = $(this).attr("href");
      MainPanel.backgroundView.AnalyticsApi.push(["click", selectedTab]);
    });
    // listens to submit button actions
    $("#aero-signin-form").submit(function(e) {
      e.preventDefault();
      var countryValue = $("#aero-signin-country").val();
      var accountValue = $("#aero-signin-account").val();
      var passValue = $("#aero-signin-password").val();
      //passValue = CryptoJS.MD5(passValue).toString();
      var rememberValue = $("#aero-remember-me").is(":checked");
      var creds = {
        gateway : countryValue,
        account : accountValue,
        password : passValue,
        remember : rememberValue
      };

      MainPanel.backgroundView.ObserverHelper.notify(Topics.ACCOUNT_SIGNING_IN, null);
      MainPanel.backgroundView.AccountService.validate(creds);
      MainPanel.backgroundView.AnalyticsApi.push(["click", "sign-in-button"]);
      return false;
    });

    $("#aero-signin-forgot-password").click(function() {
      MainPanel.backgroundView.Background.openPage("forgotPassword");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "forgot-password-link"]);
    });
    $(".aero-main-logo").click(function() {
      MainPanel.backgroundView.Background.openPage("homepage");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "main-logo"]);
    });
    $("#aero-go-to-site-button").click(function() {
      MainPanel.backgroundView.Background.openPage("homepage");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "cart-homepage-button"]);
    });

    //Order list
    $("#aero-go-to-order-list-button").click(function() {
      MainPanel.backgroundView.Background.openPage("orderList");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "order-list-button"]);
    });
    
    // listens to logout link actions
    $("#aero-sign-out-button").click(function() {
      MainPanel.backgroundView.AccountService.signOut();
      MainPanel.backgroundView.AnalyticsApi.push(["click", "sign-out-button"]);
    });
    $(".aero-fill-form-button").click(function() {
      MainPanel.backgroundView.Background.fillAddress();
      MainPanel.backgroundView.AnalyticsApi.push(["click", "autocomplete-button"]);
    });

    $(".refresh-button").click(function() {
      MainPanel.backgroundView.UpdateService.forceUpdate();
      MainPanel.backgroundView.AnalyticsApi.push(["click", "update-button"]);
      });
    $("#aero-feedback-form").submit(function(e){
      MainPanel.backgroundView.AnalyticsApi.push(["click", "send-feedback"]);
      e.preventDefault();
      if ($("#aero-feedback-comment").val().length > 0) {
        // show sending feedback notification
        MainPanel.backgroundView.Background.showFeedbackNotification("start");

        // populate hidden fields
        var activeAccount = MainPanel.backgroundView.AccountService.activeAccount;
        $("#aero-feedback-account-number").val(activeAccount.get("accountNumber"));
        $("#aero-feedback-gateway").val(activeAccount.get("gateway"));
        $("#aero-feedback-email").val(activeAccount.get("clientEmail"));
        $("#aero-feedback-app-version").val(UtilityHelper.extensionVersion);
        $("#aero-feedback-app-name").val(UtilityHelper.appName);
        $("#aero-feedback-so-name").val(UtilityHelper.OSName);
        $("#aero-feedback-so-version").val(UtilityHelper.OSVersion);

        //form.submit(); // submit bypassing the jQuery bound event
        //grab all form data
        var form = $(this);
        var formData = new FormData(form[0]);

        $.ajax({
            url: ConfigSettings.FEEDBACK_URL,
            type: 'POST',
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false
          }).done(function() {
            // show success notification
            MainPanel.backgroundView.Background.showFeedbackNotification("success");
            // clear form
            $("#aero-feedback-form")[0].reset();
          }).fail(function() {
            // show error notification
            // the cross origin error shows up, but we can't add a non https
            // site to the content security policy
            MainPanel.backgroundView.Background.showFeedbackNotification("success");
            // clear form
            $("#aero-feedback-form")[0].reset();
          });
      }
      return false;

      });
    $("#aero-account-edit-profile, #aero-account-edit-address, #aero-account-edit-payment").click(function() {
      MainPanel.backgroundView.Background.openPage("profile");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "profile-edit-link"]);
      });
    $("#aero-checkout-button").click(function() {
      MainPanel.backgroundView.Background.openPage("checkout");
      //MainPanel.backgroundView.Background.openPage("continue-checkout");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "checkout-button"]);
    });
    $("#aero-calc-form").submit(function(e){
      MainPanel.backgroundView.AnalyticsApi.push(["click", "calculate"]);
      e.preventDefault();

      //grab all form data
      var formData = $(this).serializeArray();
      //console.log(formData);

      var formDataObj = {};
      // convert form array to object
      for (var i = 0; i < formData.length; i++) {
        var field = formData[i];
        formDataObj[field.name] = field.value;
      }

      MainPanel.backgroundView.AccountService.calculate(formDataObj, PopupStateHandler.calculateCallback);

      return false;

    });

    $("#aero-calc-restart-button").click(function() {
      $("#aero-calc-form")[0].reset();
      $("#aero-calc-result-container").hide();
      $("#aero-calc-form-container").show();

    });

    $("#aero-calc-edit-button").click(function() {
      $("#aero-calc-result-container").hide();
      $("#aero-calc-form-container").show();
    });

    $("#aero-new-prealert-button").click(function() {
      MainPanel.backgroundView.Background.openPage("newPreAlert");
      MainPanel.backgroundView.AnalyticsApi.push(["click", "new-prealert-button"]);
    });
  },

  /**
   * Unitializes the object.
   */
  uninit : function() {
    Logger.trace("MainPanel.uninit");
    MainPanel.backgroundView.AnalyticsApi.push(["close", "popup"]);
    PopupStateHandler._uninit();
  }
};

$(document).ready(function() { MainPanel.init(); });
$(window).on("unload", function(e) { MainPanel.uninit(); });
