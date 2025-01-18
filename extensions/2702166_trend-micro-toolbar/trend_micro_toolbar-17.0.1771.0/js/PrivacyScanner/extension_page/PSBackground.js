import PSBGWrapper from '../extension_page/PSBackgroundWrapper';
import commonApi from '../../../common/UtilCarbonCommon/api';
import * as commonConstants from '../../../common/UtilCarbonCommon/constants';
import utilMessageHandler from '../../../common/UtilMessageHandler'

const LOCAL_PAGE_NAME = 'LocalPage_Background';
const _tagName = '[PSBackground]';

let _browser = commonApi.getBrowser();

export const PSBackground = {
    PageList : {
        'LocalPage_Background': {
            'tabId': null,
            'urlRegExp': /^.*-extension:\/\/.*\/js\/PrivacyScanner\/local_page\/index\.html\?.*/i
        },
        'ContentPage_Background_FACEBOOK': {
            'tabId': null,
            'urlRegExp': /^(http|https):\/\/www\.facebook\.com\/.*/gmi
        },
        'ContentPage_Background_TWITTER': {
            'tabId': null,
            'urlRegExp': /^(http|https):\/\/twitter\.com\/.*/gmi
        },
        'ContentPage_Background_LINKEDIN': {
            'tabId': null,
            'urlRegExp': /^(http|https):\/\/www\.linkedin\.com\/.*/gmi
        }
    },

    TabOpt :  {
        /*  RedirectUrl: {
            TWITTER: "https://!*.twitter.com/login*"
        },*/

        GetTabIdByUrl: function(url, callback){
            _browser.tabs.query({url: url}, function(tabList){
                callback(tabList[0]);
            });
        },

        CreateTab: function(url, active, callback) {
            commonApi.logInfo(_tagName, 'CreateTab: create tab...url = ' + url);
            _browser.tabs.create({
                url: url,
                active: active
            }, function (tab) {
                callback(tab);
            });
        },

        CreateTabIfNotExists: function(url, active){
            _browser.tabs.query({url: url}, function(tabList){
                if (tabList.length == 0){
                    commonApi.logInfo(_tagName, 'CreateTabIfNotExists: create tab...url = ' + url);
                    _browser.tabs.create({
                        url : url,
                        active : active
                    });
                }
            });
        },

        UpdateTabIfExists:  function(url, active){
            _browser.tabs.query({url: url}, function(tabList){
                if(tabList.length > 0) {
                    _browser.tabs.update(tabList[0].id, {
                        active : active
                    });
                }
            });
        },

        CreateOrUpdateTab: function(url, active, callback){
            _browser.tabs.query({url: url}, function(tabList){
                if(tabList.length > 0)
                {
                    _browser.tabs.update(tabList[0].id, {
                        active : active
                    }, function (tab) {
                        callback(tab);
                    });
                } 
                else {
                    commonApi.logInfo(_tagName, 'CreateOrUpdateTab: create tab...url = ' + url);
                    _browser.tabs.create({
                        url : url,
                        active : active
                    }, function (tab) {
                        callback(tab);
                    });
                }
            });
        }
    },

    GetPageTabId: async function(name) {
        commonApi.logInfo(_tagName, 'GetPageTabId: name = ' + name);
        if (!PSBackground.PageList.hasOwnProperty(name) || !PSBackground.PageList[name].tabId) {
            return null;
        }

        let ret = null;
        try {
            let tabId = PSBackground.PageList[name].tabId;
            let tab = await _browser.tabs.get(parseInt(tabId));
            let urlRegExp = PSBackground.PageList[name].urlRegExp;
            urlRegExp.lastIndex = 0;
            if (urlRegExp.test(tab.url)) {
                ret = tabId;
            }
            else {
                self['regexp'] = urlRegExp;
                self['taburl'] = tab.url;
                commonApi.logInfo(_tagName, 'GetPageTabId: url test is failed...url = ' + tab.url + ', regexp = ' + urlRegExp);
            }
        } catch(e) {
            commonApi.logError(_tagName, 'GetPageTabId: e = ' + e);
        }
        
        if (!ret) {
            PSBackground.PageList[name].tabId = null;
        }

        return ret;
    },

    tryGetPageId: function(name, count = 0, interval = 500) {
        const MAX_COUNT = 10;

        return new Promise(resolve => {
            if (count >= MAX_COUNT) {
                resolve(null);
                return;
            }

            PSBackground.GetPageTabId(name)
            .then(pageId => {
                if (pageId) {
                    resolve(pageId);
                    return;
                }

                setTimeout(() => {
                    PSBackground.tryGetPageId(name, count+1, interval)
                    .then(retryRet => {
                        resolve(retryRet);
                    })
                }, interval);
            })
        });
    },

    RegisterContentPage: function(msg, sender) {
        if (!msg.hasOwnProperty('name') || !sender.tab || !sender.tab.id) {
            return;
        }

        let name = msg.name;
        let tabId = sender.tab.id;
        PSBackground.PageList[name].tabId = tabId;
        commonApi.logInfo(_tagName, 'RegisterContentPage: PageList = ' + JSON.stringify(PSBackground.PageList));
    },

    RegisterLocalPage: async function(msg, sender) {
        if (!sender.tab || !sender.tab.id) {
            return false;
        }

        let tabId = sender.tab.id;
        // Remove new local page and active old one
        let oldLocalPageTabId = await PSBackground.GetPageTabId(LOCAL_PAGE_NAME);
        commonApi.logInfo(_tagName, 'RegisterLocalPage: oldLocalPageTabId = ' + oldLocalPageTabId);
        if (oldLocalPageTabId && oldLocalPageTabId !== tabId) {
            _browser.tabs.update(oldLocalPageTabId, {
                'active': true
            });
            return false;
        }

        PSBackground.PageList['LocalPage_Background'].tabId = tabId;
        commonApi.logInfo(_tagName, 'RegisterLocalPage: tabId = ' + tabId);

        return true;
    },

    onLocalPageMessage: async function(msg, sender) {
        return await PSBackground.SendMessageToLocalPage(msg);
    },
    
    SendMessageToLocalPage : async function(msg) {
        commonApi.logInfo(_tagName, 'SendMessageToLocalPage: msg = ' + JSON.stringify(msg));
        let ret = false;
        try {
            let tabId = await PSBackground.GetPageTabId(LOCAL_PAGE_NAME);
            if (tabId) {
                msg.action = commonConstants.TB_ACTIONS.PS_LOCAL_PAGE_MESSAGE;
                await _browser.tabs.sendMessage(tabId, msg);
                ret = true;
            }
            else {
                commonApi.logError(_tagName, 'SendMessageToLocalPage: failed to get tabId');
            }
        } catch(e) {
            commonApi.logError(_tagName, 'SendMessageToLocalPage: e = ' + e);
        }

        return ret;
    },
    
    SendMessageToContentPage : async function(destination, msg) {
        commonApi.logInfo(_tagName, 'SendMessageToContentPage: destination = ' + destination + ', msg = ' + JSON.stringify(msg));
        let ret = false;
        try {
            let tabId = await PSBackground.GetPageTabId(destination);
            if (tabId) {
                msg.action = commonConstants.TB_ACTIONS.PS_CONTENT_MESSAGE;
                _browser.tabs.sendMessage(parseInt(tabId), msg);
                ret = true;
            }
            else {
                commonApi.logError(_tagName, 'SendMessageToContentPage: failed to get tabId');
            }
        } catch(e) {
            commonApi.logError(_tagName, 'SendMessageToContentPage: e = ' + e);
        }

        return ret;
    },
    
    OpenHelpPage : function(msg, sender) {
        let help_type = msg.dataIn.help_type;
        switch (help_type) {
            case "privacy_scanner_help":
                PSBGWrapper.ShowPSHelpPage();
                break;
            case "privacy_scanner_faq_help":
                PSBGWrapper.ShowPSFAQHelpPage(msg.dataIn.help_website, msg.dataIn.help_id);
                break;
        }
    },
    
    PSGetSettings: function(msg, sender) {
        let items = msg.dataIn.setting_items;
        let ret_items = PSBGWrapper.GetPrivacyScannerSettings(items);
        msg.dataOut = {
            setting_items: ret_items
        };

        return msg;
    },
    
    PSCollectData: function(msg, sender) {
        PSBGWrapper.PrivacyScannerCollectData(msg);
    },
    
    DoAJAX : function(msg) {
        var SendAjaxResultToLocalPage = function(msg) {
            msg.type = "ajax_request_result";
            PSBackground.SendMessageToLocalPage(msg);
        };

        var params = msg.dataIn.params
        var trigger = function() {
            let options = {
                'method': params.type
            }
            if (!!params.data) {
                options.body = JSON.stringify(params.data);
            }
            if (params.dataType === 'json') {
                options['Content-Type'] = 'application/json';
            }
            else if (params.dataType === 'html') {
                options['Content-Type'] = 'text/html';
            }
            else if (params.dataType === 'text') {
                options['Content-Type'] = 'text/plain';
            }
            commonApi.logInfo(_tagName, 'DoAJAX: url = ' + params.url + ', options = ' + JSON.stringify(options));
            fetch(params.url, options)
            .then(async response => {
                let ret_value = null;
                if (params.dataType === 'json') {
                    ret_value = await response.json();
                }
                else {
                    ret_value = await response.text();
                }

                msg.dataOut = {
                    ret_status : true,
                    ret_value : ret_value
                };
                SendAjaxResultToLocalPage(msg);
            })
            .catch(error => {
                commonApi.logError(_tagName, 'DoAJAX: e = ' + error);
                msg.dataOut = {
                    ret_status : false,
                    ret_value : null
                };
                SendAjaxResultToLocalPage(msg);
            })
        };
        trigger();
    },
    
    RequestForBrowsers: function(msg) {
        if (!msg.hasOwnProperty('function_id')) {
            commonApi.logError(_tagName, 'RequestForBrowsers: function_id missed!');
            return;
        }
        let functionId = msg['function_id'];
        let strMsg = JSON.stringify(msg);
        commonApi.logInfo(_tagName, 'RequestForBrowsers: strMsg = ' + strMsg);
        PSBGWrapper.PrivacyScannerRequestForBrowsers(functionId, strMsg)
        .then(result => {
            commonApi.logInfo(_tagName, 'RequestForBrowsers: result = ' + result);
            let response = JSON.parse(result);
            PSBackground.SendMessageToLocalPage(response);
        })
    },

    onBrowserScan: function(msg, sender) {
        // Scan Browser
        PSBackground.RequestForBrowsers(msg);
    },

    onGetSnsCookies: function(msg, sender) {
        if(msg.dataIn.params && msg.dataIn.params.url && msg.dataIn.params.name) {
            _browser.cookies.get({
                url: msg.dataIn.params.url, 
                name: msg.dataIn.params.name
            }, cookiesData => {
                commonApi.logInfo(_tagName, 'onGetSnsCookies: cookiesData = ' + JSON.stringify(cookiesData));
                msg.type = 'get_sns_cookies_result';
                if(cookiesData === null) {
                    msg.dataOut.ret_status = false;
                }
                else {
                    msg.dataOut.ret_status = true;
                    msg.dataOut.ret_value = cookiesData;
                }
                PSBackground.SendMessageToLocalPage(msg);
            });
        }
    },

    onOpenSnsPage: function(msg, sender) {
        return new Promise(async resolve => {
            let tabId = await PSBackground.GetPageTabId(msg.destination);
            if(!tabId) {
                PSBackground.TabOpt.CreateTab(msg.target_url, false, (tab) => {
                    const MAX_CHECK_COUNT = 20;
                    const checkTabId = (count) => {
                        if (PSBackground.PageList[msg.destination].tabId) {
                            resolve(true);
                            return;
                        }
                        else if (count >= MAX_CHECK_COUNT) {
                            commonApi.logInfo(_tagName, 'onOpenSnsPage: failed to get new tab id');
                            resolve(false);
                            return;
                        }

                        setTimeout(() => {
                            checkTabId(count+1);
                        }, 1000);
                    }
                    checkTabId(0);
                });
            }
            else {
                _browser.tabs.update(tabId, {
                    'url': msg.target_url
                }, (tab) => {
                    resolve(true);
                })
            }
        });
    },

    onContentPageMessages: function(msg, sender) {
        return new Promise(resolve => {
            if (!msg.target_url || !msg.destination) {
                resolve(false);
                return;
            }

            const TotalWaitTime = 30 * commonConstants.SECONDS;
            const EachWaitTime = 2 * commonConstants.SECONDS;
            const NumberOfTotalTryTimes = TotalWaitTime / EachWaitTime;

            const fnReturnError = () => {
                commonApi.logError(_tagName, 'onContentPageMessages: failed to send message to ' + msg.destination);
                msg.type = "error";
                msg.dataOut = {
                    ret_status : false,
                    ret_value : "80000000"
                };
                PSBackground.SendMessageToLocalPage(msg);
            };
            
            const fnTryToSendMessageToDestination = (count = 0) => {
                count++;
                
                commonApi.logInfo(_tagName, 'fnTryToSendMessageToDestination: Try ' + count + ' times');
                PSBackground.SendMessageToContentPage(msg.destination, msg)
                .then((sendMessageRet) => {
                    if (sendMessageRet) {
                        commonApi.logInfo(_tagName, 'fnTryToSendMessageToDestination: message send');
                        resolve(true);
                        return;
                    }
                    
                    if (count < NumberOfTotalTryTimes) {
                        setTimeout(() => {
                            fnTryToSendMessageToDestination(count);
                        }, EachWaitTime);
                    } else {
                        fnReturnError();
                        resolve(false);
                    }
                })
                
            };

            msg.action = commonConstants.TB_ACTIONS.PS_CONTENT_MESSAGE;
            commonApi.logInfo(_tagName, 'onContentPageMessages: msg = ' + JSON.stringify(msg));
            if (msg.needForceNewTab == true){
                PSBackground.PageList[msg.destination].tabId = null;
            }

            PSBackground.tryGetPageId(msg.destination)
            .then(async contentPageId => {
                commonApi.logInfo(_tagName, 'onContentPageMessages: contentPageId = ' + contentPageId);
                if (!contentPageId) {
                    commonApi.logInfo(_tagName, 'onContentPageMessages: create tab...url = ' + msg.target_url);
                    await _browser.tabs.create({
                        'url': msg.target_url,
                        'active': msg.active
                    });
                    PSBackground.PageList[msg.destination].tabId = null;
                }
                else {
                    let contentTab = await _browser.tabs.get(contentPageId);
                    if (contentTab !== msg.target_url) {
                        await _browser.tabs.update(contentPageId, {
                            'url': msg.target_url,
                            'active': msg.active
                        });
                        PSBackground.PageList[msg.destination].tabId = null;
                    }
                }

                fnTryToSendMessageToDestination();
            });
        })
    },

    onWebsiteScan: function(msg, sender) {
        // Scan SNS
        if (msg.type) {
            commonApi.logInfo(_tagName, 'onWebsiteScan: type = ' + msg.type);
        }

        if (msg.type == "ajax_request") {
            return PSBackground.DoAJAX(msg);
        }

        if (msg.type == "login") {
            return PSBackground.TabOpt.CreateOrUpdateTab(msg.target_url, true, (tab) =>{
                PSBackground.PageList[msg.destination].tabId = tab.id;
            });
        }

        if(msg.type == 'get_sns_cookies') {
            return PSBackground.onGetSnsCookies(msg, sender);
        }

        if(msg.type == 'open_sns_page') {
            return PSBackground.onOpenSnsPage(msg, sender);
        }
        
        return PSBackground.onContentPageMessages(msg, sender);
    },
    
    init: function() {
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_GET_SETTINGS, PSBackground.PSGetSettings);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_DATA_COLLECTION, PSBackground.PSCollectData);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_LOCAL_PAGE_MESSAGE, PSBackground.onLocalPageMessage);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_REGISTER_CONTENT_PAGE, PSBackground.RegisterContentPage);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_REGISTER_LOCAL_PAGE, PSBackground.RegisterLocalPage);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_OPEN_HELP_PAGE, PSBackground.OpenHelpPage);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_BROWSER_SCAN, PSBackground.onBrowserScan);
        utilMessageHandler.runtime.AddHandler(commonConstants.TB_ACTIONS.PS_WEBSITE_SCAN, PSBackground.onWebsiteScan);
    }
};
