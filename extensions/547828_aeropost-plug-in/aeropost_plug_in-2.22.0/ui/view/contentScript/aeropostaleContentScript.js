/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Aeropostale Content Script class
 */
var AeropostaleContentScript = {

  modifyAeropostaleOrderDetailsPage : function(aDetailsHtml, aContainer) {
    var orderInfo = $("#processorderTrackingDetail", aDetailsHtml);
    var trackingNodes = $("b:contains('Tracking #:')", aDetailsHtml);
    var containerNode = aContainer ? aContainer : $("[class='second-table']")[0];
    var buttonClass =
      aDetailsHtml ? "aero-aeropostale-order-list-button" : "aero-aeropostale-order-details-button";

    if (trackingNodes.length > 0 &&
      ContentScript._isPackageForUser("Aeropostale", orderInfo, true)) {
      var button = ContentScript._createButton("preAlert");
      $(button).addClass(buttonClass);
      $(button).attr("delivered", false);

      var infoObj =
        AeropostaleContentScript.getAeropostalePackageInfo(orderInfo);

      infoObj.shipperName = "Aeropostale";

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
            aDetailsHtml ? "aeropostale-orders" : "aeropostale-order-details";
          var screenshotNode = aDetailsHtml ? containerNode : orderInfo;
          ContentScript._captureScreenshot(
            screenshotNode, packageInfo, top, left, false, targetPage);
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
        $(button).appendTo($(containerNode).find("td:last-child"));
      } else {
        $(containerNode).after(button);
      }

    } else {
      var button = ContentScript._createButton("preAlert");
      $(button).addClass(buttonClass);
      $(button).addClass("disabled");
      $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
      if (aDetailsHtml) {
        $(button).appendTo($(containerNode).find("td:last-child"));
      } else {
        $(containerNode).after(button);
      }
    }

  },

  modifyAeropostaleOrdersPage : function() {
    var ordersTable = $("b:contains('Date of Order')");
    if (ordersTable.length > 0) {
      var orders = $(ordersTable[0]).closest("table").find("tr");

      for (var i = 1; i < orders.length; i++) {
        var order = orders[i];
        // massive hack to solve a problem where amazon duplicates the previous package
        // shipping info in packages that don't have any
        var hasTracking = $(order).find("b:contains('Tracking #')");

        if (hasTracking.length > 0 &&
          ContentScript._isPackageForUser("Aeropostale", order, false)) {
          // get the tracking page url
          var orderDetailsUrl = $(order).find("a[class='pagelink']");
          if (orderDetailsUrl.length > 0) {
            orderDetailsUrl = "https://www.aeropostale.com" + $($(orderDetailsUrl)[0]).attr("href");
            // load package tracking page
            AeropostaleContentScript.processAeropostaleOrder(orderDetailsUrl, i);
          }
        } else {
          // the package hasn't been shipped yet (the tracking button is not enabled),
          // so we display the not prealertable button
          var button = ContentScript._createButton("preAlert");
          $(button).addClass("disabled");
          $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
          $(button).addClass("aero-aeropostale-order-list-button");
          $(button).appendTo($(order).find("td:last-child"));
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
  getAeropostalePackageInfo : function(aOrderNode) {
    var infoObj = {};
    var invoiceObj = {};

    try {
      var trackingNodes = $(aOrderNode).find("b:contains('Tracking #:')");
      if (trackingNodes.length > 0) {
        var trackingNode = $(trackingNodes)[0].nextSibling;
        var trackingNodeString = ContentScript._trimHTML(trackingNode.textContent);
        infoObj.courierNumber = trackingNodeString;
        invoiceObj.courierNumber = infoObj.courierNumber;
        infoObj.courierName = ContentScript._getCarrier(infoObj.courierNumber);
        invoiceObj.courierName = infoObj.courierName;

        var orderCostNode = $($(aOrderNode).find("b:contains('Total:')")[0]).parent().next();
        var totalCost = ContentScript._trimHTML($(orderCostNode).text());
        infoObj.value = totalCost.substring(totalCost.indexOf("$") + 1 , totalCost.indexOf(" ")).trim();
        infoObj.value = infoObj.value.replace(",", "");
        invoiceObj.value = infoObj.value;

        var orderTableNode = $(aOrderNode).find("table[class='itemized-table'] table");
        var orderItemsNodes = $(orderTableNode).find("tr");

        if (orderItemsNodes.length > 2) {
          // the order has multiple items
          infoObj.packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
          var descNode = $($(orderItemsNodes[1]).find("a[class='prodtitle']"));
          infoObj.firstItemDescription = ContentScript._trimHTML($(descNode).text());
        } else if (orderItemsNodes.length == 2) {
          var descNode = $($(orderItemsNodes[1]).find("a[class='prodtitle']"));
          infoObj.packageDescription = ContentScript._trimHTML($(descNode).text());
          infoObj.firstItemDescription = infoObj.packageDescription;
        }

        var subTotalNode = $($(aOrderNode).find("td:contains('Item Sub-Total:')")[1]).next();
        var subTotalCost = ContentScript._trimHTML($(subTotalNode).text());
        invoiceObj.subTotalCost = subTotalCost.substring(subTotalCost.indexOf("$") + 1 , subTotalCost.length).trim();
        invoiceObj.subTotalCost = invoiceObj.subTotalCost.replace(",", "");
        // extract the sub total without taxes and shipping for BOG users
        infoObj.subTotalCost = invoiceObj.subTotalCost;

        var shippingCostNode = $($(aOrderNode).find("td:contains('Shipping:')")[1]).next();
        var shippingCost = ContentScript._trimHTML($(shippingCostNode).text());
        invoiceObj.shippingCost = shippingCost.substring(shippingCost.indexOf("$") + 1 , shippingCost.indexOf(" ")).trim();
        invoiceObj.shippingCost = invoiceObj.shippingCost.replace(",", "");

        var taxNode = $($(aOrderNode).find("td:contains('Sales Tax:')")[1]).next();
        var tax = ContentScript._trimHTML($(taxNode).text());
        invoiceObj.tax = tax.substring(tax.indexOf("$") + 1 , tax.indexOf(" ")).trim();
        invoiceObj.tax = invoiceObj.tax.replace(",", "");

        var items = new Array();

        for (var i = 1; i < orderItemsNodes.length; i++) {
          var itemRow = orderItemsNodes[i];
          var item = {};

          var itemDescNode = $(itemRow).children()[2];
          item.title = ContentScript._trimHTML($(itemDescNode).text());

          item.quantity = ContentScript._trimHTML($($(itemRow).children()[1]).text());

          var price = ContentScript._trimHTML($($(itemRow).children()[3]).text());
          item.price = price.substring(price.indexOf("$") + 1 , price.indexOf(" ")).trim();

          items.push(item);
        }

        if (items.length > 0) {
          invoiceObj.items = items;
        }

        // iterate through items to get their info

        var orderDateNode = $(aOrderNode).find("span:contains('Date of Order')");
        invoiceObj.orderDate = $(orderDateNode)[0].nextSibling.textContent;

        var orderNumberNode = $(aOrderNode).find("b:contains('Order Details for Order')");
        var orderNumber = ContentScript._trimHTML($(orderNumberNode).text());
        invoiceObj.orderNumber = orderNumber.substring(orderNumber.indexOf("#") + 1 , orderNumber.length).trim();

        var shippingAddressNode = $(aOrderNode).find("b:contains('Shipping To:')").parent();

        var addressElements = shippingAddressNode[0].childNodes;

        invoiceObj.addressName = ContentScript._trimHTML($(addressElements[5]).text());
        invoiceObj.addressLine1 = ContentScript._trimHTML($(addressElements[7]).text());
        invoiceObj.addressLine2 = ContentScript._trimHTML($(addressElements[9]).text());
        invoiceObj.addressCityStateZip = ContentScript._trimHTML($(addressElements[11]).text());

        infoObj.invoiceHtml = ContentScript._generateInvoice("aeropostale", invoiceObj);

      }
    } catch(e) {

    }

    return infoObj;
  },

  processAeropostaleOrder : function(aOrderUrl, aOrderIndex) {
    var request =
      $.ajax({
        type: "GET",
        url: aOrderUrl,
        jsonp: false,
        timeout: 60 * 1000,
      }).done(function(aData) {
        var ordersTable = $("b:contains('Date of Order')");
        if (ordersTable.length > 0) {
          var orders = $(ordersTable[0]).closest("table").find("tr");
          var order = orders[aOrderIndex];

          AeropostaleContentScript.modifyAeropostaleOrderDetailsPage(aData, order);

        }
      }).fail(function(aXHR, aTextStatus, aError) {
        console.log("tracking request error: " + aError);
      });
  }
};
