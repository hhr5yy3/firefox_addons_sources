(function() {
    /*
        get_browserHelper could only be used by get_scannerHelper
    */
    window.get_browserHelper = function(browser) {
        switch (browser) {
            case CHROME:
                return new CHROME_BrowserHelper();
            case FIREFOX:
                return new FIREFOX_BrowserHelper();
            case INTERNET_EXPLORER:
                return new INTERNET_EXPLORER_BrowserHelper();
        }
        return new BrowserHelper();
    };
    
    var BrowserHelper = function(Website) {
        BaseScannerHelper.call(this);
        
        var that = this;
        this.openNewTabWithURL = function(URL) {
            SendRequestToBackground_Website(null, null, 'login', 'ContentPage_Background', null, null, URL, true, false);
        };        
        
        this.open_help_link = function(helpID){
            SendRequestToBackground_openFaqPage("ALL", helpID);
            
            /*
                DCA --> lstHelpUsageInfo
            */
            DCA_UTIL.lstHelpUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser],
                helpID,
                1
            );
        }
        
        this.alertMessageInTabContent_titaniumNotExist = function() {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                title : that.LAUNCH_TI_FIRST
            }));
            
            /*
                DCA --> lstErrorPageUsageInfo
            */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser],
                DCA_CONSTANTS.ERROR_ID.BROWSER_TITANIUM_NOT_EXIST,
                1
            );
        }
        
        this.alertMessageInTabContent_IEVersionLow = function() {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent({
                title : GetPSL10NString('ERROR_IE_VERSION_TOO_LOW'),
                button_content : GetPSL10NString('ALERT_TRY_AGAIN_BUTTON'),
                callback : function() {
                    that.ForceScan();
                }
            }));
            
            /*
                DCA --> lstErrorPageUsageInfo
            */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser],
                DCA_CONSTANTS.ERROR_ID.BROWSER_IE_VERSION_LOW,
                1
            );
        }
        
        this.alertMessageInTabContent_defaultError = function() {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent_titleLink({
                title : {
                    wording: that.DEFAULT_ERROR_TITLE,
                    learnMore: that.DEFAULT_ERROR_LEARN_MORE,
                    // TBD
                    link_clickEvent: function(){
                        that.open_help_link(DCA_CONSTANTS.HELP_ID.BPS_SOMETHING_WRONG);
                    }
                },
                button_content : GetPSL10NString('ALERT_TRY_AGAIN_BUTTON'),
                callback : function() {
                    that.ForceScan();
                }
            }));
            
            /*
                DCA --> lstErrorPageUsageInfo
            */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser],
                DCA_CONSTANTS.ERROR_ID.BROWSER_DEFAULT_ERROR,
                1
            );
        }
        
        this.alertMessageInTabContent_ChromeAccountLoggedIn = function() {
            var that = this;
            that.alertMessageInTabContent(that.ConstructAlertMessageInContent_titleLink({
                title : {
                    wording: GetPSL10NString('ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE'),
                    learnMore: GetPSL10NString('ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE'),
                    // TBD
                    link_clickEvent: function(){
                        that.open_help_link(DCA_CONSTANTS.HELP_ID.GOOGLE_ACCOUNT_LOGGED_IN);
                    }
                }
            }));
            
            /*
                DCA --> lstErrorPageUsageInfo
            */
            DCA_UTIL.lstErrorPageUsageInfo(
                DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser],
                DCA_CONSTANTS.ERROR_ID.BROWSER_CHROME_ACCOUNT_LOGGED_IN,
                1
            );
        }
        
        this.fixAllPopupClickEvent = function(){
            var selectedSite = TMExt_$('#tabs .selected').attr('siteorbrowsername');

            // send ubm
            window.browser.runtime.sendMessage({
                action: "feedbackUBM", 
                params: {
                    event: "PSLocalPage_" + selectedSite + "_AlertPopup_Fix_Click",
                    value: 1
                }
            });

            var list_toFix = [];// match by title.
            var li_list = that.contentDom.find('.overlay_quickFix_content_ul li:visible');

            for (var i = 0; i < li_list.length; i++) {
                var settingJSON = TMExt_$.parseJSON(li_list.eq(i).find('.Setting_display_none').text());
                list_toFix.push({
                    'Browser' : that.Browser,
                    'id' : settingJSON['ID'],
                    'fix_to' : settingJSON['Suggestion'],
                    'FixRelatedData' : settingJSON['FixRelatedData'][settingJSON['Suggestion']]
                });
            }

            that.removeMessageOverTabContent();
            that.alertMessageOverTabContent_loading()
            that.UI_FixAllSetting(list_toFix)
        }

        this.alertMessageOverTabContent_confirmRestart = function(list, callback, action){
            var that = this;
            if(action.restart){
                action.title = that.RESTART_TITLE;
                action.button_do = GetPSL10NString('ALERT_RESTART_NOW');
                action.button_cancel = GetPSL10NString('OVERLAY_CANCEL');
            }else if(action.stop){
                action.title = that.STOP_TITLE;
                action.button_do = GetPSL10NString('ALERT_APPLY_CLOSE_BUTTON');
                action.button_cancel = GetPSL10NString('OVERLAY_CANCEL');
            }
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton' : true,
                'closeEvent' : that.removeMessageOverTabContent,
                'title' : action.title,
                'buttons' : [{
                    'title' : action.button_do,
                    'callback' : function(){  
                        that.removeMessageOverTabContent();
                        that.alertMessageOverTabContent_loading();                
                        callback(list);
                    }
                }, {
                    'title' : action.button_cancel,
                    'callback' : function(){  
                        that.removeMessageOverTabContent();
                    }
                }]
            }));
        }
        
        this.alertMessageOverTabContent_confirmRestartLater = function(afterConfirmRestart){
            var that = this;
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton' : true,
                'closeEvent' : function(){
                    that.ForceScan();
                },
                'title' : that.RESTART_LATER_OR_NOT_TITLE,
                'buttons' : [{
                    'title' : that.RESTART_NOW_BUTTON,
                    'callback' : function(){  
                        that.removeMessageOverTabContent();
                        that.alertMessageOverTabContent_loading();                
                        afterConfirmRestart();
                    }
                }, {
                    'title' : that.RESTART_LATER_BUTTON,
                    'callback' : function(){  
                        that.ForceScan();
                    }
                }]
            }));
        }
        
        this.alertMessageOverTabContent_confirmShutdownLater = function(afterConfirmShutdown){
            var that = this;
            that.alertMessageOverTabContent(ConstructAlertMessageOverContent({
                'closeButton' : true,
                'closeEvent' : function(){
                    that.ForceScan();
                },
                'title' : that.CLOSE_LATER_OR_NOT_TITLE,
                'buttons' : [{
                    'title' : that.CLOSE_NOW_BUTTON,
                    'callback' : function(){  
                        that.removeMessageOverTabContent();
                        that.alertMessageOverTabContent_loading();                
                        afterConfirmShutdown();
                    }
                }, {
                    'title' : that.CLOSE_LATER_BUTTON,
                    'callback' : function(){  
                        that.ForceScan();
                    }
                }]
            }));
        }
        
        this.isBrowsingRunning = function(msg){
            var that = this;
            var STATUS = {
                "None"             : 0,
                "NotInstall"     : 1,
                "InstallNotRun" : 2,
                "Running"        : 3
            }
            
            var targetBrowser = null;
            TMExt_$.each(msg.dataOut.ret_value, function(index, item){
                if(item.browser === that.Browser){
                    targetBrowser = item;
                    return false;
                }
            })
            
            if(targetBrowser && targetBrowser.status === STATUS["Running"]){
                return true;
            }
            
            return false;
        }
        
        this.isFixingCurrentBrowser = function(){
            var fix_browser = this.Browser;
            var current_browser = null;
            
            if(PUtil.checkBrowser.IsIE()){
                current_browser = INTERNET_EXPLORER;
            }
            
            if(PUtil.checkBrowser.IsChrome()){
                current_browser = CHROME;
            }
            
            if(PUtil.checkBrowser.IsFirefox()){
                current_browser = FIREFOX;
            }
            
            return fix_browser === current_browser;    
        }
        
        this.UI_FixAllSetting = function(list) {
            var that = this;
            // check whether this browser is running
            that.checkBrowserStatus(function(msg){
                if(that.isBrowsingRunning(msg)){
                    /*
                        is running. Different Browsers have different behaviors.
                        For Chrome, we will show a restart confirm dialog first as Chrome needs to restart first.
                        For Firefox/IE, settings can be changed without browser close. But the settings will take effect after restart.
                    */
                    
                    return that.fixWhenBrowserRunning(list);
                }else{
                    // not running. fix directly
                    that.removeMessageOverTabContent();
                    that.alertMessageOverTabContent_loading();    
                    that.fix(list, null, function(){
                        that.ForceScan();
                    });
                    return;
                }
            })
        }
        
        this.ConstructSaveChangesWrapper = function() {
            var div = TMExt_$('<div/>', {
                'class' : 'changesMade_wrapper'
            });
            div.append(that.ConstructSaveChangesArea());
            return div;
        }

        this.ConstructSaveChangesArea = function() {
            // header
            var div = TMExt_$('<div/>', {
                'class' : 'changesMade_area'
            });
            
            var changesMade_hitArea = TMExt_$('<div/>', {
                'class' : 'changesMade_area_hitArea'
            });
    
            changesMade_hitArea.css("marginTop", "8px")
            changesMade_hitArea.append(TMExt_$('<span/>', {
                'class' : 'changesMade_area_changesMade_wording',
                text : GetPSL10NString('SAVE_CHANGES_CHANGES_MADE')
            })).append(TMExt_$('<span/>', {
                'class' : 'changesMade_area_changesMade_number',
                text : '0'
            }));
    
            var saveChanges = TMExt_$('<button/>', {
                'class' : 'btn_silver changesMade_area_saveChanges',
                text : GetPSL10NString('SAVE_CHANGES_BUTTON_TITLE')
            });
            
            div.append(saveChanges).append(changesMade_hitArea);

            saveChanges.click(function() {
                ToolTipHelper.HideTooltip();
                that.alertMessageOverTabContent_loading()
                
                var topDom = that.contentDom;
                var setting_div_list = topDom.find('.privacy_item_content');
                var list_toFix = [];
                for (var i = 0; i < setting_div_list.length; i++) {
                    // display each setting
                    var jsonSetting = TMExt_$.parseJSON(setting_div_list.eq(i).find('.Setting_display_none').text());
                    var indexUserSelected = setting_div_list.eq(i).find('.current_setting_display_none').text();
                    if (jsonSetting['Current'] != indexUserSelected) {
                        list_toFix.push({
                            'Browser' : that.Browser,
                            'id' : jsonSetting['ID'],
                            'fix_to' : indexUserSelected,
                            'FixRelatedData' : jsonSetting['FixRelatedData'][indexUserSelected]
                        });
                    }
                }
    
                that.UI_FixAllSetting(list_toFix);
            });
            return div;
        };

        this.ConstructContentFromResponse = function(msg) {
            var that = this;
            var div_scan_result_area = TMExt_$('<div class="scan_result_main"/>');
            
            // test code
            var test_area = TMExt_$('<div/>', {
                text : JSON.stringify(msg),
                style : "display:none"
            });
            
            div_scan_result_area.append(test_area);
            // return div_scan_result_area;
            
            // test code end
            
            var dataIn = msg.dataIn;
            var dataOut = msg.dataOut;
            
            var browser = dataIn.browser;
            var ret_value = dataOut.ret_value;            
    
            var count = GetHowManyConcerns(ret_value);
            var response_list = that.FilterListByCategory(ret_value);
    
            if (count == 0) {
                var div_have_no_concerns = that.ConstructHaveNoConcerns();
                div_scan_result_area.append(div_have_no_concerns)
                return div_scan_result_area;
            }
            
            /*
                div_number_of_concern
            */
            var div_number_of_concern = that.ConstructFixAllArea(count, function(){
                 // send ubm
                 window.browser.runtime.sendMessage({
                    action: "feedbackUBM", 
                    params: {
                        event: "PSLocalPage_" + that.Browser + "_FixAll_Click",
                        value: 1
                    }
                });

                that.alertMessageOverTabContent_fixAll();
                /*
                    DCA --> lstLocalPageUsageInfo --> nFixAllTimes
                */
                DCA_UTIL.lstLocalPageUsageInfo.nFixAllTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser], 1);
            });
            this.contentDom.find('.fix_all_area_wrapper').append(div_number_of_concern);
    
            /*
                div_saveChangesWrapper
            */
            var div_saveChangesWrapper = that.ConstructSaveChangesWrapper();
            div_scan_result_area.append(div_saveChangesWrapper)
            
            /*
                ul_category_list
            */
            var ul_category_list = that.ConstructCategory(response_list);
            div_scan_result_area.append(ul_category_list);
            
            var share_after_scan = that.ConstructShareAfterScan();
            div_scan_result_area.append(share_after_scan);
            
            return div_scan_result_area;
        }
        
        this.ConstructUser = function(data) {
            var that = this;
            var div = TMExt_$('<div/>', {
                'class' : 'user_area'
            });
    
            // name_area
            var div_name_area = TMExt_$('<div/>', {
                'class' : 'div_user'
            });
            
            var head_image_area = TMExt_$('<div/>', {
                'class' : 'div_head_image_area'
            });
            
            var div_head_image = TMExt_$('<div/>', {
                'class' : 'div_head_image ' + that.headerLogo 
            });
            
            head_image_area.append(div_head_image);
            
            var fix_all_area = TMExt_$('<div/>', {
                'class' : 'fix_all_area_wrapper fix_all_area_wrapper_browser'
            });
            
            var header_image = TMExt_$('<div/>', {
                'class' : 'div_head'
            }).append(head_image_area).append(fix_all_area);

            div_name_area.append(header_image);
            
            div.append(div_name_area);
    
            return div;
        };
        
        this.ForceScan = function() {
            var that = this;
            var Browser = that.Browser;
            var tabs_list = that.tablistDom;
            var current_tab = that.tabDom;
            var current_tabContent = that.contentDom;
            var loading = that.get_tabContent_Loading();
            var content = that.get_tabContent_Content();
            
            content.hide();
            loading.show();
            ReUpdateUI_Layout();
    
            // clear the dom then constuct new based on newest result
            content.empty();
            var div_scan_result_area = TMExt_$('<div/>', {
                'class' : 'scanResultArea'
            });
            content.append(div_scan_result_area)
            
            that.UpdateNumberOfConcerns();
            
            // start to scan
            that.scan(ScanAll_Finish) 
    
            function ScanAll_Finish(msg) {
                content.hide();
                
                var div_user = that.ConstructUser();
                div_scan_result_area.append(div_user);
                
                div_scan_result_area.append(that.ConstructContentFromResponse(msg))
                that.showContent();
                
                /*
                    DCA --> lstLocalPageUsageInfo --> nScanTimes
                */
                DCA_UTIL.lstLocalPageUsageInfo.nScanTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[that.Browser], 1);
            }
    
        }
        
        this.WrapScanResult = function(jsonMsg){
            var ori = PUtil.cloneObj(jsonMsg);

            var ori_dataOut = ori.dataOut;
            
            var result = PUtil.cloneObj(jsonMsg);
            
            /*
                The original dataOut is defined by plug in. Need to wrap it so that Local page UI can read it.
            */
            if(result.dataOut.ret_status === 0){
                // return status is ok
                result.dataOut.ret_value = []
                TMExt_$.each(ori_dataOut.ret_value, function(ori_index, ori_item){
                    var wrapped_item = {
                        Category : ori_item.category,
                        Current: ori_item.currentvalue,
                        Desc: GetPSL10NString(ori_item.id + "_DESC"),
                        ID: ori_item.id,
                        PossibleValue: (function(){
                            // get possible 
                            var res = {};
                            TMExt_$.each(ori_item.possiblevalue, function(pv_index, pv_item){
                                res[pv_index] = GetPSL10NString(pv_item.pvindex + "_POSSIBLEVALUE"); 
                            })
                            return res;
                        })(),
                        Risk: ori_item.riskvalue,
                        Suggestion: ori_item.suggestvalue,
                        Title: GetPSL10NString(ori_item.id + "_TITLE"),
                        Browser: ori.dataIn.browser,
                        possibleFixValue: ori_item.possiblefixvalue,
                        // fix related data
                        FixRelatedData : (function(){
                            // get fix_related_data
                            var res = {};
                            TMExt_$.each(ori_item.possiblevalue, function(pv_index, pv_item){
                                res[pv_index] = pv_item.pvdata;
                            })
                            return res;
                        })()
                    }
                    
                    result.dataOut.ret_value.push(wrapped_item);
                })
            }else{
                // return status is not ok. should show error UI based on error code
                result.dataOut.ret_value = []
            }
            
            return result;
        }
            
        this.scan = function(success, error) {
            var that = this;
            // scan all
            SendRequestToBackground_Browser({
                success: function(jsonMsg){
                    var wrappedData = that.WrapScanResult(jsonMsg);
                    
                    switch(wrappedData.dataOut.ret_status){
                        case BPS_RETURN_CODE.OK:
                            return success(wrappedData);
                        case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:
                            // when found titanium is not running
                            return that.alertMessageInTabContent_titaniumNotExist();
                        case BPS_RETURN_CODE.IE_VERSION_LOW:
                            // when found IE version <=7
                            return that.alertMessageInTabContent_IEVersionLow();
                        case BPS_RETURN_CODE.CHROME_ACCOUNT_LOGGED_IN:
                            // when found user has logged in Google/Chrome Account
                            return that.alertMessageInTabContent_ChromeAccountLoggedIn();
                        default:
                            // default: show a wording and online help link here.
                            PSDebug.error("error code: " + wrappedData.dataOut.ret_status);
                            return that.alertMessageInTabContent_defaultError();
                    }
                },
                error: error,
                browser: that.Browser,
                action: 'scan',
                params : []
            });
        };
        
        this.fix = function(list, postaction, success, error){
            var that = this;
            // FixRelatedData
            var params = []
            
            TMExt_$.each(list, function(index, setting){
                params.push({
                    id: setting.id,
                    value: setting.FixRelatedData
                })
            })
            
            /*
                no need to parse fix result as we do not depend on fix result to show UI
                After fix, we will trigger scan again to refresh UI.
            */
            SendRequestToBackground_Browser({
                success: function(jsonMsg){
                    switch(jsonMsg.dataOut.ret_status){
                        case BPS_RETURN_CODE.OK:
                            return success(jsonMsg);
                        case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:
                            // when found titanium is not running
                            return that.alertMessageInTabContent_titaniumNotExist();
                        default:
                            // default: show a wording and online help link here.
                            PSDebug.error("error code: " + jsonMsg.dataOut.ret_status);
                            return that.alertMessageInTabContent_defaultError();
                    }
                },
                error: error,
                browser: that.Browser,
                action: 'fix',
                postaction : postaction || "",
                params : params
            });
        }
        
        this.checkBrowserStatus = function(success, error){            
            SendRequestToBackground_Browser({
                success: function(jsonMsg){
                    switch(jsonMsg.dataOut.ret_status){
                        case BPS_RETURN_CODE.OK:
                            return success(jsonMsg);
                        case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:
                            // when found titanium is not running
                            return that.alertMessageInTabContent_titaniumNotExist();
                        default:
                            // default: show a wording and online help link here.
                            PSDebug.error("error code: " + jsonMsg.dataOut.ret_status);
                            return that.alertMessageInTabContent_defaultError();
                    }
                },
                error: error,
                browser: "ALL_BROWSERS",
                action: 'checkstatus',
                params : []
            });
        }
        
        this.restart = function(success, error){
            var that = this;            
            SendRequestToBackground_Browser({
                success: function(jsonMsg){
                    switch(jsonMsg.dataOut.ret_status){
                        case BPS_RETURN_CODE.OK:
                            return success(jsonMsg);
                        case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:
                            // when found titanium is not running
                            return that.alertMessageInTabContent_titaniumNotExist();
                        default:
                            // default: show a wording and online help link here.
                            PSDebug.error("error code: " + jsonMsg.dataOut.ret_status);
                            return that.alertMessageInTabContent_defaultError();
                    }
                },
                error: error,
                browser: that.Browser,
                action: 'restart',
                params : []
            });
        }
        
        this.shutdown = function(success, error){
            var that = this;            
            SendRequestToBackground_Browser({
                success: function(jsonMsg){
                    switch(jsonMsg.dataOut.ret_status){
                        case BPS_RETURN_CODE.OK:
                            return success(jsonMsg);
                        case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:
                            // when found titanium is not running
                            return that.alertMessageInTabContent_titaniumNotExist();
                        default:
                            // default: show a wording and online help link here.
                            PSDebug.error("error code: " + jsonMsg.dataOut.ret_status);
                            return that.alertMessageInTabContent_defaultError();
                    }
                },
                error: error,
                browser: that.Browser,
                action: 'shutdown',
                params : []
            });
        }
        
        this.fixWhenBrowserRunning = function(list){
            // related Browser should implement this function
            // this function should not be called.
            return true;
        }
        
        this.fixWhenBrowserRunning_restartFirst = function(list){
            var that = this;
            
            var action = {
                // restart or stop
                restart: false,
                stop: false
            }; 
            
            if(that.isFixingCurrentBrowser()){
                // if is fixing current browser, show restart the browser dialog
                action.restart = true;
            }else{
                // if is fixing another browser, show close the browser dialog
                action.stop = true;    
            }
            
            var userConfirmCallback = function(){
                // based on restart or close, do different work
                if(action.restart){
                    // send fix command with restart postaction
                    that.fix(list, "restart", function(){
                        that.ForceScan();
                    });
                }else if(action.stop){
                    /*
                        send fix command directly. Backend will force close Chrome to finish fixing.
                        no need to add close postaction
                    */
                    that.fix(list, null, function(){
                        that.ForceScan();
                    });
                }
            }
            
            return that.alertMessageOverTabContent_confirmRestart(list, userConfirmCallback, action);
        }
        
        this.fixWhenBrowserRunning_fixFirst = function(list){
            var that = this;
            
            /*
                step 1: 
                    send fix command without postaction
                step 2:
                    pop up dialog to let user choose (restart now or later)/(close now or later)
                step 3:
                    do action user had chose                    
            */
            
            var afterFixCommand = function(){
                if(that.isFixingCurrentBrowser()){
                    // if is fixing current browser, show restart the browser dialog
                    var afterConfirmRestart = function(){
                        that.restart(function(){
                            that.ForceScan();
                        });
                    }
                    that.alertMessageOverTabContent_confirmRestartLater(afterConfirmRestart);
                }else{
                    // if is fixing another browser, show shutdown the browser dialog
                    var afterConfirmShutdown = function(){
                        that.shutdown(function(){
                            that.ForceScan();
                        });
                    }
                    that.alertMessageOverTabContent_confirmShutdownLater(afterConfirmShutdown);
                }
            }
            
            that.fix(list, null, afterFixCommand);
        }
        
        this.RESTART_NOW_BUTTON = GetPSL10NString('ALERT_RESTART_NOW');
        this.RESTART_LATER_BUTTON = GetPSL10NString('ALERT_RESTART_LATER');
        
        this.CLOSE_NOW_BUTTON = GetPSL10NString('ALERT_CLOSE_NOW');
        this.CLOSE_LATER_BUTTON = GetPSL10NString('ALERT_CLOSE_LATER');
        
        /*
            only for QA use. This API could be used to reset all privacy settings to dangerous
        */
        this.getDangerousSettingList = function(msg){
            var that = this;
            // possibleFixValue
            var patternList = msg.dataOut.ret_value;
            
            var list_toFix = [];// match by title.

            for (var i = 0; i < patternList.length; i++) {
                var settingJSON = patternList[i];
                
                // get fix_to index
                var return_risk = null;

                TMExt_$.each(settingJSON.Risk, function(risk_index, risk_value){
                    if(TMExt_$.inArray(risk_value, settingJSON.possibleFixValue) !== -1){
                        return_risk = risk_value;
                        return false;
                    }
                });
                
                if(return_risk !== null){
                    list_toFix.push({
                        'Browser' : that.Browser,
                        'id' : settingJSON['ID'],
                        'fix_to' : return_risk,
                        'FixRelatedData' : settingJSON['FixRelatedData'][return_risk]
                    });    
                }
            }
            
            return list_toFix;
        }
        
        /*
            only for QA use. This API could be used to reset all privacy settings to dangerous
        */
        this.resetAllSettingToDangerous = function(){
            // scan first to get pattern
            var that = this;
            that.scan(function(msg){
                // use pattern included in return value to fix
                
                var fix_array = that.getDangerousSettingList(msg);
                that.UI_FixAllSetting(fix_array);
                
            });
        }
        
        this.DEFAULT_ERROR_TITLE = GetPSL10NString('ERROR_DEFAULT_TITLE');
        this.DEFAULT_ERROR_LEARN_MORE = GetPSL10NString('ERROR_DEFAULT_LEARN_MORE');
        
        this.SHARE_TITLE = GetPSL10NString('SHARE_TOOTHERS_BROWSER_TITLE');
    };
    
    
    /*
     CHROME_BrowserHelper
     */
    var CHROME_BrowserHelper = function() {
        BrowserHelper.call(this);
        
        var that = this;
        this.Browser = CHROME;
        this.tabDom = TMExt_$('#tabs_chrome');
        this.contentDom = TMExt_$('#tabsContent_chrome');
        
        this.RESTART_TITLE = GetPSL10NString('CHROME_RESTART_TITLE');
        this.STOP_TITLE = GetPSL10NString('CHROME_STOP_TITLE');
        
        this.RESTART_LATER_OR_NOT_TITLE = GetPSL10NString('RESTART_CHROME_LATER_OR_NOT_TITLE');
        this.CLOSE_LATER_OR_NOT_TITLE = GetPSL10NString('CLOSE_CHROME_LATER_OR_NOT_TITLE');
        
        this.LAUNCH_TI_FIRST = GetPSL10NString('ERROR_CHROME_LAUNCH_TI_FIRST');
        
        this.fixWhenBrowserRunning = function(list){
            this.fixWhenBrowserRunning_restartFirst(list);
        }
        
        this.alertLogoClassName = "alert_logo_CHROME";
        
        this.headerLogo = "header_logo_CHROME";
    };
    
    
    /*
     FIREFOX_BrowserHelper
     */
    var FIREFOX_BrowserHelper = function() {
        BrowserHelper.call(this);

        var that = this;
        this.Browser = FIREFOX;
        this.tabDom = TMExt_$('#tabs_firefox');
        this.contentDom = TMExt_$('#tabsContent_firefox');

        this.RESTART_TITLE = GetPSL10NString('FIREFOX_RESTART_TITLE');
        this.STOP_TITLE = GetPSL10NString('FIREFOX_STOP_TITLE');
        
        this.RESTART_LATER_OR_NOT_TITLE = GetPSL10NString('RESTART_FIREFOX_LATER_OR_NOT_TITLE');
        this.CLOSE_LATER_OR_NOT_TITLE = GetPSL10NString('CLOSE_FIREFOX_LATER_OR_NOT_TITLE');
        
        this.LAUNCH_TI_FIRST = GetPSL10NString('ERROR_FIREFOX_LAUNCH_TI_FIRST');
        
        this.fixWhenBrowserRunning = function(list){
            this.fixWhenBrowserRunning_restartFirst(list);
        }
        
        this.alertLogoClassName = "alert_logo_FIREFOX";
        
        this.headerLogo = "header_logo_FIREFOX";
    };
    
    
    /*
     INTERNET_EXPLORER_BrowserHelper
     */
    var INTERNET_EXPLORER_BrowserHelper = function() {
        BrowserHelper.call(this);

        var that = this;
        this.Browser = INTERNET_EXPLORER;
        this.tabDom = TMExt_$('#tabs_internet_explorer');
        this.contentDom = TMExt_$('#tabsContent_internet_explorer');

        this.RESTART_TITLE = GetPSL10NString('INTERNET_EXPLORER_RESTART_TITLE');
        this.STOP_TITLE = GetPSL10NString('INTERNET_EXPLORER_STOP_TITLE');
        
        this.RESTART_LATER_OR_NOT_TITLE = GetPSL10NString('RESTART_IE_LATER_OR_NOT_TITLE');       
        this.CLOSE_LATER_OR_NOT_TITLE = GetPSL10NString('CLOSE_IE_LATER_OR_NOT_TITLE');
        
        this.LAUNCH_TI_FIRST = GetPSL10NString('ERROR_IE_LAUNCH_TI_FIRST');
        
        this.fixWhenBrowserRunning = function(list){
            this.fixWhenBrowserRunning_fixFirst(list);
        }
        
        this.alertLogoClassName = "alert_logo_INTERNET_EXPLORER";
        
        this.headerLogo = "header_logo_INTERNET_EXPLORER";
    };
    
})();
