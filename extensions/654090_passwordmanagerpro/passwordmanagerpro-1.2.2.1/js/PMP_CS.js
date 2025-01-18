//$Id$
(function(){
var PMP_CS = {
    top: null,
    left: null,
    width: null,
    height: null,
    autoFillSubmit: 0,
    formFilled: false,
    currentFormElement: null,
    clickedElement: null,
    reasonAndTicketCheck: false,
    clickedYesInIFrame: false,
    BUILDNUMBER: null,
    ISPERSONALTABENABLED: null,
    irregularForms: false,
    isAutofillIconSet: false,
    autofillAttemptCount: 0,
    chromeVersionCheck: null,
    isResourcePersonalTabClick: false,
    isIframeWarningExecuted: false,
    enableAutoFillSubmit: false,
    currentTabId : null,
    oldTabId: null,
    isAutoFillAccess:true,
    ticketId : '',
    reason : '',
    check : false,
    ticketRequiredMandatory : '',
    ticketRequired : '',
    reasonRequired : '',
    isPasswordAccessDenied : null,
    clearPasswordOnView : true,
    init: async function () {
        let tabData = await browser.runtime.sendMessage({ "action":"getCurrentTabId" });
        browser.runtime.onMessage.addListener(PMP_CS.processRequest);
        document.addEventListener("click", PMP_CS.removePopupDiv, false);
        PMP_CS.oldTabId = tabData.oldTabId;
        PMP_CS.currentTabId = tabData.currentTabId;
        let resourceUrlData = await PMP_CS.getResourceUrlData();
        if(PMP_CS.oldTabId === PMP_CS.currentTabId && await PMP_CS.fillTOTP()){
            return;
        }
        var resourceUrl = resourceUrlData.resourceUrl;
        var isAutoLogonAccess = resourceUrlData.isAutoLogonAccess;
        PMP_CS.isAutoFillAccess = resourceUrlData.isAutoFillAccess;
        var resourceUrlHasPlaceHolder = resourceUrlData.resourceUrlHasPlaceHolder;
        if (resourceUrlHasPlaceHolder === true && resourceUrl !== null) {
            var formParams = response.formParams;
            return false;
        }
        if (isAutoLogonAccess === false) {        //  Prevent content script from getting executed if autoLogin access is disabled
            return false;
        }
        if (resourceUrl !== null) {                       //  Case for Auto-login
            var urlCheck = PMP_CS.isMatchingUrl(resourceUrl);
            if (urlCheck === true) {
                PMP_CS.getUserCredentialsandLogin();
            } else {                                       //  Case for Auto-fill
                PMP_CS.detectForm();
            }
        } else if (resourceUrl === null && PMP_CS.isAutoFillAccess===true) {                  //  Case for Auto-fill
            var windowUrl = window.location.href;
            PMP_CS.getAccountAndAutoFill(windowUrl);    //  Gets accounts - if there is only one account, it will be autofilled
            let totpFillElem = totpAutofillUtils.getTOTPFillElement();
            if(totpFillElem){
                totpAutofillUtils.setTOTPIconStyle(totpFillElem);
                return;
            }
        }
    },
    async getResourceUrlData(){
		let resourceUrlData=await chrome.runtime.sendMessage({ "action":"getResourceUrl" });
        PMP_CS.isAutoFillAccess = resourceUrlData.isAutoFillAccess;
        PMP_CS.BUILDNUMBER = parseInt(resourceUrlData.buildNumber);
        PMP_CS.ISPERSONALTABENABLED = resourceUrlData.isPersonalTabEnabled;
        PMP_CS.chromeVersionCheck = resourceUrlData.chromeVersionCheck;
        PMP_CS.enableAutoFillSubmit=resourceUrlData.isAutoSubmitEnabled;
		return resourceUrlData;
	},
    removePopupDiv: function (event) {
        var divPresence = document.getElementById('autoFillFrame');
        if (divPresence !== "" && divPresence !== null && typeof divPresence !== 'undefined') {
            document.body.removeChild(document.getElementById('autoFillFrame'));
            PMP_CS.detectForm();
        }
        
    },
    trimDisplay: function (text, length) {
        if (text.length > length) {
            text = text.substring(0, length) + "...";
            return text;
        }
        return text;
    },

    getUserCredentialsandLogin: function () {
        browser.runtime.sendMessage({
            "action": "getLoginDetails",
            "data": null
        }, function (loginDetails) {
            var username = loginDetails.username;
            var password = loginDetails.password;
            PMP_CS.isPasswordAccessDenied = loginDetails.isPasswordAccessDenied;
            if ((username !== null && password !== null) && (username !== '' && password !== '')) {
                PMP_CS.detectForm(loginDetails);
                PMP_CS.clearBgLoginData();
            } else {
                PMP_CS.detectForm();           //  Not sure in which case this will be executed
            }
        });
    },
    getAccountAndAutoFill: function (windowUrl) {

        var dataJson = {
            'windowUrl': windowUrl,
            'operation': 'newTabLoaded'
        };

        browser.runtime.sendMessage({
            "action": "searchUrlForAutofill",
            "data": dataJson
        }, function (response) {
             if(response)
             {
            if (response.status === true && response.dataResource.length === 1) {
                PMP_CS.reasonAndTicketCheck = response.reasonAndTicketCheck;
                var displayArray = response.dataResource;
                if (PMP_CS.isMatchingUrl(response.tabLoadedResourceUrl) === true) {
                    PMP_CS.getPasswordAndAutoFill(displayArray, 'getResourceAccountList');
                }
                else {
                    PMP_CS.detectForm();
                }
            }
            else if (response.status === true && response.dataResource.length === 0 && response.dataPersonal.length === 1) {
                var displayPersonalArray = response.dataPersonal;
                if (PMP_CS.isMatchingUrl(response.tabLoadedPersonalUrl) === true) {
                    PMP_CS.getPasswordAndAutoFill(displayPersonalArray, 'getPersonalAccountList');
                }
                else {
                    PMP_CS.detectForm();
                }
            }
            else if (response.status === true && response.dataResource.length > 1) {
                PMP_CS.reasonAndTicketCheck = response.reasonAndTicketCheck;
                PMP_CS.detectForm();
            } else {
                PMP_CS.detectForm();
            }
        }
        });
    },
    getPasswordAndAutoFill: function (displayArray, operationName) {
        var accountName = null;
        var categoryId = null;
        var loginDetails = {
            'operationName': operationName
        };
        if (operationName === 'getResourceAccountList') {
            loginDetails.passwordId = displayArray[0].passwdId;
            accountName = displayArray[0].accountName;
            PMP_CS.isPasswordAccessDenied = (displayArray[0].isPasswordAccessDenied == true) ? true : false;
            loginDetails.accountId = displayArray[0].accountId;
        }
        else if (operationName === 'getPersonalAccountList') {
            loginDetails.categoryId = displayArray[0].categoryId;
            loginDetails.accountId = displayArray[0].accountId;
            accountName = displayArray[0].loginName;
            loginDetails.isPersonal = true;
        }
        loginDetails.username=accountName;
        loginDetails.isTOTPConfigured = displayArray[0].isTOTPConfigured;
        browser.runtime.sendMessage({
            "action": "getPasswordForAutoFill",
            "data": loginDetails
        }, function (response) {
            if (response.status === true) {
                loginDetails.password = response.data;
                PMP_CS.autoFillSubmit = PMP_CS.enableAutoFillSubmit;
                PMP_CS.detectForm(loginDetails);
            }
            else {
                PMP_CS.detectForm();
            }
        });
    },

    createAutoFillIframe: function(isTOTPView){
        var iframe=document.getElementById("autoFillFrame");
        if(iframe !=null){
            document.body.removeChild(iframe);
        }
        iframe  = document.createElement("iframe");
        iframe.setAttribute("id","autoFillFrame");
        iframe.src  = chrome.extension.getURL("html/autoFill.html?isTOTPView="+isTOTPView);
        iframe.id="autoFillFrame";
        iframe.style.width = PMP_CS.width+ 'px';
        iframe.style.height = "360";
        iframe.style.zIndex = new Date().getTime();
        iframe.style.position = "absolute";
        iframe.style.left = PMP_CS.left+ 'px';
        iframe.style.top = (PMP_CS.top+PMP_CS.height) + 'px';
        iframe.style.background="#FFFFFF";
        iframe.style.border="1px solid";
            
        document.body.insertBefore(iframe, document.body.firstChild);
        iframe.focus();
        
        
    },


    getDataForAutoFill: function (windowUrl, operationName) {
        PMP_CS.displayLoadingPopupDiv();

        var dataJson = {
            'windowUrl': windowUrl,
            'operation': operationName
        };

        browser.runtime.sendMessage({
            "action": "searchUrlForAutofill",
            "data": dataJson
        }, function (response) {
            if(response)
            {
            if (response.status === true) {
            	var displayArray = null;
                PMP_CS.reasonAndTicketCheck = response.reasonAndTicketCheck;
                PMP_CS.ticketRequiredMandatory= response.ticketRequiredMandatory;
                PMP_CS.ticketRequired= response.ticketRequired;
                PMP_CS.reasonRequired= response.reasonRequired;
                if (PMP_CS.reasonAndTicketCheck === true && operationName === 'getResourceAccountList') {
                	displayArray = response.dataResource;
                }
                
                if (operationName === 'getResourceAccountList') {
                    displayArray = response.dataResource;
                }
                else if (operationName === 'getPersonalAccountList') {
                    displayArray = response.dataPersonal;
                }
                PMP_CS.autoFillSubmit = PMP_CS.enableAutoFillSubmit;
                PMP_CS.clickedYesInIFrame = false;
                PMP_CS.listMatchingAccounts(displayArray, operationName);
            } else {
                var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
                PMP_loginPopupDiv.removeChild(document.getElementById('PMP_loginPopupLoading'));
                var documentReferrer = PMP_CS.getDomain(document.referrer);
                var documentUrl = PMP_CS.getDomain(document.location.href);
                var parentWindowUrl = null;
                try {
                    parentWindowUrl = PMP_CS.getDomain(window.parent.document.URL);
                }
                catch (e) {
                    parentWindowUrl = null;
                }
                var PMP_errorMessagePopup = '';

                if (response.dataResource === 'session timeout') {
                   $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("login_to_your_account")));
                 
                }
                else if (response.dataResource === 'server not reachable') {
                   $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("server_not_reachable")));
                }
                else if( response.isAPIFailure === true ){
                    PMP_CS.noPasswordsFoundErrorMsg(response.dataResource, operationName);
                }
                else if( operationName === 'getResourceAccountList' ){
                    if (response.dataResource.length === 0 && documentReferrer !== "" && (documentReferrer !== documentUrl || documentReferrer !== parentWindowUrl) && documentUrl !== parentWindowUrl) {
                        PMP_CS.autoFillInIframe(operationName, documentReferrer, documentUrl, parentWindowUrl);
                    }
                    else if (response.dataResource.length === 0) {
                        PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
                    }
                }
                else if (operationName === "getPersonalAccountList") {
                    if (response.dataPersonal === "PASSPHRASE_NOT_SET") {
                        PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("configure_personal_password_web_client"), operationName);
                    } else if (response.dataPersonal === "PASSPHRASE_STATUS_FAILURE") {
                        PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("personal_passwords_disabled_for_usage"), operationName);
                    } else if (response.dataPersonal === "PERSONAL_ORG_CHANGED"){
                        PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("personal_password_organization_specific_autofill"), operationName);
                    }
                    else if (response.dataPersonal.length === 0) {
                        if (documentReferrer !== "" && (documentReferrer !== documentUrl || documentReferrer !== parentWindowUrl) && documentUrl !== parentWindowUrl) {
                            PMP_CS.autoFillInIframe(operationName, documentReferrer, documentUrl, parentWindowUrl);
                        }
                        else {
                            PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
                        }
                    }
                    else {
                        PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("login_personal_tab_in_addon"), operationName);
                    }
                }
                else {
                    $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("error_while_fetching_resources")));
                }
            }
        }
        });
    },
    autoFillInIframe: function (operationName, documentReferrer, documentUrl, parentWindowUrl) {
        if (PMP_CS.clickedYesInIFrame === true) {
            
            PMP_CS.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
            PMP_CS.clickedYesInIFrame = false;
        } else {
            var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
            var PMP_resourcePersonalSelect = document.getElementById("PMP_resourcePersonalSelect");
            var PMP_errorMessagePopup = document.getElementById("PMP_errorMessagePopup");
            var PMP_loginPopupDivUL = document.getElementById("PMP_loginPopupDivUL");

            if (PMP_resourcePersonalSelect !== null) {
                PMP_loginPopupDiv.removeChild(PMP_resourcePersonalSelect);
            }
            if (PMP_errorMessagePopup !== null) {
                PMP_loginPopupDiv.removeChild(PMP_resourcePersonalSelect);
            }
            if (PMP_loginPopupDivUL !== null) {
                PMP_loginPopupDiv.removeChild(PMP_resourcePersonalSelect);
            }

            if (PMP_CS.isIframeWarningExecuted === false || (operationName === 'getResourceAccountList' && PMP_CS.isResourcePersonalTabClick === false)) {
             $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).append($("<div>",{id:"PMP_errorIFrameMessage"}).text(browser.i18n.getMessage("the_login_form_is_in_an_iFrame"))).append($("<div>",{id:"PMP_popup_yes_container"}).append($("<div>",{id:"PMP_popup_yes"}).text(browser.i18n.getMessage("yes")))).append($("<div>",{id:"PMP_popup_no_container"}).append($("<div>",{id:"PMP_popup_no"}).text(browser.i18n.getMessage("no")))));

                var clickedYes = document.getElementById('PMP_popup_yes');
                if (documentReferrer !== documentUrl) {
                    clickedYes.addEventListener("click", function (e) {
                        PMP_CS.isIframeWarningExecuted = true;
                        PMP_CS.clickToListResources(operationName);
                        e.stopPropagation();
                    }, false);
                } else if (documentReferrer !== parentWindowUrl) {
                    clickedYes.addEventListener("click", function (e) {
                        PMP_CS.isIframeWarningExecuted = true;
                        PMP_CS.clickToListResourcesFromParentWindow(operationName);
                        e.stopPropagation();
                    }, false);
                }
            }
            else {
                if (documentReferrer !== documentUrl) {
                    PMP_CS.clickToListResources(operationName);
                } else if (documentReferrer !== parentWindowUrl) {
                    PMP_CS.clickToListResourcesFromParentWindow(operationName);
                }
            }
        }
    },
    noPasswordsFoundErrorMsg: function (errMsg, operationName) {
       
      
        var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
        var PMP_resourcePersonalSelect = document.getElementById("PMP_resourcePersonalSelect");
        var isAutoFillTabSelectionDiv = (PMP_CS.BUILDNUMBER >= 8402 && PMP_CS.ISPERSONALTABENABLED === "true") && PMP_resourcePersonalSelect === null;
        if (isAutoFillTabSelectionDiv === true) {
         
            PMP_CS.getAutoFillTabSelectionDiv(operationName);
        }
        $("#PMP_loginPopupDiv").append($("<div>",{id:"PMP_errorMessagePopup"}).text(errMsg));
        if (isAutoFillTabSelectionDiv === true) {
            PMP_CS.resourcePersonalDivClick();
        }
    },
    getAutoFillTabSelectionDiv: function (operationName) {
      if(operationName==='getResourceAccountList')
        {
            $("#PMP_loginPopupDiv").append($("<div>",{id:"PMP_resourcePersonalSelect"}).append($("<div>",{id:"PMP_resourceButton",class:"PMP_selectedTab"}).append($("<span>").text(browser.i18n.getMessage("enterprise")))).append($("<div>",{id:"PMP_personalButton"}).append($("<span>").text(browser.i18n.getMessage("personal")))));
        }
        else if(operationName==='getPersonalAccountList')
        {
            $("#PMP_loginPopupDiv").append($("<div>",{id:"PMP_resourcePersonalSelect"}).append($("<div>",{id:"PMP_resourceButton"}).append($("<span>").text(browser.i18n.getMessage("enterprise")))).append($("<div>",{id:"PMP_personalButton",class:"PMP_selectedTab"}).append($("<span>").text(browser.i18n.getMessage("personal")))));
        }
       
    },
    displayReasonRequired: function (operationName) {
        var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
        PMP_loginPopupDiv.removeChild(document.getElementById('PMP_loginPopupLoading'));
        var isPersonalTabEnabled = PMP_CS.BUILDNUMBER >= 8402 && PMP_CS.ISPERSONALTABENABLED === "true";
        if (isPersonalTabEnabled === true) {
           PMP_CS.getAutoFillTabSelectionDiv(operationName);
         
        }
        $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("disable_reason_and_ticket")));
        
        if (isPersonalTabEnabled === true) {
            PMP_CS.resourcePersonalDivClick();
        }       
    },
    htmlEncode: function (value) {
        if (value) {
            return jQuery('<div/>').text(value).html();
        } else {
            return '';
        }
    },
    isTicketIdValid: function (ticketId) {
        var ticketIdRegex = /[^a-zA-Z0-9_\-\.\ ]+/gi;
        var ticketIdMatches = ticketId.match(ticketIdRegex);
        return (ticketIdMatches === null) ? true : false;
    },
   
    clickToListResources: function (operationName) {
        PMP_CS.clickedYesInIFrame = true;
        var windowUrl = document.referrer;
        PMP_CS.getDataForAutoFill(windowUrl, operationName);
    },
    clickToListResourcesFromParentWindow: function (operationName) {
        PMP_CS.clickedYesInIFrame = true;
        var windowUrl = window.parent.document.URL;
        PMP_CS.getDataForAutoFill(windowUrl, operationName);
    },
    displayLoadingPopupDiv: function () {
        var loginDiv= document.createElement('div');
        loginDiv.setAttribute("id","PMP_loginPopupDiv");
        var popupLoadingDiv=document.createElement('div');
        popupLoadingDiv.setAttribute("id","PMP_loginPopupLoading");
        var loadingImg=document.createElement('img');
        loadingImg.setAttribute("src",browser.extension.getURL("images/loading.gif"));
        popupLoadingDiv.append(loadingImg);
        loginDiv.append(popupLoadingDiv);
        var divPresence = document.getElementById('PMP_loginPopupDiv');
        if (divPresence !== "" && divPresence !== null && typeof divPresence !== 'undefined') {
            document.body.removeChild(document.getElementById('PMP_loginPopupDiv'));
        }
        document.body.appendChild(loginDiv);
        document.getElementById('PMP_loginPopupDiv').style.width = PMP_CS.width + 'px';
        document.getElementById('PMP_loginPopupDiv').style.top = (PMP_CS.top + PMP_CS.height) + 'px';
        document.getElementById('PMP_loginPopupDiv').style.left = PMP_CS.left + 'px';
    },
    listMatchingAccounts: function (displayArray, operationName) {
       
       
        var loginDivUL= document.createElement("ul");
        loginDivUL.setAttribute("id","PMP_loginPopupDivUL");
        for (var i = 0; i < displayArray.length; i++) {
            var data = displayArray[i];
            var loginData = '';
            var displayHeaderName = '';
            var displayAccountName = '';
            var loginDivLI=document.createElement("li");
            if (operationName === 'getResourceAccountList') {
                displayHeaderName = data.resourceName;
                displayAccountName = data.accountName;
                loginDivLI.setAttribute('accountName',displayAccountName);
                loginDivLI.setAttribute('passwdId',data.passwdId);
               
            }
            else if (operationName === 'getPersonalAccountList') {
                displayHeaderName = data.serviceName;
                displayAccountName = data.loginName;
                loginDivLI.setAttribute('accountName',displayAccountName);
                loginDivLI.setAttribute('categoryId',data.categoryId);
                loginDivLI.setAttribute('accountId',data.accountId);
               
            }
            loginDivLI.setAttribute('operationName',operationName);
          
           var resHeaderName= document.createElement("div");
           resHeaderName.setAttribute("class","PMP_resourceName");
           var reshntext=document.createTextNode(PMP_CS.trimDisplay(displayHeaderName, 35));
           resHeaderName.appendChild(reshntext);
           loginDivLI.appendChild(resHeaderName);
           var accHeaderName= document.createElement("div");
           accHeaderName.setAttribute("class","PMP_accountName");
           var acchntext=document.createTextNode(PMP_CS.trimDisplay(displayAccountName, 35));
           accHeaderName.appendChild(acchntext);
           loginDivLI.appendChild(accHeaderName);
          loginDivUL.appendChild(loginDivLI);
        }

        var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
        if (PMP_loginPopupDiv !== null) {
            PMP_loginPopupDiv.removeChild(document.getElementById('PMP_loginPopupLoading'));
            var isPersonalTabEnabled = PMP_CS.BUILDNUMBER >= 8402 && PMP_CS.ISPERSONALTABENABLED === "true";
            if (isPersonalTabEnabled === true) {
              
                PMP_CS.getAutoFillTabSelectionDiv(operationName);
               
            }
            PMP_loginPopupDiv.append(loginDivUL);
            $("#PMP_loginPopupDiv").show();
           
            if (isPersonalTabEnabled === true) {
                PMP_CS.resourcePersonalDivClick();
            }
        }

        PMP_CS.accountClick();

    },
    accountClick: function () {
        var accountClicked = document.getElementById('PMP_loginPopupDiv');
        if (accountClicked === null) {
            return false;
        }

        accountClicked.addEventListener("click", function (e) {
            var clickedTarget = false;
            if (e.target.nodeName === "LI") {
                clickedTarget = e.target;
            } else if (e.target.parentNode.nodeName === "LI") {
                clickedTarget = e.target.parentNode;
            }
            if (clickedTarget) {
                var operationName = clickedTarget.getAttribute('operationName');
                var accountName = clickedTarget.getAttribute('accountName');
                var id = null;
                var categoryId = null;
                if (operationName === 'getResourceAccountList') {
                    id = clickedTarget.getAttribute('passwdId');
                }
                else if (operationName === 'getPersonalAccountList') {
                    id = clickedTarget.getAttribute('accountId');
                    categoryId = clickedTarget.getAttribute('categoryId');
                }
                if((PMP_CS.reasonAndTicketCheck === true || PMP_CS.ticketRequired==='true' || PMP_CS.reasonRequired==='true') && operationName === 'getResourceAccountList')
                {
                	PMP_CS.getReasonAndTicketId();
                	PMP_CS.reasonAndTicketIdClick(id, categoryId, operationName, accountName);
                } 
                else
                {
                	PMP_CS.check = true;
                	PMP_CS.getPasswordForAutoFill(id, categoryId, operationName, accountName);
                }
            }
            e.stopPropagation(); 
        }, false);
    },
     getReasonAndTicketId : function() {
     var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
     $('#PMP_loginPopupDivUL').hide();
        var errMsgField=document.createElement('div');
        errMsgField.setAttribute("id","errMsgField");
        var errSpan = document.createElement("span");
        errSpan.setAttribute("id","PMP_TicketingAndReasonErrMsg");
        errMsgField.append(errSpan);
        
        var createTable = document.createElement("table");
        createTable.setAttribute("id","ticketAndReason");
              
       if(PMP_CS.ticketRequired==='true')
       {
        var row1 = document.createElement("tr");
        row1.setAttribute("height","40px");
        var col1 = document.createElement("td");
        col1.setAttribute("width","20%");
        col1.appendChild(document.createTextNode(browser.i18n.getMessage("ticket_id")));
        var col2 = document.createElement("td");
        col2.setAttribute("width","3%");
        col2.appendChild(document.createTextNode(":"));
        var col3 = document.createElement("td");
        col3.setAttribute("width","20%");
        var inputField=document.createElement("input");
        inputField.setAttribute("id","ticketId");
        inputField.setAttribute("type","text");
        col3.appendChild(inputField);
        row1.append(col1);
        row1.append(col2);
        row1.append(col3);
        createTable.append(row1);
        var row2 = document.createElement("tr");
        var col3 = document.createElement("td");
        col3.appendChild(document.createTextNode(browser.i18n.getMessage("reason")));
        var col4 = document.createElement("td");
        col4.appendChild(document.createTextNode(":"));
        var col5 = document.createElement("td");
        var inputField=document.createElement("input");
        inputField.setAttribute("id","reason");
        inputField.setAttribute("type","textarea");
        col5.appendChild(inputField);
        row2.append(col3);
        row2.append(col4);
        row2.append(col5);
        createTable.append(row2);
         var buttonDiv = document.createElement("div");
       buttonDiv.setAttribute("id","buttonStyle");
        var proceedButton = document.createElement("button");
        proceedButton.setAttribute("width","50%");
        proceedButton.setAttribute("id","proceed");
        proceedButton.appendChild(document.createTextNode(browser.i18n.getMessage("proceed")));
        buttonDiv.append(proceedButton);
        var cancelButton = document.createElement("button");
        cancelButton.setAttribute("width","100%");
        cancelButton.setAttribute("id","cancel");
        cancelButton.appendChild(document.createTextNode(browser.i18n.getMessage("cancel")));
        buttonDiv.append(cancelButton);
       }
       else
       {
        var row2 = document.createElement("tr");
        row2.setAttribute("height","40px");
        var col3 = document.createElement("td");
        col3.setAttribute("width","20%");
        col3.appendChild(document.createTextNode(browser.i18n.getMessage("reason")));
        var col4 = document.createElement("td");
        col4.setAttribute("width","3%");
        col4.appendChild(document.createTextNode(":"));
        var col5 = document.createElement("td");
        var inputField=document.createElement("input");
        inputField.setAttribute("id","reason");
        inputField.setAttribute("type","textarea");
        col5.appendChild(inputField);
        row2.append(col3);
        row2.append(col4);
        row2.append(col5);
        createTable.append(row2);
         var buttonDiv = document.createElement("div");
       buttonDiv.setAttribute("id","buttonStyle");
        var proceedButton = document.createElement("button");
        proceedButton.setAttribute("width","60%");
        proceedButton.setAttribute("id","proceed");
        proceedButton.appendChild(document.createTextNode(browser.i18n.getMessage("proceed")));
        buttonDiv.append(proceedButton);
        var cancelButton = document.createElement("button");
        cancelButton.setAttribute("width","40%");
        cancelButton.setAttribute("id","cancel");
        cancelButton.appendChild(document.createTextNode(browser.i18n.getMessage("cancel")));
        buttonDiv.append(cancelButton);
       }
      
        PMP_loginPopupDiv.append(errMsgField);
        PMP_loginPopupDiv.append(createTable);
        PMP_loginPopupDiv.append(proceedButton);
        PMP_loginPopupDiv.append(cancelButton);
   },
    reasonAndTicketIdClick: function(id, categoryId, operationName, accountName){
        $('#PMP_loginPopupDiv').find('#proceed').click( function (e) {
        	PMP_CS.check = true;
        	var ticketId='';
        	var ticketIdCheck = true;
            var reason = document.getElementById('reason').value;
            if(PMP_CS.ticketRequired==='true')
            {
            	ticketId = document.getElementById('ticketId').value;
            	ticketIdCheck = PMP_CS.hasHarmfulContent(ticketId);
            }
            
            var requestCheck = PMP_CS.hasHarmfulContent(reason);
            if ((PMP_CS.ticketRequired==='true' && ticketIdCheck === false) || requestCheck === false) {
                var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                PMP_CS.reasonFailedMessage(harmfulContent);
                PMP_CS.check = false;
                return false;
            }
            reason = PMP_CS.escapeQuotes(PMP_CS.htmlEncode(reason));
            reason = encodeURIComponent(reason);

            if(PMP_CS.ticketRequired==='true')
            {
            	ticketIdCheck = PMP_CS.isTicketIdValid(ticketId);
            }
            if (PMP_CS.ticketRequired === 'true' || ticketIdCheck !== true) {
                ticketId = encodeURIComponent(ticketId);
                if ((ticketId === "" && PMP_CS.ticketRequiredMandatory === 'true') || ticketIdCheck !== true) {
                    var enterTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                    PMP_CS.reasonFailedMessage(enterTcktId);
                    $('#ticketId').find('input').focus();
                    PMP_CS.check = false;
                    return false;
                }
            }
            if (PMP_CS.reasonRequired === 'true' && reason === "") {
                var enterReason = browser.i18n.getMessage("enter_reason_to_proceed");
                PMP_CS.reasonFailedMessage(enterReason);
                $('#reason').focus();
                PMP_CS.check = false;
                return false;
            }
            PMP_CS.ticketId = ticketId;
            PMP_CS.reason = reason;
            $('#PMP_TicketingAndReasonErrMsg').hide();                
            $('#reason').val('');
            $('#ticketId').find('input').val('');
            PMP_CS.getPasswordForAutoFill(id, categoryId, operationName, accountName);
        });   
        PMP_CS.check = false;
        $('#PMP_loginPopupDiv').find('#cancel').click( function (e) {
            $('#PMP_TicketingAndReasonErrMsg').hide();
            $('#reason').val('');
            $('#ticketId').find('input').val('');
            document.body.removeChild(document.getElementById('PMP_loginPopupDiv'));
            e.stopPropagation();
        });
    },
    getPasswordForAutoFill : function(id, categoryId, operationName, accountName){
    	 if(PMP_CS.check === true)
     	{
         var dataJson = {
                 'id': id,
                 'categoryId': categoryId,
                 'operationName': operationName,
                 'ticketId': PMP_CS.ticketId,
         		'reason': PMP_CS.reason
             };
         browser.runtime.sendMessage({
             "action": "getPasswordForAutoFill",
             "data": dataJson
         }, function (response) {
             if (response.status === true) {
            	 var ticketIdRequired='TICKET ID REQUIRED';
                 var ticketIdCorrectRequired='TICKET ID CORRECT REQUIRED';
                 var password = response.data;
                 if(password === ticketIdRequired || password === ticketIdCorrectRequired)
                    {
                        var enterTcktId = browser.i18n.getMessage("ticketid_incorrect_or_invalid");
                        PMP_CS.reasonFailedMessage(enterTcktId);
                        return false;
                    }
                PMP_CS.removePopupDiv();
                //  document.body.removeChild(document.getElementById('PMP_loginPopupDiv'));
                 if (PMP_CS.currentFormElement !== null || PMP_CS.clickedElement !== null) {
                     PMP_CS.formFilled = false;      //  Has a form been filled before this instance - set value to false
                     PMP_CS.autoFillSubmit = false;  //  Do not submit this form. To submit forms, set this flag to true
                     var windowUrl = PMP_CS.getDomain(window.location.href);
                     if (windowUrl === 'accounts.google.com') {
                         if (window.location.hash === "#identifier") {
                             PMP_CS.autoFillSubmit = true;
                         }
                         PMP_CS.fillGoogleForm(PMP_CS.currentFormElement, accountName, password, true);
                     } else if (PMP_CS.irregularForms === false && PMP_CS.currentFormElement !== null) {    //  '&& PMP_CS.currentFormElement !== null' to support one field case
                    	 PMP_CS.fillForm(PMP_CS.currentFormElement, accountName, password, false);
                         PMP_CS.currentFormElement = null;
                     } else {
                         var status = PMP_CS.isValidForm(PMP_CS.currentFormElement);
                         if (status === true) {                //  even though it was an irregular form, some hidden form elements might be un-hidden at this instant
                        	 PMP_CS.fillForm(PMP_CS.currentFormElement, accountName, password, false);
                             PMP_CS.currentFormElement = null;
                         } else {                              //  Now the form is definitely an invalid form
						 
                             var type = PMP_CS.clickedElement.type;
                             if (type === 'password') {
                                 PMP_CS.setValue(PMP_CS.clickedElement,password);
                             } else if (PMP_CS.checkField(type) === true) {
                                 PMP_CS.setValue(PMP_CS.clickedElement,accountName);
                                 if (PMP_CS.currentFormElement !== null) {     //  one field case
                                     PMP_CS.fillInvalidForms(PMP_CS.currentFormElement);
                                 }
                             }
                         }
                     }
                 } else {
                     PMP_CS.detectForm(accountName, password);
                 }
             }else {
                     var enterTcktId = browser.i18n.getMessage("ticketid_incorrect_or_invalid");
                     PMP_CS.reasonFailedMessage(enterTcktId);
             }
         });
     	}
    },
    autoFillPassword :function(loginDetails){
        PMP_CS.removePopupDiv();
        if (PMP_CS.currentFormElement !== null || PMP_CS.clickedElement !== null) {
            PMP_CS.formFilled = false;      //  Has a form been filled before this instance - set value to false
            PMP_CS.autoFillSubmit = false;  //  Do not submit this form. To submit forms, set this flag to true
            var windowUrl = PMP_CS.getDomain(window.location.href);
            if (windowUrl === 'accounts.google.com') {
                if (window.location.hash === "#identifier") {
                    PMP_CS.autoFillSubmit = true;
                }
                PMP_CS.fillGoogleForm(PMP_CS.currentFormElement, loginDetails, true);
            } else if (PMP_CS.irregularForms === false && PMP_CS.currentFormElement !== null) {    //  '&& PMP_CS.currentFormElement !== null' to support one field case
                if(PMP_CS.enableAutoFillSubmit){
                    PMP_CS.autoFillSubmit = true;
                }
                PMP_CS.fillForm(PMP_CS.currentFormElement,loginDetails, false);
                PMP_CS.currentFormElement = null;
            } else {
                var status = PMP_CS.isValidForm(PMP_CS.currentFormElement);
                if (status === true) {                //  even though it was an irregular form, some hidden form elements might be un-hidden at this instant
                    PMP_CS.fillForm(PMP_CS.currentFormElement,loginDetails, false);
                    PMP_CS.currentFormElement = null;
                } else {                              //  Now the form is definitely an invalid form
                    var type = PMP_CS.clickedElement.type;
                    if (type === 'password') {
                        PMP_CS.setValue(PMP_CS.clickedElement,loginDetails.password);
                        if(loginDetails.isTOTPConfigured === "true"){
                            PMP_CS.oldTabId=PMP_CS.currentTabId;
                            browser.runtime.sendMessage({
                                "action": "updateOldTabId",
                                "data":PMP_CS.oldTabId
                            });
                            PMP_CS.setTOTPAccountDetails(loginDetails);
                            document.addEventListener("click",PMP_CS.trackSignInClick,false);
                        }
                    } else if (PMP_CS.checkField(type) === true) {
                         PMP_CS.setValue(PMP_CS.clickedElement,loginDetails.username);
                        if (PMP_CS.currentFormElement !== null) {     //  one field case
                            PMP_CS.fillInvalidForms(PMP_CS.currentFormElement);
                        }
                    }
                }
            }
        } else {
            PMP_CS.detectForm(loginDetails);
        }
        
    },
    resourcePersonalDivClick: function () {
        $('#PMP_loginPopupDiv').find('#PMP_resourceButton').unbind('click');
        $('#PMP_loginPopupDiv').find('#PMP_resourceButton').click(function (e) {
            $('#PMP_loginPopupDiv').find('#PMP_personalButton').removeClass('PMP_selectedTab');
            $('#PMP_loginPopupDiv').find('#PMP_resourceButton').addClass('PMP_selectedTab');
            PMP_CS.onResourcePersonalTabSelect('getResourceAccountList');
            e.stopPropagation();
        });

        $('#PMP_loginPopupDiv').find('#PMP_personalButton').unbind('click');
        $('#PMP_loginPopupDiv').find('#PMP_personalButton').click(function (e) {
            $('#PMP_loginPopupDiv').find('#PMP_resourceButton').removeClass('PMP_selectedTab');
            $('#PMP_loginPopupDiv').find('#PMP_personalButton').addClass('PMP_selectedTab');
            PMP_CS.onResourcePersonalTabSelect('getPersonalAccountList');
            e.stopPropagation();
        });
    },
    onResourcePersonalTabSelect: function (operationName) {
        var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
        var PMP_errorMessagePopup = document.getElementById('PMP_errorMessagePopup');
        var PMP_loginPopupDivUL = document.getElementById('PMP_loginPopupDivUL');
        if (PMP_errorMessagePopup !== null) {
            PMP_loginPopupDiv.removeChild(PMP_errorMessagePopup);
        }
        if (PMP_loginPopupDivUL !== null) {
            PMP_loginPopupDiv.removeChild(PMP_loginPopupDivUL);
        }
        var windowUrl = window.location.href;
        PMP_CS.isResourcePersonalTabClick = true;
        PMP_CS.getDataForAutoFill(windowUrl, operationName);
    },
    processRequest: function (request, sender, sendResponse) {
        var action = request.action;
        var data = request.data;
        if (action === 'autoLogin') {
            PMP_CS.isPasswordAccessDenied = (data.isPasswordAccessDenied == true) ? true : false;
            PMP_CS.detectForm(data);
        }
        if(action==='clearClipp')
        {
            
             var copyFrom = document.createElement('input');
                    copyFrom.value = " ";
                    document.body.appendChild(copyFrom);
                    copyFrom.select();
                    document.execCommand('copy');
                    copyFrom.remove();
               
        }

	    if(action==='removeAutoFillFrame')
       {
            PMP_CS.removePopupDiv();
       }

       if(action==='autoFillPassword'){
            PMP_CS.isPasswordAccessDenied = (data.isPasswordAccessDenied == 'true') ?true : false;
            PMP_CS.autoFillPassword(data);
       }
       if(action === 'autoFillTOTP'){
            PMP_CS.autoFillTOTP(data);
       }
	   
	   if(action === 'setIframeDimensions') {
		   var iframe=document.getElementById('autoFillFrame');
		   iframe.style.removeProperty('max-height');
		   iframe.style.removeProperty('min-height');
		   if(data.action === 'min-height'){
			   iframe.style.minHeight=data.height;
		   }
		   if(data.action === 'max-height'){
			   iframe.style.maxHeight=data.height;
		   }
	   }
    },

    clearBgLoginData: function () {
        browser.runtime.sendMessage({
            'action': 'clearLoginData',
            'data': null
        });
    },
    checkField: function (prevType) {
        var fields = ['button', 'checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'select-one'];//No I18N
        return (fields.indexOf(prevType) === -1 ? true : false);
    },
    isDisplayblock: function (formElement) {
        var display = formElement.style.display;
        return ((display === 'none') ? false : true);
    },
    checkOffsetDimensions: function (currentElement) {
        if (PMP_CS.chromeVersionCheck === false) {
            if (!(currentElement.hasOwnProperty('offsetWidth') && currentElement.hasOwnProperty('offsetHeight'))) {      //  Not sure whether this check is necessary
                return false;
            }
        }
        var offsetWidth = currentElement.offsetWidth;
        var offsetHeight = currentElement.offsetHeight;
        return (offsetWidth > 0 && offsetHeight > 0) ? true : false;
    },
    isValidForm: function (currentForm) {
        if (currentForm === null) {
            return false;
        }
        for (var i = 0; i < currentForm.length; i++) {
            var type = currentForm[i].type;
            var validPasswordOffset = PMP_CS.checkOffsetDimensions(currentForm[i]);
            if (type === 'password' && validPasswordOffset === true) {
                var nextType;
                var nextTypeDisplayBlock;
                if (i + 1 < currentForm.length) {
                    nextType = currentForm[i + 1].type;
                    nextTypeDisplayBlock = PMP_CS.isDisplayblock(currentForm[i + 1]);
                } else {
                    nextType = null;
                    nextTypeDisplayBlock = false;
                }

                var isDisplayblock = PMP_CS.isDisplayblock(currentForm[i]);
                if (nextType === 'password' && nextTypeDisplayBlock === true) {
                    continue;       //  The form is a registration form and not a login form
                }
                if (isDisplayblock === true) {
                    for (var j = i - 1; j >= 0; j--) {
                        var prevType = currentForm[j].type;
                        var isDisplayBlock = PMP_CS.isDisplayblock(currentForm[j]);
                        var validTextOffset = PMP_CS.checkOffsetDimensions(currentForm[j]);       //  Disabled this check to enable autofill/autologin for google accounts
                        if (PMP_CS.checkField(prevType) === true && isDisplayBlock === true && validTextOffset === true) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },
    isMatchingUrl: function (resourceUrl) {
       
        var windowUrl = window.location.href;
        var protocolCheck = PMP_CS.checkProtocol(windowUrl, resourceUrl);
        var subDirectoryCheck = PMP_CS.subDirectoryCheck(windowUrl, resourceUrl);
        var windowUrlDomain = PMP_CS.getDomain(windowUrl);
        var resourceUrlDomain = PMP_CS.getDomain(resourceUrl);
        var windowUrlRootDomain,resourceUrlRootDomain;
        if(windowUrlDomain!==resourceUrlDomain)
        {
            windowUrlRootDomain=PMP_CS.getRootDomain(windowUrlDomain);
            resourceUrlRootDomain=PMP_CS.getRootDomain(resourceUrlDomain);
            return (windowUrlRootDomain === resourceUrlRootDomain && protocolCheck === true) ? true : false;
        }
        
        return (windowUrlDomain === resourceUrlDomain && protocolCheck === true ) ? true : false;
    },
    subDirectoryCheck: function (windowUrl, resourceUrl) {
        var replacedWindowUrl = windowUrl.replace(/.*?:\/\//g, "");     //To neglect the http:// or https:// in the url, since protocol check is made seperately
        var replacedResourceUrl = resourceUrl.replace(/.*?:\/\//g, "");
        return (replacedWindowUrl.indexOf(replacedResourceUrl) !== -1) ? true : false;
    },
    checkProtocol: function (windowUrl, resourceUrl) {
        var windowUrlCheck = (typeof windowUrl !== "undefined" && windowUrl !== "" && windowUrl.indexOf("/") !== -1) ? true : false;
        var resourceUrlCheck = (typeof resourceUrl !== "undefined" && resourceUrl !== "" && resourceUrl.indexOf("/") !== -1) ? true : false;
        if (resourceUrlCheck === true && windowUrlCheck === true) {
          
            var splitArr1 = windowUrl.match(/^(https?|ftp|file):\/\//i);
            var splitArr2Case = resourceUrl.match(/^(https?|ftp|file):\/\//i);
           var splitArr2=splitArr2Case[1].toLowerCase();
           return (splitArr1[1] === splitArr2) ? true : false;
        }
        return false;
    },
    getDomain: function (url) {
        if (typeof url !== "undefined" && url !== "" && url.indexOf("/") !== -1) {
           
            var splitArr = url.match(/^(https?|ftp|file):\/\/(www.)?([^\/]*)\/?.*/i);
          
            return (splitArr !== null && splitArr.length > 3) ? splitArr[3] : url;
        }
        return url;
    },
    getRootDomain:function(domain)
    {
        var secDomRegex="(.*)(\.co\.in|\.ac.in|\.gov\.in|\.nic\.in|\.edu\.in|\.co\.uk|\.org\.uk|\.ac\.uk)$";
        var topDomRegex="(.*)(\.com|\.org|\.co|\.in)$";
        var split1=domain.match(secDomRegex);
        var split2,Dom,RootDom,RotDom,tld="";
        if(split1==null)
        {
            var split2=domain.match(topDomRegex);
            if(split2==null)
            {
                Dom=null;
            }
            else
            {
                split2=split2.reverse();
                tld=split2[0];
                Dom=split2[1];
            }
        }
        else
        {
            split1=split1.reverse();
            tld=split1[0];
            Dom=split1[1];
    
        }
        
        if(Dom)
        {
            RootDom=Dom.split(".");
        RootDom=RootDom.reverse();
            RotDom=RootDom[0];
        RotDom=RotDom+tld;
        }
        else
        {
            RotDom=domain;
        }
        return RotDom;
    },
    formSubmit: function (submit, currentElements, currentElementPosition) {
        var i = currentElementPosition;
        if (PMP_CS.autoFillSubmit === true) {
            submit = true;
            PMP_CS.autoFillSubmit = 0;                      //  autoFillSubmit = 0  is the default value. A value of 0 doesnot over-ride form submission parameters
        } else if (PMP_CS.autoFillSubmit === false) {
            submit = false;
            PMP_CS.autoFillSubmit = 0;
        }

        if (submit === true) {
            for (var x = i + 1; x < currentElements.length; x++) {
                var CFtype = currentElements[x].type;
                var CFval = (currentElements[x].textContent).toString().toLowerCase();
                CFval = CFval.replace(/\s/g, '');		//	To remove the spaces within the strings
                var isSubmitButton = (CFtype === 'submit') ? true : false;
                let nextRegExp = /(?:next)|(?:continue)|(?:sign.?in)|(?:log.?in)|(?:log.?on)|(?:submit)|(?:confirm)/i;
                var isSignInButton;
                if(nextRegExp.test(CFval)){
                    isSignInButton = true;
                }
                if ((isSubmitButton || isSignInButton) /*&& (PMP_CS.oldTabId!=PMP_CS.currentTabId)*/) {		//	CHECK WHETHER IT SHOULD BE || OR && -----------------------------
                    PMP_CS.oldTabId=PMP_CS.currentTabId;
                    PMP_CS.currentTabId=null;
                    browser.runtime.sendMessage({
                        "action": "updateOldTabId",
                        "data":PMP_CS.oldTabId
                    });
                    currentElements[x].click();
                    break;
                }
            }
        }
    },
    fillGoogleForm: function (currentElements, loginDetails, submit) {
        let username =  loginDetails.username;
        let password = loginDetails.password;
        for (var i = 0; i < currentElements.length; i++) {
            var type = currentElements[i].type;
            if (type === 'password') {
                for (var j = i - 1; j >= 0; j--) {
                    if (PMP_CS.checkField(currentElements[j].type) === true) {
                        PMP_CS.setAutoFillIcon(currentElements[j], currentElements[i]);
                        if (username === '' && password === '') {
                            submit = false;
                        } else {
                            if (PMP_CS.formFilled === true) {                     //  Do not fill additional forms of the same priority
                                break;
                            }
                            currentElements[j].value = username;
                            currentElements[i].value = password;
                            PMP_CS.clearPasswordOnView = true;
                            PMP_CS.removePasswordOnView();
                            currentElements[i].autocomplete = 'off';
                            currentElements[j].autocomplete = 'off';
                            if (window.location.hash === "#identifier") {
                                PMP_CS.autoFillSubmit = true;
                            }
                            username = '';
                            password = '';
                            PMP_CS.formFilled = true;
                            if(loginDetails.isTOTPConfigured === "true"){
                                PMP_CS.oldTabId=PMP_CS.currentTabId;
                                browser.runtime.sendMessage({
                                    "action": "updateOldTabId",
                                    "data":PMP_CS.oldTabId
                                });
                                PMP_CS.setTOTPAccountDetails(loginDetails);
                                document.addEventListener("click",PMP_CS.trackSignInClick,false);
                            }
                            break;
                        }
                    }
                }
                if (username !== '' && password !== '' && PMP_CS.formFilled !== true && PMP_CS.autoFillSubmit === false) {
                    var type = PMP_CS.clickedElement.type;
                    if (type === 'password') {
                        PMP_CS.setValue(PMP_CS.clickedElement,password);
                        if(loginDetails.isTOTPConfigured === "true"){
                            PMP_CS.oldTabId=PMP_CS.currentTabId;
                            browser.runtime.sendMessage({
                                "action": "updateOldTabId",
                                "data":PMP_CS.oldTabId
                            });
                            PMP_CS.setTOTPAccountDetails(loginDetails);
                            document.addEventListener("click",PMP_CS.trackSignInClick,false);
                        }
                    } else if (PMP_CS.checkField(type) === true) {
                        PMP_CS.setValue(PMP_CS.clickedElement,username);
                    }
                }
                PMP_CS.formSubmit(submit, currentElements, i);
                break;
            }
        }
        PMP_CS.repairingAutofillIcon(currentElements);
    },
    fillForm: function (currentForm, loginDetails, submit) {
	   let username=loginDetails.username.trim();
	   let password=loginDetails.password.trim();
        for (var i = 0; i < currentForm.length; i++) {
            var type = currentForm[i].type;
            if (type === 'password') {
                if(i==0){
                    continue;
                }
                
                var formElement = currentForm[i];
                if (PMP_CS.chromeVersionCheck === false) {
                    if (!(formElement.hasOwnProperty('offsetWidth') && formElement.hasOwnProperty('offsetHeight'))) {
                        continue;
                    }
                }
                var fieldWidthCheck = formElement.offsetWidth;
                var fieldHeightCheck = formElement.offsetHeight;
                if (fieldWidthCheck === 0 && fieldHeightCheck === 0) {
                    continue;
                }
                for (var j = i - 1; j >= 0 && i > 0; j--) {               //	i>0 =>  A check to ensure that the first field is not a password field (to prevent exception)
                    if (PMP_CS.checkField(currentForm[j].type) === true && PMP_CS.isDisplayblock(currentForm[j]) === true) {
                        PMP_CS.setAutoFillIcon(currentForm[j], currentForm[i]);
                        if (username === '' && password === '') {
                            submit = false;
                        }
                        else {
                            if (PMP_CS.formFilled === true) {                     //  Do not fill additional forms of the same priority
                                break;
                            }
                            PMP_CS.setValue(currentForm[j],username);
                            PMP_CS.setValue(currentForm[i],password);
                            PMP_CS.clearPasswordOnView = true;
                            PMP_CS.removePasswordOnView();
                            currentForm[i].autocomplete = 'off';
                            currentForm[j].autocomplete = 'off';
                            PMP_CS.formFilled = true;
                            //submit = false;                                   //  To disable form submit during autologon
                            if(loginDetails.isTOTPConfigured === "true"){
                                PMP_CS.oldTabId=PMP_CS.currentTabId;
                                browser.runtime.sendMessage({
                                    "action": "updateOldTabId",
                                    "data":PMP_CS.oldTabId
                                });
                                PMP_CS.setTOTPAccountDetails(loginDetails);
                                document.addEventListener("click",PMP_CS.trackSignInClick,false);
                            }

                        }
                        break;
                    }
                }
                PMP_CS.formSubmit(submit, currentForm, i);
                break;
            }
        }
    },
        removePasswordOnView: function() {
        	var hiddenText = '';
            var passwordField = document.querySelector('input[type="password"]');
            passwordField.addEventListener('contextmenu', PMP_CS.disablePasswordFieldContextMenu);
            // Create a new MutationObserver instance
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'type' && !(mutation.target.type === 'password')) {
					if(PMP_CS.clearPasswordOnView & PMP_CS.isPasswordAccessDenied){
					  PMP_CS.setValue(passwordField,hiddenText);
					  PMP_CS.clearPasswordOnView = false;
                  	}
                }
              });
            });

            // Configure the observer to watch for changes to the password input field's 'type' attribute
            var observerConfig = {
              attributes: true,
              attributeFilter: ['type']
            };
            // Start observing the password input field
            observer.observe(passwordField, observerConfig);
        },
        disablePasswordFieldContextMenu: function(event) {
          if(PMP_CS.clearPasswordOnView & PMP_CS.isPasswordAccessDenied){
          	event.preventDefault();
          }
        },
    setValue:function(field,value)
    {
        if (field.value === field.defaultValue) {
            field.value = "";
        }
        field.value = value;
        PMP_CS.fireEvent(field, "change");
        PMP_CS.fireEvent(field, "input");
    },
     fireEvent: function(element, event) {
        var evt = document.createEvent("HTMLEvents");//No I18N
        evt.initEvent(event, true, true); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    },
    setAutoFillIcon: function (usernameElement, passwordElement) {
        if(PMP_CS.isAutoFillAccess===true)
        {
        if (usernameElement !== null) {                                     //  NEED TO DISCUSS WHETHER TO IMPLEMENT IT
            PMP_CS.setAutoFillIconStyle(usernameElement);
        }

        if (passwordElement !== null) {
            PMP_CS.setAutoFillIconStyle(passwordElement);
        }
        }
    },
    setAutoFillIconStyle: function (element) {
        element.style.backgroundImage = "url('" + browser.extension.getURL("images/pmp_16x16.png") + "')";
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "99% center";
        element.style.backgroundSize = "16px";
        PMP_CS.mouseHoverEvent(element);
        element.addEventListener("click", PMP_CS.mouseClickEvent, false);
        PMP_CS.isAutofillIconSet = true;
    },
    mouseHoverEvent: function (element) {
        var cusrsor = element.style.cursor;
        element.addEventListener("mousemove", function (event) {
            var boundary = this.getBoundingClientRect();
            var textareawidth = boundary.left + boundary.width - 20;
            var x = event.clientX;
            if (x > textareawidth) {
                this.style.cursor = "pointer";
            } else {
                this.style.cursor = cusrsor;
            }
        }, false);
    },
    mouseClickEvent: function (event) {
        var boundary = this.getBoundingClientRect();
        var textareawidth = boundary.left + boundary.width - 20;
        var x = event.clientX;
        if (x > textareawidth) {
            var scrollX = window.scrollX;
            var scrollY = window.scrollY;
            PMP_CS.top = boundary.top + scrollY;
            PMP_CS.left = boundary.left + scrollX;
            PMP_CS.width = (boundary.width < 250) ? 250 : boundary.width;
                        PMP_CS.height = boundary.height;

            var form = event.target.form;
            if (form !== null) {
                PMP_CS.currentFormElement = event.target.form.elements;
            }
            PMP_CS.clickedElement = event.target;

            var windowUrl = window.location.href;
            PMP_CS.isResourcePersonalTabClick = false;
            PMP_CS.isIframeWarningExecuted = false;
            // PMP_CS.getDataForAutoFill(windowUrl, 'getResourceAccountList');
            PMP_CS.createAutoFillIframe(false);
        }
        event.stopPropagation();
    },
    fieldsCount: function (currentForm, isValidForm) {
        var count = {"textField": 0, "pwdField": 0};
        for (var i = 0; i < currentForm.length; i++) {
            var type = currentForm[i].type;
            var displayCheck = (PMP_CS.isDisplayblock(currentForm[i]) === true && PMP_CS.checkOffsetDimensions(currentForm[i]) === true) ? true : false;
            if (type === 'password') {
                if (isValidForm === true && displayCheck === false) {
                    continue;
                }
                count.pwdField++;
            }
            if (PMP_CS.checkField(type) === true && displayCheck === true) {
                count.textField++;
            }
        }
        return count;
    },
    fillInvalidForms: function (currentElements) {
        var isValidForm = false;
        var fieldsCount = PMP_CS.fieldsCount(currentElements, isValidForm);
        var i = 0, j = 0, type = '';
        if (fieldsCount.pwdField >= 1) {                  //  There should be atleast one hidden password field in the form to perform autofill.
            for (i = 0; i < currentElements.length; i++) {
                type = currentElements[i].type;
                if (type === 'password') {
                    PMP_CS.setAutoFillIcon(null, currentElements[i]);

                    for (j = i - 1; j >= 0; j--) {
                        var prevType = currentElements[j].type;
                        if (PMP_CS.checkField(prevType) === true) {
                            PMP_CS.setAutoFillIcon(currentElements[j], null);
                            break;
                        }
                    }
                    break;
                }
            }
         }

    },
    repairingAutofillIcon: function (currentElements) {
        var settingIcon = setTimeout(function () {
            var hash = window.location.hash;
            if (hash === "#password" || hash.indexOf("#Email") !== -1) {
                for (var i = 0; i < currentElements.length; i++) {
                    var type = currentElements[i].type;
                    if (type === "password") {
                        PMP_CS.setAutoFillIcon(null, currentElements[i]);
                    }
                }
                settingIcon = "";
            }
        }, 1000);
    },
    detectInvalidForms: function (currentFormOrDocument, loginDetails) {
        var inputElements = new Array();
        inputElements = currentFormOrDocument.getElementsByTagName('input');
        var status = PMP_CS.isValidForm(inputElements);     //  To ckeck whether the input elements resemble a valid form
        var windowUrl = PMP_CS.getDomain(window.location.href);
        if (status === true) {
            PMP_CS.fillForm(inputElements,loginDetails, false);
        }
        else if (windowUrl === 'accounts.google.com' && window.location.hash === "#identifier") {// To support google's new login page
            PMP_CS.fillGoogleForm(inputElements,loginDetails, true);
        }
        else if (inputElements.length >= 2) {
            PMP_CS.irregularForms = true;
            PMP_CS.fillInvalidForms(inputElements);
        }
        else if (PMP_CS.isAutofillIconSet === false) {
            setTimeout(function () {                  //  This delay is to support iCloud site's autofill (load the form after displaying an animation)
                if (PMP_CS.autofillAttemptCount > 3) {            //  Executes this part 3 times with a delay to 3000 ms
                    PMP_CS.isAutofillIconSet = true;            //  To end the iteration
                }
                PMP_CS.autofillAttemptCount++;
                PMP_CS.detectInvalidForms(document,loginDetails);
            }, 3000);
        }
    },
    hasHarmfulContent: function (userInput) {
        var harmfulTags = /<|>/gi;
        var harmfulMatches = userInput.match(harmfulTags);
        return (harmfulMatches !== null) ? false : true;
    },
    reasonFailedMessage: function (message) {
        $('#PMP_TicketingAndReasonErrMsg').text(message);
        $('#PMP_TicketingAndReasonErrMsg').show();
        $('#PMP_TicketingAndReasonErrMsg').fadeIn();
        setTimeout(function () {
            $('#PMP_TicketingAndReasonErrMsg').fadeOut();
        }, 7000);
    },
    escapeQuotes: function (str) {
        var tagsToReplace = {
            '"': '&quot;',
            '\'': '&apos;',
            '\\': '\\',
            '/': '\/',
            '>': '&#62',
            '<': '&#60;'
        };
        return str.replace(/[<>"'\/\\]/g, function (tag) {
            return tagsToReplace[tag] || tag;
        });
    },
    detectForm: function (loginDetails = {'username' : '' ,'password' : ''}) {
        if(!loginDetails.username){
            loginDetails.username = '';
        }
        if(!loginDetails.password){
            loginDetails.password = '';
        }
        PMP_CS.formFilled = false;
        PMP_CS.isAutofillIconSet = false;
        PMP_CS.autofillAttemptCount = 0;
        var totalForms = document.forms.length;
        var firstPriorityForm = new Array();
        var secondPriorityForm = new Array();
        var thirdPriorityForm = new Array();
        var fourthPriorityForm = new Array();
        var i = 0, currentForm = '', submit = false;

        for (i = 0; i < totalForms; i++) {		//	Assigning priority to forms - i.e. Form classification

            
            currentForm = document.forms[i].elements;//elements;
            var status = PMP_CS.isValidForm(currentForm);
            if (status === true) {

                if (document.forms[i].offsetHeight === 0 || document.forms[i].offsetWidth === 0) {
                    fourthPriorityForm.push(currentForm);
                    continue;
                }

                var isValidForm = status;
                var count = PMP_CS.fieldsCount(currentForm, isValidForm);
                if (count.textField === 1 && count.pwdField === 1) {		//	First Priority Form
                    firstPriorityForm.push(currentForm);
                }
                else if (count.textField === 2 && count.pwdField === 1) {	//	Second Priority Form - case 2
                    secondPriorityForm.push(currentForm);
                }
                else if (count.textField >= 1 && count.pwdField >= 1) {	//	Third Priority Form
                    thirdPriorityForm.push(currentForm);
                }
            }
        }

        if (firstPriorityForm.length === 1) {			//	Auto Login only in this condition
            currentForm = firstPriorityForm[0];
            submit = true;
            PMP_CS.fillForm(currentForm,loginDetails, submit);
        }
        else if (firstPriorityForm.length > 1) {		//	Auto Fill without submitting the form in the remaining conditions
            for (i = 0; i < firstPriorityForm.length; i++) {
                currentForm = firstPriorityForm[i];
                PMP_CS.fillForm(currentForm,loginDetails, submit);
            }
        }

        else if (secondPriorityForm.length >= 1) {
            for (i = 0; i < secondPriorityForm.length; i++) {
                currentForm = secondPriorityForm[i];
                PMP_CS.fillForm(currentForm,loginDetails, submit);
            }
        }
        else if (thirdPriorityForm.length >= 1) {
            for (i = 0; i < thirdPriorityForm.length; i++) {
                currentForm = thirdPriorityForm[i];
                PMP_CS.fillForm(currentForm,loginDetails, submit);
            }
        }
        else if (fourthPriorityForm.length >= 1) {
            for (i = 0; i < fourthPriorityForm.length; i++) {
                currentForm = fourthPriorityForm[i];
                PMP_CS.fillForm(currentForm,loginDetails, submit);
            }
        }

        if (firstPriorityForm.length > 0 || secondPriorityForm.length > 0 || thirdPriorityForm.length > 0 || fourthPriorityForm.length > 0) {
            loginDetails.username = '';
            loginDetails.password = '';
        }
        //Can use this section to atleast place the autofill icon in input fields at sites where no high priority forms are present
        var allForms = document.forms;
        for (i = 0; i < allForms.length; i++) {
            PMP_CS.detectInvalidForms(allForms[i],loginDetails);
        }
        if (allForms.length === 0) {
            PMP_CS.detectInvalidForms(document,loginDetails);
        }

        if (PMP_CS.isAutofillIconSet === false) {
            PMP_CS.detectInvalidForms(document,loginDetails);
        }

        username = null;
        password = null;
    },
    setTOTPAccountDetails : function(loginDetails){
        let totpAccountDetails ={
            'isTOTPConfigured' : loginDetails.isTOTPConfigured,
            'accountId' : loginDetails.accountId,
            'isPersonal' : loginDetails.isPersonal
        }
        browser.storage.local.set({'totpAccountDetails':totpAccountDetails},()=>{});
    },
    trackSignInClick: function(event) {
        var target=event.srcElement;
        var elemType=target.type;
        var isSubmitButton = (elemType === 'submit') ? true : false;
        var txt=target.textContent.toString().toLowerCase();
        txt = txt.replace(/\s/g, '');
        var isSignInButton = ((txt === 'login') || (txt === 'submit') || (txt === 'signin') || (txt === 'logon')) ? true : false;
        if(isSignInButton || isSubmitButton){
            setTimeout(()=>{
                PMP_CS.fillTOTP().then((result)=>{
                    if(!result){
                        setTimeout(()=>{
                            PMP_CS.fillTOTP().then(()=>{});
                        },2000);
                    }
                })
            },1000);
        }
    },
    fillTOTP : async function(){
        let totpData = await browser.storage.local.get('totpAccountDetails');
        if(totpData.totpAccountDetails){
            let totpFillElem = totpAutofillUtils.getTOTPFillElement();
            if(totpFillElem){
                totpAutofillUtils.setTOTPIconStyle(totpFillElem);
                let totp = await browser.runtime.sendMessage({"action": 'getTOTP' , 'data':totpData.totpAccountDetails})
                PMP_CS.setValue(totpFillElem,totp);
                totpAutofillUtils.totpFormSubmit();
                await browser.storage.local.remove('totpAccountDetails');
                return true;
            }
        }
        return false;
    },
    autoFillTOTP : function(totp){
        PMP_CS.removePopupDiv();
        let totpFillElem = totpAutofillUtils.getTOTPFillElement();
        if(totpFillElem){
            PMP_CS.setValue(totpFillElem,totp);
            totpAutofillUtils.totpFormSubmit();
        }
    }
};

class SelectorUtil {
    static select(selector) {
        if (selector instanceof Node) {
            return selector;
        }
        return document.querySelector(selector);
    }
    static selectFrom(elem, selector) {
        const parent = this.select(elem);
        return parent.querySelector(selector);
    }
    static selectAll(parent, selector) {
        const parentElem = (parent && this.select(parent)) || document.documentElement;
        return Array.from(parentElem.querySelectorAll(selector));
    }
    static closest(elem, selector) {
        const domElem = this.select(elem);
        return domElem.closest(selector);
    }
}

class CSDomUtil{
    static hasAttributeRegex(elem, regEx) {
        try {
            const has_s = (text = "") => regEx.test(text.toLowerCase());
            for (let i = 0; i < elem.attributes.length; i++) {
                if (has_s(elem.attributes[i].name) || has_s(elem.attributes[i].value)) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    static isValid(input) {
        if (!(input instanceof HTMLInputElement)) {
            return false;
        }
        switch (input.type) {
            case "text":
                if (CSDomUtil.hasAttribute(input, "captcha") || CSDomUtil.hasAttribute(input, "search")) {
                    return false;
                }
            case "email":
            case "password":
                return true;
            default:
                return false;
        }
    }

    static hasAttribute(elem, s) {
        try {
            s = s.toLowerCase();
            const has_s = (text = "") => text.toLowerCase().includes(s);
            for (let i = 0; i < elem.attributes.length; i++) {
                if((elem.attributes[i].name=='style')){
                    continue;
                }
                if (has_s(elem.attributes[i].name) || has_s(elem.attributes[i].value)) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
}

class VisibilityChecker {
    static isVisible(elem) {
        try {
            const visible = this.isVisibleOffset(elem) && this.isVisibleZIndex(elem) && this.isNotHidden(elem);
            return visible;
        }
        catch (e) {
            return false;
        }
    }
    static isPresentInUI(elem) {
        try {
            return this.isVisibleOffset(elem) && this.isNotHidden(elem);
        }
        catch (e) {
            return false;
        }
    }
    static isVisibleOffset(elem) {
        const MIN_PX = 10;
        const isVisible = elem.offsetWidth >= MIN_PX && elem.offsetHeight >= MIN_PX;
        return isVisible;
    }
    static isVisibleZIndex(elem) {
        const rect = elem.getBoundingClientRect();
        if (!this.isVisibleScroll(elem)) {
            return false;
        }
        let left = Math.max(0, rect.left);
        let top = Math.max(0, rect.top);
        let right = Math.min(document.documentElement.clientWidth, rect.right);
        let bottom = Math.min(document.documentElement.clientHeight, rect.bottom);
        let x = (right + left) / 2;
        let y = (bottom + top) / 2;
        const elemAtXY = document.elementFromPoint(x, y);
        if (!elemAtXY) {
            return false;
        }
        if (elem.contains(elemAtXY) || elemAtXY.offsetWidth <= (elem.offsetWidth + 100)) {
            return true;
        }
        return false;
    }
    static isVisibleScroll(elem) {
        const rect = elem.getBoundingClientRect();
        if (rect.left > document.documentElement.clientWidth || rect.top > document.documentElement.clientHeight) {
            return false;
        }
        if (rect.right < 0 || rect.bottom < 0) {
            return false;
        }
        return true;
    }
    static isNotHidden(elem) {
        return (window.getComputedStyle(elem).visibility != "hidden") && (elem.style.opacity != "0");
    }

    hasAttribute(elem, s) {
        try {
            s = s.toLowerCase();
            const has_s = (text = "") => text.toLowerCase().includes(s);
            for (let i = 0; i < elem.attributes.length; i++) {
                if (has_s(elem.attributes[i].name) || has_s(elem.attributes[i].value)) {
                    return true;
                }
            }
            return false;
        }
        catch (e) {
            ZVError.error(e, arguments);
            return false;
        }
    }
}

var totpAutofillUtils = {
    getTOTPFillElement : function(){
        const validVisibleInputs = SelectorUtil.selectAll(document.body, "input")
                    .filter(totpAutofillUtils.isTotpInput, this);
        if (validVisibleInputs.length == 0) {
            return null;
        }
        return validVisibleInputs[0];
    },
    isTotpInput(input) {
        try {
            if (!input) {
                return false;
            }
            const isVisible = VisibilityChecker.isVisible(input);
            if (!isVisible) {
                return false;
            }
            const isValidType = (CSDomUtil.isValid(input) || ["number", "tel"].includes(input.type));
            if (!isValidType) {
                return false;
            }
            const invalidCodeRegex = /(?:zip.*code)|(?:country.*code)/i;
            if (CSDomUtil.hasAttributeRegex(input, invalidCodeRegex)) {
                return false;
            }
            const totpRegex = /(?:t?otp)|(?:(?:c|k)ode)|(?:mfa)|(?:token)|(?:verification)|(?:digit)|(?:2fact)|(?:one-time-code)/i;
            const hasTotpRegex = CSDomUtil.hasAttributeRegex(input, totpRegex);
            if (!hasTotpRegex) {
                return false;
            }
            return true;
        }
        catch (e) {
            return false;
        }
    },
    setTOTPIconStyle: function (element) {
		PMP_CS.isTOTPAutofillView = true;
        element.style.backgroundImage = "url('" + chrome.runtime.getURL("images/pmp_16x16.png") + "')";
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "99% center";
        element.style.backgroundSize = "16px";
        totpAutofillUtils.mouseHoverEvent(element);
        element.addEventListener("click", totpAutofillUtils.mouseClickEvent, false);
    },
    mouseHoverEvent: function (element) {
        var cusrsor = element.style.cursor;
        element.addEventListener("mousemove", function (event) {
			var boundary = this.getBoundingClientRect();
			var textareawidth = boundary.left + boundary.width - 20;
			var x = event.clientX;
			if (x > textareawidth) {
				this.style.cursor = "pointer";
			} else {
				this.style.cursor = cusrsor;
			}
        }, false);
    },
    mouseClickEvent: async function (event) {
        var boundary = this.getBoundingClientRect();
        var textareawidth = boundary.left + boundary.width - 20;
        var x = event.clientX;
        if (x > textareawidth) {
            var scrollX = window.scrollX;
            var scrollY = window.scrollY;
            PMP_CS.top = boundary.top + scrollY;
            PMP_CS.left = boundary.left + scrollX;
			if(boundary.width>250){
				PMP_CS.width = boundary.width;
			}
            PMP_CS.height = boundary.height;
            PMP_CS.createAutoFillIframe(true);
        }
        event.stopPropagation();
    },
	totpFormSubmit: async function () {
        var isTOTPAutoLoginSubmit = await browser.storage.local.get('isTOTPAutoLoginSubmit');
        if (PMP_CS.enableAutoFillSubmit|| isTOTPAutoLoginSubmit.isTOTPAutoLoginSubmit) {
            await browser.storage.local.remove('isTOTPAutoLoginSubmit');
            let selectorList = [
                "*[type='submit']",
                "button",
                "*[type='button']"
            ];
            let nextRegExp = /(?:next)|(?:continue)|(?:sign.?in)|(?:log.?in)|(?:log.?on)|(?:submit)|(?:confirm)/i;
			let allInputElements = document.querySelectorAll(selectorList);
            for (var x = 0; x < allInputElements.length; x++) {
                var CFtype = allInputElements[x].type;
                var CFval = (allInputElements[x].textContent).toString().toLowerCase();
                CFval = CFval.replace(/\s/g, '');		//	To remove the spaces within the strings
                var isSubmitButton = (CFtype === 'submit') ? true : false;
                var isSignInButton;
                if(nextRegExp.test(CFval)){
                    isSignInButton = true;
                }				
                var isVisible = VisibilityChecker.isVisible(allInputElements[x])
               	if (isVisible && (isSubmitButton || isSignInButton)) {
					setTimeout(()=>{allInputElements[x].click();},1000);
                    break;
				}
            }
        }
    },
}

PMP_CS.init().then(()=>{});

})();
