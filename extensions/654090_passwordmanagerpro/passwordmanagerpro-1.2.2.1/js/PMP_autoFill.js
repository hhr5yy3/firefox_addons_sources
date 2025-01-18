//$Id$
(function(){
    var PMP_autoFill = {       
        reasonAndTicketCheck: false,
        BUILDNUMBER: null,
        ISPERSONALTABENABLED: null,
        isResourcePersonalTabClick: false,
        ticketId : '',
        reason : '',
        check : false,
        ticketRequiredMandatory : '',
        ticketRequired : '',
        reasonRequired : '',
        isPasswordAccessDenied:'',
        windowUrl:'',
        isTOTPAutofillView : false,

        init :function(){
            var urlParams = new URLSearchParams(window.location.search);
            var isTOTPView = urlParams.get('isTOTPView');
            if(isTOTPView === 'true'){
                PMP_autoFill.isTOTPAutofillView = true;
            }
            browser.runtime.sendMessage({
                "action": "setWindowUrl",
                "data": null 
            }, function(response){
				PMP_autoFill.updateData();
            });
        },

        updateData: function()  {
			
			browser.runtime.sendMessage({
                "action": "getWindowUrl",
                "data": null 
            }, function(response){
				PMP_autoFill.BUILDNUMBER= response.BUILDNUMBER;
				PMP_autoFill.ISPERSONALTABENABLED= response.ISPERSONALTABENABLED;
				PMP_autoFill.windowUrl=response.windowUrl;
				PMP_autoFill.getDataForAutoFill("getResourceAccountList");
            }) ;
        },      
        
        trimDisplay: function (text, length) {
            if (text.length > length) {
                text = text.substring(0, length) + "...";
                return text;
            }
            return text;
        },

        getDataForAutoFill: function (operationName) {
            PMP_autoFill.displayLoadingPopupDiv();
				
            var dataJson = {
                'windowUrl': PMP_autoFill.windowUrl,
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
                    PMP_autoFill.reasonAndTicketCheck = response.reasonAndTicketCheck;
                    PMP_autoFill.ticketRequiredMandatory= response.ticketRequiredMandatory;
                    PMP_autoFill.ticketRequired= response.ticketRequired;
                    PMP_autoFill.reasonRequired= response.reasonRequired;
                    if (PMP_autoFill.reasonAndTicketCheck === true && operationName === 'getResourceAccountList') {
                        displayArray = response.dataResource;
                    }
                    
                    if (operationName === 'getResourceAccountList') {
                        displayArray = response.dataResource;
                        if(PMP_autoFill.isTOTPAutofillView){
                            displayArray =displayArray.filter(acc=>acc.isTOTPConfigured==='true');
                        }
                        if(displayArray.length===0){
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
                            return false;
                        }
                    }
                    else if (operationName === 'getPersonalAccountList') {
                        if (response.dataPersonal === "PASSPHRASE_NOT_SET") {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("configure_personal_password_web_client"), operationName);
                            return false;
                        } else if (response.dataPersonal === "PASSPHRASE_STATUS_FAILURE") {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("personal_passwords_disabled_for_usage"), operationName);
                            return false;
                        } else if (response.dataPersonal === "PERSONAL_ORG_CHANGED"){
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("personal_password_organization_specific_autofill"), operationName);
                            return false;
                        } else if(response.dataPersonal === "PASSPHRASE_NEED"){
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("login_personal_tab_in_addon"), operationName);
                            return false;
                        }
                        else if (response.dataPersonal.length === 0) {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
                            return false;
                        }
                        displayArray = response.dataPersonal;
                        if(PMP_autoFill.isTOTPAutofillView){
                            displayArray =displayArray.filter(acc=>acc.isTOTPConfigured==='true');
                        }
                    }
                    PMP_autoFill.listMatchingAccounts(displayArray, operationName);
                } else {
                    var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
                    PMP_loginPopupDiv.removeChild(document.getElementById('PMP_loginPopupLoading'));
                    var PMP_errorMessagePopup = '';
    
                    if (response.dataResource === 'session timeout') {
						var data={
							'action':'max-height',
							'height':'50px'
						}
					
			
						browser.runtime.sendMessage({
							"action": "setIframeDimensions",
							"data": data 
						}
						);
						
                       $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("login_to_your_account")));
                     
                    }
                    else if (response.dataResource === 'server not reachable') {
						var data={
							'action':'max-height',
							'height':'50px'
						}
					
			
						browser.runtime.sendMessage({
							"action": "setIframeDimensions",
							"data": data 
						}
						);
                       $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("server_not_reachable")));
                    }
                    else if( response.isAPIFailure === true ){
                        PMP_autoFill.noPasswordsFoundErrorMsg(response.dataResource, operationName);
                    }
                    else if( operationName === 'getResourceAccountList' ){
                        if (response.dataResource.length === 0) {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
                        }
                    }
                    else if (operationName === "getPersonalAccountList") {
                        if (response.dataPersonal === "PASSPHRASE_NOT_SET") {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("configure_personal_password_web_client"), operationName);
                        } else if (response.dataPersonal === "PASSPHRASE_STATUS_FAILURE") {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("personal_passwords_disabled_for_usage"), operationName);
                        } else if (response.dataPersonal === "PERSONAL_ORG_CHANGED"){
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("personal_password_organization_specific_autofill"), operationName);
                        }
                        else if (response.dataPersonal.length === 0) {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("no_matching_passwords"), operationName);
                        }
                        else {
                            PMP_autoFill.noPasswordsFoundErrorMsg(browser.i18n.getMessage("login_personal_tab_in_addon"), operationName);
                        }
                    }
                    else {
						var data={
							'action':'max-height',
							'height':'50px'
						}
					
			
						browser.runtime.sendMessage({
							"action": "setIframeDimensions",
							"data": data 
						}
						);
                        $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("error_while_fetching_resources")));
                    }
                }
            }
            });
        },

        noPasswordsFoundErrorMsg: function (errMsg, operationName) {
       
		data={
				'action':'max-height',
				'height':'100px'
			}
		browser.runtime.sendMessage({
			"action": "setIframeDimensions",
			"data": data 
		}
		);
        var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
        var PMP_resourcePersonalSelect = document.getElementById("PMP_resourcePersonalSelect");
        var isAutoFillTabSelectionDiv = PMP_autoFill.ISPERSONALTABENABLED === "true" && PMP_resourcePersonalSelect === null;
        if (isAutoFillTabSelectionDiv === true) {
            PMP_autoFill.getAutoFillTabSelectionDiv(operationName);
        }
        $("#PMP_loginPopupDiv").append($("<div>",{id:"PMP_errorMessagePopup"}).text(errMsg));
        if (isAutoFillTabSelectionDiv === true) {
            PMP_autoFill.resourcePersonalDivClick();
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
            var isPersonalTabEnabled = PMP_autoFill.BUILDNUMBER >= 8402 && PMP_autoFill.ISPERSONALTABENABLED === "true";
            if (isPersonalTabEnabled === true) {
                PMP_autoFill.getAutoFillTabSelectionDiv(operationName);
            
            }
            $("#PMP_loginPopupDiv").append( $("<div>", { id: "PMP_errorMessagePopup" }).text( browser.i18n.getMessage("disable_reason_and_ticket")));
            
            if (isPersonalTabEnabled === true) {
                PMP_autoFill.resourcePersonalDivClick();
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
        },

        listMatchingAccounts: function (displayArray, operationName) {
			var data=null;
			if(displayArray.length === 1) {
				data={
						'action':'max-height',
						'height':'100px'
					}	
			} else if(displayArray.length ===2 ){
				data={
					'action':'max-height',
					'height':'200px'
				}
			} else if(displayArray.length ===3 ){
				data={
					'action':'min-height',
					'height':'200px'
				}
			}else if(displayArray.length ===4 ){
				data={
					'action':'min-height',
					'height':'260px'
				}
			} else {
				data={
					'action':'min-height',
					'height':'300px'
				}
			}
			
			browser.runtime.sendMessage({
                "action": "setIframeDimensions",
                "data": data 
			}
            );
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
					loginDivLI.setAttribute("isPasswordAccessDenied",data.isPasswordAccessDenied);
                    loginDivLI.setAttribute('accountId',data.accountId);
				}
				else if (operationName === 'getPersonalAccountList') {
					displayHeaderName = data.serviceName;
					displayAccountName = data.loginName;
					loginDivLI.setAttribute('accountName',displayAccountName);
					loginDivLI.setAttribute('categoryId',data.categoryId);
					loginDivLI.setAttribute('accountId',data.accountId);
                                        loginDivLI.setAttribute("isPasswordAccessDenied",data.isPasswordAccessDenied);
				}
				loginDivLI.setAttribute('operationName',operationName);
                loginDivLI.setAttribute("isTOTPConfigured",data.isTOTPConfigured);
			  
			   var resHeaderName= document.createElement("div");
			   resHeaderName.setAttribute("class","PMP_resourceName");
			   var reshntext=document.createTextNode(PMP_autoFill.trimDisplay(displayHeaderName, 35));
			   resHeaderName.appendChild(reshntext);
			   loginDivLI.appendChild(resHeaderName);
			   var accHeaderName= document.createElement("div");
			   accHeaderName.setAttribute("class","PMP_accountName");
			   var acchntext=document.createTextNode(PMP_autoFill.trimDisplay(displayAccountName, 35));
			   accHeaderName.appendChild(acchntext);
			   loginDivLI.appendChild(accHeaderName);
			  loginDivUL.appendChild(loginDivLI);
			}

			var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
			if (PMP_loginPopupDiv !== null) {
				PMP_loginPopupDiv.removeChild(document.getElementById('PMP_loginPopupLoading'));
				if (PMP_autoFill.ISPERSONALTABENABLED === "true") {
				  
					PMP_autoFill.getAutoFillTabSelectionDiv(operationName);
				   
				}
				PMP_loginPopupDiv.append(loginDivUL);
				$("#PMP_loginPopupDiv").show();
			   
				if (PMP_autoFill.ISPERSONALTABENABLED === "true") {
					PMP_autoFill.resourcePersonalDivClick();
				}
			}

			PMP_autoFill.accountClick();

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
                    let loginDetails = {};
                    loginDetails.accountName = clickedTarget.getAttribute('accountName');
                    loginDetails.operationName = operationName;
                    if (operationName === 'getResourceAccountList') {
                        id = clickedTarget.getAttribute('passwdId');
                        loginDetails.passwordId = clickedTarget.getAttribute('passwdId');
                        loginDetails.accountId = clickedTarget.getAttribute('accountId');
                        loginDetails.isTOTPConfigured = clickedTarget.getAttribute('isTOTPConfigured');
                        PMP_autoFill.isPasswordAccessDenied = clickedTarget.getAttribute('isPasswordAccessDenied');
                    }
                    else if (operationName === 'getPersonalAccountList') {
                        id = clickedTarget.getAttribute('accountId');
                        categoryId = clickedTarget.getAttribute('categoryId');
                        loginDetails.categoryId = clickedTarget.getAttribute('categoryId');
                        loginDetails.accountId = clickedTarget.getAttribute('accountId');
                        loginDetails.isTOTPConfigured = clickedTarget.getAttribute('isTOTPConfigured');
                        loginDetails.isPersonal = true;
                        PMP_autoFill.isPasswordAccessDenied = clickedTarget.getAttribute('isPasswordAccessDenied');
                    }
                    if(PMP_autoFill.isTOTPAutofillView){
                        PMP_autoFill.getTOTPForAutofill(loginDetails);
                        return;
                    }
                    if((PMP_autoFill.reasonAndTicketCheck === true || PMP_autoFill.ticketRequired==='true' || PMP_autoFill.reasonRequired==='true') && operationName === 'getResourceAccountList')
                    {
                        PMP_autoFill.getReasonAndTicketId();
                        PMP_autoFill.reasonAndTicketIdClick(loginDetails);
                    } 
                    else
                    {
                        PMP_autoFill.check = true;
                        PMP_autoFill.getPasswordForAutoFill(loginDetails);
                    }
                }
                e.stopPropagation(); 
            }, false);
        },
         getReasonAndTicketId : function() {
			 
			var data={
					'action':'max-height',
					'height':'200px'
				}
			
			
			browser.runtime.sendMessage({
				"action": "setIframeDimensions",
				"data": data 
			}
			);
         var PMP_loginPopupDiv = document.getElementById('PMP_loginPopupDiv');
         $('#PMP_loginPopupDivUL').hide();
            var errMsgField=document.createElement('div');
            errMsgField.setAttribute("id","errMsgField");
            var errSpan = document.createElement("span");
            errSpan.setAttribute("id","PMP_TicketingAndReasonErrMsg");
            errMsgField.append(errSpan);
            
            var createTable = document.createElement("table");
            createTable.setAttribute("id","ticketAndReason");
                  
           if(PMP_autoFill.ticketRequired==='true')
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
        reasonAndTicketIdClick: function(loginDetails){
            $('#PMP_loginPopupDiv').find('#proceed').click( function (e) {
                PMP_autoFill.check = true;
                var ticketId='';
                var ticketIdCheck = true;
                var reason = document.getElementById('reason').value;
                if(PMP_autoFill.ticketRequired==='true')
                {
                    ticketId = document.getElementById('ticketId').value;
                    ticketIdCheck = PMP_autoFill.hasHarmfulContent(ticketId);
                }
                
                var requestCheck = PMP_autoFill.hasHarmfulContent(reason);
                if ((PMP_autoFill.ticketRequired==='true' && ticketIdCheck === false) || requestCheck === false) {
                    var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                    PMP_autoFill.reasonFailedMessage(harmfulContent);
                    PMP_autoFill.check = false;
                    return false;
                }
                reason = PMP_autoFill.escapeQuotes(PMP_autoFill.htmlEncode(reason));
                reason = encodeURIComponent(reason);
    
                if(PMP_autoFill.ticketRequired==='true')
                {
                    ticketIdCheck = PMP_autoFill.isTicketIdValid(ticketId);
                }
                if (PMP_autoFill.ticketRequired === 'true' || ticketIdCheck !== true) {
                    ticketId = encodeURIComponent(ticketId);
                    if ((ticketId === "" && PMP_autoFill.ticketRequiredMandatory === 'true') || ticketIdCheck !== true) {
                        var enterTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                        PMP_autoFill.reasonFailedMessage(enterTcktId);
                        $('#ticketId').find('input').focus();
                        PMP_autoFill.check = false;
                        return false;
                    }
                }
                if (PMP_autoFill.reasonRequired === 'true' && reason === "") {
                    var enterReason = browser.i18n.getMessage("enter_reason_to_proceed");
                    PMP_autoFill.reasonFailedMessage(enterReason);
                    $('#reason').focus();
                    PMP_autoFill.check = false;
                    return false;
                }
                PMP_autoFill.ticketId = ticketId;
                PMP_autoFill.reason = reason;
                $('#PMP_TicketingAndReasonErrMsg').hide();                
                $('#reason').val('');
                $('#ticketId').find('input').val('');
                PMP_autoFill.getPasswordForAutoFill(loginDetails);
            });   
            PMP_autoFill.check = false;
            $('#PMP_loginPopupDiv').find('#cancel').click( function (e) {
                $('#PMP_TicketingAndReasonErrMsg').hide();
                $('#reason').val('');
                $('#ticketId').find('input').val('');
                PMP_autoFill.removeAutoFillFrame();
                e.stopPropagation();
            });
        },
        getPasswordForAutoFill : function(loginDetails){
            if(PMP_autoFill.check === true){
                loginDetails.ticketId = PMP_autoFill.ticketId;
                loginDetails.reason = PMP_autoFill.reason;
             browser.runtime.sendMessage({
                 "action": "getPasswordForAutoFill",
                 "data": loginDetails
             }, function (response) {
                 if (response.status === true) {
                     var ticketIdRequired='TICKET ID REQUIRED';
                     var ticketIdCorrectRequired='TICKET ID CORRECT REQUIRED';
                     var password = response.data;
                     if(password === ticketIdRequired || password === ticketIdCorrectRequired)
                        {
                            var enterTcktId = browser.i18n.getMessage("ticketid_incorrect_or_invalid");
                            PMP_autoFill.reasonFailedMessage(enterTcktId);
                            return false;
                        }
                    
                    loginDetails.username=loginDetails.accountName;
                    loginDetails.password=password;
                    loginDetails.isPasswordAccessDenied = PMP_autoFill.isPasswordAccessDenied;
                    browser.runtime.sendMessage({
                        "action": "autoFillPassword",
                        "data": loginDetails
                    });
                    
                 }else {
                         var enterTcktId = browser.i18n.getMessage("ticketid_incorrect_or_invalid");
                         PMP_autoFill.reasonFailedMessage(enterTcktId);
                 }
             });
             }
        },

        resourcePersonalDivClick: function () {
            $('#PMP_loginPopupDiv').find('#PMP_resourceButton').unbind('click');
            $('#PMP_loginPopupDiv').find('#PMP_resourceButton').click(function (e) {
                $('#PMP_loginPopupDiv').find('#PMP_personalButton').removeClass('PMP_selectedTab');
                $('#PMP_loginPopupDiv').find('#PMP_resourceButton').addClass('PMP_selectedTab');
                PMP_autoFill.onResourcePersonalTabSelect('getResourceAccountList');
                e.stopPropagation();
            });
    
            $('#PMP_loginPopupDiv').find('#PMP_personalButton').unbind('click');
            $('#PMP_loginPopupDiv').find('#PMP_personalButton').click(function (e) {
                $('#PMP_loginPopupDiv').find('#PMP_resourceButton').removeClass('PMP_selectedTab');
                $('#PMP_loginPopupDiv').find('#PMP_personalButton').addClass('PMP_selectedTab');
                PMP_autoFill.onResourcePersonalTabSelect('getPersonalAccountList');
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
            PMP_autoFill.isResourcePersonalTabClick = true;
            PMP_autoFill.getDataForAutoFill(operationName);
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

        removeAutoFillFrame : function(){
			browser.runtime.sendMessage({
                    "action": "removeAutoFillFrame",
					"data":null
                });
        },
        getTOTPForAutofill(loginDetails){
            browser.runtime.sendMessage({
                "action": "autoFillTOTP",
                "data": loginDetails
            });
        }
         
    };

    PMP_autoFill.init();
    
    })();
