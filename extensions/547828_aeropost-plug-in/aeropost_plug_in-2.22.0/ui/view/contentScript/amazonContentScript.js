/**
 * Copyright (C) 2016 Aeropost. All Rights Reserved.
 */

/**
 * Amazon Content Script class
 */
var AmazonContentScript = {

  /**
   * Injects the amazon script to get product info
   */
  injectAmazonScript : function() {
    var amazonScript = chrome.extension.getURL("ui/view/siteScripts/amazonScript.js");
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = amazonScript;

    (document.body || document.head || document.documentElement).appendChild(script);
  },

  modifyAmazonOrdersPage : function() {
    var orders = $("div[class~='order-info']");
    var ordersLength = orders.length;

    if (ordersLength > 0) {
      for (var i = 0; i < ordersLength; i++) {
        var order = orders[i];
        var orderDetails = $(order).parent().find("div[class~='shipment']");
        // massive hack to solve a problem where amazon duplicates the previous package
        // shipping info in packages that don't have any
        var trackingButtonEnabled = $(orderDetails).find("span[class~='track-package-button']");

        if (trackingButtonEnabled.length > 0) {
          // get the tracking page url
          var trackingPageUrl = $($(trackingButtonEnabled)[0]).find("a");
          if (trackingPageUrl.length > 0) {
            trackingPageUrl = "https://www.amazon.com" + $($(trackingPageUrl)[0]).attr("href");
            // load package tracking page
            //var asins = $(order).parent().find("div[class~='a-fixed-left-grid-col'][class~='a-col-right']");
            AmazonContentScript.processAmazonOrder(trackingPageUrl, i);
          }
        } else {
          // the package hasn't been shipped yet (the tracking button is not enabled),
          // so we display the not prealertable button
          var button = ContentScript._createButton("preAlert");
          $(button).addClass("disabled");
          $(button).removeClass("loading");
          $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
          $(button).addClass("aero-amazon-button");
          $(button).prependTo(order);
        }
      }
    }
  },

  modifyAmazonNewOrdersPage : function() {
    var orders = $("div[class~='order-card']");
    var ordersLength = orders.length;    
    if (ordersLength > 0) {
      for (var i = 0; i < ordersLength; i++) {
        var order = orders[i];
        var orderDetails = $(order).find("div[class~='a-button-stack']");
        // massive hack to solve a problem where amazon duplicates the previous package
        // shipping info in packages that don't have any
        var trackingButtonEnabled = $(orderDetails).find("span[class~='a-button-inner']");

        if (trackingButtonEnabled.length > 0) {
          var trackingPageUrl = "";
          for(var j = 0; j < trackingButtonEnabled.length; j++ )
          {
            if(trackingButtonEnabled[j].textContent.trim() == "Rastrear paquete" || trackingButtonEnabled[j].textContent.trim() == "Track package")
            {
              // get the tracking page url
              trackingPageUrl = $($(trackingButtonEnabled)[j]).find("a");
              break;

            }

          }
          if (trackingPageUrl.length > 0) {
            trackingPageUrl = "https://www.amazon.com" + $($(trackingPageUrl)[0]).attr("href");
            // load package tracking page

            //var asins = $(order).parent().find("div[class~='a-fixed-left-grid-col'][class~='a-col-right']");
            AmazonContentScript.processAmazonOrder(trackingPageUrl, i);
          }
        } else {
          // the package hasn't been shipped yet (the tracking button is not enabled),
          // so we display the not prealertable button
          var button = ContentScript._createButton("preAlert");
          $(button).addClass("disabled");
          $(button).removeClass("loading");
          $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
          $(button).addClass("aero-amazon-button");
          $(button).prependTo($(order).find("div[class~='order-header']"));
        }
      }
    }
  },
  
  processAmazonOrder : function(aTrackingPageUrl, aOrderIndex) {
    var request =
      $.ajax({
        type: "GET",
        url: aTrackingPageUrl,
        jsonp: false,
        timeout: 60 * 1000,
        }).done(function(aData) {

          //var asins = AmazonContentScript._getAsins(aProducts);

          var orders = $("div[class~='order-card']");
          var order = orders[aOrderIndex];
          var orderDetails = $(order).find("div[class~='shipment']");

          var trackingInfoContainer = $($("[class='a-fixed-right-grid-col a-col-right'] [class='a-box']", aData)[1]);
          var trackingInfoNodes = $(trackingInfoContainer).find("span");
          var trackingInfo = new Array();
          for (var i = 0; i < trackingInfoNodes.length; i++) {
            trackingInfo.push($(trackingInfoNodes[i]).text());
          }

          if (trackingInfo.length == 0) {
            trackingInfoContainer = $("div[id='carrierRelatedInfo-container']", aData);
            if (trackingInfoContainer.length > 0) {
              trackingInfo[0] = $("h3:contains('Shipped with')", aData).text();
              if(trackingInfo[0].length == 0){
                trackingInfo[0] = $("h3:contains('Enviado con')", aData).text();
              }

              trackingInfo[1] = $(".carrierRelatedInfo-trackingId-text", aData).text();

              if(trackingInfo[1].length == 0)
              {
                trackingInfo[1] = $(".pt-delivery-card-trackingId", aData).text();
              }
            }
           
          }


          // this means we are in the right place and got the tracking info
          // successfully
          if (trackingInfo.length == 2 && trackingInfo[1].length > 0) {
            var courierName = ContentScript._trimHTML(trackingInfo[0]);
            var courierNumber = ContentScript._trimHTML(trackingInfo[1]);
            if(courierName.length == 0){
              courierName = "Other";
            }

            if (courierName.length > 0 && courierNumber.length > 0 &&
              courierNumber.toLowerCase().indexOf("n/a") == -1 &&
              courierNumber.toLowerCase().indexOf("no tracking number") == -1) {

              courierName = courierName.replace("Shipped with ","");
              courierName = courierName.replace("Enviado con ","");
              courierNumber = courierNumber.replace("Tracking ID: ","");
              courierNumber = courierNumber.replace("ID de rastreo: ","");
              // make sure we get the carrier and tracking #, else don't inyect the button
              //var orderDetails = $(order).parent().find("div[class~='shipment']");

              if (true/*orderDetails.length > 0*/) { //se quita la validacion para que siempre entre. Se deja el codigo para posible mejora posterior y mostrar el boton de pre alerta en la pagina principal
                var delivered = $($(orderDetails)[0]).hasClass("shipment-is-delivered");

                var button;
                // handle multiple shipments order
                // attribute to recognize orders with multiple shipments
                //GET NUMBER OF SHIPMENTS IN ORDER
                //$(button).attr("multipleShipments", trackingDetails.length > 1);
                // multiple packages, take the user to the order details page
                if (/*orderDetails.length > 1*/true) {
                  button = ContentScript._createButton("viewDetails");
                  $(button).removeClass("loading");
                  $(button).addClass("aero-amazon-button");
                  $(button).click(function() {
                    //get order detail url version 1 amazon
                    var orderDetailsNode = 
                    $(order).find("div[class~='a-box-inner']").find('a[id^="Order-details_"]').attr("href");
                                
                    if(orderDetailsNode == undefined){
                                orderDetailsNode = $(order).find("div[class~='a-box-inner']").find('a[id^="Detalles-del-pedido-"]').attr("href");
                    }
                    if(orderDetailsNode == undefined)
                    {
                      orderDetailsNode = $(order).find("a:contains('View order details')").attr('href'); //en ingles
                    }

                    if(orderDetailsNode == undefined)
                    {
                      orderDetailsNode = $(order).find("a:contains('Ver detalles del pedido')").attr('href'); //en espanol
                    }

                    var orderDetailsUrl = "https://www.amazon.com" + orderDetailsNode;
                    //get order detail url version 2 amazon
                   
                     if(orderDetailsNode == undefined){
                             orderDetailsNode = $(order).find("div[class~='a-box-inner']").find('a[class~="a-link-normal"]')
                             $(orderDetailsNode).each(function() {
                                 if (this.href.indexOf('gp/your-account/order-details') != -1) {
                                        orderDetailsUrl = this.href
                                                      return false;
                                                 
                                 }
                             });
                         
                     }
                    if(orderDetailsUrl != undefined){
                     
                     window.location = orderDetailsUrl;
                    }
                    
                    });
                } /*else {
                  button = ContentScript._createButton("loading");
                  $(button).addClass("aero-amazon-button");
                  $(button).attr("orderIndex", aOrderIndex);
                  $(button).attr("delivered", delivered);
                  // append tracking number as Id of the button, and send message to
                  // check the tracking number and disable the button if the prealert
                  // already exists
                  var infoObj = {};
                  //infoObj.value = AmazonContentScript.getAmazonOrderTotal(order);
                  var descObj = AmazonContentScript.getAmazonPackageDescription(order);
                  infoObj.packageDescription = descObj.packageDescription;
                  infoObj.firstItemDescription = descObj.firstItemDescription;
                  infoObj.packageDescriptions = descObj.packageDescriptions;

                  infoObj.value = descObj.value;

                  infoObj.invoiceUrl =
                    AmazonContentScript.getAmazonInvoiceUrl(order);

                  infoObj.ordersUrl = AmazonContentScript.getAmazonOrdersUrl(aData);

                  infoObj.courierName = courierName;
                  infoObj.courierNumber = courierNumber;
                  var orderActions = $(order).find("div[class~='actions']");
                  var orderInfoNode = $(orderActions[0]).children()[1];
                  infoObj.shipperName = "Amazon";
                  infoObj.isNewPrealert = true;
                  infoObj.invoice = aData;

                  $(button).attr("buttonId", "aero-prealert-" + courierNumber + "-" + aOrderIndex);
                  $(button).attr("packageInfo", JSON.stringify(infoObj));
                  var address = AmazonContentScript._getShippingAddres(aData);
                  
                      
                  chrome.runtime.sendMessage({message: "checkPreAlert",
                                           courierNumber: courierNumber,
                                           delivered : $(button).attr("delivered"),
                                           firstItemDescription : infoObj.firstItemDescription,
                                           invoiceUrl : infoObj.invoiceUrl,
                                           shipper : infoObj.shipperName,
                                           generateInvoice : true,
                                           isNewPrealert : true,
                                           shippingAddress : address,
                                           orderIndex : aOrderIndex}, function(response) {

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
                      var packageInfo = JSON.parse($(this).attr("packageInfo"));
                      ContentScript._populateConfirmation(packageInfo);

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
                }*/
                $(button).prependTo($(order).find("div[class~='order-header']"));
              }

            }
          } else {
            //Get package information
            var infoObj = {};
            var descObj = AmazonContentScript.getAmazonPackageValue(order);
            infoObj.packageDescription = descObj.packageDescription;
            infoObj.firstItemDescription = descObj.firstItemDescription;
            infoObj.packageDescriptions = descObj.packageDescriptions;
            infoObj.value = descObj.value;
            infoObj.shipperName = "Amazon";
            infoObj.isNewPrealert = true;

            //Get Invoice
            var orderDetailsUrl = "https://www.amazon.com";
            var orderDetailsNode = $(order).find("div[class~='a-box-inner']").find('a[class~="a-link-normal"]')
            $(orderDetailsNode).each(function() {
                if (this.href.indexOf('gp/css/summary/print.html') != -1) {
                      orderDetailsUrl = this.href
                                    return false;
                                
                }
            });

            var invoiceUrl = [];
            if(orderDetailsUrl != undefined){
              var request =
                $.ajax({
                  type: "GET",
                  url: orderDetailsUrl,
                  jsonp: false,
                  async: false,
                  }).done(function(aDetails) { 
                    infoObj.address = AmazonContentScript._getShippingAddres(aDetails);
                    infoObj.invoice = aDetails;
                    invoiceUrl[0] = orderDetailsUrl;
                    infoObj.ordersUrl = invoiceUrl;
                    localStorage.setItem('infoObj', JSON.stringify(infoObj));

                  }).fail(function(aXHR, aTextStatus, aError) {
                    console.log("tracking request error: " + aError);
                  });

            }

            //Get the items that contains the tracking information.
            var items =  $("a[class='a-link-normal parentWidth']", aData);
            if(items.length > 0){
              var button = ContentScript._createButton("viewDetails");
              $(button).removeClass("loading");
              $(button).addClass("aero-amazon-button");
              $(button).prependTo($(order).find("div[class~='order-info']"));
              $(button).click(function() {
                  window.location = aTrackingPageUrl;
              });

            }else{
              // we don't have the tracking info, so the package is not prealertable
              // at this point
              var button = ContentScript._createButton("preAlert");
              $(button).addClass("disabled");
              $(button).removeClass("loading");
              $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
              $(button).addClass("aero-amazon-button");
              $(button).prependTo($(order).find("div[class~='order-info']"));
            }
          }
        }).fail(function(aXHR, aTextStatus, aError) {
          console.log("tracking request error: " + aError);
        });

  },

  modifyAmazonTrackOrderPage : function (){
    var items =  $("a[class='a-link-normal parentWidth']");
    $($(".asinTrackingInformation")).removeClass("hidden");

    if(items.length > 0){
      for (var i = 0; i < items.length; i++) {
        var track = $(items[i]).find("span").text().split(".");

        if (track.length > 0) {

          var button = ContentScript._createButton("loading");
          $(button).addClass("aero-amazon-order-details-button");
          $(button).attr("orderIndex", i);
          $(button).attr("delivered", status.indexOf("Delivered") != -1);

          var infoObj = JSON.parse(localStorage.getItem('infoObj'));

          infoObj.shipperName = "Amazon";
          infoObj.isNewPrealert = true;
          infoObj.courierNumber = track[1].trim();
          infoObj.courierName = ContentScript._getCarrier(track[1].trim());

          $(button).attr("buttonId", "aero-prealert-" +  infoObj.courierNumber);
          $(button).attr("packageInfo", JSON.stringify(infoObj));

          chrome.runtime.sendMessage({message: "checkPreAlert",
                                    courierNumber: infoObj.courierNumber,
                                    delivered : $(button).attr("delivered"),
                                    firstItemDescription : infoObj.firstItemDescription,
                                    invoiceUrl : infoObj.invoiceUrl,
                                    generateInvoice : true,
                                    shippingAddress : infoObj.address,
                                    isNewPrealert : true,
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
              var packageInfo = JSON.parse($(this).attr("packageInfo"));
              ContentScript._populateConfirmation(packageInfo);
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

          $(button).appendTo($(items[i]).parent().parent());
        }
      }
    }
  },

  modifyAmazonOrderDetailsPage : function() {
    var orderPackages = $("a[name^='shipped-items']");    
    for (var i = 0; i < orderPackages.length; i++) {
      var orderPackage = orderPackages[i];

      // inject button if the package has tracking
      var trackingNode = $(orderPackage).find("img[alt^='Track']");
      var status = $($(orderPackage).find("b[class='sans']")[0]).text();

      if (trackingNode.length > 0 /*&&
          status.indexOf("Delivered") == -1*/) {

        var button = ContentScript._createButton("loading");
        $(button).addClass("aero-amazon-order-details-button");
        $(button).attr("orderIndex", i);
        $(button).attr("delivered", status.indexOf("Delivered") != -1);

        var infoObj =
          AmazonContentScript.getAmazonPackageInfo(orderPackages[i]);
        infoObj.invoiceUrl =
         AmazonContentScript.getAmazonInvoiceUrl(null, true);
        //console.log("invoice" + infoObj.courierNumber + ": " + infoObj.invoiceUrl);

        infoObj.shipperName = "Amazon";
        infoObj.isNewPrealert = true;
        var courierNumber = infoObj.courierNumber;
        infoObj.packageDescription = aInfoObj.firstItemDescription;
        $(button).attr("buttonId", "aero-prealert-" + courierNumber);
        $(button).attr("packageInfo", JSON.stringify(infoObj));
        var address = AmazonContentScript._getShippingAddres(null);

        chrome.runtime.sendMessage({message: "checkPreAlert",
                                   courierNumber: courierNumber,
                                   delivered : $(button).attr("delivered"),
                                   firstItemDescription : infoObj.firstItemDescription,
                                   invoiceUrl : infoObj.invoiceUrl,
                                   generateInvoice : true,
                                   shippingAddress : address,
                                   isNewPrealert : true,
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
            var packageInfo = JSON.parse($(this).attr("packageInfo"));
            ContentScript._populateConfirmation(packageInfo);
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

        $(button).appendTo($(trackingNode).parent().parent());
      } else {
        var aTrackingPageUrl = "https://www.amazon.com/gp/css/shiptrack/view.html/ref=ya_st_weblab_c?ie=UTF8&orderID=" + $("bdi").text();
        
        var request =
          $.ajax({
            type: "GET",
            url: aTrackingPageUrl,
            jsonp: false,
            async: false,
            }).done(function(aData) { 
              var items =  $("a[class='a-link-normal parentWidth']", aData);
              if(items.length > 0){
                var button = ContentScript._createButton("viewDetails");
                $(button).addClass("aero-amazon-order-details-button");
                $(button).removeClass("loading");
                $(button).prependTo(orderPackage);
                $(button).click(function() {
                  window.location = aTrackingPageUrl;
                });
              }else{
               
                var containerNode =
				$($("[class='displayAddressDiv']")[0]).closest("table").parent().
				  parent().prev().find("table");
			  containerNode = $(containerNode).find("td")[0];

			  var button = ContentScript._createButton("preAlert");
			  $(button).addClass("aero-amazon-order-details-button");
			  $(button).addClass("disabled");
			  $(button).removeClass("loading");
			  $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
			  $(button).prependTo(containerNode);
              }

            }).fail(function(aXHR, aTextStatus, aError) {
              console.log("tracking request error: " + aError);
            });
       
      }
    }
  },

  modifyAmazonNewOrderDetailsPage : function() {
    var orderPackages = $("div[class~='shipment']"); 
    for (var i = 0; i < orderPackages.length; i++) {
      var orderPackage = orderPackages[i];

      var trackingButtonEnabled = $(orderPackage).find("span[class~='track-package-button']");
      if (trackingButtonEnabled.length > 0) {
        // get the tracking page url
        var trackingPageUrl = $($(trackingButtonEnabled)[0]).find("a");
        if (trackingPageUrl.length > 0) {
          trackingPageUrl = "https://www.amazon.com" + $($(trackingPageUrl)[0]).attr("href");
          // load package tracking page
          //var asins = $(orderPackage).find("div[class~='a-fixed-left-grid-col'][class~='a-col-right']");
          AmazonContentScript.processAmazonOrderDetails(trackingPageUrl, i);
        }
      } else {
        var aTrackingPageUrl = "https://www.amazon.com/gp/css/shiptrack/view.html/ref=ya_st_weblab_c?ie=UTF8&orderID=" + $("bdi").text();
        
        var request =
          $.ajax({
            type: "GET",
            url: aTrackingPageUrl,
            jsonp: false,
            //timeout: 60 * 1000,
            async: false,
            }).done(function(aData) { 
              var items =  $("a[class='a-link-normal parentWidth']", aData);
              if(items.length > 0){
                var button = ContentScript._createButton("viewDetails");
                $(button).addClass("aero-amazon-order-details-button");
                $(button).removeClass("loading");
                $(button).prependTo(orderPackage);
                $(button).click(function() {
                  window.location = aTrackingPageUrl;
                });
              }else{
                 var button = ContentScript._createButton("preAlert");
                $(button).addClass("aero-amazon-order-details-button");
                $(button).addClass("disabled");
                $(button).removeClass("loading");
                $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
                $(button).prependTo(orderPackage);
              }

            }).fail(function(aXHR, aTextStatus, aError) {
              console.log("tracking request error: " + aError);
            });
      }
    }
  },

  processAmazonOrderDetails : function(aTrackingPageUrl, aShipmentIndex) {
    var request =
      $.ajax({
        type: "GET",
        url: aTrackingPageUrl,
        jsonp: false,
        timeout: 60 * 1000,
        }).done(function(aData) {

          //var asins = AmazonContentScript._getAsins(aProducts);

          var trackingInfoContainer = $($("[class='a-fixed-right-grid-col a-col-right'] [class='a-box']", aData)[1]);
          var trackingInfoNodes = $(trackingInfoContainer).find("span");
          var trackingInfo = new Array();
          for (var i = 0; i < trackingInfoNodes.length; i++) {
            trackingInfo.push($(trackingInfoNodes[i]).text());
          }

          if (trackingInfo.length == 0) {
            trackingInfoContainer = $("div[id='carrierRelatedInfo-container']", aData);
            if (trackingInfoContainer.length > 0) {
              trackingInfo[0] = $("h3:contains('Shipped with')", aData).text();
              if(trackingInfo[0].length == 0){
                trackingInfo[0] = $("h3:contains('Enviado con')", aData).text();
              }

              trackingInfo[1] = $(".carrierRelatedInfo-trackingId-text", aData).text();
              if(trackingInfo[1].length == 0)
              {
                trackingInfo[1] = $(".pt-delivery-card-trackingId", aData).text();
              }

            }
           
          }

          // this means we are in the right place and got the tracking info
          // successfully
          if (trackingInfo.length == 2 &&
              trackingInfo[1].length > 0) {
            var courierName = ContentScript._trimHTML(trackingInfo[0]);
            var courierNumber = ContentScript._trimHTML(trackingInfo[1]);
            if(courierName.length == 0){
              courierName = "Other";
            }

            if (courierName.length > 0 && courierNumber.length > 0 &&
                courierNumber.toLowerCase().indexOf("n/a") == -1 &&
                courierNumber.toLowerCase().indexOf("no tracking number") == -1) {

                courierName = courierName.replace("Shipped with ","");
                courierName = courierName.replace("Enviado con ","");
                courierNumber = courierNumber.replace("Tracking ID: ","");
                courierNumber = courierNumber.replace("ID de rastreo: ","");

                // make sure we get the carrier and tracking #, else don't inyect the button
                var orderPackages =  $("div[class~='shipment']");

                if (orderPackages.length > 0) {
                  var orderPackage = $(orderPackages)[aShipmentIndex];
                  var infoObj =
                    AmazonContentScript.getAmazonNewPackageInfo(orderPackage);
                  infoObj.courierName = courierName;
                  infoObj.courierNumber = courierNumber;
                  infoObj.invoiceUrl =
                    AmazonContentScript.getAmazonInvoiceUrl(null, true);
                  infoObj.ordersUrl = AmazonContentScript.getAmazonOrdersUrl(aData);
                  //console.log("invoice" + courierNumber + ": " + infoObj.invoiceUrl);

                  infoObj.shipperName = "Amazon";
                  infoObj.isNewPrealert = true;
                  AmazonContentScript.getNewAmazonInvoice(infoObj, aShipmentIndex);

                }

            }
          } else {
            // we don't have the tracking info, so the package is not prealertable
            // at this point
            var orderPackages =  $("div[class~='shipment']");

            if (orderPackages.length > 0) {
              var orderPackage = $(orderPackages)[aShipmentIndex];
              var button = ContentScript._createButton("preAlert");
              $(button).addClass("disabled");
              $(button).removeClass("loading");
              $("#aero-injected-button-text", button).text(chrome.i18n.getMessage("content_script_button_not_prealertable_label"));
              $(button).addClass("aero-amazon-order-details-button");
              $(button).prependTo($(orderPackage));
            }
          }
        }).fail(function(aXHR, aTextStatus, aError) {
          console.log("tracking request error: " + aError);
        });
  },

  /**
   * Retrieves the order invoice for new amazon order details page, so we can
   * extract the right value for each package
   */
  getNewAmazonInvoice : function(aInfoObj, aShipmentIndex) {

    if (aInfoObj.invoiceUrl) {
      var request =
        $.ajax({
          type: "GET",
          url: aInfoObj.invoiceUrl,
          jsonp: false,
          timeout: 60 * 1000,
          }).done(function(aData) {

            /*var orderValue = ContentScript._getValueFromInvoice(aData, aInfoObj.firstItemDescription);
            if (orderValue) {
              aInfoObj.value = orderValue.totalValue;
              aInfoObj.subTotalCost = orderValue.subTotalCost;
            }*/

            var targetButton =
            $("[buttonId='aero-prealert-" + aInfoObj.courierNumber + "']");
            if (targetButton.length > 0) {
              $(targetButton).attr("packageInfo", JSON.stringify(aInfoObj));
            }

            var orderPackages =  $("div[class~='shipment']");

            if (orderPackages.length > 0) {
              var orderPackage = $(orderPackages)[aShipmentIndex];
              var delivered = $(orderPackage).hasClass("shipment-is-delivered");

              aInfoObj.packageDescription = aInfoObj.firstItemDescription;
              var button = ContentScript._createButton("loading");
              $(button).addClass("aero-amazon-order-details-button");
              $(button).attr("orderIndex", aShipmentIndex);
              $(button).attr("delivered", delivered);

              $(button).attr("buttonId", "aero-prealert-" + aInfoObj.courierNumber);
              $(button).attr("packageInfo", JSON.stringify(aInfoObj));
              var address = AmazonContentScript._getShippingAddres(aData);

              chrome.runtime.sendMessage({message: "checkPreAlert",
                                       courierNumber: aInfoObj.courierNumber,
                                       delivered: $(button).attr("delivered"),
                                       firstItemDescription : aInfoObj.firstItemDescription,
                                       invoiceUrl : aInfoObj.invoiceUrl,
                                       invoiceHtml : aData,
                                       shippingAddress : address,
                                       isNewPrealert : true,
                                       shipper : aInfoObj.shipperName}, function(response) {

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

                  var packageInfo = JSON.parse($(this).attr("packageInfo"));
                  ContentScript._populateConfirmation(packageInfo);
                      
                },
                onLoad:function() {
                  $('html, body').css('overflow', 'hidden'); // page scrollbars off
                },
                onClosed:function() {
                  ContentScript._populateConfirmation(null);
                  $('html, body').css('overflow', ''); // page scrollbars on
                },
                onComplete : function() {
                  $(this).colorbox.resize();
                }
              });

              $(button).prependTo($(orderPackage));
            }

          }).fail(function(aXHR, aTextStatus, aError) {
            console.log("error retrieving the package invoice: " + aError);
          });
    }
  },

  /**
   * Extracts the Amazon package information for the preAlert
   * @param aOrderNode the order info node to extract the package
   * tracking info from
   * @return an object with the tracking info (if available)
   */
  getAmazonPackageInfo : function(aOrderNode) {
    var infoObj = {};
    var trackingNode = $(aOrderNode).find("img[alt^='Track']")[0];
    // in this case, the carrier and the tracking # come in a sentence, so we
    // should extract the info from it
    var trackingString = $($(trackingNode).parent().parent()).text();
    var multipleUnitsRegex = /^(\d+) of (.*)/;

    // e.g "1 package via UPS with tracking number 1Z1Y2E300334122088"
    var carrier =
      trackingString.substring(
        trackingString.indexOf("via") + 3,
        trackingString.indexOf("with tracking")).trim();
    infoObj.courierName = carrier;

    var courierNumber =
      trackingString.substring(
        trackingString.indexOf("number") + 6, trackingString.length).trim();
    if (courierNumber.indexOf("\n") != -1) {
      courierNumber = courierNumber.substring(0, courierNumber.indexOf("\n"));
    }
    infoObj.courierNumber = ContentScript._trimHTML(courierNumber);

    var orderDetailsNode =
      $(aOrderNode).find("td[valign='top'][bgcolor='#ffffff'][width='100%'][align='right']")[0];

    var descriptionNode =
      $(orderDetailsNode).find("div[style='float:left; max-width:500px; margin:0 10px 0 10px;']");

    infoObj.packageDescriptions = [];
    if (descriptionNode.length == 1) {
      //infoObj.packageDescriptions.push(ContentScript._trimHTML($($($(descriptionNode[0]).children()[0]).children()[0]).text()));
      infoObj.packageDescription =
        ContentScript._trimHTML($($($(descriptionNode[0]).children()[0]).children()[0]).text());
      var res = multipleUnitsRegex.exec(infoObj.packageDescription);
      if (res) {
        infoObj.packageDescription = res[2];
      }else{
        multipleUnitsRegex = /^(\d+) de (.*)/;
        res = multipleUnitsRegex.exec(infoObj.packageDescription);
        if (res) {
          infoObj.packageDescription = res[2];
        }
      }
      infoObj.firstItemDescription = infoObj.packageDescription;
      infoObj.packageDescriptions.push(infoObj.packageDescription);
    } else if (descriptionNode.length > 1) {
      for (var i = 0; i < descriptionNode.length; i++) {
        infoObj.packageDescriptions.push(ContentScript._trimHTML($($($(descriptionNode[i]).children()[0]).children()[0]).text()));
      }
      infoObj.packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
      infoObj.firstItemDescription =
        ContentScript._trimHTML($($($(descriptionNode[0]).children()[0]).children()[0]).text());
      var res = multipleUnitsRegex.exec(infoObj.firstItemDescription);
      if (res) {
        infoObj.firstItemDescription = res[2];
      }
    }

    // get the final price
    var orderCostNode =
      $($($(orderDetailsNode).children()[2]).find("td > b"))[1];

    var value = ContentScript._trimHTML($(orderCostNode).text());
    infoObj.value = value.substring(value.indexOf("$") + 1, value.length).trim();
    infoObj.value = infoObj.value.replace(",", "");

    // extract the sub total without taxes and shipping for BOG users
    infoObj.subTotalCost = infoObj.value;

    return infoObj;
  },

  /**
   * Extracts the Amazon package information for the preAlert, using the new
   * order details page
   * @param aPackageNode the package info node to extract the info from
   * @return an object with the tracking info (if available)
   */
  getAmazonNewPackageInfo : function(aPackageNode) {
    var infoObj = {};
    var packageDescription = null;
    var firstItemDescription = null;
    var orderDescription = $(aPackageNode).find("div[class='a-fixed-left-grid-col yohtmlc-item a-col-right']>div[class='a-row']>a[class='a-link-normal']");
    var multipleUnitsRegex = /^(\d+) of (.*)/;

    var packageDescriptions = [];
    
    //Un item
    if (orderDescription.length == 1) {
      packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
      var res = multipleUnitsRegex.exec(packageDescription);
      if (res) {
        packageDescription = res[2];
      }else{
        multipleUnitsRegex = /^(\d+) de (.*)/;
        res = multipleUnitsRegex.exec(packageDescription);
        if (res) {
          packageDescription = res[2];
        }
      }
      firstItemDescription = packageDescription;
      packageDescriptions.push(packageDescription);
    
    
    //Multiples items
    }else if (orderDescription.length > 1) {
      for(var i = 0; i < orderDescription.length; i++){
        packageDescription = ContentScript._trimHTML($(orderDescription[i]).text());
        var res = multipleUnitsRegex.exec(packageDescription);
        if (res) {
          packageDescription = res[2];
        }else{
          multipleUnitsRegex = /^(\d+) de (.*)/;
          res = multipleUnitsRegex.exec(packageDescription);
          if (res) {
            packageDescription = res[2];
          }
        }
        packageDescriptions.push(packageDescription);
      }

      packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
      firstItemDescription = ContentScript._trimHTML($(orderDescription[0]).text());
      var res = multipleUnitsRegex.exec(firstItemDescription);
      if (res) {
        firstItemDescription = res[2];
      }
    }

    infoObj.packageDescriptions = packageDescriptions;
    infoObj.packageDescription = packageDescription;
    infoObj.firstItemDescription = firstItemDescription;
    
    //Saca el valor
    var value = null;
    var valueNode = $(aPackageNode).find("[class~='a-color-price']");
    if (valueNode.length > 0) {
      for (var i = 0; i < valueNode.length; i++) {
        var itemValue = $($(valueNode)[i]).text();
        itemValue = ContentScript._trimHTML(itemValue);
        itemValue = itemValue.substring(itemValue.indexOf("$") + 1, itemValue.length).trim();
        itemValue = itemValue.replace(",", "");
        if (value == null) {
          value = 0;
        }

        if(orderDescription.length > 1){
          packageDescription = ContentScript._trimHTML($(orderDescription[i]).text());
          var res = multipleUnitsRegex.exec(packageDescription);
          //a.cordero
          //se obtiene la cantidad en caso de que no este en la descripcion
          var quantityNodeDivs = $(aPackageNode).find("div[class~='a-fixed-left-grid-inner']");
          var quantityNode =  $(quantityNodeDivs[i]).find("span[class~='item-view-qty']");
          var multiItemsquantity = 0;
          if(quantityNode.length > 0 && $($(quantityNode)[0]).text().trim() != "")
             {
               var itemquantity = $($(quantityNode)[0]).text();
               multiItemsquantity = itemquantity.trim();
             }
          //---------------------------------
          if(res){
            value += Number(itemValue) * Number(res[1]);
          }else if(multiItemsquantity > 0)
          {
            value += Number(itemValue) * Number(multiItemsquantity);
          }else{
            value += Number(itemValue);
          }
        }else{
          packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
           //a.cordero
          //se obtiene la cantidad en caso de que no este en la descripcion
          var quantityNode = $(aPackageNode).find("span[class~='item-view-qty']");
          var multiItemsquantity = 0;
          if(quantityNode.length > 0)
          {
            var itemquantity = $($(quantityNode)[0]).text();
            multiItemsquantity = itemquantity.trim();
          }
          //------------------
          var res = multipleUnitsRegex.exec(packageDescription);
          if(res){
            value += Number(itemValue) * Number(res[1]);
          }else if(multiItemsquantity > 0)
          {
            value += Number(itemValue) * Number(multiItemsquantity);
          }else{
            value += Number(itemValue);
          }
        }
      }
    }
    infoObj.value = value.toFixed(2);

    // extract the sub total without taxes and shipping for BOG users
    infoObj.subTotalCost = infoObj.value;

    return infoObj;
  },

  /**
     * returns the amazon package description
     * @param aOrderNode the order node to get the package description from
     * @returns the amazon package description
     */
  getAmazonPackageDescription : function(aOrderNode) {
      var descObj = {};
      var orderDescription = $(aOrderNode).find("div[class='a-fixed-left-grid-col yohtmlc-item a-col-right']>div[class='a-row']>a[class='a-link-normal']");
      var multipleUnitsRegex = /^(\d+) of (.*)/;
      descObj.packageDescriptions = [];
      if (orderDescription.length == 1) {
          descObj.packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
          var res = multipleUnitsRegex.exec(descObj.packageDescription);
          
          if(res == null){
              multipleUnitsRegex = /^(\d+) de (.*)/;
              res = multipleUnitsRegex.exec(descObj.packageDescription);
          }
          
          if (res) {
              descObj.packageDescription = res[2];
          }
          descObj.firstItemDescription = descObj.packageDescription;
      } else if (orderDescription.length > 1) {
          for (var i = 0; i < orderDescription.length; i++) {
              var des = ContentScript._trimHTML($(orderDescription[i]).text())
              var res = multipleUnitsRegex.exec(des);
              
              if(res == null){
                  multipleUnitsRegex = /^(\d+) de (.*)/;
                  res = multipleUnitsRegex.exec(des);
              }
              if (res) {
                  descObj.packageDescriptions.push(res[2]);
              }else{
                   descObj.packageDescriptions.push(des);
              }
              
          }
          descObj.packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
          descObj.firstItemDescription = ContentScript._trimHTML($(orderDescription[0]).text());
          var res = multipleUnitsRegex.exec(descObj.firstItemDescription);
          
          if(res == null){
              multipleUnitsRegex = /^(\d+) de (.*)/;
              res = multipleUnitsRegex.exec(descObj.firstItemDescription);
          }
          
          if (res) {
              descObj.firstItemDescription = res[2];
          }
      }

       //Saca el valor
      var value = null;
      var valueNode = $(aOrderNode).find("[class~='a-color-price']");
      if (valueNode.length > 0) {
        for (var i = 0; i < valueNode.length; i++) {
          var itemValue = $($(valueNode)[i]).text();
          itemValue = ContentScript._trimHTML(itemValue);
          itemValue = itemValue.substring(itemValue.indexOf("$") + 1, itemValue.length).trim();
          itemValue = itemValue.replace(",", "");
          if (value == null) {
            value = 0;
          }

          if(orderDescription.length > 1){
            packageDescription = ContentScript._trimHTML($(orderDescription[i]).text());
            var res = multipleUnitsRegex.exec(packageDescription);
            if(res){
              value += Number(itemValue) * Number(res[1]);
            }else{
              value += Number(itemValue);
            }
          }else{
            packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
            var res = multipleUnitsRegex.exec(packageDescription);
            if(res){
              value += Number(itemValue) * Number(res[1]);
            }else{
              value += Number(itemValue);
            }
          }
        }
        //si no esta en la pagina principal se va a buscar en la pagina del detalle de la orden
      }else{
         //se deja esta validacion por si cambia la pagina y vuelve a esta version. 
        var urlDetails = $(aOrderNode).find("a:contains('Detalles del pedido')").attr('href');
        if(urlDetails == undefined || urlDetails == null ||urlDetails.length == 0){
          urlDetails = $(aOrderNode).find("a:contains('Order Details')").attr('href');
        }

         //la pagina de amazon cambio ahora dice Ver detalles del pedido o View order details
         if(urlDetails == undefined || urlDetails == null ||urlDetails.length == 0){
          urlDetails = $(aOrderNode).find("a:contains('View order details')").attr('href'); //en ingles
        }

        if(urlDetails == undefined || urlDetails == null ||urlDetails.length == 0){
          urlDetails = $(aOrderNode).find("a:contains('Ver detalles del pedido')").attr('href'); //en espanol
        }

        var amazonUrlComplete = "https://www.amazon.com" + urlDetails;

        var request =
                $.ajax({
                  type: "GET",
                  url: amazonUrlComplete,
                  jsonp: false,
                  async: false,
                  }).done(function(aDetails) { 
                  var details = $("div[class~='shipment']",aDetails);
                  valueNode = $("[class~='a-color-price']", details);

                 if (valueNode.length > 0) {
                  for (var i = 0; i < valueNode.length; i++) {
                    var itemValue = $($(valueNode)[i]).text();
                    itemValue = ContentScript._trimHTML(itemValue);
                    itemValue = itemValue.substring(itemValue.indexOf("$") + 1, itemValue.length).trim();
                    itemValue = itemValue.replace(",", "");
                    if (value == null) {
                      value = 0;
                    }
          
                    if(orderDescription.length > 1){
                      packageDescription = ContentScript._trimHTML($(orderDescription[i]).text());
                      var res = multipleUnitsRegex.exec(packageDescription);
                      //a.cordero
                      //se obtiene la cantidad comprada del producto en caso de que no este en la descripcion
                      var quantityNodeDivs = $(details).find("div[class~='a-fixed-left-grid-inner']");
                      var quantityNode =  $(quantityNodeDivs[i]).find("span[class~='item-view-qty']");
                      var multiItemsquantity = 0;
                      if(quantityNode.length > 0 && $($(quantityNode)[0]).text().trim() != "")
                      {
                        var itemquantity = $($(quantityNode)[0]).text();
                        multiItemsquantity = itemquantity.trim();
                      }
                      //-----------------------
                      if(res){
                        value += Number(itemValue) * Number(res[1]);
                      }else if(multiItemsquantity > 0)
                      {
                        value += Number(itemValue) * Number(multiItemsquantity);
                      }else{
                        value += Number(itemValue);
                      }
                    }else{
                      packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
                      var res = multipleUnitsRegex.exec(packageDescription);
                      //a.cordero
                      //se obtiene la cantidad comprada del producto en caso de que no este en la descripcion
                      var quantityNode = $(details).find("span[class~='item-view-qty']");
                      var multiItemsquantity = 0;
                      if(quantityNode.length > 0)
                      {
                        var itemquantity = $($(quantityNode)[0]).text();
                        multiItemsquantity = itemquantity.trim();
                      }
                      //-----------------------
                      if(res){
                        value += Number(itemValue) * Number(res[1]);
                      }else if(multiItemsquantity > 0)
                      {
                        value += Number(itemValue) * Number(multiItemsquantity);
                      }else{
                        value += Number(itemValue);
                      }
                    }
                  }
                  
                }
                  }).fail(function(aXHR, aTextStatus, aError) {
                    console.log("tracking request error: " + aError);
                  });

            if(valueNode != undefined){

            }    
        
      }
      descObj.value = value.toFixed(2);

      // extract the sub total without taxes and shipping for BOG users
      descObj.subTotalCost = descObj.value;
      
      return descObj;
  },

    /**
   * returns the amazon package description
   * @param aOrderNode the order node to get the package description from
   * @returns the amazon package description
   */
  getAmazonPackageValue : function(aOrderNode) {
    var descObj = {};
    var orderDescription = $(aOrderNode).find("div[class='a-fixed-left-grid-col yohtmlc-item a-col-right']>div[class='a-row']>a[class='a-link-normal']");
    var multipleUnitsRegex = /^(\d+) of (.*)/;
    descObj.packageDescriptions = [];
    if (orderDescription.length == 1) {
        descObj.packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
        var res = multipleUnitsRegex.exec(descObj.packageDescription);
        
        if(res == null){
            multipleUnitsRegex = /^(\d+) de (.*)/;
            res = multipleUnitsRegex.exec(descObj.packageDescription);
        }
        
        if (res) {
            descObj.packageDescription = res[2];
        }
        descObj.firstItemDescription = descObj.packageDescription;
    } else if (orderDescription.length > 1) {
        for (var i = 0; i < orderDescription.length; i++) {
            var des = ContentScript._trimHTML($(orderDescription[i]).text())
            var res = multipleUnitsRegex.exec(des);
            
            if(res == null){
                multipleUnitsRegex = /^(\d+) de (.*)/;
                res = multipleUnitsRegex.exec(des);
            }
            if (res) {
                descObj.packageDescriptions.push(res[2]);
            }else{
                  descObj.packageDescriptions.push(des);
            }
            
        }
        descObj.packageDescription = chrome.i18n.getMessage("extension_prealert_multiple_items");
        descObj.firstItemDescription = ContentScript._trimHTML($(orderDescription[0]).text());
        var res = multipleUnitsRegex.exec(descObj.firstItemDescription);
        
        if(res == null){
            multipleUnitsRegex = /^(\d+) de (.*)/;
            res = multipleUnitsRegex.exec(descObj.firstItemDescription);
        }
        
        if (res) {
            descObj.firstItemDescription = res[2];
        }
    }

      //Saca el valor
    var value = null;
    var valueNode = $(aOrderNode).find("[class~='a-color-price']");
    if (valueNode.length > 0) {
      for (var i = 0; i < valueNode.length; i++) {
        var itemValue = $($(valueNode)[i]).text();
        itemValue = ContentScript._trimHTML(itemValue);
        itemValue = itemValue.substring(itemValue.indexOf("$") + 1, itemValue.length).trim();
        itemValue = itemValue.replace(",", "");
        if (value == null) {
          value = 0;
        }

        if(orderDescription.length > 1){
          packageDescription = ContentScript._trimHTML($(orderDescription[i]).text());
          var res = multipleUnitsRegex.exec(packageDescription);
          if(res){
            value += Number(itemValue);
          }else{
            value += Number(itemValue);
          }
        }else{
          packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
          var res = multipleUnitsRegex.exec(packageDescription);
          if(res){
            value += Number(itemValue);
          }else{
            value += Number(itemValue);
          }
        }
      }
      //si no esta en la pagina principal se busca en la del detalle del pedido
    }else {
      //se deja esta validacion por si cambia la pagina y vuelve a esta version.
      var urlDetails = $(aOrderNode).find("a:contains('Detalles del pedido')").attr('href');
      if(urlDetails == undefined || urlDetails == null ||urlDetails.length == 0){
        urlDetails = $(aOrderNode).find("a:contains('Order Details')").attr('href');
      }

       //la pagina de amazon cambio ahora dice Ver detalles del pedido o View order details
       if(urlDetails == undefined || urlDetails == null ||urlDetails.length == 0){
        urlDetails = $(aOrderNode).find("a:contains('View order details')").attr('href'); //en ingles
      }

      if(urlDetails == undefined || urlDetails == null ||urlDetails.length == 0){
        urlDetails = $(aOrderNode).find("a:contains('Ver detalles del pedido')").attr('href'); //en espanol
      }
  
      var amazonUrlComplete = "https://www.amazon.com" + urlDetails;
  
      var request =
        $.ajax({
          type: "GET",
          url: amazonUrlComplete,
          jsonp: false,
          async: false,
        }).done(function (aDetails) {
          var details = $("div[class~='shipment']", aDetails);
          valueNode = $("[class~='a-color-price']", details);
          if (valueNode.length > 0) {
            for (var i = 0; i < valueNode.length; i++) {
              var itemValue = $($(valueNode)[i]).text();
              itemValue = ContentScript._trimHTML(itemValue);
              itemValue = itemValue.substring(itemValue.indexOf("$") + 1, itemValue.length).trim();
              itemValue = itemValue.replace(",", "");
              if (value == null) {
                value = 0;
              }
  
              if (orderDescription.length > 1) {
                packageDescription = ContentScript._trimHTML($(orderDescription[i]).text());
                var res = multipleUnitsRegex.exec(packageDescription);
                if (res) {
                  value += Number(itemValue);
                } else {
                  value += Number(itemValue);
                }
              } else {
                packageDescription = ContentScript._trimHTML($(orderDescription[0]).text());
                var res = multipleUnitsRegex.exec(packageDescription);
                if (res) {
                  value += Number(itemValue);
                } else {
                  value += Number(itemValue);
                }
              }
            }
          }
  
        }).fail(function (aXHR, aTextStatus, aError) {
          console.log("tracking request error: " + aError);
        });
  
    }

    descObj.value = value.toFixed(2);

    // extract the sub total without taxes and shipping for BOG users
    descObj.subTotalCost = descObj.value;
    
    return descObj;
  },

  /**
   * Extracts the order total from an amazon order
   */
  getAmazonOrderTotal : function(aOrderNode) {
    var totalNode = $(aOrderNode).find("div[class*='a-column a-span2']")[0];
    var totalValue = $($(totalNode).children()[1]).text();
    var value = ContentScript._trimHTML(totalValue);
    value = value.substring(value.indexOf("$") + 1, value.length).trim();
    value = value.replace(",", "");
    return value;
  },

  /**
   * Returns the amazon order number
   * @param aOrderNode the order node to get the order number from
   * @param aOrderDetailsPage whether this is an order details page or not
   * @returns the amazon order number
   */
  getAmazonInvoiceUrl : function(aOrderNode, aOrderDetailsPage) {
    var invoiceUrl = null;
    if (!aOrderDetailsPage) {
      var orderActions = $(aOrderNode).find("div[class~='actions']");
      var orderInfoNode = $(orderActions[0]).find("a[class='a-button-text']");
      var orderId = $(orderInfoNode[0]).attr("href");
      if (orderId) {
        orderId = orderId.substring(orderId.indexOf("&orderId=") + 9, orderId.length);
        invoiceUrl =
          "https://www.amazon.com/gp/css/summary/print.html/ref=od_print_invoice?ie=UTF8&orderID=" + orderId;
      }
    } else {
      var oldFormat = $("a[name^='shipped-items']").length > 0;
      var newFormat = $("#orderDetails").length > 0;
      if (oldFormat) {
        invoiceUrl =
          "https://www.amazon.com" +
            $($("a[name='payment-info']").find("a")[0]).attr("href");
      } else if (newFormat) {
        invoiceUrl =
          "https://www.amazon.com" +
            $($("#a-autoid-0").find("a")[0]).attr("href");
      }
    }
    return invoiceUrl;
  },

  /**
   * Returns the amazon orders list
   * @param aOrderNode the order node to get the orders list
   * @returns the amazon orders list
   */
  getAmazonOrdersUrl : function(aOrderNode) {
    var invoiceUrl = [];
    //Obtiene la lista de ordenes
    var ordersContainer = $("div[id='ordersInPackage-container']", aOrderNode).find("a[class='a-link-normal']");
    for(var i = 0; i < ordersContainer.length; i++){
      var url = $(ordersContainer[i]).prop('href');
      if(url.indexOf('orderID=') == -1){
        var start_pos = url.indexOf('oid=') + 4;
        var end_pos = url.indexOf('&',start_pos);
        invoiceUrl[i] = "https://www.amazon.com/gp/css/summary/print.html/ref=od_print_invoice?ie=UTF8&orderID=" + url.substring(start_pos,end_pos);
      }else{
        var start_pos = url.indexOf('orderID=') + 8;
        var end_pos = url.indexOf('&',start_pos);
        invoiceUrl[i] = "https://www.amazon.com/gp/css/summary/print.html/ref=od_print_invoice?ie=UTF8&orderID=" + url.substring(start_pos,end_pos);
      }
      
    }
    
    return invoiceUrl;
  },

  /**
   * cleans the printable version of the amazon invoice to remove
   * the unnecesary info
   * @param aInvoiceHTML the invoice html to be processed
   * @param aPackageDescription the package description to be used to clean
   * the invoice
   * @param aCourierNumber the courier number for the shipment we are generating
   * the invoice for
   * @param aInvoiceUrl the url from which the html was retrieved
   * @returns the cleaned invoice
   */
  generateAmazonInvoice : function(aInvoiceHTML, aPackageDescription, aCourierNumber, aInvoiceUrl) {
      var finalHtml = null;
      var errorMsg = null;
      try {
          var cleanHTML = ContentScript._cleanHTML(aInvoiceHTML);
          cleanHTML = $(ContentScript._trimHTML(cleanHTML));
          
          // find the table that contains the item description and
          // remove the rest
          
          // first, get shipment nodes
          var shipmentNodes = $(cleanHTML).find("center:contains('Shipped on')");
          shipmentNodes = shipmentNodes.length > 0 ?  shipmentNodes : $(cleanHTML).find("center:contains('Enviado el')");
          if (shipmentNodes.length > 0) {
              var shipmentTableContainer = $(shipmentNodes[0]).closest("table").parent().closest("table").parent().closest("table").parent().closest("table").parent().closest("table").parent();
              var shipmentTables = $(shipmentTableContainer).children("table");
              // the first one is the order summary table node, so we keep it
              // but we remove the order total value from it, because for
              // orders with multiple packages, this will be the value for the
              // entire order, not only the shipment we are interested in
              var summaryNode = shipmentTables[0];
              var orderTotal = $($(summaryNode).find("b:contains('Order Total:')")[0]).length > 0 ? $($(summaryNode).find("b:contains('Order Total:')")[0]) : $($(summaryNode).find("b:contains('Total del pedido:')")[0])
              $(orderTotal).parent().html("<b>Tracking Number:</b> " + aCourierNumber);
              
              for (var i = 1; i < shipmentTables.length; i++) {
                  // keep the one that contains the first item description
                  // remove the rest
                  var table = shipmentTables[i];
                  
                  // get the whole text and see if the description is contained in it
                  // this helps with special characters
                  var tableText = $(table).text();
                  if (tableText.indexOf(aPackageDescription) == -1) {
                      $(table).remove();
                  } else {
                      $(table).attr("invoiceContent", true);
                  }
              }
              
              finalHtml = "<html>";
              for (var j = 0; j < cleanHTML.length; j++) {
                  var node = cleanHTML[j];
                  if (node.nodeName.toLowerCase() != "script" &&
                      node.nodeName.toLowerCase() != "#comment") {
                      if (node.nodeName.toLowerCase() == "#text") {
                          finalHtml += $(node).text();
                      } else {
                          finalHtml += node.outerHTML;
                      }
                  }
              }
              finalHtml += "</html>";
              
              var resultingHtml = $(finalHtml);
              if ($(resultingHtml).find("[invoiceContent]").length == 0) {
                  // we didn't find any node with the package description
                  // so we set the finalHtml to null
                  finalHtml = null;
              }
          }
          
      } catch(e) {
          errorMsg = e.message;
      }
      
      if (finalHtml == null || errorMsg != null) {
      // notify sentry that we couldn't generate an html invoice
      chrome.runtime.sendMessage({message: "reportError",
        error : {
          message: "Unable to generate amazon invoice from HTML: " + errorMsg,
          extra : {
            invoiceUrl: aInvoiceUrl,
            firstItemDescription: aPackageDescription,
            courierNumber: aCourierNumber,
            shipper: "Amazon"
          }
        }
      }, function(response) {
      });
    }
    return finalHtml;
  },

  /**
   * Performs a quote on the amazon product page and shows the offer to the user
   * @param productASIN the product ASIN to
   * @param size the currently selected size
   * @param color the currently selected color
   */
  quoteAmazonProduct : function(productASIN, size, color) {
    if ($("#aero-quote-main-container").length) {
      $("#aero-quote-main-container").addClass("disabled");
    }
    chrome.runtime.sendMessage({message: "quoteProduct",
        productASIN : productASIN,
        size: size,
        color: color},
      function(response) {
        //si trae el admin fee se le resta a los cargos porque a veces solo calcula el cargo de admin fee.
        var adminFee = response.product.administrativeFee;
        var totalPrice = response.product.priceBreakdown.total;
        if(adminFee > 0 && totalPrice > adminFee)
        {
          totalPrice = totalPrice - adminFee;

        }

        if (response != null && response.product != null && response.product.hcInfo.hc != null && response.product.priceUSD > 0 && totalPrice > response.product.priceUSD) {
          // if it already exists, update it
          if ($("#aero-quote-main-container").length) {
            QuoteScript._updateQuoteDiv(response.product);
            $("#aero-quote-main-container").removeClass("disabled");
          } else {
            // create quote node and inject it
            QuoteScript._createQuoteDiv(response.product);
          }
        } else {
          // change top bar:
          //remove loading gif
          $(".sk-fading-circle").remove();
          //Show new mesagge
          $(".blueTextLabel_new").text(chrome.i18n.getMessage("quote_script_quote_view_all_inclusive_price_message"));
          $("#quoteBtn").show();
          // no product, remove the quote div
          $("#aero-quote-main-container").remove();
          }
        }
    );
  },

  _getAsins : function(aProducts){
    var asins = null;
    //Se obtiene la lista de asins de todos los productos
    if (null != aProducts && aProducts.length > 0) {
      asins = "";
      var regex = RegExp("(?:/)([a-zA-Z0-9]{10})");
      for (var i = 0; i < aProducts.length; i++) {
        var url = $($(aProducts)[i]).find("a[class~='a-link-normal']").attr("href");
        m = url.match(regex);
        if(m != null && m.length == 2) {
          asins += m[1];
        }
        if(i+1 < aProducts.length){
          asins += ",";  
        }   
      }
    }

    return asins;
  },

  _getShippingAddres(aContext){
    var shippingAddress = "";
   
    $(".displayAddressUL", aContext).find("li").each(function( index ) {
      shippingAddress = shippingAddress + $( this ).text() + " ";
    });
      
    if (shippingAddress == "") {
      $("#shippingAddress-container", aContext).find("p").each(function( index ) {
        shippingAddress = shippingAddress + $( this ).text() + " ";
      });
    }

    if (shippingAddress == "") {
      $("#deliveredAddress-container", aContext).find("p").each(function( index ) {
        shippingAddress = shippingAddress + $( this ).text() + " ";
      });
    }



    return shippingAddress;
  },

  handleCheckout() {
    window.setTimeout(function() {
      var selectedOldAddressNode = document.querySelector(".displayAddressUL");
      if (selectedOldAddressNode) {
        AmazonContentScript.selectedOldAddress();
      } else {
        AmazonContentScript.selectNewAddress();
      }
    }, 1000);
  },

  selectNewAddress(){
    var dir = $("input[name='submissionURL']:checked").parent().find("span.a-radio-label").text();
    var newAddressLabel = chrome.i18n.getMessage("content_script_new_address_label");
    var learnMoreLabel = chrome.i18n.getMessage("content_script_new_address_learn_more_label");
    var learnMoreUrl = chrome.i18n.getMessage("content_script_new_address_learn_more_url");
    if (dir.indexOf("33126") != -1 || dir.indexOf("6070") != -1) {
      $("#alertWrongAddress").remove();
      $("input[name='submissionURL']:checked").parent().find("span.a-radio-label").append("<div id=\"alertWrongAddress\" class=\"alertWrongAddress\">" + newAddressLabel + "<a href=\"" + learnMoreUrl + "\" target=\"_blank\">" + learnMoreLabel + "</a></div>");
    }

    $("input[name='submissionURL']").click( function(event){
      $("#alertWrongAddress").remove();
      var dir = $(this).parent().find("span.a-radio-label").text();
      if(dir.indexOf("33126") != -1 || dir.indexOf("6070") != -1) {
        $(this).parent().find("span.a-radio-label").append("<div id=\"alertWrongAddress\" class=\"alertWrongAddress\">" + newAddressLabel + "<a href=\"" + learnMoreUrl + "\" target=\"_blank\">" + learnMoreLabel + "</a></div>");
      }
    });
  },

  selectedOldAddress(){
    var dir = $(".displayAddressUL").text();
    var newAddressLabel = chrome.i18n.getMessage("content_script_new_address_label");
    var learnMoreLabel = chrome.i18n.getMessage("content_script_new_address_learn_more_label");
    var learnMoreUrl = chrome.i18n.getMessage("content_script_new_address_learn_more_url");
    if (dir.indexOf("33126") != -1 || dir.indexOf("6070") != -1) {
      $("#alertWrongShippingAddress").remove();
      $(".displayAddressUL").append("<li><div id=\"alertWrongShippingAddress\" class=\"alertWrongShippingAddress\">" + newAddressLabel + "<br><a href=\"" + learnMoreUrl + "\" target=\"_blank\">" + learnMoreLabel + "</a></div></li>");
    }
  }
  
};
