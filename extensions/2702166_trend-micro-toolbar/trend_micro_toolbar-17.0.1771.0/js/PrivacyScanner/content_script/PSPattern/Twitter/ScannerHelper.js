(function() {'use strict';

    // ================================================
    // SendDataConstructor
    // ================================================
    var ScanResultsTemplate = TwitterScanResultsTemplate;

    var ScannerHelper = function(isMobile) {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsFacebook() ? window.location.protocol + '//' + window.location.host : 'https://twitter.com';
        this.isMobile = !!isMobile;
    };
    ScannerHelper.prototype.logHeaderSendData = '[Twitter Scan -> send data]';
    ScannerHelper.prototype.logHeaderHandleResponseData = '[Twitter Scan -> handle response data]';

    ScannerHelper.prototype.getUserIDByJson = function(data) {
        return data["session"]["user_id"]||"";
    };
    
    ScannerHelper.prototype.getUserName = function(data) {
        /*function method_1(data) {
            return data.find('.DashUserDropdown-userInfo .fullname').eq(0).text();
        }
        return method_1(data);*/
        return data["settings"]["remote"]["settings"]["screen_name"]||"";
    };
    
    ScannerHelper.prototype.getUserImageURL = function(data,user_id) {
        /*function method_1(data) {
            return data.find('.current-user .avatar').eq(0).attr('src');
        }
        function method_2(data) {
            return data.find('.js-action-profile-avatar').eq(0).attr('src');
        }
        function method_3(data) {
            return data.find('.avatar[data-user-id]').eq(0).attr('src');
        }
        return method_1(data) || method_2(data) || method_3(data);*/
        return data["entities"]["users"]["entities"][user_id]["profile_image_url_https"]||"";
    };
    
    ScannerHelper.prototype.getSendData_SettingPage = function(callback) {
        var that = this;
        var scanResultObj = {
            protectYourTweet:{},
            addLocation:{},
            findYouByEmail:{},
            findYouByPhone:{},
            photoTagging:{},
            twoFactorAuthentication: {}
        };

        var processArr = [{
                name:"protectYourTweet",
                func:
                    function(scanResultObj,processNextCallback){
                        console.log('[PS][Twitter] check protectYourTweet');
                        function IsProtectYourTweetsPageLoadComplete() {
                            return document.querySelectorAll('[type=checkbox]').length == 1;
                        }

                        function catchProtectYourTweetsName() {
                            if(IsProtectYourTweetsPageLoadComplete()) {
                                let protectYourTweetTitle = '';
                                let protectYourTweetDes = '';
                                let protectYourTweetCurrent = 1;
                                let queryRet = document.querySelectorAll('[role=main] label div[dir=auto] span');
                                if (queryRet.length === 0) {
                                    queryRet = document.querySelectorAll('[role=main] label div[dir=ltr] span');
                                }

                                if(queryRet.length >= 1) {
                                    protectYourTweetTitle = queryRet[queryRet.length-1].innerHTML;
                                }
                                else {
                                    protectYourTweetTitle = queryRet[0].innerHTML;
                                }

                                protectYourTweetDes = document.querySelector('[role=main] label+div').childNodes[0].textContent;

                                queryRet = document.querySelectorAll('[role=main] label div+div div div');
                                if(queryRet.length >= 1) {
                                    protectYourTweetCurrent = queryRet[queryRet.length-1].querySelector('svg')? 1 : 0;
                                }
                                else {
                                    protectYourTweetCurrent = queryRet[0].querySelector('svg')? 1 : 0;
                                }

                                scanResultObj.protectYourTweet.Title = protectYourTweetTitle;
                                scanResultObj.protectYourTweet.Des = protectYourTweetDes;
                                scanResultObj.protectYourTweet.Current = protectYourTweetCurrent;

                                // Click back button
                                getBackButton().click();
                                // Trigger processNextCallback to next processArr function after DOM is updated
                                checkPrivacyAndSafetyPage(processNextCallback);
                            }
                            else {
                                setTimeout(() => { 
                                    catchProtectYourTweetsName()
                                }, 200);
                            }
                        }

                        function goToAudienceAndTaggingPage() {
                            // Go to audience_and_tagging page
                            var queryRet = document.querySelector('a[href="/settings/audience_and_tagging"]');
                            if(queryRet === null) {
                                setTimeout(() => {
                                    goToAudienceAndTaggingPage()
                                }, 200);

                                return;
                            }

                            queryRet.click();
                            catchProtectYourTweetsName();
                            return true;
                        }
                        goToAudienceAndTaggingPage();
                    }
            },{
                name:"addLocation",
                func:
                    function(scanResultObj,processNextCallback){
                        console.log('[PS][Twitter] check addLocation');
                        function catchLocationSelectName(callback) {
                            let addLocatonQuery = null;
                            do {
                                addLocatonQuery = document.querySelector('section[aria-labelledby="detail-header"] label div[dir=auto] span');
                                if (addLocatonQuery) {
                                    break;
                                }

                                addLocatonQuery = document.querySelectorAll('[role="main"] label div[dir=ltr] span');
                                if (addLocatonQuery.length === 1) {
                                    addLocatonQuery = addLocatonQuery[0];
                                    break;
                                }

                                addLocatonQuery = document.querySelector('section[aria-labelledby="detail-header"] label div[dir=ltr] span');
                            } while(false);
                            

                            if(!addLocatonQuery) {
                                setTimeout(() => {
                                    catchLocationSelectName(callback);
                                }, 200);

                                return;
                            }

                            let addLocationTitle = addLocatonQuery.innerText;
                            let addLocationDes = addLocationTitle;
                            let addLocationCurrent = document.querySelector('[role=main] label div+div div div svg')? 1 : 0;
                            scanResultObj.addLocation.Title = addLocationTitle;
                            scanResultObj.addLocation.Des = addLocationDes;
                            scanResultObj.addLocation.Current = addLocationCurrent;

                            callback();
                        }

                        function goToLocationPage() {
                            var queryRet = document.querySelector('a[href="/settings/location"]');
                            if(queryRet === null) {
                                setTimeout(() => {
                                    goToLocationPage()
                                }, 200);

                                return;
                            }
                            queryRet.click();

                            setTimeout(() => {
                                catchLocationSelectName(() => {
                                    // Click back button twice
                                    getBackButton().click();
                                    setTimeout(() => {
                                        getBackButton().click();

                                        // trigger processNextCallback to next processArr function
                                        checkPrivacyAndSafetyPage(processNextCallback);
                                    }, 200);
                                });
                            }, 200);
                        }

                        function goToLocationAndInformationPage() {
                            // Go to location page
                            var queryRet = document.querySelector('a[href="/settings/location_information"]');
                            if(queryRet === null) {
                                setTimeout(() => {
                                    goToLocationAndInformationPage()
                                }, 200);

                                return;
                            }
                            queryRet.click();
                            goToLocationPage();
                        }
                        goToLocationAndInformationPage();
                    }
            },{
                name:"findYouByEmailAndPhone",
                func:
                    function(scanResultObj,processNextCallback){
                        console.log('[PS][Twitter] check findYouByEmailAndPhone');
                        function TwitterIsPageLoadComplete() {
                            if (document.querySelectorAll('[type=checkbox]').length == 2) {
                                return true;
                            }
                            return false;
                        }

                        function catchTrackerSelectName() {
                            if (TwitterIsPageLoadComplete()) {
                                let findYouByEmailTitle = '';
                                let findYouByEmailDes = '';
                                let findYouByEmailCurrent = 0;
                                let findYouByPhoneTitle = '';
                                let findYouByPhoneDes = '';
                                let findYouByPhoneCurrent = 0;
                                let titleQueryRet = document.querySelectorAll('[role=main] label div[dir=auto] span');
                                if (titleQueryRet.length === 0) {
                                    titleQueryRet = document.querySelectorAll('[role=main] label div[dir=ltr] span');
                                }
                                if(titleQueryRet.length >= 2) {
                                    findYouByEmailTitle = titleQueryRet[titleQueryRet.length-2].innerHTML;
                                    findYouByPhoneTitle = titleQueryRet[titleQueryRet.length-1].innerHTML;
                                }
                                let descQueryRet = document.querySelectorAll('[role=main] label+div');
                                if(descQueryRet.length >= 2) {
                                    findYouByEmailDes = descQueryRet[0].childNodes[0].textContent;
                                    findYouByPhoneDes = descQueryRet[1].childNodes[0].textContent;
                                }

                                let currentQueryRet = document.querySelectorAll('[role=main] label div+div div div');
                                if(currentQueryRet.length >= 2) {
                                    findYouByEmailCurrent = currentQueryRet[currentQueryRet.length-2].querySelectorAll('svg').length? 1 : 0;
                                    findYouByPhoneCurrent = currentQueryRet[currentQueryRet.length-1].querySelectorAll('svg').length? 1 : 0;
                                }
                                
                                scanResultObj.findYouByEmail.Title = findYouByEmailTitle;
                                scanResultObj.findYouByEmail.Des = findYouByEmailDes;
                                scanResultObj.findYouByEmail.Current = findYouByEmailCurrent;
                                scanResultObj.findYouByPhone.Title = findYouByPhoneTitle;
                                scanResultObj.findYouByPhone.Des = findYouByPhoneDes;
                                scanResultObj.findYouByPhone.Current = findYouByPhoneCurrent;

                                // Click back button
                                getBackButton().click();
                                //trigger processNextCallback to next processArr function
                                checkPrivacyAndSafetyPage(processNextCallback);
                            }
                            else {
                                setTimeout(() => {
                                    catchTrackerSelectName()
                                }, 200);
                            }
                        }

                        function goToContactsPage() {
                            // Go to contacts page
                            var queryRet = document.querySelector('a[href="/settings/contacts"]');
                            if(queryRet === null) {
                                setTimeout(() => {
                                    goToContactsPage()
                                }, 200);

                                return;
                            }
                            queryRet.click();
                            catchTrackerSelectName();
                        }
                        goToContactsPage();
                    }
            },{
                name:"twoFactorAuthentication",
                func:
                    function(scanResultObj,processNextCallback){
                        console.log('[PS][Twitter] check twoFactorAuthentication');
                        function IsLoginVerificationPageLoadComplete() {
                            return document.querySelectorAll('[type=checkbox]').length == 3;
                        }

                        function catch2FAStatus() {
                            if(IsLoginVerificationPageLoadComplete()) {
                                let twoFactorAuthenticationTitle = '';
                                let twoFactorAuthenticationDes = '';
                                let twoFactorAuthenticationCurrent = -1;

                                let titleQueryRet = document.querySelector('[role=main] h2 div[dir=auto] span');
                                if (!titleQueryRet) {
                                    titleQueryRet = document.querySelector('[role=main] h2 div[dir=ltr] span');
                                }

                                if(titleQueryRet) {
                                    twoFactorAuthenticationTitle = titleQueryRet.innerText;
                                    twoFactorAuthenticationDes = titleQueryRet.innerText;
                                }

                                let queryRet = document.querySelectorAll('[role=main] label div+div div div');
                                if(queryRet.length >= 3) {
                                    twoFactorAuthenticationCurrent = 0;
                                    for(let i = queryRet.length-3; i < queryRet.length; ++i) {
                                        let isChecked = queryRet[i].querySelectorAll('svg').length? 1 : 0;
                                        if(isChecked === 1) {
                                            twoFactorAuthenticationCurrent = 1;
                                            break;
                                        }
                                    }
                                }

                                scanResultObj.twoFactorAuthentication.Title = twoFactorAuthenticationTitle;
                                scanResultObj.twoFactorAuthentication.Des = twoFactorAuthenticationDes;
                                scanResultObj.twoFactorAuthentication.Current = twoFactorAuthenticationCurrent;

                                if(typeof(tbc_feedback_2fa_status) !== 'undefined') {
                                    tbc_feedback_2fa_status("TWITTER", twoFactorAuthenticationCurrent);
                                }

                                function goBackAndGoToPrivacyAndSafetyPage(callback) {
                                    let queryRet = document.querySelector('a[href="/settings/privacy_and_safety"]');
                                    if (queryRet === null) {
                                        let backButton = getBackButton();
                                        if (backButton) {
                                            backButton.click();
                                        }
                                        setTimeout(() => {
                                            goBackAndGoToPrivacyAndSafetyPage(callback);
                                        }, 200);

                                        return;
                                    }

                                    queryRet.click();
                                    callback();
                                }
                                goBackAndGoToPrivacyAndSafetyPage(() => {
                                    checkPrivacyAndSafetyPage(processNextCallback);
                                });
                            }
                            else {
                                setTimeout(() => { 
                                    catch2FAStatus();
                                }, 200);
                            }
                        }

                        function goToLoginVerificationPage() {
                            // Go to login_verification page
                            let queryRet = document.querySelector('a[href="/settings/account/login_verification"]');
                            if (queryRet === null) {
                                setTimeout(() => {
                                    goToLoginVerificationPage();
                                }, 200);

                                return;
                            }

                            queryRet.click();
                            catch2FAStatus();
                        }

                        function goToSecurityPage() {
                            // Go to security page
                            let queryRet = document.querySelector('a[href="/settings/security"]');
                            if (queryRet === null) {
                                setTimeout(() => {
                                    goToSecurityPage()
                                }, 200);

                                return;
                            }

                            queryRet.click();
                            goToLoginVerificationPage();
                        }

                        function goToSecurityAndAccountAccessPage() {
                            // Go to security_and_account_access page
                            let queryRet = document.querySelector('a[href="/settings/security_and_account_access"]');
                            if(queryRet === null) {
                                let backButton = getBackButton();
                                if (backButton) {
                                    backButton.click();
                                }
                                setTimeout(() => {
                                    goToSecurityAndAccountAccessPage()
                                }, 200);

                                return;
                            }

                            queryRet.click();
                            goToSecurityPage();
                        }
                        goToSecurityAndAccountAccessPage();
                    }
            }
        ];

        function goToPrivacyAndSafetyPage(callback) {
            // Go to privacy_and_safety page
            let queryRet = document.querySelector('a[href="/settings/privacy_and_safety"]');
            if(queryRet === null) {
                setTimeout(() => {
                    goToPrivacyAndSafetyPage(callback);
                }, 200);

                return;
            }

            queryRet.click();
            callback();
        }

        function checkPrivacyAndSafetyPage(callback){
            function TwitterIsPrivacyAndSafetyPageLoadComplete(data) {
                if (document.querySelectorAll('a[href="/settings/contacts"]').length != 0) {
                    return true;
                }
                return false;
            }
    
            function checkAndWaitPrivacyAndSafetyPage() {
                if (!TwitterIsPrivacyAndSafetyPageLoadComplete()) {
                    setTimeout(checkAndWaitPrivacyAndSafetyPage, 200);
                }
                else{
                    callback();
                }
            }
            checkAndWaitPrivacyAndSafetyPage();
        }

        function processNextCallback(){
            if(index == processArr.length - 1){
                console.log('[PS][Twitter] processNextCallback: scanResultObj = ' + JSON.stringify(scanResultObj));
                callback(scanResultObj);
            }
            else{
                index = index + 1;
                processArr[index].func(scanResultObj,processNextCallback);
            }
        }

        function getBackButton() {
            let backButton = null;
            if(that.isMobile) {
                backButton = document.querySelectorAll('[role=banner] div[role=button]')[0];
                if(!backButton) {
                    backButton = document.querySelectorAll('div[role=button]')[0];
                }
            }
            else {
                backButton = document.querySelectorAll('[role=main] div[role=button]')[0];
            }
    
            if(!backButton) {
                console.log('getBackButton: unable to find back button...isMobile = ' + that.isMobile);
            }
    
            return backButton;
        };

        var index = 0;
        processArr[index].func(scanResultObj,processNextCallback);
    };

    ScannerHelper.prototype.handleResponse_SettingPage = function(data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_SettingPage', data).getLog();
        var returnResult = {};
        returnResult['user_id'] = null;
        returnResult['scanResult'] = [];
        returnResult['scanResult_incomplete'] = false;

        /*
         get protect_my_tweet
         */
        try {
            var protect_my_tweet = this.getScanResultSampleByID('11');
            protect_my_tweet['Current'] = data.protectYourTweet.Current;
            protect_my_tweet['Title'] = data.protectYourTweet.Title;
            protect_my_tweet['Desc'] = data.protectYourTweet.Des;
            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         get let_others_find_me_by_email
         */
        try {
            var let_others_find_me = this.getScanResultSampleByID('12');
            let_others_find_me['Current'] = data.findYouByEmail.Current;
            let_others_find_me['Title'] = data.findYouByEmail.Title;
            let_others_find_me['Desc'] = data.findYouByEmail.Des;
            returnResult['scanResult'].push(let_others_find_me);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         get let_others_find_me_by_email_phone
         */
        try {
            var find_you_by_phone = this.getScanResultSampleByID('13');
            find_you_by_phone['Current'] = data.findYouByPhone.Current;
            find_you_by_phone['Title'] = data.findYouByPhone.Title;
            find_you_by_phone['Desc'] = data.findYouByPhone.Des;
            returnResult['scanResult'].push(find_you_by_phone);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         get add_a_location
         */
        try {
            var add_a_location = this.getScanResultSampleByID('14');
            add_a_location['Current'] = data.addLocation.Current;
            add_a_location['Title'] = data.addLocation.Title;
            add_a_location['Desc'] = data.addLocation.Des;
            returnResult['scanResult'].push(add_a_location);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }
        
        /*
         Photo tagging.
         */
        try {
            // var photo_tagging = this.getScanResultSampleByID('16');
            
            // var label_input = data.find('#allow_media_tagging_fieldset input');
            // photo_tagging['Current'] = (function(){
            //     for(var index = 0; index < label_input.length; index++){
            //         if(label_input.eq(index)[0].checked){
            //             return index;
            //         }
            //     }
            //     return 0;
            // })();
            
            // photo_tagging['Title'] = data.find('#allow_media_tagging_fieldset legend').text();
            // photo_tagging['Desc'] = photo_tagging['Title'];
            
            // photo_tagging['PossibleValue'] = {
            //     0: label_input.eq(0).parent().text(),
            //     1: label_input.eq(1).parent().text(),
            //     2: label_input.eq(2).parent().text()
            // };

            // var photo_tagging = this.getScanResultSampleByID('16');

            // photo_tagging['Current'] = data.photoTagging.Current;
            // photo_tagging['Title'] = data.photoTagging.Title;
            // photo_tagging['Desc'] = data.photoTagging.Des;
            
            // photo_tagging['PossibleValue'] = {
            //     0: data.photoTagging.CurrentSetting1,
            //     1: data.photoTagging.CurrentSetting2,
            //     2: false
            // };

            // returnResult['scanResult'].push(photo_tagging);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        /*
         get user_id
         */
        try {
            returnResult['user_id'] = window.user_id;
            if(!returnResult['user_id']){
                //add compatibility for mobile privacy scan
                if(protect_my_tweet['Title']){
                    returnResult['user_id'] = true;
                }
                else{
                    returnResult['user_id'] = null;
                }
            }
        } catch (e) {
            PSDebug.error(e);
            returnResult['user_id'] = null;
        }

        return returnResult;
    };

    ScannerHelper.prototype.getAllvalidID = function() {
        var allValidID = [];
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            allValidID.push(ScanResultsTemplate[i]['ID']);
        }
        return allValidID;
    };
    ScannerHelper.prototype.isValidID = function(id) {
        var allValidID = this.getAllvalidID();
        for (var i = 0; i < allValidID.length; i++) {
            if (id == allValidID[i]) {
                return true;
            }
        }
        return false;
    };

    ScannerHelper.prototype.getScanResultSampleByID = function(id) {
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            if (ScanResultsTemplate[i]['ID'] == id) {
                return PUtil.cloneObj(ScanResultsTemplate[i]);
            }
        }
    };

    ScannerHelper.prototype.handleAccountInfo = function (data) {
        var that = this;
        var strLeft = data.indexOf("window.__INITIAL_STATE__");
        var strRight = data.indexOf("window.__META_DATA__");
        var strInitialState = data.slice(strLeft,strRight);
        strLeft = strInitialState.indexOf("{");
        strRight = strInitialState.lastIndexOf("}");
        var parseString = strInitialState.slice(strLeft,strRight+1);
        var parseJson = JSON.parse(parseString);

        var accountInfo = {};
        var user_id = that.getUserIDByJson(parseJson);
        if(!user_id)
        {
            accountInfo.blogin = false;
            return accountInfo;
        }

        accountInfo['blogin'] = true;
        accountInfo['user_id'] = user_id;
        accountInfo['name'] = that.getUserName(parseJson);
        accountInfo['image_url'] = that.getUserImageURL(parseJson,user_id);
        window.user_id = user_id;
        return accountInfo;
    };

    window.TwitterScannerHelper = ScannerHelper;
})();
