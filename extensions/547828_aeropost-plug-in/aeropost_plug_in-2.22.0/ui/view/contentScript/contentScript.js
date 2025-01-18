/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Content script class.
 */
var ContentScript = {
  _siteList : null,
  _accountInfo : null,
  _checkRecipient : false,
  _page : null,
  _showGuide : true,
  _mutationObserver: null,
  _amazonObserverRoot: ".a-fixed-right-grid-col.a-col-left",

  COLORBOX_WIDTH: 700,

  EMPTY_IMAGE_DATA : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAiAMIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z",

  /**
   * Initializes the object.
   */
  init : function() {
    var that = this;

    $(document).ready(function() {
      //TOP BAR effect
      $(window).bind('scroll', function() {
        if($(window).scrollTop() > 200){
          if($(".barNotification").hasClass("barLeftViewPrice")){
            $(".barNotification").attr("class", "barNotification barLeftViewPrice barOn");
          } else {
            $(".barNotification").attr("class", "barNotification barLeft barOn");
          }
          $("#allInclusiveBarId").hide();
          $("#chevronBar").attr("class", "chevronBarRight");
          $("#chevronBar").show();
        } else{
          $("#barLeftViewID").remove();
          $(".barNotification").attr("class", "barNotification");
          $("#chevronBar").hide();
          setTimeout("", 1000);
          $("#allInclusiveBarId").show();
        }
      });

      chrome.runtime.sendMessage({message: "processPage"}, function(response) {
        if (response.signedIn && response.clientAllowed) {
          ContentScript._accountInfo = response.signedIn;
          ContentScript._checkRecipient = response.checkRecipient;
          var firstRunColorboxArray = response.firstRunColorboxArray;
          var url = location.href.toLowerCase();
          var injectPrealertColorbox = false;
          if (url.indexOf("amazon") != -1 &&
              url.indexOf("order-history") != -1 &&
              url.indexOf("signin") == -1 &&
              url.indexOf("ap-prefetch-iframe.html") == -1) {
            injectPrealertColorbox = true;
            var oldFormat = $(".order-info").length > 0;
            var newFormat = $(".order-card").length > 0;
            if (oldFormat) {
              AmazonContentScript.modifyAmazonOrdersPage();
            } else if (newFormat) {
              AmazonContentScript.modifyAmazonNewOrdersPage();
            }
            if (firstRunColorboxArray[0]) {
              ContentScript._page = "amazon";
            }
          } else if (url.indexOf("amazon") != -1 &&
              url.indexOf("summary/edit.html") != -1 &&
              url.indexOf("signin") == -1) {
            injectPrealertColorbox = true;
            AmazonContentScript.modifyAmazonOrderDetailsPage();
            if (firstRunColorboxArray[1]) {
              ContentScript._page = "amazonDetails";
            }
          } else if (url.indexOf("amazon") != -1 &&
              url.indexOf("shiptrack/view.html") != -1 &&
              url.indexOf("signin") == -1) {
            injectPrealertColorbox = true;
            AmazonContentScript.modifyAmazonTrackOrderPage();
            if (firstRunColorboxArray[1]) {
              ContentScript._page = "amazonDetails";
            }
          } else if (url.indexOf("amazon") != -1 &&
              url.indexOf("order-details") != -1 &&
              url.indexOf("signin") == -1) {
            injectPrealertColorbox = true;
            var oldFormat = $("a[name^='shipped-items']").length > 0;
            var newFormat = $("#orderDetails").length > 0;
            if (oldFormat) {
              AmazonContentScript.modifyAmazonOrderDetailsPage();
            } else if (newFormat) {
              AmazonContentScript.modifyAmazonNewOrderDetailsPage();
            }
            if (firstRunColorboxArray[1]) {
              ContentScript._page = "amazonDetails";
            }
          } else if (url.indexOf("amazon") != -1 &&
              url.indexOf("gp/buy/") != -1 &&
              url.indexOf("signin") == -1) {
              var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

              var shippingNode = document.querySelector(ContentScript._amazonObserverRoot);

              ContentScript._mutationObserver = new MutationObserver(function() {
                AmazonContentScript.handleCheckout();
              });

              ContentScript._mutationObserver.observe(shippingNode, {
                attributes: true,
                childList: true,
                characterData: true
              });
              AmazonContentScript.handleCheckout();
          } else if(url.indexOf("ebay") != -1 &&
              url.indexOf("fetchorderdetails") != -1 &&
              url.indexOf("signin.ebay.com") == -1) {
            injectPrealertColorbox = true;
            EbayContentScript.modifyeBayOrderDetailsPage();
            if (firstRunColorboxArray[3]) {
              ContentScript._page = "ebayDetails";
            }
          } else if((url.indexOf("my.ebay") != -1 ||
                    (url.indexOf("www.ebay") != -1 &&
                     url.indexOf("purchasehistory") != -1) ||
                    url.indexOf("summary") != -1) &&
                    url.indexOf("signin.ebay.com") == -1) {
            injectPrealertColorbox = true;
            // work in all my eBay pages
            EbayContentScript.modifyeBayOrdersPage();
            if (firstRunColorboxArray[2]) {
              ContentScript._page = "ebay";
            }
          } else if(url.indexOf("rakuten") != -1 &&
              url.indexOf("orderhistory") != -1) {
            injectPrealertColorbox = true;
            RakutenContentScript.modifyRakutenOrdersPage();
            if (firstRunColorboxArray[4]) {
              ContentScript._page = "rakuten";
            }
          } else if(url.indexOf("aeropostale") != -1 &&
              url.indexOf("ordertrackingdetail") != -1) {
            injectPrealertColorbox = true;
            AeropostaleContentScript.modifyAeropostaleOrderDetailsPage();
            if (firstRunColorboxArray[6]) {
              ContentScript._page = "aeropostaleDetails";
            }
          } else if(url.indexOf("aeropostale") != -1 &&
              url.indexOf("ordertracking") != -1) {
            injectPrealertColorbox = true;
            AeropostaleContentScript.modifyAeropostaleOrdersPage();
            if (firstRunColorboxArray[5]) {
              ContentScript._page = "aeropostale";
            }
          } else if(url.indexOf("forever21") != -1 &&
              url.indexOf("pastorders") != -1) {
            /*injectColorbox = true;
            that._modifyForever21OrdersPage();
            if (firstRunColorboxArray[7]) {
              ContentScript._page = "forever21";
            }*/
          } else if(url.indexOf("forever21") != -1 &&
              url.indexOf("vieworder") != -1) {
            injectPrealertColorbox = true;
            Forever21ContentScript.modifyForever21OrderDetailsPage();
            if (firstRunColorboxArray[8]) {
              ContentScript._page = "forever21Details";
            }
          } else if (url.indexOf("amazon") != -1 &&
                     (url.indexOf("/dp/") != -1 || url.indexOf("/gp/product") != -1)) { // amazon pdp to quote
            
            if(ContentScript._accountInfo.gateway.toLowerCase() != "ccs"){
              ContentScript._loadingPrice();
              AmazonContentScript.injectAmazonScript();
            }
          } else if(url.indexOf("login.aeropost.com") != -1) {
            ContentScript._injectAutoCompleteLoginForm();
          } else {
            // check if a potential address page and fill it
            that.checkPage();
          }
          if (injectPrealertColorbox) {
            var existingColorBox = $("#aero-colorbox-container");
            if(existingColorBox.length == 0){
              that._injectPrealertColorbox();
            }
            var existingColorBoxPostalert = $("#aero-colorbox-container-postalert");
            if(existingColorBoxPostalert.length == 0){
              that._injectPostalertColorbox();
            }
          }
        }
      });
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          var info = request.info;
          switch (request.message) {
            case "fillAddress":
              that._modifyAddressPage(info);
              break;
            case "checkedPreAlert":
              var targetButton = $("[buttonId='aero-prealert-" + info.courierNumber + (info.orderIndex != null ? "-" + info.orderIndex : "") + "']");
              $(targetButton).removeClass("loading");
              if(info.errorCode){
                if(info.errorCode == "addressPackage" || info.errorCode == "addressAcct" || info.errorCode == "getAccountPrealerts"){
                    $(targetButton).addClass("disabled");
                    $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
                    $(targetButton).removeClass("cboxElement");
                }else{
                  if(info.errorCode == "packageReceived"){
                    
                        var invoiceUrl = info.invoiceUrl;
                        var firstItemDescription = info.firstItemDescription;
                        var storedInvoice = info.storedInvoice;
                        if (storedInvoice.length == 0) {
                          // if the package hasn't been prealerted and the invoiceUrl
                          // and item description are present, get the invoiceHtml
                          if (invoiceUrl && firstItemDescription) {
                            ContentScript._loadOrderInvoice(info.courierNumber, invoiceUrl, firstItemDescription, info.shipper, info.orderIndex);
                          } else {
                            if (info.generateInvoice) {
                              // this means we should have had the info to load the order
                              // invoice but we didn't
                              // notify sentry that we couldn't load the invoice due to missing data
                              chrome.runtime.sendMessage({message: "reportError",
                                                          error : {
                                                            message: "Unable to load order invoice due to missing data.",
                                                            extra : {
                                                              invoiceUrl: invoiceUrl,
                                                              firstItemDescription: firstItemDescription,
                                                              courierNumber: info.courierNumber,
                                                              shipper : info.shipper
                                                            }
                                                          }
                                                          }, function(response) {
                              });
                            }
                          }
                        } else {
                          // get value from stored invoice and update the button info
                          // this is for orders using gift cards
                          var storedInvoice = JSON.parse(storedInvoice);
                          if (firstItemDescription) {
                            ContentScript._checkInvoiceForGiftCards(
                              storedInvoice.invoiceHtml, firstItemDescription, info.courierNumber, info.orderIndex);
                          }
                        }
                        if (ContentScript._showGuide && ContentScript._page) {
                          ContentScript._showGuide = false;
                          ContentScript._showFirstRunGuide(targetButton, ContentScript._page);
                        }
                        if ($(targetButton).attr("packageinfo") != undefined) {
                          $(targetButton).removeClass("disabled");
                          $(targetButton).addClass("aero-amazon-button");
                          $(targetButton).addClass("prealertButton");
                          $(targetButton).addClass("cboxElement");
                          $(targetButton).attr("href", "#aero-inline-content-postalert");
                          $(targetButton).attr("mia", info.mia);
                          var preAlertInfo = JSON.parse($(targetButton).attr("packageinfo"));
                          preAlertInfo.mia = info.mia;
                          $(targetButton).attr("packageinfo", JSON.stringify(preAlertInfo));
                          $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_postAlert_label"));
                        }
                    
                   
                  } else if (info.errorCode == "postAlertReceived") {
                    if (targetButton.length == 1) {
                      $(targetButton).addClass("disabled");
                      $(targetButton).removeClass("cboxElement");
                      $(targetButton).replaceWith(ContentScript._createPackageButton(info));
                    }
                  } else {
                    if (info.errorCode == "prealertedTracking") {
                      $(targetButton).addClass("disabled");
                      $(targetButton).addClass("aero-injected-button");
                      $(targetButton).removeClass("cboxElement");
                      $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_prealerted_label"));
                    }else{
                      //for unknown error code
                      // now we show the NOT PREALERTABLE button
                      $(targetButton).addClass("disabled");
                      $(targetButton).addClass("aero-injected-button");
                      $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
                      $(targetButton).removeClass("cboxElement");
                    }
                  }
                }
              }else{
                if (!info.preAlerted) {
                  //if (false) {
                  if (info.delivered == "true") {
                    // in this case, we remove the button because the package is
                    // already delivered but the user didn't prealert it and wasn't
                    // handled by Aeropost
                    //$(targetButton).remove();
                    // now we show the NOT PREALERTABLE button
                    $(targetButton).addClass("disabled");
                    $(targetButton).addClass("aero-injected-button");
                    $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
                    $(targetButton).removeClass("cboxElement");
                  }else{
                    if (info.mia) {
                      
                      //package mia
                      $(targetButton).addClass("disabled");
                      $(targetButton).removeClass("cboxElement");
                      $(targetButton).replaceWith(ContentScript._createPackageButton(info));

                    }else {

                      //add button prealert style
                      $(targetButton).removeClass("disabled");
                      $(targetButton).addClass("aero-injected-button");
                      $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_preAlert_label"));
                      $(targetButton).addClass("cboxElement");
                      $(targetButton).attr("href", "#aero-inline-content");

                      var invoiceUrl = info.invoiceUrl;
                      var firstItemDescription = info.firstItemDescription;
                      var storedInvoice = info.storedInvoice;
                      if (storedInvoice.length == 0) {
                          // if the package hasn't been prealerted and the invoiceUrl
                          // and item description are present, get the invoiceHtml
                          if (invoiceUrl && firstItemDescription) {
                              ContentScript._loadOrderInvoice(info.courierNumber, invoiceUrl, firstItemDescription, info.shipper, info.orderIndex);
                          } else {
                              if (info.generateInvoice) {
                                // this means we should have had the info to load the order
                                // invoice but we didn't
                                // notify sentry that we couldn't load the invoice due to missing data
                                chrome.runtime.sendMessage({message: "reportError",
                                                            error : {
                                                              message: "Unable to load order invoice due to missing data.",
                                                              extra : {
                                                                invoiceUrl: invoiceUrl,
                                                                firstItemDescription: firstItemDescription,
                                                                courierNumber: info.courierNumber,
                                                                shipper : info.shipper
                                                              }
                                                            }
                                                            }, function(response) {
                                });
                              }
                          }
                        }else {
                            // get value from stored invoice and update the button info
                            // this is for orders using gift cards
                            /*var storedInvoice = JSON.parse(storedInvoice);
                            if (firstItemDescription) {
                                ContentScript._checkInvoiceForGiftCards(
                                  storedInvoice.invoiceHtml, firstItemDescription, info.courierNumber, info.orderIndex);
                            }*/
                        }
                        if (ContentScript._showGuide && ContentScript._page) {
                          ContentScript._showGuide = false;
                          ContentScript._showFirstRunGuide(targetButton, ContentScript._page);
                        }
                      }
                    }
                }else{
                  $(targetButton).addClass("disabled");
                  $(targetButton).addClass("aero-injected-button");
                  $(targetButton).removeClass("cboxElement");
                  $("#aero-injected-button-text", targetButton).text(chrome.i18n.getMessage("content_script_button_prealerted_label"));
                }
              }
              break;
            case "removeInjectedButtons":
              $("div[class~='aero-injected-button']").remove();
              break;
          }
        });
    });
  },

  _getElementByXpath : function(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  },

  /**
   * Injects the autocomplete button
   */
  _injectAutoComplete : function() {
    if (ContentScript._siteList && ContentScript._siteList.length > 0) {
      for (var i = 0; i < ContentScript._siteList.length; i++) {
        var site = ContentScript._siteList[i];
        var containerPath = site.siteContainer;
        var anchorContainer = ContentScript._getElementByXpath(containerPath);
        var existingButton = $("[class~='autofillButton']");

        if (anchorContainer && existingButton.length == 0) {
          var button = ContentScript._createButton("autofill");
          $(button).addClass("autofillButton");
          $(button).insertBefore($(anchorContainer));
          $(button).click(function(event) {
            var info = {};
            info.siteList = ContentScript._siteList;
            info.addressInfo = ContentScript._accountInfo;
            ContentScript._modifyAddressPage(info);
            chrome.runtime.sendMessage({message: "autocompleteClicked"}, function(response) {

            });
            });
        }
      }
    }
  },

  /**
   * Shows the first run colorbox that will be displayed on the supported pages
   * the first time they are opened
   * @param aTargetButton the target button to link the guide to
   * @param aPage the page for which the colorbox will be displayed
   */
  _showFirstRunGuide : function(aTargetButton, aPage) {

    var floatingDiv = "<div class='col-xs-12 col-sm-12 col-md-12 aero-first-run-guide'>" +
      "<p class='text-center'>" +
        "<img />" +
      "</p>" +
      "<p class='leadBlue text-center'>" + chrome.i18n.getMessage("content_script_first_run_colorbox_msg") + "</p>" +
      "<p class='text-center'>" +
        "<a id='aero-colorbox-first-run-link'>" + chrome.i18n.getMessage("content_script_first_run_colorbox_hide") + "</a>" +
      "</p>" +
    "</div>";

    $(aTargetButton).popover({placement : "right",
                           html : "true",
                           content : floatingDiv});

    $(aTargetButton).appear();
    $(aTargetButton).on('appear', function(event, $all_appeared_elements) {
      // this element is now inside browser viewport
      if ($(aTargetButton).next('div.popover:visible').length == 0){
        $(aTargetButton).popover("show");
        $("#aero-colorbox-first-run-link").click(function(event) {
          $(aTargetButton).popover("destroy");
          chrome.runtime.sendMessage({message: "stopShowingGuide",
                                      page: aPage}, function(response) {
            });
        });
      }
    });

    $("body").click(function(event) {
      $(aTargetButton).popover("destroy");
    });
  },

  /**
   * Injects the colorbox for eventual use when the user clicks the prealert
   * button
   */
  _injectPrealertColorbox : function() {
    var colorBoxContent = 
      "<div  id='aero-colorbox-container' style='display:none'>" +
        "<div id='aero-inline-content' style='display:block; width:100%; padding:0;'>" +
          "<div style='display:block; width:100%;'>" +
            "<h2 class='plugHeadingMd' style='padding: 0 15px;'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_title") + "</h2>" +
            "<p class='confirmation-lead' style='padding: 0 15px;'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_confirm_label") + "</p>";

    if (ContentScript._accountInfo.gateway.toLowerCase() == "sjo") {
      var locale = ContentScript._accountInfo.language == "1" ? "en" : "es";
      var urlMyAccount = chrome.i18n.getMessage("content_script_prealert_go_to_my_account_url").replace("%S1", locale);
      var url = location.href.toLowerCase();
      width = "100%;";
      if (url.indexOf("ebay") != -1){
        width = "530px;"
      }
      /*colorBoxContent +=    
          "<div style='display:block; width:"+width+" padding: 0 35px; margin-bottom:15px;'>"+
          "<div style='padding: .75rem 1.25rem; margin-bottom: 1rem; border: 1px solid transparent; border-radius: .25rem; background-color: #fcf8e3; border-color: #faf2cc; color: #8a6d3b;'>"+
          "<div style='display:block; width:100%; padding: 0;'>"+
          "<div style='width:75px; float:left;''><div class='alertPrealertIcon'><span>!</span></div></div>"+
          "<div style='width:425px; margin-left:75px; text-align:left;'>"+
          "<div style='font-size:16px; text-align:left;'>" + chrome.i18n.getMessage("content_script_prealert_go_to_my_account_exemption") + "</div></div></div>"+
          "<div style='display:block; width:100%; padding: 0; text-align:center; margin-top:10px;'>"+
          "<a type='button' href='" + urlMyAccount + "' class='btn btn-block btn-prealert-aeropost-external'>" + chrome.i18n.getMessage("content_script_prealert_go_to_my_account_exemption_cta") + "</a></div></div></div>";*/
    }
            

    colorBoxContent +=
            "<p class='confirmation-lead' style='padding: 0 15px;'><strong>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_account_label") + "</strong> <span id='aero-colorbox-account'></span></p>" +
          "</div>" +
          "<div style='display:block; width:100%; min-height:200px;'>" +
            "<div style='display:inline-block; width:255px; padding-left:15px; float:left;'>" +
              "<div class='panel panel-default' '>" +
                "<div class='panel-heading'>" +
                  "<span><strong>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_carrier_information_title") + "</strong></span>" +
                "</div>" +
                "<div class='panel-body'>" +
                  "<p><strong id='aero-colorbox-carrier-title'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_carrier_name_label") + "</strong> <span id='aero-colorbox-carrier'></span></p>" +
                  "<p><strong id='aero-colorbox-tracking-title'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_tracking_number_label") + "</strong> <span id='aero-colorbox-tracking'></span></p>" +
                "</div>" +
              "</div>" +
            "</div>" +
            "<div style='display:inline-block; width:300px; padding-left:15px;'>" +
              "<div class='panel panel-default' >" +
                "<div class='panel-heading'>" +
                  "<span><strong>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_package_information_title") + "</strong></span>" +
                "</div>" +
                "<div class='panel-body'>" +
                  "<p><strong id='aero-colorbox-description-title'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_description_label") + "</strong> <span id='aero-colorbox-description'></span></p>" +
                  "<p><strong id='aero-colorbox-value-title'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_value_label") + "</strong> <span id='aero-colorbox-value'></span> <input id='aero-prealert-value' class='form-control' required='' type='number'></p>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          "<div style='display:block; width:100%;'>" +
            "<br><hr>" +
            "<div class='aero-colorbox-error-msg'>" +
              "<span>" + chrome.i18n.getMessage("content_script_prealert_confirmation_missing_data_label") + "</span>" +
            "</div>" +
          "</div>" +
          "<div style='display:block; width:100%; text-align:center;'>" +
            "<div style='display:inline-block; width:200px; margin-right:10px;'>" +
              "<button id='aero-colorbox-cancel' type='button' class='btn btn-block aero-injected-button-clear'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_cancel_button") + "</button>"+
            "</div>" +
            "<div style='display:inline-block; width:200px; margin-left:10px;'>" +
              "<button id='aero-colorbox-prealert' type='button' class='btn btn-block aero-injected-button'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_prealert_button") + "</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    var colorBoxNode = $(colorBoxContent);
    $("body").append(colorBoxNode);

    // add click listeners
    $("#aero-colorbox-prealert").click(function(event) {
      var preAlertInfo = $("#aero-colorbox-container").attr("preAlertInfo");
      if (preAlertInfo && preAlertInfo.length > 0) {
        preAlertInfo = JSON.parse(preAlertInfo);
        var prealertValue = $("#aero-prealert-value").val();
       
        var showMissingData = false;
        if (!preAlertInfo.value || Number(preAlertInfo.value) <= 0) {
          if(prealertValue || Number(preAlertInfo.value) > 0){
            $("#aero-colorbox-value-title").css("color", "black");
            preAlertInfo.value = prealertValue;
          }else{
            showMissingData = true;
            $("#aero-colorbox-value-title").css("color", "red");
          }
        } else {
          $("#aero-colorbox-value-title").css("color", "black");
        }

        if (!preAlertInfo.courierName) {
          showMissingData = true;
          $("#aero-colorbox-carrier-title").css("color", "red");
        } else {
          $("#aero-colorbox-carrier-title").css("color", "black");
        }

        if (!preAlertInfo.courierNumber) {
          showMissingData = true;
          $("#aero-colorbox-tracking-title").css("color", "red");
        } else {
          $("#aero-colorbox-tracking-title").css("color", "black");
        }

        if (!preAlertInfo.packageDescription) {
          showMissingData = true;
          $("#aero-colorbox-description-title").css("color", "red");
        } else {
          $("#aero-colorbox-description-title").css("color", "black");
        }

        if (showMissingData) {
          $("[class='aero-colorbox-error-msg']").show();
          $.colorbox.resize();
        } else {
          $.colorbox.close();
          $("#aero-prealert-value").val("");
          chrome.runtime.sendMessage({message: "preAlert", packageInfo : preAlertInfo}, function(response) {
            //console.log(response.processed);
          });
        }

      }
      });
    $("#aero-colorbox-cancel").click(function(event) {
      $.colorbox.close();
      $("#aero-prealert-value").val("");
      chrome.runtime.sendMessage({message: "preAlertCanceled"}, function(response) {

      });
      });
  },

  /**
   * Generates the button to be injected in the pages
   * @param aType the type of button to be injected
   * @return the button to be injected
   */
  _createButton : function(aType) {
    var button = $("<button type='button' class='btn aero-injected-button loading'>" +
        "<img />" +
        "<span id='aero-injected-button-text'>" + chrome.i18n.getMessage("content_script_button_" + aType + "_label") + "</span>" +
      "</button>");
    if (aType == "preAlert") {
      $(button).attr("href", "#aero-inline-content");
    }
    return button;
  },

  /**
   * Generates the received package button
   * @return the button to be injected
   */
  _createPackageButton : function(aMIA) {
    //outer div
    var button = $("<button type='button' class='btn aero-injected-button'>" +
      "<img />" +
      "<span id='aero-injected-button-text'>" + chrome.i18n.getMessage("content_script_received_label") + aMIA.mia + "</span>" +
      "</button>");

    var url = location.href.toLowerCase();
    if (url.indexOf("amazon") != -1 &&
        url.indexOf("order-history") != -1) {
      $(button).addClass("aero-amazon-button");
    } else if (url.indexOf("amazon") != -1 &&
               url.indexOf("summary/edit.html") != -1) {
      $(button).addClass("aero-amazon-order-details-button");
    } else if (url.indexOf("amazon") != -1 &&
               url.indexOf("order-details") != -1) {
      $(button).addClass("aero-amazon-order-details-button");
    } else if(url.indexOf("ebay") != -1 &&
              url.indexOf("fetchorderdetails") != -1) {
      $(button).addClass("aero-ebay-order-details-button");
    } else if(url.indexOf("my.ebay") != -1 ||
              (url.indexOf("www.ebay") != -1 &&
               url.indexOf("purchasehistory") != -1) ||
              url.indexOf("summary") != -1) {
      $(button).addClass("aero-ebay-order-list-button");
    } else if(url.indexOf("rakuten") != -1 &&
        url.indexOf("orderhistory") != -1) {
      $(button).addClass("aero-rakuten-order-list-button");
    } else if(url.indexOf("aeropostale") != -1 &&
      url.indexOf("ordertrackingdetail") != -1) {
      $(button).addClass("aero-aeropostale-order-details-button");
    } else if(url.indexOf("aeropostale") != -1 &&
      url.indexOf("ordertracking") != -1) {
      $(button).addClass("aero-aeropostale-order-list-button");
    } else if(url.indexOf("forever21") != -1 &&
      url.indexOf("pastorders") != -1) {
      $(button).addClass("aero-forever21-order-list-button");
    } else if(url.indexOf("forever21") != -1 &&
      url.indexOf("vieworder") != -1) {
      $(button).addClass("aero-forever21-order-details-button");
    }

    $(button).attr("mia", aMIA.mia);
    $(button).attr("packageInfo", JSON.stringify(aMIA));
    $(button).click(function(event) {
      var packageInfo = JSON.parse($(this).attr("packageInfo"));
      chrome.runtime.sendMessage({message: "viewPackage", packageInfo : packageInfo}, function(response) {

        });
      });

    return button;
  },

  /**
   * Populates the confirmation colorbox
   * @param aInfoObj an object with the information for the prealert to be confirmed
   */
  _populateConfirmation : function(aInfoObj) {
    if (aInfoObj) {
      $("#aero-colorbox-carrier").text(aInfoObj.courierName);
      $("#aero-colorbox-tracking").text(aInfoObj.courierNumber);
      var desc = aInfoObj.packageDescription;
      if (desc && desc.length > 50) {
        desc = desc.substring(0, 50);
        desc += "...";
      }

      $("#aero-colorbox-description").text(desc);
      if (ContentScript._accountInfo.gateway.toLowerCase() == "bog") {
        if(aInfoObj.subTotalCost != 0){
          $("#aero-prealert-value").hide();
          $("#aero-colorbox-value").text(aInfoObj.subTotalCost);
        }
      } else {
        if(aInfoObj.value != 0){
          $("#aero-prealert-value").hide();
          $("#aero-colorbox-value").text(aInfoObj.value);
        }
      }

      $("#aero-colorbox-container").attr("preAlertInfo", JSON.stringify(aInfoObj));
      $("#aero-colorbox-account").text(ContentScript._accountInfo.gateway + "-" + ContentScript._accountInfo.accountNumber);


      //Post alerta
      $("#aero-colorbox-carrier-postalert").text(aInfoObj.courierName);
      $("#aero-colorbox-tracking-postalert").text(aInfoObj.courierNumber);
      var desc = aInfoObj.packageDescription;
      if (desc && desc.length > 50) {
        desc = desc.substring(0, 50);
        desc += "...";
      }

      $("#aero-colorbox-description-postalert").text(desc);
      if (ContentScript._accountInfo.gateway.toLowerCase() == "bog") {
        if(aInfoObj.subTotalCost != 0){
          $("#aero-prealert-value-postalert").hide();
          $("#aero-colorbox-value-postalert").text(aInfoObj.subTotalCost);
        }
      } else {
        if(aInfoObj.value != 0){
          $("#aero-prealert-value-postalert").hide();
          $("#aero-colorbox-value-postalert").text(aInfoObj.value);
        }
      }

      $("#aero-colorbox-container-postalert").attr("postAlertInfo", JSON.stringify(aInfoObj));
      $("#aero-colorbox-account-postalert").text(ContentScript._accountInfo.gateway + "-" + ContentScript._accountInfo.accountNumber);
    } else {
      $("#aero-colorbox-carrier").text("");
      $("#aero-colorbox-tracking").text("");
      $("#aero-colorbox-description").text("");
      $("#aero-colorbox-value").text("");
      $("#aero-colorbox-container").attr("preAlertInfo", "");
      $("#aero-colorbox-value-title").css("color", "black");
      $("#aero-colorbox-carrier-title").css("color", "black");
      $("#aero-colorbox-tracking-title").css("color", "black");
      $("#aero-colorbox-description-title").css("color", "black");

      //Post alert

      $("#aero-colorbox-carrier-postalert").text("");
      $("#aero-colorbox-tracking-postalert").text("");
      $("#aero-colorbox-description-postalert").text("");
      $("#aero-colorbox-value-postalert").text("");
      $("#aero-colorbox-container-postalert").attr("postAlertInfo", "");
      $("#aero-colorbox-value-title-postalert").css("color", "black");
      $("#aero-colorbox-carrier-title-postalert").css("color", "black");
      $("#aero-colorbox-tracking-title-postalert").css("color", "black");
      $("#aero-colorbox-description-title-postalert").css("color", "black");

    }

    $("[class='aero-colorbox-error-msg']").hide();
    $.colorbox.resize();

  },

  /**
   * Captures a screenshot using the node passed as parameter
   * @param aNode the DOM node to take the screenshot from
   * @param aPackage the package to set the screenshot info to
   * @param aTop the X value to scroll back to
   * @param aLeft the Y value to scroll back to
   * @param aSecondAttempt whether this is the second attempt or not
   * @param aTargetPage the target page to generate GA records in case we
   * generate a blank screenshot, so we know about that and react
   */
  _captureScreenshot : function(aNode, aPackage, aTop, aLeft, aSecondAttempt, aTargetPage) {
    html2canvas(aNode, {
      onrendered: function(canvas) {
        // canvas is the final rendered <canvas> element
        aPackage.invoiceImage = canvas.toDataURL("image/jpeg", 0.75);

        if (aPackage.invoiceImage == ContentScript.EMPTY_IMAGE_DATA) {
          // TRY TO GET THE SCREENSHOT AGAIN
          if (!aSecondAttempt) {
            ContentScript._captureScreenshot(aNode, aPackage, aTop, aLeft, true, aTargetPage);
          } else {
            aPackage.invoiceImage = null;
            ContentScript._populateConfirmation(aPackage);
            window.scroll(aLeft, aTop);
            // send a GA event so we know a blank screenshot is being generated
            chrome.runtime.sendMessage({message: "blankScreenshot", targetPage : aTargetPage}, function(response) {
            });
          }
        } else {
          ContentScript._populateConfirmation(aPackage);
          window.scroll(aLeft, aTop);
        }
      }
    });
  },

  _modifyAddressPage : function(info) {
    var addressInfo = info.addressInfo;
    var siteList = info.siteList;

    var firstName;
    var lastName;
    var nameElements = addressInfo.clientFullName.split(" ");

    switch (nameElements.length) {
      case 4:
        firstName = nameElements[0] + " " + nameElements[1];
        lastName = nameElements[2] + " " + nameElements[3];
        break;
      case 3:
        firstName = nameElements[0];
        lastName = nameElements[1] + " " + nameElements[2];
        break;
      case 2:
        firstName = nameElements[0];
        lastName = nameElements[1];
        break;
      default:
        firstName = addressInfo.get("clientFullName");
        break;
    }
    var address1 = addressInfo.packagesAddressLine1;
    var address2 = addressInfo.packagesAddressLine2;
    var city = addressInfo.packagesCity;
    var state = addressInfo.packagesState;
    var zip = addressInfo.packagesZipCode;
    var country = "US";
    var phone = addressInfo.packagesPhone;
    if (siteList && siteList.length > 0) {
      for (var i = 0; i < siteList.length; i++) {
        var siteInfo = siteList[i];
        var siteFields = JSON.parse(siteInfo.siteFields);
        var fullNameField = siteFields.fullName;
        if (fullNameField) {
          $("input[" + fullNameField.attr + "='" + fullNameField.val + "']").val(firstName + " " + lastName);
        } else {
          // this means the form has first and last name separated
          var firstNameField = siteFields.firstName;
          var lastNameField = siteFields.lastName;
          if (firstNameField) {
            $("input[" + firstNameField.attr + "='" + firstNameField.val + "']").val(firstName);
          }
          if (lastNameField) {
            $("input[" + lastNameField.attr + "='" + lastNameField.val + "']").val(lastName);
          }
        }
        var fullAddressField = siteFields.fullAddress;
        if (fullAddressField) {
          $("input[" + fullAddressField.attr + "='" + fullAddressField.val + "']").val(address1 + " " + address2);
        } else {
          // this means the site has address split in 2 fields
          var address1Field = siteFields.address1;
          var address2Field = siteFields.address2;
          if (address1Field) {
            $("input[" + address1Field.attr + "='" + address1Field.val + "']").val(address1);
          }
          if (address2Field) {
            $("input[" + address2Field.attr + "='" + address2Field.val + "']").val(address2);
          }
        }
        var cityField = siteFields.city;
        if (cityField) {
          $("input[" + cityField.attr + "='" + cityField.val + "']").val(city);
        }
        var stateRegionField = siteFields.stateRegion;
        if (stateRegionField) {
          $("input[" + stateRegionField.attr + "='" + stateRegionField.val + "']").val(state);
          $("select[" + stateRegionField.attr + "='" + stateRegionField.val + "']").val(state);
        }
        var zipField = siteFields.zip;
        if (zipField) {
          $("input[" + zipField.attr + "='" + zipField.val + "']").val(zip);
        }
        var countryField = siteFields.country;
        if (countryField) {
          $("input[" + countryField.attr + "='" + countryField.val + "']").val(country);
          $("select[" + countryField.attr + "='" + countryField.val + "']").val(country);
        }
        var phoneField = siteFields.phone;
        if (phoneField) {
          $("input[" + phoneField.attr + "='" + phoneField.val + "']").val(phone);
        }
      }
    }
  },

  checkPage : function() {
    // check if a potential address page and fill it
    var _candidateAddressForms = new Array();
    var forms = $("form, fieldset");
    if ($(forms).length > 0) {
      $(forms).each(function(index, element) {
        var formHasAddress = false;
        var formHasName = false;
        var inputNodes = $(element).find(":input");
        // look for an input node with the name or id containing "address"
        // that's good enough
        $(inputNodes).each(function(index, element) {
          var name = $(element).attr("name");
          var id = $(element).attr("id");
          name = name ? name.toLowerCase() : "";
          id = id ? id.toLowerCase() : "";
          if ((name.indexOf("name") != -1 ||
              id.indexOf("name") != -1) &&
              $(element).attr("type") != "hidden") {
            formHasName = true;
          }
          if ((name.indexOf("addr") != -1 ||
              id.indexOf("addr") != -1) &&
              $(element).attr("type") != "hidden") {
            formHasAddress = true;
          }
          });

        if (formHasAddress && formHasName) {
          _candidateAddressForms.push(element);
        }
        });
    }
    var autofillInfo = {};
    autofillInfo.domain = location.hostname;

    if (_candidateAddressForms.length > 0) {
      chrome.runtime.sendMessage({message: "pageFillable", autofillInfo: autofillInfo}, function(response) {
        ContentScript._siteList = response.siteList;
        ContentScript._accountInfo = response.accountInfo;
        ContentScript._injectAutoComplete();
        });

    } else {
      chrome.runtime.sendMessage({message: "pageNOTFillable", autofillInfo: autofillInfo}, function(response) {

        });
    }
  },

  /**
   * Checks whether the package is being shipped to the currently signed in
   * account
   * @param aPage the page we are checking at (Amazon/eBay/etc)
   * @param aOrder the order to check the shipping address
   * @param aIsOrderDetailsPage whether this is an order details page or not
   * @returns true or false if the package is being shipped to the signed in
   * account or not
   */
  _isPackageForUser : function(aPage, aOrder, aIsOrderDetailsPage) {
    var isForUser = false;
    if (ContentScript._checkRecipient) {
      var recipientNode;
      var recipient = "";
      switch (aPage) {
        case "Amazon":
          if (!aIsOrderDetailsPage) {
            recipientNode = $(aOrder).find("div[class~='recipient']");
            if (recipientNode.length > 0) {
              recipientNode = $(recipientNode[0]).find("[data-a-popover]");
              if (recipientNode.length > 0) {
                recipient = $(recipientNode[0]).attr("data-a-popover").toLowerCase();
              }
            }
          } else {
            var oldFormat = $("a[name^='shipped-items']").length > 0;
            var newFormat = $("#orderDetails").length > 0;

            if (oldFormat) {
              recipientNode = $(aOrder).find("div[class~='displayAddressDiv']");
              recipient = $(recipientNode).text().toLowerCase();
            } else if (newFormat) {
              recipientNode = $("div[class~='displayAddressDiv']");
              recipient = $(recipientNode).text().toLowerCase();
            }
          }
          break;
        case "Aeropostale":
          if (aIsOrderDetailsPage) {
            recipient = $(aOrder).text().toLowerCase();
          } else {
            recipientNode = $(aOrder).find("b:contains('Shipping To')").parent();
            recipient = $(recipientNode).text().toLowerCase();
          }
          break;
        case "Forever21":
          recipient = $(aOrder).text().toLowerCase();
          break;
        case "Rakuten":
          recipientNode = $(aOrder).find("tr[class*='ShippingAddress']");
          recipient = $(recipientNode).text().toLowerCase();
          break;
        default:
          break;
      }

      if (recipient.indexOf(ContentScript._accountInfo.gateway.toLowerCase()) != -1 &&
          recipient.indexOf(ContentScript._accountInfo.accountNumber) != -1) {
        isForUser = true;
      }

    } else {
      isForUser = true;
    }
    return isForUser;
  },

  /**
   * Returns the carrier, using regular expressions, from a tracking #
   * @param aTracking
   * @returns the carrier
   */
  _getCarrier : function(aTracking) {

    var UPS = /(\b1[zZ][A-Za-z0-9]{16}\b)|(\b\d{9}\b)/;
    if (UPS.test(aTracking)) {
      return "UPS";
    }

    var USPS = /(\b91\d{20}\b)|(\b94\d{20}\b)|(\b95\d{20}\b)|(\b\d{30}\b)/;
    if (USPS.test(aTracking)) {
      return "USPS";
    }

    var FEDEX = /(\b96\d{20}\b)|(\b\d{32}\b)|(\b\d{20}\b)|(\b\d{11}\b)|(\b\d{12}\b)|(\b\d{15}\b)/;
    if (FEDEX.test(aTracking)) {
      return "FEDEX";
    }

    var INTMAILCHINAPOST = /(\b[A-Za-z]{2}\d{9}[A-Za-z]{2}\b)/;
    if (INTMAILCHINAPOST.test(aTracking)) {
      return "INTMAILCHINAPOST";
    }

    var LASERSHIP = /(\b[Ll][A-Za-z]\d{8}\b)|(\b[A-Za-z]{2}\d{9})|(\b[0-9][Ll][A-Za-z]\d{12}\b)/;
    if (LASERSHIP.test(aTracking)) {
      return "LASERSHIP";
    }

    var DHL = /(\b\d{10}\b)|(\b\d{16}\b)|(\b\d{19}\b)|(\b\d{22}\b)|(\b\d{6}[A-Za-z]\d{4}\b)/;
    if (DHL.test(aTracking)) {
      return "DHL";
    }

    return "OTHER";
  },

  /**
   * Removes unnecesary pieces of code from the html
   * @param aHtml the html to be cleaned
   * @returns the cleaned html
   */
  _cleanHTML : function(aHtml) {
    $("script", aHtml).remove();
    return aHtml;
  },

  /**
   * Removes all the \n\r and white spaces from an HTML string
   * @param aHTMLString the html string to be trimmed
   * @returns the trimmed HTML
   */
  _trimHTML : function(aHTMLString) {
    var n = new RegExp("\\n", 'g');
    var r = new RegExp("\\r", 'g');
    var t = new RegExp("\\t", 'g');
    aHTMLString = aHTMLString.replace(n, "");
    aHTMLString = aHTMLString.replace(r, "");
    aHTMLString = aHTMLString.replace(t, "");
    aHTMLString = aHTMLString.replace("  ", "");
    aHTMLString = aHTMLString.trim();

    return aHTMLString;
  },

   /**
     * Loads the order invoice html and sends it over for storage
     * @param aCourierNumber the courier number
     * @param aInvoiceUrl the order invoice url
     * @param aFirstItemDescription the first item description in the order
     * @param aShipper the shipper of the package (Amazon, eBay, etc)
     * @param aOrderIndex the order index for pages with multiple orders
     */
    _loadOrderInvoice : function(aCourierNumber, aInvoiceUrl, aFirstItemDescription, aShipper, aOrderIndex) {
      var getInvoiceHtmlCallback = function(aHtml) {
          var finalHtml = AmazonContentScript.generateAmazonInvoice(aHtml, aFirstItemDescription, aCourierNumber, aInvoiceUrl);
          if (finalHtml) {
            chrome.runtime.sendMessage({message: "processInvoiceHtml",
                                        courierNumber : aCourierNumber,
                                        firstItemDescription: aFirstItemDescription,
                                        invoiceHtml : finalHtml}, function(response) {});
          }
          // check if the order is using a gift card and update the order value
          // accordingly
          ContentScript._checkInvoiceForGiftCards(aHtml, aFirstItemDescription, aCourierNumber, aOrderIndex);
      };
      ContentScript._getInvoiceHTML(aInvoiceUrl, getInvoiceHtmlCallback);
  },

  /**
   * Gets the invoice html
   * @param aUrl the invoice url
   * @param aCallback the callback to be called on return
   */
  _getInvoiceHTML : function(aUrl, aCallback) {
    var request =
      $.ajax({
        type: "GET",
        url: aUrl,
        jsonp: false,
        timeout: 60 * 1000,
        }).done(function(aData) {
          aCallback(aData);
        }).fail(function(aXHR, aTextStatus, aError) {
          console.log("Error retrieving the invoice HTML: Status: " +
            aTextStatus + " /Error: " + aError);
          // notify sentry that we couldn't load the invoice
          chrome.runtime.sendMessage({message: "reportError",
                                      error : {
                                        message: "Error loading invoice HTML",
                                        extra : {
                                          invoiceUrl: aUrl,
                                        }
                                      }
                                      }, function(response) {
          });
          aCallback();
        });
  },

  /**
   * Extracs the shipment value from an invoice
   * @param aInvoiceHtml the invoice to be searched
   * @param aFirstItemDescription the first item description
   * @returns the value of the order
   */
  _getValueFromInvoice : function(aInvoiceHtml, aFirstItemDescription) {
    //console.log("invoice: " + aInvoiceHtml);
    // this prevents problems with descriptions that contain single quotes
    if (aFirstItemDescription.indexOf("'") != -1) {
      aFirstItemDescription = aFirstItemDescription.substring(0, aFirstItemDescription.indexOf("'"));
    }

    var valueObj = null;

    var itemNode = $("i:contains('" + aFirstItemDescription + "')", aInvoiceHtml);
    if (itemNode.length > 0) {
      // we can check if the shipment contains gift card info and use the
      // actual price of the order, ignoring the gift card value
      var containerTable = $(itemNode[0]).closest("table").parent().closest("table").parent().closest("table").parent().closest("table").parent().closest("table");
      var giftCardValue = $(containerTable).find("b:contains('Total paid by Gift Card')");
      if(giftCardValue == 0){
        giftCardValue = $(containerTable).find("b:contains('Total pagado con cheque regalo')");
      }
      if (giftCardValue.length > 0) {
        giftCardValue = $(giftCardValue[0]).parent().next("td").text();
        giftCardValue = giftCardValue.substring(giftCardValue.indexOf("$") + 1, giftCardValue.length).trim();
        giftCardValue = giftCardValue.replace(",", "");
      } else {
        giftCardValue = 0;
      }

      var rewardsPoints = $(containerTable).find("b:contains('Total paid by Rewards Points')");
      if (rewardsPoints.length > 0) {
        rewardsPoints = $(rewardsPoints[0]).parent().next("td").text();
        rewardsPoints = rewardsPoints.substring(rewardsPoints.indexOf("$") + 1, rewardsPoints.length).trim();
        rewardsPoints = rewardsPoints.replace(",", "");
      } else {
        rewardsPoints = 0;
      }

      var totalValue = $($(containerTable).find("b:contains('Total for This Shipment')")[0]).parent().next("td").text();
      if(totalValue.length == 0){
        totalValue = $($(containerTable).find("b:contains('Total para este envío')")[0]).parent().next("td").text();
      }
      totalValue = totalValue.substring(totalValue.indexOf("$") + 1, totalValue.length).trim();
      totalValue = totalValue.replace(",", "");
      totalValue = Number(totalValue) + Number(giftCardValue) + Number(rewardsPoints);
      valueObj = {};
      valueObj.totalValue = totalValue;
      var subTotalCost = $(containerTable).find("td:contains('Item(s) Subtotal')").last().next("td").text();
      if(subTotalCost.length == 0){
        subTotalCost = $(containerTable).find("td:contains('Productos')").last().next("td").text();
      }
      subTotalCost = subTotalCost.substring(subTotalCost.indexOf("$") + 1, subTotalCost.length).trim();
      subTotalCost = subTotalCost.replace(",", "");
      subTotalCost = Number(subTotalCost);
      valueObj.subTotalCost = subTotalCost;

     /***********/ 
     if(valueObj.totalValue == 0){
        var totalValue = $($(containerTable).find("b:contains('Grand Total')")[0]).parent().next("td").text();
        if(totalValue.length == 0){
          totalValue = $($(containerTable).find("b:contains('Total (I.V.A. Incluido)')")[0]).parent().next("td").text();
        }
        totalValue = totalValue.substring(totalValue.indexOf("$") + 1, totalValue.length).trim();
        totalValue = totalValue.replace(",", "");
        totalValue = Number(totalValue) + Number(giftCardValue) + Number(rewardsPoints);

        valueObj.totalValue = totalValue;
     }

      return valueObj;
    } else {

    }
    return null;
  },

  /**
   * Checks an invoice to see if it contains gift cards and updates the respective
   * prealert info accordingly.
   * @param aInvoiceHtml the invoice html to be reviewed
   * @param aFirstItemDescription the description of the first item in the order
   * (for orders with multiple packages)
   * @param aCourierNumber the courier number to update the respective button
   * if necessary
   * @param aOrderIndex the order index for pages with multiple orders
   */
  _checkInvoiceForGiftCards : function(aInvoiceHtml, aFirstItemDescription, aCourierNumber, aOrderIndex) {
    var html = $(aInvoiceHtml);
    var orderValue = ContentScript._getValueFromInvoice(aInvoiceHtml, aFirstItemDescription);
    if (orderValue) {
      // search for the respective button and update the value accordingly
      var targetButton =
        $("[buttonId='aero-prealert-" + aCourierNumber + (aOrderIndex != null ? "-" + aOrderIndex : "") + "']");
      if (targetButton.length > 0) {
        var packageInfo = $(targetButton).attr("packageInfo");

        packageInfo = JSON.parse(packageInfo);
        packageInfo.value = orderValue.totalValue;
        packageInfo.subTotalCost = orderValue.subTotalCost;

        $(targetButton).attr("packageInfo", JSON.stringify(packageInfo));
      }
    }
  },

  /**
   * Generates the HTML invoice
   * @param aStore the store to generate the invoice for
   * @param aInvoiceObj the object with all the information for the invoice to
   * generate
   * @returns the html invoice
   */
  _generateInvoice : function(aStore, aInvoiceObj) {

    var invoiceLogo = null;
    switch (aStore) {
      case "aeropostale":
        invoiceLogo = "<img style='clip:rect(127px,276px,208px,0px);position:absolute;top:-127px;left:0' alt='' src=https://www.aeropostale.com/images/aero_sprite_14.png>";
        break;
      case "forever21":
        invoiceLogo = "<div style='background-color: black; display: inline-block; padding: 5px;'><svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='244px' height='41px' viewBox='0 0 244 41' style='enable-background:new 0 0 244 41;' xml:space='preserve'><path fill='#FFFFFF' d='M0,40.66h5.73V23.45h9.89v-5.44H5.73V5.78h11.35V0.34H0V40.66z M34.72,0c-4.67,0-9.61,3.28-9.61,9.85v21.29 c0,6.57,4.95,9.85,9.61,9.85c4.67,0,9.61-3.28,9.61-9.85V9.85C44.33,3.28,39.39,0,34.72,0z M38.6,31.15 c0,2.78-1.8,4.08-3.88,4.08s-3.88-1.3-3.88-4.08V9.85c0-2.78,1.8-4.08,3.88-4.08s3.88,1.3,3.88,4.08V31.15z M72.89,12.18 c0-7.82-3.32-11.84-10.12-11.84h-9.22v40.32h5.73V23.45h3.43l5.34,17.22h6.07l-6.18-18.41C71.6,20.22,72.89,16.82,72.89,12.18z M62.55,18.35h-3.26V5.78h2.98c4.22,0,4.89,2.21,4.89,6.29C67.15,16.08,66.54,18.35,62.55,18.35z M82.15,40.66h17.09v-5.78H87.88 V23.05h9.89v-5.44h-9.89V5.78h11.35V0.34H82.15V40.66z M117.33,28.49h-0.11l-4.55-28.15h-6.07l8.15,40.32h5.06l8.21-40.32h-6.07 L117.33,28.49z M136.58,40.66h17.09v-5.78h-11.35V23.05h9.89v-5.44h-9.89V5.78h11.35V0.34h-17.09V40.66z M181.85,12.18 c0-7.82-3.32-11.84-10.12-11.84h-9.22v40.32h5.73V23.45h3.43l5.34,17.22h6.07l-6.18-18.41 C180.55,20.22,181.85,16.82,181.85,12.18z M171.5,18.35h-3.26V5.78h2.98c4.22,0,4.89,2.21,4.89,6.29 C176.11,16.08,175.5,18.35,171.5,18.35z M225.43,10.14c0-5.38-2.53-10.14-8.49-10.14c-4.78,0-8.6,3.96-8.6,8.78v3.17h5.73V8.66 c0-1.87,1.12-2.89,2.81-2.89c2.81,0,2.81,2.43,2.81,4.47c0,2.21,0,3.34-1.01,5.32l-10.34,19.65v5.44h17.09v-5.78h-10.34 l8.43-16.37C225.32,15.06,225.43,14.04,225.43,10.14z M238.27,0.34l-5.73-0.02v6.16l5.73-0.03v34.21H244V0.34H238.27z'></path></svg></div>";
        break;
    };

    var invoiceTemplate = "<!DOCTYPE html><html xmlns=http://www.w3.org/1999/xhtml><head><style type='text/css' media='screen'>ul { list-style-type: none; }</style></head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><body>###STORE_LOGO###<br><br><br><br clear='\&quot;all\&quot;'><center><b class=h1>Order ####ORDER_ID###</b><br></center><br><table width=90% border=0 cellspacing=0 cellpadding=0 bgcolor=#FFFFFF align=center><tbody><tr><td><table width=100% border=0 align=center cellpadding=0 cellspacing=0><tbody><tr><td valign=top align=left><b>Order Placed:</b> ###ORDER_DATE###<tr><td valign=top align=left><b>" +
                          aStore + ".com transaction number:</b> ###ORDER_ID###<tr><td valign=top align=left><b>Carrier:</b> ###CARRIER###<tr><td valign=top align=left><b>Tracking Number:</b> ###TRACKING_NUMBER###</table><br><table width=100% border=0 cellspacing=0 cellpadding=0 bgcolor=#000000 align=center invoicecontent=true><tbody><tr bgcolor=#000000><td><table width=100% border=0 cellspacing=3 cellpadding=0 align=center bgcolor=#000000><tbody><tr bgcolor=#FFFFFF><td valign=top colspan=2><table width=100% border=0 cellspacing=0 cellpadding=5><tbody><tr bgcolor=#FFFFFF><td><center><b class=sans>ORDER DETAILS</b></center></table><tr><td bgcolor=#FFFFFF valign=top colspan=2><table width=100% border=0 cellspacing=0 cellpadding=2><tbody><tr valign=top><td width=100%><table border=0 cellspacing=0 cellpadding=2 align=right><tbody><tr valign=top><td align=right>&nbsp;</table><table border=0 cellspacing=2 cellpadding=0 width=100%><tbody><tr valign=top><td valign=top><b>Items Ordered</b><td align=right valign=top><b>Price</b>###ORDER_DETAILS###</table><br></table><tr><td bgcolor=#FFFFFF valign=top colspan=2><table width=100% border=0 cellspacing=0 cellpadding=2><tbody><tr><td><b>Shipping Address:</b><br><div class=displayAddressDiv><ul class=displayAddressUL><li class='displayAddressLI displayAddressFullName'>###ADDRESS_NAME###</li><li class='displayAddressLI displayAddressAddressLine1'>###ADDRESS_LINE1###</li><li class='displayAddressLI displayAddressAddressLine2'>###ADDRESS_LINE2###</li><li class='displayAddressLI displayAddressCityStateOrRegionPostalCode'>###ADDRESS_CITY_STATE_ZIP###</li><li class='displayAddressLI displayAddressCountryName'>###ADDRESS_COUNTRY###</li></ul></div><td align=right><table border=0 cellpadding=0 cellspacing=1><tbody><tr valign=top><td nowrap align=right>Item(s) Subtotal:<td nowrap align=right>###ITEMS_SUBTOTAL###<tr valign=top><td nowrap align=right>Shipping &amp; Handling:<td nowrap align=right>###SHIPPING###<tr valign=top><td nowrap align=right>&nbsp;<td nowrap align=right>-----<tr valign=top><td nowrap align=right>Sales Tax:<td nowrap align=right>###SALES_TAX###<tr valign=top><td nowrap align=right>&nbsp;<td nowrap align=right>-----<tr valign=top><td nowrap align=right><b>Total for This Shipment:</b><td nowrap align=right><b>###ORDER_TOTAL###</b><tr valign=top><td nowrap align=right>&nbsp;<td nowrap align=right>-----</table></table></table></table><br></table></body></html>";
    finalInvoice = invoiceTemplate;
    try {

      var storeLogo = new RegExp("###STORE_LOGO###", 'g');
      finalInvoice = finalInvoice.replace(storeLogo, invoiceLogo);
      var orderId = new RegExp("###ORDER_ID###", 'g');
      finalInvoice = finalInvoice.replace(orderId, aInvoiceObj.orderNumber);
      var orderDate = new RegExp("###ORDER_DATE###", 'g');
      finalInvoice = finalInvoice.replace(orderDate, aInvoiceObj.orderDate);
      var carrier = new RegExp("###CARRIER###", 'g');
      finalInvoice = finalInvoice.replace(carrier, aInvoiceObj.courierName);
      var trackingNumber = new RegExp("###TRACKING_NUMBER###", 'g');
      finalInvoice = finalInvoice.replace(trackingNumber, aInvoiceObj.courierNumber);
      var addressName = new RegExp("###ADDRESS_NAME###", 'g');
      finalInvoice = finalInvoice.replace(addressName, aInvoiceObj.addressName);
      var addressLine1 = new RegExp("###ADDRESS_LINE1###", 'g');
      finalInvoice = finalInvoice.replace(addressLine1, aInvoiceObj.addressLine1);
      var addressLine2 = new RegExp("###ADDRESS_LINE2###", 'g');
      finalInvoice = finalInvoice.replace(addressLine2, aInvoiceObj.addressLine2);
      var addressCityStateZip = new RegExp("###ADDRESS_CITY_STATE_ZIP###", 'g');
      finalInvoice = finalInvoice.replace(addressCityStateZip, aInvoiceObj.addressCityStateZip);
      var addressCountry = new RegExp("###ADDRESS_COUNTRY###", 'g');
      finalInvoice = finalInvoice.replace(addressCountry, aInvoiceObj.addressCountry ? aInvoiceObj.addressCountry : "");

      var itemsSubtotal = new RegExp("###ITEMS_SUBTOTAL###", 'g');
      finalInvoice = finalInvoice.replace(itemsSubtotal, aInvoiceObj.subTotalCost);
      var shipping = new RegExp("###SHIPPING###", 'g');
      finalInvoice = finalInvoice.replace(shipping, aInvoiceObj.shippingCost);
      var salesTax = new RegExp("###SALES_TAX###", 'g');
      finalInvoice = finalInvoice.replace(salesTax, aInvoiceObj.tax);
      var orderTotal = new RegExp("###ORDER_TOTAL###", 'g');
      finalInvoice = finalInvoice.replace(orderTotal, aInvoiceObj.value);

      // now prepare the list of items in the order
      var itemTemplate = "<tr style='height: 20px'><td colspan='1' valign='top'>###QUANTITY### of: <i>###TITLE###</i><br></td><td align='right' valign='top' colspan='2'>###PRICE###<br></td></tr>";

      var items = aInvoiceObj.items;
      var itemsString = "";
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemString = itemTemplate;
        var quantity = new RegExp("###QUANTITY###", 'g');
        itemString = itemString.replace(quantity, item.quantity);
        var title = new RegExp("###TITLE###", 'g');
        itemString = itemString.replace(title, item.title);
        var price = new RegExp("###PRICE###", 'g');
        itemString = itemString.replace(price, item.price);
        itemsString += itemString;
      }

      var orderDetails = new RegExp("###ORDER_DETAILS###", 'g');
      finalInvoice = finalInvoice.replace(orderDetails, itemsString);
    } catch(e) {
      finalInvoice = null;
    }
    return finalInvoice;
  },

  _loadingPrice : function(){


    $("<div class='barNotification'>" +
        "<div> " +
        "<div class='aIconBluBar'>" +
        "<div class='iconAeropost'></div>"+  
        "</div>" +
        "<!-- the class apRightBubble makes visible the all inclusive cont -->" +
        "<div id='allInclusiveBarId' class='allInclusiveContBar' ><span class='labelSm_new blueTextLabel_new'>" + chrome.i18n.getMessage("quote_script_quote_calculete_price") + "</span>" +
        "<button id='quoteBtn' style='display:none'>" + chrome.i18n.getMessage("quote_script_quote_aeropost_com_button") + "</button>" +
        "<div class='sk-fading-circle'>" +
        "<div class='sk-circle1 sk-circle'></div>" +
        "<div class='sk-circle2 sk-circle'></div>" +
        "<div class='sk-circle3 sk-circle'></div>" +
        "<div class='sk-circle4 sk-circle'></div>" +
        "<div class='sk-circle5 sk-circle'></div>" +
        "<div class='sk-circle6 sk-circle'></div>" +
        "<div class='sk-circle7 sk-circle'></div>" + 
        "<div class='sk-circle8 sk-circle'></div>" +
        "<div class='sk-circle9 sk-circle'></div>" +
        "<div class='sk-circle10 sk-circle'></div>" +
        "<div class='sk-circle11 sk-circle'></div>" +
        "<div class='sk-circle12 sk-circle'></div>" +
        "</div></div>" +
        "<div id='chevronBar' class='chevronBarRight' style='display:none'></div>" +
        "</div>" +
        "</div>").insertBefore("body");

    $("#chevronBar").click(function(event){
      $("#barLeftViewID").remove();
      $(".barNotification").attr("class", "barNotification barLeft barOff");
      $("#chevronBar").attr("class", "chevronBarLeft");
      $("#allInclusiveBarId").show();
    });

    $("#quoteBtn").click(function(event){
      chrome.runtime.sendMessage({message: "SearchURL",
        url : window.location.href}
        
      );
    });

    $("body").attr("style","margin-top:30px!important;");
  },

  _injectAutoCompleteLoginForm : function(){
    chrome.runtime.sendMessage({message: "getAccountDetail"},
      function(response) {
          $("#Username").val(response.account.accountNumber);
          $("#Gateway").removeAttr("disabled");
          $("#Gateway option[value='"+response.account.gateway+"']").attr("selected","selected");
          return;
      }
    );
    
  },

    /**
   * Injects the colorbox for eventual use when the user clicks the postalert
   * button
   */
  _injectPostalertColorbox : function() {
    var colorBoxContent = 
      "<div  id='aero-colorbox-container-postalert' style='display:none'>" +
        "<div id='aero-inline-content-postalert' style='display:block; width:100%; padding:0;'>" +
          "<div style='display:block; width:100%;'>" +
            "<h2 class='plugHeadingMd' style='padding: 0 15px;'>" + chrome.i18n.getMessage("content_script_postalert_confirmation_modal_title") + "</h2>" +
            "<p class='confirmation-lead' style='padding: 0 15px;'>" + chrome.i18n.getMessage("content_script_postalert_confirmation_modal_confirm_label") + "</p>";

    if (ContentScript._accountInfo.gateway.toLowerCase() == "sjo") {
      var locale = ContentScript._accountInfo.language == "1" ? "en" : "es";
      var urlMyAccount = chrome.i18n.getMessage("content_script_prealert_go_to_my_account_url").replace("%S1", locale);
      var url = location.href.toLowerCase();
      width = "100%;";
      if (url.indexOf("ebay") != -1){
        width = "530px;"
      }
      /*colorBoxContent +=    
          "<div style='display:block; width:"+width+" padding: 0 35px; margin-bottom:15px;'>"+
          "<div style='padding: .75rem 1.25rem; margin-bottom: 1rem; border: 1px solid transparent; border-radius: .25rem; background-color: #fcf8e3; border-color: #faf2cc; color: #8a6d3b;'>"+
          "<div style='display:block; width:100%; padding: 0;'>"+
          "<div style='width:75px; float:left;''><div class='alertPrealertIcon'><span>!</span></div></div>"+
          "<div style='width:425px; margin-left:75px; text-align:left;'>"+
          "<div style='font-size:16px; text-align:left;'>" + chrome.i18n.getMessage("content_script_prealert_go_to_my_account_exemption") + "</div></div></div>"+
          "<div style='display:block; width:100%; padding: 0; text-align:center; margin-top:10px;'>"+
          "<a type='button' href='" + urlMyAccount + "' class='btn btn-block btn-prealert-aeropost-external'>" + chrome.i18n.getMessage("content_script_prealert_go_to_my_account_exemption_cta") + "</a></div></div></div>";*/
    }
            

    colorBoxContent +=
            "<p class='confirmation-lead' style='padding: 0 15px;'><strong>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_account_label") + "</strong> <span id='aero-colorbox-account-postalert'></span></p>" +
          "</div>" +
          "<div style='display:block; width:100%; min-height:200px;'>" +
            "<div style='display:inline-block; width:255px; padding-left:15px; float:left;'>" +
              "<div class='panel panel-default' '>" +
                "<div class='panel-heading'>" +
                  "<span><strong>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_carrier_information_title") + "</strong></span>" +
                "</div>" +
                "<div class='panel-body'>" +
                  "<p><strong id='aero-colorbox-carrier-title-postalert'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_carrier_name_label") + "</strong> <span id='aero-colorbox-carrier-postalert'></span></p>" +
                  "<p><strong id='aero-colorbox-tracking-title-postalert'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_tracking_number_label") + "</strong> <span id='aero-colorbox-tracking-postalert'></span></p>" +
                "</div>" +
              "</div>" +
            "</div>" +
            "<div style='display:inline-block; width:300px; padding-left:15px;'>" +
              "<div class='panel panel-default' >" +
                "<div class='panel-heading'>" +
                  "<span><strong>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_package_information_title") + "</strong></span>" +
                "</div>" +
                "<div class='panel-body'>" +
                  "<p><strong id='aero-colorbox-description-title-postalert'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_description_label") + "</strong> <span id='aero-colorbox-description-postalert'></span></p>" +
                  "<p><strong id='aero-colorbox-value-title-postalert'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_value_label") + "</strong> <span id='aero-colorbox-value-postalert'></span> <input id='aero-prealert-value-postalert' class='form-control' required='' type='number'></p>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>"+
          "<div style='display:block; width:100%;'>" +
            "<br><hr>" +
            "<div class='aero-colorbox-error-msg'>" +
              "<span>" + chrome.i18n.getMessage("content_script_prealert_confirmation_missing_data_label") + "</span>" +
            "</div>" +
          "</div>" +
          "<div style='display:block; width:100%; text-align:center;'>" +
            "<div style='display:inline-block; width:200px; margin-right:10px;'>" +
              "<button id='aero-colorbox-cancel-postalert' type='button' class='btn btn-block aero-injected-button-clear'>" + chrome.i18n.getMessage("content_script_prealert_confirmation_modal_cancel_button") + "</button>"+
            "</div>" +
            "<div style='display:inline-block; width:200px; margin-left:10px;'>" +
              "<button id='aero-colorbox-postalert' type='button' class='btn btn-block aero-injected-button'>" + chrome.i18n.getMessage("content_script_postalert_confirmation_modal_prealert_button") + "</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    var colorBoxNode = $(colorBoxContent);
    $("body").append(colorBoxNode);

    // add click listeners
    $("#aero-colorbox-postalert").click(function(event) {
      var preAlertInfo = $("#aero-colorbox-container-postalert").attr("postAlertInfo");
      if (preAlertInfo && preAlertInfo.length > 0) {
        preAlertInfo = JSON.parse(preAlertInfo);
        var showMissingData = false;
        if (!preAlertInfo.value || Number(preAlertInfo.value) <= 0) {
          showMissingData = true;
          $("#aero-colorbox-value-title-postalert").css("color", "red");
        } else {
          $("#aero-colorbox-value-title-postalert").css("color", "black");
        }

        if (!preAlertInfo.courierName) {
          showMissingData = true;
          $("#aero-colorbox-carrier-title-postalert").css("color", "red");
        } else {
          $("#aero-colorbox-carrier-title-postalert").css("color", "black");
        }

        if (!preAlertInfo.courierNumber) {
          showMissingData = true;
          $("#aero-colorbox-tracking-title-postalert").css("color", "red");
        } else {
          $("#aero-colorbox-tracking-title-postalert").css("color", "black");
        }

        if (!preAlertInfo.packageDescription) {
          showMissingData = true;
          $("#aero-colorbox-description-title-postalert").css("color", "red");
        } else {
          $("#aero-colorbox-description-title-postalert").css("color", "black");
        }

        if (showMissingData) {
          $("[class='aero-colorbox-error-msg']").show();
          $.colorbox.resize();
        } else {
          $.colorbox.close();
          chrome.runtime.sendMessage({message: "postAlert", packageInfo : preAlertInfo}, function(response) {
            //console.log(response.processed);
          });
        }

      }
      });
    $("#aero-colorbox-cancel-postalert").click(function(event) {
      $.colorbox.close();
      chrome.runtime.sendMessage({message: "postAlertCanceled"}, function(response) {

      });
      });
  }


};



ContentScript.init();
