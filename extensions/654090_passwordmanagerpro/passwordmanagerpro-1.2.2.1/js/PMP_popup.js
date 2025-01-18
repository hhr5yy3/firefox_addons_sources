//$Id$
(function ()
{
    var popupUtils = {
        getAuthMode: function (serverName) {
            var mspUrl = 'https://' + serverName + '/api/json/request?OPERATION_NAME=GET_AUTHENTICATION_MODE';
            var pmp_header = {'clientType': 12,'requestFrom': 'pmpmobilenative'};
            if (PMP_popup.orgName !== "") {
                pmp_header.orgName = PMP_popup.orgName;
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: mspUrl, headers: pmp_header, async: true, dataType: "json",
                beforeSend: function () {
                    $('#serverDetailSaveLoading').show();
                }, error: function (jqxhr, textStatus, errorThrown) {
                    PMP_popup.orgName = PMP_popup.globalOrgName;
                    $('.PMP_Banner').show();
                    popupUtils.destroyData();
                    browser.runtime.sendMessage({//	sends message to background
                        'action': 'clearAuthToken',
                        'data': null
                    });
                    serverName = decodeURIComponent(serverName);
                    PMP_Utils.serverDetailErrorMessage(serverName);
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchServerDetailsFail");
                }
            }).done(function (data) {
                $('#serverDetailSaveLoading').hide();
                setTimeout(function () {
                    $('#serverDetailLoading').hide();
                }, 0);
                PMP_popup.serverDetailsCheck(data, serverName);
            });
        },
        isSecondFactorEnabledForUser: function (username) {       //  Don't use orgName header here
            username=encodeURIComponent(username);
            var SECONDFACTOR = PMP_popup.SECONDFACTOR;
            var SFAurl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_SECONDAUTHENTICATION_STATUS&USERNAME=' + username + '&SECONDFACTOR=' + SECONDFACTOR;
            return $.ajax({type: 'POST', url: SFAurl, headers: {'orgName': PMP_popup.orgName, 'ClientType': 12,'requestFrom': 'pmpmobilenative'}, async: false,
                beforeSend: function () {
                    $('#signInLoading').show();
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchLoginFail");
                }}).responseText;
        },
        noSecondAuthMode: function (username, password) {       //  Don't use orgName header here - Use DOMAINNAME , FIRSTAUTHMODE
            var firstFactor = PMP_popup.FIRSTFACTOR;
            var domainName = PMP_popup.DOMAINNAME;
            if (domainName === 'LOCAL') {
                firstFactor = 'LOCAL';
            }
            var authURL = 'https://' + PMP_popup.serverName + '/api/json/auth';

            var headers = new Headers({
                'orgName': PMP_popup.orgName,
                'ClientType': PMP_popup.clientType,
                'requestFrom': PMP_popup.requestFrom
            });
            var params = new URLSearchParams();
            params.append('USERNAME', username);
            params.append('PASSWORD', password);
            params.append('FIRSTAUTHMODE', firstFactor);
            params.append('DOMAINNAME', domainName);
            var requestOptions = {
                method: 'POST',
                headers: headers,
                body: params
            };
            if (PMP_popup.ISSECONDFACTORENABLED === "TRUE") {
                $('#tfaSignInLoading').show();
            } else {
                $('#signInLoading').show();
            }
            fetch(authURL, requestOptions)
                .then(function(response) {
                    if(response.status < 400){
                        PMP_popup.SESSIONID =  response.headers.get('SESSIONID');
                    }else{
                        popupUtils.serverNotReachableMessage(response, "fetchLoginFail");
                    }
                    return response.json();
                })
                .then(data => {
                    if (PMP_popup.ISSECONDFACTORENABLED === "TRUE") {
                        $('#tfaSignInLoading').hide();
                    } else {
                        $('#signInLoading').hide();
                    }
                    PMP_popup.getAuthTokenSuccess(data);
                })
                .catch(error => {
                    popupUtils.serverNotReachable("fetchLoginFail");
                })
        },
        withSecondAuthMode: function (password, tfaOTP) {
            var username = PMP_popup.username;
            var firstFactor = PMP_popup.FIRSTFACTOR;
            var domainName = PMP_popup.DOMAINNAME;
            var secondFactor = PMP_popup.SECONDFACTOR;

            if (domainName === 'LOCAL') {
                firstFactor = 'LOCAL';
            }

            var param = new URLSearchParams();
            param.append('USERNAME', username);
            param.append('PASSWORD', password);
            param.append('FIRSTAUTHMODE', firstFactor);
            param.append('DOMAINNAME', domainName);
            param.append('SECONDAUTHMODE', secondFactor);
            param.append('SECONDPASSWORD', tfaOTP);


            var authUrl = 'https://' + PMP_popup.serverName + '/api/json/auth';
            $('#tfaSignInLoading').show();
            fetch(authUrl, {
                method: 'POST',
                headers: {
                    'orgName': PMP_popup.orgName,
                    'ClientType': PMP_popup.clientType,
                    'requestFrom': PMP_popup.requestFrom
                },
                body: param
            }).then(function(response) {
                if(response.status < 400){
                    PMP_popup.SESSIONID = response.headers.get('SESSIONID');
                }else{
                    popupUtils.serverNotReachableMessage(response, "fetchLoginFail");
                }
                return response.json();
            })
            .then(function(data) {
                $('#tfaSignInLoading').hide();
                PMP_popup.getAuthTokenSuccess(data);
            })
            .catch(function(error) {
                popupUtils.serverNotReachable("fetchLoginFail");
            });

        },
        firstAuthMode: function (username, password, captchatext) {       //  Don't use orgName header here - Use DOMAINNAME , FIRSTAUTHMODE
            var firstFactor = PMP_popup.FIRSTFACTOR;
            var domainName = PMP_popup.DOMAINNAME;
            if (domainName === 'LOCAL') {
                firstFactor = 'LOCAL';
            }
            var authURL;
            var param = new URLSearchParams();
            param.append('USERNAME', username);
            param.append('PASSWORD', password);
            param.append('FIRSTAUTHMODE', firstFactor);
            param.append('DOMAINNAME', domainName);
            authURL = 'https://' + PMP_popup.serverName + '/api/json/firstauth';    

            if (PMP_popup.BUILDNUMBER >= 10102) {
                param.append('hidCaptchaID', PMP_popup.CAPTCHAID);
                param.append('inCaptchaChars', captchatext);
            }

            $('#signInLoading').show();
            fetch(authURL, {
                method: 'POST',
                headers: {
                    'orgName': PMP_popup.orgName,
                    'ClientType': PMP_popup.clientType,
                    'requestFrom': PMP_popup.requestFrom
                },
                body: param
            }).then(function(response) {
                if(response.status < 400){
                    PMP_popup.SESSIONID = response.headers.get('SESSIONID') ;
                }else{
                    popupUtils.serverNotReachableMessage(response, "fetchLoginFail");
                }
                return response.json();
            })
            .then(function(data) {
                PMP_popup.firstAuthModeSuccess(data);
                $('#signInLoading').hide();
            })
            .catch(function(error) {
                popupUtils.serverNotReachable("fetchLoginFail");
            })
        },
        secondAuthMode: function (tfaOTP) {
            var username = PMP_popup.loginName;
            var secondFactor = PMP_popup.SECONDFACTOR;
            var authUrl = 'https://' + PMP_popup.serverName + '/api/json/secondauth';

            var param = new URLSearchParams();
            param.append('USERNAME', username);
            param.append('SECONDAUTHMODE', secondFactor);
            param.append('SECONDPASSWORD', tfaOTP);
            param.append('FIRSTFACTORSECRETKEY', PMP_popup.firstFactorSecretKey);

            $('#tfaSignInLoading').show();
            fetch(authUrl, {
                method: 'POST',
                headers: {
                    'orgName': PMP_popup.orgName,
                    'ClientType': PMP_popup.clientType,
                    'requestFrom': PMP_popup.requestFrom
                },
                body: param
            }).then(response => {
                    if(response.status < 400){
                        PMP_popup.SESSIONID = response.headers.get('SESSIONID');
                    }else{
                        popupUtils.serverNotReachableMessage(response, "fetchLoginFail");
                    }
                    return response.json();
                })
                .then(data => {
                    $('#tfaSignInLoading').hide();
                    PMP_popup.secondAuthModeSuccess(data);
                })
                .catch(error => {
                    popupUtils.serverNotReachable("fetchTfaLoginFail");
                });
        },
        getResources: function (startIndex) {
        	 if(PMP_popup.BUILDNUMBER<10102){
                 var resources = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_RESOURCES';    
             }
        	 else {
        		 var resources = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_RESOURCES';
        	 }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"LIMIT":"' + PMP_popup.LIMIT + '","VIEWTYPE":"' + PMP_popup.resourceViewType + '","STARTINDEX":"' + startIndex + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: resources, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID,'Content-Type':'application/x-www-form-urlencoded'}, async: true, dataType: "json",
                beforeSend: function () {
                    PMP_popup.isSearchQuery = false;
                    if (startIndex > 0) {         //  This case is when additional resources are loaded on scroll
                        $('#loadDuringListing').show();
                    } else {
                        $('#resourceDataDiv').hide();
                        $('#resourceLoading').show();
                    }
                }, error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (startIndex > 0) {
                    $('#loadDuringListing').hide();
                    PMP_popup.resourceDisplay(data, "subsequentBatchFetch");
                } else {
                    $('#resourceLoading').hide();
                    PMP_popup.resourceDisplay(data, "firstBatchFetch");
                }

            });
        },
        getResourceAccounts: function (resourceId) {

       	 if(PMP_popup.BUILDNUMBER<10102){
             var accListURL = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_RESOURCEACCOUNTLIST';
       	 }else {
             var accListURL = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_RESOURCEACCOUNTLIST';
       	 }
            var input_data= 'INPUT_DATA={"operation":{"Details":{';
            if (PMP_popup.isSearchQuery === true) {
                input_data += '"SEARCHVALUE":"' + PMP_popup.searchValue + '",';
                input_data += '"SEARCHTYPE":"' + PMP_popup.SEARCHTYPE + '",';
                input_data += '"SEARCHCOLUMN":"' + PMP_popup.SEARCHCOLUMN + '",';
            }
            if (PMP_popup.selectedTab === 'resourceGroups') {
                var length = PMP_popup.resourceGroupStack.length;
                var groupId = PMP_popup.resourceGroupStack[length - 1];
                input_data += '"GROUPID":"' + groupId + '",';
            }
            input_data += '"LIMIT":"' + PMP_popup.LIMIT + '",';
            input_data += '"STARTINDEX":"' + PMP_popup.accountStartIndex + '", "RESOURCEID":"' + resourceId + '","VIEWTYPE":"' + PMP_popup.resourceViewType + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: accListURL, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    if (PMP_popup.accountStartIndex > 0) {         //  This case is when additional resources are loaded on scroll
                        $('#loadDuringListing').show();
                    } else {
                        $('#resourceDataDiv').hide();
                        $('#accountList').fadeIn();
                        $('#accountListHeader').fadeIn();
                        $('#accountList').empty();
                        $('#accountListHeader').empty();
                        $('#loadDuringListing').hide();
                        $('#resourceLoading').show();
                    }
                }, error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (PMP_popup.accountStartIndex > 0) {
                    $('#loadDuringListing').hide();
                    PMP_popup.accountListDisplay(data, "");
                } else {
                    $('#resourceLoading').hide();
                    PMP_popup.accountListDisplay(data, resourceId);
                }
            });
        },
        getPasswordDetails: function (autoLoginData, reason, ticketId) {

            var passwordReason = '';
            if (autoLoginData.isReasonRequired === 'true') {
                passwordReason = reason;
            }
          	 if(PMP_popup.BUILDNUMBER<10102){
            var pwdURL = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_PASSWORD';
          	 } else {
            var pwdURL = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_PASSWORD';
          	 }



var input_data = 'INPUT_DATA={"operation":{"Details":{"PASSWDID":"' + autoLoginData.passwdId + '","REASON":"' + passwordReason + '","TICKETID":"' + ticketId + '"}}}';

            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: pwdURL, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }
            }).done(function (response) {
                PMP_popup.performAutoLogin(autoLoginData, response);
            });
        },
        getAccountDetails: function (resourceId, accountId) {
         	 if(PMP_popup.BUILDNUMBER<10102){
                 var accUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_ACCOUNTATTRIBUTES';
         	 } else {
            var accUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_ACCOUNTATTRIBUTES';
         	 }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"ACCOUNTID":"' + accountId + '","RESOURCEID":"' + resourceId + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: accUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    $('#resourceLoading').show();
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    $('#resourceLoading').hide();
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }
            }).done(function (data) {
                $('#resourceLoading').hide();
                PMP_popup.displayAccountDetails(data, resourceId, accountId);
            });
        },
        checkPersonalPassPhrase: function () {
            browser.runtime.sendMessage({//	sends Message to Background
                'action': 'checkPersonalPassPhrase',
                'data': null
            }, function (response) {
                if (response.isValid === true)
                {
                    PMP_popup.passPhraseStatus = response.passPhraseStatus;
                    PMP_popup.personalPassPhrase = response.personalPassPhrase;
                    var isTabReset = true;
                    popupUtils.getPersonalCategoryList(isTabReset);
                } else
                {
                if(PMP_popup.BUILDNUMBER<10102){
                    var passphraseStatusUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal?AUTHTOKEN=' + PMP_popup.authToken;
                }else{
                    var passphraseStatusUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal';
		}                    
PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: passphraseStatusUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                        beforeSend: function () {
                            $('#resourceLoading').show();
                        }, error: function (jqxhr, textStatus, errorThrown) {
                            $('#resourceLoading').hide();
                            popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                        }
                    }).done(function (data) {
                        PMP_popup.getPersonalPassPhrase(data);
                    });
                }
            });

        },
        validatePassPhrase: function (passPhrase, captchaText) {
            if(PMP_popup.BUILDNUMBER<10102){
            	var validatePassPhraseUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/passphrasecheck?AUTHTOKEN=' + PMP_popup.authToken;
            } else {
            	var validatePassPhraseUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/passphrasecheck?hidCaptchaID=' + PMP_popup.CAPTCHAID + '&inCaptchaChars=' + captchaText;
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: validatePassPhraseUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'PASSPHRASE': passPhrase, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    $('#personalProceedLoading').show();
                }, error: function (jqxhr, textStatus, errorThrown) {
                    $('#personalProceedLoading').hide();
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
				 PMP_popup.SHOWCAPTCHA = false;
                    PMP_popup.CAPTCHAID = null;
                if (popupUtils.checkStatus(data) === true)
                {
                    PMP_popup.personalPassPhrase = passPhrase;
                    PMP_popup.setPersonalPassPhrase();
                } else
                {
                    $('#personalProceedLoading').hide();
                    var message = browser.i18n.getMessage("decrypt_failed_verify_key");
                    PMP_Utils.reasonFailedMessage(message);
                    if(data.operation.hasOwnProperty('Details')===true){
                    	if (data.operation.Details.hasOwnProperty('CAPTCHAID') === true) {
                    		PMP_popup.CAPTCHAID=data.operation.Details.CAPTCHAID;   
                    	}
                    }
                    if(data.operation.hasOwnProperty('Details')===true){
                    	if (data.operation.Details.hasOwnProperty('SHOWCAPTCHA') === true) {
                    		PMP_popup.SHOWCAPTCHA=data.operation.Details.SHOWCAPTCHA;
                    		PMP_popup.SHOWCAPTCHA = (PMP_popup.SHOWCAPTCHA === 'true') ? true : false;   
                    	}
                    }
                    if(PMP_popup.SHOWCAPTCHA==true){
                    	var captchaMsg = browser.i18n.getMessage("captcha_message");
                    	var random_number = Math.random();
                    	var captchaURL = 'https://' + PMP_popup.serverName + '/captcha/j_captcha?t='+random_number;
                        $("#personalCapImg").attr("src",captchaURL);
                        $('#personalCaptchaMsg').text(captchaMsg);
                        $("#personalCaptchaMsg").show();
                        $('#personalCapImg').show();
                        $('#personal_Ref_Div').show();
                        $('#personalCaptchaImg').show();
                    	$('#personalCaptchaField').show();
                    }
                    else {
                    	$('#personalCaptchaField').hide();
                    	$('#personalCaptchaMsg').hide();
	                $('#personalCaptchaImg').hide();
                    }
                    $('#personalInput').find('input').val('');
		    $('#personalCaptchaInput').find('input').val('');
                    $('#personalInput').find('input').focus();
                }
            });
        },
        getPersonalCategoryList: function (isTabReset) {
            if(PMP_popup.BUILDNUMBER<10102){
            	var personalCategoryListUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories?AUTHTOKEN=' + PMP_popup.authToken;
            } else {
            	var personalCategoryListUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories';
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: personalCategoryListUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'PASSPHRASE': PMP_popup.personalPassPhrase, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function (xhr) {
                    if (isTabReset !== true) {
                        $('#categoryList').empty();
                        $('#categoryListLoading').show();
                    } else {
                        $('#resourceLoading').show();
                    }
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    $('#resourceLoading').hide();
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (popupUtils.checkStatus(data) === true) {
                    PMP_popup.personalCategoryListSuccess(data, isTabReset);
                } else {
                    PMP_popup.signoutCall();
                    PMP_popup.serverConnectivityLost();
                }
            });
        },
        getPersonalPasswords: function () {
            if(PMP_popup.BUILDNUMBER<10102){
                var personalPasswordsUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/accounts?AUTHTOKEN=' + PMP_popup.authToken + '&STARTINDEX=' + PMP_popup.personalAccountStartIndex + '&LIMIT=' + PMP_popup.LIMIT;
            } else {
            	var personalPasswordsUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/accounts?STARTINDEX=' + PMP_popup.personalAccountStartIndex + '&LIMIT=' + PMP_popup.LIMIT;
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: personalPasswordsUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'PASSPHRASE': PMP_popup.personalPassPhrase, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function (xhr) {
                    PMP_popup.isSearchQuery = false;
                    if (PMP_popup.personalAccountStartIndex > 0) {
                        $('#loadDuringListing').show();
                    } else {
                        $('#personalAccountList').hide();
                        $('#resourceLoading').show();
                    }
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    $('#resourceLoading').hide();
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (popupUtils.checkStatus(data) === true) {
                    PMP_popup.displayPersonalPasswords(data);
                } else {
                    PMP_popup.signoutCall();
                    PMP_popup.serverConnectivityLost();
                }
            });
        },
        getPersonalAccFields: function (selectedAccountId) {
            if(PMP_popup.BUILDNUMBER<10102){
            	var customFieldsUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/fields?AUTHTOKEN=' + PMP_popup.authToken;
            } else {
            	var customFieldsUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/fields';
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: customFieldsUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'PASSPHRASE': PMP_popup.personalPassPhrase, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                error: function (jqxhr, textStatus, errorThrown) {
                    $('#resourceLoading').hide();
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (popupUtils.checkStatus(data) === true) {
                    PMP_popup.personalDefaultFieldList = data.operation.Details["DEFAULT FIELD"];
                    PMP_popup.personalCustomFieldList = data.operation.Details["CUSTOM FIELD"];
                    PMP_popup.displayPersonalAccDetails(selectedAccountId);
                } else {
                    PMP_popup.signoutCall();
                    PMP_popup.serverConnectivityLost();
                }
            });
        },
        searchPersonalPasswords: function (searchValue) {
            if(PMP_popup.BUILDNUMBER<10102){
                var searchPersonalUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/search?AUTHTOKEN=' + PMP_popup.authToken + '&SEARCHVALUE=' + searchValue + '&STARTINDEX=' + PMP_popup.personalAccountStartIndex + '&LIMIT=' + PMP_popup.LIMIT;
            } else {
            	var searchPersonalUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/search?SEARCHVALUE=' + searchValue + '&STARTINDEX=' + PMP_popup.personalAccountStartIndex + '&LIMIT=' + PMP_popup.LIMIT;
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: searchPersonalUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'PASSPHRASE': PMP_popup.personalPassPhrase, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function (xhr) {
                    if (PMP_popup.personalAccountStartIndex > 0) {
                        $('#loadDuringListing').show();
                    } else {
                        $('#personalAccountList').hide();
                        $('#resourceLoading').show();
                    }
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    $('#resourceLoading').hide();
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (popupUtils.checkStatus(data) === true) {
                    PMP_popup.displayPersonalPasswords(data);
                } else {
                    PMP_popup.signoutCall();
                    PMP_popup.serverConnectivityLost();
                }
            });
        },
        getPasswordFiles: function (pwdUrl, fileName,input_data) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', pwdUrl);
            xhr.setRequestHeader("requestFrom", "pmpmobilenative");
            xhr.setRequestHeader("orgName", PMP_popup.orgName);
            xhr.setRequestHeader("AUTHTOKEN", PMP_popup.authToken);
            xhr.setRequestHeader("clientType", "12");
            xhr.setRequestHeader("sessionId",PMP_popup.SESSIONID)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var a = document.createElement("a");
                    a.href = window.URL.createObjectURL(xhr.response);
                    a.setAttribute("download", fileName);
                    document.body.appendChild(a);
                    setTimeout(function () {
                        a.click();
                        setTimeout(function () {
                            window.URL.revokeObjectURL(a.href);
                            document.body.removeChild(a);
                        }, 100);
                    }, 100);
                } else {
                    popupUtils.serverNotReachableMessage(xhr, "fetchPasswordFail");
                }
            };
            xhr.responseType = 'blob';
            xhr.send(input_data);
        },
        checkStatus: function (parsedJSON) {
            if(parsedJSON)
            {
            var status = parsedJSON.operation.result.status;
            return (status === 'Success' ? true : false);
            }
            return false;
        },
        getSearchResult: function (searchValue) {
            if(PMP_popup.BUILDNUMBER<10102){
            	var searchUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_RESOURCES' ;
            } else {
            	var searchUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_RESOURCES' ;
            }
            var input_data=       'INPUT_DATA={"operation":{"Details":{' +
                    '"SEARCHCOLUMN":"' + PMP_popup.SEARCHCOLUMN + '",' +
                    '"SEARCHVALUE":"' + searchValue + '",' +
                    '"VIEWTYPE":"' + PMP_popup.resourceViewType + '",' +
                    '"STARTINDEX":"' + PMP_popup.searchIndex + '",' +
                    '"LIMIT":"' + PMP_popup.LIMIT + '",' +
                    '"SEARCHTYPE":"' + PMP_popup.SEARCHTYPE + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: searchUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    if (PMP_popup.searchIndex > 0) {
                        $('#loadDuringListing').show();
                    } else {
                        PMP_Utils.hideAccountRelatedInfo();
                        PMP_popup.hideOtherTabs();
                        $('#resourceLoading').show();
                    }
                }, error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchResourceFail");
                }
            }).done(function (data) {
                if (PMP_popup.searchIndex > 0) {
                    $('#loadDuringListing').hide();
                    PMP_popup.resourceDisplay(data, "subsequentBatchFetch");
                } else {
                    $('#resourceLoading').hide();
                    PMP_popup.resourceDisplay(data, "firstBatchFetch");
                }
            });
        },
        getSearchColumns: function () {
            if(PMP_popup.BUILDNUMBER<10102){
                var searchUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_SEARCHCOLUMNS';
            } else {
            	var searchUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_SEARCHCOLUMNS';
            }

            return jQuery.ajax({type: 'POST', url: searchUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: false,
                error: function (jqxhr, textStatus, errorThrown) {
                    if (jqxhr.status === 0) {
                        PMP_popup.hideOtherTabs();
                    }
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }}).responseText;
        },
        getPasswordforCopy: function (passwdId, ISREASONREQUIRED, reason, ticketId, isTicketIdRequired) {

            var retrievalReason = "";
            if (ISREASONREQUIRED === 'true' || isTicketIdRequired === 'true') {
                retrievalReason = reason;
            }
            if(PMP_popup.BUILDNUMBER<10102){
                var pwdURL = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_PASSWORD';
            } else {
            	var pwdURL = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_PASSWORD';
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"PASSWDID":"' + passwdId + '","REASON":"' + retrievalReason + '","TICKETID":"' + ticketId + '"}}}';
            return jQuery.ajax({type: 'POST', url: pwdURL, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: false,
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }}).responseText;
        },
        validateHelpDeskID: function (accountId, ISREASONREQUIRED, reason, ticketId, isTicketIdRequired) {
            var retrievalReason = "";
            if (ISREASONREQUIRED === 'true' || isTicketIdRequired === 'true') {
                retrievalReason = reason;
            }
                var pwdURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/accounts/'+accountId+'/validateHelpDeskID';
                var input_data= 'INPUT_DATA={"operation":{"Details":{"REASON":"' + retrievalReason + '","TICKETID":"' + ticketId + '"}}}';
            return jQuery.ajax({type: 'GET', url: pwdURL, data:encodeURI(input_data), headers: {'requestFrom': 'pmpmobilenative', 'AUTHTOKEN': PMP_popup.authToken,'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: false,
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }}).responseText;
        },
        getResourceGroups: function (id) {
            var label = "GROUPOWNERID";
            var nodeType = "GROUPNODE";
            var stackLength = PMP_popup.resourceGroupStack.length;
            if (stackLength === 1) {
                nodeType = "PARENTNODE";
            } else if (stackLength === 2) {
                label = "GROUPOWNERID";
            } else {
                label = "GROUPID";
            }
            if(PMP_popup.BUILDNUMBER<10102){
                var gpUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_RESOURCEGROUPS';
            } else {
            	var gpUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_RESOURCEGROUPS';
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"' +
                    label + '":"' + id + '","NODETYPE":"' + nodeType + '"}}}';

            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: gpUrl, data:input_data,  headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    $('#resourceLoading').show();
                }, error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchGroupFail");
                }
            }).done(function (data) {
                $('#resourceLoading').hide();
                PMP_popup.displayResourceGroups(data);
            });
        },
        getGroupResources: function (startIndex, groupId) {
            if(PMP_popup.BUILDNUMBER<10102){
                var grUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_GROUPRESOURCES';
            } else {
            	var grUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_GROUPRESOURCES';
            }
            	var input_data= 'INPUT_DATA={"operation":{"Details":{"LIMIT":"' + PMP_popup.LIMIT + '","STARTINDEX":"' + startIndex + '","GROUPID":"' + groupId + '"}}}';



            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: grUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    if (startIndex > 0) {
                        $('#loadDuringListing').show();
                    } else {
                        $('#resourceDataDiv').hide();
                        $('#resourceLoading').show();
                    }
                }, error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchGroupFail");
                }
            }).done(function (data) {
                if (startIndex > 0) {
                    $('#loadDuringListing').hide();
                    PMP_popup.resourceDisplay(data, "subsequentBatchFetch");
                } else {
                    $('#resourceLoading').hide();
                    PMP_popup.resourceDisplay(data, "firstBatchFetch");
                }
            });
        },
        getResourceTypes: function () {
            if(PMP_popup.BUILDNUMBER<10102){
                var typeUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_RESOURCETYPES';
            } else {
            	var typeUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_RESOURCETYPES';
            }

            return $.ajax({type: 'POST', url: typeUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: false}).responseText;
        },
        modifyFavorite: function (accountId, operation) {
            if(PMP_popup.BUILDNUMBER<10102){
                var favUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=' + operation;
            } else {
            	var favUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=' + operation;
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"ACCOUNTID":"' + accountId + '"}}}';

            return $.ajax({type: 'POST', url: favUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: false,
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }}).responseText;
        },
        modifyPersonalFavorite: function (accountId, operation) {
            if(PMP_popup.BUILDNUMBER<10102){
                var personalFavUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/accounts/' + accountId + '/' + operation + '?AUTHTOKEN=' + PMP_popup.authToken;
            } else {
            	var personalFavUrl = 'https://' + PMP_popup.serverName + '/restapi/json/v1/personal/categories/' + PMP_popup.selectedCategoryId + '/accounts/' + accountId + '/' + operation;
            }

            return $.ajax({type: 'GET', url: personalFavUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'PASSPHRASE': PMP_popup.personalPassPhrase, 'sessionId':PMP_popup.SESSIONID}, async: false,
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }}).responseText;
        },
        requestPasswordAPI: function (requestText, passwdId, ticketId) {
            if(PMP_popup.BUILDNUMBER<10102){
                var reqPwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=REQUEST_PASSWORD';
            } else {
            	var reqPwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=REQUEST_PASSWORD';
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"REASON":"' + requestText + '","PASSWDID":"' + passwdId;
            input_data += (ticketId !== "") ? '", "TICKETID":"' + ticketId : "";
            input_data += '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: reqPwdUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }
            }).done(function (data) {
                PMP_popup.requestPasswordReasonSuccess(data, passwdId);
            });
        },
        confirmCheckout: function (passwdId) {
            if(PMP_popup.BUILDNUMBER<10102){
                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=REQUEST_CHECKOUT';
            } else {
            	var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=REQUEST_CHECKOUT';
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"REASON":"N/A","PASSWDID":"' + passwdId + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: pwdUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }
            }).done(function (data) {
                PMP_popup.confirmCheckoutSuccess(data, passwdId);
            });
        },
        confirmCheckin: function (passwdId) {
            if(PMP_popup.BUILDNUMBER<10102){
                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=REQUEST_CHECKIN';
            } else {
            	var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=REQUEST_CHECKIN';
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"REASON":"N/A","PASSWDID":"' + passwdId + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: pwdUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }
            }).done(function (data) {
                PMP_popup.confirmCheckinSuccess(data, passwdId);
            });
        },
        getPasswordRequests: function (searchValue) {
            if(PMP_popup.BUILDNUMBER<10102){
                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=GET_PASSWORDREQUEST';
            } else {
            	var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=GET_PASSWORDREQUEST';
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: pwdUrl, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                beforeSend: function () {
                    $('#accessControlLoading').show();
                    $('#accessControlList').hide();
                },
                error: function (jqxhr, textStatus, errorThrown) {
                    $('#accessControlLoading').hide();
                    $('#accessControlList').fadeIn();
                    var errOccured = browser.i18n.getMessage("error_has_occured");
                    $('#accessControlList').append($("<div>", {class: "noRequests"}).text(errOccured));
                }
            }).done(function (data) {
                $('#accessControlLoading').hide();
                $('#accessControlList').fadeIn();
                PMP_popup.accessControlList(data, searchValue);
            });
        },
        adminRequest: function (passwdId, requestUserId, operationName) {
            if(PMP_popup.BUILDNUMBER<10102){
                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=' + operationName;
            } else {
            	var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=' + operationName;
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":{"PASSWDID":"' + passwdId + '", "REQUESTEDID":"' + requestUserId + '"}}}';
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: pwdUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                error: function (jqxhr, textStatus, errorThrown) {
                    popupUtils.serverNotReachableMessage(jqxhr, "fetchPasswordFail");
                }
            }).done(function (data) {
                popupUtils.getPasswordRequests('');
            });
        },
        logoutAudit: function () {
            var logoutTime = new Date().getTime();
            var orgId = popupUtils.getOrgId();
            if(PMP_popup.BUILDNUMBER<10102){
                var audUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=ADD_OFFLINEAUDIT&AUTHTOKEN=' + PMP_popup.authToken;
            } else {
            	var audUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=ADD_OFFLINEAUDIT';
            }
            var input_data= 'INPUT_DATA={"operation":{"Details":[{"AUDITTYPE":"USERAUDIT", "USERNAME" : "' + PMP_popup.fullName.replace(/\\+\b/g,'\\\\') + '","LOGINUSER":"N/A","REASON":"Logged out","OPERATEDTIME":"' + logoutTime;
            input_data += '","ORGID" : "' + orgId + '","RESOURCENAME":"N/A","ACCOUNTNAME":"N/A","OPERATIONTYPE":"User Logged out" }]}}';
            $.ajax({type: 'POST', url: audUrl, data:input_data, headers: {'requestFrom': 'pmpmobilenative','AUTHTOKEN': PMP_popup.authToken, 'orgName': PMP_popup.orgName, 'ClientType': 12, 'sessionId':PMP_popup.SESSIONID}, async: false});
            popupUtils.logout();
        },
        logout: function() {
            if(PMP_popup.BUILDNUMBER>=10103){
            	var logoutUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=LOGOUT_USER';
                $.ajax({type: 'POST', url: logoutUrl, headers: {'requestFrom': 'pmpmobilenative', 'AUTHTOKEN': PMP_popup.authToken}, async: false});
            }
        },
        getOrgId: function () {
            var orgList = PMP_popup.ORGLIST;
            var globalOrgName = (PMP_popup.globalOrgName).toLocaleLowerCase();
            var orgId = "";
            for (var key in orgList) {
                var orgName_lowercase = (orgList[key].ORGURLNAME).toLocaleLowerCase();
                if (orgName_lowercase === globalOrgName) {
                    orgId = orgList[key].ORGID;
                    return orgId;
                }
            }
            return orgId;
        },
        serverNotReachable: function(errorType){
            if (errorType === "fetchLoginFail") {
                $('#signInLoading').hide();
                $('#loginFailed').hide();            
                var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
                $('#serverNotReachable').text(serverNotReachable);
               
                $('#serverNotReachable').fadeIn();
                document.getElementById("loginForm").reset();
                return false;
            } else if (errorType === "fetchTfaLoginFail") {
                $('#tfaSignInLoading').hide();
                $('#signInLoading').hide();
                if (PMP_popup.ISuserSECONDFACTORENABLED === 'FALSE') {        //  for logins without TFA configured
                    $('#tfaLoginFailed').text("Invalid Password");
                } else {
                    PMP_popup.displayFailedStatus();                        //  for logins with TFA configured
                }
                $('#tfaLoginFailed').show();
                document.getElementById("tfaForm").reset();
                if(PMP_popup.BUILDNUMBER>=9802)
                {
                    document.getElementById("loginForm").reset();
                    setTimeout(function () {
                       $('#tfaForm').hide();
                       $('#loginForm').show();
                   }, 1000);
                }
                return false;
            } else if (errorType === "fetchServerDetailsFail") {
                setTimeout(function () {
                    $('#serverDetailLoading').hide();
                }, 0);
                $('#serverDetailSaveLoading').hide();
                $('#mspOrgRequired').hide();
                $('#loginForm').hide();
                $('#serverFailedTd').show();
                $('#serverDetailForm').show();
                $('#hostname').focus();
                return false;
            }
        },
        serverNotReachableMessage: function (jqxhr, errorType) {
            if (errorType === "fetchPasswordFail") {
                popupUtils.fetchPasswordFailedHandler(jqxhr);
                return false;
            }

            var jqxhr_599_Error = (jqxhr.status === 599 && jqxhr.statusText === "OK") ? true : false;
            if ((jqxhr.status === 0 && jqxhr.statusText === "error") || jqxhr_599_Error === true) {
                if (errorType === "fetchLoginFail") {
                    $('#signInLoading').hide();
                    $('#loginFailed').hide();
                    if (jqxhr_599_Error === true) {
                        var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                        $('#serverNotReachable').text(harmfulContent);
                    } else {
                        var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
                        $('#serverNotReachable').text(serverNotReachable);
                    }
                    $('#serverNotReachable').fadeIn();
                    document.getElementById("loginForm").reset();
                    return false;
                } else if (errorType === "fetchTfaLoginFail") {
                    $('#tfaSignInLoading').hide();
                    $('#signInLoading').hide();
                    if (PMP_popup.ISuserSECONDFACTORENABLED === 'FALSE') {        //  for logins without TFA configured
                        $('#tfaLoginFailed').text("Invalid Password");
                    } else {
                        PMP_popup.displayFailedStatus();                        //  for logins with TFA configured
                    }
                    $('#tfaLoginFailed').show();
                    document.getElementById("tfaForm").reset();
                    if(PMP_popup.BUILDNUMBER>=9802)
                    {
                        document.getElementById("loginForm").reset();
                        setTimeout(function () {
                           $('#tfaForm').hide();
                           $('#loginForm').show();
                       }, 1000);
                    }
                    return false;
                } else if (errorType === "fetchServerDetailsFail") {
                    setTimeout(function () {
                        $('#serverDetailLoading').hide();
                    }, 0);
                    $('#serverDetailSaveLoading').hide();
                    $('#mspOrgRequired').hide();
                    $('#loginForm').hide();
                    $('#serverFailedTd').show();
                    $('#serverDetailForm').show();
                    $('#hostname').focus();
                    return false;
                } else if (errorType === "fetchResourceFail") {
                    $('#loadDuringListing').hide();
                    $('#resourceDetails').hide();
                    if (jqxhr_599_Error === true) {
                        var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                        $('#resourceDataDiv').append($("<div>", {class: "harmfulContent"}).text(harmfulContent));
                        $('#resourceDataDiv').fadeIn();
                        $('#resourceLoading').hide();
                        return false;
                    }
                } else if (errorType === "fetchGroupFail") {
                    $('#resourceGroupHeader').hide();
                    $('#resourceGroups').hide();
                    $('#loadDuringListing').hide();
                }
                var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
                $('#resourceDataDiv').append($("<div>", {class: "noResources"}).text(serverNotReachable));
                $('#resourceDataDiv').fadeIn();
                $('#resourceLoading').hide();
            } else if (jqxhr.status === 0 && errorType === "fetchServerDetailsFail" && jqxhr.statusText !== "OK") {
                $('#serverDetailSaveLoading').hide();
                $('#serverDetailSaveLoading').hide();
                $('#loginForm').hide();
                $('#serverFailedTd').show();
                $('#serverDetailForm').show();
                $('#hostname').focus();
            }
        },
        fetchPasswordFailedHandler: function (jqxhr) {
            if (jqxhr.status === 0) {
                PMP_Utils.hideAccountRelatedInfo();
                PMP_popup.reasonRequiredHide();
                $('#resourceDetails').hide();
                var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
                $('#resourceDataDiv').append($("<div>", {class: "noResources"}).text(serverNotReachable));
                $('#resourceDataDiv').fadeIn();
                $('#resourceLoading').hide();
            } else if (jqxhr.status === 599) {
                var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                PMP_Utils.reasonFailedMessage(harmfulContent);
                $('#passwordReason').val('');
            }

        },
        copyString: function (text) {
            popupUtils.resetIdleTime();
            var copyFrom = document.createElement('input');
            copyFrom.value = text;
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand('copy');
            copyFrom.remove();


        },
        copiedMessage: function () {

            $('#copiedToClipboard').fadeIn();
            setTimeout(function () {
                $('#copiedToClipboard').fadeOut();
            }, 1000);

        },
        initiateCopyFunctions: function () {
            $('.copyUname').click(function (event) {
                var uname = $(this).parent().parent().attr('uname');

                popupUtils.copyString(uname);
                popupUtils.copiedMessage();
                PMP_Utils.dropDownController("");
                event.stopPropagation();
            });

            $('.copyPwdDisabled').click(function () {
                event.stopPropagation();
            });

            $('.autoLogonDisabled').click(function () {
                event.stopPropagation();
            });

            $('.copyPwd').click(function (event) {
                var passwdId = $(this).parent().parent().attr('passwdId');
                var accountId = $(this).parent().parent().attr('accountId');
                var ISREASONREQUIRED = $(this).parent().attr('ISREASONREQUIRED');
                var isTicketIdRequired = $(this).parent().attr('IS_TICKETID_REQD');
                var isTicketIdMandatory = $(this).parent().attr('IS_TICKETID_REQD_MANDATORY');
                var accountName = $(this).parent().parent().attr('uname');
                var reason = "";
                var password = "";
                var passwordResponse = "";

                if (ISREASONREQUIRED === 'true' || isTicketIdRequired === 'true') {
                    $('#accountName').text(accountName);
                    var fileName = '', remoteLoginUrl = '';      //  to reuse the below function for file download and RDP/SSH connections
                    popupUtils.copyPasswordAssist(passwdId, ISREASONREQUIRED, isTicketIdRequired, isTicketIdMandatory, fileName, remoteLoginUrl, true,accountId);
                } else {
                    passwordResponse = popupUtils.getPasswordforCopy(passwdId, ISREASONREQUIRED, reason);
                    var parsedData = JSON.parse(passwordResponse);
                    password = parsedData.operation.Details.PASSWORD;
                    password = password.trim();
                    popupUtils.copyString(password);
                    popupUtils.copiedMessage();
                    popupUtils.clearDataOnTimeOut();
                }
                PMP_Utils.dropDownController("");
                event.stopPropagation();
            });
            $('.copyTOTP').click(function () {
                let accountId = $(this).parent().parent().attr('accountid');
                serverUtils.generateTOTP(accountId,PMP_popup).then(totp=>{
                    popupUtils.copyString(totp);
                    popupUtils.copiedMessage();
                    PMP_Utils.dropDownController("");
                })
                event.stopPropagation();
            });
            $('.copyTOTPDisabled').click(function () {
                event.stopPropagation();
            });
        },
        copyPasswordAssist: function (passwdId, ISREASONREQUIRED, isTicketIdRequired, isTicketIdMandatory, fileName, remoteLoginUrl, copyPwd , accountId) {
            $('.resourceHeader').hide();
            PMP_Utils.hideAccountRelatedInfo();
            $('#ticketId input').val('');
            $('#passwordReason').val('');
            $('#reasonRequired').show();

            if (isTicketIdRequired === 'true') {
                $('#getTicket').show();
                $('#ticketId').find('input').focus();
            } else {
                $('#getTicket').hide();
                $('#passwordReason').focus();
            }

            var reason = "", ticketId = "";
            if(PMP_popup.BUILDNUMBER<11200 && !copyPwd && isTicketIdRequired === 'true'){
                var disabledMsg = chrome.i18n.getMessage("disabled_for_ticketing_system");
                $('#reasonFailed').text(disabledMsg);
                $('#reasonFailed').show();
                $('#proceed').css({'cursor':'default','opacity':'.3'});
                $('#proceed').off('click');
            } else {
                $('#proceed').css({'cursor':'','opacity':''});
                $('#proceed').off('click').on('click', function () {
                    reason = ($('#passwordReason').val()).trim();
                    ticketId = ($('#ticketId').find('input').val()).trim();

                    var ticketIdRequired='TICKET ID REQUIRED';
                    var ticketIdCorrectRequired='TICKET ID CORRECT REQUIRED';
                    var requestCheck = PMP_Utils.hasHarmfulContent(reason);
                    var ticketIdCheck = PMP_Utils.hasHarmfulContent(ticketId);
                    if (ticketIdCheck === false || requestCheck === false) {
                        var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                        PMP_Utils.reasonFailedMessage(harmfulContent);
                        ticketIdCheck === false ? $('#ticketId').find('input').focus() : $('#passwordReason').focus();
                        return false;
                    }
                    // reason = PMP_Utils.escapeQuotes(PMP_Utils.htmlEncode(reason));
                    reason = encodeURIComponent(reason);

                    ticketIdCheck = PMP_Utils.isTicketIdValid(ticketId);
                    if (isTicketIdRequired === 'true' || ticketIdCheck !== true) {
                        ticketId = encodeURIComponent(ticketId);
                        if ((ticketId === "" && isTicketIdMandatory === 'true') || ticketIdCheck !== true) {
                            var enterTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                            PMP_Utils.reasonFailedMessage(enterTcktId);
                            $('#ticketId').find('input').focus();
                            return false;
                        }
                    }

                    if (ISREASONREQUIRED === 'true' && reason === "") {
                        var enterReason = browser.i18n.getMessage("enter_reason_to_proceed");
                        PMP_Utils.reasonFailedMessage(enterReason);
                        $('#passwordReason').focus();
                        return false;
                    }

                    if ((reason !== "" && ISREASONREQUIRED === 'true') || (isTicketIdMandatory === 'true' && ticketId !== "") ||
                            (ISREASONREQUIRED === 'false') || (isTicketIdMandatory === 'false')) {
                        if(copyPwd){
                            $('#reasonFailed').hide();
                            var passwordResponse = popupUtils.getPasswordforCopy(passwdId, ISREASONREQUIRED, reason, ticketId, isTicketIdRequired);
                            var parsedData = JSON.parse(passwordResponse);
                            var status = parsedData.operation.result.status;
                            if (status === 'Failed') {
                                var enterTcktId = '';
                                if (parsedData.operation.result.message === 'Password Not Accessible. Contact your administrator to check the Ticketing system configurations & try again later.') {
                                    enterTcktId = browser.i18n.getMessage('unable_to_validate_ticketid');
                                } else {
                                    enterTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                                }
                                PMP_Utils.reasonFailedMessage(enterTcktId);
                                $('#ticketId').find('input').focus();
                                return false;
                            }
                            if(parsedData.operation.Details.PASSWORD === ticketIdRequired || parsedData.operation.Details.PASSWORD === ticketIdCorrectRequired)
                            {
                                enterTcktId = chrome.i18n.getMessage("enter_a_valid_ticket_id");
                                PMP_Utils.reasonFailedMessage(enterTcktId);
                                $('#ticketId').find('input').focus();
                                return false;
                            }
                            if (copyPwd)
                            {
                                var password = parsedData.operation.Details.PASSWORD;
                                password = password.trim();
                                popupUtils.copyString(password);
                                popupUtils.copiedMessage();

                            }
                        } else {
                            var passwordResponse = popupUtils.validateHelpDeskID(accountId, ISREASONREQUIRED, reason, ticketId, isTicketIdRequired);
                            var parsedData = JSON.parse(passwordResponse);
                            var status = parsedData.operation.result.status;
                            var statusCode = parsedData.operation.Details.STATUSCODE;
                            if (status === 'Failed') {
                                var enterTcktId = '';
                                if(statusCode === 3) {
                                    var enterReason = chrome.i18n.getMessage("enter_reason_to_proceed");
                                    PMP_Utils.reasonFailedMessage(enterReason);
                                    $('#passwordReason').focus();
                                    return false;
                                } else {
                                    enterTcktId = parsedData.operation.result.message;
                                }
                                PMP_Utils.reasonFailedMessage(enterTcktId);
                                $('#ticketId').find('input').focus();
                                return false;
                            }
                            if (typeof fileName !== 'undefined' && fileName !== null && fileName !== "") {    //  to support file download in the same function
                                if(PMP_popup.BUILDNUMBER<10102){
                            var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                            } else {
                                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                            }
                            var isCustomField = 'false';
                            if(PMP_popup.BUILDNUMBER<10500){
                                isCustomField = 'FALSE';
                            }
                                var input_data= 'INPUT_DATA={"operation":{"Details":{"PASSWDID":"' + passwdId + '","ISCUSTOMFIELD":"'+isCustomField+'","REASON":"' + reason + '","TICKETID":"' + ticketId + '"}}}';
                                popupUtils.getPasswordFiles(pwdUrl, fileName,input_data);
        
                                $('#reasonRequired').hide();            //  Try to prevent duplication here
                                $('#passwordReason').val('');
                                $('#ticketId').find('input').val('');
                                $('.resourceHeader').show();
                                $('#accountList').show();
                                $('#accountListHeader').show();
                                return false;
                            } else if (typeof remoteLoginUrl !== 'undefined' && remoteLoginUrl !== null && remoteLoginUrl !== "") {    //  to support file download in the same function
                            //   PMP_popup.openNewTab(remoteLoginUrl);        //  Proceed to establish RDP/SSH connection
                                var server= 'https://' + PMP_popup.serverName;
                                var hiddenField = document.createElement("input");
                                browser.cookies.get({"url": server, "name": "pmpcc"}, function(cookie) {
                                    hiddenField.setAttribute("type", "hidden");
                                    hiddenField.setAttribute("name", "pmpcp");
                                    hiddenField.setAttribute("value", cookie.value);
                                });
                                setTimeout(function () {
                                    var forms = document.createElement("form");
                                    forms.id = "PMP_InvokeUrl";
                                    forms.action = remoteLoginUrl;
                                    forms.method = "POST";
                                    forms.target = "TheWindow";
                                    forms.appendChild(hiddenField);
                                    document.body.append(forms);
                                    forms.submit();
                                }, 50);
                            }
                        }
                        $('#reasonRequired').hide();                //  Try to prevent duplication here
                        $('#passwordReason').val('');
                        $('#ticketId').find('input').val('');
                        $('.resourceHeader').show();
                        $('#accountList').show();
                        $('#accountListHeader').show();

                    }
                    event.stopPropagation();
                });
            }

            $('#cancel').off('click').on('click', function () {
                $('#reasonFailed').hide();
                $('#reasonRequired').hide();
                $('#passwordReason').val('');
                $('#ticketId').find('input').val('');
                $('.resourceHeader').show();
                $('#accountList').show();
                $('#accountListHeader').show();
                event.stopPropagation();
            });
        },
        clearDataOnTimeOut: function () {

            browser.runtime.sendMessage({
                'action': 'clearClipBoard',
                'data': null
            });


        },
        destroyData: function () {
            PMP_popup.ORGLIST = null;
            PMP_popup.orgName = PMP_popup.globalOrgName;
            PMP_popup.authToken = null;
            PMP_popup.isAutoLogonAccess = true;
            PMP_popup.isAutoFillAccess = true;
            PMP_popup.personalPassPhrase = null;
            PMP_popup.SESSIONID=null;
            PMP_popup.JSESSIONIDSSO=null;
        },
        resetIdleTime: function () {
            browser.runtime.sendMessage({
                'action': 'resetIdleTime',
                'data': null
            });
        },
        initializeData: function () {
            PMP_popup.startIndex = 0;
            PMP_popup.totalRows = PMP_popup.LIMIT;
            PMP_popup.searchIndex = 0;
            PMP_popup.isSearchQuery = false;
            PMP_popup.searchValue = null;
        }
    };

    var PMP_popup = {
        authToken: null,
        SESSIONID: null,
        loginName: null,
        fullName: null,
        userRoles: null,
        USERID: null,
        firstFactorSecretKey:null,
        isAutoLogonAccess: true,
        isAutoFillAccess: true,
        enforceMaxTimeLimit: false,
        isRoleAutoLogonAccess: true,
        isAccessCtrlAuthorize: false,
        serverName: null, //  host name + port number
        startIndex: 0,
        searchIndex: 0,
        isSearchQuery: false,
        searchValue: null,
        SEARCHCOLUMN: 'ALL',
        SEARCHTYPE: 'RESOURCE',
        orgName: '',
        FIRSTFACTOR: '',
        SECONDFACTOR: '',
        DOMAINNAME: '', //  AD domain
        ISSECONDFACTORENABLED: 'FALSE',
        ISuserSECONDFACTORENABLED: 'FALSE',
        CLIPBOARDTIMEOUT: 30,
        SESSIONTIMEOUT: 30,
        tempData: null,
        ORGLIST: null,
        globalOrgName: '',
        LIMIT: 50, //  constant
        totalRows: 50, //  Might vary during runtime. But mostly, the value is equal to PMP_popup.LIMIT's value
        username: null,
        resourceViewType: 'ALLMYPASSWORD',
        LOGOUTTIME: 30,
        tempLogout: null,
        resourceGroupStack: null,
        resourceGroupNameStack: null,
        selectedTab: 'allPasswords',
        resTypeIcon: null,
        BANNERLINK: '',
        PRIVACYLINK: '',
        loginButtonText: browser.i18n.getMessage("login"),
        BANNERMESSAGE: '',
        PRIVACYMESSAGE: '',
        AJAXREQUEST: null,
        REBRANDLOGONAME: '',
        totalAccounts: '',
        accountStartIndex: 0,
        personalAccountStartIndex: 0,
        clickedResourceId: '',
        ISLOCALAUTHENABLED: '',
        DEFAULTDOMAIN: '',
        BUILDNUMBER: null,
        ISPERSONALTABENABLED: null,
        urlProtocolRegex: '/^(https?|ftp|file):\/\//i',
        resourceDetails: '',
        isAutoFillSubmitEnabled: false,
        isSSOEnabled: true,
        personalPassPhrase: null,
        selectedCategoryId: null,
        personalCategoryList: null,
        personalCategoryListLength: null,
        personalSelectedCategoryName: null,
        personalAccountList: null,
        personalAccountListTotalRows: 0,
        personalDefaultFieldList: null,
        personalCustomFieldList: null,
        isResourceAdded: null,
        allResourcesSelectedTabLeft: null,
        resourceGroupsSelectedTabLeft: null,
        favoritesSelectedTabLeft: null,
        recentlyUsedSelectedTabLeft: null,
        personalPasswordsSelectedTabLeft: null,
        JSESSIONIDSSO: null,
        CAPTCHAID: null,
        SHOWCAPTCHA: false,
        defaultAutoLogonList: ["Windows Remote Desktop", "RDP Console Session", "SSH", "Telnet", "SQL"], //, "VNC"   //Imclude This when error page changes done in Web Client
        enforcePreventBrowserAddAccount:false,
        isPasswordAccessDeniedForAccount: null,
        requestFrom: 'pmpmobilenative',
        clientType: 12,

        init: function () {

            browser.runtime.onMessage.addListener(PMP_popup.processRequest);

           
            setTimeout(function () {
                $('#serverDetailLoading').show();
            }, 0);

            browser.runtime.sendMessage({//	sends Message to Background
                'action': 'isServerDetailValid',
                'data': null
            }, function (response) {

                PMP_popup.getServerDetails();

                if (response.isValid === false) {

                    setTimeout(function () {
                        $('#serverDetailLoading').hide();
                    }, 0);
                } else {

                    $('#serverDetailForm').hide();
                    PMP_popup.serverName = response.serverName;
                    PMP_popup.isSSOEnabled=response.isSSOEnabled;
                    PMP_popup.orgName = response.orgName;
                    if((response.authToken==null ||  typeof response.authToken === 'undefined')&&PMP_popup.isSSOEnabled)
                    {
                    PMP_Utils.checkJsessionID(PMP_popup.serverName);
                    }
                    PMP_popup.globalOrgName = response.globalOrgName;
                    PMP_popup.ORGLIST = response.ORGLIST;
                    PMP_popup.CLIPBOARDTIMEOUT = response.CLIPBOARDTIMEOUT;
                    PMP_popup.LOGOUTTIME = response.LOGOUTTIME;
                    PMP_popup.SESSIONTIMEOUT = response.SESSIONTIMEOUT;
                    PMP_popup.isAutoFillSubmitEnabled = response.isAutoSubmitEnabled;
                    PMP_popup.SESSIONID=response.SESSIONID;
                    $('.PMP_Banner').hide();
                    popupUtils.getAuthMode(PMP_popup.serverName);
                }
                PMP_Utils.htmlInitializer();

                PMP_Utils.bannerLinkClick();
                PMP_Utils.bannerVerifyClick();
                PMP_Utils.privacyLinkClick();
                PMP_Utils.privacyVerifyClick();
                PMP_popup.signout();
                PMP_popup.popupMenuDropDown();
                PMP_popup.settingsTab();
                PMP_popup.serverSettingsConfiguration();
                PMP_popup.accessControl();
                // PMP_popup.addResource();
                PMP_popup.backToLoginForm();
                PMP_popup.tfaBackToLoginForm();

                PMP_Utils.submitServerDetailForm();
                PMP_Utils.loginFormSubmit();
                PMP_Utils.tfaFormSubmit();
                PMP_Utils.searchResources();
                PMP_Utils.searchMSPOrg();
                PMP_Utils.advancedSearch();
                PMP_popup.menuTabClickAction();
                PMP_popup.settingDropDown();
                PMP_popup.selectAD();
                PMP_popup.orgChangeForMSP();
                PMP_popup.selectPersonalCategory();
                PMP_Utils.searchPersonalCategory();
            });
        },
        orgChangeForMSP: function () {

            popupUtils.resetIdleTime();
            if (PMP_popup.ORGLIST === null) {
                PMP_popup.getOrgList();
            }

            $('#switchOrg').click(function (e) {
                var orgListDropDown = $('#orgListDropDown').css('display');
                PMP_Utils.dropDownController("orgListDropDown");
                if (orgListDropDown === "block") {
                    $(this).removeClass('MSPOrgMenuClicked');
                } else {
                    $('#searchOrg').val("");
                    setTimeout(function () {
                        $('#searchOrg').focus();
                    }, 0);
                    $(this).addClass('MSPOrgMenuClicked');
                    PMP_popup.showOrgList("");
                }

                $('#orgListDropDown').slideToggle(100);
                $('#searchOrgContainer').slideToggle(100);
                e.stopPropagation();
            });

            $('#searchOrgInputDiv').click(function (e) {
                e.stopPropagation();
            });
        },
        selectAD: function () {

            $('#DOMAINNAME').click(function (e) {
                $('#DOMAINNAMEDropDown').slideToggle(100);
                e.stopPropagation();
            });

            var liSelected = null;

            $('#DOMAINNAME').keydown(function (e) {

                $('#DOMAINNAMEDropDown li').each(function () {        //checking whether there is any selected element
                    if ($(this).hasClass('selected') === true) {
                        liSelected = $(this);
                        return false;
                    }
                });

                if (e.which === 38) {
                    if (liSelected !== null) {
                        $(liSelected).removeClass('selected');
                        var $prev = $(liSelected).prev();
                        if ($prev.length) {
                            liSelected = $prev.addClass('selected');
                        } else {
                            liSelected = $('#DOMAINNAMEDropDown').children('li').first().addClass('selected');
                        }
                    } else {
                        liSelected = $('#DOMAINNAMEDropDown').children('li').first().addClass('selected');
                    }
                    PMP_popup.setDomainName(liSelected);
                } else if (e.which === 40) {
                    if (liSelected !== null) {
                        $(liSelected).removeClass('selected');
                        var $next = $(liSelected).next();
                        if ($next.length) {
                            liSelected = $next.addClass('selected');
                        } else {
                            liSelected = $('#DOMAINNAMEDropDown').children('li').last().addClass('selected');
                        }
                    } else {
                        liSelected = $('#DOMAINNAMEDropDown').children('li').first().addClass('selected');
                    }
                    PMP_popup.setDomainName(liSelected);
                }
            });
        },
        selectPersonalCategory: function () {
            $('#selectPersonalCategory').click(function (event)
            {
                var categoryListDropDown = $('#categoryListDropDown').css('display');
                PMP_Utils.dropDownController('categoryListDropDown');
                $('#categoryListDropDown').slideToggle(100);

                if (categoryListDropDown !== "block") {
                    $('#categoryListLoading').show();
                    $('#searchCategory').val('');
                    $('#searchCategory').focus();
                    var isTabReset = false;
                    popupUtils.getPersonalCategoryList(isTabReset);
                }
                event.stopPropagation();
            });
        },
        categoryListClick: function ()
        {
            $('#categoryList li').unbind('click');
            $('#categoryList li').click(function (event) {
                var categoryId = $(this).attr('categoryId');
                PMP_popup.selectedCategoryId = categoryId;
                PMP_popup.setSelectedCategoryText();
                PMP_popup.personalAccountStartIndex = 0;
                popupUtils.getPersonalPasswords();
                PMP_Utils.dropDownController('categoryListDropDown');
                $('#categoryListDropDown').slideToggle(100);
                event.stopPropagation();
            });

            $('#categoryListDropDown').unbind('click');
            $('#categoryListDropDown').click(function (event) {
                event.stopPropagation();
            });
        },
        setDomainName: function (liSelected) {
            var domainValue = $(liSelected).attr('domainValue');
            var domainText = $(liSelected).text();
            PMP_popup.DOMAINNAME = domainValue;
            $('#DOMAINNAMEText').text(domainText);
        },
        reasonRequiredHide: function () {
            $('#reasonRequired').hide();
            $('#passwordReasonPopup').hide();
            $('#checkoutPasswordPopup').hide();
            $('#checkinPasswordPopup').hide();
            $('#reasonFailed').hide();
        },
        hideOtherTabs: function () {
            $('#resourceDetails').hide();
            $('#settingsTab').hide();
            $('#accessControlContainer').hide();
            $('#addResourceContainer').hide();
            $('#resourceGroupHeader').hide();
            $('#resourceGroups').hide();
            $('#loadDuringListing').hide();
            $('#personalProceedLoading').hide();
            $('#resourceDataDiv').hide();
            $('#aboutTab').hide();
            PMP_popup.hidePeronalAccounts();
        },
        hideOtherAddResourceElements: function () {
            $('#addDNSName').hide();
            $('#addResourceType').hide();
            $('#addResourceDesc').hide();
            $('#addDepartment').hide();
            $('#addResourceUrl').hide();
            $('#addLocation').hide();
            $('#addNotes').hide();
        },
        showOtherAddResourceElements: function () {
            $('#addDNSName').show();
            $('#addResourceType').show();
            $('#addResourceDesc').show();
            $('#addDepartment').show();
            $('#addResourceUrl').show();
            $('#addLocation').show();
            $('#addNotes').show();
        },
        hidePeronalAccounts: function () {
            $('#setupPersonalPasswordPopup').hide();
            $('#getPersonalPassPhrase').hide();
            $('#personalCategory').hide();
            $('#personalAccountList').hide();
            $('#personalAccountDetails').hide();
        },
        menuTabClickAction: function () {

            $('.allResources').click(function () {
                PMP_popup.commonEventsOnTabClick();
                PMP_popup.selectedTab = 'allPasswords';
                PMP_popup.resourceViewType = 'ALLMYPASSWORD';
                var searchAllResources = browser.i18n.getMessage("search_all_resource");
                $('#searchResource').attr('placeholder', searchAllResources);
                $('.selectedTabArrow').css('left', PMP_popup.allResourcesSelectedTabLeft);
                PMP_popup.totalRows = PMP_popup.LIMIT;
                popupUtils.getResources(0);
            });

            $('.favorites').click(function () {
                PMP_popup.commonEventsOnTabClick();
                PMP_popup.selectedTab = 'favorites';
                PMP_popup.resourceViewType = 'FAVOURITEPASSWORD';
                var searchFavRes = browser.i18n.getMessage("search_favorite_resources");
                $('#searchResource').attr('placeholder', searchFavRes);
                $('.selectedTabArrow').css('left', PMP_popup.favoritesSelectedTabLeft);
                PMP_popup.totalRows = PMP_popup.LIMIT;
                popupUtils.getResources(0);
            });

            $('.recentlyUsed').click(function () {
                PMP_popup.commonEventsOnTabClick();
                PMP_popup.selectedTab = 'recentlyUsed';
                PMP_popup.resourceViewType = 'RECENTLYACCESSEDPASSWORD';
                var searchResUsed = browser.i18n.getMessage("search_recently_used_resources");
                $('#searchResource').attr('placeholder', searchResUsed);
                $('.selectedTabArrow').css('left', PMP_popup.recentlyUsedSelectedTabLeft);
                PMP_popup.totalRows = PMP_popup.LIMIT;
                popupUtils.getResources(0);
            });

            $('.resourceGroups').click(function () {
                PMP_popup.commonEventsOnTabClick();
                //                PMP_Utils.hideAccountRelatedInfo();

                PMP_popup.selectedTab = 'resourceGroups';
                PMP_popup.resourceViewType = 'ALLMYPASSWORD';
                var searchAllResources = browser.i18n.getMessage("search_all_resource");
                $('#searchResource').attr('placeholder', searchAllResources);
                $('.selectedTabArrow').css('left', PMP_popup.resourceGroupsSelectedTabLeft);
                PMP_popup.resourceGroupStack = new Array();
                PMP_popup.resourceGroupStack.push(-1);//PMP_popup.USERID);
                PMP_popup.resourceGroupNameStack = new Array();
                PMP_popup.resourceGroupNameStack.push('Root');
                popupUtils.getResourceGroups(-1);//PMP_popup.USERID);
            });

            $('.personalPasswords').click(function () {
                PMP_popup.commonEventsOnTabClick();
                $('#advancedSearch').hide();

                PMP_popup.selectedTab = 'personalPasswords';
                var searchPersonalPasswords = browser.i18n.getMessage("search_personal_passwords");
                $('#searchResource').attr('placeholder', searchPersonalPasswords);
                $('.selectedTabArrow').css('left', PMP_popup.personalPasswordsSelectedTabLeft);
                if (PMP_popup.globalOrgName.toLocaleLowerCase() === PMP_popup.orgName.toLocaleLowerCase()) {
                    popupUtils.checkPersonalPassPhrase();
                } else {
                    PMP_popup.passPhraseStatus = "PERSONAL_ORG_CHANGED";
                    browser.runtime.sendMessage({//	sends message to background
                        'action': 'setPassPhraseStatus',
                        'data': PMP_popup.passPhraseStatus
                    });
                    $('#resourceLoading').hide();
                    var setupPersonalTab = browser.i18n.getMessage("personal_password_organization_specific");
                    $('#setupWarningDetails').text(setupPersonalTab);
                    $('#setupPersonalPasswordPopup').show();
                }
            });

        },
        commonEventsOnTabClick: function () {
            PMP_popup.AJAXREQUEST.abort();
            PMP_popup.hideOtherTabs();
            PMP_Utils.hideAccountRelatedInfo();
            PMP_popup.reasonRequiredHide();
            popupUtils.resetIdleTime();
            $('#searchResource').val('');
            $('.selectedTabArrow').show();
            $('#advancedSearch').show();
        },
        displayResourceGroups: function (data) {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            $('#resourceGroups').empty();
            if (status === true) {
                var rows = parsed.operation.totalRows;
                if (rows === 0) {
                    var noPasswords = browser.i18n.getMessage("no_passwords_found");
                    $('#resourceGroups').append($("<div>", {class: "noResources"}).text(noPasswords));//  Check whether it should be displayed as No Resource Groups found
                    $('#resourceGroups').show();
                    return false;
                }

                parsed.operation.Details = PMP_popup.sortResourceGroup(parsed.operation.Details);
                var resGroupUL = document.createElement("ul");
                resGroupUL.setAttribute("class", "resGroupList");

                for (var i = 0; i < rows; i++) {
                    var groupName = parsed.operation.Details[i]["GROUP NAME"];
                    var hasSubGroup = parsed.operation.Details[i].ISSUBGROUPAVAILABLE;
                    var groupId = parsed.operation.Details[i]["GROUP ID"];
                    var groupOwnerId = parsed.operation.Details[i]["GROUP OWNERID"];
                    var ISNODENAME = parsed.operation.Details[i].ISNODENAME;
                    if (hasSubGroup === 'true') {
                        var viewSubGroups = browser.i18n.getMessage("view_sub_groups");
                        var resGroupLI = document.createElement("li");

                        var grpNameSpan = document.createElement("span");
                        grpNameSpan.setAttribute("class", "groupNameImage");
                        var grpNodeImg = document.createElement("img");
                        grpNodeImg.setAttribute("src", "/images/groupNode.svg");
                        var grpNameDiv = document.createElement("div");
                        grpNameDiv.setAttribute("class", "groupName");
                        grpNameDiv.setAttribute("groupId", groupId);
                        grpNameDiv.setAttribute("groupName", groupName);
                        grpNameDiv.setAttribute("groupOwnerId", groupOwnerId);
                        grpNameDiv.setAttribute("ISNODENAME", ISNODENAME);
                        if (groupName.length > 30)
                        {
                            grpNameDiv.setAttribute("title", groupName);
                        }
                        var groupNameText = document.createTextNode(groupName);
                        var viewSubGrpImg = document.createElement("img");
                        viewSubGrpImg.setAttribute("title", viewSubGroups);
                        viewSubGrpImg.setAttribute("class", "subGroupImage");
                        viewSubGrpImg.setAttribute("src", "/images/forward.svg");
                        viewSubGrpImg.setAttribute("src", "/images/forward.svg");
                        grpNameSpan.appendChild(grpNodeImg);
                        grpNameDiv.appendChild(groupNameText);
                        resGroupLI.appendChild(grpNameSpan);
                        resGroupLI.appendChild(grpNameDiv);
                        resGroupLI.appendChild(viewSubGrpImg);

                    } else {


                        var resGroupLI = document.createElement("li");
                        if (ISNODENAME === 'true')
                        {
                            resGroupLI.setAttribute("class", "nodeGroupBlurred");
                        }
                        var grpNodeImg = (ISNODENAME === 'true') ? "/images/groupNode.svg" : "/images/group.svg";
                        var grpNameSpan = document.createElement("span");
                        grpNameSpan.setAttribute("class", "groupNameImage");
                        var grpNodeImg = document.createElement("img");
                        grpNodeImg.setAttribute("src", "/images/groupNode.svg");
                        var grpNameDiv = document.createElement("div");
                        grpNameDiv.setAttribute("class", "groupName");
                        grpNameDiv.setAttribute("groupId", groupId);
                        grpNameDiv.setAttribute("groupName", groupName);
                        grpNameDiv.setAttribute("groupOwnerId", groupOwnerId);
                        grpNameDiv.setAttribute("ISNODENAME", ISNODENAME);
                        if (groupName.length > 30)
                        {
                            grpNameDiv.setAttribute("title", groupName);
                        }
                        var groupNameText = document.createTextNode(groupName);

                        grpNameSpan.appendChild(grpNodeImg);
                        grpNameDiv.appendChild(groupNameText);
                        resGroupLI.appendChild(grpNameSpan);
                        resGroupLI.appendChild(grpNameDiv);

                    }
                    resGroupUL.appendChild(resGroupLI);
                }

                var resouGrps = document.getElementById("resourceGroups");
                resouGrps.appendChild(resGroupUL);
                $('#resourceGroups').show();
                if (PMP_popup.resourceGroupStack.length === 1) {
                    $('.resGroupList').find('.groupNameImage').addClass('rootGroup');
                } else {
                    $('.resGroupList').find('.groupNameImage').removeClass('rootGroup');
                }
            } else {

                PMP_popup.signoutCall();
                PMP_popup.serverConnectivityLost();


            }
            PMP_popup.subGroupClick();
            PMP_popup.groupNameClick();

            PMP_popup.groupBackButtonEffects();
            PMP_popup.groupCursorHover();
        },
        sortResourceGroup: function (Details) {
            var sorted = [];
            Object.keys(Details).sort(function (a, b) {
                return Details[a]["GROUP NAME"].toLocaleLowerCase() < Details[b]["GROUP NAME"].toLocaleLowerCase() ? -1 : 1;
            }).forEach(function (key) {
                sorted.push(Details[key]);
            });
            return sorted;
        },
        groupCursorHover: function () {
            $('.groupName').each(function () {
                var isNodeName = $(this).attr('isnodename');
                if (isNodeName === 'true') {
                    $(this).css('cursor', 'default');
                }
            });
        },
        displayGroupResources: function () {
            var length = PMP_popup.resourceGroupStack.length;
            PMP_popup.totalRows = PMP_popup.LIMIT;
            if (length === 2) {
                popupUtils.getResources(0);
            } else if (length > 2) {
                var groupId = PMP_popup.resourceGroupStack[length - 1];
                popupUtils.getGroupResources(0, groupId);
            } else {
                $('#resourceLoading').hide();
            }
        },
        subGroupClick: function () {
            $('.subGroupImage').click(function (event) {
                var groupId = $(this).parent().find('.groupName').attr('groupId');
                var groupName = $(this).parent().find('.groupName').attr('groupName');
                $('#resourceGroupHeader').empty();
                if (groupName.length > 25)
                {
                    $('#resourceGroupHeader').append($("<div>").append($("<span>", {class: "selectedGroupImage"})).append($("<div>", {class: "selectedGroupName", title: groupName}).text(groupName)).append($("<span>", {class: "groupBackButton"}).append($("<img>", {src: "/images/icon_back.png"}))));
                } else
                {
                    $('#resourceGroupHeader').append($("<div>").append($("<span>", {class: "selectedGroupImage"})).append($("<div>", {class: "selectedGroupName"}).text(groupName)).append($("<span>", {class: "groupBackButton"}).append($("<img>", {src: "/images/icon_back.png"}))));
                }

                $('#resourceGroupHeader').show();
                $('#resourceGroups').hide();
                PMP_popup.groupBackButtonEffects();
                PMP_popup.resourceGroupNameStack.push(groupName);
                if (PMP_popup.resourceGroupStack.length === 1) {
                    var groupOwnerId = $(this).parent().find('.groupName').attr('groupOwnerId');
                    PMP_popup.resourceGroupStack.push(groupOwnerId);
                    popupUtils.getResourceGroups(groupOwnerId);
                } else {
                    PMP_popup.resourceGroupStack.push(groupId);
                    popupUtils.getResourceGroups(groupId);
                }
                event.stopPropagation();
            });
        },
        groupNameClick: function () {
            $('.resGroupList li').click(function () {
                $(this).find('.groupName').each(function () {
                    var groupId = $(this).attr('groupId');
                    var groupName = $(this).attr('groupName');
                    // groupName = PMP_Utils.escapeQuotes(groupName);
                    var ISNODENAME = $(this).attr('ISNODENAME');
                    if (ISNODENAME === 'true') {
                        return false;
                    }
                    if (PMP_popup.resourceGroupStack.length === 1) {
                        var groupOwnerId = $(this).attr('groupOwnerId');
                        PMP_popup.resourceGroupStack.push(groupOwnerId);
                    } else {
                        PMP_popup.resourceGroupStack.push(groupId);
                    }
                    PMP_popup.resourceGroupNameStack.push(groupName);
                    $('#resourceGroupHeader').empty();
                    if (groupName.length > 25)
                    {
                        $('#resourceGroupHeader').append($("<div>").append($("<span>", {class: "selectedGroupImage"})).append($("<div>", {class: "selectedGroupName", title: groupName}).text(groupName)).append($("<span>", {class: "groupBackButton"}).append($("<img>", {src: "/images/icon_back.png"}))));
                    } else
                    {
                        $('#resourceGroupHeader').append($("<div>").append($("<span>", {class: "selectedGroupImage"})).append($("<div>", {class: "selectedGroupName"}).text(groupName)).append($("<span>", {class: "groupBackButton"}).append($("<img>", {src: "/images/icon_back.png"}))));
                    }

                    $('#resourceGroupHeader').show();
                    $('#resourceGroups').hide();
                    PMP_popup.groupBackButtonEffects();
                    if (ISNODENAME !== 'true') {
                        PMP_popup.displayGroupResources();
                    } else {
                        $('#resourceDataDiv').fadeIn();
                        var noPasswords = browser.i18n.getMessage("no_passwords_found");
                        $('#resourceDataDiv').append($("<div>", {class: "noResources"}).text(noPasswords));
                    }
                });
            });
        },
        groupBackButtonEffects: function () {
            $('.groupBackButton').off('click').on('click', function () {
                $('#resourceGroups').hide();
                $('#resourceDataDiv').hide();

                PMP_popup.resourceGroupStack.pop();
                PMP_popup.resourceGroupNameStack.pop();
                var length = PMP_popup.resourceGroupStack.length;
                var groupId = PMP_popup.resourceGroupStack[length - 1];
                $('#resourceGroupHeader').empty();
                // var groupName = '<div class="selectedGroupName">' + PMP_popup.resourceGroupNameStack[length - 1] + '</div>';
                var groupHeader = '';
                if (length === 1) {
                    // groupHeader = '<div>' + groupName + '</div>';
                    $('#resourceGroupHeader').hide();
                } else {
                    // var backButton = '<span class="groupBackButton"><img src="/images/icon_back.png"/></span>';
                    // groupHeader = '<div><span class="selectedGroupImage"></span>' + groupName + backButton + '</div>';

                    $('#resourceGroupHeader').append($("<div>").append($("<span>", {class: "selectedGroupImage"})).append($("<div>", {class: "selectedGroupName"}).text(PMP_popup.resourceGroupNameStack[length - 1])).append($("<span>", {class: "groupBackButton"}).append($("<img>", {src: "/images/icon_back.png"}))));
                }

                popupUtils.getResourceGroups(groupId);
            });
        },
        tfaBackToLoginForm: function () {
            $('#tfaBackToLoginForm').click(function () {
                PMP_popup.AJAXREQUEST.abort();
                $('#tfaSignInLoading').hide();
                $('#tfaForm').hide();
                $('#loginForm').show();
                $(".loginButton").attr("disabled", false);//	show login form and focus username
                $('#username').focus();
                return false;
            });
        },
        backToLoginForm: function () {
            $('#backToLoginForm').click(function () {
                $('#serverDetailForm').hide();
                $('#serverDetailErrorMessage').hide();
                $('#serverFailedTd').hide();
                $('#orgName').val('');

                $('#loginForm').show();			//	show login form and focus username
                $(".loginButton").attr("disabled", false);
                $('#username').focus();
                return false;
            });
        },
        serverSettingsConfiguration: function () {
            $('#serverSettingsConfig').click(function () {
                PMP_popup.AJAXREQUEST.abort();
                $('#signInLoading').hide();
                var AdDomainDropDown = $('#DOMAINNAMEDropDown').css('display');
                if (AdDomainDropDown === "block") {
                    $('#DOMAINNAMEDropDown').slideToggle(100);
                }

                $('#loginFailed').hide();			//	Clear any error message in the login form
                $('#loginForm').hide();				//	hide the login form
                $('#getOrgName').hide();                        //      hide the org Name field
                $('#mspOrgRequired').hide();                    //      hide the org Name error message
                $('#serverConnectivityLost').hide();            //      hide serverConnectivityLost messages

                $('#serverDetailForm').show();		//	show the dns form
                $('#backToLoginForm').show();		//	Show the close button in the dns form
                PMP_popup.placeHolderValue();
                $('#hostname').focus();
                return false;
            });
        },
        hidePopupMenu: function () {
            var displayDropDown = $('#dropDownMenu').css('display');
            var displaySearch = $('#searchCriteria').css('display');
            var clipBoardDropDown = $('#clipboardDropDown').css('display');
            var logoutDropDown = $('#logoutDropDown').css('display');
            if (displayDropDown === "block") {
                setTimeout(function () {
                    $('#popupMenuDropDown').removeClass('signoutNoBorder');
                    $('#popupMenuDropDown').removeClass('popupMenuClicked');
                }, 100);
                $('#dropDownMenu').slideToggle(100);
            }
            if (displaySearch === "block") {
                $('#searchCriteria').slideToggle(100);
            }
            if (clipBoardDropDown === "block") {
                $('#clipboardDropDown').slideToggle(100);
            }
            if (logoutDropDown === "block") {
                $('#logoutDropDown').slideToggle(100);
            }
            PMP_popup.isSearchQuery = false;
        },
        signout: function () {
            $('#signout').click(function () {
                $('#loginFailed').hide();
                $('.PMP_Banner').show();
                PMP_popup.signoutCall();
                return false;
            });
        },
        signoutCall: function () {
            popupUtils.logoutAudit();
            popupUtils.destroyData();
            PMP_popup.reasonRequiredHide();
            PMP_popup.hideOtherTabs();
            browser.runtime.sendMessage({//	sends message to background
                'action': 'clearAuthToken',
                'data': null
            });
            PMP_Utils.hideAccountRelatedInfo();
            $('#pmp_menu').fadeOut();
            $('#searchResource').val('');
            popupUtils.getAuthMode(PMP_popup.serverName);
        },
        serverConnectivityLost: function () {
            $('#serverConnectivityLost').fadeIn();
            setTimeout(function () {
                $('#serverConnectivityLost').fadeOut();
            }, 5000);
        },
        popupMenuDropDown: function () {

            $('#popupMenuDropDown').click(function (e) {
                var displayDropDown = $('#dropDownMenu').css('display');

                //if(PMP_popup.userRoles !== "Password Administrator" && PMP_popup.userRoles !== "Administrator"){

                if (PMP_popup.isAccessCtrlAuthorize === true)
                {
                    $('#accessControl').show();
                    //$('#addResource').hide();
                    //$('#accessControl').unbind('click');          //  Check whether this is necessary
                } else
                {
                    if (PMP_popup.userRoles !== "Password Administrator" && PMP_popup.userRoles !== "Administrator")
                    {
                        $('#accessControl').hide();
                    } else
                    {
                        $('#accessControl').show();
                    }
                    //$('#addResource').show();
                }
                if (displayDropDown === "block") {
                    setTimeout(function () {
                        $('#popupMenuDropDown').removeClass('signoutNoBorder');
                        $('#popupMenuDropDown').removeClass('popupMenuClicked');
                    }, 100);
                } else {
                    $(this).addClass('signoutNoBorder');
                    $(this).addClass('popupMenuClicked');
                }
                PMP_Utils.dropDownController("popupMenuDropDown");
                $('#dropDownMenu').slideToggle(100);
                e.stopPropagation();
                return false;
            });

            $(document).click(function () {
                PMP_Utils.dropDownController("");
            });

            $('#loginName').click(function () {
                event.stopPropagation();
            });

            $('#help').click(function () {
                var helpUrl = 'http://www.manageengine.com/products/passwordmanagerpro/help/';
                PMP_popup.openNewTab(helpUrl);
            });
        },
        processRequest: function (request, sender, sendResponse) {
            var action = request.action;
            var data = request.data;

            switch (action) {
                case 'isSessionExpired' :
                    $('#signout').click();
                    break;
            }
        },
        userSessionCheck: function () {

            browser.runtime.sendMessage({//	sends Message to Background
                'action': 'isAuthTokenValid',
                'data': null
            }, function (response) {
                $('#backToLoginForm').show();
                if (response.isValid === false) {
                    if(PMP_popup.isSSOEnabled)
                    {
                     PMP_Utils.checkJsessionID(PMP_popup.serverName);
                    }
                     if(PMP_popup.JSESSIONIDSSO==null)
                    {
                    PMP_popup.showLoginForm();
                    }
                    else
                    {
                        PMP_popup.mainTab();
                    } 
                } else {
                    PMP_popup.authToken = response.authToken;
                    PMP_popup.loginName = response.loginName;
                    PMP_popup.fullName = PMP_popup.loginName;
                    PMP_popup.userRoles = response.userRoles;
                    PMP_popup.USERID = response.USERID;
                    PMP_popup.isAutoLogonAccess = response.isAutoLogonAccess;
                    PMP_popup.isAutoFillAccess = response.isAutoFillAccess;
                    PMP_popup.enforceMaxTimeLimit=response.enforceMaxTimeLimit;
                    PMP_popup.ISPERSONALTABENABLED = response.ISPERSONALTABENABLED;
                    PMP_popup.isRoleAutoLogonAccess = response.isRoleAutologonAccess;
                    PMP_popup.isAccessCtrlAuthorize = response.isAccessCtrlAuthorize;
                    PMP_popup.isSSOEnabled=response.isSSOEnabled;
                    PMP_popup.enforcePreventBrowserAddAccount= response.enforcePreventBrowserAddAccount;
                    PMP_popup.mainTab();
                }
            });
        },
        openNewTab: function (resourceUrl) {

            browser.tabs.create({url: resourceUrl});
            window.close();

        },
        placeHolderValue: function () {
            var splitData = (PMP_popup.serverName).split(':');
            var hostname = splitData[0];
            var port = splitData[1];
            $('#hostname').val(hostname);
            $('#port').val(port);
        },
        getServerDetails: function () {

            $('#pmp_menu').hide();
            // document.getElementById('pmp_menu').style.visibility = 'hidden'; 

            $('#loginForm').hide();
            $('.PMP_Banner').show();
            $('#serverDetailForm').show();
            $('.serverStatusTable').show();

            if (PMP_popup.serverName !== null) {
                PMP_popup.placeHolderValue();
            }

            $('#hostname').focus();

            return false;
        },
        serverDetailsCheck: function (data, serverName) {

            var status = popupUtils.checkStatus(data);
            if (status === true) {                //  The build is a standard version

                PMP_popup.FIRSTFACTOR = data.operation.Details.FIRSFACTOR;                //  Happens when the session is valid (BG -> popup)
                PMP_popup.ISLOCALAUTHENABLED = data.operation.Details.ISLOCALAUTHENABLED;
                PMP_popup.DEFAULTDOMAIN = data.operation.Details.DEFAULTDOMAIN;
                PMP_popup.BUILDNUMBER = parseInt(data.operation.Details.BUILDNUMBER);
                PMP_popup.REBRANDLOGONAME = data.operation.Details.REBRANDLOGONAME;
                PMP_popup.BANNERLINK = data.operation.Details.BANNERLINK;
                PMP_popup.PRIVACYLINK = data.operation.Details.PRIVACYLINK;
                PMP_popup.loginButtonText = data.operation.Details.BANNERBUTTON;
                PMP_popup.BANNERMESSAGE = data.operation.Details.BANNERMESSAGE;
                PMP_popup.PRIVACYMESSAGE = data.operation.Details.PRIVACYMESSAGE;
                if (data.operation.Details.hasOwnProperty('ISSECONDFACTORENABLED') === true) {
                    PMP_popup.ISSECONDFACTORENABLED = data.operation.Details.ISSECONDFACTORENABLED;
             	}
                if (data.operation.Details.hasOwnProperty('SECONDFACTOR') === true) {
                    PMP_popup.SECONDFACTOR = data.operation.Details.SECONDFACTOR;             
                }
                if (data.operation.Details.hasOwnProperty('SESSIONTIMEOUT') === true) {
                    PMP_popup.SESSIONTIMEOUT = parseInt(data.operation.Details.SESSIONTIMEOUT);
					PMP_popup.LOGOUTTIME = 	PMP_popup.SESSIONTIMEOUT;
					browser.runtime.sendMessage({
                    'action': 'setLogOutTime',
                    'data': PMP_popup.LOGOUTTIME
                });					
                }
				if (data.operation.Details.hasOwnProperty('CLIPBOARDTIMEOUT') === true) {
                    PMP_popup.CLIPBOARDTIMEOUT = data.operation.Details.CLIPBOARDTIMEOUT; 
					browser.runtime.sendMessage({
                    'action': 'setClipBoardTimeOut',
                    'data': PMP_popup.CLIPBOARDTIMEOUT
                });					
                }
                if (typeof PMP_popup.loginButtonText === "undefined" || PMP_popup.loginButtonText === null || PMP_popup.loginButtonText === '') {
                    PMP_popup.loginButtonText = browser.i18n.getMessage("login");
                }
             /*   var logoutTimeOut = data.operation.Details.SESSIONTIMEOUT;
                var clipBoardTimeOut = data.operation.Details.CLIPBOARDTIMEOUT;
                if (PMP_popup.CLIPBOARDTIMEOUT === null) {                //  Set clipboard timeout value in the local storage
                    PMP_popup.CLIPBOARDTIMEOUT = clipBoardTimeOut;
                    PMP_popup.tempData = null;
                    browser.runtime.sendMessage({
                        'action': 'setClipBoardTimeOut',
                        'data': clipBoardTimeOut
                    });
                    $('#clipboardBoxText').text(PMP_popup.CLIPBOARDTIMEOUT + ' seconds');
                }
                if (PMP_popup.LOGOUTTIME === null) {                //  Set clipboard timeout value in the local storage
                    PMP_popup.LOGOUTTIME = logoutTimeOut;
                    PMP_popup.tempLogout = null;
                    browser.runtime.sendMessage({
                        'action': 'setLogOutTime',
                        'data': logoutTimeOut
                    });
                    $('#logoutBoxText').text(PMP_popup.LOGOUTTIME + ' minutes');
                }

*/
                var details = data.operation.Details;
                var domainList = new Array();
                if (PMP_popup.FIRSTFACTOR === 'AD' || PMP_popup.FIRSTFACTOR === 'AZUREAD') {
                    if (data.operation.Details.hasOwnProperty('DOMAINLIST') === true) {
                        domainList = data.operation.Details.DOMAINLIST;
                    }
                }

                var isSelected = false;

                $('#DOMAINNAMEDropDown').empty();

                for (var i = 0; i < domainList.length; i++) {                 //  this loop is for listing AD users
                    var DOMAINNAME = domainList[i].DOMAINNAME;
                    //DOMAINNAME = PMP_Utils.escapeQuotes(PMP_Utils.htmlEncode(DOMAINNAME));
                    if ((PMP_popup.DEFAULTDOMAIN !== '' && DOMAINNAME === PMP_popup.DEFAULTDOMAIN) || (PMP_popup.DEFAULTDOMAIN === '' && i === 0)) {
                        $('#DOMAINNAMEDropDown').append($("<li>", {class: "selected", domainValue: DOMAINNAME}).text(DOMAINNAME));
                        $('#DOMAINNAMEText').text(DOMAINNAME);
                        PMP_popup.DOMAINNAME = DOMAINNAME;
                        isSelected = true;
                        continue;
                    }
                    $('#DOMAINNAMEDropDown').append($("<li>", {domainValue: DOMAINNAME}).text(DOMAINNAME));
                }

                if (PMP_popup.FIRSTFACTOR === 'RADIUS') {
                    var radiusText = browser.i18n.getMessage("radius");
                    if (PMP_popup.DEFAULTDOMAIN === '')
                    {
                        $('#DOMAINNAMEDropDown').append($("<li>", {class: "selected", domainValue: "VASCO_AUTH"}).text(radiusText));
                    } else
                    {
                        $('#DOMAINNAMEDropDown').append($("<li>", {domainValue: "VASCO_AUTH"}).text(radiusText));
                    }
                    PMP_popup.DOMAINNAME = "VASCO_AUTH";
                    $('#DOMAINNAMEText').text(radiusText);
                    isSelected = true;
                } else if (PMP_popup.FIRSTFACTOR === 'LDAP') {
                    var ldapText = browser.i18n.getMessage("ldap");
                    if (PMP_popup.DEFAULTDOMAIN === '')
                    {
                        $('#DOMAINNAMEDropDown').append($("<li>", {class: "selected", domainValue: "LDAP"}).text(ldapText));
                    } else
                    {
                        $('#DOMAINNAMEDropDown').append($("<li>", {domainValue: "LDAP"}).text(ldapText));
                    }
                    PMP_popup.DOMAINNAME = "LDAP";
                    $('#DOMAINNAMEText').text(ldapText);
                    isSelected = true;
                }

                var localText = browser.i18n.getMessage("local_authentication");
                if (PMP_popup.ISLOCALAUTHENABLED === 'TRUE') {
                    if (isSelected === false)
                    {
                        $('#DOMAINNAMEDropDown').append($("<li>", {class: "selected", domainValue: "LOCAL"}).text(localText));
                    } else
                    {
                        $('#DOMAINNAMEDropDown').append($("<li>", {domainValue: "LOCAL"}).text(localText));
                    }
                    if (isSelected === false) {
                        PMP_popup.DOMAINNAME = 'LOCAL';
                        $('#DOMAINNAMEText').text(localText);
                    }
                } else if (domainList.length === 0 && isSelected === false) {
                    $('#DOMAINNAMEDropDown').append($("<li>", {class: "selected", domainValue: "LOCAL"}).text(localText));
                    //DOMAINNAMEDropDown += '<li class="selected" domainValue="LOCAL">'+ localText +'</li>';
                    PMP_popup.DOMAINNAME = 'LOCAL';
                    $('#DOMAINNAMEText').text(localText);
                }

                $('#DOMAINNAMEDropDown li').unbind('click');
                $('#DOMAINNAMEDropDown li').click(function (e) {
                    var domainValue = $(this).attr('domainValue');
                    var domainText = $(this).text();
                    //PMP_popup.DOMAINNAME = PMP_Utils.escapeQuotes(PMP_Utils.htmlEncode(domainValue));
                    PMP_popup.DOMAINNAME = domainValue;
                    $('#DOMAINNAMEText').text(domainText);
                    $('#DOMAINNAMEDropDown li').removeClass('selected');
                    $(this).addClass('selected');
                    $('#DOMAINNAMEDropDown').slideToggle(100);
                    e.stopPropagation();
                });


                $('#getOrgName').hide();
                $('#mspOrgRequired').hide();
                $('#serverNotReachable').hide();
                $('#serverDetailForm').hide();
                document.getElementById("serverDetailForm").reset();
                PMP_popup.serverName = serverName;

                if (PMP_popup.globalOrgName === '' || PMP_popup.globalOrgName === PMP_popup.orgName) {
                    PMP_popup.globalOrgName = PMP_popup.orgName;
                }
                var serverData = {
                    "serverName": serverName,
                    "orgName": PMP_popup.orgName,
                    "globalOrgName": PMP_popup.globalOrgName,
                    "SESSIONTIMEOUT": PMP_popup.SESSIONTIMEOUT,
                    "BUILDNUMBER": PMP_popup.BUILDNUMBER
                };
                browser.runtime.sendMessage({
                    'action': 'setServerDetails',
                    'data': serverData
                });
                document.getElementById("loginForm").reset();
                $('#captchafield').hide();
                $('#captchaimg').hide();
                PMP_popup.userSessionCheck();
            } else if (status === false) {         //  The build is an MSP version
                PMP_popup.CLIPBOARDTIMEOUT = PMP_popup.tempData;
                PMP_popup.LOGOUTTIME = PMP_popup.tempLogout;
                popupUtils.destroyData();
                browser.runtime.sendMessage({//	sends message to background
                    'action': 'clearAuthToken',
                    'data': null
                });
                $('.PMP_Banner').show();
                $('#serverDetailForm').show();
                $('.serverStatusTable').show();
                var isOrgNameDisplayed = $('#getOrgName').css('display');
                if(data.operation.result.message === 'API key received is not associated to any user. Authentication failed.'){
                    $('#invalidServerCredentials').fadeIn();
                    setTimeout(function () {
                           $('#invalidServerCredentials').fadeOut();
                    }, 2000);
                    return;
                }
                if(data.operation.name.toUpperCase() === 'RO_SERVER'){
                      displayText = chrome.i18n.getMessage("RO_server");
                       $('#invalidServerCredentials').text(displayText).fadeIn();
                       setTimeout(function () {
                                $('#invalidServerCredentials').fadeOut();
                       }, 4000);
                       return;
                }
                else if (isOrgNameDisplayed === 'block' || isOrgNameDisplayed === "table-row") {
                    $('#mspOrgRequired').fadeIn();
                    setTimeout(function () {
                            $('#mspOrgRequired').fadeOut();
                    }, 1000);
                    return;
                }
                $('#getOrgName').fadeIn();
                $('#orgName').focus();
            }
        },
        displayBannerLink: function () {
            var bannerLink = PMP_popup.BANNERLINK;
            if (typeof bannerLink !== "undefined" && bannerLink !== null && bannerLink !== '') {
                if (bannerLink.length > 20) {
                    $('.bannerLink').attr('title', PMP_popup.BANNERLINK);
                }
                $('.bannerLink').text(bannerLink);
                $('.bannerLink').show();
            } else {
                $('.bannerLink').hide();
            }
        },
        displayTfaBannerLink: function () {
            var bannerLink = PMP_popup.BANNERLINK;
            if (typeof bannerLink !== "undefined" && bannerLink !== null && bannerLink !== '') {
                if (bannerLink.length > 20) {
                    $('.tfaBannerLink').attr('title', PMP_popup.BANNERLINK);
                }
                $('.tfaBannerLink').text(bannerLink);
                $('.tfaBannerLink').show();
            } else {
                $('.tfaBannerLink').hide();
            }
        },
        displayPrivacyLink: function () {
            var privacyLink = PMP_popup.PRIVACYLINK;
            if (typeof privacyLink !== "undefined" && privacyLink !== null && privacyLink !== '') {
                if (privacyLink.length > 20) {
                    $('.privacyLink').attr('title', PMP_popup.PRIVACYLINK);
                }
                $('.privacyLink').text(privacyLink);
                $('.privacyLink').show();
            } else {
                $('.privacyLink').hide();
            }
        },
        displayTfaPrivacyLink: function () {
            var privacyLink = PMP_popup.PRIVACYLINK;
            if (typeof privacyLink !== "undefined" && privacyLink !== null && privacyLink !== '') {
                if (privacyLink.length > 20) {
                    $('.tfaPrivacyLink').attr('title', PMP_popup.PRIVACYLINK);
                }
                $('.tfaPrivacyLink').text(privacyLink);
                $('.tfaPrivacyLink').show();
            } else {
                $('.tfaPrivacyLink').hide();
            }
        },
        showLoginForm: function () {
            $('#serverDetailForm').hide();
            $('#pmp_menu').hide();
            $('.PMP_Banner').fadeIn();
            $('#loginForm').fadeIn();
            $(".loginButton").attr("disabled", false);
            var imgsrc;
            if (PMP_popup.REBRANDLOGONAME !== '') {
                imgsrc = 'https://' + PMP_popup.serverName + '/themes/passtrix/images/' + PMP_popup.REBRANDLOGONAME + '?' + Date();
            } else {
                imgsrc = "/images/pmp-logo.png";
            }
            $('.PMP_Banner').empty();
            $('.PMP_Banner').append($("<img>", {src: imgsrc}));
            if (PMP_popup.FIRSTFACTOR === 'AD' || PMP_popup.FIRSTFACTOR === 'RADIUS' || PMP_popup.FIRSTFACTOR === 'LDAP' || PMP_popup.FIRSTFACTOR === 'AZUREAD') {
                $('#getDOMAINNAME').show();
            } else {
                $('#getDOMAINNAME').hide();
            }

            var loginButtonText = PMP_popup.loginButtonText;
            if ((PMP_popup.ISSECONDFACTORENABLED === 'TRUE') && (PMP_popup.BUILDNUMBER<9802)) {
                $('#DOMAINNAMEDropDown').css('top', '111px');
                $('#pwdField').hide();
                var next = browser.i18n.getMessage("next");
                $('#loginForm').find('.loginButton').val(next);
                $('#tfaForm').find('.loginButton').val(loginButtonText);
                if (loginButtonText.length > 10) {
                    $('#tfaForm').find('.loginButton').attr('title', PMP_popup.loginButtonText);
                }
            } else {
                PMP_popup.displayBannerLink();
                PMP_popup.displayPrivacyLink();
                $('#DOMAINNAMEDropDown').css('top', '143px');
                $('#pwdField').show();
                $('#loginForm').find('.loginButton').val(loginButtonText);
                if (loginButtonText.length > 10) {
                    $('#loginForm').find('.loginButton').attr('title', PMP_popup.loginButtonText);
                }
            }

            $('#username').focus();
        },
        mainTab: function () {
            if(PMP_popup.enforcePreventBrowserAddAccount===true){
                var getting = browser.privacy.services.passwordSavingEnabled.get({});
                getting.then((got) => {
                if ((got.levelOfControl === "controlled_by_this_extension") || (got.levelOfControl === "controllable_by_this_extension")) {
                    var setting = browser.privacy.services.passwordSavingEnabled.set({
                        value: false
                    });     
                }
                });
            }
            $('.PMP_Banner').hide();
            $('#bannerMessageWrapper').hide();
            $('#privacyMessageWrapper').hide();
            $('#reasonRequired').hide();
            PMP_popup.hideOtherTabs();
            if (PMP_popup.BUILDNUMBER >= 8402 && PMP_popup.ISPERSONALTABENABLED === "true") {
                $('.personalPasswords').show();
                PMP_popup.allResourcesSelectedTabLeft = '29.5px';
                PMP_popup.resourceGroupsSelectedTabLeft = '104.5px';
                PMP_popup.favoritesSelectedTabLeft = '179.5px';
                PMP_popup.recentlyUsedSelectedTabLeft = '254.5px';
                PMP_popup.personalPasswordsSelectedTabLeft = '330.5px';

                $('.separator4').show();
                $('.separator3').show();
                $('.separator1').css('left', '75px');
                $('.separator2').css('left', '150px');
                $('.separator3').css('left', '225px');
                $('.separator4').css('left', '300px');

                $('#responseDataHeader li').css('width', '20%');
            } else {
                $('.personalPasswords').hide();
                PMP_popup.allResourcesSelectedTabLeft = '38px';
                PMP_popup.resourceGroupsSelectedTabLeft = '131px';
                PMP_popup.favoritesSelectedTabLeft = '225px';
                PMP_popup.recentlyUsedSelectedTabLeft = '318px';

                $('.separator4').hide();
                $('.separator3').show();
                $('.separator1').css('left', '92px');
                $('.separator2').css('left', '184px');
                $('.separator3').css('left', '276px');

                $('#responseDataHeader li').css('width', '25%');
            }


            $('.selectedTabArrow').show();
            $('.selectedTabArrow').css('left', PMP_popup.allResourcesSelectedTabLeft);
            $('#advancedSearch').show();
            $('#pmp_menu').fadeIn();
            $('#responseDataHeader').fadeIn();

            $('#loginName').empty();
            $('#loginName').append($("<div>", {class: "settingIcon"}).append($("<img>", {src: "/images/userIcon.svg"}))).append($("<div>", {class: "settingLabel", title: PMP_popup.loginName}).text(PMP_popup.loginName));
            $('#searchResource').focus();
            var searchAllResources = browser.i18n.getMessage("search_all_resource");
            $('#searchResource').attr('placeholder', searchAllResources);
            PMP_Utils.resourceTypeImageInitialize();
            PMP_popup.showOrgList("");

            var startIndex = 0;
            popupUtils.initializeData();                //  Initializing addon params

            PMP_popup.resourceViewType = 'ALLMYPASSWORD';
            popupUtils.getResources(startIndex);

        },
        //  SETTINGS TAB -------------------------------------------------------

        settingsTab: function () {

            $('#popupSettings').click(function (e) {
                var resourceHeader=browser.i18n.getMessage("settings");
                $('.resourceHeader').text(resourceHeader);
                PMP_popup.commonEventsOnTabClick();
                PMP_Utils.dropDownController('');
                if(PMP_popup.enforcePreventBrowserAddAccount){
                       document.getElementById("promptChk").disabled = true;
                }
                else{
                    document.getElementById("promptChk").disabled = false;
                }
                $('#resourceLoading').hide();
                $('.selectedTabArrow').hide();

                $('#settingsTab').fadeIn();

                PMP_popup.resetSearchBar();


                $('#SettingSaveButton').click(function () {
                	if(PMP_popup.enforceMaxTimeLimit && (parseInt($('#logoutBoxNew').val())>PMP_popup.SESSIONTIMEOUT))
                    {
                        var errorText = browser.i18n.getMessage("setting_error")+PMP_popup.SESSIONTIMEOUT+" "+browser.i18n.getMessage("minutes");
                        $('#settingError').text(errorText);
                        $('#settingError').fadeIn();
                        setTimeout(function () {
                            $('#settingError').fadeOut();
                        }, 1500);
                        return false;
                    }
                    //settings page Validation
                    let logoutBoxValue = (($('#logoutBoxNew').val()).trim());
                    let clipboardTimeoutValue = (($('#clipboardBoxNew').val()).trim());

                    var numberRegex = /^[0-9]+$/;
                    if(!(logoutBoxValue.match(numberRegex)) || !(clipboardTimeoutValue.match(numberRegex))){
                           var errorText = chrome.i18n.getMessage("number_error");
                           $('#settingError').text(errorText);
                           $('#settingError').fadeIn();
                           setTimeout(function () {
                                  $('#settingError').fadeOut();
                           }, 1000);
                           return false;
                    }

                    if(!$('#logoutBoxNew').val() || logoutBoxValue < 0 || !$('#clipboardBoxNew').val() || clipboardTimeoutValue < 0){
                         var errorText = chrome.i18n.getMessage("number_error");
                         $('#settingError').text(errorText);
                         $('#settingError').fadeIn();
                         setTimeout(function () {
                               $('#settingError').fadeOut();
                         }, 1000);
                         return false;
                    }

                    PMP_popup.CLIPBOARDTIMEOUT = parseInt($('#clipboardBoxNew').val());
                    PMP_popup.LOGOUTTIME = parseInt($('#logoutBoxNew').val());
                    browser.runtime.sendMessage({
                        'action': 'setClipBoardTimeOut',
                        'data': PMP_popup.CLIPBOARDTIMEOUT
                    });
                    browser.runtime.sendMessage({
                        'action': 'setLogOutTime',
                        'data': PMP_popup.LOGOUTTIME
                    });

                    if(!PMP_popup.enforcePreventBrowserAddAccount){
                        if ($("#promptChk").is(':checked')) {
                            var getting = browser.privacy.services.passwordSavingEnabled.get({});
                            getting.then((got) => {
                            if ((got.levelOfControl === "controlled_by_this_extension") ||
                                (got.levelOfControl === "controllable_by_this_extension")) {
                              var setting = browser.privacy.services.passwordSavingEnabled.set({
                                value: false
                              });
                            } else {
                              console.log("Not able to set passwordSavingEnabled");
                            }
                          });
                        } else {
                            var getting = browser.privacy.services.passwordSavingEnabled.get({});
                            getting.then((got) => {
                            if ((got.levelOfControl === "controlled_by_this_extension") ||
                            (got.levelOfControl === "controllable_by_this_extension")) {
                                var setting = browser.privacy.services.passwordSavingEnabled.set({
                                value: true
                            });
                            } else {
                                    console.log("Not able to set passwordSavingEnabled");
                                }
                        });
                        }
					}
                     
                    if ($("#enableAutoFillSubmit").is(':checked')) {
                        PMP_popup.isAutoFillSubmitEnabled = true;
                    } else
                    {
                        PMP_popup.isAutoFillSubmitEnabled = false;
                    }
                     if ($("#enableSSO").is(':checked')) {
                        PMP_popup.isSSOEnabled = true;
                    } else
                    {
                        PMP_popup.isSSOEnabled = false;
                    }
                    var settingsData={
                        "isAutoFillSubmitEnabled":PMP_popup.isAutoFillSubmitEnabled,
                        "isSSOEnabled":PMP_popup.isSSOEnabled
                    };
                    browser.runtime.sendMessage({
                        'action': 'setSettingsData',
                        'data': settingsData
                    });


                    PMP_popup.settingSavedMessage();

                });

                if (chrome.privacy.services.passwordSavingEnabled) {

                    chrome.privacy.services.passwordSavingEnabled.get({}, function (details) {
                        if (PMP_Utils.isValid(details.levelOfControl)) {
                            $('input[name=chromesavepassword]').attr('checked', !details.value);

                        }
                    });
                }
				else
				{
					 $('input[name=chromesavepassword]').attr('checked',false);
				}

                if (PMP_popup.isAutoFillSubmitEnabled)
                {
                    $('input[name=enableAutoFillSubmit]').attr('checked', true);
                } else
                {
                    $('input[name=enableAutoFillSubmit]').attr('checked', false);
                }
                if (PMP_popup.isSSOEnabled)
                {
                    $('input[name=enableSSO]').attr('checked', true);
                } else
                {
                    $('input[name=enableSSO]').attr('checked', false);
                }
               if(PMP_popup.enforceMaxTimeLimit === true){
                    PMP_popup.LOGOUTTIME=PMP_popup.SESSIONTIMEOUT;
                    $('#logoutBoxNew').val(PMP_popup.SESSIONTIMEOUT);
                }else{
                    $('#logoutBoxNew').val(PMP_popup.LOGOUTTIME);
                }
                    browser.runtime.sendMessage({
                        'action': 'setLogOutTime',
                        'data': PMP_popup.LOGOUTTIME
                    });
                e.stopPropagation();
                return false;

            });
            $('#about').click(function (e) {
                var resourceHeader=browser.i18n.getMessage("about");
                $('.resourceHeader').text(resourceHeader);
                 PMP_popup.commonEventsOnTabClick();
                 PMP_Utils.dropDownController('');
                $('#resourceLoading').hide();
                $('.selectedTabArrow').hide();

                $('#aboutTab').fadeIn();

                PMP_popup.resetSearchBar();
                var manifest = browser.runtime.getManifest();

                $('#buildNumberDisplay').text(PMP_popup.BUILDNUMBER);
                $('#addonVersionDisplay').text(manifest.version);
                e.stopPropagation();
                return false;

            });
            return false;
        },
        settingDropDown: function () {

            $('#clipboardBox').click(function (e) {
                PMP_Utils.dropDownController("clipBoardDropDown");
                $('#clipboardDropDown').slideToggle(100);
                e.stopPropagation();
            });

            $('#logoutBox').click(function (e) {
                PMP_Utils.dropDownController("logoutDropDown");
                $('#logoutDropDown').slideToggle(100);
                e.stopPropagation();
            });

            $('#clipboardDropDown li').click(function (e) {
                PMP_popup.CLIPBOARDTIMEOUT = $(this).val();
                var text = $(this).text();
                $('#clipboardBoxText').text(text);
                browser.runtime.sendMessage({
                    'action': 'setClipBoardTimeOut',
                    'data': PMP_popup.CLIPBOARDTIMEOUT
                });
                PMP_popup.settingSavedMessage();
                $('#clipboardDropDown').slideToggle(100);
                e.stopPropagation();
            });

            $('#logoutDropDown li').click(function (e) {
                PMP_popup.LOGOUTTIME = $(this).val();
                var text = $(this).text();
                $('#logoutBoxText').text(text);
                browser.runtime.sendMessage({
                    'action': 'setLogOutTime',
                    'data': PMP_popup.LOGOUTTIME
                });
                PMP_popup.settingSavedMessage();
                $('#logoutDropDown').slideToggle(100);
                e.stopPropagation();
            });

        },
        settingSavedMessage: function () {
            $('#settingSaved').fadeIn();
            setTimeout(function () {
                $('#settingSaved').fadeOut();
            }, 1000);
        },
        orgListClickEvent: function () {
            $('#orgListDropDown li').off('click').on('click', function () {
                PMP_popup.orgName = $(this).attr('orgValue');
                // PMP_popup.orgName = PMP_Utils.escapeQuotes(PMP_Utils.htmlEncode(PMP_popup.orgName));

                browser.runtime.sendMessage({
                    'action': 'setOrgName',
                    'data': PMP_popup.orgName
                }, function (response) {
                    if (response.status === true) {
                        $('#switchOrg').attr('title', PMP_popup.orgName);
                        $('#orgLoading').show();
                        setTimeout(function () {
                            PMP_popup.resetSearchBar();
                            popupUtils.initializeData();
                            PMP_popup.mainTab();
                            $('#orgLoading').fadeOut();
                            PMP_Utils.dropDownController("");
                            $('#searchOrg').val('');
                        }, 400);
                    } else {
                        return false;
                    }
                });
                return false;
            });
        },
        getOrgList: function () {
            browser.runtime.sendMessage({
                "action": "getOrgList",
                "data": null
            }, function (response) {
                if (response.isValid === false) {
                    $('#switchOrg').hide();
                    return false;
                } else {
                    PMP_popup.ORGLIST = response.ORGLIST;
                }
            });
        },
        showOrgList: function (searchingOrg) {           //  Includes functionalitites to list the selected org at first and a search function
            var orgList = PMP_popup.ORGLIST;
            if (orgList === null) {                       //  No need to display the org list
            	$('#switchOrg').hide();
                return false;
            }
            var totalOrgs = Object.keys(orgList).length;
            if (totalOrgs === 1) {                        //  No need to display the org list
                $('#switchOrg').hide();
                return false;
            } else {
                $('#switchOrg').show();
                $('#switchOrg').attr('title', PMP_popup.orgName);
            }
            $('#orgListDropDown').empty();
            var validOrgs = 0;
            var textToInsert = '';
            for (var key in orgList) {
                var orgUrlName = orgList[key].ORGURLNAME;
                var orgUrlName_lowercase = orgUrlName.toLocaleLowerCase();
                var orgName = orgList[key].ORGNAME;
                if ((orgUrlName_lowercase.search(searchingOrg) === -1) && (searchingOrg !== "")) {        //  Skip orgs that don't match the search string
                    continue;
                }
                validOrgs++;

                textToInsert = '<li orgValue="' + orgUrlName + '"';
                textToInsert +='title="' + orgName + '"' ;
                textToInsert += '><div class="MSPOrgNameLister">' + orgUrlName + '</div>';

                if (orgUrlName_lowercase === (PMP_popup.orgName.toLocaleLowerCase())) {             //  Check to find the selected org
                    textToInsert += '<div class="selectedMSPOrg"><img src="/images/selectedMSPOrg.svg"/></div></li>';
                    $('#orgListDropDown').prepend(textToInsert);
                    continue;
                }

                textToInsert += '</li>';
                $('#orgListDropDown').append(textToInsert);
            }
            if (validOrgs === 0) {
                var noOrgsFound = browser.i18n.getMessage("no_organizations_found");
                $('#orgListDropDown').append($("<div>", {class: "noMSPOrgsFound"}).text(noOrgsFound));
            }
            $('#orgListDropDown').scrollTop(0);
            PMP_popup.orgListClickEvent();

            return false;
        },
        accessControl: function () {
            $('#accessControl').click(function (e) {
                //PMP_popup.hideOtherTabs();
                PMP_popup.commonEventsOnTabClick();
                $('#resourceLoading').hide();
                $('#accessControlList').empty();
                $('#searchResource').val('');
                $('.selectedTabArrow').hide();
                $('#accessControlContainer').show();
                var searchPwdReq = browser.i18n.getMessage("search_password_access_requests");
                $('#searchResource').attr('placeholder', searchPwdReq);
                $('#advancedSearch').hide();
                PMP_popup.selectedTab = "accessControl";
                PMP_Utils.dropDownController("");
                popupUtils.getPasswordRequests('');
                e.stopPropagation();
            });
        },
        resetSearchBar: function () {
            $('#advancedSearch').show();
            $('#searchResource').val('');
            var searchAllResources = browser.i18n.getMessage("search_all_resource");
            $('#searchResource').attr('placeholder', searchAllResources);

            PMP_popup.selectedTab = "allPasswords";
            PMP_popup.resourceViewType = 'ALLMYPASSWORD';
            $('.selectedTabArrow').css('left', PMP_popup.allResourcesSelectedTabLeft);

            $('.selectedTabArrow').hide();
        },
        accessControlManualSearch: function (searchValue, str1, str2) {
            var searchValue_LC = searchValue.toLocaleLowerCase();
            var str1_LC = str1.toLocaleLowerCase();
            var str2_LC = str2.toLocaleLowerCase();
            return ((str1_LC.search(searchValue_LC) !== -1) || (str2_LC.search(searchValue_LC) !== -1)) ? true : false;
        },
        accessControlList: function (data, searchValue) {
            var parsed = data;
            var apiStatus = popupUtils.checkStatus(parsed);
            if (apiStatus === true) {
                var totalRows = parsed.operation.totalRows;
                var accessList = '';
                $('#accessControlList').empty();
                if (totalRows === 0) {
                    $('#accessControlList').append($("<div>", {class: "noRequests"}).text(browser.i18n.getMessage("no_pending_requests")));
                    return false;
                }

                var isRequestFound = false;

                var approveI18N = browser.i18n.getMessage("approve");
                for (var i = 0; i < totalRows; i++) {
                    var requesterName = parsed.operation.Details[i]["REQUESTED BY"];
                    var requesterFullName = parsed.operation.Details[i]["REQUESTED BY FULLNAME"];
                    var requesterUserId = parsed.operation.Details[i]["REQUESTER USERID"];
                    var requestList = parsed.operation.Details[i].PASSWORDREQUESTLIST;

                    var isRequesterNameMatchFound = (searchValue !== "") ? PMP_popup.accessControlManualSearch(searchValue, requesterName, requesterFullName) : true;
                    var accessListUL = document.getElementById("accessControlList");

                    for (var j = 0; j < requestList.length; j++) {
                        var resourceName = requestList[j]["RESOURCE NAME"];
                        var accountName = requestList[j]["ACCOUNT NAME"];
                        var requestTime = requestList[j]["REQUESTED TIME"];
                        var reason = requestList[j].REASON;
                        var resourceId = requestList[j]["RESOURCE ID"];
                        var accountId = requestList[j]["ACCOUNT ID"];
                        var passwdId = requestList[j]["PASSWD ID"];
                        var status = requestList[j].STATUS;
                        var totalApprovalAdminCount=requestList[j]["TOTAL APPROVAL ADMIN COUNT"];
			            var approvedAdminCount=requestList[j]["APPROVED ADMIN COUNT"];

                        if (searchValue !== "") {
                            var isMatchFound = PMP_popup.accessControlManualSearch(searchValue, resourceName, accountName);
                            if (isMatchFound === false && isRequesterNameMatchFound === false) {
                                continue;
                            }
                        }


                        var accessListLI = document.createElement("li");
                        accessListLI.setAttribute("passwdId", passwdId);
                        accessListLI.setAttribute("requesterUserId", requesterUserId);
                        accessListLI.setAttribute("status", status);

                        var reqTime = document.createElement("div");
                        reqTime.setAttribute("class", "requestedTime");
                        var reqTimeText = document.createTextNode(requestTime);
                        reqTime.appendChild(reqTimeText);
                        accessListLI.appendChild(reqTime);

                        var userDataHeader = document.createElement("div");
                        userDataHeader.setAttribute("class", "userDataHeader");
                        var bold = document.createElement("b");
                        var reqName = document.createTextNode(requesterName);
                        bold.appendChild(reqName);
                        userDataHeader.appendChild(bold);
                        accessListLI.appendChild(userDataHeader);

                        var userData1 = document.createElement("div");
                        userData1.setAttribute("class", "userData");
                        var u1col1 = document.createElement("div");
                        u1col1.setAttribute("class", "col_1");
                        var u1resName = document.createTextNode(browser.i18n.getMessage("resource_name"));
                        u1col1.appendChild(u1resName);
                        userData1.appendChild(u1col1);
                        var u1col2 = document.createElement("div");
                        u1col2.setAttribute("class", "col_2");
                        var u1colon = document.createTextNode(":");
                        u1col2.appendChild(u1colon);
                        userData1.appendChild(u1col2);
                        var u1col3 = document.createElement("div");
                        u1col3.setAttribute("class", "col_3");
                        if (resourceName.length > 20)
                        {
                            u1col3.setAttribute("title", resourceName);
                        }
                        var u1Text = document.createTextNode(resourceName);
                        u1col3.appendChild(u1Text);
                        userData1.appendChild(u1col3);
                        accessListLI.appendChild(userData1);

                        var userData2 = document.createElement("div");
                        userData2.setAttribute("class", "userData");
                        var u2col1 = document.createElement("div");
                        u2col1.setAttribute("class", "col_1");
                        var u2accName = document.createTextNode(browser.i18n.getMessage("account_name"));
                        u2col1.appendChild(u2accName);
                        userData2.appendChild(u2col1);
                        var u2col2 = document.createElement("div");
                        u2col2.setAttribute("class", "col_2");
                        var u2colon = document.createTextNode(":");
                        u2col2.appendChild(u2colon);
                        userData2.appendChild(u2col2);
                        var u2col3 = document.createElement("div");
                        u2col3.setAttribute("class", "col_3");
                        if (accountName.length > 20)
                        {
                            u2col3.setAttribute("title", accountName);
                        }
                        var u2Text = document.createTextNode(accountName);
                        u2col3.appendChild(u2Text);
                        userData2.appendChild(u2col3);
                        accessListLI.appendChild(userData2);

                        var userData3 = document.createElement("div");
                        userData3.setAttribute("class", "userData");
                        var u3col1 = document.createElement("div");
                        u3col1.setAttribute("class", "col_1");
                        var u3reason = document.createTextNode(browser.i18n.getMessage("reason"));
                        u3col1.appendChild(u3reason);
                        userData3.appendChild(u3col1);
                        var u3col2 = document.createElement("div");
                        u3col2.setAttribute("class", "col_2");
                        var u3colon = document.createTextNode(":");
                        u3col2.appendChild(u3colon);
                        userData3.appendChild(u3col2);
                        var u3col3 = document.createElement("div");
                        u3col3.setAttribute("class", "col_3");
                        if (reason.length > 20)
                        {
                            u3col3.setAttribute("title", reason);
                        }
                        var u3Text = document.createTextNode(reason);
                        u3col3.appendChild(u3Text);
                        userData3.appendChild(u3col3);
                        accessListLI.appendChild(userData3);


                        if (status === "In Use [Check In]" || status === "Yet To Use [Check In]") {

                            var userData4 = document.createElement("div");
                            userData4.setAttribute("class", "userData userDataStatus");
                            var u4col1 = document.createElement("div");
                            u4col1.setAttribute("class", "col_1");
                            var u4status = document.createTextNode(browser.i18n.getMessage("status"));
                            u4col1.appendChild(u4status);
                            userData4.appendChild(u4col1);
                            var u4col2 = document.createElement("div");
                            u4col2.setAttribute("class", "col_2");
                            var u4colon = document.createTextNode(":");
                            u4col2.appendChild(u4colon);
                            userData4.appendChild(u4col2);
                            var u4col3 = document.createElement("div");
                            u4col3.setAttribute("class", "col_3");
                            var u4statusText = (status === "In Use [Check In]") ? browser.i18n.getMessage("in_use") : browser.i18n.getMessage("yet_to_use");
                            var u4Text = document.createTextNode(u4statusText);
                            u4col3.appendChild(u4Text);
                            userData4.appendChild(u4col3);
                            accessListLI.appendChild(userData4);
                        }

                        var adminAction = document.createElement("div");
                        adminAction.setAttribute("class", "adminAction");

                        var rejectNode = document.createElement("div");
                        rejectNode.setAttribute("class", "reject buttonClass");
                        var rejectTextNode = document.createTextNode(browser.i18n.getMessage("reject"));
                        rejectNode.appendChild(rejectTextNode);

                        if (status === "[Approve] [Reject]") {
                            var approveButton = document.createElement("div");

                            if (requesterUserId == PMP_popup.USERID)
                            {
                                approveButton.setAttribute("class", "infoText tooltip");
                                approveButton.setAttribute("data_tooltip", browser.i18n.getMessage("same_user_approval"))
                            } else
                            {
                                approveButton.setAttribute("class", "approve");
                            }
                            approveButton.setAttribute("class", approveButton.getAttribute("class") + " buttonClass");
                            var approveText = document.createTextNode(browser.i18n.getMessage("approve"));
                            approveButton.appendChild(approveText);
                            accessListLI.appendChild(rejectNode);
                            accessListLI.appendChild(approveButton);
                        } else if (status === "In Use [Check In]" || status === "Yet To Use [Check In]")
                        {
                            var checkinButton = document.createElement("div");
                            checkinButton.setAttribute("class", "checkin buttonClass");
                            var checkinText = document.createTextNode(browser.i18n.getMessage("check_in"));
                            checkinButton.appendChild(checkinText);
                            accessListLI.appendChild(checkinButton);

                        } else if (status === "INUSEAPPROVAL[Reject]")
                        {
                            var activeUsername = PMP_popup.getRequestedUsername(parsed, resourceName, accountName);
                            accessListLI.appendChild(rejectNode);
                            var inuseButton = document.createElement("div");
                            inuseButton.setAttribute("class", "buttonClass infoText tooltip");
                            inuseButton.setAttribute("data_tooltip", browser.i18n.getMessage("in_use_approval_reject", activeUsername));
                            var inuseText = document.createTextNode(approveI18N);
                            inuseButton.appendChild(inuseText);
                            accessListLI.appendChild(inuseButton);
                        } else if (status === "MULTIAPPROVAL[Reject]")
                        {

                            accessListLI.appendChild(rejectNode);
                            var dualApprovalButton = document.createElement("div");
                            dualApprovalButton.setAttribute("class", "buttonClass infoText tooltip");
                            dualApprovalButton.setAttribute("data_tooltip", browser.i18n.getMessage("multi_approval_first_admin_approved"));
                            var dualApprovalText = document.createTextNode(approveI18N);
                            dualApprovalButton.appendChild(dualApprovalText);
                            accessListLI.appendChild(dualApprovalButton);
                        } else if (status === "")
                        {
                            accessListLI.appendChild(rejectNode);
                            var firstApprovalButton = document.createElement("div");
                            firstApprovalButton.setAttribute("class", "approve approve_blue buttonClass tooltip");
                            firstApprovalButton.setAttribute("data_tooltip", browser.i18n.getMessage("multi_approval_first_approval_admin", totalApprovalAdminCount));
                            var firstApprovalText = document.createTextNode(approveI18N);
                            firstApprovalButton.appendChild(firstApprovalText);
                            accessListLI.appendChild(firstApprovalButton);
                        } else
                        {
                            if (status.startsWith('MULTIAPPROVAL') === true && status.indexOf('[Reject]') !== -1)
                            {
                                var username = status.replace("MULTIAPPROVAL - ", "");
                                username = username.replace("[Reject]", "");
                                username = username.trim();
                                accessListLI.appendChild(rejectNode);
                                var dualApprovalUserButton = document.createElement("div");
                                dualApprovalUserButton.setAttribute("class", "approve buttonClass tooltip");
                                dualApprovalUserButton.setAttribute("data_tooltip", browser.i18n.getMessage("multi_approval_user", approvedAdminCount));
                                var dualApprovalUserText = document.createTextNode(approveI18N);
                                dualApprovalUserButton.appendChild(dualApprovalUserText);
                                accessListLI.appendChild(dualApprovalUserButton);
                            }
                        }


                        isRequestFound = true;
                        accessListUL.appendChild(accessListLI);
                    }

                }

                if (isRequestFound === false) {

                    $('#accessControlList').append($("<div>", {class: "noRequests"}).text(browser.i18n.getMessage("no_pending_requests")));
                    return false;
                }

            } else {
                PMP_popup.signoutCall();
                PMP_popup.serverConnectivityLost();
            }
            PMP_popup.adminActionClick();
        },
        getRequestedUsername: function (parsed, resourceName, accountName) {
            var totalRows = parsed.operation.totalRows;
            var requesterFullName = '', requestList = '',
                    userResourceName = '', userAccountName = '';
            for (var i = 0; i < totalRows; i++) {
                requesterFullName = parsed.operation.Details[i]["REQUESTED BY FULLNAME"];
                requestList = parsed.operation.Details[i].PASSWORDREQUESTLIST;
                for (var j = 0; j < requestList.length; j++) {
                    var status = requestList[j].STATUS;
                    if (status === "In Use [Check In]" || status === "Yet To Use [Check In]") {
                        userResourceName = requestList[j]["RESOURCE NAME"];
                        userAccountName = requestList[j]["ACCOUNT NAME"];
                        if (userAccountName === accountName && userResourceName === resourceName) {
                            return requesterFullName;
                        }
                    }
                }
            }
        },
        adminActionClick: function () {
            $('.buttonClass').click(function (e) {
                var approve = $(this).hasClass('approve');
                var reject = $(this).hasClass('reject');
                var checkin = $(this).hasClass('checkin');
                var requesterUserId = $(this).parent().attr('requesterUserId');
                var passwdId = $(this).parent().attr('passwdId');
                var operationName = '';

                if (approve === true) {
                    operationName = 'ADMIN_REQUEST_APPROVE';
                    popupUtils.adminRequest(passwdId, requesterUserId, operationName);
                } else if (reject === true) {
                    operationName = 'ADMIN_REQUEST_REJECT';
                    popupUtils.adminRequest(passwdId, requesterUserId, operationName);
                } else if (checkin === true) {
                    operationName = 'ADMIN_REQUEST_CHECKIN';
                    popupUtils.adminRequest(passwdId, requesterUserId, operationName);
                }
                e.stopPropagation();
            });
        },
        resourceDisplay: function (data, fetchingBatch) {                        //  Combined methods for loading first batch and subsequent batches of resources

            if (fetchingBatch === "firstBatchFetch") {
                PMP_Utils.hideAccountRelatedInfo();                         //  If accounts are listed and the user searches for resources
                $('#resourceDataDiv').fadeIn();
                $('#resourceDataDiv').empty();
                $('#resourceList').empty();
            }

            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            if (status === false) {
                PMP_popup.signoutCall();
                PMP_popup.serverConnectivityLost();
                return false;
            }
            if (!parsed.operation.hasOwnProperty('Details')) {
                if (fetchingBatch === "firstBatchFetch") {
                    var noPwdFound = browser.i18n.getMessage("no_passwords_found");
                    $('#resourceDataDiv').append($("<div>", {class: "noResources"}).text(noPwdFound));
                } else {      //  For loading subsequent batches, if server stops during request processing, then status will be success but 'Details' parameter will not be present
                    var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
                    $('#resourceDataDiv').append($("<div>", {class: "noResources"}).text(serverNotReachable));
                }
                return false;
            }

            if (fetchingBatch === "firstBatchFetch") {        //  Initialization is done only for the first batch of fetched resources
                PMP_popup.totalRows = parsed.operation.totalRows;
                PMP_popup.startIndex = 0;
            }

            var resourceArr = parsed.operation.Details;
            var resListUL;
            if (fetchingBatch === "firstBatchFetch")
            {

                resListUL = document.createElement("ul");
                resListUL.setAttribute("id", "resourceList");
            }
            if (fetchingBatch === "subsequentBatchFetch")
            {
                resListUL = document.getElementById("resourceList");
            }

            for (var i = 0; i < resourceArr.length; i++) {
                var resName = resourceArr[i]["RESOURCE NAME"];
                var resourceId = resourceArr[i]["RESOURCE ID"];
                var resourceType = resourceArr[i]["RESOURCE TYPE"];
                var totalAccounts = resourceArr[i].NOOFACCOUNTS;
                var iconPath = PMP_Utils.resourceTypeIcon(resourceType);
                var resLI = document.createElement("li");
                resLI.setAttribute("class", "resource");
                resLI.setAttribute("totalAcc", totalAccounts);
                resLI.setAttribute("resId", resourceId);
                var resTypeIconSpan = document.createElement("span");
                resTypeIconSpan.setAttribute("class", "resourceTypeIcon");
                var iconImg = document.createElement("img");
                iconImg.setAttribute("src", iconPath);
                resTypeIconSpan.appendChild(iconImg);
                var resNameDiv = document.createElement("div");
                resNameDiv.setAttribute("class", "resourceName");
                if (resName.length > 27) {
                    resNameDiv.setAttribute("title", resName);
                }
                var resNameText = document.createTextNode(resName);
                resNameDiv.appendChild(resNameText);
                resLI.appendChild(resTypeIconSpan);
                resLI.appendChild(resNameDiv);
                resListUL.appendChild(resLI);


            }


            if (fetchingBatch === "firstBatchFetch") {

                $('#resourceDataDiv').append(resListUL);
                if (PMP_popup.selectedTab === 'resourceGroups') {
                    $('#resourceList').css('height', '429px');
                } else {
                    $('#resourceList').css('height', '465px');
                }
            }

            PMP_popup.scrollResources();
            PMP_popup.detectResourceClick();
        },
        scrollResources: function () {
            var displayHeight = $('#resourceList').height();

            $('#resourceList').scroll(function () {
                var totalScrollHeight = document.getElementById('resourceList').scrollHeight;

                var scrollTop = $('#resourceList').scrollTop();         //  Position (from the top) upto which the scroll bar has been moved
                var scrolledUpto = displayHeight + scrollTop;
                var yetToScroll = totalScrollHeight - scrolledUpto;
                var index = (PMP_popup.isSearchQuery === true) ? PMP_popup.searchIndex : PMP_popup.startIndex;
                var haveToScroll = (PMP_popup.totalRows > (index + PMP_popup.LIMIT)) ? true : false;
                if (yetToScroll <= 1 && haveToScroll === true) {
                    $('#resourceList').unbind('scroll');
                    PMP_popup.loadMoreResources();
                }
            });
        },
        loadMoreResources: function () {
            var resources;
            if (PMP_popup.isSearchQuery === false) {
                PMP_popup.startIndex += PMP_popup.LIMIT;
                var startIndex = PMP_popup.startIndex;
                if (PMP_popup.selectedTab === 'resourceGroups') {
                    var length = PMP_popup.resourceGroupStack.length;
                    var groupId = PMP_popup.resourceGroupStack[length - 1];
                    resources = popupUtils.getGroupResources(startIndex, groupId);
                } else {
                    resources = popupUtils.getResources(startIndex);
                }
            } else if (PMP_popup.isSearchQuery === true) {
                PMP_popup.searchIndex += PMP_popup.LIMIT;
                var searchValue = PMP_popup.searchValue;
                resources = popupUtils.getSearchResult(searchValue);
            }
        },
        detectResourceClick: function () {
            $('#resourceDataDiv li').off('click').on('click', function () {//.click(function(){
                PMP_Utils.dropDownController("");

                if (PMP_popup.selectedTab === 'resourceGroups') {
                    $('#resourceGroupHeader').hide();
                    $('#resourceGroups').hide();
                }

                var resourceId = $(this).attr('resId');
                PMP_popup.totalAccounts = $(this).attr('totalAcc');
                PMP_popup.accountStartIndex = 0;
                PMP_popup.clickedResourceId = resourceId;
                popupUtils.getResourceAccounts(resourceId);
                return false;
            });
        },
        accountListDisplay: function (data, resourceId) {

            var parsed = data;
            var accListUL;
            var status = popupUtils.checkStatus(parsed);
            if (status === false) {
                PMP_popup.signoutCall();
                PMP_popup.serverConnectivityLost();
                return false;
            }
            var resourceUrl = "";
             if (!parsed.operation.hasOwnProperty('Details')) {
               
                    var noPwdFound = browser.i18n.getMessage("no_passwords_found");
                     $('#accountList').append($("<div>", {class: "noResources"}).text(noPwdFound));//  Check whether it should be displayed as No Resource Groups found
                    $('#accountList').show();
                    return false;
                   
            }
            if (parsed.operation.Details.hasOwnProperty("RESOURCE URL")) {
                resourceUrl = parsed.operation.Details["RESOURCE URL"];
                var splitArr = resourceUrl.match(/^(https?|ftp|file):\/\//i);
                if (splitArr === null && resourceUrl.startsWith('www.')) {        //  Append 'http' in urls where protocol is absent
                    resourceUrl = 'http://' + resourceUrl;
                }
            }
            var accountList = parsed.operation.Details["ACCOUNT LIST"];
            var resourceType = parsed.operation.Details["RESOURCE TYPE"];

            if (resourceId !== "") {
                var resourceName = parsed.operation.Details["RESOURCE NAME"];
               
                var description = parsed.operation.Details["RESOURCE DESCRIPTION"];
                var dnsName = parsed.operation.Details["DNS NAME"];
                var passwordPolicy = parsed.operation.Details["RESOURCE PASSWORD POLICY"];
                var department = parsed.operation.Details.DEPARTMENT;
                var location = parsed.operation.Details.LOCATION;
                var resourceOwner = parsed.operation.Details["RESOURCE OWNER"];
                var newSSHTerminal = parsed.operation.Details["NEWSSHTERMINAL"];
                var customField = '';
                if (parsed.operation.Details.hasOwnProperty("CUSTOM FIELD") === true) {
                    customField = parsed.operation.Details["CUSTOM FIELD"];
                }

                var allowOpenURLInBrowser = parsed.operation.Details["ALLOWOPENURLINBROWSER"];
                let isRDPRestricted = parsed.operation.Details["ISRDPRESTRICTED"];
                let isLocalAccountsAutologonRestricted = parsed.operation.Details["IS_LOCAL_ACCOUNTS_AUTOLOGON_RESTRICTED"];
                let isSSHRestricted = parsed.operation.Details["IS_SSH_RESTRICTED"];
                PMP_popup.resourceDetails = {
                    'Resource Name': resourceName,
                    'Resource Type': resourceType,
                    'DNS Name': dnsName,
                    'Resource Url': resourceUrl,
                    'Description': description,
                    'Password Policy': passwordPolicy,
                    'Department': department,
                    'Location': location,
                    'Resource Owner': resourceOwner,
                    'customField': customField,
                    'AllowOpenURLInBrowser':allowOpenURLInBrowser,
                    'NewSSHTerminal':newSSHTerminal,
                    'isRDPRestricted':isRDPRestricted,
                    'isLocalAccountsAutologonRestricted':isLocalAccountsAutologonRestricted,
                    'isSSHRestricted':isSSHRestricted,
                };

                var iconPath = PMP_Utils.resourceTypeIcon(resourceType);

                $('#accountListHeader').append($("<span>", {class: "resourceHeaderImage"}).append($("<img>", {src: iconPath})));
                $('#accountListHeader').append($("<div>", {class: "resourceHeader"})
                        .append($("<div>", {class: "resourceHeaderName", resId: resourceId, resType: resourceType, resourceUrl: resourceUrl}).text(resourceName))
                        .append($("<div>", {class: "resourceBackButton"}).append($("<img>", {src: "/images/icon_back.png"})))
                        .append($("<div>", {class: "resourceInfo", title: browser.i18n.getMessage("resource_description")}).append($("<img>", {src: "/images/resourceInfo.svg"}))));

                accListUL = document.createElement("ul");
                accListUL.setAttribute("class", "acc-list");

            } else {
				accListUL = document.createElement(null);
			}
            for (var i = 0; i < accountList.length; i++) {
                var passwordStatus = accountList[i]["PASSWORD STATUS"];
                var autoLogonList = [];
                if (accountList[i].hasOwnProperty("AUTOLOGONLIST") === true) {
                    var autoLogonListLength = accountList[i].AUTOLOGONLIST.length;
                    if (autoLogonListLength > 0) {
                        for (var j = 0; j < autoLogonListLength; j++) {
                            var autoLogonHelperValue = accountList[i].AUTOLOGONLIST[j];
                            if (PMP_popup.defaultAutoLogonList.indexOf(autoLogonHelperValue) !== -1) {
                                autoLogonList.push(autoLogonHelperValue);
                            }
                        }
                    }
                }
                autoLogonList = autoLogonList.toString();
                var logins = {
                    "username": accountList[i]["ACCOUNT NAME"],
                    "accountId": accountList[i]["ACCOUNT ID"],
                    "passwdId": accountList[i].PASSWDID,
                    "ISFAVPASS": accountList[i].ISFAVPASS,
                    "ISREASONREQUIRED": accountList[i].ISREASONREQUIRED,
                    "IS_TICKETID_REQD": accountList[i].IS_TICKETID_REQD,
                    "IS_TICKETID_REQD_ACW": accountList[i].IS_TICKETID_REQD_ACW,
                    "IS_TICKETID_REQD_MANDATORY": accountList[i].IS_TICKETID_REQD_MANDATORY,
                    "AUTOLOGONLIST": autoLogonList,
                    "isRDPRestricted":PMP_popup.resourceDetails["isRDPRestricted"],
                    "isLocalAccountsAutologonRestricted":PMP_popup.resourceDetails["isLocalAccountsAutologonRestricted"],
                    "isSSHRestricted":PMP_popup.resourceDetails["isSSHRestricted"],
                    'isTOTPConfigured':accountList[i].IS_TOTP_CONFIGURED,
                };

               
                var accListLI = document.createElement("li");
                accListLI.setAttribute("uName", logins.username);
                accListLI.setAttribute("passwdId", logins.passwdId);
                accListLI.setAttribute("isFavorite", logins.ISFAVPASS);
                accListLI.setAttribute("accountId", logins.accountId);
                accListLI.setAttribute("autoLogonList", logins.AUTOLOGONLIST);
                accListLI.setAttribute("passwordStatus", passwordStatus);
 		accListLI.setAttribute("isTOTPConfigured", logins.isTOTPConfigured);

               
                if (logins.ISFAVPASS === 'true') {
                    var remFavSpan = document.createElement("span");
                    remFavSpan.setAttribute("class", "favorite");
                    remFavSpan.setAttribute("title", browser.i18n.getMessage("remove_favorite"));
                    var remFavImg = document.createElement("img");
                    remFavImg.setAttribute("src", "/images/favoriteAccount.svg");
                    remFavSpan.appendChild(remFavImg);
                    accListLI.appendChild(remFavSpan);
                } else {
                    var setFavSpan = document.createElement("span");
                    setFavSpan.setAttribute("class", "favorite");
                    setFavSpan.setAttribute("title", browser.i18n.getMessage("set_as_favorite"));
                    var setFavImg = document.createElement("img");
                    setFavImg.setAttribute("src", "/images/notFavoriteAccount.svg");
                    setFavSpan.appendChild(setFavImg);
                    accListLI.appendChild(setFavSpan);
                }

                var accUserName = document.createElement("div");
                accUserName.setAttribute("class", "accUsername");
                if (logins.username.length > 25) {
                    accUserName.setAttribute("title", logins.username);
                }
                var accUnameText = document.createTextNode(logins.username);
                accUserName.appendChild(accUnameText);
                var accHoverTools = document.createElement("div");
                accHoverTools.setAttribute("class", "hoverTools");
                accHoverTools.setAttribute("ISREASONREQUIRED", logins.ISREASONREQUIRED);
                accHoverTools.setAttribute("IS_TICKETID_REQD", logins.IS_TICKETID_REQD);
                accHoverTools.setAttribute("IS_TICKETID_REQD_MANDATORY", logins.IS_TICKETID_REQD_MANDATORY);
                accHoverTools.setAttribute("IS_TICKETID_REQD_ACW", logins.IS_TICKETID_REQD_ACW);
                accHoverTools.setAttribute("isRDPRestricted", logins.isRDPRestricted);
                accHoverTools.setAttribute("isLocalAccountsAutologonRestricted", logins.isLocalAccountsAutologonRestricted);
                accHoverTools.setAttribute("isSSHRestricted", logins.isSSHRestricted);
                accListLI.appendChild(accUserName);
                accListLI.appendChild(accHoverTools);
                accListUL.appendChild(accListLI);
            }

            if (resourceId !== "") {

                var accountList = document.getElementById("accountList");
                accountList.appendChild(accListUL);


            } else {
				$('.acc-list').append(accListUL);
			}


            $('.acc-list li').each(function () {

                var autoLogonList = $(this).attr('autoLogonList');
                var pwdStatus = $(this).attr('passwordStatus');

		var isTOTPConfigured = $(this).attr('isTOTPConfigured');                
		PMP_popup.createHoverToolElements(pwdStatus, resourceType, resourceUrl, autoLogonList, this,isTOTPConfigured);


            });

            if (resourceId !== "") {
                PMP_popup.unbindOnAccountScroll();
                PMP_popup.viewResourceDetails(PMP_popup.resourceDetails);
                PMP_popup.resourceDetailFileDownload();
            }

            PMP_popup.accountListFunctionality();
            popupUtils.initiateCopyFunctions();
            PMP_popup.modifyFavorite();
            PMP_popup.goToUrl(resourceUrl);
            PMP_popup.launchRDPSession(resourceUrl);
            PMP_popup.scrollAccounts();
            PMP_popup.viewAccountDetails();
            PMP_popup.fileDownload();
            PMP_popup.accountDetailsBackButton();
            PMP_popup.requestPassword();
            PMP_popup.checkoutPassword();
            PMP_popup.checkinPassword();
        },
        createHoverToolElements: function (passwordStatus, resourceType, resourceUrl, autoLogonList, accListLI,isTOTPConfigured) {

            var passwordStatusCheck = (passwordStatus.indexOf('****') !== -1) ? true : false;
            var passwordAccessDenied = (passwordStatus.indexOf('####') !== -1) ? true : false;
            PMP_popup.isPasswordAccessDeniedForAccount = passwordAccessDenied;
            var isLaunchableResourceType = PMP_Utils.isValid(autoLogonList) === true ? true : false;
            var isDownloadableResourceType = (resourceType === "License Store" || resourceType === "Key Store" || resourceType === "File Store") ? true : false;

            var splitArr = resourceUrl.match(/^(https?|ftp|file):\/\//i);
            var isUrlAutologonCompatible = (resourceUrl !== "" && splitArr !== null && splitArr.length > 0) ? true : false;
            var accList = '';
            var accessControlEnabled = false;

            $(accListLI).find('.hoverTools').empty();
            if (passwordStatus === '[Request]') {
                var requestPassword = browser.i18n.getMessage("request");
                $(accListLI).find('.hoverTools').append($("<span>", {class: "requestPassword"}).text(requestPassword));
                accessControlEnabled = true;
            } else if (passwordStatus === '[Waiting for approval]') {
                var waitingForApproval = browser.i18n.getMessage("waiting_for_approval");
                $(accListLI).find('.hoverTools').append($("<span>", {class: "requestPassword disableClick"}).text(waitingForApproval));
                accessControlEnabled = true;
            } else if (passwordStatus === '[Check Out]') {
                var checkOut = browser.i18n.getMessage("check_out");
                $(accListLI).find('.hoverTools').append($("<span>", {class: "checkoutPassword"}).text(checkOut));
                accessControlEnabled = true;
            } else if (passwordStatus.indexOf('[Check In]') !== -1) {           //else if(passwordStatus === '****[Check In]'){
                var checkIn = browser.i18n.getMessage("check_in");
                $(accListLI).find('.hoverTools').append($("<span>", {class: "checkinPassword"}).text(checkIn));
                accessControlEnabled = true;
            } else if (passwordStatus === '[In Use]') {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "requestPassword disableClick", title: browser.i18n.getMessage("password_is_currently_used")}).text(browser.i18n.getMessage("in_use")));
                accessControlEnabled = true;
            }

            var autoLogonI18N = browser.i18n.getMessage("auto_logon");
            if (isLaunchableResourceType === true && (passwordStatusCheck === true || passwordAccessDenied === true) && PMP_popup.isAutoLogonAccess === true && PMP_popup.isRoleAutoLogonAccess === true) {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "launchRDP", title: autoLogonI18N, passwordStatusCheck: passwordStatusCheck, passwordAccessDenied: passwordAccessDenied}).append($("<img>", {src: "/images/autoLogon.png"})));
            } else if (isDownloadableResourceType === false && (passwordStatusCheck === true || passwordAccessDenied === true) && PMP_popup.isAutoLogonAccess === true && isUrlAutologonCompatible === true && PMP_popup.isRoleAutoLogonAccess === true) {// !== "[Request]" && resourceUrl !== ""){
                $(accListLI).find('.hoverTools').append($("<span>", {class: "autoLogon", title: autoLogonI18N}).append($("<img>", {src: "/images/autoLogon.png"})));
            } else if ((passwordStatusCheck === true || passwordAccessDenied === true) && PMP_popup.isAutoLogonAccess === true && PMP_popup.isRoleAutoLogonAccess === true && isUrlAutologonCompatible === false) {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "autoLogonDisabled", title: browser.i18n.getMessage("autologon_helper_is_not_configured")}).append($("<img>", {src: "/images/autoLogon.png"})));
            } else if (PMP_popup.isAutoLogonAccess === false && PMP_popup.isRoleAutoLogonAccess === true && (passwordStatusCheck === true || passwordAccessDenied === true)) {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "autoLogonDisabled", title: browser.i18n.getMessage("autologon_access_disabled_by_admin")}).append($("<img>", {src: "/images/autoLogon.png"})));
            }

            if (passwordStatusCheck === true || passwordAccessDenied === true) {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "copyUname", title: browser.i18n.getMessage("copy_user_name")}).append($("<img>", {src: "/images/copy_username.png"})));
                if(!isDownloadableResourceType){
                    if(isTOTPConfigured === "true"){
                        $(accListLI).find('.hoverTools').append($("<span>", {class: "copyTOTP", title: browser.i18n.getMessage("copy_totp")}).append($("<img>", {src: "/images/totp.png"})));
                    }
                    else{
                        $(accListLI).find('.hoverTools').append($("<span>", {class: "copyTOTPDisabled", title: browser.i18n.getMessage("totp_not_configured")}).append($("<img>", {src: "/images/totp.png"})));
                    }
                }
            }

            

            if (isDownloadableResourceType === false && passwordStatusCheck === true) {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "copyPwd", title: browser.i18n.getMessage("copy_password")}).append($("<img>", {src: "/images/copy_password.png"})));
            } else if (isDownloadableResourceType === false && passwordAccessDenied === true) {
                $(accListLI).find('.hoverTools').append($("<span>", {class: "copyPwdDisabled", title: browser.i18n.getMessage("password_viewing_permission_denied")}).append($("<img>", {src: "/images/copy_password.png"})));
            } else if (isDownloadableResourceType === true && passwordStatusCheck === false && (passwordStatus.indexOf('[Check In]') !== -1 || accessControlEnabled === false)) {
                var fileName = passwordStatus;
                var regex = '(.*)(\\[Check In\])$';
                fileName = (passwordStatus.indexOf('[Check In]') !== -1) ? passwordStatus.match(regex)[1] : fileName;
                $(accListLI).find('.hoverTools').append($("<span>", {class: "copyUname", title: browser.i18n.getMessage("copy_user_name")}).append($("<img>", {src: "/images/copy_username.png"})));
                $(accListLI).find('.hoverTools').append($("<span>", {class: "fileDownload", title: fileName}).append($("<a>", {class: "pmpDownloadLink"}).append($("<img>", {src: "/images/downloadFile.png"}))));
            }



        },
        replaceUrlPlaceHolders: function (resourceUrl, accountName, password) {
            resourceUrl = PMP_popup.replaceAll(resourceUrl, "%RESOURCE_NAME%", PMP_popup.resourceDetails['Resource Name']);
            resourceUrl = PMP_popup.replaceAll(resourceUrl, "%DNS_NAME%", PMP_popup.resourceDetails['DNS Name']);
            var responseData = {
                'domainUrl': '',
                'formParams': ''
            };
            if (resourceUrl.indexOf("%PASSWORD%") !== -1) {
                var paramUrl = '';
                var passParam = '';
                var nameParam = '';
                var paramsList = {};
                var resourceUrlSplit = resourceUrl.split("?");
                var domainUrl = resourceUrlSplit[0];

                if (resourceUrlSplit.length === 2) {
                    paramUrl = resourceUrlSplit[1];
                }
                if (paramUrl !== null) {
                    var resourceUrlVal = paramUrl.split("&");
                    var k = 0;

                    for (var i = 0; i < resourceUrlVal.length; i++) {
                        var resourceUrlParams = resourceUrlVal[i];
                        if (resourceUrlParams.indexOf("%PASSWORD%") !== -1) {
                            passParam = PMP_popup.replaceAll(resourceUrlParams, "=%PASSWORD%", "");
                            passParam = passParam.trim();
                        } else if (resourceUrlParams.indexOf("%ACCOUNT_NAME%") !== -1) {
                            if (resourceUrlParams.indexOf("?") !== -1) {
                                resourceUrlParams = resourceUrlParams.substring(resourceUrlParams.indexOf("?") + 1);
                            }
                            nameParam = PMP_popup.replaceAll(resourceUrlParams, "=%ACCOUNT_NAME%", "");
                            nameParam = nameParam.trim();
                        } else if (resourceUrlParams.trim() !== "") {
                            var key1 = "paramName" + k;
                            var key2 = "paramValue" + k;
                            var paramVal = resourceUrlParams.split("=");
                            paramsList[key1] = paramVal[0];
                            paramsList[key2] = (paramVal.length === 2) ? paramVal[1] : "";
                            k++;
                        }
                    }
                }
                var formParams = '';
                if (passParam !== null) {
                    formParams += '<input type="hidden" name="' + passParam + '" value = "' + password + '">';
                }
                if (nameParam !== null) {
                    formParams += '<input type="hidden" name="' + nameParam + '" value = "' + accountName + '">';
                }
                var paramsListLength = paramsList.length;
                for (var l = 0; l < paramsListLength / 2; l++) {
                    var key1 = "paramName" + l;
                    var key2 = "paramValue" + l;
                    var fieldName = paramsList[key1];
                    var fieldValue = paramsList[key2];
                    formParams += '<input type="hidden" name="' + fieldName + '" value="' + fieldValue + '">';
                }
                responseData.domainUrl = domainUrl;
                responseData.formParams = formParams;
                return responseData;
            } else {
                responseData.domainUrl = PMP_popup.replaceAll(resourceUrl, "%ACCOUNT_NAME%", accountName);
                return responseData;
            }


        },
        replaceAll: function (resourceUrl, regex, replacementString) {
            regex = new RegExp(regex, 'g');
            return resourceUrl.replace(regex, replacementString);
        },
        viewResourceDetails: function (resourceDetails) {

            var resDetail;
            resDetail = document.getElementById("resourceDetailsList");
            if (!resDetail)
            {
                resDetail = document.createElement("ul");
                resDetail.setAttribute("id", "resourceDetailsList");
            }
            $("#resourceDetailsList").empty();
            var copyText = browser.i18n.getMessage("copy");
            for (var key in resourceDetails) {
                if (key === 'customField') {
                    break;
                }
                var keyText = PMP_popup.getKeyText(key);
                var resDetLI = document.createElement("li");

                var resLabel = document.createElement("div");
                resLabel.setAttribute("class", "resourceLabel");
                resLabel.setAttribute("fieldtype", "Character");
                var resLabelText = document.createTextNode(keyText);
                resLabel.appendChild(resLabelText);
                resDetLI.appendChild(resLabel);

                var copyResDet = document.createElement("div");
                copyResDet.setAttribute("class", "copyResourceDetails");
                copyResDet.setAttribute("title", copyText);
                var copyImg = document.createElement("img");
                copyImg.setAttribute("src", "/images/copy.png");
                copyResDet.appendChild(copyImg);
                resDetLI.appendChild(copyResDet);

                var resValue = document.createElement("div");
                resValue.setAttribute("class", "resourceValue");
                var resValText = document.createTextNode(resourceDetails[key]);
                resValue.appendChild(resValText);
                resDetLI.appendChild(resValue);

                resDetail.appendChild(resDetLI);

            }

            var customFields = resourceDetails.customField;
            if (customFields.length !== 0 && customFields !== "") {
                var fieldType = '', label = '', value = '', columnName = '';
                for (var i = 0; i < customFields.length; i++) {
                    fieldType = customFields[i].CUSTOMFIELDTYPE;
                    columnName = customFields[i].CUSTOMFIELDCOLUMNNAME;
                    label = customFields[i].CUSTOMFIELDLABEL;
                    value = customFields[i].CUSTOMFIELDVALUE;
                    var resDetLI = document.createElement("li");

                    var resLabel = document.createElement("div");
                    resLabel.setAttribute("class", "resourceLabel");
                    resLabel.setAttribute("fieldtype", fieldType);
                    var resLabelText = document.createTextNode(label);
                    resLabel.appendChild(resLabelText);
                    resDetLI.appendChild(resLabel);

                    var copyResDet = document.createElement("div");
                    var copyImg = document.createElement("img");
                    if (fieldType === "File") {
                        copyResDet.setAttribute("class", "downloadResourceDetails");
                        copyResDet.setAttribute("title", browser.i18n.getMessage("download_file"));
                        copyImg.setAttribute("src", "/images/downloadFile.png");
                    } else
                    {
                        copyResDet.setAttribute("class", "copyResourceDetails");
                        copyResDet.setAttribute("title", copyText);
                        copyImg.setAttribute("src", "/images/copy.png");
                    }



                    copyResDet.appendChild(copyImg);
                    resDetLI.appendChild(copyResDet);

                    var resValue = document.createElement("div");
                    resValue.setAttribute("class", "resourceValue");
                    resValue.setAttribute("fileName", value);
                    resValue.setAttribute("columnName", columnName);
                    var resValText = document.createTextNode(value);
                    resValue.appendChild(resValText);
                    resDetLI.appendChild(resValue);

                    resDetail.appendChild(resDetLI);



                }
            }

            var resDetBody = document.getElementById("resourceDetailsBody");
            resDetBody.appendChild(resDetail);
            PMP_popup.resourceDetailsHover();

            $('.resourceInfo').click(function () {
                PMP_Utils.hideAccountRelatedInfo();
                $('#resourceDetails').fadeIn();
                $('.resourceDetailsBackButton').unbind('click');
                $('.resourceDetailsBackButton').click(function () {
                    $('#resourceDetails').hide();
                    $('#accountList').show();
                    $('#accountListHeader').show();
                });
            });


        },
        getKeyText: function (key) {
            switch (key)
            {
                case "Resource Name" :
                    return browser.i18n.getMessage("resource_name");
                    break;
                case "Description" :
                    return browser.i18n.getMessage("description");
                    break;
                case "Resource Type" :
                    return browser.i18n.getMessage("resource_type");
                    break;
                case "DNS Name" :
                    return browser.i18n.getMessage("dns_name");
                    break;
                case "Password Policy" :
                    return browser.i18n.getMessage("password_policy");
                    break;
                case "Department" :
                    return browser.i18n.getMessage("department");
                    break;
                case "Location" :
                    return browser.i18n.getMessage("location");
                    break;
                case "Resource Url" :
                    return browser.i18n.getMessage("resource_url");
                    break;
                case "Resource Owner" :
                    return browser.i18n.getMessage("resource_owner");
                    break;
                default :
                    return "";
            }
        },
        addUserAccountBackButtonClick: function () {
            $('.addUserAccountBackButton').unbind('click');
            $('.addUserAccountBackButton').click(function () {
                if (PMP_popup.isResourceAdded === true) {
                    PMP_popup.accountStartIndex = 0;
                    var resourceId = PMP_popup.clickedResourceId;
                    popupUtils.getResourceAccounts(resourceId);
                } else {
                    $('#accountListHeader').fadeIn();
                    $('.acc-list').fadeIn();
                }
                $('#reasonFailed').hide();
                $('#addResourceContainer').hide();
            });
        },
        resourceDetailsHover: function () {
            $('#resourceDetailsBody li').mouseover(function () {
                var value = $(this).find('.resourceValue').text();
                var fieldType = $(this).find('.resourceLabel').attr('fieldType');
                if (fieldType === "File" && value !== '-') {
                    $(this).find('.downloadResourceDetails').show();
                } else if (value !== null && value !== "") {
                    $(this).find('.copyResourceDetails').show();
                }
            });

            $('#resourceDetailsBody li').mouseout(function () {
                var value = $(this).find('.resourceValue').text();
                var fieldType = $(this).find('.resourceLabel').attr('fieldType');
                if (fieldType === "File") {
                    $(this).find('.downloadResourceDetails').hide();
                } else if (value !== null && value !== "") {
                    $(this).find('.copyResourceDetails').hide();
                }
            });

            $('.copyResourceDetails').click(function () {
                var copyText = $(this).next().closest('.resourceValue').text();
                popupUtils.copyString(copyText);
                popupUtils.copiedMessage();
            });
        },
        requestPassword: function () {
            $('.requestPassword').click(function (e) {

                var disableClick = $(this).hasClass('disableClick');
                if (disableClick === true) {
                    e.stopPropagation();
                    return false;
                }

                var accountName = $(this).parent().parent().attr('uname');
                var passwdId = $(this).parent().parent().attr('passwdid');
                var isTicketIdRquiredACW = $(this).parent().attr('is_ticketid_reqd_acw');
                var isTicketIdMandatory = $(this).parent().attr('is_ticketid_reqd_mandatory');

                if (isTicketIdRquiredACW === 'true') {
                    $('#getTicket_request').show();
                } else {
                    $('#getTicket_request').hide();
                }

                PMP_Utils.hideAccountRelatedInfo();
                $('#ticketId_request input').val('');
                $('#passwordReasonComment').val('');
                $('#passwordReasonPopup').show();
                isTicketIdRquiredACW === 'true' ? $('#ticketId_request input').focus() : $('#passwordReasonComment').focus();
                $('#accountNameRequest').text(accountName);

                PMP_popup.requestPasswordReason(passwdId, isTicketIdRquiredACW, isTicketIdMandatory);//, isTicketIdRequired);
                e.stopPropagation();
            });

        },
        requestPasswordReason: function (passwdId, isTicketIdRquiredACW, isTicketIdMandatory) {//, isTicketIdRequired){
            $('#cancelRequest').off('click').on('click', function (e) {
                $('#reasonFailed').hide();
                PMP_popup.hidePasswordReasonPopup();
                e.stopPropagation();
            });

            $('#sendRequest').off('click').on('click', function (e) {

                //  make checks for ticket id
                var ticketId = '';
                if (isTicketIdRquiredACW === 'true') {
                    ticketId = ($('#ticketId_request').find('input').val()).trim();

                    var ticketIdCheck = PMP_Utils.hasHarmfulContent(ticketId);
                    ticketIdCheck = ticketIdCheck && PMP_Utils.isTicketIdValid(ticketId);
                    if ((isTicketIdMandatory === 'true' && PMP_Utils.isValid(ticketId) === false) || ticketIdCheck === false) {
                        var enterValidTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                        PMP_Utils.reasonFailedMessage(enterValidTcktId);
                        $('#ticketId_request').find('input').focus();
                        return false;
                    }
                }

                var requestText = ($('#passwordReasonComment').val()).trim();
                var requestTextCheck = PMP_Utils.hasHarmfulContent(requestText);
                if (requestTextCheck === false) {//|| ticketIdCheck === false){
                    var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                    PMP_Utils.reasonFailedMessage(harmfulContent);
                    $('#passwordReasonComment').focus();
                    return false;
                }

                requestText = encodeURIComponent(requestText);


                if (requestText === "") {
                    var enterComment = browser.i18n.getMessage("comments_cannot_be_empty");
                    PMP_Utils.reasonFailedMessage(enterComment);
                    $('#passwordReasonComment').focus();
                    return false;
                }

                if (requestText !== "") {//&& ((isTicketIdMandatory === 'true' && ticketId !=="") || (isTicketIdMandatory === 'false')) ){
                    $('#reasonFailed').hide();
                    popupUtils.requestPasswordAPI(requestText, passwdId, ticketId);
                }

                e.stopPropagation();

            });
        },
        requestPasswordReasonSuccess: function (data, passwdId) {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            if (status === true) {
                var passwordStatus = parsed.operation.Details.STATUS;
                var resourceType = $('.resourceHeaderName').attr('resType');
                var resourceUrl = $('.resourceHeaderName').attr('resourceUrl');

                $('.acc-list li').each(function () {

                    var tempPasswdId = $(this).attr('passwdId');
                    if (tempPasswdId === passwdId) {
                        var autoLogonList = $(this).attr('autoLogonList');
                        let isTOTPConfigured = $(this).attr('isTOTPConfigured');
                        PMP_popup.createHoverToolElements(passwordStatus, resourceType, resourceUrl, autoLogonList, this,isTOTPConfigured);
                        if (passwordStatus === "[Check Out]") {
                            PMP_popup.checkoutPassword();
                        } else {
                            PMP_popup.requestPassword();
                        }
                        return false;
                    }
                });
                PMP_popup.hidePasswordReasonPopup();
            } else {
                var enterValidTcktId = '';
                if (parsed.operation.result.message === browser.i18n.getMessage("password_request_can't_be_raised")) {
                    enterValidTcktId = browser.i18n.getMessage('unable_to_validate_ticketid');
                } else {
                    enterValidTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                }
                PMP_Utils.reasonFailedMessage(enterValidTcktId);
                $('#ticketId_request').find('input').focus();
                return false;
            }
        },
        checkoutPassword: function () {
            $('.checkoutPassword').click(function (e) {

                var disableClick = $(this).hasClass('disableClick');
                if (disableClick === true) {
                    e.stopPropagation();
                    return false;
                }

                var passwdId = $(this).parent().parent().attr('passwdid');
                $('#checkoutPasswordPopup').show();
                PMP_popup.confirmPasswordCheckout(passwdId);
                e.stopPropagation();
            });
        },
        confirmPasswordCheckout: function (passwdId) {
            $('#cancelCheckout').off('click').on('click', function () {
                $('#checkoutPasswordPopup').fadeOut();
            });

            $('#confirmCheckout').off('click').on('click', function () {
                popupUtils.confirmCheckout(passwdId);
                $('#checkoutPasswordPopup').fadeOut();
            });
        },
        confirmCheckoutSuccess: function (data, passwdId) {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            if (status === true) {
                var passwordStatus = parsed.operation.Details.STATUS;
                var resourceType = $('.resourceHeaderName').attr('resType');
                var resourceUrl = $('.resourceHeaderName').attr('resourceUrl');
                if ((passwordStatus.indexOf("****") == -1))
                {
                    $("#checkoutLater").text(passwordStatus);
                    $("#checkoutLater").fadeIn();
                    setTimeout(function () {
                        $('#checkoutLater').fadeOut();
                    }, 2000);
                }
                $('.acc-list li').each(function () {
                    var tempPasswdId = $(this).attr('passwdId');
                    if (tempPasswdId === passwdId) {
                        $(this).find('.checkoutPassword').remove();
                        var autoLogonList = $(this).attr('autoLogonList');
                        let isTOTPConfigured = $(this).attr('isTOTPConfigured');
                        var accList = PMP_popup.createHoverToolElements(passwordStatus, resourceType, resourceUrl, autoLogonList, this,isTOTPConfigured);
                        $(this).find('.hoverTools').prepend(accList);

                        PMP_popup.goToUrl(resourceUrl);
                        PMP_popup.launchRDPSession(resourceUrl);
                        popupUtils.initiateCopyFunctions();
                        PMP_popup.fileDownload();
                        PMP_popup.checkinPassword();
                        return false;
                    }
                });
            }
        },
        checkinPassword: function () {
            $('.checkinPassword').click(function (e) {

                var disableClick = $(this).hasClass('disableClick');
                if (disableClick === true) {
                    e.stopPropagation();
                    return false;
                }

                var passwdId = $(this).parent().parent().attr('passwdid');
                $('#checkinPasswordPopup').show();
                PMP_popup.confirmPasswordCheckin(passwdId);
                e.stopPropagation();
            });
        },
        confirmPasswordCheckin: function (passwdId) {
            $('#cancelCheckin').off('click').on('click', function () {
                $('#checkinPasswordPopup').fadeOut();
            });

            $('#confirmCheckin').off('click').on('click', function () {
                popupUtils.confirmCheckin(passwdId);
                $('#checkinPasswordPopup').fadeOut();
            });
        },
        confirmCheckinSuccess: function (data, passwdId) {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            if (status === true) {
                $('.acc-list li').each(function () {
                    var tempPasswdId = $(this).attr('passwdId');
                    if (tempPasswdId === passwdId) {
                        $(this).find('.hoverTools').empty();
                        $(this).find('.hoverTools').append($("<span>", {class: "requestPassword"}).text(browser.i18n.getMessage("request")));
                        PMP_popup.requestPassword();
                        return false;
                    }
                });
            }
        },
        hidePasswordReasonPopup: function () {
            $('#passwordReasonPopup').hide();
            $('#ticketId_request input').val('');
            $('#passwordReasonComment').val('');
            $('.resourceHeader').show();
            $('#accountList').show();
            $('#accountListHeader').show();
        },
        viewAccountDetails: function () {
            $('.acc-list li').click(function () {

                var accountId = $(this).attr('accountid');
                var accountName = $(this).attr('uname');
                var resourceId = $('.resourceHeaderName').attr('resId');
                var isFavorite = $(this).attr('isfavorite');
                PMP_Utils.hideAccountRelatedInfo();

                $('#accountDetails').show();
                $('.accountFavorite').empty();
                $('.accountDetailsHeaderName').text(accountName);
                var favIconDecider = (isFavorite === 'true') ? "/images/favoriteAccount.svg" : "/images/notFavoriteAccount.svg";
                var remFav = browser.i18n.getMessage("remove_favorite");
                var setFav = browser.i18n.getMessage("set_as_favorite");
                var title = (isFavorite === 'true') ? remFav : setFav;
                $('.accountFavorite').append($("<img>", {src: favIconDecider}));

                $('.accountFavorite').attr('isfavorite', isFavorite);
                $('.accountFavorite').attr('title', title);
                $('#accountDetailsBody').empty();
                popupUtils.getAccountDetails(resourceId, accountId);

            });
        },
        displayAccountDetails: function (data, resourceId, accountId) {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            var passwdId;
            if (status === true) {
                var description = data.operation.Details.DESCRIPTION;
                var passwdId = data.operation.Details.PASSWDID;
                var lastAccessedTime = data.operation.Details["LAST ACCESSED TIME"];
                $('#accountDetailsBody').empty();
                var copyContentDiv = document.createElement("div");
                copyContentDiv.setAttribute("class", "copyAccountDetails");
                copyContentDiv.setAttribute("title", browser.i18n.getMessage("copy"));
                var copyContentImg = document.createElement("img");
                copyContentImg.setAttribute("src", "/images/copy.png");
                copyContentDiv.appendChild(copyContentImg);

                var downloadContentDiv = document.createElement("div");
                downloadContentDiv.setAttribute("class", "downloadAccountDetails");
                downloadContentDiv.setAttribute("title", browser.i18n.getMessage("download_file"));
                var downloadContentImg = document.createElement("img");
                downloadContentImg.setAttribute("src", "/images/downloadFile.png");
                downloadContentDiv.appendChild(downloadContentImg);

                var accDetail = document.createElement("ul");
                accDetail.setAttribute("id", "accountDetailsList");

                var accDetLI = document.createElement("li");

                var accLabelDiv = document.createElement("div");
                accLabelDiv.setAttribute("class", "accountLabel");
                accLabelDiv.setAttribute("accountType", "Character");
                var accNotesText = document.createTextNode(browser.i18n.getMessage("notes"));
                accLabelDiv.appendChild(accNotesText);
                accDetLI.appendChild(accLabelDiv);
                accDetLI.appendChild(copyContentDiv);
                var accValDiv = document.createElement("div");
                accValDiv.setAttribute("class", "accountValue");
                var accValText = document.createTextNode(description);
                accValDiv.appendChild(accValText);
                accDetLI.appendChild(accValDiv);
                accDetail.appendChild(accDetLI);


                var accDetNotesLI = document.createElement("li");

                var accLabelNotesDiv = document.createElement("div");
                accLabelNotesDiv.setAttribute("class", "accountLabel");
                accLabelNotesDiv.setAttribute("accountType", "Date");
                var accNotesText = document.createTextNode(browser.i18n.getMessage("last_accessed_time"));
                accLabelNotesDiv.appendChild(accNotesText);
                accDetNotesLI.appendChild(accLabelNotesDiv);
                accDetNotesLI.appendChild(copyContentDiv);
                var accValNotesDiv = document.createElement("div");
                accValNotesDiv.setAttribute("class", "accountValue");
                var accValNotesText = document.createTextNode(lastAccessedTime);
                accValNotesDiv.appendChild(accValNotesText);
                accDetNotesLI.appendChild(accValNotesDiv);
                accDetail.appendChild(accDetNotesLI);

                if (data.operation.Details.hasOwnProperty("CUSTOM FIELD") === true) {
                    var customFields = data.operation.Details["CUSTOM FIELD"];
                    var label = '', value = '', type = '', accountColumnName = '';
                    for (var i = 0; i < customFields.length; i++) {
                        label = customFields[i].CUSTOMFIELDLABEL;
                        value = customFields[i].CUSTOMFIELDVALUE;
                        type = customFields[i].CUSTOMFIELDTYPE;
                        accountColumnName = customFields[i].CUSTOMFIELDCOLUMNNAME;


                        var customAccDetLI = document.createElement("li");

                        var customAccLabelDiv = document.createElement("div");
                        customAccLabelDiv.setAttribute("class", "accountLabel");
                        customAccLabelDiv.setAttribute("accountType", type);
                        customAccLabelDiv.setAttribute("accountColumnName", accountColumnName);
                        var customAccNotesText = document.createTextNode(label);
                        customAccLabelDiv.appendChild(customAccNotesText);
                        customAccDetLI.appendChild(customAccLabelDiv);

                        if (value !== "" && value !== "-") {
                            (type === "File") ? customAccDetLI.appendChild(downloadContentDiv) : customAccDetLI.appendChild(copyContentDiv);
                        }

                        var customAccValDiv = document.createElement("div");
                        customAccValDiv.setAttribute("class", "accountValue");
                        customAccValDiv.setAttribute("fileName", value);
                        var customAccValText = document.createTextNode(value);
                        customAccValDiv.appendChild(customAccValText);
                        customAccDetLI.appendChild(customAccValDiv);
                        accDetail.appendChild(customAccDetLI);


                    }
                }

                let validity = 30;
                if(data.operation.Details.hasOwnProperty('IS_TOTP_CONFIGURED') && data.operation.Details.IS_TOTP_CONFIGURED =='true'){
                    var accDetTOTPLI = document.createElement("li");


                    var accRowLeftDiv = document.createElement("div");
                    accRowLeftDiv.setAttribute("class","acc-row-left");
                    
                    var accLabelTOTPDiv = document.createElement("div");
                    accLabelTOTPDiv.setAttribute("class", "accountLabel");
                    var accTOTPText = document.createTextNode(browser.i18n.getMessage("totp"));
                    accLabelTOTPDiv.appendChild(accTOTPText);

                    var hiddenTOTPDiv = document.createElement("div");
                    hiddenTOTPDiv.setAttribute("id","totpHidden");
                    hiddenTOTPDiv.setAttribute("class", "accountValue");
                    var hiddenTOTPText = document.createTextNode("******");
                    hiddenTOTPDiv.appendChild(hiddenTOTPText);

                    var valueTOTPDiv = document.createElement("div");
                    valueTOTPDiv.setAttribute("id","totpValue");
                    valueTOTPDiv.setAttribute("class", "accountValue hide");

                    accRowLeftDiv.appendChild(accLabelTOTPDiv)
                    accRowLeftDiv.appendChild(hiddenTOTPDiv);
                    accRowLeftDiv.appendChild(valueTOTPDiv);
                    

                    var viewTOTPDiv = document.createElement("div");
                    viewTOTPDiv.setAttribute("id","showhideTOTP");
                    viewTOTPDiv.setAttribute("class", "showHideTOTP icon-showpwd");
                    viewTOTPDiv.setAttribute("title", browser.i18n.getMessage("show_hide_totp"));                    

                    var copyTOTPDiv = document.createElement("div");
                    copyTOTPDiv.setAttribute("class", "copyAccountTOTP totp-icon");
                    copyTOTPDiv.setAttribute("title", browser.i18n.getMessage("copy_totp"));
                    var copyTOTPImg = document.createElement("img");
                    copyTOTPImg.setAttribute("src", "/images/totp.png");
                    copyTOTPDiv.appendChild(copyTOTPImg);

                    var timerSpan = document.createElement("span");
                    timerSpan.setAttribute("class","totp-panel totp-timer");
                    timerSpan.innerHTML='<svg width="30" height="30"><circle r="8" cy="15" cx="15" stroke-width="5" stroke="#ccc" fill="none" /><circle id="animateCircleId" r="8" cy="15" cx="15" stroke-width="5" stroke="#4780da" fill="none" data-totp_circle="totp_circle" /></svg>';
                    
                    var iconDivs = document.createElement("div");
                    iconDivs.setAttribute("class","acc-row-right");
                    iconDivs.appendChild(viewTOTPDiv);
                    iconDivs.appendChild(copyTOTPDiv);
                    iconDivs.appendChild(timerSpan);

                    var totpRowDiv = document.createElement("div");
                    totpRowDiv.setAttribute("class","totp-row");

                    totpRowDiv.appendChild(accRowLeftDiv);
                    totpRowDiv.appendChild(iconDivs);

                    accDetTOTPLI.appendChild(totpRowDiv);
                    

                    accDetail.appendChild(accDetTOTPLI);
                    validity = parseInt(data.operation.Details.TOTP_VALIDITY);
                }

                var accDetBody = document.getElementById("accountDetailsBody");
                accDetBody.appendChild(accDetail);

                $('#accountDetailsBody li').mouseover(function () {
                    var text = $(this).find('.accountValue').text();
                    var accountType = $(this).find('.accountLabel').attr('accountType');
                    if (text !== "" && text !== "-") {
                        $(this).find('.copyAccountDetails').show();
                    }
                    if (accountType === "File") {
                        $(this).find('.downloadAccountDetails').show();
                    }
                });

                $('#accountDetailsBody li').mouseout(function () {
                    var text = $(this).find('.accountValue').text();
                    var accountType = $(this).find('.accountLabel').attr('accountType');
                    if (text !== "" && text !== "-") {
                        $(this).find('.copyAccountDetails').hide();
                    }
                    if (accountType === "File") {
                        $(this).find('.downloadAccountDetails').hide();
                    }
                });

                $('.copyAccountDetails').click(function () {
                    var copyText = $(this).next().closest('.accountValue').text();
                    popupUtils.copyString(copyText);
                    popupUtils.copiedMessage();
                });

                $('.accountFavorite').off('click').on('click', function (e) {
                    var isFavorite = $(this).attr('isfavorite');

                    var operation = (isFavorite === 'false') ? 'SET_FAVOURITEPASSWORD' : 'REMOVE_FAVOURITEPASSWORD';
                    var data = popupUtils.modifyFavorite(accountId, operation);
                    var parsed = JSON.parse(data);
                    var status = popupUtils.checkStatus(parsed);
                    if (status === true) {
                        var favIconDecider = (isFavorite === 'true') ? "/images/notFavoriteAccount.svg" : "/images/favoriteAccount.svg";
                        var remFav = browser.i18n.getMessage("remove_favorite");
                        var setFav = browser.i18n.getMessage("set_as_favorite");
                        var title = (isFavorite === 'true') ? setFav : remFav;
                        isFavorite = (isFavorite === 'true') ? false : true;
                        $('.accountFavorite').empty();
                        $('.accountFavorite').append($("<img>", {src: favIconDecider}));
                        $('.accountFavorite').attr('isfavorite', isFavorite);
                        $('.accountFavorite').attr('title', title);

                        $('.acc-list li').each(function () {
                            var accId = $(this).attr('accountid');
                            if (accId === accountId) {
                                $(this).find('.favorite').empty();
                                $(this).find('.favorite').append($("<img>", {src: favIconDecider}));
                                $(this).attr('isfavorite', isFavorite);
                                $(this).find('.favorite').attr('title', title);
                                return false;
                            }
                        });
                    }
                    e.stopPropagation();
                });

                PMP_popup.accountDetailFileDownload(accountId, passwdId);
                PMP_popup.accountDetailsTOTP(accountId,validity);
            } else {                      //  Incase there is an error while fetching account details, clear local data and logout
                PMP_popup.signoutCall();
                PMP_popup.serverConnectivityLost();
            }
        },
        accountDetailsBackButton: function () {
            $('.accountDetailsBackButton').click(function () {
                $('#accountDetails').hide();
                $('#accountListHeader').show();
                $('#accountList').show();
            });
        },
        scrollAccounts: function () {
            var displayHeight = $('#accountList').height();
            var totalScrollHeight = document.getElementById('accountList').scrollHeight;

            $('#accountList').scroll(function () {
                var listDisplay = $('#autoLoginList').css('display');   //To hide the AutoLoginList Popup
                if (listDisplay === "block") {
                    $('#autoLoginList').slideToggle(0);
                    PMP_Utils.removeSelectedLi();
                }
                var scrollTop = $('#accountList').scrollTop();
                var scrolledUpto = displayHeight + scrollTop;
                var yetToScroll = totalScrollHeight - scrolledUpto;

                var index = PMP_popup.accountStartIndex;
                var haveToScroll = (PMP_popup.totalAccounts > (index + PMP_popup.LIMIT)) ? true : false;
                if (yetToScroll <= 0 && haveToScroll === true) {
                    //PMP_popup.unbindOnAccountScroll();                  //  Don't undind events even when the accounts are loading
                    PMP_popup.accountStartIndex += PMP_popup.LIMIT;
                    var resourceId = PMP_popup.clickedResourceId;
                    popupUtils.getResourceAccounts(resourceId);
                }
            });
        },
        unbindOnAccountScroll: function () {
            $('#accountList').unbind('scroll');
            $('.acc-list li').unbind('mouseover');
            $('.acc-list li').unbind('mouseout');
            $('.copyPwd').unbind('click');
            $('.copyUname').unbind('click');
            $('.copyTOTP').unbind('click');
            $('.favorite').unbind('click');
            $('#accountList li').find('.autoLogon').unbind('click');
            $('#accountList li').find('.launchRDP').unbind('click');

            $('.acc-list li').each(function () {
                $(this).removeClass('hover');
                $(this).find('.hoverTools').hide();
            });

            var listDisplay = $('#autoLoginList').css('display');
            if (listDisplay === "block") {
                $('#autoLoginList').slideToggle(0);
                PMP_Utils.removeSelectedLi();
            }
        },
        accountListFunctionality: function () {

            $('.resourceBackButton').click(function () {
                PMP_Utils.hideAccountRelatedInfo();
                $('#resourceDataDiv').fadeIn();

                if (PMP_popup.selectedTab === 'resourceGroups') {
                    $('#resourceGroupHeader').fadeIn();
                    event.stopPropagation();
                } else if (PMP_popup.selectedTab === 'favorites') {
                    var hasFavoriteAccount = false;
                    $('.acc-list li').each(function () {
                        var fav = $(this).attr('isfavorite');
                        fav = (fav === 'false') ? false : true;
                        hasFavoriteAccount = hasFavoriteAccount || fav;
                    });
                    if (hasFavoriteAccount === false) {
                        popupUtils.getResources(0);
                    }
                    event.stopPropagation();
                }
            });

            $('.acc-list li').mouseover(function () {
                $(this).addClass('hover');
                $(this).find('.hoverTools').show();
            });
            $('.acc-list li').mouseout(function () {
                $(this).removeClass('hover');
                if ($(this).hasClass('selectedLi') === false) {
                    $(this).find('.hoverTools').hide();
                }
            });
        },
        fileDownload: function () {
            $('.fileDownload').click(function (e) {

                var accountId = $(this).parent().parent().attr('accountId');
                var passwdId = $(this).parent().parent().attr('passwdId');
                var ISREASONREQUIRED = $(this).parent().attr('ISREASONREQUIRED');
                var isTicketIdRequired = $(this).parent().attr('IS_TICKETID_REQD');
                var isTicketIdMandatory = $(this).parent().attr('IS_TICKETID_REQD_MANDATORY');
                var accountName = $(this).parent().parent().attr('uname');
                var fileName = $(this).attr('title');
                var remoteLoginUrl = '';
                var reason = "";
                var password = "";
                var passwordResponse = "";

                if (ISREASONREQUIRED === 'true' || isTicketIdRequired === 'true') {
                    $('#accountName').text(accountName);
                    popupUtils.copyPasswordAssist(passwdId, ISREASONREQUIRED, isTicketIdRequired, isTicketIdMandatory, fileName, remoteLoginUrl, false,accountId);
                } else {
                    if(PMP_popup.BUILDNUMBER<10102){
                    	var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                    } else {
                    	var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                    }
                    var isCustomField = 'false';
                	if(PMP_popup.BUILDNUMBER<10500){
                		isCustomField = 'FALSE';
                	}
                    var input_data= 'INPUT_DATA={"operation":{"Details":{"PASSWDID":"' + passwdId + '","ISCUSTOMFIELD":"'+isCustomField+'"}}}';

                    popupUtils.getPasswordFiles(pwdUrl, fileName,input_data);
                }
                PMP_Utils.dropDownController("");
                e.stopPropagation();
            });
        },
        resourceDetailFileDownload: function () {
            $('.downloadResourceDetails').click(function (e) {
                e.stopPropagation();
                var fileName = $(this).attr('title');
                var resId = $('.resourceHeaderName').attr('resId');
                var fileName = $(this).parent().find('.resourceValue').attr('fileName');
                var columnName = $(this).parent().find('.resourceValue').attr('columnName');
                if(PMP_popup.BUILDNUMBER<10102){
                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                } else {
                    var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                }
                var isCustomField = 'true';
            	if(PMP_popup.BUILDNUMBER<10500){
            		isCustomField = 'TRUE';
            	}
                var input_data= 'INPUT_DATA={"operation":{"Details":{"RESOURCEID" : "' + resId + '","CUSTOMFIELDTYPE":"RESOURCE","CUSTOMFIELDCOLUMNNAME":"' + columnName + '","ISCUSTOMFIELD":"'+isCustomField+'"}}}';

                popupUtils.getPasswordFiles(pwdUrl, fileName,input_data);
            });
        },
        accountDetailFileDownload: function (accountId, passwdId) {
            $('.downloadAccountDetails').click(function (e) {
                e.stopPropagation();
                var fileName = $(this).parent().find('.accountValue').attr('fileName');
                var columnName = $(this).parent().find('.accountLabel').attr('accountColumnName');
                if(PMP_popup.BUILDNUMBER<10102){
                var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?AUTHTOKEN=' + PMP_popup.authToken + '&OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                } else {
                    var pwdUrl = 'https://' + PMP_popup.serverName + '/api/json/request?OPERATION_NAME=DOWNLOAD_CERTIFICATE';
                }
                var isCustomField = 'true';
            	if(PMP_popup.BUILDNUMBER<10500){
            		isCustomField = 'TRUE';
            	}
                var input_data= 'INPUT_DATA={"operation":{"Details":{"ACCOUNTID":"' + accountId + '","PASSWDID" : "' + passwdId + '","CUSTOMFIELDTYPE":"ACCOUNT","CUSTOMFIELDCOLUMNNAME":"' + columnName + '","ISCUSTOMFIELD":"'+isCustomField+'"}}}';

                popupUtils.getPasswordFiles(pwdUrl, fileName,input_data);
            });
        },
        modifyFavorite: function () {
            $('.favorite').click(function (e) {
                var operation = '';
                var isFavorite = $(this).parent().attr('isFavorite');
                var accountId = $(this).parent().attr('accountId');
                operation = (isFavorite === 'false') ? 'SET_FAVOURITEPASSWORD' : 'REMOVE_FAVOURITEPASSWORD';
                var data = popupUtils.modifyFavorite(accountId, operation);
                var parsed = JSON.parse(data);
                var status = popupUtils.checkStatus(parsed);
                $(this).empty();
                if (status === true) {
                    if (operation === 'SET_FAVOURITEPASSWORD') {
                        var remFav = browser.i18n.getMessage("remove_favorite");
                        $(this).parent().attr('isFavorite', true);
                        $(this).attr('title', remFav);
                        $(this).append($("<img>", {src: "/images/favoriteAccount.svg"}));
                    } else {
                        var setFav = browser.i18n.getMessage("set_as_favorite");
                        $(this).parent().attr('isFavorite', false);
                        $(this).attr('title', setFav);
                        $(this).append($("<img>", {src: "/images/notFavoriteAccount.svg"}));
                    }
                }
                e.stopPropagation();
            });
        },
        accountDetailsTOTP : function(accountId,validity){
            $('.copyAccountTOTP').click(function () {
                serverUtils.generateTOTP(accountId,PMP_popup).then(totp=>{
                    popupUtils.copyString(totp);
                    popupUtils.copiedMessage();
                })
            });
            $('.showHideTOTP').click(function(){
                let eyeIconElement = document.getElementById("showhideTOTP");
                let totpValueEle = document.getElementById("totpValue");
                let totpHiddenElem = document.getElementById("totpHidden");
                if(eyeIconElement.classList.contains('icon-showpwd')){  
                    let totpValue = totpValueEle.textContent;
                    if(totpValue == ""){
                        serverUtils.generateTOTP(accountId,PMP_popup).then(totp=>{
                            totpValueEle.textContent = totp;
                            let remainingSeconds = PMP_Utils.getRemainingSeconds(validity);
                            setTimeout(()=>{
                                if (!totpValueEle.classList.contains("hide")) { //NO I18N
                                    totpValueEle.classList.toggle("hide"); // NO I18N
                                    totpHiddenElem.classList.toggle("hide"); // NO I18N
                                    eyeIconElement.classList.toggle("icon-showpwd"); // NO I18N
                                    eyeIconElement.classList.toggle("icon-hidepwd"); // NO I18N
                                }
                                totpValueEle.textContent="";
                            },remainingSeconds*1000)
                        })
                    }
                }
                totpValueEle.classList.toggle("hide"); // NO I18N
                totpHiddenElem.classList.toggle("hide"); // NO I18N
                eyeIconElement.classList.toggle("icon-showpwd"); // NO I18N
                eyeIconElement.classList.toggle("icon-hidepwd"); // NO I18N
            });
            circleAnimation.startCircleAnimation("animateCircleId",validity);
        },
        listAutoLoginMethods: function (autoLogonData) {
            var allowOpenURLInBrowser = PMP_popup.resourceDetails["AllowOpenURLInBrowser"];
            var splitArr = autoLogonData.resourceUrl.match(/^(https?|ftp|file):\/\//i);
           
            $('#autoLoginList').empty();
            var autoLoginList = document.createElement("ul");
            autoLoginList.setAttribute("id", "autoLoginLI");

            let autoLogonList = autoLogonData.autoLogonList.split(",");
            for (var i = 0; i < autoLogonList.length; i++) {
                var autoLogonHelperName = autoLogonList[i];
                var autoLoginListLI = document.createElement("li");
                autoLoginListLI.setAttribute("protocol", autoLogonHelperName);
                PMP_popup.setAutologonDisabledAttributes(autoLoginListLI,autoLogonData,autoLogonHelperName);
                var autoHelperNameText = document.createTextNode(autoLogonHelperName);
                autoLoginListLI.appendChild(autoHelperNameText);
                autoLoginList.appendChild(autoLoginListLI);

            }

            if(allowOpenURLInBrowser==='true'){
                if (autoLogonData.resourceUrl !== "" && PMP_Utils.isValid(splitArr) && splitArr.length > 0 && (autoLogonData.passwordStatusCheck === "true" || autoLogonData.passwordAccessDenied === "true"))
                {
                    var autoLoginListLI = document.createElement("li");
                    autoLoginListLI.setAttribute("protocol", "webLogin");
                    autoLoginListLI.setAttribute("loginUrl", autoLogonData.resourceUrl);
                    var autoHelperNameText = document.createTextNode(browser.i18n.getMessage("open_url_in_browser"));
                    autoLoginListLI.appendChild(autoHelperNameText);
                    autoLoginList.appendChild(autoLoginListLI);
                }
            }
            var autoLoginListBody = document.getElementById("autoLoginList");
            autoLoginListBody.appendChild(autoLoginList);
        },
        setAutologonDisabledAttributes : function(autoLoginListLI,autoLogonData,autoLogonName){
            let isValidRemoteLogin = PMP_Utils.isValid(PMP_popup.resourceDetails["DNS Name"]);
            let isDisabled = false;
            let disabledMessage='';
            if(autoLogonData.isLocalAccountsAutologonRestricted === 'true'){
                isDisabled=true;
                disabledMessage=chrome.i18n.getMessage("autologon_access_restricted_by_admin").replace("{0}", autoLogonName);
            }
            else if(isValidRemoteLogin === false) {
                isDisabled =true;
                disabledMessage=chrome.i18n.getMessage("the_dns_ip_has_not_beed_configired")+ PMP_popup.resourceDetails["Resource Owner"] + ' )';
            }
            else {
                if(autoLogonData.isRDPRestricted === 'true' &&
                    (autoLogonName === 'Windows Remote Desktop' ||
                    autoLogonName === 'RDP Console Session')){
                    isDisabled=true;
                    disabledMessage=chrome.i18n.getMessage("autologon_access_restricted_by_admin").replace("{0}", autoLogonName);
                }
                if(autoLogonData.isSSHRestricted === 'true' &&
                    (autoLogonName === 'SSH' ||
                    autoLogonName === 'Telnet')){
                    isDisabled=true;
                    disabledMessage=chrome.i18n.getMessage("autologon_access_restricted_by_admin").replace("{0}", autoLogonName);
                }
            }

            if(isDisabled){
                autoLoginListLI.setAttribute("class", "disabled tooltipSession");
	            autoLoginListLI.setAttribute("data_tooltip_session",disabledMessage);
            }
        },
        launchRDPSession: function (resourceUrl) {
            var previouslyClicked = null;
            var previouslyClickedElement = null;
            $('#accountList li').find('.launchRDP').click(function (e) {
                var autoLoginData = {
                    'resourceUrl':resourceUrl,
                    'isReasonRequired': $(this).parent().attr('ISREASONREQUIRED'),
                    'isTicketIdRequired': $(this).parent().attr('IS_TICKETID_REQD'),
                    'isTicketIdMandatory': $(this).parent().attr('IS_TICKETID_REQD_MANDATORY'),
                    'isRDPRestricted':$(this).parent().attr('isRDPRestricted'),
                    'isSSHRestricted':$(this).parent().attr('isSSHRestricted'),
                    'isLocalAccountsAutologonRestricted':$(this).parent().attr('isLocalAccountsAutologonRestricted'),
                    'username': $(this).closest('li').attr('uName'),
                    'passwdId': $(this).closest('li').attr('passwdId'),
                    'accountName': $(this).closest('li').attr('uname'),
                    'accountId' : $(this).closest('li').attr('accountid'),
		    'autoLogonList':$(this).closest('li').attr('autoLogonList'),
                    'passwordStatusCheck':$(this).attr('passwordStatusCheck'),
                    'passwordAccessDenied':$(this).attr('passwordAccessDenied'),
                    'isTOTPConfigured':$(this).closest('li').attr('isTOTPConfigured'),
                };
                var resourceId = $('.resourceHeaderName').attr('resId');
                var accountId = $(this).parent().parent().attr('accountid');
                PMP_popup.listAutoLoginMethods(autoLoginData);

                var top = e.clientY + 5;
                var left = e.clientX - 170;
                var divHeight = $('#autoLoginList').height();//.css('height');
                var bodyHeight = $('body').height();//.css('height');
                if ((top + divHeight) > bodyHeight) {      //  flip the div
                    top -= divHeight;
                    $('.tooltipSession').addClass('tooltipSessionAboveDiv');
                } else {
                    $('.tooltipSession').addClass('tooltipSessionBelowDiv');
                }
                var listDisplay = $('#autoLoginList').css('display');

                PMP_Utils.dropDownController("autoLoginList");
                if (e.target !== previouslyClicked) {      //  hide prev div and show the div again
                    if (listDisplay === "block") {
                        $('#autoLoginList').slideToggle(0);
                        var prevParent = previouslyClickedElement.target.parentNode.parentNode;
                        $(prevParent).hide();
                    }
                }

                if (e.target === previouslyClicked && listDisplay === "block") {
                    PMP_Utils.removeSelectedLi();
                } else {
                    $(this).parent().parent().addClass('selectedLi');
                }

                $('#autoLoginList').css('top', top);
                $('#autoLoginList').css('left', left);

                $('#autoLoginList').slideToggle(0);
                previouslyClicked = e.target;
                previouslyClickedElement = e;

                PMP_popup.launchSession(resourceId, accountId, autoLoginData);

                e.stopPropagation();
            });
        },
        launchSession: function (resourceId, accountId, autoLoginData) {
            $('#autoLoginLI li').click(function (e) {

                var isValidRemoteLogin = ($(this).hasClass('disabled') === true) ? false : true;
                if (isValidRemoteLogin === false) {
                    e.stopPropagation();
                    return false;
                }

                var protocol = $(this).attr('protocol');
                var resourceUrl = '';
                PMP_Utils.dropDownController("");

                var isReasonRequired = autoLoginData.isReasonRequired;
                var isTicketIdRequired = autoLoginData.isTicketIdRequired;
                var isTicketIdMandatory = autoLoginData.isTicketIdMandatory;
                var username = autoLoginData.username;
                var passwdId = autoLoginData.passwdId;
                var accountName = autoLoginData.accountName;

                if (protocol === "webLogin") {
                    autoLoginData.resourceUrl =  $(this).attr('loginUrl');
                    PMP_popup.checkReasonAndGetPassword(autoLoginData);
                } else {
                    resourceUrl = 'https://' + PMP_popup.serverName + '/';
                    if (protocol === "Windows Remote Desktop") {
                        resourceUrl += 'rdp.ma?PROTOCOL=RDP&';
                    } else if (protocol === "RDP Console Session") {
                        resourceUrl += 'rdp.ma?PROTOCOL=RDP&console=on&';
                    } else if (protocol === "VNC") {
                        resourceUrl += 'vnc.ma?PROTOCOL=VNC&';
                    } else if (protocol === "SSH") {
                    	if(PMP_popup.resourceDetails['NewSSHTerminal']==='true' && PMP_popup.BUILDNUMBER>=11100){
                            resourceUrl += 'ssh.ma?PROTOCOL=SSH&';
                   	 } else{
                   		 resourceUrl += 'VirtualTerminalMenu.ma?PROTOCOL=SSH&';
                   	 }
                    } else if (protocol === "Telnet") {
                        resourceUrl += 'VirtualTerminalMenu.ma?PROTOCOL=Telnet&';
                    } else if (protocol === "SQL") {
                        resourceUrl += 'SqlPasswordsMenu.ma?PROTOCOL=SQL&';
                    }
                    resourceUrl += 'resourceId=' + resourceId + '&accountId=';
                    resourceUrl += protocol === "VNC" ? '-2' : accountId;
                    if (isReasonRequired === 'true' || isTicketIdRequired === 'true') {
                        $('#accountName').text(accountName);
                        var fileName = '';
                        var remoteLoginUrl = resourceUrl;
                        popupUtils.copyPasswordAssist(passwdId, isReasonRequired, isTicketIdRequired, isTicketIdMandatory, fileName, remoteLoginUrl, false,accountId);
                    } else {
                    	var server= 'https://' + PMP_popup.serverName;
                    	var hiddenField = document.createElement("input");
                    	browser.cookies.get({"url": server, "name": "pmpcc"}, function(cookie) {
                            hiddenField.setAttribute("type", "hidden");
                            hiddenField.setAttribute("name", "pmpcp");
                            hiddenField.setAttribute("value", cookie.value);
                    	});
                    	setTimeout(function () {
	                    	var forms = document.createElement("form");
	                        forms.id = "PMP_InvokeUrl";
	                        forms.action = resourceUrl;
	                        forms.method = "POST";
	                        forms.target = "TheWindow";
	                        forms.appendChild(hiddenField);
	                        document.body.append(forms);
	                        forms.submit();
                         }, 50); 
                    }
                }
                e.stopPropagation();
            });
        },
        goToUrl: function (resourceUrl) {
            $('#accountList li').find('.autoLogon').click(function (e) {
                PMP_Utils.dropDownController("");
                var autoLoginData = {
                    'resourceUrl':resourceUrl,
                    'isReasonRequired': $(this).parent().attr('ISREASONREQUIRED'),
                    'isTicketIdRequired': $(this).parent().attr('IS_TICKETID_REQD'),
                    'isTicketIdMandatory': $(this).parent().attr('IS_TICKETID_REQD_MANDATORY'),
                    'passwdId': $(this).closest('li').attr('passwdId'),
                    'accountName': $(this).closest('li').attr('uname'),
                    'accountId' : $(this).closest('li').attr('accountid'),
                    'isTOTPConfigured':$(this).closest('li').attr('isTOTPConfigured'),
                };

                PMP_popup.checkReasonAndGetPassword(autoLoginData);
                e.stopPropagation();
            });
        },
        checkReasonAndGetPassword: function (autoLoginData) {

            var isReasonRequired = autoLoginData.isReasonRequired;
            var isTicketIdRequired = autoLoginData.isTicketIdRequired;
            var isTicketIdMandatory = autoLoginData.isTicketIdMandatory;
            var accountName = autoLoginData.accountName;

            var reason = '', ticketId = '';
            if (isReasonRequired === 'true' || isTicketIdRequired === 'true') {
                $('.resourceHeader').hide();
                PMP_Utils.hideAccountRelatedInfo();
                $('#ticketId input').val('');
                $('#passwordReason').val('');
                $('#reasonRequired').show();

                if (isTicketIdRequired === 'true') {
                    $('#getTicket').show();
                    $('#ticketId').find('input').focus();
                } else {
                    $('#getTicket').hide();
                    $('#passwordReason').focus();
                }

                $('#accountName').text(accountName);
                $('#proceed').css({'cursor':'','opacity':''});
                $('#proceed').off('click').on('click', function () {
                    reason = ($('#passwordReason').val()).trim();
                    ticketId = ($('#ticketId').find('input').val()).trim();

                    var requestCheck = PMP_Utils.hasHarmfulContent(reason);
                    var ticketIdCheck = PMP_Utils.hasHarmfulContent(ticketId);
                    var enterValidTcktId = browser.i18n.getMessage("enter_a_valid_ticket_id");
                    if (ticketIdCheck === false || requestCheck === false) {
                        var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
                        PMP_Utils.reasonFailedMessage(harmfulContent);
                        ticketIdCheck === false ? $('#ticketId').find('input').focus() : $('#passwordReason').focus();
                        return false;
                    }
                   
                    reason = encodeURIComponent(reason);
                    ticketIdCheck = PMP_Utils.isTicketIdValid(ticketId);

                    if (isTicketIdRequired === 'true' || ticketIdCheck !== true) {
                        ticketId = encodeURIComponent(ticketId);
                        if ((ticketId === "" && isTicketIdMandatory === 'true') || ticketIdCheck !== true) {
                            PMP_Utils.reasonFailedMessage(enterValidTcktId);
                            $('#ticketId').find('input').focus();
                            return false;
                        }
                    }

                    var enterReasonProceed = browser.i18n.getMessage("enter_reason_to_proceed");
                    if (isReasonRequired === 'true' && reason === "") {
                        PMP_Utils.reasonFailedMessage(enterReasonProceed);
                        $('#passwordReason').focus();
                        return false;
                    }

                    if ((reason !== "" && isReasonRequired === 'true') || (isTicketIdMandatory === 'true' && ticketId !== "") ||
                            (isReasonRequired === 'false') || (isTicketIdMandatory === 'false')) {
                        $('#reasonFailed').hide();
                        popupUtils.getPasswordDetails(autoLoginData, reason, ticketId);
                    } else {
                        PMP_Utils.reasonFailedMessage(enterReasonProceed);
                        $('#passwordReason').focus();
                    }
                    event.stopPropagation();
                });

                $('#cancel').click(function () {
                    $('#reasonFailed').hide();
                    $('#reasonRequired').hide();
                    $('.resourceHeader').show();
                    $('#accountList').show();
                    $('#accountListHeader').show();
                    event.stopPropagation();
                });
            } else {
                popupUtils.getPasswordDetails(autoLoginData, reason , ticketId);
            }

        },
        performAutoLogin: function (autoLoginData,response) {
            var parsedData = response;
            var status = parsedData.operation.result.status;
            var message = '';
            if (status === 'Failed') {
                if (parsedData.operation.result.message === 'Password Not Accessible. Contact your administrator to check the Ticketing system configurations & try again later.') {
                    message = browser.i18n.getMessage('unable_to_validate_ticketid');
                } else {
                    message = browser.i18n.getMessage("enter_a_valid_ticket_id");
                }
                PMP_Utils.reasonFailedMessage(message);
                $('#ticketId').find('input').focus();
                return false;
            }
            $('#reasonRequired').hide();
            $('#passwordReason').val('');
            $('#ticketId').find('input').val('');

            $('.resourceHeader').show();
            $('#accountList').show();
            $('#accountListHeader').show();

            var password = parsedData.operation.Details.PASSWORD;
            let resourceUrl = autoLoginData.resourceUrl;
            password = password.trim();
            var modifiedResourceUrl = PMP_popup.replaceUrlPlaceHolders(resourceUrl, username, password);
            var resourceUrlHasPlaceHolder = false;
            var formParams = '';
            if (resourceUrl !== modifiedResourceUrl.domainUrl) {
                resourceUrlHasPlaceHolder = true;
                resourceUrl = modifiedResourceUrl.domainUrl;
                formParams = modifiedResourceUrl.formParams;
            }
            resourceUrl=new URL(resourceUrl).toString();
            var resourceData = {
                "username": autoLoginData.accountName,
                "password": password,
                "resourceUrl": resourceUrl,
                "formParams": formParams,
                "resourceUrlHasPlaceHolder": resourceUrlHasPlaceHolder,
                "isPasswordAccessDenied": PMP_popup.isPasswordAccessDeniedForAccount,
                "accountId" : autoLoginData.accountId,
                "isTOTPConfigured" : autoLoginData.isTOTPConfigured
            };
            PMP_popup.autoLogonTabCheck(resourceData);
        },
        autoLogonTabCheck: function (resourceData) {
            browser.runtime.sendMessage({
                "action": "currentLoginDetails",
                "data": resourceData
            }, function (response) {
                if (response.status === true) {
                    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
                        var currentUrl = tabs[0].url;
                        var currentDomain = PMP_Utils.getDomain(currentUrl);
                        var resourceDomain = PMP_Utils.getDomain(resourceData.resourceUrl);
                        var subDirectoryCheck = (currentUrl.indexOf(resourceData.resourceUrl) !== -1) ? true : false;
                        browser.storage.local.set({'isTOTPAutoLoginSubmit':true},()=>{});
                        if (resourceDomain !== currentDomain || subDirectoryCheck === false) {	// Time to open a new tab
                            PMP_popup.openNewTab(resourceData.resourceUrl);
                        } else {
                            browser.tabs.sendMessage(tabs[0].id, {
                                "action": "autoLogin",
                                "data": resourceData
                            });
                        }
                    });
                }
            });
        },
        getAuthToken: function (value1, value2, ISSECONDFACTORENABLED, captchatext) {
        	PMP_popup.getAuthToken(password, tfaOTP, PMP_popup.ISSECONDFACTORENABLED, null);
        },
        getAuthToken: function (value1, value2, ISSECONDFACTORENABLED, captchatext) {
            PMP_popup.AJAXREQUEST.abort();
            PMP_popup.selectedTab = 'allPasswords';
            var username,password;
            if(PMP_popup.BUILDNUMBER>=9802)
            {
                username = value1;
                password = value2;
                popupUtils.firstAuthMode(username, password, captchatext);
            }
            else
            {
                if (ISSECONDFACTORENABLED === 'FALSE') {
                    username = value1;
                    password = value2;
                    popupUtils.noSecondAuthMode(username, password);
                } else if (ISSECONDFACTORENABLED === 'TRUE') {      // TFA is enabled
                    password = value1;
                    var tfaOTP = value2;
                    popupUtils.withSecondAuthMode(password, tfaOTP);
                }
            }
            return false;
        },
        getAuthTokenSuccess: function (data) {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            if (status === false) {
                var message = parsed.operation.result.message;
                if (PMP_popup.ISSECONDFACTORENABLED === 'TRUE') {
                    $('#tfaLoginFailed').fadeIn();
                    $('#serverNotReachable').hide();
                    var invalidPwd = browser.i18n.getMessage("invalid_password");
                    if (PMP_popup.SECONDFACTOR === 'PHONE_AUTH') {                    //  for phone factor auth only
                        var phoneFactorMsg = browser.i18n.getMessage("PF_Auth");
                        if (message.includes(phoneFactorMsg)) {
                            $('#tfaLoginFailed').text(message);
                        } else {
                            var couldNotReachPhoneFactor = browser.i18n.getMessage("phone_factor_server_unreachable");
                            $('#tfaLoginFailed').text(couldNotReachPhoneFactor);
                        }
                    } else {
                        PMP_popup.displayFailedStatus();                            //  for TFA configured logins
                        if (message === browser.i18n.getMessage("user_not_allowed_through_mob_app") || message === browser.i18n.getMessage("access_from_browser_ext_restricted")) {
                            var userNotAllowed = browser.i18n.getMessage("user_not_allowed_browser_extension");
                            $('#tfaLoginFailed').text(userNotAllowed);
                        } 
                        else if(message==="Login disabled. Contact your administrator.")
                        {
                            var userNotAllowed= browser.i18n.getMessage("user_locked");
                            $('#tfaLoginFailed').text(userNotAllowed);
                        } else if (PMP_popup.ISuserSECONDFACTORENABLED === 'FALSE') {        //  for logins without TFA configured
                            $('#tfaLoginFailed').text(message);
                        }
                    }
                    document.getElementById("tfaForm").reset();
                    $('#tfaPassword').focus();
                    return false;
                }

                var displayText = "Invalid Username / Password";
                if (message === browser.i18n.getMessage("user_not_allowed_through_mob_app") || message === browser.i18n.getMessage("access_from_browser_ext_restricted")) {
                    displayText = browser.i18n.getMessage("user_not_allowed_browser_extension");
                }
                else if(message==="Login disabled. Contact your administrator.")
                {
                    displayText= browser.i18n.getMessage("user_locked");
                }
                $('#loginFailed').text(displayText);
                $('#loginFailed').fadeIn();
                $('#serverNotReachable').hide();
                document.getElementById("loginForm").reset();
                $('#username').focus();
                return false;
            } else {
                $('#serverNotReachable').hide();
                 var details,userRoles;
                if(PMP_popup.BUILDNUMBER >= 9700)
                {
                    details=parsed.operation.Details;
                    userRoles=parsed.operation.Details.USERROLE;
                }
                else
                {
                    details=parsed.operation.Details.PERMISSIONS.USERDETAILS;
                    userRoles=parsed.operation.Details.PERMISSIONS.USERROLES.ROLE;
                    
                }
                
                PMP_popup.authToken = parsed.operation.Details.AUTHKEY;
                if (details.hasOwnProperty('ISAUTOLOGONACCESS') === true) {
                    PMP_popup.isAutoLogonAccess = details.ISAUTOLOGONACCESS;
                    PMP_popup.isAutoLogonAccess = (PMP_popup.isAutoLogonAccess === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('ISAUTOFILLACCESS') === true) {
                    PMP_popup.isAutoFillAccess = details.ISAUTOFILLACCESS;
                    PMP_popup.isAutoFillAccess = (PMP_popup.isAutoFillAccess === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('SESSIONTIMEOUT') === true) {
                    PMP_popup.SESSIONTIMEOUT = details.SESSIONTIMEOUT;
                }
                if (details.hasOwnProperty('ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT') === true) {
                    PMP_popup.enforcePreventBrowserAddAccount = details.ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT;
                    PMP_popup.enforcePreventBrowserAddAccount = (PMP_popup.enforcePreventBrowserAddAccount === 'true') ? true : false;          //  Converting string response to boolean
                }
                PMP_popup.loginName = details.USERLOGINNAME;
                PMP_popup.fullName = PMP_popup.loginName;
                if (PMP_popup.FIRSTFACTOR === 'AZUREAD' && PMP_popup.DOMAINNAME !== 'LOCAL') {
                    var azure_name_split = PMP_popup.loginName.split("@");
                    PMP_popup.loginName = azure_name_split[0];
                }

                PMP_popup.userRoles =userRoles;
                PMP_popup.USERID = details.USERID;
                if (details.hasOwnProperty('ORGLIST')) {
                    PMP_popup.ORGLIST =details.ORGLIST;
                } else {
                    PMP_popup.ORGLIST = null;
                }
                if (PMP_popup.ISSECONDFACTORENABLED === 'FALSE') {
                    $('#loginFailed').hide();
                  
                } else {
                    $('#tfaLoginFailed').hide();
                   
                }
                if (PMP_popup.BUILDNUMBER >= 8402) {
                    PMP_popup.ISPERSONALTABENABLED = details.ISPERSONALTABENABLED;
                } else {
                    PMP_popup.ISPERSONALTABENABLED = null;
                }

                if (PMP_popup.BUILDNUMBER >= 8700)
                {
                    if(PMP_popup.BUILDNUMBER<10102){
                        var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles?AUTHTOKEN=' + PMP_popup.authToken;
                    } else {
                    var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles';
                    }
                    PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: roleURL, headers: {'orgName': PMP_popup.orgName,'AUTHTOKEN': PMP_popup.authToken, 'ClientType': 12, 'requestFrom': 'pmpmobilenative', 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                        error: function (jqxhr, textStatus, errorThrown) {

                            
                        }
                    }).done(function (data) {

                        PMP_popup.setRoleFeatures(data);

                    });


                }
                setTimeout(function () {
                    var userData = {
                        "authToken": PMP_popup.authToken,
                        "sessionId": PMP_popup.SESSIONID,
                        "loginName": PMP_popup.loginName,
                        "userRoles": PMP_popup.userRoles,
                        "ORGLIST": PMP_popup.ORGLIST,
                        "USERID": PMP_popup.USERID,
                        "isAutoLogonAccess": PMP_popup.isAutoLogonAccess,
                        "isAutoFillAccess": PMP_popup.isAutoFillAccess,
                        "enforceMaxTimeLimit": PMP_popup.enforceMaxTimeLimit,
                        "ISPERSONALTABENABLED": PMP_popup.ISPERSONALTABENABLED,
                        "IsRoleAutologonAccess": PMP_popup.isRoleAutoLogonAccess,
                        "IsAccessCtrlAuthorize": PMP_popup.isAccessCtrlAuthorize,
                        "SESSIONTIMEOUT": PMP_popup.SESSIONTIMEOUT,
                        "enforcePreventBrowserAddAccount": PMP_popup.enforcePreventBrowserAddAccount

                    };
                    browser.runtime.sendMessage({//	sends message to background
                        'action': 'setAuthToken',
                        'data': userData
                    });

                }, 100);

                setTimeout(function () {
                    PMP_popup.mainTab();
                }, 400);

                document.getElementById("loginForm").reset();
                if (PMP_popup.ISSECONDFACTORENABLED === 'FALSE') {
                    setTimeout(function () {
                        $('#loginForm').fadeOut();
                    }, 0);
                } else {
                    setTimeout(function () {
                        $('#tfaForm').fadeOut();
                        $('#tfaBackToLoginForm').fadeOut();
                        document.getElementById("tfaForm").reset();
                    }, 0);
                }
            }
            return false;
        },
        firstAuthModeSuccess: function(data){
             var parsed = data;
            var status = popupUtils.checkStatus(parsed);
			    PMP_popup.SHOWCAPTCHA = false;
            	PMP_popup.CAPTCHAID = null;
            if (status === false) {
                var message = parsed.operation.result.message;
                if(parsed.operation.hasOwnProperty('Details')===true){
                	if (parsed.operation.Details.hasOwnProperty('CAPTCHAID') === true) {
                		PMP_popup.CAPTCHAID=parsed.operation.Details.CAPTCHAID;   
                	}
                }
                if(parsed.operation.hasOwnProperty('Details')===true){
                	if (parsed.operation.Details.hasOwnProperty('SHOWCAPTCHA') === true) {
                		PMP_popup.SHOWCAPTCHA=parsed.operation.Details.SHOWCAPTCHA;
                		PMP_popup.SHOWCAPTCHA = (PMP_popup.SHOWCAPTCHA === 'true') ? true : false;   
                	}
                }
                var displayText = "Invalid Username / Password";
                if(parsed.operation.hasOwnProperty('Details')===true && parsed.operation.Details.hasOwnProperty('LOGIN_STATUS')===true){
                    if(parsed.operation.Details.LOGIN_STATUS === 'COMPULSORY_PASS_CHANGE'){  //checking whether compulsory password change needed
                        displayText= chrome.i18n.getMessage("compulsory_pass_change_needed");
                    }
                }
                else if (message === browser.i18n.getMessage("user_not_allowed_through_mob_app") || message === browser.i18n.getMessage("access_from_browser_ext_restricted")) {
                    displayText = browser.i18n.getMessage("user_not_allowed_browser_extension");
                }
                else if(message==="Login disabled. Contact your administrator.")
                {
                    displayText= browser.i18n.getMessage("user_locked");
                }
                $('#loginFailed').text(displayText);
                $('#loginFailed').fadeIn();
                setTimeout(function () { 
                    $('#loginFailed').hide();
                }, 4000);
                $('#serverNotReachable').hide();
                document.getElementById("loginForm").reset();
                if(PMP_popup.SHOWCAPTCHA==true){
                	var captchaMsg = browser.i18n.getMessage("captcha_message");
                	var random_number = Math.random();
                	var captchaURL = 'https://' + PMP_popup.serverName + '/captcha/j_captcha?t='+random_number;
                    $("#capimg").attr("src",captchaURL);
                    $('#captchatext').attr('placeholder',captchaMsg);
                    $("#captchatext").show();
                    $('#capimg').css({'width':'100px','height':'100px'}); 
                    $('#captchaimg').show();
                	$('#captchafield').show();
		    $('#captchafield').val('');
        	$('#DOMAINNAMEDropDown').css({'top':'292px','left':'42px'});
                }
                else {
                	$('#captchafield').hide();
			$('#captchaimg').hide();
                }
                $('#username').focus();
                return false;
            }
            else {
                $('#serverNotReachable').hide();
                 var details,userRoles;
                 var message = parsed.operation.result.message;
                 if (parsed.operation.Details.hasOwnProperty('ISSECONDFACTORENABLED') === true) {
                     PMP_popup.ISSECONDFACTORENABLED = parsed.operation.Details.ISSECONDFACTORENABLED;
              	}
                 if (parsed.operation.Details.hasOwnProperty('SECONDFACTOR') === true) {
                     PMP_popup.SECONDFACTOR = parsed.operation.Details.SECONDFACTOR;
              	}
                if(message==="First factor authentication success.")
                {   
                    details=parsed.operation.Details;
                    PMP_popup.loginName = details.USERLOGINNAME;
                    PMP_popup.fullName = PMP_popup.loginName;
                    PMP_popup.USERID = details.USERID;
                    PMP_popup.firstFactorSecretKey=details.FIRSTFACTORSECRETKEY;
                    PMP_Utils.showTfaForm();
                    return false;
                }
                if(PMP_popup.BUILDNUMBER >= 9700)
                {
                    details=parsed.operation.Details;
                    userRoles=parsed.operation.Details.USERROLE;
                }
                else
                {
                    details=parsed.operation.Details.PERMISSIONS.USERDETAILS;
                    userRoles=parsed.operation.Details.PERMISSIONS.USERROLES.ROLE;
                    
                }
                
                PMP_popup.authToken = parsed.operation.Details.AUTHKEY;
                if (details.hasOwnProperty('ISAUTOLOGONACCESS') === true) {
                    PMP_popup.isAutoLogonAccess = details.ISAUTOLOGONACCESS;
                    PMP_popup.isAutoLogonAccess = (PMP_popup.isAutoLogonAccess === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('ISAUTOFILLACCESS') === true) {
                    PMP_popup.isAutoFillAccess = details.ISAUTOFILLACCESS;
                    PMP_popup.isAutoFillAccess = (PMP_popup.isAutoFillAccess === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('ENFORCEMAXTIMELIMIT') === true) {
                    PMP_popup.enforceMaxTimeLimit = details.ENFORCEMAXTIMELIMIT;
                    PMP_popup.enforceMaxTimeLimit = (PMP_popup.enforceMaxTimeLimit === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('SESSIONTIMEOUT') === true) {
                    PMP_popup.SESSIONTIMEOUT = details.SESSIONTIMEOUT;
                }
                if (details.hasOwnProperty('ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT') === true) {
                    PMP_popup.enforcePreventBrowserAddAccount = details.ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT;
                    PMP_popup.enforcePreventBrowserAddAccount = (PMP_popup.enforcePreventBrowserAddAccount === 'true') ? true : false;          //  Converting string response to boolean
                }
                PMP_popup.loginName = details.USERLOGINNAME;
                PMP_popup.fullName = PMP_popup.loginName;
                if (PMP_popup.FIRSTFACTOR === 'AZUREAD' && PMP_popup.DOMAINNAME !== 'LOCAL') {
                    var azure_name_split = PMP_popup.loginName.split("@");
                    PMP_popup.loginName = azure_name_split[0];
                }

                PMP_popup.userRoles =userRoles;
                PMP_popup.USERID = details.USERID;
                if (details.hasOwnProperty('ORGLIST')) {
                    PMP_popup.ORGLIST =details.ORGLIST;
                } else {
                    PMP_popup.ORGLIST = null;
                }
                $('#loginFailed').hide();
               
                if (PMP_popup.BUILDNUMBER >= 8402) {
                    PMP_popup.ISPERSONALTABENABLED = details.ISPERSONALTABENABLED;
                } else {
                    PMP_popup.ISPERSONALTABENABLED = null;
                }

                if (PMP_popup.BUILDNUMBER >= 8700)
                {
                	 if(PMP_popup.BUILDNUMBER<10102){
                         var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles?AUTHTOKEN=' + PMP_popup.authToken;
                     } else {
                     var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles';
                     }
                    PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: roleURL, headers: {'orgName': PMP_popup.orgName,'AUTHTOKEN': PMP_popup.authToken, 'ClientType': 12, 'requestFrom': 'pmpmobilenative', 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                        error: function (jqxhr, textStatus, errorThrown) {

                            
                        }
                    }).done(function (data) {

                        PMP_popup.setRoleFeatures(data);

                    });


                }
                setTimeout(function () {
                    var userData = {
                        "authToken": PMP_popup.authToken,
                        "sessionId": PMP_popup.SESSIONID,
                        "loginName": PMP_popup.loginName,
                        "userRoles": PMP_popup.userRoles,
                        "ORGLIST": PMP_popup.ORGLIST,
                        "USERID": PMP_popup.USERID,
                        "isAutoLogonAccess": PMP_popup.isAutoLogonAccess,
                        "isAutoFillAccess": PMP_popup.isAutoFillAccess,
                        "enforceMaxTimeLimit": PMP_popup.enforceMaxTimeLimit,
                        "ISPERSONALTABENABLED": PMP_popup.ISPERSONALTABENABLED,
                        "IsRoleAutologonAccess": PMP_popup.isRoleAutoLogonAccess,
                        "IsAccessCtrlAuthorize": PMP_popup.isAccessCtrlAuthorize,
                        "SESSIONTIMEOUT": PMP_popup.SESSIONTIMEOUT,
                        "enforcePreventBrowserAddAccount": PMP_popup.enforcePreventBrowserAddAccount

                    };
                    browser.runtime.sendMessage({//	sends message to background
                        'action': 'setAuthToken',
                        'data': userData
                    });

                }, 100);

                setTimeout(function () {
                    PMP_popup.mainTab();
                }, 400);

                document.getElementById("loginForm").reset();
                setTimeout(function () {
                        $('#loginForm').fadeOut();
                    }, 0);
               
            }
            return false;
        },
        secondAuthModeSuccess: function(data){
             var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            if (status === false) {
                var message = parsed.operation.result.message;
                $('#tfaLoginFailed').fadeIn();
                    $('#serverNotReachable').hide();
                    var invalidPwd = browser.i18n.getMessage("invalid_password");
                    if (PMP_popup.SECONDFACTOR === 'PHONE_AUTH') {                    //  for phone factor auth only
                    	var phoneFactorMsg = browser.i18n.getMessage("PF_Auth");
                        if (message.includes(phoneFactorMsg)) {
                            $('#tfaLoginFailed').text(message);
                        } else {
                            var couldNotReachPhoneFactor = browser.i18n.getMessage("phone_factor_server_unreachable");
                            $('#tfaLoginFailed').text(couldNotReachPhoneFactor);
                        }
                    } else {
                        PMP_popup.displayFailedStatus();                            //  for TFA configured logins
                        if (message === browser.i18n.getMessage("user_not_allowed_through_mob_app") || message === browser.i18n.getMessage("access_from_browser_ext_restricted")) {
                            var userNotAllowed = browser.i18n.getMessage("user_not_allowed_browser_extension");
                            $('#tfaLoginFailed').text(userNotAllowed);
                        } 
                        else if(message==="Login disabled. Contact your administrator.")
                        {
                            var userNotAllowed= browser.i18n.getMessage("user_locked");
                            $('#tfaLoginFailed').text(userNotAllowed);
                        } else if (PMP_popup.ISuserSECONDFACTORENABLED === 'FALSE') {        //  for logins without TFA configured
                            $('#tfaLoginFailed').text(message);
                        }
                    }
                    document.getElementById("tfaForm").reset();
                     document.getElementById("loginForm").reset();
                     setTimeout(function () {
                        $('#tfaForm').hide();
                        $('#loginForm').show();
                        $('#captchafield').hide();
            			$('#captchaimg').hide();
                    }, 1500);
                   
                    return false;
                

                
            } else {
                $('#serverNotReachable').hide();
                 var details,userRoles;
                 if (parsed.operation.Details.hasOwnProperty('SESSIONTIMEOUT') === true) {
              		PMP_popup.SESSIONTIMEOUT = parsed.operation.Details.SESSIONTIMEOUT; 
              		browser.runtime.sendMessage({
                       'action': 'setSessionTimeOut',
                       'data': PMP_popup.SESSIONTIMEOUT
                   });
              	}
                 if (parsed.operation.Details.hasOwnProperty('CLIPBOARDTIMEOUT') === true) {
                     PMP_popup.CLIPBOARDTIMEOUT = parsed.operation.Details.CLIPBOARDTIMEOUT;
                     browser.runtime.sendMessage({
                         'action': 'setClipBoardTimeOut',
                         'data': PMP_popup.CLIPBOARDTIMEOUT
                     });
              	}
                 
              
                if(PMP_popup.BUILDNUMBER >= 9700)
                {
                    details=parsed.operation.Details;
                    userRoles=parsed.operation.Details.USERROLE;
                }
                else
                {
                    details=parsed.operation.Details.PERMISSIONS.USERDETAILS;
                    userRoles=parsed.operation.Details.PERMISSIONS.USERROLES.ROLE;
                    
                }
                
                PMP_popup.authToken = parsed.operation.Details.AUTHKEY;
                if (details.hasOwnProperty('ISAUTOLOGONACCESS') === true) {
                    PMP_popup.isAutoLogonAccess = details.ISAUTOLOGONACCESS;
                    PMP_popup.isAutoLogonAccess = (PMP_popup.isAutoLogonAccess === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('ISAUTOFILLACCESS') === true) {
                    PMP_popup.isAutoFillAccess = details.ISAUTOFILLACCESS;
                    PMP_popup.isAutoFillAccess = (PMP_popup.isAutoFillAccess === 'true') ? true : false;          //  Converting string response to boolean
                }
                
                if (details.hasOwnProperty('ENFORCEMAXTIMELIMIT') === true) {
                    PMP_popup.enforceMaxTimeLimit = details.ENFORCEMAXTIMELIMIT;
                    PMP_popup.enforceMaxTimeLimit = (PMP_popup.enforceMaxTimeLimit === 'true') ? true : false;          //  Converting string response to boolean
                }
                if (details.hasOwnProperty('SESSIONTIMEOUT') === true) {
                    PMP_popup.SESSIONTIMEOUT = details.SESSIONTIMEOUT;
                }
                if (details.hasOwnProperty('ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT') === true) {
                    PMP_popup.enforcePreventBrowserAddAccount = details.ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT;
                    PMP_popup.enforcePreventBrowserAddAccount = (PMP_popup.enforcePreventBrowserAddAccount === 'true') ? true : false;          //  Converting string response to boolean
                }
                PMP_popup.loginName = details.USERLOGINNAME;
                PMP_popup.fullName = PMP_popup.loginName;
                if (PMP_popup.FIRSTFACTOR === 'AZUREAD' && PMP_popup.DOMAINNAME !== 'LOCAL') {
                    var azure_name_split = PMP_popup.loginName.split("@");
                    PMP_popup.loginName = azure_name_split[0];
                }

                PMP_popup.userRoles =userRoles;
                PMP_popup.USERID = details.USERID;
                if (details.hasOwnProperty('ORGLIST')) {
                    PMP_popup.ORGLIST =details.ORGLIST;
                } else {
                    PMP_popup.ORGLIST = null;
                }
               $('#tfaLoginFailed').hide();
                   
                
                if (PMP_popup.BUILDNUMBER >= 8402) {
                    PMP_popup.ISPERSONALTABENABLED = details.ISPERSONALTABENABLED;
                } else {
                    PMP_popup.ISPERSONALTABENABLED = null;
                }

                if (PMP_popup.BUILDNUMBER >= 8700)
                {
                	 if(PMP_popup.BUILDNUMBER<10102){
                         var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles?AUTHTOKEN=' + PMP_popup.authToken;
                     } else {
                     var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles';
                     }
                    PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: roleURL, headers: {'orgName': PMP_popup.orgName,'AUTHTOKEN': PMP_popup.authToken, 'ClientType': 12, 'requestFrom': 'pmpmobilenative', 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                        error: function (jqxhr, textStatus, errorThrown) {

                            
                        }
                    }).done(function (data) {

                        PMP_popup.setRoleFeatures(data);

                    });


                }
                setTimeout(function () {
                    var userData = {
                        "authToken": PMP_popup.authToken,
                        "sessionId": PMP_popup.SESSIONID,
                        "loginName": PMP_popup.loginName,
                        "userRoles": PMP_popup.userRoles,
                        "ORGLIST": PMP_popup.ORGLIST,
                        "USERID": PMP_popup.USERID,
                        "isAutoLogonAccess": PMP_popup.isAutoLogonAccess,
                        "isAutoFillAccess": PMP_popup.isAutoFillAccess,
                        "enforceMaxTimeLimit": PMP_popup.enforceMaxTimeLimit,
                        "ISPERSONALTABENABLED": PMP_popup.ISPERSONALTABENABLED,
                        "IsRoleAutologonAccess": PMP_popup.isRoleAutoLogonAccess,
                        "IsAccessCtrlAuthorize": PMP_popup.isAccessCtrlAuthorize,
                        "SESSIONTIMEOUT": PMP_popup.SESSIONTIMEOUT,
                        "enforcePreventBrowserAddAccount": PMP_popup.enforcePreventBrowserAddAccount

                    };
                    browser.runtime.sendMessage({//	sends message to background
                        'action': 'setAuthToken',
                        'data': userData
                    });

                }, 100);

                setTimeout(function () {
                    PMP_popup.mainTab();
                }, 400);

                document.getElementById("loginForm").reset();
               setTimeout(function () {
                        $('#tfaForm').fadeOut();
                        $('#tfaBackToLoginForm').fadeOut();
                        document.getElementById("tfaForm").reset();
                    }, 0);
                
            }
            return false;
        },
       
        setRoleFeatures: function (data)
        {
            var parsed = data;
            var status = popupUtils.checkStatus(parsed);
            var Details = parsed.operation.Details;
            if (status === true)
            {
                if (Details.indexOf('AutoLogon') != -1)
                {
                    PMP_popup.isRoleAutoLogonAccess = true;
                } else
                {
                    PMP_popup.isRoleAutoLogonAccess = false;
                }
                if (Details.indexOf('AccessControl_Authorize') != -1)
                {
                    PMP_popup.isAccessCtrlAuthorize = true;
                } else
                {
                    PMP_popup.isAccessCtrlAuthorize = false;
                }
            }
        },
        displayFailedStatus: function () {
            switch (PMP_popup.SECONDFACTOR) {
                case 'GOOGLE_AUTH'          :
                    $('#tfaLoginFailed').text(browser.i18n.getMessage("inv_google_auth_code"));
                    break;
                case 'MICROSOFT_AUTH'          :
                    $('#tfaLoginFailed').text(browser.i18n.getMessage("inv_microsoft_auth_code"));
                    break;
                case 'OKTAVERIFY_AUTH'          :
                    $('#tfaLoginFailed').text(browser.i18n.getMessage("inv_okta_auth_code"));
                    break;
                case 'VASCO_AUTH'           :
                    $('#tfaLoginFailed').text(browser.i18n.getMessage("inv_radius_auth_code"));
                    break;
                case 'EMAILPASSWORD_AUTH'   :
                    $('#tfaLoginFailed').text(browser.i18n.getMessage("inv_email_password"));
                    break;
                case 'RSA_AUTH'             :
                    $('#tfaLoginFailed').text(browser.i18n.getMessage("inv_rsa_password"));
                    break;
            }
        },
        getPersonalPassPhrase: function (data)
        {
            if (popupUtils.checkStatus(data) === true) {
                PMP_popup.passPhraseStatus = data.operation.Details.PASSPHRASESTATUS;
                browser.runtime.sendMessage({//	sends message to background
                    'action': 'setPassPhraseStatus',
                    'data': PMP_popup.passPhraseStatus
                });
                $('#resourceLoading').hide();
                if (PMP_popup.passPhraseStatus === "PASSPHRASE_NEED") {
                    $('#setupPersonalPasswordPopup').hide();
                    $('#personalInput').find('input').val('');
                    $('#personalCaptchaField').find('input').val('');
                    $('#getPersonalPassPhrase').show();
                    $('#personal_Ref_Div').hide();
                    $('#personalCapImg').hide();
                    $('#personalCaptchaField').hide();
                    $('#personalInput').find('input').focus();
                    $('#personal_Ref_Div').click(function () {
                    	var random_number = Math.random();
                    	var captchaURL = 'https://' + PMP_popup.serverName + '/captcha/j_captcha?t='+random_number;
                    	$("#personalCapImg").attr("src",captchaURL);
                    });
                    $('#getPersonalPassPhrase').unbind('submit');
                    $('#getPersonalPassPhrase').submit(function () {
                        var passPhrase = $('#personalInput').find('input').val();
                        if (PMP_popup.BUILDNUMBER >= 12230){
                         	passPhrase = encodeURIComponent(passPhrase);
                        }
                        var captchaText = null;
                        if(PMP_popup.SHOWCAPTCHA==true){
                        	captchaText = $('#personalCaptchaInput').find('input').val();
                        	captchaText = encodeURIComponent(captchaText);
                        }
                        //var passPhraseCheck = PMP_Utils.hasHarmfulContent(passPhrase);
                        if (PMP_Utils.isValid(passPhrase))
                        {
                            popupUtils.validatePassPhrase(passPhrase, captchaText);
                        } else
                        {
                            var decryptFailed = browser.i18n.getMessage("decrypt_failed_verify_key");
                            PMP_Utils.reasonFailedMessage(decryptFailed);
                            $('#personalInput').find('input').val('');
                            $('#personalCaptchaInput').find('input').val('');
                            $('#personalInput').find('input').focus();
                            if(PMP_popup.SHOWCAPTCHA==true){
                            	var random_number = Math.random();
                            	var captchaURL = 'https://' + PMP_popup.serverName + '/captcha/j_captcha?t='+random_number;
                            	$("#personalCapImg").attr("src",captchaURL);
                            }
                        }
                        return false;
                    });
                } else if (PMP_popup.passPhraseStatus === "PASSPHRASE_NOT_NEED") {
                    PMP_popup.personalPassPhrase = null;
                    PMP_popup.setPersonalPassPhrase();
                } else if (PMP_popup.passPhraseStatus === "PASSPHRASE_NOT_SET") {
                    var setupPersonalTab = browser.i18n.getMessage("configure_personal_password_web_client");
                    $('#setupWarningDetails').text(setupPersonalTab);
                    $('#setupPersonalPasswordPopup').show();
                }
            } else {
                PMP_popup.passPhraseStatus = "PASSPHRASE_STATUS_FAILURE";
                browser.runtime.sendMessage({//	sends message to background
                    'action': 'setPassPhraseStatus',
                    'data': PMP_popup.passPhraseStatus
                });
                $('#resourceLoading').hide();
                var responseMessage = data.operation.result.message;
                $('#setupWarningDetails').text(responseMessage);
                $('#setupPersonalPasswordPopup').show();
            }
        },
        setPersonalPassPhrase: function () {
            browser.runtime.sendMessage({//	sends message to background
                'action': 'setPersonalPassPhrase',
                'data': PMP_popup.personalPassPhrase
            });
            $('#personalProceedLoading').hide();
            $('#getPersonalPassPhrase').hide();
            $('#reasonFailed').hide();
            $('#resourceLoading').show();
            var isTabReset = true;
            popupUtils.getPersonalCategoryList(isTabReset);
             
        },
        personalCategoryListSuccess: function (data, isTabReset) {
            PMP_popup.personalCategoryListLength = data.operation.Details.TOTALROWS;
            PMP_popup.personalCategoryList = data.operation.Details["CATEGORY LIST"];
            if (isTabReset === true) {
                var defaultCatId = data.operation.Details.DEFAULTCATEGORYID;
                var idMatch = PMP_popup.matchCategoryId(defaultCatId);
                if (idMatch)
                {
                    PMP_popup.selectedCategoryId = defaultCatId;
                PMP_popup.setSelectedCategoryText();

                $('#personalCategory').show();

                PMP_popup.personalAccountStartIndex = 0;
                popupUtils.getPersonalPasswords();
                } else
                {

                    if (data.operation.Details.TOTALROWS == "0")
                    {
                        $('#personalCategoryIcon').hide();
                        $('#personalCategory').show();
                        var accList = document.createElement("div");
                        accList.setAttribute("class", "noResources");
                        var accListText = document.createTextNode(browser.i18n.getMessage("no_accounts_found"));
                        accList.appendChild(accListText);
                        var persAccList = document.getElementById("personalAccountList");
                        persAccList.appendChild(accList);
                        $('#resourceLoading').hide();
                        $('#personalAccountList').fadeIn();
                        $('#personalAccountList').scrollTop(0);
                    } else
                    {
                        PMP_popup.selectedCategoryId = PMP_popup.personalCategoryList[0].CATEGORYID;
                        PMP_popup.setSelectedCategoryText();
                        $('#personalCategory').show();
                        PMP_popup.personalAccountStartIndex = 0;
                        popupUtils.getPersonalPasswords();
                        $('#resourceLoading').hide();
                    }

                }

            } else {
                PMP_popup.showCategoryList('');
            }
        },
        setSelectedCategoryText: function () {
            for (var i = 0; i < PMP_popup.personalCategoryListLength; i++)
            {
                if (PMP_popup.personalCategoryList[i].CATEGORYID === PMP_popup.selectedCategoryId) {
                    var categoryIconUrl = PMP_popup.personalCategoryList[i].CATEGORYICON;
                    categoryIconUrl = 'https://' + PMP_popup.serverName + categoryIconUrl;
                    var categoryName = PMP_popup.personalCategoryList[i].CATEGORYNAME;
                    $('#personalCategoryIcon img').attr('src', categoryIconUrl);
                    $('#personalCategoryText').text(categoryName);
                    if (categoryName.length > 20) {
                        $('#personalCategoryText').attr('title', categoryName);
                    }
                    break;
                }
            }
        },
        matchCategoryId: function (catId) {
            for (var i = 0; i < PMP_popup.personalCategoryListLength; i++)
            {
                if (PMP_popup.personalCategoryList[i].CATEGORYID === catId) {
                    return true;
                }
            }
            return false;
        },
        showCategoryList: function (searchCategory) {
            $('#categoryList').empty();
            var categoryList = '';
            for (var i = 0; i < PMP_popup.personalCategoryListLength; i++)
            {
                var categoryName = PMP_popup.personalCategoryList[i].CATEGORYNAME;
                var categoryNameLowerCase = (categoryName).toLocaleLowerCase();
                if (categoryNameLowerCase.search(searchCategory) !== -1 || searchCategory === '') {
                    var categoryId = PMP_popup.personalCategoryList[i].CATEGORYID;
                   
                    var categoryIconUrl = PMP_popup.personalCategoryList[i].CATEGORYICON;
                    categoryIconUrl = 'https://' + PMP_popup.serverName + categoryIconUrl;
                    $('#categoryList').append($("<li>", {categoryId: categoryId}).append($("<div>", {class: "personalCategoryIcon"}).append($("<img>", {src: categoryIconUrl}))).append($("<div>", {class: "personalCategoryLister"}).text(categoryName)));

                }
            }
            if (PMP_popup.personalCategoryListLength==0) {
                var noCategoriesFound = browser.i18n.getMessage("no_categories_found");
                $('#categoryListDropDown').empty();
                $('#categoryListDropDown').append($("<div>",{class:"noCategoriesFound"}).text(noCategoriesFound));
                //categoryList = '<div class="noCategoriesFound">' + noCategoriesFound + '</div>';
            }
            $('#categoryListLoading').hide();

            PMP_popup.categoryListClick();
        },
        displayPersonalPasswords: function (data) {
            var accList;
            if (data.operation.Details["ACCOUNT LIST"] !== "ACCOUNTS_NOT_PRESENT") {
                if (PMP_popup.personalAccountStartIndex === 0) {
                    PMP_popup.personalAccountList = data.operation.Details["ACCOUNT LIST"];
                } else {
                    PMP_popup.personalAccountList = PMP_popup.personalAccountList.concat(data.operation.Details["ACCOUNT LIST"]);
                }
                PMP_popup.personalSelectedCategoryName = PMP_popup.getSelectedCategoryName();
                PMP_popup.personalAccountListTotalRows = parseInt(data.operation.Details.TOTALROWS);
                var currentAccListLength = parseInt(data.operation.Details.ROWSFETCHED);
                if (PMP_popup.personalAccountStartIndex === 0) {

                    accList = document.createElement("ul");
                    accList.setAttribute("id", "personalAccList");
                }
                 else
                {
                   accList = document.createElement(null);
                }
                var length = PMP_popup.personalAccountStartIndex + currentAccListLength;
                for (var i = PMP_popup.personalAccountStartIndex; i < length; i++)
                {
                    var isFavorite = PMP_popup.personalAccountList[i].IS_FAVOURITE;
                    var accountId = PMP_popup.personalAccountList[i].ACCOUNTID;
                    var liValue = PMP_popup.getPersonalAccountValue(i);

                    var accListLI = document.createElement("li");
                    accListLI.setAttribute("class", "personalAccount");
                    if(PMP_popup.personalSelectedCategoryName==='Web Accounts')
                    {
                        accListLI.setAttribute("copyValue", PMP_popup.personalAccountList[i].LOGINNAME);
                        accListLI.setAttribute("isTOTPConfigured", PMP_popup.personalAccountList[i].IS_TOTP_CONFIGURED);
                    }
                    else
                    {
                    accListLI.setAttribute("copyValue", liValue);
                    }
                   
                    accListLI.setAttribute("accountId", accountId);
                    accListLI.setAttribute("isfavorite", isFavorite);

                    var persFavSpan = document.createElement("span");
                    persFavSpan.setAttribute("class", "personalFavorite");
                    var persFavImg = document.createElement("img");
                    var imgsrc;
                    if (isFavorite==="true")
                    {
                        persFavSpan.setAttribute("title", browser.i18n.getMessage("remove_favorite"));
                        imgsrc = "/images/favoriteAccount.svg";
                    } else
                    {
                        persFavSpan.setAttribute("title", browser.i18n.getMessage("set_as_favorite"));
                        imgsrc = "/images/notFavoriteAccount.svg";
                    }
                    persFavImg.setAttribute("src", imgsrc);
                    persFavSpan.appendChild(persFavImg);
                    accListLI.appendChild(persFavSpan);

                    var accListDiv = document.createElement("div");
                    accListDiv.setAttribute("class", "personalAccName");
                    if (liValue.length > 25) {
                        accListDiv.setAttribute("title", liValue);
                    }

                    var accListVal = document.createTextNode(liValue);
                    accListDiv.appendChild(accListVal);
                    accListLI.appendChild(accListDiv);
                    accList.appendChild(accListLI);

                }


            } else {
                var accList = document.createElement("div");
                accList.setAttribute("class", "noResources");
                var accListText = document.createTextNode(browser.i18n.getMessage("no_accounts_found"));
                accList.appendChild(accListText);

            }
            if (PMP_popup.personalAccountStartIndex === 0) {
                $('#resourceLoading').hide();
                $('#personalAccountList').empty();
                var persAccList = document.getElementById("personalAccountList");
                persAccList.appendChild(accList);
                $('#personalAccountList').fadeIn();
                $('#personalAccountList').scrollTop(0);
            } else {
                $('#loadDuringListing').hide();
                $('#personalAccList').append(accList)
            }

            if (data.operation.Details["ACCOUNT LIST"] !== "ACCOUNTS_NOT_PRESENT") {

                var iter = 0;
                $('.personalHoverTools').empty();
                $('#personalAccList li').each(function () {

                    var persHoverTools = PMP_popup.getPersonalHoverTools(iter);
                    $(this).append(persHoverTools);
                    iter++;

                });

                PMP_popup.personalAccountFunctionality();
                PMP_popup.scrollPersonalAccounts();
            }
        },
        getPersonalFavorite: function (isFavorite, personalAccLI) {
            if (isFavorite === "true") {
                $(personalAccLI).append($("<span>", {class: "personalFavorite", title: browser.i18n.getMessage("remove_favorite")}).append($("<img>", {src: "/images/favoriteAccount.svg"})));
            } else {
                $(personalAccLI).append($("<span>", {class: "personalFavorite", title: browser.i18n.getMessage("set_as_favorite")}).append($("<img>", {src: "/images/notFavoriteAccount.svg"})));
            }

        },
        getPersonalAccountValue: function (iterator) {
            switch (PMP_popup.personalSelectedCategoryName)
            {
                case "Web Accounts":
                    return PMP_popup.personalAccountList[iterator].SERVICENAME;
                    break;
                case "Banking":
                    return PMP_popup.personalAccountList[iterator].BANKNAME;
                    break;
                case "Credit Cards":
                    return PMP_popup.personalAccountList[iterator].CARDNAME;
                    break;
                case "Contacts":
                    return PMP_popup.personalAccountList[iterator].CONTACTNAME;
                    break;
                default :
                    return PMP_popup.personalAccountList[iterator].TAGS;
            }
        },
        getSelectedCategoryName: function () {
            if ("SERVICENAME" in PMP_popup.personalAccountList[0]) {
                return "Web Accounts";
            }
            if ("BANKNAME" in PMP_popup.personalAccountList[0]) {
                return "Banking";
            }
            if ("CARDNAME" in PMP_popup.personalAccountList[0]) {
                return "Credit Cards";
            }
            if ("CONTACTNAME" in PMP_popup.personalAccountList[0]) {
                return "Contacts";
            }
            return '';
        },
        personalAccountFunctionality: function ()
        {
            $('#personalAccList li').unbind('mouseover');
            $('#personalAccList li').mouseover(function () {
                $(this).addClass('hover');
                var text = $(this).find('.personalAccName').text();
                if (PMP_Utils.isValid(text) === true) {
                    $(this).find('.personalHoverTools').show();
                }
            });

            $('#personalAccList li').unbind('mouseout');
            $('#personalAccList li').mouseout(function () {
                $(this).removeClass('hover');
                var text = $(this).find('.personalAccName').text();
                if (PMP_Utils.isValid(text) === true) {
                    $(this).find('.personalHoverTools').hide();
                }
            });

            $('.personalCopyValue').unbind('click');
            $('.personalCopyValue').click(function (event) {
                var copyText = $(this).parent().parent().attr('copyValue');
                popupUtils.copyString(copyText);
                popupUtils.copiedMessage();
                PMP_Utils.dropDownController("");
                event.stopPropagation();
            });

            $('.personalFavorite').unbind('click');
            $('.personalFavorite').click(function (event) {
                var operation = '';
                var isFavorite = $(this).parent().attr('isfavorite');
                var accountId = $(this).parent().attr('accountId');
                operation = (isFavorite === 'false') ? 'setfavourite' : 'removefavourite';
                var data = popupUtils.modifyPersonalFavorite(accountId, operation);
                var parsed = JSON.parse(data);
                var status = popupUtils.checkStatus(parsed);
                if (status === true) {
                    if (operation === 'setfavourite') {
                        var remFav = browser.i18n.getMessage("remove_favorite");
                        $(this).parent().attr('isFavorite', 'true');
                        $(this).attr('title', remFav);
                        $(this).empty();
                        $(this).append($("<img>", {src: "/images/favoriteAccount.svg"}));
                    } else {
                        var setFav = browser.i18n.getMessage("set_as_favorite");
                        $(this).parent().attr('isFavorite', 'false');
                        $(this).attr('title', setFav);
                        $(this).empty();
                        $(this).append($("<img>", {src: "/images/notFavoriteAccount.svg"}));
                    }
                }
                event.stopPropagation();
            });

            $('#personalAccList li').unbind('click');
            $('#personalAccList li').click(function (event) {
                PMP_Utils.dropDownController("");

                var clickedLiName = $(this).attr('copyValue');
                var selectedAccountId = $(this).attr('accountId');
                var isFavorite = $(this).attr('isfavorite');
                $('#personalAccountDetailsHeader').find('.personalAccountDetailsHeaderName').text(clickedLiName);
                var favIconDecider = (isFavorite === 'true') ? "/images/favoriteAccount.svg" : "/images/notFavoriteAccount.svg";
                var remFav = browser.i18n.getMessage("remove_favorite");
                var setFav = browser.i18n.getMessage("set_as_favorite");
                var title = (isFavorite === 'true') ? remFav : setFav;
                $('.personalAccountFavorite').empty();
                $('.personalAccountFavorite').append($("<img>", {src: favIconDecider}));
                $('.personalAccountFavorite').attr('isfavorite', isFavorite);
                $('.personalAccountFavorite').attr('title', title);
                $('#personalAccountDetailsBody').empty();
                $('#personalCategory').hide();
                $('#personalAccountList').hide();
                $('#personalAccountDetails').show();
                $('#resourceLoading').show();
                popupUtils.getPersonalAccFields(selectedAccountId);
                event.stopPropagation();
            });

            if (PMP_popup.personalSelectedCategoryName === 'Web Accounts')
            {
                $('.personalAutoLogon').unbind('click');
                $('.personalAutoLogon').click(function (event) {
                    var personalAccountId = $(this).parent().parent().attr('accountId');
                    var loginURL = PMP_popup.getPersonalAccountAttr('SERVICEURL', personalAccountId);
                    var loginName = PMP_popup.getPersonalAccountAttr('LOGINNAME', personalAccountId);
                    let isTOTPConfigured = PMP_popup.getPersonalAccountAttr('IS_TOTP_CONFIGURED', personalAccountId);
                    var loginPwd = PMP_popup.getPersonalAccountPassword(personalAccountId);
                    var formParams = null;
                    var resourceUrlHasPlaceHolder = false;
                    loginURL=new URL(loginURL).toString();
                    var resourceData = {
                        "username": loginName,
                        "password": loginPwd,
                        "resourceUrl": loginURL,
                        "formParams": formParams,
                        "resourceUrlHasPlaceHolder": resourceUrlHasPlaceHolder,
                        "accountId" : personalAccountId,
                        "isTOTPConfigured" : isTOTPConfigured,
                        "isPersonal" : true
                    };
                    PMP_popup.autoLogonTabCheck(resourceData);
                    event.stopPropagation();
                });

                $('.personalAutoLogonDisabled').unbind('click');
                $('.personalAutoLogonDisabled').click(function (event) {
                    PMP_Utils.dropDownController("");
                    event.stopPropagation();
                });

                $('.personalCopyPwd').unbind('click');
                $('.personalCopyPwd').click(function (event) {
                    var personalAccountId = $(this).parent().parent().attr('accountId');
                    var copyText = PMP_popup.getPersonalAccountPassword(personalAccountId);
                    popupUtils.copyString(copyText);
                    popupUtils.copiedMessage();
                    PMP_Utils.dropDownController("");
                    event.stopPropagation();
                });
                $('.personalCopyTOTP').unbind('click');
                $('.personalCopyTOTP').click(function (event) {
                    var personalAccountId = $(this).parent().parent().attr('accountId');
                    serverUtils.generatePersonalTOTP(personalAccountId,PMP_popup).then(totp=>{
                        popupUtils.copyString(totp);
                        popupUtils.copiedMessage();
                    })
                    PMP_Utils.dropDownController("");
                    event.stopPropagation();
                });
                $('.personalCopyTOTPDisabled').unbind('click');
                $('.personalCopyTOTPDisabled').click(function (event) {
                    PMP_Utils.dropDownController("");
                    event.stopPropagation();
                });
            }
        },
        getPersonalAccountPassword: function (accountId) {
            var accListLength = PMP_popup.personalAccountList.length;
            for (var i = 0; i < accListLength; i++) {
                if (accountId === PMP_popup.personalAccountList[i].ACCOUNTID) {
                    return PMP_popup.personalAccountList[i].PASSWORD;
                }
            }
            return '';
        },
        scrollPersonalAccounts: function () {
            var displayHeight = $('#personalAccountList').height();
            var totalScrollHeight = document.getElementById('personalAccountList').scrollHeight;

            $('#personalAccountList').unbind('scroll');
            $('#personalAccountList').scroll(function () {
                var scrollTop = $('#personalAccountList').scrollTop();
                var scrolledUpto = displayHeight + scrollTop;
                var yetToScroll = totalScrollHeight - scrolledUpto;

                var index = PMP_popup.personalAccountStartIndex;
                var haveToScroll = (PMP_popup.personalAccountListTotalRows > (index + PMP_popup.LIMIT)) ? true : false;
                if (yetToScroll <= 0 && haveToScroll === true) {
                    $('#personalAccountList').unbind('scroll');
                    PMP_popup.personalAccountStartIndex += PMP_popup.LIMIT;
                    if (PMP_popup.isSearchQuery === true) {
                        popupUtils.searchPersonalPasswords(PMP_popup.searchValue);
                    } else {
                        popupUtils.getPersonalPasswords();
                    }
                }
            });
        },
        displayPersonalAccDetails: function (selectedAccountId) {
            var personalAccListLength = PMP_popup.personalAccountList.length;
            for (var i = 0; i < personalAccListLength; i++)
            {
                var accountId = PMP_popup.personalAccountList[i].ACCOUNTID;
                if (accountId === selectedAccountId) {
                    $('#resourceLoading').hide();
                    var persAccDetUL = document.createElement("ul");
                    persAccDetUL.setAttribute("id", "personalAccountDetailsList");
                    var persAccDetBody = document.getElementById("personalAccountDetailsBody");
                    persAccDetBody.appendChild(persAccDetUL);
                    PMP_popup.getAccountDefaultFieldDetails(i);
                    PMP_popup.getPersonalTOTPFieldDetails(i);
                    PMP_popup.getAccountCustomFieldDetails(i);
                    let validity = 30;
                    if(PMP_popup.personalAccountList[i].TOTP_VALIDITY){
                        validity =parseInt(PMP_popup.personalAccountList[i].TOTP_VALIDITY);
                    }
                    PMP_popup.personalAccountDetailsFunctionality(selectedAccountId,validity);
                    return false;
                }
            }
        },
        getAccountDefaultFieldDetails: function (iterator) {

            var defaultFieldListLength = PMP_popup.personalDefaultFieldList.length;
            var accDetails;
            for (var i = 0; i < defaultFieldListLength; i++)
            {
                var defaultColumnLabel = PMP_popup.personalDefaultFieldList[i].FIELDLABEL;
                var defaultColumnName = PMP_popup.personalDefaultFieldList[i].FIELDCOLUMNNAME;
                var defaultColumnValue = PMP_popup.personalAccountList[iterator][defaultColumnName];
                var isPasswordField = PMP_popup.personalDefaultFieldList[i].FIELDTYPE === "Password" ? true : false;
                if(PMP_popup.personalDefaultFieldList[i].FIELDCOLUMNNAME.startsWith("TOTP")){
                    continue;
                }
                if (isPasswordField === false) {
                    accDetails = PMP_popup.getPersonalAccDetailsLi(defaultColumnLabel, defaultColumnValue, isPasswordField);
                    $('#personalAccountDetailsList').append(accDetails);
                }
            }

        },
        getAccountCustomFieldDetails: function (iterator) {
            if (PMP_popup.personalCustomFieldList !== "CUSTOM_FIELDS_NOT_PRESENT") {
                var customFieldListLength = PMP_popup.personalCustomFieldList.length;
                var accDetails;
                for (var i = 0; i < customFieldListLength; i++)
                {
                    var customColumnLabel = PMP_popup.personalCustomFieldList[i].CUSTOMFIELDLABEL;
                    var customColumnName = PMP_popup.personalCustomFieldList[i].CUSTOMFIELDCOLUMNNAME;
                    var customColumnValue = PMP_popup.personalAccountList[iterator][customColumnName];
                    var isPasswordField = PMP_popup.personalCustomFieldList[i].CUSTOMFIELDTYPE === "Password" ? true : false;
                    accDetails = PMP_popup.getPersonalAccDetailsLi(customColumnLabel, customColumnValue, isPasswordField);
                    $('#personalAccountDetailsList').append(accDetails);
                }

            }

        },
        getPersonalAccDetailsLi: function (displayKey, displayValue, isPasswordField) {
            var copyText = browser.i18n.getMessage('copy');
            var persAccDetLI = document.createElement("li");

            var persAccLabel = document.createElement("div");
            persAccLabel.setAttribute("class", "personalAccountLabel");
            var persAccLabelText = document.createTextNode(displayKey);
            persAccLabel.appendChild(persAccLabelText);
            persAccDetLI.appendChild(persAccLabel);

            var copyPersDet = document.createElement("div");
            copyPersDet.setAttribute("class", "copyPersonalAccountDetails");
            copyPersDet.setAttribute("title", copyText);
            var copyPersImg = document.createElement("img");
            copyPersImg.setAttribute("src", "/images/copy.png");
            copyPersDet.appendChild(copyPersImg);
            persAccDetLI.appendChild(copyPersDet);

            var copyPersAccVal = document.createElement("div");
            copyPersAccVal.setAttribute("class", "personalAccountValue");
            copyPersAccVal.setAttribute("copyValue", displayValue);
            if (isPasswordField === true && PMP_Utils.isValid(displayValue) === true) {
                displayValue = '****';
            }
            var copyPersAccValText = document.createTextNode(displayValue);
            copyPersAccVal.appendChild(copyPersAccValText);
            persAccDetLI.appendChild(copyPersAccVal);
            return  persAccDetLI;
        },
        personalAccountDetailsFunctionality: function (selectedAccountId,validity) {
            $('.personalAccountDetailsBackButton').unbind('click');
            $('.personalAccountDetailsBackButton').click(function () {
                $('#personalAccountDetails').hide();
                $('#resourceLoading').hide();
                PMP_popup.AJAXREQUEST.abort();
                $('#personalCategory').show();
                $('#personalAccountList').show();
            });

            $('.copyPersonalAccountDetails').unbind('click');
            $('.copyPersonalAccountDetails').click(function () {
                var copyText = $(this).parent().find('.personalAccountValue').attr('copyValue');
                popupUtils.copyString(copyText);
                popupUtils.copiedMessage();
            });

            $('.personalAccountFavorite').unbind('click');
            $('.personalAccountFavorite').click(function () {
                var isFavorite = $(this).attr('isfavorite');

                var operation = (isFavorite === 'false') ? 'setfavourite' : 'removefavourite';
                var data = popupUtils.modifyPersonalFavorite(selectedAccountId, operation);
                var parsed = JSON.parse(data);
                var status = popupUtils.checkStatus(parsed);
                if (status === true) {
                    var favIconDecider = (isFavorite === 'true') ? "/images/notFavoriteAccount.svg" : "/images/favoriteAccount.svg";
                    var remFav = browser.i18n.getMessage("remove_favorite");
                    var setFav = browser.i18n.getMessage("set_as_favorite");
                    var title = (isFavorite === 'true') ? setFav : remFav;
                    isFavorite = (isFavorite === 'true') ? 'false' : 'true';
                    $('.personalAccountFavorite').empty();
                    $('.personalAccountFavorite').append($("<img>", {src: favIconDecider}));
                    $('.personalAccountFavorite').attr('isfavorite', isFavorite);
                    $('.personalAccountFavorite').attr('title', title);

                    $('#personalAccList li').each(function () {
                        var accId = $(this).attr('accountid');
                        if (accId === selectedAccountId) {
                            $(this).find('.personalFavorite').empty();
                            $(this).find('.personalFavorite').append($("<img>", {src: favIconDecider}));
                            $(this).attr('isfavorite', isFavorite);
                            $(this).find('.personalFavorite').attr('title', title);
                            return false;
                        }
                    });
                }
            });

            $('#personalAccountDetailsList li').mouseover(function () {
                var text = $(this).find('.personalAccountValue').text();
                if (PMP_Utils.isValid(text) === true) {
                    $(this).find('.copyPersonalAccountDetails').show();
                }                
            });

            $('#personalAccountDetailsList li').mouseout(function () {
                var text = $(this).find('.personalAccountValue').text();
                if (PMP_Utils.isValid(text) === true) {
                    $(this).find('.copyPersonalAccountDetails').hide();
                }
            });
            PMP_popup.personalAccountDetailsTOTP(selectedAccountId,validity);
        },
        personalAccountDetailsTOTP : function(accountId,validity){
            $('.copyPersonalAccountTOTP').click(function () {
                serverUtils.generatePersonalTOTP(accountId,PMP_popup).then(totp=>{
                    popupUtils.copyString(totp);
                    popupUtils.copiedMessage();
                })
            });
            $('.showHidePersonalTOTP').click(function(){
                let eyeIconElement = document.getElementById("showHidePersonalTOTP");
                let totpValueEle = document.getElementById("personalTOTPValue");
                let totpHiddenElem = document.getElementById("personalTOTPHidden");
                if(eyeIconElement.classList.contains('icon-showpwd')){  
                    let totpValue = totpValueEle.textContent;
                    if(totpValue == ""){
                        serverUtils.generatePersonalTOTP(accountId,PMP_popup).then(totp=>{
                            totpValueEle.textContent = totp;
                            let remainingSeconds = PMP_Utils.getRemainingSeconds(validity);
                            setTimeout(()=>{
                                if (!totpValueEle.classList.contains("hide")) { //NO I18N
                                    totpValueEle.classList.toggle("hide"); // NO I18N
                                    totpHiddenElem.classList.toggle("hide"); // NO I18N
                                    eyeIconElement.classList.toggle("icon-showpwd"); // NO I18N
                                    eyeIconElement.classList.toggle("icon-hidepwd"); // NO I18N
                                }
                                totpValueEle.textContent="";
                            },remainingSeconds*1000)
                        })
                    }
                }
                totpValueEle.classList.toggle("hide"); // NO I18N
                totpHiddenElem.classList.toggle("hide"); // NO I18N
                eyeIconElement.classList.toggle("icon-showpwd"); // NO I18N
                eyeIconElement.classList.toggle("icon-hidepwd"); // NO I18N
            });
            circleAnimation.startCircleAnimation("personalAnimateCircleId",validity);
        },
        getPersonalAccountAttr: function (key, personalAccountId)
        {
            var accLength = PMP_popup.personalAccountList.length;
            for (var i = 0; i < accLength; i++)
            {
                if (personalAccountId === PMP_popup.personalAccountList[i].ACCOUNTID)
                {
                    return PMP_popup.personalAccountList[i][key];
                }
            }
        },
        getPersonalHoverTools: function (iterator)
        {
            var title = PMP_popup.personalSelectedCategoryName === "Web Accounts" ? browser.i18n.getMessage("copy_service_name") : browser.i18n.getMessage("copy");

            var persCopyValSpan = document.createElement("span");
            persCopyValSpan.setAttribute("class", "personalCopyValue");
            persCopyValSpan.setAttribute("title", title);
            var persCopyImg = document.createElement("img");
            persCopyImg.setAttribute("src", "/images/copy_username.png");
            persCopyValSpan.appendChild(persCopyImg);

            var persHoverTools = document.createElement("div");
            persHoverTools.setAttribute("class", "personalHoverTools");

            if (PMP_popup.personalSelectedCategoryName === "Web Accounts") {
                var splitArr = PMP_popup.personalAccountList[iterator].SERVICEURL.match(/^(https?|ftp|file):\/\//i);
                var isUrlCompatible = PMP_popup.personalAccountList[iterator].SERVICEURL.startsWith('www.');
                var autoLogonImg = document.createElement("img");
                autoLogonImg.setAttribute("src", "/images/autoLogon.png");

                if ((splitArr === null && isUrlCompatible === false) || PMP_popup.isAutoLogonAccess === false) {
                    var title = PMP_popup.isAutoLogonAccess === false ? browser.i18n.getMessage("autologon_access_disabled_by_admin") : browser.i18n.getMessage("service_url_not_configured");

                    var persAutoLogonDisabled = document.createElement("span");
                    persAutoLogonDisabled.setAttribute("class", "personalAutoLogonDisabled");
                    persAutoLogonDisabled.setAttribute("title", title);
                    persAutoLogonDisabled.appendChild(autoLogonImg);
                    persHoverTools.appendChild(persAutoLogonDisabled);

                } else {
                    if (isUrlCompatible === true) {
                        PMP_popup.personalAccountList[iterator].SERVICEURL = 'http://' + PMP_popup.personalAccountList[iterator].SERVICEURL;
                    }
                    var persAutoLogon = document.createElement("span");
                    persAutoLogon.setAttribute("class", "personalAutoLogon");
                    persAutoLogon.setAttribute("title", browser.i18n.getMessage("auto_logon"));
                    persAutoLogon.appendChild(autoLogonImg);
                    persHoverTools.appendChild(persAutoLogon);

                }
                persHoverTools.appendChild(persCopyValSpan);

                let persCopyTOTP = document.createElement("span");
                let copyTOTPImg = document.createElement("img");
                copyTOTPImg.setAttribute("src", "/images/totp.png");
                persCopyTOTP.appendChild(copyTOTPImg);
                persHoverTools.appendChild(persCopyTOTP);
                if(PMP_popup.personalAccountList[iterator].IS_TOTP_CONFIGURED === 'true'){
                    persCopyTOTP.setAttribute("class", "personalCopyTOTP");
                    persCopyTOTP.setAttribute("title", chrome.i18n.getMessage("copy_totp"));
                } else {
                    persCopyTOTP.setAttribute('class','personalCopyTOTPDisabled');
                    persCopyTOTP.setAttribute("title", chrome.i18n.getMessage("totp_not_configured"));
                }

                var persCopyPwd = document.createElement("span");
                persCopyPwd.setAttribute("class", "personalCopyPwd");
                persCopyPwd.setAttribute("title", browser.i18n.getMessage("copy_password"));
                var copyPwdImg = document.createElement("img");
                copyPwdImg.setAttribute("src", "/images/copy_password.png");
                persCopyPwd.appendChild(copyPwdImg);
                persHoverTools.appendChild(persCopyPwd);

            } else {
                persHoverTools.appendChild(persCopyValSpan);

            }


            return persHoverTools;
        },
        getPersonalTOTPFieldDetails : function(iterator){
            if(PMP_popup.personalAccountList[iterator].IS_TOTP_CONFIGURED == 'true'){
                var accDetTOTPLI = document.createElement("li");

                var accRowLeftDiv = document.createElement("div");
                accRowLeftDiv.setAttribute("class","acc-row-left");

                var accLabelTOTPDiv = document.createElement("div");
                accLabelTOTPDiv.setAttribute("class", "personalAccountLabel");
                var accTOTPText = document.createTextNode(browser.i18n.getMessage("totp"));
                accLabelTOTPDiv.appendChild(accTOTPText);

                var hiddenTOTPDiv = document.createElement("div");
                hiddenTOTPDiv.setAttribute("id","personalTOTPHidden");
                hiddenTOTPDiv.setAttribute("class", "personalAccountValue");
                var hiddenTOTPText = document.createTextNode("******");
                hiddenTOTPDiv.appendChild(hiddenTOTPText);

                var valueTOTPDiv = document.createElement("div");
                valueTOTPDiv.setAttribute("id","personalTOTPValue");
                valueTOTPDiv.setAttribute("class", "personalAccountValue hide");

                accRowLeftDiv.appendChild(accLabelTOTPDiv)
                accRowLeftDiv.appendChild(hiddenTOTPDiv);
                accRowLeftDiv.appendChild(valueTOTPDiv);
                
                var viewTOTPDiv = document.createElement("div");
                viewTOTPDiv.setAttribute("id","showHidePersonalTOTP");
                viewTOTPDiv.setAttribute("class", "showHidePersonalTOTP icon-showpwd");
                viewTOTPDiv.setAttribute("title", browser.i18n.getMessage("show_hide_totp"));                    

                var copyTOTPDiv = document.createElement("div");
                copyTOTPDiv.setAttribute("class", "copyPersonalAccountTOTP totp-icon");
                copyTOTPDiv.setAttribute("title", browser.i18n.getMessage("copy_totp"));
                var copyTOTPImg = document.createElement("img");
                copyTOTPImg.setAttribute("src", "/images/totp.png");
                copyTOTPDiv.appendChild(copyTOTPImg);
                
                var timerSpan = document.createElement("span");
                timerSpan.setAttribute("class","totp-panel totp-timer");
                timerSpan.innerHTML='<svg width="30" height="30"><circle r="8" cy="15" cx="15" stroke-width="5" stroke="#ccc" fill="none" /><circle id="personalAnimateCircleId" r="8" cy="15" cx="15" stroke-width="5" stroke="#4780da" fill="none" data-totp_circle="totp_circle" /></svg>';

                var iconDivs = document.createElement("div");
                iconDivs.setAttribute("class","acc-row-right");
                iconDivs.appendChild(viewTOTPDiv);
                iconDivs.appendChild(copyTOTPDiv);
                iconDivs.appendChild(timerSpan);
                
                var totpRowDiv = document.createElement("div");
                totpRowDiv.setAttribute("class","totp-row");

                totpRowDiv.appendChild(accRowLeftDiv);
                totpRowDiv.appendChild(iconDivs);

                accDetTOTPLI.appendChild(totpRowDiv);

                $('#personalAccountDetailsList').append(accDetTOTPLI);
            }  
        }
    };

    var PMP_Utils = {
        getDomain: function (url) {
            if (typeof url !== "undefined" && url !== "" && url.indexOf("/") !== -1) {
                var urlRegex = "^(https?|ftp|file)://(www.)?([^/]*)/?.*";
                var splitArr = url.match(urlRegex);
                return (splitArr !== null && splitArr.length > 3) ? splitArr[3] : url;
            }
            return url;
        },
        SearchEscapeQuotes: function (str) {
            var tagsToReplace = {
                '"': '\\\"',
                '\'': '&apos;',
                '\\': '\\\\',
                '/': '\/',
                '>': '&#62',
                '<': '&#60;'
            };
            return str.replace(/[<>"'\/\\]/g, function (tag) {
                return tagsToReplace[tag] || tag;
            });
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
        htmlInitializer: function () {
            PMP_Utils.serverDetailsPage();
            PMP_Utils.loginPage();
            PMP_Utils.pmpMenuPage();
            PMP_Utils.settingsPage();
            PMP_Utils.otherFeatures();
            PMP_Utils.personalPasswordPage();
        },
        serverDetailsPage: function () {
            var hostName = browser.i18n.getMessage("host_name");
            var port = browser.i18n.getMessage("port");
            var enterOrgName = browser.i18n.getMessage("Enter_MSP_Org_Name");
            var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
            var orgName = browser.i18n.getMessage("org_name");
            var save = browser.i18n.getMessage("save");
            var backToLoginForm = browser.i18n.getMessage("login_page");
            var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
            serverNotReachable += ' ' + browser.i18n.getMessage("verify_entered_details");
            var invalidServerCredentials = chrome.i18n.getMessage("server_not_reachable");


            $('#hostname').attr('placeholder', hostName);
            $('#port').attr('placeholder', port);
            $('#orgName').attr('placeholder', orgName);
            $('#mspOrgRequired').text(enterOrgName);
            $('.serverFailed').text(serverNotReachable);
            $('.serverDetailsSaveButtonTd').find('input').val(save);
            $('#backToLoginForm').attr('title', backToLoginForm);
            $('#invalidServerCredentials').text(invalidServerCredentials);
        },
        loginPage: function () {
            var loginFailed = browser.i18n.getMessage("invalid_username_password");
            var serverNotReachable = browser.i18n.getMessage("server_not_reachable");
            var serverConnectivityLost = browser.i18n.getMessage("lost_connection_to_server");
            var serverSettingsConfig = browser.i18n.getMessage("server_config_details");
            var username = browser.i18n.getMessage("user_name");
            var password = browser.i18n.getMessage("password");
            var bannerLink = browser.i18n.getMessage("terms_and_conditions");
            var privacyLink = browser.i18n.getMessage("privacy_policy");
            var login = browser.i18n.getMessage("login");

            $('#loginFailed').text(loginFailed);
            $('#serverNotReachable').text(serverNotReachable);
            $('#serverConnectivityLost').text(serverConnectivityLost);
            $('#serverSettingsConfig').attr('title', serverSettingsConfig);
            $('#username').attr('placeholder', username);
            $('#password').attr('placeholder', password);
            $('.bannerLink').text(bannerLink);
            $('.privacyLink').text(privacyLink);
            $('.loginButton').val(login);
            $('#ref_div').click(function () {
            	var random_number = Math.random();
            	var captchaURL = 'https://' + PMP_popup.serverName + '/captcha/j_captcha?t='+random_number;
            	$('#capimg').attr('src',captchaURL);
            });

            //  TFA Login Page section

            var tfaLoginFailed = browser.i18n.getMessage("invalid_password_otp");
            var tfaOTP = browser.i18n.getMessage("one_time_password");
            var tfaBackToLoginForm = browser.i18n.getMessage("back");

            $('#tfaLoginFailed').text(tfaLoginFailed);
            $('#tfaOTP').attr('placeholder', tfaOTP);
            if(PMP_popup.BUILDNUMBER<9802)
            {
                $('#tfaPassword').attr('placeholder', password);
                $('.tfaBannerLink').attr('placeholder', bannerLink);
                $('.tfaPrivacyLink').attr('placeholder', privacyLink);
            }
            $('#tfaBackToLoginForm').attr('title', tfaBackToLoginForm);
        },
        pmpMenuPage: function () {
            var searchAllResource = browser.i18n.getMessage("invalid_password_otp");
            var advancedSearch = browser.i18n.getMessage("advanced_search");
            var searchOrg = browser.i18n.getMessage("search_organization");
            var popupSettings = browser.i18n.getMessage("settings");
            var accessControl = browser.i18n.getMessage("access_control");
            var addResource = browser.i18n.getMessage("add_resource");
            var help = browser.i18n.getMessage("help");
            var about = browser.i18n.getMessage("about");
            var signoutText = browser.i18n.getMessage("logout");
            var copiedToClipboard = browser.i18n.getMessage("copied_to_clipboard");
            var settingSaved = browser.i18n.getMessage("settings_saved");

            $('#searchResource').attr('placeholder', searchAllResource);
            $('#advancedSearch').attr('title', advancedSearch);
            $('#searchOrg').attr('placeholder', searchOrg);
            $('#popupSettings').text(popupSettings);
            $('#accessControl').text(accessControl);
            $('#addResource').text(addResource);
            $('#help').text(help);
            $('#about').text(about);
            $('#signoutText').text(signoutText);
            $('#copiedToClipboard').text(copiedToClipboard);
            $('#settingSaved').text(settingSaved);

            //  Tabs section in the menu page

            var allResources = browser.i18n.getMessage("all_passwords");
            var resourceGroups = browser.i18n.getMessage("resource_groups");
            var favorites = browser.i18n.getMessage("favorite_resources");
            var recentlyUsed = browser.i18n.getMessage("recently_used_resources");
            var personalPasswords = browser.i18n.getMessage("personal_passwords");

            $('.allResources').attr('title', allResources);
            $('.resourceGroups').attr('title', resourceGroups);
            $('.favorites').attr('title', favorites);
            $('.recentlyUsed').attr('title', recentlyUsed);
            $('.personalPasswords').attr('title', personalPasswords);
           
        },
        settingsPage: function () {
            var resourceHeader = browser.i18n.getMessage("settings");
            var copyRights = browser.i18n.getMessage("copy_rights");
            var clipboardBoxText = browser.i18n.getMessage("clipboard_default_text");
            var logoutBoxText = browser.i18n.getMessage("logout_default_text");
            var automaticallyLogoutAfter = browser.i18n.getMessage("automatically_logout_after");
            var clearClipboardIn = browser.i18n.getMessage("clear_clipboard_in");
            var buildNumber = browser.i18n.getMessage("build_number");
            var addonVersion = browser.i18n.getMessage("pmp_addon_version");
            var preventSave = browser.i18n.getMessage("prevent_password_save");
            var resourceDescription = browser.i18n.getMessage("resource_description");
            var save = browser.i18n.getMessage("save");
            var clipboardDropDown = browser.i18n.getMessage("clipboardDropDown_elements");
            var logoutDropDown = browser.i18n.getMessage("logoutDropDown_elements");
            var enableSubmit = browser.i18n.getMessage("enable_autofill_submit");
            var enablesso = browser.i18n.getMessage("enable_sso");

            PMP_Utils.addClipBoardDropDownElements();
            PMP_Utils.addLogoutDropDownElements();
            $('.resourceHeader').text(resourceHeader);
            $('.copy-rights').text(copyRights);
            $('#clipboardBoxText').text(clipboardBoxText);
            $('#logoutBoxText').text(logoutBoxText);
            $('#automaticallyLogoutAfter').text(automaticallyLogoutAfter);
            $('#clearClipboardIn').text(clearClipboardIn);
            $('#buildNumber').text(buildNumber);
            $('#addonVersion').text(addonVersion);
            $('#promptSave').text(preventSave);
            $('#SSOSetting').text(enablesso);
            $('.resourceDetailsHeaderName').text(resourceDescription);
            $('#autoFillSubmit').text(enableSubmit);
            $('#clipboardBoxNew').val(PMP_popup.CLIPBOARDTIMEOUT);
            $('#logoutBoxNew').val(PMP_popup.LOGOUTTIME);
            $('#SettingSaveButton').val(save);
        },
        addClipBoardDropDownElements: function ()
        {
            $('#clipboardDropDown').append($("<li>", {value: 10}).text('10' + browser.i18n.getMessage("seconds")));
            for (i = 30; i <= 120; i *= 2)
            {
                $('#clipboardDropDown').append($("<li>", {value: i}).text(i + browser.i18n.getMessage("seconds")));
            }
            $('#clipboardDropDown').append($("<li>", {value: 0}).text(browser.i18n.getMessage("never")));

        },
        addLogoutDropDownElements: function ()
        {
            $('#logoutDropDown').append($("<li>", {value: 15}).text('15' + browser.i18n.getMessage("minutes")));
            $('#logoutDropDown').append($("<li>", {value: 30}).text('30' + browser.i18n.getMessage("minutes")));
            $('#logoutDropDown').append($("<li>", {value: 60}).text('1' + browser.i18n.getMessage("hour")));
            $('#logoutDropDown').append($("<li>", {value: 120}).text('2' + browser.i18n.getMessage("hours")));
            $('#logoutDropDown').append($("<li>", {value: 240}).text('4' + browser.i18n.getMessage("hours")));
            $('#logoutDropDown').append($("<li>", {value: 720}).text('12' + browser.i18n.getMessage("hours")));
            $('#logoutDropDown').append($("<li>", {value: 1440}).text('24' + browser.i18n.getMessage("hours")));

        },
        otherFeatures: function () {
            var accessControlHeader = browser.i18n.getMessage("password_access_requests");
            var ticketText = browser.i18n.getMessage("ticket_id") + ' :';
            var reasonText = browser.i18n.getMessage("reason_for_retrieval") + ' :';
            var proceed = browser.i18n.getMessage("proceed");
            var cancel = browser.i18n.getMessage("cancel");
            var requestReasonText = browser.i18n.getMessage("comments") + ' :';
            var checkoutDetails = browser.i18n.getMessage("checkout_details_message");
            var checkinDetails = browser.i18n.getMessage("checkin_details_message");
            var confirmCheckout = browser.i18n.getMessage("check_out");
            var confirmCheckin = browser.i18n.getMessage("check_in");
            var bannerMessageButton = browser.i18n.getMessage("OK");

            $('.accessControlHeader').text(accessControlHeader);
            $('#reasonFailed').text(accessControlHeader);
            $('.ticketText').text(ticketText);
            $('.ticketText_request').text(ticketText);
            $('#reasonText').text(reasonText);

            $('#proceed').text(proceed);
            $('#sendRequest').text(proceed);

            $('#cancelRequest').text(cancel);
            $('#cancel').text(cancel);
            $('#cancelCheckout').text(cancel);
            $('#cancelCheckin').text(cancel);

            $('#requestReasonText').text(requestReasonText);
            $('#checkoutDetails').text(checkoutDetails);
            $('#confirmCheckout').text(confirmCheckout);
            $('#checkinDetails').text(checkinDetails);
            $('#confirmCheckin').text(confirmCheckin);
            $('#bannerMessageButton').text(bannerMessageButton);
            $('#privacyMessageButton').text(bannerMessageButton);
        },
        personalPasswordPage: function () {
            var enterKey = browser.i18n.getMessage("enter_your_passphrase") + ' : ';
            var proceed = browser.i18n.getMessage("proceed");
            var categoryName = browser.i18n.getMessage("category_name") + ' :';
            var searchCategory = browser.i18n.getMessage("search_category");

            $('#personalText').text(enterKey);
            $('#proceedPersonal').find('input').val(proceed);
            $('#categoryName').text(categoryName);
            $('#searchCategory').attr('placeholder', searchCategory);
        },
        searchMSPOrg: function () {
            $('#searchOrg').keyup(function () {
                PMP_Utils.searchMSPOrgDelayComplete();
            });
        },
        searchMSPOrgDelayComplete: function () {
            popupUtils.resetIdleTime();
            var searchingOrg = ($('#searchOrg').val().trim()).toLocaleLowerCase();
            var harmfulContentCheck = PMP_Utils.hasHarmfulContent(searchingOrg);
            if (harmfulContentCheck === false) {
                var noOrgsFound = browser.i18n.getMessage("no_organizations_found");
                $('#orgListDropDown').append($("<div>", {class: "noMSPOrgsFound"}).text(noOrgsFound));
                return false;
            }
            PMP_popup.showOrgList(searchingOrg);
        },
        searchResources: function () {
            var idleInterval;
            $('#searchResource').keyup(function (event) {
                window.clearTimeout(idleInterval);
                if (event.keyCode === '13') {
                    PMP_Utils.searchDelayComplete();
                } else {
                    idleInterval = window.setTimeout(function () {
                        PMP_Utils.searchDelayComplete();
                    }, 500);
                }
            });
        },
        searchPersonalCategory: function () {
            $('#searchCategory').keyup(function () {
                popupUtils.resetIdleTime();
                var searchCategory = ($('#searchCategory').val().trim()).toLocaleLowerCase();
                var harmfulContentCheck = PMP_Utils.hasHarmfulContent(searchCategory);
                if (harmfulContentCheck === false) {
                    $('#categoryListLoading').hide();
                    var noCategoriesFound = browser.i18n.getMessage("no_categories_found");
                    $('#categoryList').append($("<div>", {class: "noCategoriesFound"}).text(noCategoriesFound));
                } else {
                    searchCategory = encodeURIComponent(searchCategory);
                    $('#categoryList').empty();
                    $('#categoryListLoading').show();
                    PMP_popup.showCategoryList(searchCategory);
                }
            });
        },
        advancedSearch: function () {
            $('#advancedSearch').click(function (event) {

                PMP_Utils.dropDownController("advancedSearch");
                $('#searchCriteria').slideToggle(100);

                var data = popupUtils.getSearchColumns();
                var parsed = JSON.parse(data);
                var status = popupUtils.checkStatus(parsed);
                if (status === true) {
                    var totalRows = parsed.operation.totalRows;
                    var allResources = browser.i18n.getMessage("all_resources");
                    $('#searchCriteria').append($("<ul>", {id: "searchColumn"}));
                    $('#searchColumn').empty();
                    $('#searchColumn').append($("<li>").append($("<div>", {class: "advSearch", SEARCHTYPE: "RESOURCE", SEARCHCOLUMNDISPLAYNAME: allResources, SEARCHCOLUMN: "ALL"}).text(allResources)));
                    for (var i = 0; i < totalRows; i++)
                    {
                        var searchType = parsed.operation.Details[i].SEARCHTYPE;
                        var colDisplayname = parsed.operation.Details[i].SEARCHCOLUMNDISPLAYNAME;
                        var searchColumn = parsed.operation.Details[i].SEARCHCOLUMN;
                        if (colDisplayname.length > 25)
                        {
                            $('#searchColumn').append($("<li>").append($("<div>", {class: "advSearch", SEARCHTYPE: searchType, SEARCHCOLUMNDISPLAYNAME: colDisplayname, SEARCHCOLUMN: searchColumn, title: colDisplayname}).text(colDisplayname)));
                        } else
                        {
                            $('#searchColumn').append($("<li>").append($("<div>", {class: "advSearch", SEARCHTYPE: searchType, SEARCHCOLUMNDISPLAYNAME: colDisplayname, SEARCHCOLUMN: searchColumn}).text(colDisplayname)));
                        }

                    }

                } else {
                    PMP_popup.signoutCall();
                    PMP_popup.serverConnectivityLost();
                    event.stopPropagation();
                    return false;
                }
                PMP_Utils.selectSearchCriteria();
                event.stopPropagation();
            });
        },
        selectSearchCriteria: function () {
            $('#searchCriteria li').click(function (e) {
                PMP_popup.SEARCHTYPE = $(this).find('.advSearch').attr('SEARCHTYPE');
                PMP_popup.SEARCHCOLUMN = $(this).find('.advSearch').attr('SEARCHCOLUMN');
                var colDisplayname = 'Search ' + $(this).find('.advSearch').attr('SEARCHCOLUMNDISPLAYNAME');
                $('#searchResource').attr('placeholder', colDisplayname);
                $('#searchCriteria').slideToggle(100);
                e.stopPropagation();
            });

            $('#searchCriteria li').mouseover(function () {
                $(this).addClass('searchCriteriaHover');
            });

            $('#searchCriteria li').mouseout(function () {
                $(this).removeClass('searchCriteriaHover');
            });
        },
        searchDelayComplete: function () {
            popupUtils.resetIdleTime();
            $('#settingsTab').hide();           //  write a generic function for hiding unnecessary divs
            $('#resourceGroupHeader').hide();
            $('#resourceDetails').hide();
            $('#resourceGroups').hide();
            $('#resourceDataDiv').hide();
            PMP_popup.reasonRequiredHide();
            PMP_popup.AJAXREQUEST.abort();      //  Abort the previous ajax request

            if (PMP_popup.selectedTab === 'resourceGroups') {             //  Resource group specific search is not implemented. So redirect the search to all passwords
                PMP_popup.selectedTab = 'allPasswords';
                $('.selectedTabArrow').css('left', PMP_popup.allResourcesSelectedTabLeft);
            }

            var searchValue = ($('#searchResource').val()).trim();
            var harmfulContentCheck = PMP_Utils.hasHarmfulContent(searchValue);
            var harmfulContent = browser.i18n.getMessage("harmful_content_in_the_input");
            if (harmfulContentCheck === false && PMP_popup.selectedTab === 'accessControl') {
                $('#accessControlList').append($("<div>", {class: "accessControlHarmfulContent"}).text(harmfulContent));
                return false;
            }
            var personalCheckValue = '';
            if (PMP_popup.selectedTab === 'personalPasswords') {
                personalCheckValue = (PMP_popup.globalOrgName.toLocaleLowerCase() === PMP_popup.orgName.toLocaleLowerCase()) && ((PMP_popup.passPhraseStatus === 'PASSPHRASE_NEED' && PMP_Utils.isValid(PMP_popup.personalPassPhrase)) || PMP_popup.passPhraseStatus === 'PASSPHRASE_NOT_NEED');
                if (personalCheckValue === false) {
                    return false;
                }
            }
            if (harmfulContentCheck === false) {
                PMP_Utils.hideAccountRelatedInfo();
                $('#personalAccountList').hide();
                $('#personalAccountDetails').hide();
               
                $('#resourceDataDiv').show();
                $('#resourceDataDiv').append($("<div>", {class: "harmfulContent"}).text(harmfulContent));
                return false;
            }

            if (PMP_popup.selectedTab === 'accessControl') {          //  Access control search is a manual process...so Need not do input encoding
                popupUtils.getPasswordRequests(searchValue);
                return false;
            }


            searchValue = PMP_Utils.SearchEscapeQuotes(searchValue);
            searchValue = encodeURIComponent(searchValue);

            if (PMP_popup.selectedTab === 'personalPasswords') {
                $('#personalAccountDetails').hide();
                $('#personalCategory').show();
                PMP_popup.personalAccountStartIndex = 0;
                if (PMP_Utils.isValid(searchValue) === true) {
                    PMP_popup.isSearchQuery = true;
                    PMP_popup.searchValue = searchValue;
                    popupUtils.searchPersonalPasswords(searchValue);
                } else {
                    popupUtils.getPersonalPasswords();
                }
                return false;
            }

            $('.selectedTabArrow').show();
            $('#accessControlContainer').hide();

            if (searchValue === "" && PMP_popup.SEARCHCOLUMN === "ALL") {
                PMP_popup.isSearchQuery = false;
                PMP_popup.startIndex = 0;
                PMP_popup.totalRows = PMP_popup.LIMIT;  //  200
                popupUtils.getResources(PMP_popup.startIndex);
            } else {
                PMP_popup.isSearchQuery = true;
                PMP_popup.searchIndex = 0;
                PMP_popup.totalRows = PMP_popup.LIMIT;  //  200
                PMP_popup.searchValue = searchValue;
                popupUtils.getSearchResult(searchValue);
            }
        },
        resourceTypeIcon: function (resourceType) {
            var length = PMP_popup.resTypeIcon.length;
            for (var i = 0; i < length; i++) {
                if (PMP_popup.resTypeIcon[i].resType === resourceType) {
                    var iconPath = 'https://' + PMP_popup.serverName + PMP_popup.resTypeIcon[i].iconUrl;
                    return iconPath;
                }
            }
            return 'https://' + PMP_popup.serverName + "/themes/passtrix/images/None.gif";
        },
        resourceTypeImageInitialize: function () {
            var responseData = popupUtils.getResourceTypes();
            var parsed = JSON.parse(responseData);
            var status = popupUtils.checkStatus(parsed);
            if (status === true) {
                PMP_popup.resTypeIcon = new Array();
                var totalRows = parsed.operation.totalRows;
                for (var i = 0; i < totalRows; i++) {
                    var ISDEFAULTRESOURCETYPE = parsed.operation.Details[i].ISDEFAULTRESOURCETYPE;
                    var resType = parsed.operation.Details[i]["RESOURCE TYPE"];
                    var iconUrl = parsed.operation.Details[i]["RESOURCE TYPE ICON"];
                    var data = {
                        "resType": resType,
                        "iconUrl": iconUrl
                    };
                    PMP_popup.resTypeIcon.push(data);
                }
            }
        },
        bannerLinkClick: function () {
            $('.bannerLink').off('click').on('click', function () {

                var bannerLink = PMP_popup.BANNERLINK;

                $('#loginForm').hide();
                $('.PMP_Banner').hide();
                $('#bannerMessage').text(PMP_popup.BANNERMESSAGE);
                $('#bannerMessageTitle').text(bannerLink);
                if (bannerLink.length > 50) {
                    $('#bannerMessageTitle').attr('title', PMP_popup.BANNERLINK);
                }
                $('#bannerMessageWrapper').show();
                $('#bannerMessage').scrollTop(0);
            });
            if(PMP_popup.BUILDNUMBER<9802)
            {
                $('.tfaBannerLink').off('click').on('click', function () {
                    var bannerMessage = PMP_popup.BANNERMESSAGE.trim();

                    var newLine = /\r|\r/gi;
                    bannerMessage = bannerMessage.replace(newLine, '<br>');
                    var bannerLink = PMP_popup.BANNERLINK;

                    $('#tfaForm').hide();
                    $('.PMP_Banner').hide();
                    $('#bannerMessage').text(bannerMessage);
                    $('#bannerMessageTitle').text(bannerLink);
                    if (bannerLink.length > 50) {
                        $('#bannerMessageTitle').attr('title', PMP_popup.BANNERLINK);
                    }
                    $('#bannerMessageWrapper').show();
                    $('#bannerMessage').scrollTop(0);
                });
            }
        },
        bannerVerifyClick: function () {
            $('#bannerMessageButton').click(function () {
                $('.PMP_Banner').show();
                if ((PMP_popup.ISSECONDFACTORENABLED === 'TRUE') && (PMP_popup.BUILDNUMBER<9802)) {
                    $('#tfaForm').show();
                    $(".loginButton").attr("disabled", false);
                } else if(PMP_popup.ISSECONDFACTORENABLED === 'TRUE' || PMP_popup.ISSECONDFACTORENABLED === 'true') {
                    $('#tfaForm').show();
                    $(".loginButton").attr("disabled", false);
                 }else {
                    $('#loginForm').show();
                    $(".loginButton").attr("disabled", false);
                }
                $('#bannerMessageWrapper').hide();
            });
        },
         privacyLinkClick: function () {
            $('.privacyLink').off('click').on('click', function () {

                var privacyLink = PMP_popup.PRIVACYLINK;

                $('#loginForm').hide();
                $('.PMP_Banner').hide();
                $('#privacyMessage').text(PMP_popup.PRIVACYMESSAGE);
                $('#privacyMessageTitle').text(privacyLink);
                if (privacyLink.length > 50) {
                    $('#privacyMessageTitle').attr('title', PMP_popup.PRIVACYLINK);
                }
                $('#privacyMessageWrapper').show();
                $('#privacyMessage').scrollTop(0);
            });
            if(PMP_popup.BUILDNUMBER<9802)
            {
                $('.tfaPrivacyLink').off('click').on('click', function () {
                    var privacyMessage = PMP_popup.PRIVACYMESSAGE.trim();

                    var newLine = /\r|\r/gi;
                    privacyMessage = privacyMessage.replace(newLine, '<br>');
                    var privacyLink = PMP_popup.PRIVACYLINK;

                    $('#tfaForm').hide();
                    $('.PMP_Banner').hide();
                    $('#privacyMessage').text(privacyMessage);
                    $('#privacyMessageTitle').text(privacyLink);
                    if (privacyLink.length > 50) {
                        $('#privacyMessageTitle').attr('title', PMP_popup.PRIVACYLINK);
                    }
                    $('#privacyMessageWrapper').show();
                    $('#privacyMessage').scrollTop(0);
                });
            }
        },
        privacyVerifyClick: function () {
            $('#privacyMessageButton').click(function () {
                $('.PMP_Banner').show();
                if ((PMP_popup.ISSECONDFACTORENABLED === 'TRUE') && (PMP_popup.BUILDNUMBER<9802)) {
                    $('#tfaForm').show();
                    $(".loginButton").attr("disabled", false);
                } else if(PMP_popup.ISSECONDFACTORENABLED === 'TRUE' || PMP_popup.ISSECONDFACTORENABLED === 'true') {
                    $('#tfaForm').show();
                    $(".loginButton").attr("disabled", false);
                }else {
                    $('#loginForm').show();
                    $(".loginButton").attr("disabled", false);
                }
                $('#privacyMessageWrapper').hide();
            });
        },
        removeSelectedLi: function () {
            $('#accountList li').each(function () {
                if ($(this).hasClass('selectedLi') === true) {
                    $(this).removeClass('selectedLi');
                    $(this).find('.hoverTools').hide();
                    return false;
                }
            });
        },
        dropDownController: function (dropDown) {
            var clipBoardDropDown = $('#clipboardDropDown').css('display');
            var displayDropDown = $('#dropDownMenu').css('display');
            var displaySearch = $('#searchCriteria').css('display');
            var logoutDropDown = $('#logoutDropDown').css('display');
            var orgListDropDown = $('#orgListDropDown').css('display');
            var AdDomainDropDown = $('#DOMAINNAMEDropDown').css('display');
            var autoLoginListDisplay = $('#autoLoginList').css('display');
            var categoryListDropDown = $('#categoryListDropDown').css('display');
            var resourceTypeDropDown = $('#resourceTypeDropDown').css('display');
            var isAutoLoginListSelected = $('#accountList li').hasClass('selectedLi');
            if (isAutoLoginListSelected === true) {
                PMP_Utils.removeSelectedLi();
            }
            if (displaySearch === "block" && dropDown !== "advancedSearch") {
                $('#searchCriteria').slideToggle(100);
            }
            if (displayDropDown === "block" && dropDown !== "popupMenuDropDown") {
                setTimeout(function () {
                    $('#popupMenuDropDown').removeClass('signoutNoBorder');
                    $('#popupMenuDropDown').removeClass('popupMenuClicked');
                }, 100);
                $('#dropDownMenu').slideToggle(100);
            }
            if (clipBoardDropDown === "block" && dropDown !== "clipBoardDropDown") {
                $('#clipboardDropDown').slideToggle(100);
            }
            if (logoutDropDown === "block" && dropDown !== "logoutDropDown") {
                $('#logoutDropDown').slideToggle(100);
            }
            if (orgListDropDown === "block" && dropDown !== "orgListDropDown") {
                $('#searchOrgContainer').slideToggle(100);
                $('#orgListDropDown').slideToggle(100);
                $('#switchOrg').removeClass('MSPOrgMenuClicked');
            }
            if (AdDomainDropDown === "block" && dropDown !== "AdDomainDropDown") {
                $('#DOMAINNAMEDropDown').slideToggle(100);
            }
            if (autoLoginListDisplay === "block" && dropDown !== "autoLoginList") {
                $('#autoLoginList').slideToggle(100);
            }
            if (categoryListDropDown === "block" && dropDown !== "categoryListDropDown")
            {
                $('#categoryListDropDown').slideToggle(100);
            }
            if (resourceTypeDropDown === "block" && dropDown !== "resourceTypeDropDown")
            {
                $('#resourceTypeDropDown').slideToggle(100);
            }
        },
        hideAccountRelatedInfo: function () {
            $('#accountList').hide();
            $('#accountListHeader').hide();
            $('#accountDetails').hide();
            $('#loadDuringListing').hide();

            $('#passwordReasonPopup').hide();
            $('#checkoutPasswordPopup').hide();
            $('#checkinPasswordPopup').hide();
        },
        loginFailed: function (message) {
            $('#loginFailed').fadeIn();
            $('#serverNotReachable').hide();
            if (PMP_popup.ISSECONDFACTORENABLED === 'TRUE') {
                $('#loginFailed').text(browser.i18n.getMessage("invalid_username"));
            } else if (message === "Extension access denied") {
                $('#loginFailed').text(browser.i18n.getMessage("user_not_allowed_browser_extension"));
            } 
            else if (message === "Login disabled. Contact your administrator.") {
                $('#loginFailed').text(browser.i18n.getMessage("user_locked"));
            } 
            else {
                $('#loginFailed').text(browser.i18n.getMessage("invalid_username_password"));
            }
            document.getElementById("loginForm").reset();
            $('#username').focus();
            return false;
        },
        isValid: function (element) {
            return (typeof element !== "undefined" && element !== null && element !== '') ? true : false;
        },
        hasHarmfulContent: function (userInput) {
            var harmfulTags = /<|>/gi;
            var harmfulMatches = userInput.match(harmfulTags);
            return (harmfulMatches !== null) ? false : true;
        },
        isTicketIdValid: function (ticketId) {
            var ticketIdRegex = /[^a-zA-Z0-9_\-\.\ ]+/gi;
            var ticketIdMatches = ticketId.match(ticketIdRegex);
            return (ticketIdMatches === null) ? true : false;
        },
        tfaFormSubmit: function () {
            $('#tfaForm').submit(function () {
                var jqxhr = {'status': 0, 'statusText': 'error'};
                var passwordCheck = true, tfaOTPCheck = true;
                $('#tfaLoginFailed').hide();
                if(PMP_popup.BUILDNUMBER<9802)
                {
                    var password = $('#tfaPassword').val();
                    if (passwordCheck === false || PMP_Utils.isValid(password) === false) {
                        popupUtils.serverNotReachableMessage(jqxhr, "fetchTfaLoginFail");
                        return false;
                    }

                    if (PMP_popup.ISuserSECONDFACTORENABLED === 'TRUE') {
                        var tfaOTP = ($('#tfaOTP').val()).trim();
                        tfaOTPCheck = PMP_Utils.hasHarmfulContent(tfaOTP);
                        if (tfaOTPCheck === false || PMP_Utils.isValid(tfaOTP) === false) {
                            popupUtils.serverNotReachableMessage(jqxhr, "fetchTfaLoginFail");
                            return false;
                        }
                        PMP_popup.getAuthToken(password, tfaOTP, PMP_popup.ISSECONDFACTORENABLED);
                    } else {
                        PMP_popup.getAuthToken(PMP_popup.username, password, 'FALSE');       //  User TFA is Disabled in this case
                    }
                }
                else
                {
                    var tfaOTP = ($('#tfaOTP').val()).trim();
                    tfaOTPCheck = PMP_Utils.hasHarmfulContent(tfaOTP);
                    if (tfaOTPCheck === false || PMP_Utils.isValid(tfaOTP) === false) {
                        popupUtils.serverNotReachableMessage(jqxhr, "fetchTfaLoginFail");
                        return false;
                    }
                    popupUtils.secondAuthMode(tfaOTP);
                }
                return false;
            });
        },
        reasonFailedMessage: function (message) {
            $('#reasonFailed').text(message);
            $('#reasonFailed').fadeIn();
            setTimeout(function () {
                $('#reasonFailed').fadeOut();
            }, 2500);
        },
        loginFormSubmit: function () {
            $('#loginForm').submit(function () {
                var usernameCheck = true, passwordCheck = true;
                $('#serverConnectivityLost').hide();
                $('#loginFailed').hide();

                var username = $('#username').val();
                usernameCheck = PMP_Utils.hasHarmfulContent(username);
                var isUsernameValid = PMP_Utils.isValid(username);
                var captchatext = null;
                if(PMP_popup.SHOWCAPTCHA==true){
                	captchatext = $('#captchatext').val();
                	captchatext = encodeURIComponent(captchatext);
                }
                if(PMP_popup.BUILDNUMBER<9802)
                {
                if (PMP_popup.ISSECONDFACTORENABLED === 'FALSE') {
                    var password = $('#password').val();
                    // passwordCheck = PMP_Utils.hasHarmfulContent(password);        //  Password can have harmful characters

                }

                if (usernameCheck === false || passwordCheck === false || isUsernameValid === false || (PMP_popup.ISSECONDFACTORENABLED === 'FALSE' && PMP_Utils.isValid(password) === false)) {
                    PMP_Utils.loginFailed("");
                    return false;
                }

                var ISSECONDFACTORENABLED = PMP_popup.ISSECONDFACTORENABLED;
                if (ISSECONDFACTORENABLED === 'TRUE') {
                    PMP_popup.username = username;
                    if (PMP_popup.FIRSTFACTOR === 'AD' && PMP_popup.DOMAINNAME !== 'LOCAL') {     //  special check for AD authentication with second factor enabled
                        username = PMP_popup.DOMAINNAME + '\\' + username;
                    }
                    if (PMP_popup.FIRSTFACTOR === 'AZUREAD' && PMP_popup.DOMAINNAME !== 'LOCAL') {     //  special check for AD authentication with second factor enabled
                        username = username + '@' + PMP_popup.DOMAINNAME;
                    }
                    var data = popupUtils.isSecondFactorEnabledForUser(username);
                    $('#signInLoading').hide();
                    if (typeof data === "undefined") {
                        $(".loginButton").attr("disabled", false);
                        return false;                                             //  handle this case
                    }
                    var parsed = JSON.parse(data);
                    var status = popupUtils.checkStatus(parsed);
                    if (status === false) {

                        if (parsed.operation.result.message === browser.i18n.getMessage("user_not_allowed_through_mob_app")) {
                            PMP_Utils.loginFailed(browser.i18n.getMessage("user_not_allowed_browser_extension"));
                        } else {
                            PMP_Utils.loginFailed("");
                        }
                        return false;
                    }
                    $(".loginButton").attr("disabled", true);
                    PMP_popup.ISuserSECONDFACTORENABLED = parsed.operation.Details.ISSECONDFACTORENABLED;
                    $('#loginForm').hide();
                    $('#signInLoading').hide();     //  added code for testing
                    $('#tfaForm').fadeIn();
                    $(".loginButton").attr("disabled", false);
                    $('#tfaBackToLoginForm').show();

                    $('#tfaPassword').focus();
                    PMP_popup.displayTfaBannerLink();
                    PMP_popup.displayTfaPrivacyLink();
                    $('#tfaLoginFailed').hide();
                    $('#loginFailed').hide();
                    document.getElementById("tfaForm").reset();
                    if (PMP_popup.ISuserSECONDFACTORENABLED === 'FALSE') {
                        $('#tfaOTPRow').hide();
                    } else {
                        if (PMP_popup.SECONDFACTOR === 'GOOGLE_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("google_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'MICROSOFT_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("microsoft_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'OKTAVERIFY_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("okta_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'VASCO_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("radius_password"));
                        } else if (PMP_popup.SECONDFACTOR === 'RSA_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("rsa_passcode"));
                        }  else if (PMP_popup.SECONDFACTOR === 'DUO_AUTH') {
                        	$('#tfaOTPRow').hide();
                        	var tfaLoginFailed = browser.i18n.getMessage("duo_authentication");
                            $('#tfaLoginFailed').text(tfaLoginFailed);  
                            $('#tfaLoginFailed').show();
                            setTimeout(function () {
                                $('#tfaForm').hide();
                                $('#loginForm').show();
                            }, 1500);
                       } else {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("one_time_password"));
                        }
                        	$('#tfaOTPRow').show();
                    }
                    return false;
                }
            }
            else
            {
                var password = $('#password').val();
                if (usernameCheck === false || passwordCheck === false || isUsernameValid === false || PMP_Utils.isValid(password) === false) {
                    PMP_Utils.loginFailed("");
                    if(PMP_popup.SHOWCAPTCHA==true){
                    	var random_number = Math.random();
                    	var captchaURL = 'https://' + PMP_popup.serverName + '/captcha/j_captcha?t='+random_number;
                        $("#capimg").attr("src",captchaURL);
                    }
                    return false;
                }
                var uname=username;
                PMP_popup.displayTfaBannerLink();
                PMP_popup.displayTfaPrivacyLink();
                if (PMP_popup.FIRSTFACTOR === 'AD' && PMP_popup.DOMAINNAME !== 'LOCAL') {     //  special check for AD authentication with second factor enabled
                        uname = PMP_popup.DOMAINNAME + '\\' + username;
            }
                    if (PMP_popup.FIRSTFACTOR === 'AZUREAD' && PMP_popup.DOMAINNAME !== 'LOCAL') {     //  special check for AD authentication with second factor enabled
                        uname = username + '@' + PMP_popup.DOMAINNAME;
                    }
                    if(PMP_popup.BUILDNUMBER<9901 || ((PMP_popup.FIRSTFACTOR === 'AD' || PMP_popup.FIRSTFACTOR === 'AZUREAD') && PMP_popup.BUILDNUMBER===9901))
                    {
	                    var data = popupUtils.isSecondFactorEnabledForUser(uname);
	                    $('#signInLoading').hide();
	                    if (typeof data === "undefined") {
	                        $(".loginButton").attr("disabled", false);
	                        return false;                                             //  handle this case
	                    }
	                    var parsed = JSON.parse(data);
	                    var status = popupUtils.checkStatus(parsed);
	                    if (status === false) {
	
	                        if (parsed.operation.result.message === browser.i18n.getMessage("user_not_allowed_through_mob_app")) {
	                            PMP_Utils.loginFailed(browser.i18n.getMessage("user_not_allowed_browser_extension"));
	                        } else {
	                            PMP_Utils.loginFailed("");
	                        }
	                        return false;
	                    }
                    }
            }
                PMP_popup.AJAXREQUEST.abort();
                PMP_popup.getAuthToken(username, password, ISSECONDFACTORENABLED, captchatext);

                return false;
            });
        },
        showTfaForm: function(){
                    $('#loginForm').hide();
                    $('#signInLoading').hide();     //  added code for testing
                    $('#tfaForm').fadeIn();
                    $(".loginButton").attr("disabled", false);
                    $('#tfaBackToLoginForm').show();
                    $('#tfaPasswordRow').hide();
                    $('#tfaPassword').focus();
                    $('#tfaOTP').focus();
                    $('#tfaLoginFailed').hide();
                    $('#loginFailed').hide();
                    document.getElementById("tfaForm").reset();
                   
                        if (PMP_popup.SECONDFACTOR === 'GOOGLE_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("google_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'MICROSOFT_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("microsoft_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'OKTAVERIFY_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("okta_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'VASCO_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("radius_password"));
                        } else if (PMP_popup.SECONDFACTOR === 'RSA_AUTH') {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("rsa_passcode"));
                        } else if (PMP_popup.SECONDFACTOR === 'ONE_AUTH') {
                            $('#tfaOTP').attr('placeholder', chrome.i18n.getMessage("oneAuth_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'ORACLE_AUTH') {
                            $('#tfaOTP').attr('placeholder', chrome.i18n.getMessage("oracle_authenticator_code"));
                        } else if (PMP_popup.SECONDFACTOR === 'DUO_AUTH') {
                        	$('#tfaOTPRow').hide();
                        	var tfaLoginFailed = browser.i18n.getMessage("duo_authentication");
                            $('#tfaLoginFailed').text(tfaLoginFailed);  
                            $('#tfaLoginFailed').show();
                            setTimeout(function () {
                                $('#tfaForm').hide();
                                $('#loginForm').show();
                            }, 1500);
                       } else {
                            $('#tfaOTP').attr('placeholder', browser.i18n.getMessage("one_time_password"));
                        }
                        	$('#tfaOTPRow').show();
                        	var length = document.getElementById("tfaOTP").placeholder.length;
                             length = length * 6.8;
                             if(length>177){
                        	    $('#tfaOTP').css({'width': length});
                        	 }
                    return false;
                
        },
        submitServerDetailForm: function () {

            $('#serverDetailForm').submit(function () {

                PMP_popup.orgName = "";
                var hostname = ($('#hostname').val()).trim();
                var port = ($('#port').val()).trim();
                var orgName = ($('#orgName').val()).trim();
                var hostnameCheck = PMP_Utils.hasHarmfulContent(hostname);
                var portCheck = PMP_Utils.hasHarmfulContent(port);
                var orgNameCheck = PMP_Utils.hasHarmfulContent(orgName);
                if (hostnameCheck !== true || portCheck !== true || orgNameCheck !== true) {
                    var jqxhr = {
                        'status': 0,
                        'statusText': 'error'
                    };
                    PMP_popup.orgName = PMP_popup.globalOrgName;
                    $('.PMP_Banner').show();
                    var tempDomainName = hostname + ":" + port;
                    PMP_Utils.serverDetailErrorMessage(tempDomainName);

                    popupUtils.serverNotReachableMessage(jqxhr, "fetchServerDetailsFail");
                    return false;
                }
                hostname = encodeURIComponent(hostname);
                port = encodeURIComponent(port);
                orgName = encodeURIComponent(orgName);


                //if(orgName !== ""){   //To disable personal password orgName check for non-MSP build
                PMP_popup.orgName = orgName;//PMP_popup.globalOrgName = orgName;
                PMP_popup.globalOrgName = orgName;
                //}
                if (hostname === "") {
                    $('#serverFailedTd').show();
                    return false;
                } else {
                    $('#serverFailedTd').hide();
                }
                port = (port !== "") ? port : 7272;		//	Default port is 7272
                var serverName = hostname + ":" + port;

                PMP_popup.tempData = PMP_popup.CLIPBOARDTIMEOUT;
                PMP_popup.CLIPBOARDTIMEOUT = null;
                PMP_popup.tempLogout = PMP_popup.LOGOUTTIME;
                popupUtils.getAuthMode(serverName);
                return false;
            });
        },
        backToServerPageEvent: function () {
            $('#backToServerButton').click(function () {
                $('#hostname').focus();
                $('#serverDetailErrorMessage').hide();
                $('#serverFailedTd').hide();
            });
        },
        checkJsessionID: function(serverName){
            
            var mspUrl = 'https://' + serverName + '/api/json/request?OPERATION_NAME=GET_JSESSIONIDSSO';
            var pmp_header = {'clientType': 11, 'requestFrom': 'pmpmobilenative'};
            if (PMP_popup.orgName !== "") {
                pmp_header.orgName = PMP_popup.orgName;
            }
            PMP_popup.AJAXREQUEST = $.ajax({type: 'POST', url: mspUrl, headers: pmp_header, async: true, dataType: "json",
                beforeSend: function () {
                  
                }, error: function (jqxhr, textStatus, errorThrown) {
                   console.log("Error--"+jqxhr+"--"+textStatus+"--"+errorThrown);
                }
            }).done(function (data) {
               PMP_Utils.setJSessionID(data);
        });
        },
        setJSessionID: function(data){
            
            var status = popupUtils.checkStatus(data);
           if(status === false){
                  if (data.operation.name.toUpperCase() === 'RO_SERVER'){
                      displayText = chrome.i18n.getMessage("RO_server");
                      $('#loginFailed').text(displayText).fadeIn();
                      setTimeout(function () {
                      $('#loginFailed').fadeOut();
                            }, 4000);
                      return;
                  }
            }
            else if (status === true) {
                if (data.operation.Details.hasOwnProperty('JSESSIONIDSSO') === true) {
                	if (data.operation.Details.hasOwnProperty('SESSIONTIMEOUT') === true) {
                 		PMP_popup.SESSIONTIMEOUT = data.operation.Details.SESSIONTIMEOUT;   
                 		browser.runtime.sendMessage({
                            'action': 'setSessionTimeOut',
                            'data': PMP_popup.SESSIONTIMEOUT
                        });
                 	}
                 	if (data.operation.Details.hasOwnProperty('CLIPBOARDTIMEOUT') === true) {
                 		PMP_popup.CLIPBOARDTIMEOUT = data.operation.Details.CLIPBOARDTIMEOUT;  
                 		browser.runtime.sendMessage({
                            'action': 'setClipBoardTimeOut',
                            'data': PMP_popup.CLIPBOARDTIMEOUT
                        });
                 	}    
                	var isOrgExists=false;
                	var oldOrgName = (PMP_popup.orgName).toLocaleLowerCase();
					var orgList;
                        if (data.operation.Details.hasOwnProperty('ORGLIST') === true) {
							orgList = data.operation.Details.ORGLIST;
							for (var key in orgList) {
								var orgName = ((orgList[key].ORGURLNAME).toLocaleLowerCase());
								if (orgName === oldOrgName) {
									isOrgExists = true;
							}
						}
					}
					else
                    {
                        isOrgExists = true;
                    }
                    if(isOrgExists)
            		{
            		 if (PMP_popup.BUILDNUMBER >= 8700)
                     {
            			 if(PMP_popup.BUILDNUMBER<10102){
                             var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles?AUTHTOKEN=' + PMP_popup.authToken;
                         } else {
                         var roleURL = 'https://' + PMP_popup.serverName + '/restapi/json/v1/user/featureroles';
                         }
            			 PMP_popup.AJAXREQUEST = $.ajax({type: 'GET', url: roleURL, headers: {'orgName': PMP_popup.orgName,'AUTHTOKEN': PMP_popup.authToken, 'ClientType': 11, 'requestFrom': 'pmpmobilenative', 'sessionId':PMP_popup.SESSIONID}, async: true, dataType: "json",
                             error: function (jqxhr, textStatus, errorThrown) {
								 console.log("Error--"+jqxhr+"--"+textStatus+"--"+errorThrown);
                                 //popupUtils.serverNotReachableMessage(jqxhr,"fetchLoginFail");
                             }
                         }).done(function (data) {

                             PMP_popup.setRoleFeatures(data);

                         });


                     }
                    PMP_popup.JSESSIONIDSSO = data.operation.Details.JSESSIONIDSSO;
                    PMP_popup.authToken = data.operation.Details.AUTHKEY;
                    PMP_popup.loginName =  data.operation.Details.USERLOGINNAME;
                    PMP_popup.fullName = PMP_popup.loginName;
                    PMP_popup.userRoles = data.operation.Details.USERROLE;
                    PMP_popup.USERID = data.operation.Details.USERID;
                   if (data.operation.Details.hasOwnProperty('ORGLIST') === true) {
                            PMP_popup.ORGLIST = data.operation.Details.ORGLIST;
                        }
                   if (data.operation.Details.hasOwnProperty('ISAUTOLOGONACCESS') === true) {
                        PMP_popup.isAutoLogonAccess = data.operation.Details.ISAUTOLOGONACCESS;
                        PMP_popup.isAutoLogonAccess = (PMP_popup.isAutoLogonAccess === 'true') ? true : false;          //  Converting string response to boolean
                    }
                    if (data.operation.Details.hasOwnProperty('ISAUTOFILLACCESS') === true) {
                        PMP_popup.isAutoFillAccess = data.operation.Details.ISAUTOFILLACCESS;
                        PMP_popup.isAutoFillAccess = (PMP_popup.isAutoFillAccess === 'true') ? true : false;          //  Converting string response to boolean
                    }
                    if (data.operation.Details.hasOwnProperty('ENFORCEMAXTIMELIMIT') === true) {
                        PMP_popup.enforceMaxTimeLimit = data.operation.Details.ENFORCEMAXTIMELIMIT;
                        PMP_popup.enforceMaxTimeLimit = (PMP_popup.enforceMaxTimeLimit === 'true') ? true : false;          //  Converting string response to boolean
                    }
                    if (data.operation.Details.hasOwnProperty('SESSIONTIMEOUT') === true) {
                        PMP_popup.SESSIONTIMEOUT = data.operation.Details.SESSIONTIMEOUT;
                    }
                    if (data.operation.Details.hasOwnProperty('ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT') === true) {
                        PMP_popup.enforcePreventBrowserAddAccount = data.operation.Details.ENFORCE_PREVENT_BROWSER_ADD_ACCOUNT;
                        PMP_popup.enforcePreventBrowserAddAccount = (PMP_popup.enforcePreventBrowserAddAccount === 'true') ? true : false;          //  Converting string response to boolean
                    }
                    PMP_popup.ISPERSONALTABENABLED = data.operation.Details.ISPERSONALTABENABLED;
                   
                    var userData = {
                        "authToken": PMP_popup.authToken,
                        "sessionId": PMP_popup.SESSIONID,
                        "loginName": PMP_popup.loginName,
                        "userRoles": PMP_popup.userRoles,
                        "ORGLIST": PMP_popup.ORGLIST,
                        "USERID": PMP_popup.USERID,
                        "isAutoLogonAccess": PMP_popup.isAutoLogonAccess,
                        "isAutoFillAccess": PMP_popup.isAutoFillAccess,
                        "enforceMaxTimeLimit": PMP_popup.enforceMaxTimeLimit,
                        "ISPERSONALTABENABLED": PMP_popup.ISPERSONALTABENABLED,
                        "IsRoleAutologonAccess": PMP_popup.isRoleAutoLogonAccess,
                        "IsAccessCtrlAuthorize": PMP_popup.isAccessCtrlAuthorize,
                        "SESSIONTIMEOUT": PMP_popup.SESSIONTIMEOUT,
                        "enforcePreventBrowserAddAccount": PMP_popup.enforcePreventBrowserAddAccount
                    };
                   
                    browser.runtime.sendMessage({//	sends message to background
                        'action': 'setAuthToken',
                        'data': userData
                    });

                		 }
                    
                }
             
            }
        },
        serverDetailErrorMessage: function (serverName) {
            $('#serverDetailErrorMessage').empty();
            browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
                $('#serverDetailErrorMessage').append($("<div>", {id: "possibleReasons"}).text(browser.i18n.getMessage("possible_reasons_are")));
                $('#serverDetailErrorMessage').append($("<span>", {id: "sslReasons"}).append($("<li>").text(browser.i18n.getMessage("server_running_with_untrusted_ssl"))).append($("<li>").text(browser.i18n.getMessage("verify_server_connection_details"))));
                $('#serverDetailErrorMessage').append($("<span>", {id: "backToServerButton", class: "loginButton"}).text(browser.i18n.getMessage("back_caps")));
                $('#serverDetailErrorMessage').show();
                PMP_Utils.backToServerPageEvent();

                var currentUrl = tabs[0].url;
                var currentDomain = PMP_Utils.getDomain(currentUrl);
                var clickHere = '';
                
                if (serverName !== currentDomain) {
                    var hostUrlStr = "https://" + serverName;
                    var hostUrl = document.createTextNode("https://" + serverName);
                    var ifSoOpen = document.createTextNode(browser.i18n.getMessage("if_so_open_the_url") + '\n');
                    var confirmSSLDiv = document.createElement("div");
                    confirmSSLDiv.setAttribute("id", "confirmSSL");
                    if (hostUrl.length > 45) {
                        confirmSSLDiv.setAttribute("title", hostUrl);
                    }
                    confirmSSLDiv.appendChild(hostUrl);
                    var acceptCert = document.createTextNode(browser.i18n.getMessage("accept_the_certificate_try_again"));
                    $('#sslReasons li:first').append(ifSoOpen);
                    $('#sslReasons li:first').append(confirmSSLDiv);
                    $('#sslReasons li:first').append(acceptCert);
                    clickHere = browser.i18n.getMessage("if_so_open_the_url") + '<br><div id="confirmSSL"';
                    $('#confirmSSL').click(function () {
                        browser.tabs.create({url: hostUrlStr});
                    });
                } else {
                    clickHere = browser.i18n.getMessage("If so, accept the certificate and try again");
                    $('#sslReasons li:first').text(clickHere);
                }
            });
        },

        getRemainingSeconds(totpValidity = 30) {
            const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
            return totpValidity - (currentTime % totpValidity);
        }

    };

    var circleAnimation ={
        timeoutIds : {
            generateTotp: -1,
            totp_circle: -1
        },
        calledOn : {
            totpCircle: -1
        },
        elem : {
            totpCircle: null
        },
        startCircleAnimation(totpCircleId,timePeriod) {
            try {
                if(circleAnimation.elem.totpCircle){
                    circleAnimation.stopCircleAnimation();
                }
                let totpCircle = document.getElementById(totpCircleId);
                circleAnimation.elem.totpCircle = totpCircle;
                if (!totpCircle) {
                    return;
                }
                clearTimeout(circleAnimation.timeoutIds.generateTotp);
                async function generateTotp() {
                    const remaining_s = Math.round(circleAnimation.getRemainingSeconds(timePeriod));
                    circleAnimation.startAnimation(remaining_s, timePeriod);
                    circleAnimation.timeoutIds.generateTotp = setTimeout(generateTotp, remaining_s * 1000);
                }
                generateTotp();
            }
            catch (e) {
                console.error(e, arguments);
                throw e;
            }
        },
        startAnimation(remainingSeconds = 0, timePeriod = 30) {
            const BLUE = "#4780da"; // NO I18N
            const RED = "#f75d56"; // NO I18N
            const circleElem = circleAnimation.elem.totpCircle;
            if (!circleElem) {
                return;
            }
            const radius = +circleElem.getAttribute("r");
            const end = -(2 * Math.PI * radius);
            const inc = end / timePeriod;
            const last_5_s = Math.round((5 / 6) * timePeriod);
            const calledOn = Date.now();
            circleAnimation.calledOn.totpCircle = calledOn;
            clearTimeout(circleAnimation.timeoutIds.totp_circle);
            let i = 1;
            if (remainingSeconds == 0) {
                init();
            }
            else {
                init_once(Math.round(timePeriod - remainingSeconds) + 1);
            }
            function init_once(start) {
                circleElem.style.stroke = start >= last_5_s ? RED : BLUE;
                circleElem.style.transition = "none"; // NO I18N
                circleElem.style.strokeDashoffset = (start - 1) * inc + "";
                i = start;
                window.requestAnimationFrame(() => circleAnimation.timeoutIds.totp_circle = setTimeout(f));
            }
            function init() {
                i = 1;
                circleElem.style.stroke = BLUE;
                circleElem.style.transition = "none"; // NO I18N
                circleElem.style.strokeDashoffset = "0";
                window.requestAnimationFrame(() => circleAnimation.timeoutIds.totp_circle = setTimeout(f));
            }
            function f() {
                if (calledOn != circleAnimation.calledOn.totpCircle) {
                    return;
                }
                circleElem.style.transition = "all 1s linear"; // NO I18N
                if (i >= last_5_s) {
                    circleElem.style.stroke = RED;
                }
                if (i == timePeriod) {
                    circleElem.style.strokeDashoffset = end + "";
                    return;
                }
                circleElem.style.strokeDashoffset = i++ * inc + "";
                circleAnimation.timeoutIds.totp_circle = setTimeout(f, 1000);
            }
        },
        stopCircleAnimation() {
            clearTimeout(circleAnimation.timeoutIds.generateTotp);
            clearTimeout(circleAnimation.timeoutIds.totp_circle);
        },
        getRemainingSeconds(totpValidity = 30) {
            const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
            return totpValidity - (currentTime % totpValidity);
        }
    };

    var serverUtils ={
        generateTOTP: async function(accountId,userDetails){
            let headers = {
                "requestFrom":PMP_popup.requestFrom,
                "ClientType":12,
                "AUTHTOKEN":userDetails.authToken,
                "sessionId":userDetails.SESSIONID,
                "PASSPHRASE":userDetails.personalPassPhrase,
                "orgName":userDetails.orgName
            }
            let url= 'https://' + userDetails.serverName + '/restapi/json/v1/accounts/'+accountId+'/totp';
            var response= await fetch(url,{method:'GET',headers:headers})
                                .then(response=>response.json())
                                .catch(err=>{return null});
            let totp = "000000";
            if(response.operation.result.statusCode === 20000){
                totp= response.operation.Details.TOTP;
            }
            return totp;
        },

        generatePersonalTOTP: async function(accountId,userDetails){
            let headers = {
                "requestFrom":PMP_popup.requestFrom,
                "ClientType":12,
                "AUTHTOKEN":userDetails.authToken,
                "sessionId":userDetails.SESSIONID,
                "PASSPHRASE":userDetails.personalPassPhrase,
                "orgName":userDetails.orgName
            }
            let url= 'https://' + userDetails.serverName + '/restapi/json/v1/personal/webaccounts/'+accountId+'/totp';
            var response= await fetch(url,{method:'GET',headers:headers})
                                .then(response=>response.json())
                                .catch(err=>{return null});
            let totp = "000000";
            if(response.operation.result.statusCode === 20000){
                totp= response.operation.Details.TOTP;
            }
            return totp;
        }
    };

    PMP_popup.init();
})();
