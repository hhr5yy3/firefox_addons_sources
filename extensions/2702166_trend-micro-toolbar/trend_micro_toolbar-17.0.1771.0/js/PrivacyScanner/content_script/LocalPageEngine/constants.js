(function() {
    /*
        Main Console
    */
    window.MAIN_CONSOLE = "MAIN_CONSOLE";
    
    /*
        SNS site
    */
    window.FACEBOOK = 'FACEBOOK';
    window.TWITTER = 'TWITTER';
    window.GOOGLEPLUS = 'GOOGLEPLUS';
    window.LINKEDIN = 'LINKEDIN';
    
    /*
        Browser
    */
    window.INTERNET_EXPLORER = "INTERNET_EXPLORER";
    window.CHROME = "CHROME";
    window.FIREFOX = "FIREFOX";
    
    
    window.AllSites = [FACEBOOK, TWITTER, GOOGLEPLUS, LINKEDIN];
    window.AllBrowsers = [INTERNET_EXPLORER, CHROME, FIREFOX];
    
    window.AllSiteAndBrowser = (function(){
        var result = [];
        TMExt_$.each(AllSites, function(index, item){
            result.push(item);
        })
        
        TMExt_$.each(AllBrowsers, function(index, item){
            result.push(item);
        })
        return result;
    })();
    
    window.LocalUtil = {
        ParamFromURL : {
            getParam: function(key) {
                var paramsString = document.location.search;
                if ( typeof (paramsString) == "string" && paramsString.length > 0) {
                    paramsString = paramsString.substring(1)
                    var paramsList = paramsString.split('&')
                    for (var i = 0; i < paramsList.length; i++) {
                        var keyAndValue = paramsList[i].split('=')
                        if (keyAndValue[0] == key) {
                            return keyAndValue[1]
                        }
                    };
                }
                return null;
            },
            GetTabList: function() {
                /*
                Reserved Focus    Scan    Show    BuyNow
                0000     0        0       0       0
            
                Focus:  Current tab will be highlighted.
                Scan:   Current tab will do scan action.
                Show:   Current tab will show.
                BuyNow: Current tab will show BuyNow link.
           
                Ex:
                0011: Don't focus, Don't scan, Show current tab,  Show BuyNow,
                0110: Don't focus, Scan,       Show current tab,  Don't show BuyNow
                */
               
                var PS = {
                    TAB_LIST_PATTERN: {
                        ITIS: {
                            BROWSER_TOOLBAR: {
                                DESCRIPTION:  "Scan Facebook/Twitter/LinkedIn, focus on Facebook",
                                PATTERN: {
                                    FACEBOOK:           "1110",
                                    TWITTER:            "0110",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0110",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                }
                            },
                            SNS_FACEBOOK: {
                                DESCRIPTION:  "Scan Facebook, focus on Facebook",
                                PATTERN: {
                                    FACEBOOK:           "1110",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                },
                                FROM: FACEBOOK,
                                PSUsageInfo : FACEBOOK
                            },
                            SNS_TWITTER: {
                                DESCRIPTION:  "Scan Twitter, focus on Twitter",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "1110",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                },
                                FROM: TWITTER,
                                PSUsageInfo : TWITTER
                            },
                            SNS_GOOGLEPLUS: {
                                DESCRIPTION:  "Scan GooglePlus, focus on GooglePlus",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "1110",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                },
                                FROM: GOOGLEPLUS,
                                PSUsageInfo : GOOGLEPLUS
                            },
                            SNS_LINKEDIN: {
                                DESCRIPTION:  "Scan LinkedIn, focus on LinkedIn",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "1110",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                },
                                FROM: LINKEDIN,
                                PSUsageInfo : LINKEDIN
                            }
                        },
                        STORE: {
                            BROWSER_TOOLBAR: {
                                DESCRIPTION:  "Scan GooglePlus, focus on GooglePlus, Facebook/Twitter/LinkedIn show BuyNow",
                                PATTERN: {
                                    FACEBOOK:           "0011",
                                    TWITTER:            "0011",
                                    GOOGLEPLUS:         "1110",
                                    LINKEDIN:           "0011",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                }
                            },
                            SNS_GOOGLEPLUS: {
                                DESCRIPTION:  "Scan GooglePlus, focus on GooglePlus, Facebook/Twitter show BuyNow",
                                PATTERN: {
                                    FACEBOOK:           "0011",
                                    TWITTER:            "0011",
                                    GOOGLEPLUS:         "1110",
                                    LINKEDIN:           "0011",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0000",
                                    CHROME:             "0000"
                                },
                                FROM: GOOGLEPLUS,
                                PSUsageInfo : GOOGLEPLUS
                            }
                        },
                        TI9_OrLater: {
                            MAINCONSOLE_SNS: {
                                DESCRIPTION:  "Scan Facebook/Twitter/LinkedIn/IE/Firefox/Chrome, focus on Facebook",
                                PATTERN: {
                                    FACEBOOK:           "1110",
                                    TWITTER:            "0110",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0110",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                },
                                PSUsageInfo : MAIN_CONSOLE
                            },
                            MAINCONSOLE_BROWSER: {
                                DESCRIPTION:  "Scan Firefox/Chrome, No focus",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                },
                                PSUsageInfo : MAIN_CONSOLE
                            },
                            MAINCONSOLE_CHROME: {
                                DESCRIPTION:  "Scan Firefox/Chrome, focus on Chrome",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "1110"
                                },
                                PSUsageInfo : MAIN_CONSOLE
                            },
                            MAINCONSOLE_FIREFOX: {
                                DESCRIPTION:  "Scan Firefox/Chrome, focus on Firefox",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "1110",
                                    CHROME:             "0110"
                                },
                                PSUsageInfo : MAIN_CONSOLE
                            },
                            BROWSER_TOOLBAR: {
                                DESCRIPTION:  "Scan Facebook/Twitter/LinkedIn/IE/Firefox/Chrome, focus on Facebook",
                                PATTERN: {
                                    FACEBOOK:           "1110",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                }
                            },
                            SNS_FACEBOOK: {
                                DESCRIPTION:  "Scan Facebook/IE/Firefox/Chrome, focus on Facebook",
                                PATTERN: {
                                    FACEBOOK:           "1110",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                },
                                FROM: FACEBOOK,
                                PSUsageInfo : FACEBOOK
                            },
                            SNS_TWITTER: {
                                DESCRIPTION:  "Scan Twitter/IE/Firefox/Chrome, focus on Twitter",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "1110",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                },
                                FROM: TWITTER,
                                PSUsageInfo : TWITTER
                            },
                            SNS_GOOGLEPLUS: {
                                DESCRIPTION:  "Scan GooglePlus/IE/Firefox/Chrome, focus on GooglePlus",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "1110",
                                    LINKEDIN:           "0010",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                },
                                FROM: GOOGLEPLUS,
                                PSUsageInfo : GOOGLEPLUS
                            },
                            SNS_LINKEDIN: {
                                DESCRIPTION:  "Scan LinkedIn/IE/Firefox/Chrome, focus on LinkedIn",
                                PATTERN: {
                                    FACEBOOK:           "0010",
                                    TWITTER:            "0010",
                                    GOOGLEPLUS:         "0010",
                                    LINKEDIN:           "1110",
                                    INTERNET_EXPLORER:  "0000",
                                    FIREFOX:            "0110",
                                    CHROME:             "0110"
                                },
                                FROM: LINKEDIN,
                                PSUsageInfo : LINKEDIN
                            }
                        }
                    }
                };
                
                var param = LocalUtil.ParamFromURL.getParam('from'),
                    from = param.split(','),
                    product_id = from[0],
                    source_id  = from[1];
                if (PS.TAB_LIST_PATTERN[product_id]) {
                     return PS.TAB_LIST_PATTERN[product_id][source_id];
                } else {
                     return PS.TAB_LIST_PATTERN["TI9_OrLater"][source_id];
                }
               
            },
            BrowserID: function() {
                return LocalUtil.ParamFromURL.getParam('browser_id');
            },
            BrowserVersion: function() {
                return LocalUtil.ParamFromURL.getParam('browser_version');
            },
            Locale: function() {
                return LocalUtil.ParamFromURL.getParam('locale');
            },
            Status: function() {
                return LocalUtil.ParamFromURL.getParam('status');
            },
            Restart_Browser: function() {
                return LocalUtil.ParamFromURL.getParam(URL_PARAM_RESTART_BROWSER);
            }
        }
        
    }
    
    window.OptionSetting = (function(){
        /*
            option setting
        */
        var FLAG_UTIL = (function(){
        
            var FLAG_IS_FOCUS    = 0x8;
            var FLAG_IS_SCAN    = 0x4;
            var FLAG_IS_SHOW    = 0x2;
            var FLAG_IS_BUY        = 0x1;
            
            return {
                is_Focus : function(flag){
                    return parseInt(flag, 2) & FLAG_IS_FOCUS;        
                },
                is_Scan : function(flag){
                    return parseInt(flag, 2) & FLAG_IS_SCAN;        
                },
                is_Show : function(flag){
                    return parseInt(flag, 2) & FLAG_IS_SHOW;        
                },
                is_Buy : function(flag){
                    return parseInt(flag, 2) & FLAG_IS_BUY;        
                }
            };
        })();
        
        var settings = LocalUtil.ParamFromURL.GetTabList();
        
        
        /*
            whether user installed related browser
        */
        var userInstalledBrowser = function(Browser){
            var getBrowserIndex = function(Browser){
                var browserIndexMapping = {
                    "CHROME" : 0,
                    "FIREFOX" : 1,
                    "INTERNET_EXPLORER" : 2
                }
                return browserIndexMapping[Browser];
            }
            
            var browserIndex = getBrowserIndex(Browser);
            var browserStatus = LocalUtil.ParamFromURL.Status();
            
            if(!browserStatus){
                // when there are no "status" in url. Don't show these browsers
                // Ex: iTIS don't have and don't need to show
                return false;
            }
            /*
                01_11_21 means:
                
                01: chrome installed
                11: firefox installed
                21: ie installed
                
            */
            
            var statusArr = browserStatus.split("_");
            var matchedConfigure = statusArr[browserIndex];
            
            return matchedConfigure[1] === "1";
        }
        
        var isBrowser = function(item){
            for(var i=0, len = AllBrowsers.length; i < len; i++){
                if(item === AllBrowsers[i]){
                    return true;
                }
            }
            
            return false;
        }
        
        return {
            getShowSiteOrBrowserList : function(){
                /*
                    we get whether need to show this tab based on setting and
                    whether user has installed related browser.
                    For example: If user didn't install Chrome, even it appears in settings, 
                    we will not show Chrome here.
                */
                var result = [];
                for(var itemName in settings.PATTERN){
                    var itemValue = settings.PATTERN[itemName];
                    if(FLAG_UTIL.is_Show(itemValue)){
                        if(isBrowser(itemName) && !userInstalledBrowser(itemName)){
                            // user didn't install this browser, do not show it.
                            continue;
                        }else{
                            result.push(itemName);    
                        }
                    }
                }   
                
                return result;
            }, 
            getPromoteSiteOrBrowserList : function(){
                var result = [];
                for(var itemName in settings.PATTERN){
                    var itemValue = settings.PATTERN[itemName];
                    if(FLAG_UTIL.is_Buy(itemValue)){
                        result.push(itemName);
                    }
                }   
        
                return result;
            }, 
            getScanSiteOrBrowsers : function(){
                var result = [];
                for(var itemName in settings.PATTERN){
                    var itemValue = settings.PATTERN[itemName];
                    if(FLAG_UTIL.is_Scan(itemValue)){
                        if(isBrowser(itemName) && !userInstalledBrowser(itemName)){
                            // user didn't install this browser, do not scan it.
                            continue;
                        } else{
                            result.push(itemName);    
                        }
                    }
                }  
                return result;
            },
            getFocusOn : function(){
                // If URl defines restart_browser, the priority of this param will be higher.
                var restart_browser = LocalUtil.ParamFromURL.Restart_Browser();
                if(restart_browser){
                    return restart_browser;
                }
                
                // default is FACEBOOK
                var result = FACEBOOK;
                
                for(var itemName in settings.PATTERN){
                    var itemValue = settings.PATTERN[itemName];
                    if(FLAG_UTIL.is_Focus(itemValue)){
                        result = itemName;
                    }
                }  
                return result;
            }
        }
    })();
    

    window.CategoryList = ['People_can_see_your_personal_info', 
                            'Strangers_can_easily_track_you', 
                            'You_can_be_tagged_without_your_permission', 
                            'People_outside_of_Facebook_can_see_your_info', 
                            'People_can_see_where_you_were', 
                            'People_can_download_your_photos',
                            'Advertizers_can_learn_more_about_you',
                            'People_outside_of_Linkedin_can_see_your_info',
                            'Strangers_could_monitor_your_connection',
                            'Browser_phishing_protect',
                            'Application_can_access_your_personal_info'];
    /*
     wording
     */

    window.TIME_INTERVAL_NOT_LOG_IN_CHECK_AGAIN = 1000;
    window.TIME_INTERVAL_NOT_LOG_IN_CHECK_AGAIN_IF_NETWORK_ERROR = 5000;

    window.TIMEOUT_SEND_REQUEST_TO_BACKGROUND = 120 * 1000;
    
    /*
        animation related
    */
    window.DURATION_TIME_SLIDE_DOWN_SAVECHANGES = 200;
    window.DURATION_TIME_SLIDE_UP_SAVECHANGES = 200;
    
    window.DURATION_TIME_SLIDE_UP_SETTINGS = 500;
    
    window.DURATION_TIME_BACK_TO_TOP = 800;
    
    window.POSITION_WHEN_BACK_TO_TOP_APPEAR = 330;
    
    window.URL_LIST = {
        FACEBOOK : {
            URL_SETTING_PAGE : 'https://www.facebook.com/settings',
            URL_CHECKLOGIN_PAGE : 'https://www.facebook.com/',
            URL_CHECKSETTING_PAGE : 'https://www.facebook.com/settings',
            URL_ACCOUNT_PAGE : 'https://www.facebook.com/'
        },
        TWITTER : {
            URL_SETTING_PAGE : 'https://twitter.com/settings/privacy_and_safety',
            URL_CHECKLOGIN_PAGE : 'https://twitter.com/',
            URL_FIX_PAGE : 'https://twitter.com/settings/privacy_and_safety',
            URL_ACCOUNT_PAGE : 'https://twitter.com/login'
        },
        GOOGLEPLUS : {
            URL_SETTING_PAGE : 'https://plus.google.com/settings?gmbpt=true&fd=1',
            URL_CHECKLOGIN_PAGE : 'https://plus.google.com',
            URL_ACCOUNT_PAGE : 'https://accounts.google.com/Logout'
        },
        LINKEDIN : {
            URL_SETTING_PAGE: 'https://www.linkedin.com/psettings/privacy',
            URL_FIX_SETTING_PAGE: {
                '11': 'https://www.linkedin.com/psettings/data-sharing',
                '12': 'https://www.linkedin.com/psettings/advertising/ads-beyond-linkedin'
            },
            URL_CHECKLOGIN_PAGE : 'https://www.linkedin.com/',
            URL_CHECK_ACCOUNT_PAGE : 'https://www.linkedin.com/psettings/',
            URL_ACCOUNT_PAGE : 'https://www.linkedin.com/uas/login'
        }
    };
    
    window.IS_SCANING = {
        FACEBOOK : false,
        TWITTER : false,
        GOOGLEPLUS : false,
        LINKEDIN : false,
        CHROME : false,
        FIREFOX : false,
        INTERNET_EXPLORER : false
    };

    window.DCA_CONSTANTS = {
        WEBSITE_OR_BROWSER_ID : {
            FACEBOOK : 0,
            TWITTER : 1,
            GOOGLEPLUS : 2,
            LINKEDIN : 3,
            CHROME : 4,
            FIREFOX : 5,
            INTERNET_EXPLORER : 6,
            SAFARI : 7
        },
        SETTING_ID : {
            SCAN : 0,
            FIX : 1
        },
        ERROR_ID : {
            NETWORK_ERROR : 0,
            TIMEOUT : 1,
            BUSY_FIXING : 2,
            PLEASE_SIGNIN: 3,
            BROWSER_TITANIUM_NOT_EXIST: 100,
            BROWSER_DEFAULT_ERROR: 101,
            BROWSER_IE_VERSION_LOW: 102,
            BROWSER_CHROME_ACCOUNT_LOGGED_IN: 103
        },
        HELP_ID : {
            SOMETHING_WRONG : 0,
            KEEP_SEEING_DONT_CLOSE_TAB : 1,
            BPS_SOMETHING_WRONG : 2,
            GOOGLE_ACCOUNT_LOGGED_IN : 3
        },
        PS_USAGE_WEBSITE_OR_BROWSER_ID : {
            FACEBOOK : 7,
            TWITTER : 9,
            GOOGLEPLUS : 11,
            LINKEDIN : 13,
            MAIN_CONSOLE : 15
        }
    }
    
    // Browser Privacy Scanner: error code mapping
    window.BPS_RETURN_CODE = {
        OK : 0,
        IE_VERSION_LOW : 3,
        TITANIUM_NOT_EXIST : 301,
        CHROME_ACCOUNT_LOGGED_IN : 200
    }
    
    // some wordings of settings are quite longger, we need to set its CSS style seperately.
    window.UISettings = {
        privacy_item_content : [
            {
                className: "privacy_item_content_setting_Longger_2",
                list: [
                    {
                        name: TWITTER,
                        ID: 16
                    }
                ]
            },
            {
                className: "privacy_item_content_setting_Longger_1_5",
                list: [
                    {
                        name: FIREFOX,
                        ID: "ff_do_not_track"
                    }
                ]
            }
        ]
    }
    
    window.URL_PARAM_RESTART_BROWSER = "restart_browser";
    
    window.CSS_anotherAccount_image_left = 58;
    window.CSS_anotherAccount_name_gap = 5;
})();
