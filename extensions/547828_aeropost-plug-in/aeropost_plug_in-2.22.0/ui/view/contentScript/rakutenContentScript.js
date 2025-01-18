/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Rakuten Content Script class
 */
var RakutenContentScript = {

  modifyRakutenOrdersPage : function() {
    var ordersTable =
      $("td[valign='top'] > table[cellpadding='0'][cellspacing='7'][width='100%']")[0];
    var aOrdersList = $(ordersTable).find("table[style='border:solid 1px #CCCCCC;']");

    if (aOrdersList.length > 0) {
      for (var i = 0; i < aOrdersList.length; i++) {
        var order = aOrdersList[i];
        // find tracking number (if any)

        var tracking = $(order).find("span[id$='lblTrackingNumbers_0'] > a");
        var buttonContainer = $(order).find("td[style='border-right:solid 1px #CCCCCC;']")[0];
        // tracking is available
        if (tracking.length > 0 &&
          ContentScript._isPackageForUser("Rakuten", order, true)) {
          var existingAnchor = $(order).find("button[class~='preAlertButton']");
          if (existingAnchor.length == 0) {
            var button = ContentScript._createButton("preAlert");
            $(button).addClass("aero-rakuten-order-list-button");
            $(button).addClass("preAlertButton");
            $(button).attr("orderIndex", i);
            var infoObj = RakutenContentScript.getRakutenPackageInfo(aOrdersList[i]);
            infoObj.shipperName = "Rakuten";

            var courierNumber = infoObj.courierNumber;
            $(button).attr("buttonId", "aero-prealert-" + courierNumber);
            $(button).attr("packageInfo", JSON.stringify(infoObj));

            chrome.runtime.sendMessage({message: "checkPreAlert",
              courierNumber: courierNumber,
              delivered : false,
              shipper : infoObj.shipperName}, function(response) {

            });

            // show confirmation lightbox
            $(button).colorbox({
              inline:true,
              closeButton:false,
              width: ContentScript.COLORBOX_WIDTH,
              opacity:0.5,
              onOpen:function() {
                chrome.runtime.sendMessage({message: "preAlertStarted"}, function(response) {

                });
                //clear before filling
                ContentScript._populateConfirmation(null);
                var orderIndex = $(this).attr("orderIndex");

                var packageInfo = JSON.parse($(this).attr("packageInfo"));

                // save the position to scroll back after taking the screenshot
                var top = window.pageYOffset || document.documentElement.scrollTop;
                var left = window.pageXOffset || document.documentElement.scrollLeft;
                ContentScript._captureScreenshot(
                  aOrdersList[orderIndex], packageInfo, top, left, false, "rakuten-orders");
              },
              onLoad:function() {
                //XXX: NOTE THAT FOR RAKUTEN WE ONLY REMOVE THE OVERFLOW FOR THE
                // HTML NODE AND NOT THE BODY TO PREVENT IT FROM SCROLLING TO TOP
                //$('html, body').css('overflow', 'hidden'); // page scrollbars off
                $('html').css('overflow', 'hidden'); // page scrollbars off
              },
              onClosed:function() {
                //XXX: NOTE THAT FOR RAKUTEN WE ONLY REMOVE THE OVERFLOW FOR THE
                // HTML NODE AND NOT THE BODY TO PREVENT IT FROM SCROLLING TO TOP
                //$('html, body').css('overflow', ''); // page scrollbars on
                $('html').css('overflow', ''); // page scrollbars on
              },
              onComplete : function() {
                $(this).colorbox.resize();
              }
            });

            $(button).appendTo(buttonContainer);
          }
        } else {
          var button = ContentScript._createButton("preAlert");
          $(button).addClass("aero-rakuten-order-list-button");
          $(button).addClass("disabled");
          $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
          $(button).appendTo(buttonContainer);
        }
      }
    }
  },

  /**
   * Extracts the package information for the preAlert
   * @param aOrderNode the order info node to extract the package
   * tracking info from
   * @return an object with the tracking info (if available)
   */
  getRakutenPackageInfo : function(aOrderNode) {
    var infoObj = {};
    var trackingNode = $(aOrderNode).find("span[id$='lblTrackingNumbers_0'] > a")[0];
    infoObj.courierNumber = ContentScript._trimHTML($(trackingNode).text());

    infoObj.courierName = ContentScript._getCarrier(infoObj.courierNumber);

    // get the final price
    var orderCostNode = $(aOrderNode).find("span[id^='ContentPlaceHolder1_listViewOrders_lblOrderTotal']");

    var value = ContentScript._trimHTML($(orderCostNode).text());
    infoObj.value = value.substring(value.indexOf("$") + 1, value.length).trim();
    infoObj.value = infoObj.value.replace(",", "");
    infoObj.subTotalCost = infoObj.value;

    var orderDescription = $(aOrderNode).find("span[id*='_lblItemTitle_'] > a");
    if (orderDescription.length == 1) {
      infoObj.packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
    } else if (orderDescription.length > 1) {
      infoObj.packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
    }

    return infoObj;
  }
};
