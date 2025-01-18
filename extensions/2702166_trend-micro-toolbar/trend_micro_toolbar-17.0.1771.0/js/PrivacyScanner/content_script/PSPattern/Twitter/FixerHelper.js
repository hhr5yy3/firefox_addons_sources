(function() {
    'use strict';

    var Constants = [
        {
            ID: 11,
            FixRelated: {
            }
            // Description: 'Protect my Tweets'
        }, {
            ID: 12,
            FixRelated: {
            }
            // Description: 'Let others find me by my email address'
        }, {
            ID: 13,
            FixRelated: {
            }
            // Description: 'Let others find me by my phone number'
        }, {
            ID: 14,
            FixRelated: {
            }
            // Description: 'Add a location to my Tweets'
        }];


    var FixHelper = function(isMobile) {
        this.isMobile = !!isMobile;
    };

    FixHelper.prototype.logHeaderSendData = '[Twitter Fix -> click data]';
    FixHelper.prototype.logHeaderHandleResponseData = '[Twitter Fix -> handle response data]';    
    
    FixHelper.prototype.performFix = function(id, value) {
        var that = this;
        var params = null;
        var check_box = null;
        function clickCheckBox(check_box) {
            if(!check_box) {
                return;
            }

            var current_value = check_box.checked ? 1 : 0;
            if (value != current_value) {
                check_box.click();
            }
        }

        function clickBackButton() {
            let backButton = null;
            if(that.isMobile) {
                backButton = document.querySelectorAll('[role=banner] div[role=button]')[0];
            }
            else {
                backButton = document.querySelectorAll('[role=main] div[role=button]')[0];
            }

            if(!backButton) {
                console.log('clickBackButton: unable to find back button...isMobile = ' + that.isMobile);
            }
            else {
                backButton.click();
            }
        }
        
        function waitForPrivacyAndSafetyPage(){
            function TwitterIsPageLoadComplete() {
                if (document.querySelectorAll('a[href="/settings/contacts"]').length != 0) {
                    return true;
                }
                return false;
            }

            function triggerDoCheckPage() {
                if (!TwitterIsPageLoadComplete()) {
                    setTimeout(triggerDoCheckPage, 200);
                }
                else{
                    window.nfinishFlag = 1;
                }
            }
            triggerDoCheckPage();
        }
        
        try {
            switch (String(id)) {
                case '11':
                    {
                        var check_box = null;
                        params = 'Protect my Tweets';
                        document.querySelector('a[href="/settings/audience_and_tagging"]').click();
    
                        function TwitterProtectYourTweetsPageLoadComplete() {
                            return document.querySelectorAll('[type=checkbox]').length == 1;
                        }
    
                        function triggerDoFix() {
                            if (TwitterProtectYourTweetsPageLoadComplete()) {
                                check_box = document.querySelector('[type=checkbox]');
                                setTimeout(function(){
                                   clickCheckBox(check_box);
                                   setTimeout(function(){
                                       document.querySelector('[data-testid=confirmationSheetConfirm]').click();
                                       clickBackButton();
                                       waitForPrivacyAndSafetyPage();
                                    }, 200);
                                }, 200);
                            }
                            else {
                                setTimeout(triggerDoFix, 200);
                            }
                        }
                        triggerDoFix();
                    }
                    break;
                case '12':
                    {
                        var check_box = null;
                        params = 'Let others find me by my email address';
                        document.querySelector('a[href="/settings/contacts"]').click();
    
                        function TwitterIsPageLoadComplete() {
                            if (document.querySelectorAll('[type=checkbox]').length == 2) {
                                return true;
                            }
                            return false;
                        }
    
                        function triggerDoFix() {
                            if (TwitterIsPageLoadComplete()) {
                                check_box = document.querySelector('[type=checkbox]');
                                setTimeout(function(){
                                    clickCheckBox(check_box);
                                    setTimeout(function(){
                                        clickBackButton();
                                        waitForPrivacyAndSafetyPage();
                                    }, 200);
                                }, 200);
                            }
                            else {
                                setTimeout(triggerDoFix, 200);
                            }
                        }
                        triggerDoFix();
                    }
                    break;
                case '13':
                    {
                        var check_box = null;
                        params = 'Let others find me by my phone number';
                        document.querySelector('a[href="/settings/contacts"]').click();
    
                        function TwitterIsPageLoadComplete() {
                            if (document.querySelectorAll('[type=checkbox]').length == 2) {
                                return true;
                            }
                            return false;
                        }
    
                        function triggerDoFix() {
                            if (TwitterIsPageLoadComplete()) {
                                check_box = document.querySelectorAll('[type=checkbox]')[1];
                                setTimeout(function(){
                                    clickCheckBox(check_box);
                                    setTimeout(function(){
                                        clickBackButton();
                                        waitForPrivacyAndSafetyPage();
                                    },200);
                                },200);
                            }
                            else {
                                setTimeout(triggerDoFix, 200);
                            }
                        }
                        triggerDoFix();
                    }
                    break;
                case '14':
                    {
                        var check_box = null;
                        params = 'Add a location to my Tweets';
                        document.querySelector('a[href="/settings/location_information"]').click();
    
                        function TwitterIsPageLoadComplete() {
                            if (document.querySelectorAll('[type=checkbox]').length == 1) {
                                return true;
                            }
                            return false;
                        }
    
                        function triggerDoFix() {
                            if (TwitterIsPageLoadComplete()) {
                                setTimeout(() => {
                                    document.querySelector('a[href="/settings/location"]').click();
        
                                    setTimeout(() => {
                                        check_box = document.querySelector('[type=checkbox]');
                                        clickCheckBox(check_box);
                                            
                                        // Click back button twice
                                        clickBackButton();
                                        setTimeout(() => {
                                            clickBackButton();
                                            waitForPrivacyAndSafetyPage();
                                        }, 200);
                                    }, 200)
                                }, 200);
                            }
                            else {
                                setTimeout(triggerDoFix, 200);
                            }
                        }
                        triggerDoFix();
                    }
                    break;               
            }

            new SendDataLogger(this.logHeaderSendData + ' : ' + id, params).getLog();
            return true;
        }catch (e) {
            PSDebug.error(e);
            window.nfinishFlag=1;
            return false;
        }
    };

    FixHelper.prototype.handleResponse = function(id, value, data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + id + ', value : ' + value, data).getLog();

        if (!data) {
            // when click fail
            return null;
        }

        var fixResult = PUtil.cloneObj(TwitterFixResultsTemplate);

        fixResult['id'] = id;
        fixResult['value'] = value;

        if (typeof data === 'string') {
            // this is a string
            fixResult['data'] = data.substring(0, 100);
        }else {
            fixResult['data'] = data;
        }

        return fixResult;
    };

    FixHelper.prototype.getValidFixValueByID = function(id) {
        for (var i = 0; i < Constants.length; i++) {
            if (Constants[i]['ID'] == id) {
                return TwitterScanResultsTemplate[i]['possibleFixValue'];
            }
        }
    };
    FixHelper.prototype.isValidFixValue = function(id, value) {
        var possibleValueList = this.getValidFixValueByID(id);
        for (var i = 0; i < possibleValueList.length; i++) {
            if (value == possibleValueList[i]) {
                return true;
            }
        }
        return false;
    };

    window.TwitterFixHelper = FixHelper;
    window.TwitterFixHelper_Constants = Constants;
})();
