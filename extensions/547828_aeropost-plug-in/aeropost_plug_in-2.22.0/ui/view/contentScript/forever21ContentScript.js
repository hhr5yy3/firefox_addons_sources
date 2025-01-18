/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Forever21 Content Script class
 */
var Forever21ContentScript = {

  modifyForever21OrderDetailsPage : function(aDetailsHtml, aContainer) {
    var orderInfo = $("td:contains('Order Number:')", aDetailsHtml).last().closest("table").parent().closest("table");
    var trackingNodes = $("font:contains('TRACKING NUMBER')", aDetailsHtml);
    var containerNode = aContainer ? aContainer : $(trackingNodes).parent();

    var buttonClass =
      aDetailsHtml ? "aero-forever21-order-list-button" : "aero-forever21-order-details-button";

    if (trackingNodes.length > 0 &&
      ContentScript._isPackageForUser("Forever21", orderInfo, true)) {
      var button = ContentScript._createButton("preAlert");
      $(button).addClass(buttonClass);
      $(button).attr("delivered", false);
      var infoObj =
        Forever21ContentScript.getForever21PackageInfo(orderInfo);

      infoObj.shipperName = "Forever21";

      var courierNumber = infoObj.courierNumber;
      $(button).attr("buttonId", "aero-prealert-" + courierNumber);
      $(button).attr("packageInfo", JSON.stringify(infoObj));

      chrome.runtime.sendMessage({message: "checkPreAlert",
        courierNumber: courierNumber,
        delivered : $(button).attr("delivered"),
        firstItemDescription : infoObj.firstItemDescription,
        invoiceUrl : infoObj.invoiceUrl,
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

          var packageInfo = JSON.parse($(this).attr("packageInfo"));
          var orderIndex = $(this).attr("orderIndex");

          // save the position to scroll back after taking the screenshot
          var top = window.pageYOffset || document.documentElement.scrollTop;
          var left = window.pageXOffset || document.documentElement.scrollLeft;
          var targetPage =
            aDetailsHtml ? "forever21-orders" : "forever21-order-details";
          ContentScript._captureScreenshot(
            orderInfo, packageInfo, top, left, false, targetPage);
        },
        onLoad:function() {
          $('html, body').css('overflow', 'hidden'); // page scrollbars off
        },
        onClosed:function() {
          $('html, body').css('overflow', ''); // page scrollbars on
        },
        onComplete : function() {
          $(this).colorbox.resize();
        }
      });

      if (aDetailsHtml) {
        $(button).appendTo(containerNode);
      } else {
        $(button).appendTo(containerNode);
      }

    } else {
      var button = ContentScript._createButton("preAlert");
      $(button).addClass(buttonClass);
      $(button).addClass("disabled");
      $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
      if (aDetailsHtml) {
        $(button).appendTo(containerNode);
      } else {
        $(button).appendTo(containerNode);
      }
    }

  },

  /**
   * Extracts the package information for the preAlert
   * @param aOrderNode the order info node to extract the package
   * tracking info from
   * @return an object with the tracking info (if available)
   */
  getForever21PackageInfo : function(aOrderNode) {
    var infoObj = {};
    var invoiceObj = {};

    try {
      var trackingNodes = $(aOrderNode).find("font:contains('TRACKING NUMBER')");
      if (trackingNodes.length > 0) {
        var trackingNode = $(trackingNodes)[0].nextSibling;
        var trackingNodeString = ContentScript._trimHTML(trackingNode.textContent);

        infoObj.courierNumber = trackingNodeString;
        invoiceObj.courierNumber = infoObj.courierNumber;
        infoObj.courierName = ContentScript._getCarrier(infoObj.courierNumber);
        invoiceObj.courierName = infoObj.courierName;

        // order summary row
        var summaryHeaderRow = $(aOrderNode).find("td:contains('Order Number:')").last().closest("table");

        if (summaryHeaderRow.length > 0) {
          var summaryRow = $($(summaryHeaderRow)[0]).find("tr")[4];
          var totalCost = ContentScript._trimHTML($($(summaryRow).children()[7]).text());
          infoObj.value = totalCost.substring(totalCost.indexOf("$") + 1 , totalCost.length).trim();
          infoObj.value = infoObj.value.replace(",", "");
          invoiceObj.value = infoObj.value;

          var subTotalCost = ContentScript._trimHTML($($(summaryRow).children()[4]).text());
          invoiceObj.subTotalCost = subTotalCost.substring(subTotalCost.indexOf("$") + 1 , subTotalCost.length).trim();
          invoiceObj.subTotalCost = invoiceObj.subTotalCost.replace(",", "");
          // extract the sub total without taxes and shipping for BOG users
          infoObj.subTotalCost = invoiceObj.subTotalCost;

          var shippingCost = ContentScript._trimHTML($($(summaryRow).children()[5]).text());
          invoiceObj.shippingCost = shippingCost.substring(shippingCost.indexOf("$") + 1 , shippingCost.length).trim();
          invoiceObj.shippingCost = invoiceObj.shippingCost.replace(",", "");

          var tax = ContentScript._trimHTML($($(summaryRow).children()[6]).text());
          invoiceObj.tax = tax.substring(tax.indexOf("$") + 1 , tax.length).trim();
          invoiceObj.tax = invoiceObj.tax.replace(",", "");

          invoiceObj.orderDate = ContentScript._trimHTML($($(summaryRow).children()[2]).text());

          invoiceObj.orderNumber = ContentScript._trimHTML($($(summaryRow).children()[1]).text());
        }

        var shippingAddressNode = $(aOrderNode).find("font:contains('ShippingAddress'), font:contains('Shipping Address')").
        last().closest("table").find("tr").last().children();

        if (shippingAddressNode.length > 0 && shippingAddressNode.length == 3) {
          var addressElements = shippingAddressNode[1].childNodes;

          invoiceObj.addressName = ContentScript._trimHTML($(addressElements[3]).text());
          invoiceObj.addressLine1 = ContentScript._trimHTML($(addressElements[5]).text());
          invoiceObj.addressLine2 = ContentScript._trimHTML($(addressElements[7]).text());
          invoiceObj.addressCityStateZip = ContentScript._trimHTML($(addressElements[9]).text()) +
            "," + ContentScript._trimHTML($(addressElements[11]).text()) +
            "," + ContentScript._trimHTML($(addressElements[13]).text());
          invoiceObj.addressCountry = ContentScript._trimHTML($(addressElements[15]).text());

          var orderTableNode = $(aOrderNode).find("font:contains('Name')").last().closest("table");
          var orderItemsNodes = $($(orderTableNode).children("tbody")).children();

          if (orderItemsNodes.length > 7) {
            // the order has multiple items
            infoObj.packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
            var descNode = $($(orderItemsNodes[5]).children())[1];
            infoObj.firstItemDescription = ContentScript._trimHTML($(descNode).text());
          } else if (orderItemsNodes.length == 7) {
            var descNode = $($(orderItemsNodes[5]).children())[1];
            infoObj.packageDescription = ContentScript._trimHTML($(descNode).text());
            infoObj.firstItemDescription = infoObj.packageDescription;
          }

          var items = new Array();

          for (var i = 5; i < orderItemsNodes.length - 1; i = i + 4) {
            var itemRow = orderItemsNodes[i];
            var item = {};

            var itemDescNode = $(itemRow).children()[1];
            item.title = ContentScript._trimHTML($(itemDescNode).text());

            item.quantity = ContentScript._trimHTML($($(itemRow).children()[6]).text());

            var price = ContentScript._trimHTML($($(itemRow).children()[10]).text());
            item.price = price.substring(price.indexOf("$") + 1 , price.length).trim();

            items.push(item);
          }

          if (items.length > 0) {
            invoiceObj.items = items;
          }

        }

        infoObj.invoiceHtml = ContentScript._generateInvoice("forever21", invoiceObj);

      }
    } catch(e) {

    }

    return infoObj;
  }
};
