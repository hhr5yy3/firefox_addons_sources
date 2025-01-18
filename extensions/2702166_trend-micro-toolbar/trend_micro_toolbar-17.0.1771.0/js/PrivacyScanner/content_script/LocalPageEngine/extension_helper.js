(function() {
    /*
     Functions in this file are used to communicate with extension.
     */
    window.function_table = {
        count: 0
    };

    window.DoPSLocalReceiveMessage = function(msg) {
        console.log('[PS][LOCAL_PAGE]: DoPSLocalReceiveMessage: msg = ' + JSON.stringify(msg));
        /*
            type is sync up page connection
        */
        if(msg.type == 'sync_up_page_connection') {
            window.ContentPageConnection[msg.dataIn.id] = msg.dataIn.connected;
            return;
        }

        /*
            type is get_sns_account_id_result
         */
        if (msg.type == 'get_sns_cookies_result')
        {
            if(!window.UserLoginPage[msg.dataIn.Website]) {
                window.UserLoginPage[msg.dataIn.Website] = {};
            }

            if (msg.dataOut.ret_status == true) {
                window.UserLoginPage[msg.dataIn.Website][msg.dataIn.params.name] = msg.dataOut.ret_value.value;
            } else {
                window.UserLoginPage[msg.dataIn.Website][msg.dataIn.params.name] = null;
            }
        }

        /*
            type is get_sns_account_info_result
         */
        if (msg.type == 'get_sns_account_info_result')
        {
            if (msg.dataOut.ret_status == true) {
                if(!window.UserLoginPage[msg.dataIn.Website]) {
                    window.UserLoginPage[msg.dataIn.Website] = {};
                }

                for(let key in msg.dataOut.ret_value) {
                    window.UserLoginPage[msg.dataIn.Website][key] = msg.dataOut.ret_value[key];
                }
            } else {
                PSDebug.log("[get account]: ret_status = " + msg.dataOut.ret_status);
            }
        }
        
        /*
            can not find this function id    
        */
        if(!msg.hasOwnProperty('function_id')) {
            PSDebug.log('There is no function id in message');
            return;
        }   
        else if (!function_table.hasOwnProperty(msg.function_id)) {
            PSDebug.error('can not find function with ID: ' + msg.function_id);
            PSDebug.error('Current function table: ');
            for (var key in function_table) {
                PSDebug.error('key: ' + key + '\n');
                PSDebug.error('value -> success: ');
                PSDebug.error(String(function_table[key]['success']));
                PSDebug.error('value -> error: ');
                PSDebug.error(String(function_table[key]['error']));
            }
            return;
        }
        
        /*
            is SNS privacy scan callback
        */
        if(!msg.isBrowser){
            if (msg.type == 'fix_single_result') {
                if(msg.dataOut.ret_value == 'finished') {
                    window.TwitterFixFlag = 1;
                }
            }
            if (msg.type == 'error') {
                // Extension side return error
                switch (msg.dataOut.ret_value) {
                    case '80000000':
                        /*
                         User close the tab
                         */
                        if(msg.dataIn.params){
                            // when fixing 
                            get_scannerHelper(msg.dataIn.Website).alertMessageOverTabContent_forceCloseTab();   
                        }else{
                            // when_scanning
                            get_scannerHelper(msg.dataIn.Website).alertMessageInTabContent_forceCloseTab();
                        }
                        break;
                    case '80000001':
                        /*
                         Time out
                         */
                        get_scannerHelper(msg.dataIn.Website).alertMessageInTabContent_timeoutError();
                        break;
                }
            } else if (msg.dataOut.ret_status == true) {
                // send ajax success
                if (function_table[msg.function_id]['success']) {
                    function_table[msg.function_id]['success'](msg.dataOut.ret_value);
                }
            } else {
                if (function_table[msg.function_id]['error']) {
                    function_table[msg.function_id]['error'](msg.dataOut.ret_value);
                }
            }    
        } else {
            // is browser
            function_table[msg.function_id]['success'](msg);
        }
        
        delete function_table[msg.function_id];
    };

    window.DoPSLocalReceiveMessage = DoPSLocalReceiveMessage;
    
    window.sessionID = null;
    
    function GenerateGuid(){
        var result, i, j;
        result = '';
    
        for (j = 0; j < 32; j++)
        {
            if (j == 8 || j == 12 || j == 16 || j == 20)
            {
                result = result + '-';
            }
    
            i = Math.floor(Math.random()*16).toString(16).toUpperCase();
            result = result + i;
        }
        return result;
    }

    function getThisSessionID(){
        if(!sessionID){
            sessionID = GenerateGuid();
        }
        return sessionID;
    }
    
    window.SendRequestToBackground_Website = function(success, error, type, destination, params, Website, target_url, active, needForceNewTab) {
        var _function_id = getThisSessionID() + '_' + function_table['count'];
        var msg = {
            action: TB_ACTIONS.PS_WEBSITE_SCAN,
            isBrowser: false,
            source: 'local',
            destination: destination,
            type: type,
            active: (active || false),
            needForceNewTab: (needForceNewTab || false),
            target_url: target_url,
            function_id: _function_id,
            dataIn: {
                Website: Website,
                params: params
            },
            dataOut: {
                ret_status: null,
                ret_value: null
            }
        };

        function_table[_function_id] = {};
        function_table[_function_id]['success'] = success;
        function_table[_function_id]['error'] = error;
        function_table['count']++;
        
        if(type == "login") {
            PSLocalSendMessage(msg);
        }
        else {
            PSLocalSendMessage(msg, TIMEOUT_SEND_REQUEST_TO_BACKGROUND);
        }
    };
    
    window.SendRequestToBackground_Browser = function(data) {
        var _function_id = getThisSessionID() + '_' + function_table['count']
        var msg = {
            action: TB_ACTIONS.PS_BROWSER_SCAN,
            isBrowser: true,
            source: 'Not Used',
            destination: 'Not Used',
            function_id: _function_id,
            dataIn: {
                action: data.action,
                postaction : data.postaction || "",
                restarturl : (function(){
                    // get current url
                    var current_url = window.location.href;
                    var pathAndParams = current_url.split('?');
                    var path = pathAndParams[0];
                    var current_params = pathAndParams[1];
                    
                    // remove param: restart_browser
                    var paramsList = current_params.split('&');
                    var newParamsList = [];
                    TMExt_$.each(paramsList, function(index, item){
                        var keyAndValue = item.split('=');
                        if (keyAndValue[0] != URL_PARAM_RESTART_BROWSER) {
                            newParamsList.push(item)
                        }
                    })
                    
                    // add param: restart_browser
                    if(TMExt_$.inArray(data.browser, AllBrowsers) == -1){
                        return window.location.href;
                    }
                    
                    newParamsList.push(URL_PARAM_RESTART_BROWSER + "=" + data.browser);
                    var new_params = newParamsList.join("&");
                    var new_url = path + "?" + new_params;
                    return new_url;
                })(),
                browser: data.browser,
                param: data.params
            },
            dataOut: {
                ret_status: null,
                ret_value: null
            }
        };

        function_table[_function_id] = {};
        function_table[_function_id]['success'] = data.success;
        function_table[_function_id]['error'] = data.error;
        function_table['count']++;
        
        PSLocalSendMessage(msg, TIMEOUT_SEND_REQUEST_TO_BACKGROUND);
    };
    
    window.SendRequestToBackground_openFaqPage = function(Website, HelpID) {
        var msg = {
            action: TB_ACTIONS.PS_OPEN_HELP_PAGE,
            source: 'local',
            dataIn: {
                help_type: 'privacy_scanner_faq_help',
                help_website: Website
            }
        };
        
        if(HelpID != undefined){
            msg.dataIn.help_id = HelpID;    
        }
        
        PSLocalSendMessage(msg);
    };
    
    window.SendRequestToBackground_openHelpLink = function() {
        var msg = {
            action: TB_ACTIONS.PS_OPEN_HELP_PAGE,
            source: 'local',
            dataIn: {
                help_type: 'privacy_scanner_help',
                help_website: "ALL"
            }
        };
        
        PSLocalSendMessage(msg);
    };

    window.SendRequestToBackground_openSNSPage = function(destination, params, Website, target_url) {
        let msg = {
            action: TB_ACTIONS.PS_WEBSITE_SCAN,
            isBrowser: false,
            source: 'local',
            destination: destination,
            type: 'open_sns_page',
            active: false,
            needForceNewTab: false,
            target_url: target_url,
            dataIn: {
                Website: Website,
                params: params
            },
            dataOut: {
                ret_status: null,
                ret_value: null
            }
        };

        return new Promise(resolve => {
            PSLocalSendMessage(msg, TIMEOUT_SEND_REQUEST_TO_BACKGROUND, (ret) => {
                resolve(ret);
            });
        })
    };

    window.SendRequestToBackground_getSNSCookies = function(destination, params, Website, target_url, needForceNewTab) {
        var msg = {
            action: TB_ACTIONS.PS_WEBSITE_SCAN,
            isBrowser: false,
            source: 'local',
            destination: destination,
            type: "get_sns_cookies",
            active: false,
            needForceNewTab: !!needForceNewTab,
            target_url: target_url,
            dataIn: {
                Website: Website,
                params: params
            },
            dataOut: {
                ret_status: null,
                ret_value: null
            }
        };

        PSLocalSendMessage(msg, TIMEOUT_SEND_REQUEST_TO_BACKGROUND);
    };

    window.SendRequestToBackground_getSNSAccountInfo = function(destination, Website, target_url) {
        var msg = {
            action: TB_ACTIONS.PS_WEBSITE_SCAN,
            isBrowser: false,
            source: 'local',
            destination: destination,
            type: 'get_sns_account_info',
            active: false,
            needForceNewTab: false,
            target_url: target_url,
            dataIn: {
                Website: Website,
                params: null
            },
            dataOut: {
                ret_status: null,
                ret_value: null
            }
        };

        PSLocalSendMessage(msg, TIMEOUT_SEND_REQUEST_TO_BACKGROUND);
    };
    
    // for data collection
    window.DCA_UTIL = {
        _SendRequestToBackground_DCA : function(DCA_type, params) {
            var msg = {
                action: TB_ACTIONS.PS_DATA_COLLECTION,
                source: 'local',
                dataIn: {
                    type: DCA_type,
                    data: [params]
                }
            };
            
            PSDebug.info('[DCA]: type ->' + msg.dataIn.type + ' data: ->' + JSON.stringify(msg.dataIn.data));
            PSDebug.info(msg);
            window.browser.runtime.sendMessage(msg);
        },
        
        /*
            lstBrowserUsageInfo
        */
        lstBrowserUsageInfo : function(nBrowserID, sBrowserVersion, nBrowserClickTimes) {
            DCA_UTIL._SendRequestToBackground_DCA("lstBrowserUsageInfo",{
                nBrowserID: parseInt(nBrowserID),
                sBrowserVersion: sBrowserVersion,
                nBrowserClickTimes: parseInt(nBrowserClickTimes)
            });
        },
        
        /*
            lstLocalPageUsageInfo
        */
        _lstLocalPageUsageInfo : function(nWebsiteID, nScanTimes, nPromotionTimes, nFixAllTimes, nShareTimes, nSwitchUserClickTimes) {
            if(!nWebsiteID && nWebsiteID != 0){
                return;
            }
            DCA_UTIL._SendRequestToBackground_DCA("lstLocalPageUsageInfo",{
                nWebsiteID: parseInt(nWebsiteID),
                nScanTimes: parseInt(nScanTimes),
                nPromotionTimes: parseInt(nPromotionTimes),
                nFixAllTimes: parseInt(nFixAllTimes),
                nShareTimes: parseInt(nShareTimes),
                nSwitchUserClickTimes: parseInt(nSwitchUserClickTimes)
            });
        },
        
        lstLocalPageUsageInfo : {
            nScanTimes : function(WebsiteID, number){
                DCA_UTIL._lstLocalPageUsageInfo(
                    WebsiteID, number, 0, 0, 0, 0);
            },
            nPromotionTimes : function(WebsiteID, number){
                DCA_UTIL._lstLocalPageUsageInfo(
                    WebsiteID, 0, number, 0, 0, 0);
            },
            nFixAllTimes : function(WebsiteID, number){
                DCA_UTIL._lstLocalPageUsageInfo(
                    WebsiteID, 0, 0, number, 0, 0);
            },
            nShareTimes : function(WebsiteID, number){
                DCA_UTIL._lstLocalPageUsageInfo(
                    WebsiteID, 0, 0, 0, number, 0);
            },
            nSwitchUserClickTimes : function(WebsiteID, number){
                DCA_UTIL._lstLocalPageUsageInfo(
                    WebsiteID, 0, 0, 0, 0, number);
            }
        },
        
        /*
            lstErrorPageUsageInfo
        */
        lstErrorPageUsageInfo : function(nWebsiteID, nErrorID, nErrorShowTimes) {
            if(!nWebsiteID && nWebsiteID != 0){
                return;
            }
            DCA_UTIL._SendRequestToBackground_DCA("lstErrorPageUsageInfo",{
                nWebsiteID: parseInt(nWebsiteID),
                nErrorID: parseInt(nErrorID),
                nErrorShowTimes: parseInt(nErrorShowTimes)
            });
        },
        
        /*
            lstHelpUsageInfo
        */
        lstHelpUsageInfo : function(nWebsiteID, nHelpID, nHelpClickTimes) {
            if(!nWebsiteID && nWebsiteID != 0){
                return;
            }
            DCA_UTIL._SendRequestToBackground_DCA("lstHelpUsageInfo",{
                nWebsiteID: parseInt(nWebsiteID),
                nHelpID: parseInt(nHelpID),
                nHelpClickTimes: parseInt(nHelpClickTimes)
            });
        },
        
        /*
            lstPSUsageInfo
        */
        lstPSUsageInfo : function(nSourceTypeID, nOpenTimes) {
            DCA_UTIL._SendRequestToBackground_DCA("lstPSUsageInfo",{
                nSourceTypeID: parseInt(nSourceTypeID),
                nOpenTimes: parseInt(nOpenTimes)
            });
        }
    }
    
    window.SendRequestToBackground_Website = SendRequestToBackground_Website;

    window.SendWebRequest = function(params, success, error) {
        function getWebsiteFromURL(url) {
            var hostname = TMExt_$('<a>').prop('href', url).prop('hostname');
            if (hostname.indexOf('facebook') != -1) {
                return FACEBOOK;
            } else if (hostname.indexOf('twitter') != -1) {
                return TWITTER;
            } else if (hostname.indexOf('google') != -1) {
                return GOOGLEPLUS;
            } else if (hostname.indexOf('linkedin') != -1) {
                return LINKEDIN;
            }
            return '';
        }

        var Website = getWebsiteFromURL(params.url);
        SendRequestToBackground_Website(success, error, 'ajax_request', '', params, Website);
    };

    window.FeedbackScanResult = function(website, totalTime, errorCode) {
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEED_UBM, 
            params: {
                event: "PRIVACY_SCANNER_SCAN_RESULT",
                value: JSON.stringify({
                    'website': website,
                    'totalTime': totalTime,
                    'errorCode': errorCode
                })
            }
        });
    }

    window.FeedbackFixResult = function(website, totalTime, fixNum) {
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEED_UBM, 
            params: {
                event: "PRIVACY_SCANNER_FIX_RESULT",
                value: JSON.stringify({
                    'website': website,
                    'totalTime': totalTime,
                    'fixNum': fixNum
                })
            }
        });
    }

    window.FeedbackFixTimeout = function(website, id) {
        window.browser.runtime.sendMessage({
            action: TB_ACTIONS.FEED_UBM, 
            params: {
                event: "PRIVACY_SCANNER_FIX_TIMEOUT",
                value: JSON.stringify({
                    'website': website,
                    'id': id
                })
            }
        });
    }
})();
