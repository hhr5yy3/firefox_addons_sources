/**
 * Created by wei_huang on 2018/2/26.
 */

window.browser = (function () {
    return window.msBrowser ||
        window.chrome ||
        window.browser;
}());

const init = () => {
    window.browser.storage.local.get({
        titanium: {},
        license: {},
        plid: '',
        // wtp
        wtp_status: null,
        wtp_pagerating_status: null,
        wtp_pagerating_ui_status: null,
        wtp_manualrating_status: null,
        wtp_manualrating_ui_status: null,
        // fb
        fb_support_status: null,
        // ps
        ps_status: null,
        ps_support_status: null,
        ps_ui_status: null,
        browser_status: null,
        // pg
        pg_support_status: null,
        pg_ui_status: null
    }, (data) => {
        var isFirefox = function(){
            if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(navigator.userAgent)) {
                return true;
            }
            
            return false;
        };

        var GetChromeVersion = function(){
            var version = 0;
            try {
                var ua = navigator.userAgent.toLowerCase();
                var temp = ua.indexOf("chrome");
                var chromeVersion = ua.substring(temp);
                temp = chromeVersion.indexOf(" safari");
                chromeVersion = chromeVersion.substring(7,temp);
                var chromeVer = chromeVersion.split(".");
                version = chromeVer[0] + '.' + chromeVer[1] + '.' + chromeVer[2] + '.' + chromeVer[3];
            }catch(e){
            }
            return version;
        };

        var GetFFVersion = function(){
            if (/Firefox\/(\S+)/.test(navigator.userAgent)) {
                var ffVersion = RegExp["$1"];
                //return parseFloat(strFFVersion);
                return ffVersion;
            }
    
            return 0;
        };

        var fb_disable= function(){
            const { host } = window.location;
            const plid = data.plid;
            const isJPYahooMail = (host === 'mail.yahoo.co.jp') || (plid === 'CarbonNE-JP') || plid === 'CarbonC-JP' || (getCurrentLocale() === 'ja-jp' && plid.includes('Toolbar'));
            const fb_disable = isJPYahooMail ? 'fraud_buster_disabled_JPyahooMai' : 'fraud_buster_disabled' ;
            return fb_disable;
        };

        var current_url;
        var initMenu = function () {
            window.browser.tabs.query({active: true, currentWindow: true}, function(tabs) {   
                current_url = tabs[0].url;
                window.browser.runtime.sendMessage({action: TB_ACTIONS.GET_BANKING_LIST}, (bankingData) => {
                    var isBanking = 0;		
                    for (i=0; i< bankingData.bankingList.length; i++) {
                        if(current_url.indexOf(bankingData.bankingList[i]) > -1 && current_url.indexOf('=' + bankingData.bankingList[i]) == -1){
                            isBanking = 1;								
                            break
                        }
                    }
            
                    if(data.fb_support_status) {
                        // if web site is web mail, then popup get identity from content.
                        if (current_url.indexOf('mail.google.com/mail') > -1 || current_url.indexOf('outlook.live.com/mail') > -1 || current_url.indexOf('mail.yahoo.co.jp') > -1 || current_url.indexOf('mail.yahoo.com')) {
                            // register onMessage for fraud buster
                            window.browser.runtime.onMessage.addListener(function(request, sender, response) {
                                //console.log(`[DEV]background sendMessage receive: ${JSON.stringify(request)}`);
                                var result = request.result; 
                                switch (request.action) {
                                case TB_ACTIONS.GET_USER_FRAUD_BUSTER_SETTING:
                                    if (result.FB_enabled === 1) {
                                        TMExt_$('#fraudbuster').removeClass('stop').removeClass('disabled').addClass("checked");
                                    } else if(result.FB_enabled === 0) {
                                        TMExt_$('#fraudbuster').removeClass('stop').removeClass('disabled').remove("checked");
                                    }
                                    break;
                                }
                                TMExt_$('.msgTooltip').remove();
                            });
            
                            var refreshIntervalId = window.setInterval(function() {
                                window.browser.tabs.sendMessage(tabs[0].id, {
                                    action: TB_ACTIONS.GET_FRAUD_BUSTER_IDENTITY
                                }, function(id) {
                                    if (id) {
                                        window.clearInterval(refreshIntervalId);
                                        window.browser.runtime.sendMessage({
                                            action: TB_ACTIONS.GET_USER_FRAUD_BUSTER_SETTING,
                                            params: {
                                                unique_account_id: id,
                                                in_out: {
                                                    comefrom: 'popup'
                                                }
                                            }
                                        });
                                    }
                                });
                            }, 100);
                        }
                    }
            
                    var menuitems_webrating = ''  
                        +'<div id=\"pagerating\" name=\"pagerating\" class=\"item checked\" title=\"_not_localized\" i18n-values=\"title:pagerating\">       '
                        +'  <div class=\"icon\"></div>                                                                                                       '
                        +'  <span i18n-content=\"pagerating\">_not_localized</span>                                                                          '
                        +'</div>                                                                                                                             '
                        +'<div id=\"umsrating\" name=\"umsrating\" class=\"item checked\" title=\"_not_localized\" i18n-values=\"title:umsrating\">          '
                        +'  <div class=\"icon\"></div>                                                                                                       '
                        +'  <span i18n-content=\"umsrating\">_not_localized</span>                                                                           '
                        +'</div>                                                                                                                             ';
            
                    var menuitems_fraudbuster = ''
                        +'<div id=\"fraudbuster\" name=\"fraudbuster\" class=\"item disabled stop\" title=\"_not_localized\" i18n-values=\"title:fraudbuster\"> '
                        +'  <div>                                                                                                                             '
                        +'      <div class=\"icon\"></div>                                                                                                    '
                        +'      <span i18n-content=\"fraudbuster\">_not_localized</span>                                                                      '
                        +'  </div>                                                                                                                            '
                        +'  <div class=\"msgTooltip\">                                                                                                        '
                        +'      <span i18n-content= '+ fb_disable() + '>_not_localized</span>                                                            '
                        +'  </div>                                                                                                                            '
                        +'</div>                                                                                                                              '
                        +'<div class=\"separator\"></div>                                                                                                     ';
            
                    var menuitem_payguard_with_tooltip = ''
                        +'<div id=\"payguard\" name=\"payguard\" class=\"item\" title=\"_not_localized\" i18n-values=\"title:payguard\">                     '
                        +'  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAOElEQVR42mNgGAX0BQ+0DeWAeBcQf4bScqQasBuI/yPh/aQa8BnNgJ90d4Ec1JAvUFp+NGUMBgAAojUx/gLF5YsAAAAASUVORK5CYII="/>'
                        +'  <span i18n-content=\"payguard\">_not_localized</span>                                                                            '
                        +'</div>                                                                                                                             ';
                        
                    var menuitem_PS = ''
                        +'<div id=\"facebookscanner\" name=\"facebookscanner\" class=\"item\" title=\"_not_localized\" i18n-values=\"title:facebookscanner\">'
                        +'  <div class=\"icon\"></div>                                                                                                       '
                        +'  <span i18n-content=\"facebookscanner\">_not_localized</span>                                                                     '
                        +'</div>                                                                                                                             ';
                        
                    var menuitems_PSSettingAndHelp = ''	
                        +'<div class=\"separator\"></div>                                                                                                    '
                        +'<div id=\"setting\" name=\"setting\" class=\"item\" title=\"_not_localized\" i18n-values=\"title:Setting\">                        '
                        +'  <div class=\"icon\"></div>                                                                                                       '
                        +'  <span i18n-content=\"setting\">_not_localized</span>                                                                             '
                        +'</div>                                                                                                                             '
                        +'<div id=\"help\" name=\"help\" class=\"item\" title=\"_not_localized\" i18n-values=\"title:help\">                                 '
                        +'  <div class=\"icon\"></div>                                                                                                       '
                        +'  <span i18n-content=\"help\">_not_localized</span>                                                                                '
                        +'</div>                                                                                                                             ';
                    
                    var menuitem_payguard_without_tooltip = ''
                        +'<div id=\"payguard\" name=\"payguard\" class=\"item\" title=\"_not_localized\" i18n-values=\"title:payguard\">                     '
                        +'  <div class=\"icon\"></div>                                                                                                       '
                        +'  <span i18n-content=\"payguard\">_not_localized</span>                                                                            '
                        +'</div>                                                                                                                             ';
                    
                    if (data.pg_support_status) {
                        if(isBanking == 1) {
                            if(data.fb_support_status)
                                TMExt_$('#menu').append(menuitems_webrating + menuitems_fraudbuster + menuitem_PS + menuitem_payguard_with_tooltip + menuitems_PSSettingAndHelp);
                            else
                                TMExt_$('#menu').append(menuitems_webrating + menuitem_PS + menuitem_payguard_with_tooltip + menuitems_PSSettingAndHelp);
                        }
                        else {
                            if(data.fb_support_status)
                                TMExt_$('#menu').append(menuitems_webrating + menuitems_fraudbuster + menuitem_PS + menuitem_payguard_without_tooltip + menuitems_PSSettingAndHelp);
                            else
                                TMExt_$('#menu').append(menuitems_webrating + menuitem_PS + menuitem_payguard_without_tooltip + menuitems_PSSettingAndHelp);
                        }
                    }
                    else {
                        if(data.fb_support_status)
                            TMExt_$('#menu').append(menuitems_webrating + menuitems_fraudbuster + menuitem_PS + menuitems_PSSettingAndHelp);
                        else
                            TMExt_$('#menu').append(menuitems_webrating + menuitem_PS + menuitems_PSSettingAndHelp);
                    }
                    I18n.process(document);
                    BackGroundFunction();
                });
            });
        }
    
        var BackGroundFunction = function(){
            var _BackGroundFunction = function(){
                if(data.wtp_pagerating_status){
                    TMExt_$('#pagerating').addClass('checked');
                }
                else{
                    TMExt_$('#pagerating').removeClass('checked');
                }
    
                if(data.wtp_manualrating_status){
                    TMExt_$('#umsrating').addClass('checked');
                }
                else{
                    TMExt_$('#umsrating').removeClass('checked');
                }

                if(data.fb_support_status) {
                    var isStop = TMExt_$('#fraudbuster').hasClass('stop');
                    if (isStop) {
                        TMExt_$('#fraudbuster').hover(function() {
                            TMExt_$('.msgTooltip').show();
                        }, function() {
                            TMExt_$('.msgTooltip').hide();
                        });
                    }
                    
                    // add fraud buster click event
                    TMExt_$('#fraudbuster').click(function(){
                        if (TMExt_$('#fraudbuster').hasClass('stop')) return;
                        // send ubm
                        window.browser.runtime.sendMessage({
                            action: "feedbackUBM", 
                            params: {
                                event: "ToolbarPopup_FB_Click",
                                value: 1
                            }
                        });

                        var isEnabled = TMExt_$('#fraudbuster').hasClass('checked');
                        var action = isEnabled ? TB_ACTIONS.DISABLED_FRAUD_BUSTER : TB_ACTIONS.ENABLED_FRAUD_BUSTER;
                        window.browser.tabs.query({active: true, currentWindow: true}, function(tabs) {  
                            window.browser.tabs.sendMessage(tabs[0].id, {
                                action: action
                            });
                        });
                        window.close();
                        return true;
                    });   
                }

                if(data.wtp_pagerating_ui_status) {
                    TMExt_$('#pagerating').removeClass('disabled').click(function(){
                        // send ubm
                        window.browser.runtime.sendMessage({
                            action: "feedbackUBM", 
                            params: {
                                event: "ToolbarPopup_PageRating_Click",
                                value: 1
                            }
                        });

                        window.browser.storage.local.get({
                            wtp_pagerating_status: false
                        }, (storageData) => {
                            window.browser.storage.local.set({
                                wtp_pagerating_status: !storageData.wtp_pagerating_status
                            }, () => {
                                window.close();
                            });
                        });
                        return true;
                    });
                }
                else {
                    TMExt_$('#pagerating').addClass('disabled');
                }

                if(data.wtp_manualrating_ui_status) {
                    TMExt_$('#umsrating').removeClass('disabled').click(function(){
                        // send ubm
                        window.browser.runtime.sendMessage({
                            action: "feedbackUBM", 
                            params: {
                                event: "ToolbarPopup_ManualRating_Click",
                                value: 1
                            }
                        });

                        window.browser.storage.local.get({
                            wtp_manualrating_status: false
                        }, (storageData) => {
                            window.browser.storage.local.set({
                                wtp_manualrating_status: !storageData.wtp_manualrating_status
                            }, () => {
                                window.close();
                            });
                        });
                        return true;
                    });
                } else {
                    TMExt_$('#umsrating').addClass('disabled');
                }

                if (data.ps_support_status) {
                    if (data.ps_status && data.ps_ui_status){
                        TMExt_$('#facebookscanner').removeClass('disabled').click(function(){
                            // send ubm
                            window.browser.runtime.sendMessage({
                                action: "feedbackUBM", 
                                params: {
                                    event: "ToolbarPopup_PS_Click",
                                    value: 1
                                }
                            });

                            var browser_id = '0',
                                browser_version = 0,
                                browser_status = data.browser_status,
                                from = ['TI15', 'BROWSER_TOOLBAR'].join(',');
                            if(isFirefox()) {
                                browser_version = GetFFVersion();
                            }
                            else {
                                browser_version = GetChromeVersion();
                            }
                            url = window.browser.runtime.getURL('js/PrivacyScanner/local_page/index.html?locale=' + getCurrentLocale() + '&browser_id=' + browser_id + '&browser_version=' + browser_version + '&from=' + from + '&status=' + browser_status);
                            console.log(url);
                            window.browser.tabs.query({}, function(tabList){
                                var hasTab = false;
                                for (var i in tabList){
                                    var tab = tabList[i];
                                    console.log(tab.url);
                                    var urlRegExp = new RegExp("local_page/index.html", "i");
                                    if (urlRegExp.test(tab.url)){
                                        window.browser.tabs.update(tab.id, {active:true});
                                        hasTab = true;
                                    }
                                }
    
                                if (!hasTab){
                                    //DCA open tab
                                    var eChrome_click = 4;
                                    // bgPages.getPluginTB().SendPSUsageInfoData(eChrome_click);
    
                                    window.browser.tabs.create({url: url});
                                }
                                window.close();
                            });
                            return true;
                        });
                    }else{
                        TMExt_$('#facebookscanner').addClass('disabled');
                    }
                }else{
                    TMExt_$('#facebookscanner').remove();
                }

                if(!data.license.IsInFreeMode) {
                    TMExt_$('#setting').removeClass('disabled').click(function(){
                        // send ubm
                        window.browser.runtime.sendMessage({
                            action: "feedbackUBM", 
                            params: {
                                event: "ToolbarPopup_Setting_Click",
                                value: 1
                            }
                        });
    
                        window.browser.runtime.sendMessage({
                            action: TB_ACTIONS.OPEN_SETTINGS
                        });
                        window.close();
                        return true;
                    });
                }
                else {
                    TMExt_$('#setting').addClass('disabled');
                }

                TMExt_$('#help').click(function(){
                    // send ubm
                    window.browser.runtime.sendMessage({
                        action: "feedbackUBM", 
                        params: {
                            event: "ToolbarPopup_Help_Click",
                            value: 1
                        }
                    });

                    window.browser.runtime.sendMessage({
                        action: TB_ACTIONS.OPEN_HELP
                    });
                    window.close();
                    return true;
                });
    
                if(data.pg_ui_status) {
                    TMExt_$('#payguard').click(function(){
                        // send ubm
                        window.browser.runtime.sendMessage({
                            action: "feedbackUBM", 
                            params: {
                                event: "ToolbarPopup_PG_Click",
                                value: 1
                            }
                        });
    
                        window.browser.runtime.sendMessage({
                            action: TB_ACTIONS.OPEN_PAYGURAD,
                            url: current_url,
                            addWhiteList: false,
                            addBlackList: false,
                            opendirectly: false,
                            openMenu: true
                        });
                        window.close();
                        return true;
                    });
                }
                else {
                    TMExt_$('#payguard').addClass('disabled');
                }
                
                document.body.style.visibility = "visible";
            };
    
            setTimeout(function(){
                if (!data.titanium.installed) {
                    setTimeout(arguments.callee, CONST_WAIT_BACKGROUND_TIME_OUT);
                } else {
                    _BackGroundFunction();
                }
            }, 0);
        };

        initMenu();
    });
};

TMExt_$(document).ready(() => {
    init();
});
