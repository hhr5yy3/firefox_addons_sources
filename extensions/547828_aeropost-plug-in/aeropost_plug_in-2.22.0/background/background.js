/**
 * Copyright (C) 2014 Aeropost. All Rights Reserved.
 */

/**
 * Background class.
 */
var Background = {

  /* tab "workers" for autofill feature */
  tabWorkers: null,

  _init : function() {
    this.tabWorkers = {};
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch (request.message) {
          case "preAlert":
            sendResponse({processed: "Received PreAlert event, now processing info"});
            Background.packagePreAlert(request.packageInfo);
            AnalyticsApi.push(["click", "prealert-injected-button"]);
            break;
          case "postAlert":
            sendResponse({processed: "Received PostAlert event, now processing info"});
            Background.packagePostAlert(request.packageInfo);
            AnalyticsApi.push(["click", "postalert-injected-button"]);
            break;
          case "fillAddress":
            /*var supportedSitesCallback = function(aSiteList) {
              sendResponse({addressInfo : AccountService.activeAccount, siteList : aSiteList});
            };
            SupportedSiteService.getSupportedSitesForDomain(
              request.domain, supportedSitesCallback);*/
            // hack to keep the channel open for an async response
            // http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-between-extensionbackground-and-content-scrip
            return true;
            break;
          case "pageFillable":
            var autofillInfo = request.autofillInfo;
            var supportedSitesCallback = function(aSiteList) {
              if (aSiteList.length > 0) {
                var tab = sender.tab;
                var tabWorker = Background.getTabWorker(tab);

                if (!tabWorker) {
                  tabWorker = {};
                  tabWorker.domains = [];
                }
                tabWorker.domains.push(autofillInfo.domain);
                Background.tabWorkers[tab.id] = tabWorker;
                chrome.tabs.get(tab.id,
                  function(tab){
                    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255], tabId: tab.id });
                    chrome.browserAction.setBadgeText({text: '!', tabId: tab.id });
                  }
                );
                // call to inject autofill button and send siteList info
                var info = {};
                info.siteList = aSiteList;
                info.accountInfo = AccountService.activeAccount;
                sendResponse(info);
              }
            };
            SupportedSiteService.getSupportedSitesForDomain(autofillInfo.domain, supportedSitesCallback);
            return true;
            break;
          case "pageNOTFillable":
            var tab = sender.tab;
            var autofillInfo = request.autofillInfo;
            if (tab && tab.url.indexOf(autofillInfo.domain) != -1) {
              chrome.tabs.get(tab.id,
                  function(tab){
                    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0], tabId: tab.id });
                      chrome.browserAction.setBadgeText({text: '', tabId: tab.id });
                  }
                );
            }
            break;
          case "processPage":
            var firstRunColorboxArray = [PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_AMAZON),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_AMAZON_DETAILS),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_EBAY),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_EBAY_DETAILS),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_RAKUTEN),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_AEROPOSTALE),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_AEROPOSTALE_DETAILS),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_FOREVER21),
                                         PropertyHelper.get(PropertyHelper.PROP_COLORBOX_FIRST_RUN_FOREVER21_DETAILS)]
            sendResponse({signedIn: AccountService.activeAccount,
                          clientAllowed : PropertyHelper.get(PropertyHelper.PROP_CLIENT_ALLOWED),
                          checkRecipient : PropertyHelper.get(PropertyHelper.PROP_CHECK_RECIPIENT),
                          firstRunColorboxArray : firstRunColorboxArray});
            break;
          case "checkPreAlert":
            var courierNumber = request.courierNumber;
            if (courierNumber) {
              var tab = sender.tab;
              var preAlerted = false;
              var mia = null;
              var invoiceHtml = request.invoiceHtml;
              var invoiceUrl = request.invoiceUrl;
              var firstItemDescription = request.firstItemDescription;
              var shipper = request.shipper;
              var orderIndex = request.orderIndex;
              var generateInvoice = request.generateInvoice;
              // check if the invoice is not already stored
              ///var getInvoiceCallback = function(aInvoice) {
                var storedInvoice = null;
                if (request.invoiceHtml) {
                   var aInvoice = {
                    "courierNumber": courierNumber,
                    "invoiceHtml": request.invoiceHtml
                  };
                  storedInvoice = JSON.stringify(aInvoice);
                } else {
                  storedInvoice = "";
                }

                if(request.isNewPrealert){
                  var getPrealertStatusCallback = function(aInfo) {
                    if(aInfo != null && aInfo.results != null){
                      mia = aInfo.results.trackingList[0].mia;
                      preAlerted = !aInfo.results.trackingList[0].isPrealertable;
                      errorCode = aInfo.results.trackingList[0].errorCode;
                      errorDescriptionEn = aInfo.results.trackingList[0].errorDescriptionEn;
                      errorDescriptionEs = aInfo.results.trackingList[0].errorDescriptionEs;
                      aeroTrackUrl = aInfo.results.trackingList[0].aeroTrackURL;
                      chrome.tabs.sendMessage(tab.id, {message: "checkedPreAlert", info : {courierNumber : courierNumber,
                                                                                 preAlerted: preAlerted,
                                                                                 mia : mia,
                                                                                 delivered : request.delivered,
                                                                                 storedInvoice : storedInvoice,
                                                                                 invoiceUrl : invoiceUrl,
                                                                                 firstItemDescription : firstItemDescription,
                                                                                 shipper : shipper,
                                                                                 generateInvoice : generateInvoice,
                                                                                 orderIndex : orderIndex,
                                                                                 errorCode : errorCode,
                                                                                 errorDescriptionEn : errorDescriptionEn, 
                                                                                 errorDescriptionEs : errorDescriptionEs,
                                                                                 aeroTrackUrl : aeroTrackUrl}}, function(response) {
                      //console.log(response.farewell);
                      });
                    }
                  }
                  PreAlertService.GetPrealertStatusByTracking(courierNumber, request.shippingAddress, getPrealertStatusCallback);
                } else {
                  preAlerted = PreAlertService.preAlertExists(courierNumber);
                  mia = AccountService.getMIA(courierNumber);
                  errorCode = aInfo.results.trackingList[0].errorCode;
                  errorDescriptionEn = aInfo.results.trackingList[0].errorDescriptionEn;
                  errorDescriptionEs = aInfo.results.trackingList[0].errorDescriptionEs;
                  aeroTrackUrl = aInfo.results.trackingList[0].aeroTrackURL;
                  chrome.tabs.sendMessage(tab.id, {message: "checkedPreAlert", info : {courierNumber : courierNumber,
                                                                                 preAlerted: preAlerted,
                                                                                 mia : mia,
                                                                                 delivered : request.delivered,
                                                                                 storedInvoice : storedInvoice,
                                                                                 invoiceUrl : invoiceUrl,
                                                                                 firstItemDescription : firstItemDescription,
                                                                                 shipper : shipper,
                                                                                 generateInvoice : generateInvoice,
                                                                                 orderIndex : orderIndex,
                                                                                 errorCode : errorCode,
                                                                                 errorDescriptionEn : errorDescriptionEn, 
                                                                                 errorDescriptionEs : errorDescriptionEs,
                                                                                 aeroTrackUrl : aeroTrackUrl}}, function(response) {
                  //console.log(response.farewell);
                  });  
                }

                

                if (!aInvoice && !preAlerted) {
                  if (invoiceUrl && firstItemDescription) {
                    /*var loadInvoiceCallback = function(aInvoiceHTML) {
                      var finalHtml =
                        Background._generateInvoice(aInvoiceHTML, firstItemDescription, courierNumber);
                      if (finalHtml) {
                        var invoice = new Invoice(courierNumber);
                        invoice.set("invoiceHtml", finalHtml);
                        invoice.set("creationDate", new Date().getTime());
                        var insertCallback = function() {
                          Logger.debug("Invoice stored for package: " + courierNumber);
                        }
                        InvoiceService.insertInvoice(invoice, insertCallback);
                      }
                    };
                    Background._getInvoiceHTML(invoiceUrl, loadInvoiceCallback);*/
                  } else if (invoiceHtml) {
                    var invoice = new Invoice();
                    invoice.set("courierNumber", courierNumber);
                    invoice.set("invoiceHtml", invoiceHtml);
                    invoice.set("creationDate", new Date().getTime());
                    var insertCallback = function() {
                      Logger.debug("Invoice stored for package: " + courierNumber);
                    }
                    InvoiceService.insertInvoice(invoice, insertCallback);
                  }
                } else {
                  // however, if already prealerted, we can delete the record
                  if (preAlerted) {
                    var deleteCallback = function() {
                      Logger.debug("Removed invoice for package: " + courierNumber);
                    };
                    InvoiceService.deleteInvoice(courierNumber, deleteCallback);
                  } else {
                    Logger.debug("Invoice already stored for package: " + courierNumber);
                  }
                }
              //}
              //InvoiceService.getInvoice(courierNumber, getInvoiceCallback);                              
            }
            return true;
            break;
          case "processInvoiceHtml":
            var courierNumber = request.courierNumber;
            var firstItemDescription = request.firstItemDescription;
            var invoiceHtml = request.invoiceHtml;

            if (invoiceHtml) {
              var invoice = new Invoice();
              invoice.set("courierNumber", courierNumber);
              invoice.set("invoiceHtml", invoiceHtml);
              invoice.set("creationDate", new Date().getTime());
              var insertCallback = function() {
                Logger.debug("Invoice stored for package: " + courierNumber);
              }
              InvoiceService.insertInvoice(invoice, insertCallback);
            }
            break;
          case "viewPackage":
            var packageInfo = request.packageInfo;
            Background.openPage(null, packageInfo.aeroTrackUrl);
            AnalyticsApi.push(["click", "viewPackage-injected-button"]);
            break;
          case "autocompleteClicked":
            sendResponse({processed: "autocomplete button clicked"});
            AnalyticsApi.push(["click", "autocomplete-injected-button"]);
            break;
          case "preAlertStarted":
            AccountService.getProfileInformation();
            sendResponse({processed: "prealert started"});
            AnalyticsApi.push(["click", "preAlert-started"]);
            break;
          case "preAlertCanceled":
            sendResponse({processed: "prealert cancelled"});
            AnalyticsApi.push(["click", "preAlert-canceled"]);
            break;
          case "postAlertCanceled":
            sendResponse({processed: "postalert cancelled"});
            AnalyticsApi.push(["click", "postAlert-canceled"]);
            break;
          case "blankScreenshot":
            sendResponse({processed: "blank screenshot"});
            var targetPage = request.targetPage;
            AnalyticsApi.push(["blankScreenshot", targetPage]);
            break;
          case "stopShowingGuide":
            // set the flag for the page passed as parameter
            var page = request.page;
            PropertyHelper.set(
              PropertyHelper.PROP_COLORBOX_FIRST_RUN_PREFIX + page, false);
            break;
          case "reportError":
            Background.reportError(request.error);
            break;
          case "quoteProduct":
            var quoteCallback = function(aQuoteInfo) {
              aQuoteInfo.processed = "quote product";
              sendResponse(aQuoteInfo);
            };
            AccountService.quoteProduct(request, quoteCallback);
            return true;
            break;
          case "quoteMoreProducts":
            if(null != request){
              var products = [];
              var productsError = [];
              var description = "";
              var count = request.itemsDescription.split("|%|");

              for (var i = 0; i < count.length; i++) {  

                var config = new Object();
                config.api_key = ConfigSettings.GOOGLE_TRANSLATE_API_KEY;
                config.text = count[i];
                config.target = "es";
                config.source = "en";

                var translateCallback = function(aTranslateInfo) {
                  if(null != aTranslateInfo && null != aTranslateInfo.text){
                    var productObj = new Object();
                    productObj.description = aTranslateInfo.text;
                    productObj.quantity = 1;
                    products.push(productObj);
                  } else {
                    productsError.push(aTranslateInfo);
                  }
                  //Solo cuando llegamos al final de los productos
                  if(productsError.length + products.length == count.length){
                    
                    //Se ordena los articulos repetidos
                    Background._orderProducts(products);

                    //Se ordena en relacion a la cantidad de producto
                    while (0 < products.length) {  
                      
                      var prodObj = Background._getMajor(products);
                      description += prodObj.description;
                      if(0 < products.length){
                        description += ",";
                      }
                    }

                    if(description.length > 50 && count.length > 1){
                      description = description.substring(0,39) + ", Y OTROS.";
                    } else {
                      description = description.substring(0,49);
                    }
                    aTranslateInfo.description = description;
                    sendResponse(aTranslateInfo);  
                  }              
                };

                //se envia a consultar por asin       
                GoogleTranslateApi.translateLanguage(config, translateCallback); 
                //position = i+1; 
              }
            } else {
              sendResponse(null);
            }
            
            return true;
            break;
          case "addToCart":
            AccountService.addToCart(request.productInfo, sendResponse);
            break;
          case "SearchURL":
            var locale = $.i18n.getString("extension.locale.code");
            var localeCode = locale == "1" ? "en" : "es";
            var activeAccount = AccountService.activeAccount;
            url = ConfigSettings.SEARCH_URL;
            url = url.replace("%S1", localeCode);
            url = url.replace("%S2", request.url);
            url = url.replace("%S3", activeAccount.get("gateway").toLowerCase());
            url = url.replace("%S4", activeAccount.get("language"));
            chrome.tabs.create({'url': url});
            break;
        }
      });
    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
      Background.clearTabWorker(tabId);
      });

    AnalyticsApi.push(["load", UtilityHelper.extensionVersion]);

    Background._showChangeLog();
    ObserverHelper.addObserver(this, Topics.ACCOUNT_SIGNED_OUT);
  },

  _orderProducts : function(aProducts) {    
    for (var i = 0; i < aProducts.length; i++) {    
      var obj = aProducts[i]; 
      for (var x = i+1; x < aProducts.length; x++) {     
        if(obj.description == aProducts[x].description){
          aProducts[i].quantity += 1;
          aProducts.splice(x,1);
          x -= 1;
        }
      }
    }

    return aProducts;
  },

  _getMajor : function(aProducts) {
    var obj = new Object();
    obj.quantity = 0;
    var position = 0;
    for (var i = 0; i < aProducts.length; i++) {                
      if(obj.quantity < aProducts[i].quantity){
        obj = aProducts[i];    
        position = i;    
      }
    }

    aProducts.splice(position,1);

    return obj;
  },

  _showChangeLog : function() {
    var storedVersion = PropertyHelper.get(PropertyHelper.PROP_EXTENSION_VERSION);
    var currentVersion = UtilityHelper.extensionVersion;

    if (storedVersion != currentVersion) {
      PropertyHelper.set(PropertyHelper.PROP_EXTENSION_VERSION, currentVersion);
      Background.openPage("changeLog");
    }
  },

  clearTabWorker : function(aTabId) {
    Background.tabWorkers[aTabId] = null;
    delete Background.tabWorkers[aTabId];
  },

  packagePreAlert : function(aInfoObj) {

    var aCallback = function(aResult) {

      var _i18n = $.i18n;
      // check if the user is signed in and the client allowed first
      var clientAllowed = PropertyHelper.get(PropertyHelper.PROP_CLIENT_ALLOWED);
      if (AccountService.isSignedIn && clientAllowed) {
        if (PropertyHelper.get(PropertyHelper.PROP_FIRST_PREALERT)) {
          AnalyticsApi.push(["click", "first-preAlert"]);
          PropertyHelper.set(PropertyHelper.PROP_FIRST_PREALERT, false);
        }

        //window.open(aInfoObj.invoiceImage);
        //window.open("data:text/html," + encodeURIComponent(aInfoObj.invoiceHtml));

        var activeAccount = AccountService.activeAccount;
        // complete the preAlertObject before sending
        var packageToPreAlert = {};
        packageToPreAlert.Token = activeAccount.get("token");
        packageToPreAlert.gateway = activeAccount.get("gateway");
        packageToPreAlert.accountNumber = activeAccount.get("accountNumber");
        packageToPreAlert.accountId = activeAccount.get("accountNumber");
        packageToPreAlert.clientFullName = activeAccount.get("clientFullName");
        packageToPreAlert.clientEmail = activeAccount.get("clientEmail");
        packageToPreAlert.courierNumber = aInfoObj.courierNumber;

        packageToPreAlert.courierName = aInfoObj.courierName;
        //packageToPreAlert.courierName = "Amazon Logistics";
        packageToPreAlert.shipperName = aInfoObj.shipperName;
        packageToPreAlert.value = aInfoObj.value;
        if (activeAccount.get("gateway").toLowerCase() == "bog") {
          packageToPreAlert.value = aInfoObj.subTotalCost;
        }
        packageToPreAlert.consignee = activeAccount.get("clientFullName");
        // escape package description and cut it to 100 chars
        packageToPreAlert.packageDescription =
          aInfoObj.packageDescription.substring(0, 100);
        packageToPreAlert.taxDescription = "";
        packageToPreAlert.taxCode = "";
        packageToPreAlert.exonerate = false;
        packageToPreAlert.intranetUserEmail = ConfigSettings.PREALERTS_EMAIL;
        var language = "";
        switch(activeAccount.get("preferedLanguage")){
          case 0: 
            language = "es";
            break;
          case 1: 
            language = "en";
            break;
          case 2:
            language = "fr";
            break;
          default:
            language = "en";
        }

        packageToPreAlert.lang = language;
        packageToPreAlert.owner = 1;
        packageToPreAlert.AeroShopOrderNumber = -1;
        var invoices = [];
        packageToPreAlert.invoiceData = invoices;

        var newPrealert = false;
        // Se valida si usamos la per-alerta de marketplace, por ahora solo amazon e ebay
        if (aInfoObj.isNewPrealert != null && aInfoObj.isNewPrealert == true){
          newPrealert = true;         
          if(aInfoObj.invoiceHtml != null){   
            packageToPreAlert.invoiceData[0] = $.base64.btoa(Background._decodeHTMLEntities(aInfoObj.invoiceHtml), true);
          }
        }

        var attachmentUploadCallback = function(aResult) {
          if (aResult.apiErrors) {
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.prealert.attachment.error.title");
            notification.msg = _i18n.getString("extension.prealert.attachment.error.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            AnalyticsApi.push(["prealert-failed", "attachment-upload"]);
          } else if (!aResult.invalidToken) {
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.prealert.congratulations.title");
            notification.msg = _i18n.getString("extension.prealert.congratulations.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            // reload current page to display the updated button
            Background.reloadCurrentTab();
            // we can now update the list of prealerts and packages
            UpdateService.forceUpdate();
            // generate GA events for successful prealert
            AnalyticsApi.push(["prealert-success", "success"]);
          }
        };

        var preAlertCallback = function(aResult) {
          if ((aResult != null) && ( (aResult.preAlertExists) || (null != aResult.results && aResult.results.errorCodes != null && aResult.results.errorCodes[0] == "0013")) ) {
            // there is already a preAlert for the given courierNumber
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.prealert.error.title");
            notification.msg = _i18n.getString("extension.prealert.exists.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            AnalyticsApi.push(["prealert-failed", "prealert-exists"]);
          } else if ((aResult == null) || (aResult.apiErrors) || (null != aResult.results && aResult.results.errorCodes != null && aResult.results.errorCodes.length > 0) ||
            (aResult.status != null && aResult.status != 200)) {
            // there were errors generating the preAlert
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.prealert.error.title");
            var errorMsg = _i18n.getString("extension.prealert.error.msg", [aInfoObj.courierNumber]);
            if (aResult != null && aResult.errorDescription) {
              errorMsg += " (" + aResult.errorDescription + ")";
            }
            notification.msg = errorMsg;
            NotificationService.showNotification(notification, true, 0);
            AnalyticsApi.push(["prealert-failed", "prealert-creation"]);
          } else if (aResult.preAlertNumber && !newPrealert) {
            // check if we have an invoice stored (for Amazon we might)

            var getInvoiceCallback = function(aInvoice) {
              // part 1 succeeded, now upload attachment
              var attachmentObj = {};
              attachmentObj.Token = activeAccount.get("token");
              attachmentObj.AerotrackOrPreAlertCourier = aInfoObj.courierNumber;

              var invoiceUploadRestricted = false;
              if (aInvoice) {
                // we have an invoice html, so we send that instead of the
                // screenshot
                var encodedHtml = $.base64.btoa(aInvoice.get("invoiceHtml"), true);
                attachmentObj.data = encodedHtml;
                attachmentObj.fileName = aInfoObj.courierNumber + ".html";
              } else {
                // for ebay order details page, the invoiceHtml might come in the
                // aInfoObj object
                if (aInfoObj.invoiceHtml) {
                  var encodedHtml = $.base64.btoa(aInfoObj.invoiceHtml, true);
                  attachmentObj.data = encodedHtml;
                  attachmentObj.fileName = aInfoObj.courierNumber + ".html";
                } else if (aInfoObj.invoiceImage) {
                  // IF JPG INVOICE RESTRICTION IS ACTIVE AND THE GATEWAY IS IN THE LIST OF RESTRICTED COUNTRIES,
                  // ABORT THE INVOICE UPLOAD PROCESS AND SHOW ERROR TO CUSTOMER
                  if (PropertyHelper.get(PropertyHelper.PROP_RESTRICT_JPG_INVOICE_UPLOAD) &&
                      PropertyHelper.get(PropertyHelper.PROP_JPG_INVOICE_RESTRICTION_COUNTRIES).toLowerCase().indexOf(activeAccount.get("gateway").toLowerCase()) != -1) {
                    // NOTIFY USING SENTRY
                    var error = {};
                    error.message = "Html invoice failed: prevented jpg invoice upload for prealert: " +
                                    aInfoObj.courierNumber;
                    error.extra = {};
                    error.extra.courierNumber = aInfoObj.courierNumber;
                    error.extra.prealertNumber = aResult.prealertNumber;
                    error.extra.shipper = aInfoObj.shipperName;

                    Background.reportError(error);
                    // commented out so we upload the jpg invoice anyway, until
                    // discussed with colin and agreed a different handling
                    //attachmentUploadCallback({apiErrors: true});
                    //invoiceUploadRestricted = true;
                  }
                  // get rid of the data:image/png;base64, prefix from the image
                  attachmentObj.data =
                    aInfoObj.invoiceImage.replace("data:image/jpeg;base64,", "");
                  attachmentObj.fileName = aInfoObj.courierNumber + ".jpeg";
                }
              }

              attachmentObj.documentType = 1; // invoice
              attachmentObj.language = activeAccount.get("language");
              //attachmentObj.language = 1; // use english

              if (!invoiceUploadRestricted) {
                PreAlertService.uploadInvoice(attachmentObj, attachmentUploadCallback);
                // update progress
                var notification = new NotificationObject(aInfoObj.courierNumber);
                notification.type = "progress";
                notification.point = "invoice";
                notification.title = _i18n.getString("extension.prealert.progress.title");
                notification.msg = _i18n.getString("extension.prealert.invoice.msg", [aInfoObj.courierNumber]);
                NotificationService.showNotification(notification);
              }
            };

            if (!newPrealert) {
              InvoiceService.getInvoice(aInfoObj.courierNumber, getInvoiceCallback);
            }
          } else if (newPrealert) {
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.prealert.congratulations.title");
            notification.msg = _i18n.getString("extension.prealert.congratulations.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            // reload current page to display the updated button
            Background.reloadCurrentTab();
            // we can now update the list of prealerts and packages
            UpdateService.forceUpdate();
            // generate GA events for successful prealert
            AnalyticsApi.push(["prealert-success", "success"]);
          }
        }

        if (newPrealert){      
        //Se hace un llamado asincrono para mostrar el mensaje al usuario          
          setTimeout(function() {
            packageToPreAlert.descriptions = [];
            if(aInfoObj.packageDescriptions != null && aInfoObj.packageDescriptions.length > 0){
              packageToPreAlert.descriptions = aInfoObj.packageDescriptions;
            }else{
              packageToPreAlert.descriptions.push(aInfoObj.packageDescription);
            }
            //Se obtienen todas las facturas para enviarlas
            for(var i = 0; i < aInfoObj.ordersUrl.length; i++){
              var inv = Background._getInvoiceHTML(aInfoObj.ordersUrl[i]);            
              var decoded  = Background._decodeHTMLEntities(inv);
              packageToPreAlert.invoiceData[i] = $.base64.btoa(decoded, true);
              if(aInfoObj.ordersUrl.length > 1){
                var description = $("div[class='a-fixed-left-grid-inner']", inv).find("a[class='a-link-normal']");
                packageToPreAlert.descriptions[i] = $(description[0]).text();
              }  
            }
            PreAlertService.packagePreAlertRest(aInfoObj.shipperName, packageToPreAlert, preAlertCallback);                      
          }, 0 | Math.random() * 100);
        } else {
          PreAlertService.packagePreAlert(packageToPreAlert, preAlertCallback);
        }
         
        //show preAlert progress notification
        var notification = new NotificationObject(aInfoObj.courierNumber);
        notification.type = "progress";
        notification.point = "start";
        notification.title = _i18n.getString("extension.prealert.progress.title");
        notification.msg = _i18n.getString("extension.prealert.start.msg", [aInfoObj.courierNumber]);
        NotificationService.showNotification(notification);     
      } else {
        if (!AccountService.isSignedIn) {
          // prompt the user to sign in
          // there were errors generating the preAlert
          var notification = new NotificationObject(aInfoObj.courierNumber);
          notification.type = "basic";
          notification.point = null;
          notification.title = _i18n.getString("extension.prealert.error.title");
          notification.msg = _i18n.getString("extension.signin.error.msg");
          NotificationService.showNotification(notification);
        }

        if (!clientAllowed) {
          NotificationService.showInvalidClientNotification();
        }
      }
    };

    AccountService.getProfileInformation(aCallback);

  },


  packagePostAlert : function(aInfoObj) {

    var _i18n = $.i18n;
    // check if the user is signed in and the client allowed first
    var clientAllowed = PropertyHelper.get(PropertyHelper.PROP_CLIENT_ALLOWED);
    if (AccountService.isSignedIn && clientAllowed) {
      if (PropertyHelper.get(PropertyHelper.PROP_FIRST_PREALERT)) {
        AnalyticsApi.push(["click", "first-postAlert"]);
        PropertyHelper.set(PropertyHelper.PROP_FIRST_PREALERT, false);
        //AccountService.getProfileInformation(aCallback);
      }

      //window.open(aInfoObj.invoiceImage);
      //window.open("data:text/html," + encodeURIComponent(aInfoObj.invoiceHtml));
      //var aCallback = function(aInvoice) {
        var activeAccount = AccountService.activeAccount;
        // complete the preAlertObject before sending
        var packageToPreAlert = {};
        packageToPreAlert.token = activeAccount.get("token");
        packageToPreAlert.gateway = activeAccount.get("gateway");
        packageToPreAlert.accountNumber = activeAccount.get("accountNumber");
        packageToPreAlert.accountId = activeAccount.get("accountNumber");
        packageToPreAlert.clientFullName = activeAccount.get("clientFullName");
        packageToPreAlert.clientEmail = activeAccount.get("clientEmail");
        packageToPreAlert.courierNumber = aInfoObj.mia;
        packageToPreAlert.aeroTrack = aInfoObj.mia;

        packageToPreAlert.courierName = aInfoObj.courierName;
        //packageToPreAlert.courierName = "Amazon Logistics";
        packageToPreAlert.shipperName = aInfoObj.shipperName;
        packageToPreAlert.value = aInfoObj.value;
        if (activeAccount.get("gateway").toLowerCase() == "bog") {
          packageToPreAlert.value = aInfoObj.subTotalCost;
        }
        packageToPreAlert.consignee = activeAccount.get("clientFullName");
        // escape package description and cut it to 100 chars
        packageToPreAlert.packageDescription =
          aInfoObj.packageDescription.substring(0, 100);
        packageToPreAlert.taxDescription = "";
        packageToPreAlert.taxCode = "";
        packageToPreAlert.exonerate = false;
        packageToPreAlert.intranetUserEmail = ConfigSettings.PREALERTS_EMAIL;
        packageToPreAlert.language = activeAccount.get("language");
        packageToPreAlert.owner = 1;
        packageToPreAlert.aeroShopOrderNumber = -1;
        var invoices = [];
        packageToPreAlert.invoiceData = invoices;

        var newPrealert = false;
        // Se valida si usamos la per-alerta de marketplace, por ahora solo amazon e ebay
        if (aInfoObj.isNewPrealert != null && aInfoObj.isNewPrealert == true){
          newPrealert = true;         
          if(aInfoObj.invoiceHtml != null){   
            packageToPreAlert.invoiceData[0] = $.base64.btoa(Background._decodeHTMLEntities(aInfoObj.invoiceHtml), true);
          }
        }

        var attachmentUploadCallback = function(aResult) {
          if (aResult.apiErrors) {
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.postalert.attachment.error.title");
            notification.msg = _i18n.getString("extension.postalert.attachment.error.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            AnalyticsApi.push(["postalert-failed", "attachment-upload"]);
          } else if (!aResult.invalidToken) {
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.postalert.congratulations.title");
            notification.msg = _i18n.getString("extension.postalert.congratulations.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            // reload current page to display the updated button
            Background.reloadCurrentTab();
            // we can now update the list of prealerts and packages
            UpdateService.forceUpdate();
            // generate GA events for successful prealert
            AnalyticsApi.push(["postalert-success", "success"]);
          }
        };

        var postAlertCallback = function(aResult) {
          if ((aResult != null) && ( (aResult.preAlertExists) || (null != aResult.results && aResult.results.errorCodes != null && aResult.results.errorCodes[0] == "0013")) ) {
            // there is already a preAlert for the given courierNumber
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.postalert.error.title");
            notification.msg = _i18n.getString("extension.postalert.exists.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            AnalyticsApi.push(["postalert-failed", "postalert-exists"]);
          } else if ((aResult == null) || (aResult.apiErrors) || (null != aResult.results && aResult.results.errorCodes != null && aResult.results.errorCodes.length > 0) ||
            (aResult.status != null && aResult.status != 200)) {
            // there were errors generating the preAlert
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.postalert.error.title");
            var errorMsg = _i18n.getString("extension.postalert.error.msg", [aInfoObj.courierNumber]);
            if (aResult != null && aResult.errorDescription) {
              errorMsg += " (" + aResult.errorDescription + ")";
            }
            notification.msg = errorMsg;
            NotificationService.showNotification(notification, true, 0);
            AnalyticsApi.push(["postalert-failed", "postalert-creation"]);
          } else if (aResult.preAlertNumber && !newPrealert) {
            // check if we have an invoice stored (for Amazon we might)

            var getInvoiceCallback = function(aInvoice) {
              // part 1 succeeded, now upload attachment
              var attachmentObj = {};
              attachmentObj.Token = activeAccount.get("token");
              attachmentObj.AerotrackOrPreAlertCourier = aInfoObj.courierNumber;

              var invoiceUploadRestricted = false;
              if (aInvoice) {
                // we have an invoice html, so we send that instead of the
                // screenshot
                var encodedHtml = $.base64.btoa(aInvoice.get("invoiceHtml"), true);
                attachmentObj.data = encodedHtml;
                attachmentObj.fileName = aInfoObj.courierNumber + ".html";
              } else {
                // for ebay order details page, the invoiceHtml might come in the
                // aInfoObj object
                if (aInfoObj.invoiceHtml) {
                  var encodedHtml = $.base64.btoa(aInfoObj.invoiceHtml, true);
                  attachmentObj.data = encodedHtml;
                  attachmentObj.fileName = aInfoObj.courierNumber + ".html";
                } else if (aInfoObj.invoiceImage) {
                  // IF JPG INVOICE RESTRICTION IS ACTIVE AND THE GATEWAY IS IN THE LIST OF RESTRICTED COUNTRIES,
                  // ABORT THE INVOICE UPLOAD PROCESS AND SHOW ERROR TO CUSTOMER
                  if (PropertyHelper.get(PropertyHelper.PROP_RESTRICT_JPG_INVOICE_UPLOAD) &&
                      PropertyHelper.get(PropertyHelper.PROP_JPG_INVOICE_RESTRICTION_COUNTRIES).toLowerCase().indexOf(activeAccount.get("gateway").toLowerCase()) != -1) {
                    // NOTIFY USING SENTRY
                    var error = {};
                    error.message = "Html invoice failed: prevented jpg invoice upload for prealert: " +
                                    aInfoObj.courierNumber;
                    error.extra = {};
                    error.extra.courierNumber = aInfoObj.courierNumber;
                    error.extra.prealertNumber = aResult.prealertNumber;
                    error.extra.shipper = aInfoObj.shipperName;

                    Background.reportError(error);
                    // commented out so we upload the jpg invoice anyway, until
                    // discussed with colin and agreed a different handling
                    //attachmentUploadCallback({apiErrors: true});
                    //invoiceUploadRestricted = true;
                  }
                  // get rid of the data:image/png;base64, prefix from the image
                  attachmentObj.data =
                    aInfoObj.invoiceImage.replace("data:image/jpeg;base64,", "");
                  attachmentObj.fileName = aInfoObj.courierNumber + ".jpeg";
                }
              }

              attachmentObj.documentType = 1; // invoice
              attachmentObj.language = activeAccount.get("language");
              //attachmentObj.language = 1; // use english

              if (!invoiceUploadRestricted) {
                PreAlertService.uploadInvoice(attachmentObj, attachmentUploadCallback);
                // update progress
                var notification = new NotificationObject(aInfoObj.courierNumber);
                notification.type = "progress";
                notification.point = "invoice";
                notification.title = _i18n.getString("extension.postalert.progress.title");
                notification.msg = _i18n.getString("extension.postalert.invoice.msg", [aInfoObj.courierNumber]);
                NotificationService.showNotification(notification);
              }
            };

            if (!newPrealert) {
              InvoiceService.getInvoice(aInfoObj.courierNumber, getInvoiceCallback);
            }
          } else if (newPrealert) {
            var notification = new NotificationObject(aInfoObj.courierNumber);
            notification.type = "basic";
            notification.point = null;
            notification.title = _i18n.getString("extension.postalert.congratulations.title");
            notification.msg = _i18n.getString("extension.postalert.congratulations.msg", [aInfoObj.courierNumber]);
            NotificationService.showNotification(notification);
            // reload current page to display the updated button
            Background.reloadCurrentTab();
            // we can now update the list of prealerts and packages
            UpdateService.forceUpdate();
            // generate GA events for successful prealert
            AnalyticsApi.push(["prealert-success", "success"]);
          }
        }

        if (newPrealert){      
        //Se hace un llamado asincrono para mostrar el mensaje al usuario          
          setTimeout(function() {
            packageToPreAlert.descriptions = [];
            if(aInfoObj.packageDescriptions != null && aInfoObj.packageDescriptions.length > 0){
              packageToPreAlert.descriptions = aInfoObj.packageDescriptions;
            }else{
              packageToPreAlert.descriptions.push(aInfoObj.packageDescription.substring(0, 100));
            }
            //Se obtienen todas las facturas para enviarlas
            for(var i = 0; i < aInfoObj.ordersUrl.length; i++){
              var inv = Background._getInvoiceHTML(aInfoObj.ordersUrl[i]);            
              var decoded  = Background._decodeHTMLEntities(inv);
              packageToPreAlert.invoiceData[i] = $.base64.btoa(decoded, true);
              if(aInfoObj.ordersUrl.length > 1){
                var description = $("div[class='a-fixed-left-grid-inner']", inv).find("a[class='a-link-normal']");
                packageToPreAlert.descriptions[i] = $(description[0]).text();
              }  
            }
            PreAlertService.packagePostAlertRest(aInfoObj.shipperName, packageToPreAlert, postAlertCallback);                      
          }, 0 | Math.random() * 100);
        } else {
          PreAlertService.packagePostAlert(packageToPreAlert, postAlertCallback);
        }
         
        //show preAlert progress notification
        var notification = new NotificationObject(aInfoObj.courierNumber);
        notification.type = "progress";
        notification.point = "start";
        notification.title = _i18n.getString("extension.postalert.progress.title");
        notification.msg = _i18n.getString("extension.postalert.start.msg", [aInfoObj.courierNumber]);
        NotificationService.showNotification(notification); 
      //}    
    } else {
      if (!AccountService.isSignedIn) {
        // prompt the user to sign in
        // there were errors generating the preAlert
        var notification = new NotificationObject(aInfoObj.courierNumber);
        notification.type = "basic";
        notification.point = null;
        notification.title = _i18n.getString("extension.postalert.error.title");
        notification.msg = _i18n.getString("extension.signin.error.msg");
        NotificationService.showNotification(notification);
      }

      if (!clientAllowed) {
        NotificationService.showInvalidClientNotification();
      }
    }

  },
  /**
   * returns the worker for the tab passed as parameter or for the currently active
   * tab if none provided
   * @param aTab the tab to search its worker
   * @returns the respective worker (if any)
   */
  getTabWorker : function(aTab) {
    var tabWorker = Background.tabWorkers[aTab.id];
    return tabWorker;
  },

  fillAddress : function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var currentTabWorker = Background.getTabWorker(tab);
      var supportedSitesCallback = function(aSiteList) {
        var results = {};
        results.addressInfo = AccountService.activeAccount;
        results.siteList = aSiteList;
        chrome.tabs.sendMessage(tabs[0].id, {message: "fillAddress", info : results}, function(response) {
          //console.log(response.farewell);
        });
      };
      if (currentTabWorker && currentTabWorker.domains.length > 0) {
        var workerDomains = currentTabWorker.domains;
        for (var i = 0; i < workerDomains.length; i++) {
          SupportedSiteService.getSupportedSitesForDomain(workerDomains[i], supportedSitesCallback);
        }
      }
    });
  },

  /**
   * Reloads the current tab
   */
  reloadCurrentTab : function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      chrome.tabs.reload(tab.id);
    });
  },

  /**
   * Opens the page passed as parameter
   * @param aPageName the name of the page to be displayed
   * @param aUrl the url to be opened, in case aPageName is not provided
   */
  openPage : function(aPageName, aUrl) {
    var url;
    if (aPageName) {
      var locale = $.i18n.getString("extension.locale.code");
      var localeCode = locale == "1" ? "en" : "es";
      var lang;
      switch (aPageName) {
        case "preAlert":
          if (aUrl) {
            url = aUrl;
          } else {
            if (AccountService.isSignedIn) {
              var activeAccount = AccountService.activeAccount;
              url = ConfigSettings.MY_AERO_DIRECTED_URL;
              url = url.replace("%S1", activeAccount.get("language"));
              url = url.replace("%S2", activeAccount.get("gateway").toLowerCase());
              url = url.replace("%S3", activeAccount.get("accountNumber"));
            } else {
              url = ConfigSettings.MY_AERO_DIRECTED_URL;
              url = url.replace("%S1", "");
              url = url.replace("%S2", "");
              url = url.replace("%S3", "");
            }
          }
          break;
        case "editPreAlert":
          // in this case the aUrl parameter contains the prealertId
          url = ConfigSettings.MY_AERO_PACKAGES_URL.replace("%S", localeCode);
          break;
        case "newPreAlert":
          // in this case the aUrl parameter contains the prealertId
          url = ConfigSettings.MY_AERO_PACKAGES_URL.replace("%S", localeCode);
          break;
        case "forgotPassword":
          url = ConfigSettings.FORGOT_PASSWORD_URL.replace("%S", locale);
          break;
        case "package":
          lang = locale == "0" ? "es" : "en";
          url = aUrl.replace("%S", lang);;
          break;
        case "profile":
          url = ConfigSettings.MY_AERO_PROFILE_URL.replace("%S", localeCode);
          break;
        case "changeLog":
          url = ConfigSettings.CHANGE_LOG_URL;
          url = url.replace("%S1", localeCode);
          break;
        case "newPreAlert":
          url = ConfigSettings.NEW_PREALERT_URL;
          break;
        case "homepage":
          lang = locale == "0" ? "es" : "en";
          url = ConfigSettings.AEROPOST_BASE_URL;
          url = url.replace("%S1", lang);
          break;
        case "viewCart":
          lang = locale == "0" ? "es" : "en";
          url = ConfigSettings.VIEW_CART_URL;
          url = url.replace("%S1", lang);
          break;
        case "continue-checkout":
          lang = locale == "0" ? "es" : "en";
          if(lang == "es"){
            url = ConfigSettings.VIEW_CART_URL_ES;
          } else {
            url = ConfigSettings.VIEW_CART_URL_EN;
          }          
          url = url.replace("%S1", lang);
          break;
        case "checkout":
          lang = locale == "0" ? "es" : "en";
          url = ConfigSettings.CHECKOUT_URL;
          url = url.replace("%S1", lang);
          break;
        case "orderList":
          lang = locale == "0" ? "es" : "en";
          url = ConfigSettings.ORDER_LIST_URL;
          url = url.replace("%S1", lang);
          break;
        case "showOrder":
          lang = locale == "0" ? "es" : "en";
          url = ConfigSettings.SHOW_CENTER_DETAIL_URL;
          url = url.replace("%S1", lang);
          url = url.replace("%S2", aUrl);
          break;
      }
    } else {
      url = aUrl;
    }
    chrome.tabs.create({'url': url});
  },

  _encodeHTML : function (aString) {
    return aString.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&apos;');
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
   * Shows a feedback notification
   * @param aState the state to select the notification to be displayed
   */
  showFeedbackNotification : function(aState) {
    var notification = new NotificationObject(new Date().getTime());
    notification.type = "basic";
    notification.point = null;

    switch(aState) {
      case "start":
      case "success":
        notification.title = $.i18n.getString("extension.feedback.notification." + aState + ".title");
        break;
      case "error":
        notification.title = $.i18n.getString("extension.api.error.title");
        break;
    }
    notification.msg = $.i18n.getString("extension.feedback.notification." + aState);
    NotificationService.showNotification(notification);
  },

  /**
   * Removes the injected buttons from all tabs
   */
  _removeInjectedButtons : function() {
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        chrome.tabs.sendMessage(tab.id, {message: "removeInjectedButtons"}, function(response) {
          //console.log(response.farewell);
        });
      }
    });
  },

  /**
   * cleans the printable version of the amazon invoice to remove
   * the unnecesary info
   * @param aInvoiceHTML the invoice html to be processed
   * @param aPackageDescription the package description to be used to clean
   * the invoice
   * @param aCourierNumber the courier number for the shipment we are generating
   * the invoice for
   * @returns the cleaned invoice
   */
  _generateInvoice : function(aInvoiceHTML, aPackageDescription, aCourierNumber) {
    var finalHtml = null;
    var cleanHTML = Background._cleanHTML(aInvoiceHTML);
    cleanHTML = $(Background._trimHTML(cleanHTML));

    // find the table that contains the item description and
    // remove the rest

    // first, get shipment nodes
    var shipmentNodes = $(cleanHTML).find("center:contains('Shipped on')");
    if (shipmentNodes.length > 0) {
      var shipmentTableContainer = $(shipmentNodes[0]).closest("table").parent().closest("table").parent().closest("table").parent().closest("table").parent().closest("table").parent();
      var shipmentTables = $(shipmentTableContainer).children("table");
      // the first one is the order summary table node, so we keep it
      // but we remove the order total value from it, because for
      // orders with multiple packages, this will be the value for the
      // entire order, not only the shipment we are interested in
      var summaryNode = shipmentTables[0];
      $($(summaryNode).find("b:contains('Order Total:')")[0]).parent().html("<b>Tracking Number:</b> " + aCourierNumber);

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
    return finalHtml;
  },

  /**
   * Sends an error report to Sentry
   * @param aError the error to be sent
   */
  reportError : function(aError) {
    SentryApi.reportError(aError);
  },

  /**
   * Loads the my account page specified and returns its html content
   * @param aPage the page to be loaded
   * @param aCallback the callback to be called when the page is loaded
   */
  loadMyAccountPage : function(aPage, aCallback) {
    var targetUrl = ConfigSettings.AEROPOST_BASE_URL;

    if (AccountService.activeAccount.get("language") == 0) {
      targetUrl = targetUrl.replace("%S1", "en");
    } else {
      targetUrl = targetUrl.replace("%S1", "es");
    }

    targetUrl += aPage;

    /*var request =
      $.ajax({
        type: "GET",
        url: targetUrl,
        jsonp: false,
        timeout: 60 * 1000,
      }).done(function(aData) {
        if (aCallback) {
          aCallback(aData);
        }
      }).fail(function(aXHR, aTextStatus, aError) {
        console.log(request.responseText);
      });*/

  },

  /**
   * Gets the invoice html
   * @param aUrl the invoice url
   * @param aCallback the callback to be called on return
   */
  _getInvoiceHTML : function(aUrl) {
    var cleanHtml = null;

    var request =
      $.ajax({
        async:false,
        type: "GET",
        url: aUrl,
        jsonp: false,
        timeout: 60 * 1000,
        contentType: "application/x-javascript; charset:ISO-8859-1",
        }).done(function(aData) {
          cleanHtml = Background._cleanHTML(aData);
          cleanHtml = Background._trimHTML(cleanHtml)
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
        });

    return cleanHtml;
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
  _trimHTML : function (aHTMLString) {
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

  _decodeHTMLEntities : function(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
  },

  /**
   * Observes for notifications.
   * @param aTopic the topic name.
   * @param aData the data sent.
   */
  observe : function(aTopic, aData) {

    switch(aTopic) {
      case Topics.ACCOUNT_SIGNED_OUT:
        Background._removeInjectedButtons();
        break;
    }

  }
};

/**
 * Constructor.
 */
//(function() { this._init(); }).apply(Background);
