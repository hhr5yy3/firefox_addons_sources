//$Id$
(function(){
    var PMP_BG = {

            authToken : null,
            sessionId : null,
            username : null,
            password : null,
            resourceUrl : null,
            accountId : null,
            isTOTPConfigured : null,
            isPersonal : null,
            isPasswordAccessDeniedForAccount : null,
            loginName : null,
            userRoles : null,
            serverName : null,
            orgName : null,
            FIRSTFACTOR : 'LOCAL',
            ORGLIST : null,
            globalOrgName : '',
            USERID : null,
            isAutoLogonAccess : true,
            isAutoFillAccess: true,
            enforceMaxTimeLimit: false,
            ISPERSONALTABENABLED : null,    
            CLIPBOARDTIMEOUT : null,
            SESSIONTIMEOUT: 30,
            isAutoFillSubmitEnabled: false,
            isSSOEnabled: true,
            IDLETIME : null,
            LOGOUTTIME : 30,     // 30 -> means 30 minutes (refer pmppopup.html)
            BANNERLINK : null,
            BANNERBUTTON : browser.i18n.getMessage("login"),
            SECONDFACTOR : '',
            ISSECONDFACTORENABLED : "FALSE",
            formParams : '',
            resourceUrlHasPlaceHolder : false,
            isRoleAutologonAccess :true,
            isAccessCtrlAuthorize:false,
            
            
            ALLRESOURCEDETAIL : null,
            ALLRESOURCEDETAILFAILURE : null,
            reasonAndTicketCheck : false,
            serverNotReachable : false,
            BUILDNUMBER : null,
            chromeVersionCheck : null,
            ticketRequiredMandatory:'',
            ticketRequired:'',
            reasonRequired:'',

            personalPassPhrase : null,
            passPhraseStatus : null,
            PERSONALWEBSITEURL : null,
            PERSONALWEBSITEURLFAILURE : null,
            
            tabLoadedResourceUrl : null,
            tabLoadedPersonalUrl : null,
            enforcePreventBrowserAddAccount:false,
            windowUrl: null,
            
            
            init : function(){
                browser.runtime.onMessage.addListener(PMP_BG.processRequest);
             
                PMP_BG.startTimer();
    },

            isServerDetailValid : function(){
                
                var status = ( PMP_BG.serverName !== null && typeof PMP_BG.serverName !== 'undefined' ) ? true : false;
               
                return status;
            },

            isValid : function(element){
                return (typeof element !== "undefined" && element !== null && element !== '') ? true : false;
            },

            isAuthTokenValid : function(){
                var status = ( PMP_BG.authToken !== null && typeof PMP_BG.authToken !== 'undefined' ) ? true : false;
                return status;
            },

            isPersonalPassPhraseValid : function(){
                var status = ( PMP_BG.personalPassPhrase !== null && typeof PMP_BG.personalPassPhrase !== 'undefined' ) ? true : false;
                return status;
            },	
            
            clearLoginData : function(){
                PMP_BG.username = null;
                PMP_BG.password = null;
                PMP_BG.resourceUrl = null;
                PMP_BG.isPasswordAccessDeniedForAccount = null;
                PMP_BG.accountId=null;
                PMP_BG.isTOTPConfigured = null;
                PMP_BG.isPersonal = null;
            },

            startTimer : function(){
                
                PMP_BG.IDLETIME = 0;
                var idleInterval = setInterval(function(){
                    
                    PMP_BG.IDLETIME ++;
                   
                    if(PMP_BG.IDLETIME >= PMP_BG.LOGOUTTIME*60 && PMP_BG.LOGOUTTIME != 0 && PMP_BG.authToken !== null){
                        PMP_BG.clearAuthToken();
                        browser.runtime.sendMessage({        //  Sends message to popup script to logout
                            'action'    :   'isSessionExpired',
                            'data'      :   true
                        });
                        PMP_BG.IDLETIME = 0;                //  Code made for enhancement. If not done, multiple requests will be sent to popup every minute
                    }
                },1000);
            },

            clearAuthToken : function(){
                PMP_BG.authToken = null;
                PMP_BG.sessionId = null;
                PMP_BG.loginName = null;
                PMP_BG.userRoles = null;
                PMP_BG.USERID = null;
                PMP_BG.ORGLIST = null;
                PMP_BG.isAutoLogonAccess = true;
                PMP_BG.isAutoFillAccess=true;
                PMP_BG.orgName = PMP_BG.globalOrgName;
                PMP_BG.IDLETIME = 0;
                PMP_BG.ALLRESOURCEDETAIL = new Array();
                PMP_BG.PERSONALWEBSITEURL = new Array();
                PMP_BG.personalPassPhrase = null;
                PMP_BG.passPhraseStatus = null;
            },

              
               
             

            setLocalStorageData : function(){
                var pmp_data = {
                    "serverName"            :   PMP_BG.serverName,
                    "orgName"               :   PMP_BG.orgName,
                    "CLIPBOARDTIMEOUT"      :   PMP_BG.CLIPBOARDTIMEOUT,
                    "LOGOUTTIME"            :   PMP_BG.LOGOUTTIME,
                    "SESSIONTIMEOUT"        :   PMP_BG.SESSIONTIMEOUT,   
                    "isAutoFillSubmitEnabled":  PMP_BG.isAutoFillSubmitEnabled,
                    "isSSOEnabled"          :   PMP_BG.isSSOEnabled,
                    "enforcePreventBrowserAddAccount": PMP_BG.enforcePreventBrowserAddAccount
                };
                browser.storage.local.set({'pmp_data' : pmp_data}, function() {});
            },

            chromeVersionChecker : function(){
                var chromeVersion = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
                var cv = parseInt(chromeVersion);
                PMP_BG.chromeVersionCheck = (cv >= 43) ? true : false;
            },

            getResourceAPI : function(){//startIndex){
              	 if(PMP_BG.BUILDNUMBER<10102){
                     var resources = 'https://' + PMP_BG.serverName + '/restapi/json/v1/resources/websiteurls?AUTHTOKEN=' + PMP_BG.authToken;
              	 } else {
              		 var resources = 'https://' + PMP_BG.serverName + '/restapi/json/v1/resources/websiteurls';
              	 }
                $.ajax({type:'GET', url: resources, headers:{'requestFrom' : 'pmpmobilenative', 'AUTHTOKEN': PMP_BG.authToken,'orgName' : PMP_BG.orgName, 'ClientType' : 12, 'sessionId':PMP_BG.sessionId}, async: true, dataType:"json"}).done(function(data){
                    PMP_BG.getAllResources(data);
                }); 
            },
            
            getPersonalPassphraseInfo : function(){
             	 if(PMP_BG.BUILDNUMBER<10102){
                     var passphraseStatusUrl = 'https://'+ PMP_BG.serverName + '/restapi/json/v1/personal?AUTHTOKEN=' + PMP_BG.authToken;
             	 } else {
             		 var passphraseStatusUrl = 'https://'+ PMP_BG.serverName + '/restapi/json/v1/personal';
             	 }
                $.ajax({type:'GET', url: passphraseStatusUrl, headers:{'requestFrom' : 'pmpmobilenative', 'AUTHTOKEN': PMP_BG.authToken,'orgName' : PMP_BG.orgName, 'ClientType' : 12, 'sessionId':PMP_BG.sessionId}, async: true, dataType:"json"}).done(function(data){
                    PMP_BG.setPassPhraseStatus(data);
                });
            },
            
            setPassPhraseStatus : function(data){
                if(data.operation.result.status === 'Success'){
                    PMP_BG.passPhraseStatus = data.operation.Details.PASSPHRASESTATUS;
                    if( PMP_BG.passPhraseStatus === "PASSPHRASE_NOT_NEED" ){
                        PMP_BG.getPersonalWebsiteUrls();
                    }
                }
                else{
                    PMP_BG.passPhraseStatus = "PASSPHRASE_STATUS_FAILURE";
                }
            },
            
            getPersonalWebsiteUrls : function(){
            	 if(PMP_BG.BUILDNUMBER<10102){
                     var personalUrls = 'https://' + PMP_BG.serverName + '/restapi/json/v1/personal/websiteurls?AUTHTOKEN=' + PMP_BG.authToken;
            	 } else {
            		 var personalUrls = 'https://' + PMP_BG.serverName + '/restapi/json/v1/personal/websiteurls';
            	 }   
                $.ajax({type:'GET', url: personalUrls, headers:{'requestFrom' : 'pmpmobilenative', 'AUTHTOKEN': PMP_BG.authToken,'orgName' : PMP_BG.orgName, 'ClientType' : 12, 'PASSPHRASE' : PMP_BG.personalPassPhrase, 'sessionId':PMP_BG.sessionId}, async: true, dataType:"json"}).done(function(data){
                    PMP_BG.getPersonalWebAccountId(data);
                });
            },
           
            getPasswordForAutoFill : function(passwdId,retrievalReason,ticketId){
           	 if(PMP_BG.BUILDNUMBER<10102){
                var pwdURL = 'https://' + PMP_BG.serverName + '/api/json/request?AUTHTOKEN=' + PMP_BG.authToken + '&OPERATION_NAME=GET_PASSWORD';
           	 } else {
                var pwdURL = 'https://' + PMP_BG.serverName + '/api/json/request?OPERATION_NAME=GET_PASSWORD';
           	 }
                var input_data= 'INPUT_DATA={"operation":{"Details":{"PASSWDID":"' + passwdId + '","REASON":"' + retrievalReason + '","TICKETID":"'+ ticketId +'"}}}';
                return jQuery.ajax({type:'POST', url: pwdURL,data:input_data, headers:{'requestFrom' : 'pmpmobilenative', 'AUTHTOKEN': PMP_BG.authToken,'orgName' : PMP_BG.orgName, 'ClientType' : 12, 'sessionId':PMP_BG.sessionId}, async:false}).responseText;
            },
            
            getPersonalPasswordForAutoFill : function(categoryId,accountId){
              	 if(PMP_BG.BUILDNUMBER<10102){
              		 var personalPwdURL = 'https://' + PMP_BG.serverName + '/restapi/json/v1/personal/categories/'+ categoryId +'/accounts/'+ accountId +'/password?AUTHTOKEN=' + PMP_BG.authToken;
              	 } else {
              		 var personalPwdURL = 'https://' + PMP_BG.serverName + '/restapi/json/v1/personal/categories/'+ categoryId +'/accounts/'+ accountId +'/password';
              	 }
                return $.ajax({type:'GET', url: personalPwdURL, headers:{'requestFrom' : 'pmpmobilenative', 'AUTHTOKEN': PMP_BG.authToken,'orgName' : PMP_BG.orgName, 'ClientType' : 12, 'PASSPHRASE' : PMP_BG.personalPassPhrase, 'sessionId':PMP_BG.sessionId}, async: false}).responseText;
            },
            
            getPersonalWebAccountId : function(data){
                PMP_BG.PERSONALWEBSITEURL = new Array();
                if(data.operation.result.status === 'Failed'){
                    PMP_BG.PERSONALWEBSITEURL = "Failed";
                    PMP_BG.PERSONALWEBSITEURLFAILURE = data.operation.result.message;
                    return false;
                }
                
                if( data.operation.hasOwnProperty('Details') ){
                    var personalAccUrls = data.operation.Details;
                    var totalRows = data.operation.totalRows;
                    for(var i=0;i<totalRows;i++){
                        var categoryId = personalAccUrls[i].CATEGORYID;
                        var accountId = personalAccUrls[i].ACCOUNTID;
                        var personalUrl = personalAccUrls[i].PERSONALURL;
                        try{
							personalUrl=new URL(personalUrl).toString();
						} catch(exp){
						}
                        var userName = personalAccUrls[i].USERNAME;
                        var serviceName = personalAccUrls[i].SERVICENAME;
                        var personalUrlDomain = PMP_BG.getDomain(personalUrl);
                        var dataJson = {
                            "categoryId"    :   categoryId,
                            "accountId"     :   accountId,
                            "personalUrl"   :   personalUrl,
                            "personalUrlDomain":    personalUrlDomain,
                            "userName"         :    userName,
                            "serviceName"      :    serviceName,
                            'isTOTPConfigured' :  personalAccUrls[i].IS_TOTP_CONFIGURED
                        };
                        PMP_BG.PERSONALWEBSITEURL.push(dataJson);
                    }
                }
            },

            getAllResources : function(data){
                if(data.operation.result.status === 'Failed'){
                    PMP_BG.ALLRESOURCEDETAIL = "Failed";
                    PMP_BG.ALLRESOURCEDETAILFAILURE = data.operation.result.message;
                    return false;
                }
                PMP_BG.ALLRESOURCEDETAIL = new Array();
                if( data.operation.hasOwnProperty('Details') ){
                    var resourceArr = data.operation.Details;
                    var totalRows = data.operation.totalRows;
                    for(var i=0; i<totalRows; i++){
                        var resourceId = resourceArr[i]["RESOURCE ID"];
                        var resourceUrl = resourceArr[i]["RESOURCE URL"];
                        if(PMP_BG.isValid(resourceUrl)){
                            try{
								resourceUrl=new URL(resourceUrl).toString();
							} catch (exp){
							}
                        }
                        var resourceUrlDomain = PMP_BG.getDomain(resourceUrl);
                        var dataJson = {
                            "resourceId"        :   resourceId,
                            "resourceUrl"       :   resourceUrl,
                            "resourceUrlDomain" :   resourceUrlDomain
                        };
                        PMP_BG.ALLRESOURCEDETAIL.push( dataJson );
                    }
                }
            },
            
            getAccounts : function(resourceId){
             	 if(PMP_BG.BUILDNUMBER<10102){
             		 var accListURL = 'https://' + PMP_BG.serverName + '/api/json/request?AUTHTOKEN=' + PMP_BG.authToken + '&OPERATION_NAME=GET_RESOURCEACCOUNTLIST';
             	 } else {
             		 var accListURL = 'https://' + PMP_BG.serverName + '/api/json/request?OPERATION_NAME=GET_RESOURCEACCOUNTLIST';
             	 }
                    var input_data= 'INPUT_DATA={"operation":{"Details":{"RESOURCEID":"' + resourceId + '","VIEWTYPE":"ALLMYPASSWORD"}}}';
                return $.ajax({type:'POST', url: accListURL,data:input_data, headers:{'requestFrom' : 'pmpmobilenative', 'AUTHTOKEN': PMP_BG.authToken,'orgName' : PMP_BG.orgName, 'ClientType' : 12, 'sessionId':PMP_BG.sessionId}, async: false,
                error: function(jqxhr,textStatus,errorThrown){
                    if(jqxhr.status === 0){
                        return false;
                    }
                }}).responseText;
            },
            
            getDomain : function(url) {
                if (typeof url !== "undefined" && url !== "" && url.indexOf("/") !== -1) {
                    var urlRegex = "^(https?|ftp|file)://(www.)?([^/]*)/?.*";
                    var splitArr = url.match(urlRegex);
                    return (splitArr !== null && splitArr.length > 3) ? splitArr[3] : url;
                }
                return url;
            },
            getRootDomain:function(domain)
    {
        if(domain)
        {
        var secDomRegex="(.*)(\.co\.in|\.ac.in|\.gov\.in|\.nic\.in|\.edu\.in|\.co\.uk|\.org\.uk|\.ac\.uk)$";
        var topDomRegex="(.*)(\.com|\.org|\.co|\.in|\.local)$";
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
       if(Dom){
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
    }
        return null;
    },
            getProtocol : function(url){
                if (typeof url !== "undefined" && url !== "" && url.indexOf("/") !== -1) {
                    var urlRegex = "^(https?|ftp|file)://(www.)?([^/]*)/?.*";
                    var splitArr = url.match(urlRegex);
                    return (splitArr !== null && splitArr.length > 3) ? splitArr[1] : url;
                }
                return url;
            },

            checkProtocol : function(resourceUrl, windowUrl){
                var resourceUrlProtocol = PMP_BG.getProtocol(resourceUrl);
                var windowUrlProtocol = PMP_BG.getProtocol(windowUrl);
                return (resourceUrlProtocol === windowUrlProtocol || (resourceUrlProtocol === "http" && windowUrlProtocol === "https")) ? true : false;
            },

            searchUrlAPI : function(windowUrl){
                PMP_BG.getResourceAPI();
                var matchingResourceIdList = new Array();
                var searchValue = PMP_BG.getDomain(windowUrl);
                var i=0;
                for(i=0; i<PMP_BG.ALLRESOURCEDETAIL.length; i++){
                    if(PMP_BG.ALLRESOURCEDETAIL[i].resourceUrlDomain === searchValue){
                        var resourceUrl = PMP_BG.ALLRESOURCEDETAIL[i].resourceUrl;
                        var status = PMP_BG.checkProtocol(resourceUrl, windowUrl);
                       
                        if(status === true){// && subDirectoryCheck === true){
                            PMP_BG.tabLoadedResourceUrl = PMP_BG.ALLRESOURCEDETAIL[i].resourceUrl;
                            matchingResourceIdList.push(PMP_BG.ALLRESOURCEDETAIL[i].resourceId);
                        }
                    }
                }
               
                var listlen=matchingResourceIdList.length;
                if(listlen==0)
                {
                    
                    var rootDomain=PMP_BG.getRootDomain(searchValue);
                    var j=0;
                    for(j=0; j<PMP_BG.ALLRESOURCEDETAIL.length; j++){
                       
                        var resRootDomain=PMP_BG.getRootDomain(PMP_BG.ALLRESOURCEDETAIL[j].resourceUrlDomain);
                        if(resRootDomain === rootDomain){
                         
                            var resourceUrl = PMP_BG.ALLRESOURCEDETAIL[j].resourceUrl;
                            var status = PMP_BG.checkProtocol(resourceUrl, windowUrl);
                           
                            if(status === true){
                               
                                PMP_BG.tabLoadedResourceUrl = PMP_BG.ALLRESOURCEDETAIL[j].resourceUrl;
                                matchingResourceIdList.push(PMP_BG.ALLRESOURCEDETAIL[j].resourceId);
                               
                            }
                        }
                         
                    }
                  
                }
                
                var displayArray = new Array();
                for(i=0; i<matchingResourceIdList.length; i++){
                    var data = PMP_BG.getAccounts(matchingResourceIdList[i]);
                    if(typeof data === "undefined"){     //  for server not reachable case
                        PMP_BG.serverNotReachable = true;
                        return displayArray;
                    }
                    var parsed = JSON.parse(data);
                    if(parsed.operation.result.status === "Failed"){        //  This resource doesnot belong to the current user
                        continue;                                           //  If Failed is returned for only one resource, the entire operation will not be affected
                    }
                    var accountList = parsed.operation.Details["ACCOUNT LIST"];
                    var resourceName = parsed.operation.Details["RESOURCE NAME"];
                    var allowOpenURLInBrowser = parsed.operation.Details["ALLOWOPENURLINBROWSER"];
                    if(allowOpenURLInBrowser === 'true'){
                    for(var j=0; j<accountList.length; j++){
                        var passwordStatus = accountList[j]["PASSWORD STATUS"];
                        PMP_BG.isPasswordAccessDeniedForAccount = (passwordStatus.indexOf('####') !== -1) ? true : false;
                        var displayDetails = {
                            "resourceName"  :   resourceName,
                            "accountName"   :   accountList[j]["ACCOUNT NAME"],
                            "passwdId"     :   accountList[j].PASSWDID,
                            "resourceId"    :   matchingResourceIdList[i],
                            "isPasswordAccessDenied" : PMP_BG.isPasswordAccessDeniedForAccount,
                            "accountId"     :   accountList[j]["ACCOUNT ID"],
                            "isTOTPConfigured"  : accountList[j].IS_TOTP_CONFIGURED
                        };

                        PMP_BG.ticketRequiredMandatory = accountList[j].IS_TICKETID_REQD_MANDATORY;
                        PMP_BG.ticketRequired = accountList[j].IS_TICKETID_REQD;
                        PMP_BG.reasonRequired = accountList[j].ISREASONREQUIRED;
                        PMP_BG.reasonAndTicketCheck = ( PMP_BG.reasonRequired === 'true' || ( PMP_BG.ticketRequired === 'true' && PMP_BG.ticketRequiredMandatory === 'true')) ? true : false;

                            if(passwordStatus.indexOf('****') !== -1 || passwordStatus.indexOf('####') !== -1){     //  change made here
                                displayArray.push(displayDetails);
                            }
                        }
                    }
                }
                return displayArray;
            },
            
            searchPersonalUrlAPI : function(windowUrl){
                PMP_BG.getPersonalWebsiteUrls();
                var searchValue = PMP_BG.getDomain(windowUrl);
                var displayArray = new Array();
                
                for(var i=0; i<PMP_BG.PERSONALWEBSITEURL.length; i++){
                    if(PMP_BG.PERSONALWEBSITEURL[i].personalUrlDomain === searchValue){
                        var personalUrl = PMP_BG.PERSONALWEBSITEURL[i].personalUrl;
                        var status = PMP_BG.checkProtocol(personalUrl, windowUrl);
                        if(status === true){
                            PMP_BG.tabLoadedPersonalUrl = PMP_BG.PERSONALWEBSITEURL[i].personalUrl;
                            var categoryId = PMP_BG.PERSONALWEBSITEURL[i].categoryId;
                            var accountId = PMP_BG.PERSONALWEBSITEURL[i].accountId;
                            var loginName = PMP_BG.PERSONALWEBSITEURL[i].userName;
                            var serviceName = PMP_BG.PERSONALWEBSITEURL[i].serviceName;
                            var displayData = {
                                'categoryId': categoryId,
                                'accountId' : accountId,
                                'loginName': loginName,
                                'serviceName': serviceName,
                                'isTOTPConfigured' : PMP_BG.PERSONALWEBSITEURL[i].isTOTPConfigured
                            };
                            displayArray.push(displayData);
                        }
                    }
                }
                var listlen=displayArray.length;
                if(listlen==0)
                {
                     var rootDomain=PMP_BG.getRootDomain(searchValue);
                    for(var i=0; i<PMP_BG.PERSONALWEBSITEURL.length; i++){
                        var persRootDomain=PMP_BG.getRootDomain(PMP_BG.PERSONALWEBSITEURL[i].personalUrlDomain);
                    if( persRootDomain=== searchValue){
                        var personalUrl = PMP_BG.PERSONALWEBSITEURL[i].personalUrl;
                        var status = PMP_BG.checkProtocol(personalUrl, windowUrl);
                        if(status === true){
                            PMP_BG.tabLoadedPersonalUrl = PMP_BG.PERSONALWEBSITEURL[i].personalUrl;
                            var categoryId = PMP_BG.PERSONALWEBSITEURL[i].categoryId;
                            var accountId = PMP_BG.PERSONALWEBSITEURL[i].accountId;
                            var loginName = PMP_BG.PERSONALWEBSITEURL[i].userName;
                            var serviceName = PMP_BG.PERSONALWEBSITEURL[i].serviceName;
                            var displayData = {
                                'categoryId': categoryId,
                                'accountId' : accountId,
                                'loginName': loginName,
                                'serviceName': serviceName
                            };
                            displayArray.push(displayData);
                        }
                    }
                }
                }
               
                return displayArray;
            },

            getServerDetails: function(){
                let data={
                    buildNumber:PMP_BG.BUILDNUMBER,
                    serverName:PMP_BG.serverName,
                    passPhraseStatus:PMP_BG.passPhraseStatus,
                    headers:{
                        "requestFrom":"pmpmobilenative",
                        "ClientType":12,
                        "AUTHTOKEN":PMP_BG.authToken,
                        "sessionId":PMP_BG.sessionId,
                        "PASSPHRASE":PMP_BG.personalPassPhrase,
                        "orgName":PMP_BG.orgName
                    }
                }
                return data;
            },
            
            processRequest : function(request, sender, sendResponse){
                var action = request.action;
                var data = request.data;
                PMP_BG.IDLETIME = 0;
                switch(action){
                    case 'setServerDetails' :	PMP_BG.serverName = data.serverName;
                                                    PMP_BG.orgName = data.orgName;
                                                    PMP_BG.globalOrgName = data.globalOrgName;
                                                    PMP_BG.BUILDNUMBER = parseInt(data.BUILDNUMBER);
                                                    PMP_BG.SESSIONTIMEOUT=parseInt(data.SESSIONTIMEOUT);
                                                    PMP_BG.setLocalStorageData();
                                                    break;
                    case 'setOrgName'       :       PMP_BG.orgName = data;
                                                    sendResponse({'status':true});
                                                    if(PMP_BG.BUILDNUMBER >= 8100){
                                                        PMP_BG.getResourceAPI();// PMP_BG.startIndex );
                                                    }
                                                    if( PMP_BG.BUILDNUMBER >= 8402 && PMP_BG.ISPERSONALTABENABLED === "true" ){
                                                        if( PMP_BG.orgName.toLocaleLowerCase() === PMP_BG.globalOrgName.toLocaleLowerCase() ){
                                                            PMP_BG.getPersonalPassphraseInfo();
                                                        }
                                                        else{
                                                            PMP_BG.passPhraseStatus = "PERSONAL_ORG_CHANGED";
                                                        }
                                                    }
                                                    break;
                    case 'setClipBoardTimeOut':     PMP_BG.CLIPBOARDTIMEOUT = data;
                                                    PMP_BG.setLocalStorageData();
                                                    break;
                    case 'setSessionTimeOut':       PMP_BG.SESSIONTIMEOUT = data;
                    								PMP_BG.setLocalStorageData();
                    								break;  
                                                    
                    case 'setSettingsData':         PMP_BG.isAutoFillSubmitEnabled=data.isAutoFillSubmitEnabled;
                                                    PMP_BG.isSSOEnabled=data.isSSOEnabled;
                                                    PMP_BG.setLocalStorageData();
                                                   
                                                    
                                                    break;
                    case 'clearClipBoard'   :       var timeOut = PMP_BG.CLIPBOARDTIMEOUT * 1000;
                                                    if(timeOut !== 0){
                                                        var clearCBTask = window.setTimeout(function(){

                                                            browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                                            browser.tabs.sendMessage(tabs[0].id, {action: "clearClipp"}, function(response) {
                                                             
                                                            });
                                                          });
                                                         
                                                        },timeOut);
                                                    }
                                                    break;
                    case 'setLogOutTime'    :       PMP_BG.LOGOUTTIME = data;
                                                    PMP_BG.setLocalStorageData();
                                                    break;
                    case 'isServerDetailValid':	var isValid = PMP_BG.isServerDetailValid();
                                                    if(isValid === true){
                                                        sendResponse({
                                                            'isValid'           :   isValid,
                                                            'serverName'        :   PMP_BG.serverName,
                                                            'orgName'           :   PMP_BG.orgName,
                                                            'globalOrgName'     :   PMP_BG.globalOrgName,
                                                            'ORGLIST'           :   PMP_BG.ORGLIST,
                                                            'CLIPBOARDTIMEOUT'  :   PMP_BG.CLIPBOARDTIMEOUT,
                                                            'LOGOUTTIME'        :   PMP_BG.LOGOUTTIME,
                                                            'SESSIONTIMEOUT'    :   PMP_BG.SESSIONTIMEOUT,
                                                            'isAutoSubmitEnabled':  PMP_BG.isAutoFillSubmitEnabled,
                                                            'isSSOEnabled'      :   PMP_BG.isSSOEnabled,
                                                            'SESSIONID'         :   PMP_BG.sessionId,
                                                            'authToken'         :   PMP_BG.authToken
                                                        });
                                                    }else{
                                                        browser.storage.local.get('pmp_data', function(result){
                                                            if(result.pmp_data !== null && typeof result.pmp_data !== 'undefined'){
                                                                PMP_BG.serverName = result.pmp_data.serverName;
                                                                PMP_BG.orgName = result.pmp_data.orgName;
                                                                PMP_BG.globalOrgName = result.pmp_data.orgName;
                                                                PMP_BG.CLIPBOARDTIMEOUT = result.pmp_data.CLIPBOARDTIMEOUT;
                                                                PMP_BG.LOGOUTTIME = result.pmp_data.LOGOUTTIME;
                                                                PMP_BG.SESSIONTIMEOUT = result.pmp_data.SESSIONTIMEOUT;
                                                                PMP_BG.isAutoFillSubmitEnabled = result.pmp_data.isAutoFillSubmitEnabled;
                                                                PMP_BG.isSSOEnabled=result.pmp_data.isSSOEnabled;
                                                                isValid = true;
                                                            }
                                                            sendResponse({
                                                                'isValid'           :   isValid,
                                                                'serverName'        :   PMP_BG.serverName,
                                                                'orgName'           :   PMP_BG.orgName,
                                                                'globalOrgName'     :   PMP_BG.globalOrgName,
                                                                'ORGLIST'           :   PMP_BG.ORGLIST,
                                                                'CLIPBOARDTIMEOUT'  :   PMP_BG.CLIPBOARDTIMEOUT,
                                                                'LOGOUTTIME'        :   PMP_BG.LOGOUTTIME,
                                                                'SESSIONTIMEOUT'    :   PMP_BG.SESSIONTIMEOUT,
                                                                'isAutoSubmitEnabled':  PMP_BG.isAutoFillSubmitEnabled,
                                                                'isSSOEnabled'      :   PMP_BG.isSSOEnabled
                                                                
                                                            });
                                                        });
                                                        return true;
                                                    }
                                                    break;
                    case 'setAuthToken'	:	PMP_BG.authToken = data.authToken;
                                                    PMP_BG.sessionId=data.sessionId;
                                                    PMP_BG.loginName = data.loginName;
                                                    PMP_BG.userRoles = data.userRoles;
                                                    PMP_BG.ORGLIST = data.ORGLIST;
                                                    PMP_BG.USERID = data.USERID;
                                                    PMP_BG.isAutoLogonAccess = data.isAutoLogonAccess;
                                                    PMP_BG.isAutoFillAccess = data.isAutoFillAccess;
                                                    PMP_BG.enforceMaxTimeLimit = data.enforceMaxTimeLimit;
                                                    PMP_BG.ISPERSONALTABENABLED = data.ISPERSONALTABENABLED;
                                                    PMP_BG.isRoleAutologonAccess = data.IsRoleAutologonAccess;
                                                    PMP_BG.isAccessCtrlAuthorize= data.IsAccessCtrlAuthorize;
                                                    PMP_BG.SESSIONTIMEOUT= parseInt(data.SESSIONTIMEOUT);
                                                    PMP_BG.enforcePreventBrowserAddAccount= data.enforcePreventBrowserAddAccount;
                                                   
                                                    PMP_BG.ALLRESOURCEDETAIL = new Array();
                                                    PMP_BG.PERSONALWEBSITEURL = new Array();
                                                    if(PMP_BG.BUILDNUMBER >= 8100){
                                                        PMP_BG.getResourceAPI();// PMP_BG.startIndex );
                                                    }
                                                    if( PMP_BG.BUILDNUMBER >= 8402 && PMP_BG.ISPERSONALTABENABLED === "true" ){
                                                        PMP_BG.getPersonalPassphraseInfo();
                                                    }
                                                    break;
                    case "setPersonalPassPhrase":   PMP_BG.personalPassPhrase = data;
                                                    PMP_BG.getPersonalWebsiteUrls();
                                                    break;
                    case "setPassPhraseStatus":    PMP_BG.passPhraseStatus = data;
                                                   PMP_BG.personalPassPhrase = null;
                                                   break;
                    case 'currentLoginDetails':	    sendResponse(PMP_BG.processUtils.setCurrentLoginDetails(data));
                                                    break;
                    case 'getLoginDetails'	:	    sendResponse(PMP_BG.processUtils.getCurrentLoginDetails());
                                                    PMP_BG.clearLoginData();
                                                    break;
                    case 'getResourceUrl'	:	sendResponse({
                                                            "resourceUrl"           :   PMP_BG.resourceUrl,
                                                            "chromeVersionCheck"    :   PMP_BG.chromeVersionCheck,
                                                            "BUILDNUMBER"           :   PMP_BG.BUILDNUMBER,
                                                            "isAutoLogonAccess"     :   PMP_BG.isAutoLogonAccess,
                                                            "isAutoFillAccess"      :   PMP_BG.isAutoFillAccess,
                                                            "isPersonalTabEnabled"  :   PMP_BG.ISPERSONALTABENABLED,
                                                            "formParams"            :   PMP_BG.formParams,
                                                            "resourceUrlHasPlaceHolder" :   PMP_BG.resourceUrlHasPlaceHolder,
                                                            "isAutoSubmitEnabled"   :   PMP_BG.isAutoFillSubmitEnabled
                                                    });
                                                    break;
                    case 'getCurrentTabId'      :   PMP_BG.processUtils.getCurrentTabId(data).then(result=>sendResponse(result));
                                                    return true;  
                    case 'updateOldTabId'       :   PMP_BG.oldTabId=data;
                                                    break;
                    case 'clearLoginData'	:	PMP_BG.clearLoginData();
                                                    break;
                    case 'clearAuthToken'	:	PMP_BG.clearAuthToken();
                                                    break;
                    case 'isAuthTokenValid' :	var isAuthValid = PMP_BG.isAuthTokenValid();
                                                    if(isAuthValid === false){
                                                        sendResponse({'isValid'  :    isAuthValid});
                                                        break;
                                                    }
                                                    sendResponse({
                                                        'isValid'           :   isAuthValid,
                                                        'authToken'         :   PMP_BG.authToken,
                                                        'loginName'         :   PMP_BG.loginName,
                                                        'userRoles'         :   PMP_BG.userRoles,
                                                        'USERID'            :   PMP_BG.USERID,
                                                        'isAutoLogonAccess' :   PMP_BG.isAutoLogonAccess,
                                                        'isAutoFillAccess'  :   PMP_BG.isAutoFillAccess,
                                                        'enforceMaxTimeLimit':  PMP_BG.enforceMaxTimeLimit,
                                                        'ISPERSONALTABENABLED'  :   PMP_BG.ISPERSONALTABENABLED,
                                                        'isRoleAutologonAccess': PMP_BG.isRoleAutologonAccess,
                                                        'isAccessCtrlAuthorize': PMP_BG.isAccessCtrlAuthorize,
                                                        'isSSOEnabled'      :   PMP_BG.isSSOEnabled,
                                                        'enforcePreventBrowserAddAccount': PMP_BG.enforcePreventBrowserAddAccount
                                                      //  'showResourceGroup': PMP_BG.showResourceGroup
                                                    });
                                                    break;
                    case "checkPersonalPassPhrase" : var isPersonalPassPhraseValid = PMP_BG.isPersonalPassPhraseValid();
                                                        if( isPersonalPassPhraseValid === true ){
                                                            sendResponse({
                                                                'isValid' : isPersonalPassPhraseValid,
                                                                'personalPassPhrase' : PMP_BG.personalPassPhrase,
                                                                'passPhraseStatus'   : PMP_BG.passPhraseStatus
                                                            });
                                                        }
                                                        else{
                                                            sendResponse({
                                                                'isValid'  :    isPersonalPassPhraseValid
                                                            });
                                                        }
                                                        break;
                    case 'resetIdleTime'    :       PMP_BG.IDLETIME = 0;
                                                    break;
                    case 'getOrgList'       :       var isOrgListValid = (PMP_BG.ORGLIST !== null) ? true : false;
                                                    sendResponse({'isValid':isOrgListValid, 'ORGLIST':PMP_BG.ORGLIST});
                                                    break;
                    case 'searchUrlForAutofill':    if(PMP_BG.authToken === null){
                                                        sendResponse({'status':false, 'dataResource':'session timeout'});
                                                        break;
                                                    }
                                                    var windowUrl = data.windowUrl;
                                                    var operationName  = data.operation;
                                                    var isResourceOperation = operationName === "newTabLoaded" || operationName === "getResourceAccountList";
                                                    var isPersonalOperation = ( operationName === "newTabLoaded" || operationName === "getPersonalAccountList" ) && PMP_BG.BUILDNUMBER >= 8402;
                                                    var displayResourceArray = new Array();
                                                    var displayPersonalArray = new Array();
                                                    var status = false;
                                                    var isAPIFailure = false;
                                                    if( PMP_BG.ALLRESOURCEDETAIL === "Failed" ){
                                                        isAPIFailure = true;
                                                        displayResourceArray = PMP_BG.ALLRESOURCEDETAILFAILURE;
                                                        displayPersonalArray = PMP_BG.PERSONALWEBSITEURLFAILURE;
                                                    }
                                                    else{
                                                        if( isResourceOperation === true ){
                                                            displayResourceArray = PMP_BG.searchUrlAPI(windowUrl);//, autoFill);
                                                        }
                                                        var isSearchPersonalUrlAPI = ( PMP_BG.passPhraseStatus === "PASSPHRASE_NOT_NEED" || ( PMP_BG.passPhraseStatus === "PASSPHRASE_NEED" && PMP_BG.isPersonalPassPhraseValid() === true ) ) && ( isPersonalOperation === true );
                                                        if( isSearchPersonalUrlAPI === true ){
                                                            displayPersonalArray = PMP_BG.searchPersonalUrlAPI(windowUrl);
                                                        }

                                                        
                                                        if(displayResourceArray.length > 0 && isResourceOperation === true){
                                                            status = true;
                                                        }

                                                        if(displayPersonalArray.length > 0 && isPersonalOperation === true){
                                                            status = true;
                                                        }else if( isSearchPersonalUrlAPI === false ){
                                                            displayPersonalArray = PMP_BG.passPhraseStatus;
                                                        }

                                                        if(PMP_BG.serverNotReachable === true){
                                                            displayResourceArray = 'server not reachable';
                                                            PMP_BG.serverNotReachable = false;
                                                        }
                                                    }
                                                    sendResponse({
                                                        'status'                :   status,
                                                        'isAPIFailure'          :   isAPIFailure,
                                                        'dataResource'          :   displayResourceArray,
                                                        'dataPersonal'          :   displayPersonalArray,
                                                        'tabLoadedResourceUrl'  :   PMP_BG.tabLoadedResourceUrl,    //The two terms are added is to ensure the correct page fill on the domain on single account fill
                                                        'tabLoadedPersonalUrl'  :   PMP_BG.tabLoadedPersonalUrl,
                                                        'reasonAndTicketCheck'  :   PMP_BG.reasonAndTicketCheck,
                                                       'ticketRequiredMandatory'  :   PMP_BG.ticketRequiredMandatory,
                                                        'ticketRequired'  :   PMP_BG.ticketRequired,
                                                        'reasonRequired'  :   PMP_BG.reasonRequired
                                                    });
                                                    break;
                    case "getPasswordForAutoFill":  var password = null;
                                                    var passwordStatus = false;
                                                    if( data.operationName === 'getResourceAccountList' ){
                                                        var response = PMP_BG.getPasswordForAutoFill(data.passwordId,data.reason,data.ticketId);
                                                        var parsed = JSON.parse(response);
                                                        var passwordStatus = (parsed.operation.result.status === 'Success') ? true:false;
                                                        if( passwordStatus === true ){
                                                            password = parsed.operation.Details.PASSWORD;
                                                        }
                                                    }
                                                    else if( data.operationName === 'getPersonalAccountList' ){
                                                        var response = PMP_BG.getPersonalPasswordForAutoFill(data.categoryId,data.accountId);
                                                        var parsed = JSON.parse(response);
                                                        var passwordStatus = (parsed.operation.result.status === 'Success') ? true:false;
                                                        if( passwordStatus === true ){
                                                            password = parsed.operation.Details.PASSWORD;
                                                        }
                                                    }
                                                    sendResponse({'status':passwordStatus, 'data':password});
                                                    password = null;
                                                    break;
                    case "urlHadPlaceHolder"    :   PMP_BG.resourceUrlHasPlaceHolder = false;
                                                    break;
                    case "setWindowUrl"         :
                                                    PMP_BG.windowUrl=null;
                                                    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
                                                        var curentTabUrl= tabs[0].url;  
                                                        PMP_BG.windowUrl=curentTabUrl;
                                                    });
													
													sendResponse({});
													break;
													
					case "getWindowUrl"			:	sendResponse({
                                                                'BUILDNUMBER'                :   PMP_BG.BUILDNUMBER,
                                                                'ISPERSONALTABENABLED'          :  PMP_BG.ISPERSONALTABENABLED,
                                                                'chromeVersionCheck'          :   PMP_BG.chromeVersionCheck,
                                                                'windowUrl'          :   PMP_BG.windowUrl
                                                            
                                                            });
													break;

                    case "autoFillPassword"     :   browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
                                                        var curentTabUrl= tabs[0].url;  
														browser.tabs.sendMessage(tabs[0].id, {action: "autoFillPassword" , data:data}, function(response) {
                                                             
                                                            });
														
                                                    });
													
													sendResponse({});
													break;
					
					case "removeAutoFillFrame"     :
                                                    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
														browser.tabs.sendMessage(tabs[0].id, {action: "removeAutoFillFrame" , data:null}, function(response) {
                                                             
                                                            });
														
                                                    });
													
													sendResponse({});
													break;
					case "setIframeDimensions"     :
                                                    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
														browser.tabs.sendMessage(tabs[0].id, {action: "setIframeDimensions" , data:data}, function(response) {
                                                             
                                                            });
														
                                                    });
													break;
                    case "getTOTP"              :   PMP_BG.processUtils.getTOTP(data).then(result=>sendResponse(result));
                                                    return true;
                    case "autoFillTOTP"     :   PMP_BG.processUtils.autoFillTOTP(data);
                                                break;
                }
            },

            processUtils :{
                getCurrentTabId : async function(){
                    let tabs = await browser.tabs.query({active: true, currentWindow: true});
                    let tabData ={}
                    tabData.oldTabId = PMP_BG.oldTabId;
                    if(PMP_BG.isValid(tabs) && PMP_BG.isValid(tabs[0]) && PMP_BG.isValid(tabs[0].id)){
                        tabData.currentTabId = tabs[0].id;
                    }
                    return tabData;
                },
                setCurrentLoginDetails :function(data){
                    PMP_BG.username = data.username;
                    PMP_BG.password = data.password;
                    PMP_BG.resourceUrl = data.resourceUrl;
                    PMP_BG.formParams = data.formParams;
                    PMP_BG.resourceUrlHasPlaceHolder = data.resourceUrlHasPlaceHolder;
                    PMP_BG.isPasswordAccessDeniedForAccount = data.isPasswordAccessDenied;
                    PMP_BG.accountId = data.accountId;
                    PMP_BG.isTOTPConfigured = data.isTOTPConfigured;
                    PMP_BG.isPersonal = data.isPersonal;
                    return {'status':true};
                },
                getCurrentLoginDetails : function(){
                    let result =  {
                        "username":PMP_BG.username,
                        "password"  : PMP_BG.password, 
                        "isPasswordAccessDenied" : PMP_BG.isPasswordAccessDeniedForAccount,
                        "accountId" : PMP_BG.accountId,
                        "isTOTPConfigured" : PMP_BG.isTOTPConfigured,
                        "isPersonal" : PMP_BG.isPersonal
                    }
                    return result;
                },
                getTOTP : async function(totpData){
                    let serverDetails= PMP_BG.getServerDetails();
                    if(totpData.isPersonal){
                        return await PMP_BG.serverUtils.generatePersonalTOTP(totpData.accountId,serverDetails);
                    } else {
                        return await PMP_BG.serverUtils.generateTOTP(totpData.accountId,serverDetails);
                    }
                },
                autoFillTOTP : function(loginDetails){
                    browser.tabs.query({active: true, currentWindow: true}, async function(tabs){
                        let totp = await PMP_BG.processUtils.getTOTP(loginDetails);
                        browser.tabs.sendMessage(tabs[0].id, {action: "autoFillTOTP" , data:totp}, function(response) {});
                    });
                    
                }
            },

            serverUtils : {
                generateTOTP: async function(accountId,serverDetails){
                    let url= 'https://' + serverDetails.serverName + '/restapi/json/v1/accounts/'+accountId+'/totp';
                    var response= await fetch(url,{method:'GET',headers:serverDetails.headers})
                                        .then(response=>response.json())
                                        .catch(err=>{return null});
                    let totp = "000000";
                    if(response.operation.result.statusCode === 20000){
                        totp= response.operation.Details.TOTP;
                    }
                    return totp;
                },
        
                generatePersonalTOTP: async function(accountId,serverDetails){
                    let url= 'https://' + serverDetails.serverName + '/restapi/json/v1/personal/webaccounts/'+accountId+'/totp';
                    var response= await fetch(url,{method:'GET',headers:serverDetails.headers})
                                        .then(response=>response.json())
                                        .catch(err=>{return null});
                    let totp = "000000";
                    if(response.operation.result.statusCode === 20000){
                        totp= response.operation.Details.TOTP;
                    }
                    return totp;
                }
            }

    };

    PMP_BG.init();

})();

//PMP_Chrome_BG();
