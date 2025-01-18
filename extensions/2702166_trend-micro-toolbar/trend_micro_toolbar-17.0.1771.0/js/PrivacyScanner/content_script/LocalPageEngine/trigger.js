(function() {

    var InitSettings = function(){
        if(window.UserLoginPage) {
            window.UserLoginPage.TWITTER = null;
            window.UserLoginPage.FACEBOOK = null;
            window.UserLoginPage.GOOGLEPLUS = null;
            window.UserLoginPage.LINKEDIN = null;
        }
    };

    var RegisterLocalPage = function() {
        const msg = {
            'action': TB_ACTIONS.PS_REGISTER_LOCAL_PAGE,
        };
        window.browser.runtime.sendMessage(msg, (ret) => {
            if (!ret) {
                // close current page if failed.
                window.close();
            }
        });
    }

    var SyncPrivacyScannerSettings = function() {
        try {
            // Get settings
            const msg = {
                action: TB_ACTIONS.PS_GET_SETTINGS,
                source: 'local',
                function_id: 'NotUsed',
                dataIn: {
                    setting_items: [{
                        key: SettingConstants.is_first_savechange,
                        value: 0
                    }, {
                        key: SettingConstants.is_first_fixtwitter,
                        value: 0
                    }, {
                        key: SettingConstants.is_first_fixlinkedin,
                        value: 0
                    }, {
                        key: SettingConstants.is_console_log_enabled,
                        value: 0
                    }, {
                        key: SettingConstants.is_file_log_enabled,
                        value: 0
                    }]
                },
                dataOut: {
                    setting_items: null
                }
            }
            window.browser.runtime.sendMessage(msg, (response) => {
                let setting_items = response.dataOut.setting_items;
                for (let i in setting_items) {
                    let item = setting_items[i];
                    let key = item.key;
                    let value = item.value;
                    window.PrivacyScannerGlobalSettings[key] = value;
                }
            });
        } catch (e) {
            console.log('[PS][Local] SyncPrivacyScannerSettings: e = ' + e);
        }
    };

    var Trigger = function() {
        // send ubm
        window.browser.runtime.sendMessage({
            action: "feedbackUBM", 
            params: {
                event: "PSLocalPage_PageView",
                value: 1
            }
        });

        // send ubm
        window.browser.runtime.sendMessage({
            action: "feedbackUBM", 
            params: {
                event: "PSLocalPage_FACEBOOK_Click",
                value: 1
            }
        });

        InitSettings();
        Initialize_UI();

        // Register local page id to service worker
        RegisterLocalPage();
        window.browser.runtime.onMessage.addListener((request) => {
            if (!request || request.action !== TB_ACTIONS.PS_LOCAL_PAGE_MESSAGE) {
                return;
            }
            
            PSLocalReceiveMessage(request);
        });
        
        /*
         Get settings
         */
        SyncPrivacyScannerSettings();
        
        /*
            set focus
        */
        var _scannerHelper = get_scannerHelper(OptionSetting.getFocusOn());
        _scannerHelper.clickTabUI();
        
        var _getScanSitesAndBrowsersList = OptionSetting.getScanSiteOrBrowsers();
        for (var i = 0; i < _getScanSitesAndBrowsersList.length; i++) {
            var SiteOrBrowser = _getScanSitesAndBrowsersList[i];
            get_scannerHelper(SiteOrBrowser).ForceScan();
            
            IS_SCANING[SiteOrBrowser] = true;
        }
        
        /*
            set forceScan for some sites or browsers
        */
        TMExt_$('.tabs_li').click(function() {
            var index = TMExt_$('.tabs_li').index(TMExt_$(this));
            
            var SiteOrBrowser = TMExt_$(this).attr("SiteOrBrowserName");
            var _scannerHelper = get_scannerHelper(SiteOrBrowser);
            _scannerHelper.clickTabUI();

            if (_scannerHelper.HasNoContent()) {
                _scannerHelper.ForceScan();
                
                IS_SCANING[SiteOrBrowser] = true;
            }

            // send ubm
            window.browser.runtime.sendMessage({
                action: "feedbackUBM", 
                params: {
                    event: "PSLocalPage_" + SiteOrBrowser + "_Click",
                    value: 1
                }
            });
        });

        /*
         resize listener
         */
        TMExt_$(window).resize(function() {
            ReUpdateUI_Layout()
        });
        
        /*
            DCA --> lstBrowserUsageInfo
        */
        var browser_id = LocalUtil.ParamFromURL.BrowserID();
        var browser_version = LocalUtil.ParamFromURL.BrowserVersion();
        
        if (browser_id && browser_version) {
            DCA_UTIL.lstBrowserUsageInfo(parseInt(browser_id), browser_version, 1);
        }
        
        /*
            DCA --> lstLocalPageUsageInfo --> nPromotionTimes
        */
        var tabList = LocalUtil.ParamFromURL.GetTabList();
        if (tabList && tabList["FROM"]) {
            DCA_UTIL.lstLocalPageUsageInfo.nPromotionTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[tabList["FROM"]], 1);
        }
        
        /*
            DCA --> lstPSUsageInfo
        */
        // website info
        if (tabList && tabList["PSUsageInfo"]) {
            DCA_UTIL.lstPSUsageInfo(DCA_CONSTANTS.PS_USAGE_WEBSITE_OR_BROWSER_ID[tabList["PSUsageInfo"]], 1);
        } else {
            // browser info
            if(PUtil.checkBrowser.IsIE()){
                DCA_UTIL.lstPSUsageInfo(1, 1);
            }else if(PUtil.checkBrowser.IsFirefox()){
                DCA_UTIL.lstPSUsageInfo(3, 1);
            }else if(PUtil.checkBrowser.IsChrome()){
                DCA_UTIL.lstPSUsageInfo(5, 1);
            }   
        }
    };
    var TriggerNoPluginErro = function() {
        Initialize_UI();
        
        /*
            set focus
        */
        var SiteOrBrowser = OptionSetting.getFocusOn();
        var _scannerHelper = get_scannerHelper(SiteOrBrowser);
        _scannerHelper.clickTabUI();
        
        
        /*
            set forceScan for some sites or browsers
        */
        TMExt_$('.tabs_li').click(function() {
            var index = TMExt_$('.tabs_li').index(TMExt_$(this));
            
            var SiteOrBrowser = TMExt_$(this).attr("SiteOrBrowserName");
            var _scannerHelper = get_scannerHelper(SiteOrBrowser);
            _scannerHelper.clickTabUI();
        });

        /*
         resize listener
         */
        TMExt_$(window).resize(function() {
            ReUpdateUI_Layout()
        });
        
        for (var i=0; i < AllSiteAndBrowser.length; i++) {
            get_scannerHelper(AllSiteAndBrowser[i]).alertMessageInTabContent_enableToolbar();
        };
    };

    TMExt_$(document).ready(function() {      
        if(PUtil.checkBrowser.IsIELowerThan_8()){
            TMExt_$('.tabsAndTabContents').hide();
            TMExt_$('.IE_LowVersion').show();
            return;
        }else{
            TMExt_$('.tabsAndTabContents').show();
            TMExt_$('.IE_LowVersion').hide();
        }
        var tryTimes = 0;
        var TotalTryTimes = 5;
        var TriggerForIE = function() {
            var oIEObject = PUtil.GetIEObject(false);
            if (!oIEObject && tryTimes >= 3) {
                window.PSUseActiveXObject = true;
                oIEObject = PUtil.GetIEObject(true);
            }
            if (oIEObject) {
                Trigger();
            } else {
                if (tryTimes++ < TotalTryTimes) {
                    if ( typeof (console) != 'undefined' && typeof (console.log) != 'undefined') {
                        console.log('Try ' + tryTimes + '/' + TotalTryTimes + ' times');
                    }
                    setTimeout(TriggerForIE, 1500);
                } else {
                    TriggerNoPluginErro();
                }
            }
        };
        if (PUtil.checkBrowser.IsIE()) {
            TriggerForIE();
        } else {
            Trigger();
        }
    });
})();

